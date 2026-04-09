import { Suspense } from 'react';
import connectDB from '@/lib/db';
import { Testimonial } from '@/models/Testimonial';
import { SubmitTestimonialModal } from '@/components/submit-testimonial-modal';
import { TestimonialCard } from '@/components/testimonial-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getTestimonials() {
  await connectDB();
  const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(testimonials));
}

export const metadata = {
  title: 'Testimonials | DevWeekends',
  description: 'Hear from our community members about their experience with DevWeekends.',
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
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
        <SubmitTestimonialModal />
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-muted/30 rounded-lg">
          <p className="text-xl">No stories shared yet. Be the first to share yours!</p>
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full space-y-8">
          <div className="flex justify-center md:justify-start">
             <TabsList>
                <TabsTrigger value="all">All Stories</TabsTrigger>
                <TabsTrigger value="video">Video Testimonials</TabsTrigger>
                <TabsTrigger value="text">Written Stories</TabsTrigger>
              </TabsList>
          </div>

          <TabsContent value="all" className="space-y-8">
             {/* Featured / Mixed Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t: any) => (
                    <TestimonialCard key={t._id} testimonial={t} />
                ))}
             </div>
          </TabsContent>

          <TabsContent value="video">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoTestimonials.length > 0 ? (
                    videoTestimonials.map((t: any) => (
                        <TestimonialCard key={t._id} testimonial={t} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No video testimonials yet.
                    </div>
                )}
             </div>
          </TabsContent>

          <TabsContent value="text">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {textTestimonials.length > 0 ? (
                    textTestimonials.map((t: any) => (
                        <TestimonialCard key={t._id} testimonial={t} />
                    ))
                ) : (
                     <div className="col-span-full text-center py-10 text-muted-foreground">
                        No written stories yet.
                    </div>
                )}
             </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
