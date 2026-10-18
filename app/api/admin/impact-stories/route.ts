import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import connectImpactDB from '@/lib/impact-db';
import { getImpactStoryModel, IMPACT_PROGRAMS } from '@/models/ImpactStory';
import { getVideoEmbed } from '@/lib/video-url';
import { ActivityLog } from '@/models/ActivityLog';
import connectDB from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET;

async function getAdminUser() {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token || !JWT_SECRET) return null;

  try {
    const decoded = verify(token, JWT_SECRET) as { username?: string };
    return decoded.username || 'Unknown';
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    if (!(await getAdminUser())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const connection = await connectImpactDB();
    const ImpactStory = getImpactStoryModel(connection);
    const stories = await ImpactStory.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error fetching impact stories:', error);
    return NextResponse.json({ error: 'Failed to fetch impact stories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const adminUsername = await getAdminUser();
    if (!adminUsername) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    if (!data.name || !data.role || !data.content || !IMPACT_PROGRAMS.includes(data.program)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const videoUrl = typeof data.videoUrl === 'string' ? data.videoUrl.trim() : '';
    if (videoUrl && !getVideoEmbed(videoUrl)) {
      return NextResponse.json({ error: 'Please use a valid YouTube, Google Drive, or Loom video URL.' }, { status: 400 });
    }

    const connection = await connectImpactDB();
    const ImpactStory = getImpactStoryModel(connection);
    const story = await ImpactStory.create({
      ...data,
      videoUrl,
      imageUrl: data.imageUrl || '/avatar.svg',
      type: videoUrl ? 'video' : 'text',
      consentToPublish: true,
      isApproved: true,
      visibility: data.visibility || 'public',
    });

    await connectDB();
    await ActivityLog.create({
      entityType: 'ImpactStory',
      entityId: String(story._id),
      action: 'create',
      adminUsername,
      details: { name: story.name, program: story.program, visibility: story.visibility },
    });

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error('Error creating impact story:', error);
    return NextResponse.json({ error: 'Failed to create impact story' }, { status: 500 });
  }
}
