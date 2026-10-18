'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Quote } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from 'react';
import { getVideoEmbed } from '@/lib/video-url';

interface Testimonial {
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
}

function formatProgram(program?: string) {
  if (!program) return null;
  return program
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function TestimonialCard({
  testimonial,
  onDialogOpenChange,
}: {
  testimonial: Testimonial;
  onDialogOpenChange?: (open: boolean) => void;
}) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isTextOpen, setIsTextOpen] = useState(false);
  const program = formatProgram(testimonial.program);

  const video = getVideoEmbed(testimonial.videoUrl);
  const thumbnailUrl = video?.thumbnailUrl ?? '/avatar.svg';

  if (testimonial.type === 'video' && video) {
    return (
      <Dialog open={isVideoOpen} onOpenChange={(open) => {
        setIsVideoOpen(open);
        onDialogOpenChange?.(open);
      }}>
        <DialogTrigger asChild>
          <Card className="group h-[350px] cursor-pointer overflow-hidden border-muted/60 transition-all duration-300 hover:shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={thumbnailUrl}
                alt={testimonial.name}
                className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <Badge className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 border-none text-white">
                {video.provider}
              </Badge>
            </div>
            <CardHeader className="p-4 pb-2 space-y-1">
              <div>
                <h3 className="font-semibold leading-tight">{testimonial.name}</h3>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                {program && <Badge variant="secondary" className="mt-2 text-[10px]">{program}</Badge>}
                {testimonial.before && (
                  <p className="text-xs text-muted-foreground">Before: {testimonial.before}</p>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-muted-foreground line-clamp-2 italic">
                "{testimonial.content}"
              </p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-black border-none">
          <div className="relative aspect-video w-full">
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
          <div className="p-4 bg-background">
            <div className="mb-2">
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              {program && <Badge variant="secondary" className="mt-2 text-[10px]">{program}</Badge>}
              {testimonial.before && (
                <p className="text-xs text-muted-foreground">Before: {testimonial.before}</p>
              )}
            </div>
            <p className="text-sm text-muted-foreground italic">"{testimonial.content}"</p>
            {testimonial.cta && (
              <p className="mt-3 text-sm font-semibold text-foreground">
                {testimonial.cta}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isTextOpen} onOpenChange={(open) => {
      setIsTextOpen(open);
      onDialogOpenChange?.(open);
    }}>
      <DialogTrigger asChild>
        <button type="button" className="block w-full rounded-lg border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label={`Read ${testimonial.name}'s full story`}>
          <Card className="h-[350px] overflow-hidden border-muted/60 transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex h-full flex-col gap-3 p-5">
              <Quote className="w-8 h-8 text-primary/20" />
              <p className="line-clamp-5 flex-1 text-muted-foreground italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="mt-auto border-t pt-4">
                <h3 className="text-sm font-semibold">{testimonial.name}</h3>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                {program && <Badge variant="secondary" className="mt-2 text-[10px]">{program}</Badge>}
                {testimonial.before && (
                  <p className="text-xs text-muted-foreground">Before: {testimonial.before}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{testimonial.name}</DialogTitle>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </DialogHeader>
        {program && <Badge variant="secondary" className="w-fit">{program}</Badge>}
        {testimonial.before && <p className="text-sm text-muted-foreground">Before: {testimonial.before}</p>}
        <p className="whitespace-pre-wrap leading-relaxed">"{testimonial.content}"</p>
        {testimonial.cta && <p className="font-semibold">{testimonial.cta}</p>}
      </DialogContent>
    </Dialog>
  );
}
