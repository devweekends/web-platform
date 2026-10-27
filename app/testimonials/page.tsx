import connectDB from '@/lib/db';
import connectImpactDB from '@/lib/impact-db';
import { Testimonial as TestimonialModel } from '@/models/Testimonial';
import { getImpactStoryModel } from '@/models/ImpactStory';
import { getVideoEmbed } from '@/lib/video-url';
import { SubmitImpactStoryModal } from '@/components/submit-impact-story-modal';
import { TestimonialRail } from '@/components/testimonial-rail';
import type { Testimonial } from '@/components/testimonial-card';
import { Card, Eyebrow, PageHero, Panel, Section } from '@/components/site/page-kit';

export const dynamic = 'force-dynamic';

async function getTestimonials() {
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

async function getPublicImpactStories() {
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

export const metadata = {
  alternates: { canonical: "/testimonials" },
  title: 'Stories from our community',
  description: 'Hear from our community members about their experience with DevWeekends.',
};

export default async function TestimonialsPage() {
  const [legacyTestimonials, impactStories] = await Promise.all([
    getTestimonials(),
    getPublicImpactStories(),
  ]);
  const testimonials: Testimonial[] = [...legacyTestimonials, ...impactStories].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  // Video stories first. A "video" story whose link cannot be embedded reads as a written story.
  const videoTestimonials = testimonials.filter((t) => t.type === 'video' && getVideoEmbed(t.videoUrl));
  const textTestimonials = testimonials.filter((t) => !videoTestimonials.includes(t));

  return (
    <>
      <PageHero
        eyebrow="Community stories"
        title="Stories from our community."
        intro="See what our mentees, fellows and mentors have to say about their journey."
        actions={<SubmitImpactStoryModal />}
      />

      {testimonials.length === 0 && (
        <Section>
          <Card tone="gray" className="items-center py-16 text-center">
            <p className="text-[19px] font-semibold tracking-[-0.01em]">No stories shared yet.</p>
            <p className="mt-2 text-[17px] text-[#5C5C5C]">Be the first to share yours.</p>
          </Card>
        </Section>
      )}

      {videoTestimonials.length > 0 && (
        <Section>
          <TestimonialRail
            stories={videoTestimonials}
            label="Video stories"
            eyebrow="Watch"
            title="Video stories."
            intro="Hear directly from our community."
          />
        </Section>
      )}

      {textTestimonials.length > 0 && (
        <Section tone={videoTestimonials.length > 0 ? 'gray' : 'white'}>
          <TestimonialRail
            stories={textTestimonials}
            label="Written stories"
            eyebrow="Read"
            title="Written stories."
            intro="Read about the journeys behind the work."
          />
        </Section>
      )}

      <Panel>
        <Eyebrow onDark>Your turn</Eyebrow>
        <h2 className="mt-3.5 max-w-[20ch] text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
          Share what Dev Weekends did for you.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-[#C7C7C7]">
          We review every submission before it appears publicly.
        </p>
        <div className="mt-9">
          <SubmitImpactStoryModal variant="onDark" />
        </div>
      </Panel>
    </>
  );
}
