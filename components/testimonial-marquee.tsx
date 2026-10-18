'use client';

import { useState } from 'react';
import { TestimonialCard } from '@/components/testimonial-card';

type Testimonial = {
  _id: string;
  name: string;
  role: string;
  before?: string;
  content: string;
  cta?: string;
  videoUrl?: string;
  imageUrl?: string;
  type: 'text' | 'video';
  program?: string;
};

interface TestimonialMarqueeProps {
  stories: Testimonial[];
  label: string;
  emptyMessage: string;
}

export function TestimonialMarquee({
  stories,
  label,
  emptyMessage,
}: TestimonialMarqueeProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (stories.length === 0) {
    return (
      <div className="rounded-lg border border-dashed py-10 text-center text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  // A second copy lets the row loop without a blank space between stories.
  const loopedStories = stories.length > 1 ? [...stories, ...stories] : stories;

  return (
    <div className="testimonial-marquee group" role="region" aria-label={label}>
      <div
        className={`testimonial-marquee-track ${stories.length > 1 ? 'testimonial-marquee-track--moving' : ''} ${isDialogOpen ? 'testimonial-marquee-track--paused' : ''}`}
      >
        {loopedStories.map((story, index) => (
          <div className="w-[300px] shrink-0 sm:w-[340px]" key={`${story._id}-${index}`}>
            <TestimonialCard testimonial={story} onDialogOpenChange={setIsDialogOpen} />
          </div>
        ))}
      </div>
    </div>
  );
}
