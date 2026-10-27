import { NextResponse } from 'next/server';
import { getVideoStories } from '@/lib/stories';

// Read at request time (the build has no database), then cached at the edge.
export const dynamic = 'force-dynamic';

// GET: public video stories for the rail on the homepage and program pages
export async function GET() {
  const videos = await getVideoStories();
  return NextResponse.json(videos, {
    headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400' },
  });
}
