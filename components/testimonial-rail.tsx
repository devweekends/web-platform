'use client';

import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/site/page-kit';
import { TestimonialCard, type Testimonial } from '@/components/testimonial-card';

/**
 * A row of stories that never moves by itself. People scroll it with the
 * arrows, a swipe or the trackpad.
 */
export function TestimonialRail({
  stories,
  label,
  eyebrow,
  title,
  intro,
}: {
  stories: Testimonial[];
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  const rail = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(320, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        action={
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={`Previous ${label.toLowerCase()}`}
              onClick={() => scrollBy(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4D4D4] bg-white hover:bg-[#F7F7F7]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Next ${label.toLowerCase()}`}
              onClick={() => scrollBy(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0A0A0A] text-white hover:bg-[#262626]"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        }
      />
      <div
        ref={rail}
        tabIndex={0}
        role="region"
        aria-label={`${label}. Scroll sideways to see more.`}
        className="-mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-5 overflow-x-auto scroll-smooth px-6 pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]"
      >
        {stories.map((story) => (
          <div key={story._id} className="flex w-[300px] shrink-0 snap-start sm:w-[360px]">
            <TestimonialCard testimonial={story} />
          </div>
        ))}
      </div>
    </>
  );
}
