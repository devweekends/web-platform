import connectDB from '@/lib/db';
import connectImpactDB from '@/lib/impact-db';
import { getVideoEmbed } from '@/lib/video-url';
import { Testimonial as TestimonialModel } from '@/models/Testimonial';
import { getImpactStoryModel } from '@/models/ImpactStory';
import type { Testimonial } from '@/components/testimonial-card';

/**
 * Public community stories, from both the original testimonials and the newer
 * impact stories. The stories page and the video rail on other pages read from
 * here, so a story approved in the admin shows up everywhere.
 */

async function getLegacyTestimonials(): Promise<Testimonial[]> {
  try {
    await connectDB();
    const testimonials = await TestimonialModel.find({ isApproved: true })
      .select('name role before content cta videoUrl imageUrl type createdAt')
      .sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(testimonials));
  } catch (error) {
    console.error('Unable to load testimonials:', error);
    return [];
  }
}

async function getPublicImpactStories(): Promise<Testimonial[]> {
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
    return JSON.parse(JSON.stringify(stories));
  } catch (error) {
    console.error('Unable to load public impact stories:', error);
    return [];
  }
}

/** Newest first, across both sources */
export async function getPublicStories(): Promise<Testimonial[]> {
  const [legacy, impact] = await Promise.all([getLegacyTestimonials(), getPublicImpactStories()]);
  return [...legacy, ...impact].sort(
    (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
  );
}

/**
 * A preview image for a video link. YouTube and Google Drive have fixed
 * thumbnail URLs; Loom's includes a hash, so it is read from Loom's oEmbed
 * endpoint and cached for a day.
 */
export async function getVideoPreview(videoUrl?: string): Promise<string | undefined> {
  const embed = getVideoEmbed(videoUrl);
  if (!embed) return undefined;
  if (embed.thumbnailUrl) return embed.thumbnailUrl;
  if (embed.provider !== 'Loom' || !videoUrl) return undefined;

  try {
    const res = await fetch(`https://www.loom.com/v1/oembed?url=${encodeURIComponent(videoUrl)}`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { thumbnail_url?: unknown };
    const thumbnail = typeof data.thumbnail_url === 'string' ? data.thumbnail_url : undefined;
    return thumbnail?.startsWith('https://cdn.loom.com/') ? thumbnail : undefined;
  } catch {
    return undefined;
  }
}

/** Adds `previewUrl` to every video story */
export async function withPreviews(stories: Testimonial[]): Promise<Testimonial[]> {
  return Promise.all(
    stories.map(async (story) =>
      story.type === 'video' ? { ...story, previewUrl: await getVideoPreview(story.videoUrl) } : story,
    ),
  );
}

export type VideoStory = { name: string; role: string; url: string; previewUrl?: string };

/** Open source stories (GSoC, LFX and similar) lead the video rail */
function openSourceRank(role: string) {
  return /gsoc|summer of code|lfx|esoc/i.test(role) ? 0 : 1;
}

export async function getVideoStories(): Promise<VideoStory[]> {
  const stories = await getPublicStories();
  const videos = stories.filter((story) => story.type === 'video' && getVideoEmbed(story.videoUrl));
  const withImages = await withPreviews(videos);
  return withImages
    .map((story) => ({ name: story.name, role: story.role, url: story.videoUrl as string, previewUrl: story.previewUrl }))
    .sort((a, b) => openSourceRank(a.role) - openSourceRank(b.role));
}
