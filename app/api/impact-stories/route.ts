import { NextResponse } from 'next/server';
import connectImpactDB from '@/lib/impact-db';
import { getImpactStoryModel, IMPACT_PROGRAMS } from '@/models/ImpactStory';
import { getVideoEmbed } from '@/lib/video-url';

const MAX_STORY_LENGTH = 5000;

export async function GET() {
  try {
    const connection = await connectImpactDB();
    const ImpactStory = getImpactStoryModel(connection);
    const stories = await ImpactStory.find({
      isApproved: true,
      visibility: { $in: ['public', 'featured'] },
    })
      .select('name role program cohort sponsor before content cta videoUrl imageUrl type visibility featuredRank createdAt')
      .sort({ featuredRank: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error fetching impact stories:', error);
    return NextResponse.json({ error: 'Failed to fetch impact stories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const program = typeof data.program === 'string' ? data.program : '';
    const content = typeof data.content === 'string' ? data.content.trim() : '';
    const videoUrl = typeof data.videoUrl === 'string' ? data.videoUrl.trim() : '';

    if (!data.name || !data.role || !content || !IMPACT_PROGRAMS.includes(program as (typeof IMPACT_PROGRAMS)[number])) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    if (content.length > MAX_STORY_LENGTH) {
      return NextResponse.json({ error: 'Your story must be 5,000 characters or fewer.' }, { status: 400 });
    }

    if (data.consentToPublish !== true) {
      return NextResponse.json({ error: 'Consent to review your story for publication is required.' }, { status: 400 });
    }

    if (videoUrl && !getVideoEmbed(videoUrl)) {
      return NextResponse.json({ error: 'Please use a valid YouTube, Google Drive, or Loom video URL.' }, { status: 400 });
    }

    const connection = await connectImpactDB();
    const ImpactStory = getImpactStoryModel(connection);
    const story = await ImpactStory.create({
      name: data.name,
      role: data.role,
      email: data.email,
      linkedin: data.linkedin,
      program,
      cohort: data.cohort,
      sponsor: data.sponsor,
      before: data.before,
      content,
      cta: data.cta,
      videoUrl,
      imageUrl: '/avatar.svg',
      type: videoUrl ? 'video' : 'text',
      consentToPublish: true,
      isApproved: false,
      visibility: 'internal',
    });

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error('Error submitting impact story:', error);
    return NextResponse.json({ error: 'Unable to submit your story right now.' }, { status: 500 });
  }
}
