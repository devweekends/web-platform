import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { canonicalize, makePost } from '@/lib/linkedin-feed';
import { LinkedInPost } from '@/models/LinkedInPost';

const MAX_BODY_BYTES = 2048;

/** Visitors submit a public LinkedIn post URL; it waits as pending until an admin approves it. */
export async function POST(request: Request) {
  try {
    if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    const data = await request.json().catch(() => null);
    const parsed = canonicalize(data?.url);
    if (!parsed) {
      return NextResponse.json(
        { error: 'Please paste a public LinkedIn post link, like https://www.linkedin.com/posts/...-activity-...' },
        { status: 400 }
      );
    }

    await connectDB();
    const existing = await LinkedInPost.findOne({ activityId: parsed.activityId }).select('status').lean<{ status: string }>();
    if (existing) {
      const message =
        existing.status === 'approved'
          ? 'This post is already on the feed.'
          : 'This post is already waiting for review.';
      return NextResponse.json({ ok: true, message });
    }

    const post = makePost(parsed.url, '', '', 'community-submission');
    if (!post) {
      return NextResponse.json({ error: 'Unable to read that LinkedIn link.' }, { status: 400 });
    }
    await LinkedInPost.create({ ...post, status: 'pending' });

    return NextResponse.json({ ok: true, message: 'Thanks! Your post will appear on the feed once our team reviews it.' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting LinkedIn post:', error);
    return NextResponse.json({ error: 'Unable to submit your post right now.' }, { status: 500 });
  }
}
