import connectDB from '@/lib/db';
import connectImpactDB from '@/lib/impact-db';
import { Testimonial } from '@/models/Testimonial';
import { getImpactStoryModel } from '@/models/ImpactStory';
import { SubmitImpactStoryModal } from '@/components/submit-impact-story-modal';
import { TestimonialMarquee } from '@/components/testimonial-marquee';

export const dynamic = 'force-dynamic';

async function getTestimonials() {
  await connectDB();
  const testimonials = await Testimonial.find({ isApproved: true })
    .select('name role before content cta videoUrl imageUrl type createdAt')
    .sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(testimonials));
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
  title: 'Testimonials | DevWeekends',
  description: 'Hear from our community members about their experience with DevWeekends.',
};

export default async function TestimonialsPage() {
  const [legacyTestimonials, impactStories] = await Promise.all([
    getTestimonials(),
    getPublicImpactStories(),
  ]);
  const testimonials = [...legacyTestimonials, ...impactStories].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const videoTestimonials = testimonials.filter((t: any) => t.type === 'video');
  const textTestimonials = testimonials.filter((t: any) => t.type === 'text');

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Community Stories</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            See what our Mentees, Fellows, and Mentors have to say about their journey.
          </p>
        </div>
        <SubmitImpactStoryModal />
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-muted/30 rounded-lg">
          <p className="text-xl">No stories shared yet. Be the first to share yours!</p>
        </div>
      ) : (
        <div className="space-y-12">
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Video stories</h2>
              <p className="text-sm text-muted-foreground">Hear directly from our community.</p>
            </div>
            <TestimonialMarquee
              stories={videoTestimonials}
              label="Video testimonials"
              emptyMessage="No video testimonials yet."
            />
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Written stories</h2>
              <p className="text-sm text-muted-foreground">Read about the journeys behind the work.</p>
            </div>
            <TestimonialMarquee
              stories={textTestimonials}
              label="Written testimonials"
              emptyMessage="No written stories yet."
            />
          </section>
        </div>
      )}
    </div>
  );
}
