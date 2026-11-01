import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { makePost, resolvePostLink } from '@/lib/linkedin-feed';
import { LinkedInPost } from '@/models/LinkedInPost';

const MAX_BODY_BYTES = 2048;

/** Visitors submit a public LinkedIn post URL; it waits as pending until an admin approves it. */
export async function POST(request: Request) {
  try {
    if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    const data = await request.json().catch(() => null);
    // Accepts any post link copied from LinkedIn, including lnkd.in short links
    const parsed = await resolvePostLink(data?.url);
    if (!parsed) {
      return NextResponse.json(
        { error: "That doesn't look like a public LinkedIn post. Use \"Copy link to post\" on LinkedIn and paste it here." },
        { status: 400 }
      );
    }

    await connectDB();
    const existing = await LinkedInPost.findOne({ activityId: parsed.activityId }).select('status').lean<{ status: string }>();
    if (existing) {
      const message =
        existing.status === 'approved'
          ? 'This post is already on the feed.'
          : existing.status === 'pending'
            ? 'This post is already waiting for review.'
            : 'Our team has already reviewed this post.';
      return NextResponse.json({ ok: true, message });
    }

    await LinkedInPost.create({ ...makePost(parsed, '', '', 'community-submission'), status: 'pending' });

    return NextResponse.json({ ok: true, message: 'Thanks! Your post will appear on the feed once our team reviews it.' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting LinkedIn post:', error);
    return NextResponse.json({ error: 'Unable to submit your post right now.' }, { status: 500 });
  }
}
