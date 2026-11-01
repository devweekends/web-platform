import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { verify } from 'jsonwebtoken';
import connectDB from '@/lib/db';
import { collectFromOlostep, importPostUrls, recheckLivePosts } from '@/lib/linkedin-feed';
import { LinkedInPost } from '@/models/LinkedInPost';
import { ActivityLog } from '@/models/ActivityLog';

export const maxDuration = 300;

const JWT_SECRET = process.env.JWT_SECRET;

async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token || !JWT_SECRET) return null;

  try {
    const decoded = verify(token, JWT_SECRET) as { username?: string };
    return decoded.username || 'Unknown';
  } catch {
    return null;
  }
}

/** All feed posts for moderation, pending first */
export async function GET() {
  try {
    if (!(await getAdminUser())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const posts = await LinkedInPost.find()
      .select('activityId url author title excerpt topic postedAt source status hiddenReason createdAt')
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching feed posts:', error);
    return NextResponse.json({ error: 'Failed to fetch feed posts' }, { status: 500 });
  }
}

/** Most searches one admin request may run: 60 searches is about 300 Olostep credits */
const MAX_SEARCHES_PER_REQUEST = 60;

/**
 * Admin actions on the feed:
 * - `{ action: "collect", searches?: number }` runs Olostep searches ("Find new posts", "Search everything")
 * - `{ action: "import", urls: string }` adds pasted LinkedIn post links, live straight away
 * - `{ action: "recheck", after?: string }` checks the next batch of live posts against LinkedIn
 *   and hides the ones that don't mention Dev Weekends ("Check live posts")
 */
export async function POST(request: Request) {
  try {
    const adminUsername = await getAdminUser();
    if (!adminUsername) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));

    if (body.action === 'recheck') {
      const after = typeof body.after === 'string' && /^[0-9a-f]{24}$/.test(body.after) ? body.after : undefined;
      const result = await recheckLivePosts(after);
      if (result.hidden.length > 0) {
        await ActivityLog.create({
          entityType: 'LinkedInPost',
          entityId: 'feed-check',
          action: 'hide',
          adminUsername,
          details: { hidden: result.hidden },
        });
        revalidatePath('/feed');
      }
      return NextResponse.json(result);
    }

    if (body.action === 'import') {
      if (typeof body.urls !== 'string' || !body.urls.trim()) {
        return NextResponse.json({ error: 'Paste at least one LinkedIn post link.' }, { status: 400 });
      }
      const result = await importPostUrls(body.urls.slice(0, 100_000));
      if (result.added > 0) revalidatePath('/feed');
      return NextResponse.json(result);
    }

    const apiKey = process.env.OLOSTEP_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OLOSTEP_API_KEY is not set on the server.' }, { status: 500 });
    }

    const requested = Number(body.searches) || Number(process.env.FEED_COLLECT_QUERIES) || 5;
    const result = await collectFromOlostep(apiKey, Math.min(requested, MAX_SEARCHES_PER_REQUEST));
    if (result.added > 0 || result.enriched > 0) revalidatePath('/feed');
    return NextResponse.json(result);
  } catch (error) {
    console.error('LinkedIn feed admin action failed:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
