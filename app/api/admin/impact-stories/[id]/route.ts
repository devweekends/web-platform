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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminUsername = await getAdminUser();
    if (!adminUsername) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const update: Record<string, unknown> = {};

    const textFields = [
      'name',
      'role',
      'organization',
      'email',
      'linkedin',
      'cohort',
      'sponsor',
      'before',
      'content',
    ];
    for (const field of textFields) {
      if (typeof data[field] === 'string') update[field] = data[field].trim();
    }
    if (typeof data.program === 'string' && IMPACT_PROGRAMS.includes(data.program)) {
      update.program = data.program;
    }
    if (typeof data.videoUrl === 'string') {
      const videoUrl = data.videoUrl.trim();
      if (videoUrl && !getVideoEmbed(videoUrl)) {
        return NextResponse.json({ error: 'Please use a valid YouTube, Google Drive, or Loom video URL.' }, { status: 400 });
      }
      update.videoUrl = videoUrl;
      update.type = videoUrl ? 'video' : 'text';
    }
    if (typeof data.consentToPublish === 'boolean') update.consentToPublish = data.consentToPublish;
    if (typeof data.isApproved === 'boolean') update.isApproved = data.isApproved;
    if (['internal', 'public', 'featured'].includes(data.visibility)) update.visibility = data.visibility;
    if (typeof data.featuredRank === 'number' && data.featuredRank >= 0) update.featuredRank = data.featuredRank;

    const connection = await connectImpactDB();
    const ImpactStory = getImpactStoryModel(connection);
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'No valid changes were provided.' }, { status: 400 });
    }

    const story = await ImpactStory.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!story) {
      return NextResponse.json({ error: 'Impact story not found' }, { status: 404 });
    }

    await connectDB();
    await ActivityLog.create({
      entityType: 'ImpactStory',
      entityId: String(story._id),
      action: 'update',
      adminUsername,
      details: { name: story.name, changedFields: Object.keys(update), isApproved: story.isApproved, visibility: story.visibility },
    });

    return NextResponse.json(story);
  } catch (error) {
    console.error('Error updating impact story:', error);
    return NextResponse.json({ error: 'Failed to update impact story' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminUsername = await getAdminUser();
    if (!adminUsername) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const connection = await connectImpactDB();
    const ImpactStory = getImpactStoryModel(connection);
    const story = await ImpactStory.findByIdAndDelete(id);
    if (!story) {
      return NextResponse.json({ error: 'Impact story not found' }, { status: 404 });
    }

    await connectDB();
    await ActivityLog.create({
      entityType: 'ImpactStory',
      entityId: id,
      action: 'delete',
      adminUsername,
      details: { name: story.name },
    });

    return NextResponse.json({ message: 'Impact story deleted successfully' });
  } catch (error) {
    console.error('Error deleting impact story:', error);
    return NextResponse.json({ error: 'Failed to delete impact story' }, { status: 500 });
  }
}
