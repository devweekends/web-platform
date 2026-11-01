import { NextResponse } from 'next/server';
import { getFeedPosts } from '@/lib/linkedin-feed';
import { OFFICIAL_HANDLES } from '@/lib/linkedin-feed-shared';

// Read at request time (the build has no database), then cached at the edge.
export const dynamic = 'force-dynamic';

/** Posts shown in the feed rail on the homepage; the full wall is /feed */
const RAIL_SIZE = 10;

// GET: the latest member posts with an excerpt, for the feed rail under Fellow voices
export async function GET() {
  const posts = await getFeedPosts();
  const latest = posts
    .filter((post) => !OFFICIAL_HANDLES.has(post.handle) && post.excerpt.trim())
    .slice(0, RAIL_SIZE);
  return NextResponse.json(latest, {
    headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400' },
  });
}
