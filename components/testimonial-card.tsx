'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getVideoEmbed } from '@/lib/video-url';

export interface Testimonial {
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
  createdAt?: string;
}

function formatProgram(program?: string) {
  if (!program) return null;
  return program
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const cardBase =
  'group flex h-full min-h-[340px] w-full flex-col overflow-hidden rounded-[20px] border border-[#E6E6E6] bg-white text-left transition duration-200 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]';
const label = 'text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]';
const dialogShell =
  'block max-h-[90vh] overflow-y-auto rounded-[24px] border-[#E6E6E6] bg-white p-0 text-[#0A0A0A] sm:rounded-[24px]';

/** Name, role, program and "before" lines, shared by the card and its dialog */
function Person({ testimonial, program }: { testimonial: Testimonial; program: string | null }) {
  return (
    <span className="block">
      {program && <span className={`${label} block`}>{program}</span>}
      <span className={`${program ? 'mt-1.5' : ''} block text-[17px] font-semibold tracking-[-0.01em] text-[#0A0A0A]`}>
        {testimonial.name}
      </span>
      <span className="mt-0.5 block text-sm text-[#5C5C5C]">{testimonial.role}</span>
      {testimonial.before && <span className="mt-1 block text-sm text-[#5C5C5C]">Before: {testimonial.before}</span>}
    </span>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isTextOpen, setIsTextOpen] = useState(false);
  const program = formatProgram(testimonial.program);

  const video = getVideoEmbed(testimonial.videoUrl);
  const thumbnailUrl = video?.thumbnailUrl ?? '/avatar.svg';

  if (testimonial.type === 'video' && video) {
    return (
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogTrigger asChild>
          <button type="button" className={cardBase} aria-label={`Play video story: ${testimonial.name}`}>
            <span className="relative block aspect-video w-full overflow-hidden bg-[#0A0A0A]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0A0A0A] shadow-lg">
                  <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                </span>
              </span>
            </span>
            <span className="flex flex-1 flex-col gap-3 p-5">
              <Person testimonial={testimonial} program={program} />
              <span className="line-clamp-2 text-[15px] leading-[1.6] text-[#404040]">&ldquo;{testimonial.content}&rdquo;</span>
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className={`${dialogShell} sm:max-w-3xl`}>
          <DialogTitle className="sr-only">{`${testimonial.name}'s ${video.provider} video`}</DialogTitle>
          <div className="relative aspect-video w-full bg-[#0A0A0A]">
            <iframe
              width="100%"
              height="100%"
              src={video.embedUrl}
              title={`${testimonial.name}'s ${video.provider} video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
          <div className="space-y-4 p-6 sm:p-8">
            <Person testimonial={testimonial} program={program} />
            <DialogDescription className="whitespace-pre-wrap text-[15px] leading-[1.7] text-[#404040]">
              &ldquo;{testimonial.content}&rdquo;
            </DialogDescription>
            {testimonial.cta && <p className="text-[15px] font-semibold text-[#0A0A0A]">{testimonial.cta}</p>}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isTextOpen} onOpenChange={setIsTextOpen}>
      <DialogTrigger asChild>
        <button type="button" className={`${cardBase} p-7`} aria-label={`Read ${testimonial.name}'s full story`}>
          <span className="mb-5 line-clamp-[8] text-[17px] leading-[1.6] text-[#262626]">&ldquo;{testimonial.content}&rdquo;</span>
          <span className="mt-auto block w-full border-t border-[#E6E6E6] pt-[18px]">
            <Person testimonial={testimonial} program={program} />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className={`${dialogShell} p-6 sm:max-w-xl sm:p-8`}>
        <div className="space-y-5">
          <div>
            <DialogTitle className="text-[26px] font-semibold leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              {testimonial.name}
            </DialogTitle>
            <p className="mt-1 text-sm text-[#5C5C5C]">{testimonial.role}</p>
            {program && <p className={`${label} mt-3`}>{program}</p>}
            {testimonial.before && <p className="mt-1 text-sm text-[#5C5C5C]">Before: {testimonial.before}</p>}
          </div>
          <DialogDescription className="whitespace-pre-wrap text-[17px] leading-[1.7] text-[#262626]">
            &ldquo;{testimonial.content}&rdquo;
          </DialogDescription>
          {testimonial.cta && <p className="text-[15px] font-semibold text-[#0A0A0A]">{testimonial.cta}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
