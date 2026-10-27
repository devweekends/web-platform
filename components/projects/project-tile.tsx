'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface ProjectItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  videoDemoUrl?: string;
  githubUrl?: string;
  submitterName: string;
}

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]';
const btnBase = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-semibold transition-colors ${focusRing}`;
const btnPrimary = `${btnBase} bg-[#0A0A0A] text-white hover:bg-[#262626]`;
const btnSecondary = `${btnBase} border border-[#D4D4D4] text-[#0A0A0A] hover:bg-[#F7F7F7]`;

/**
 * Project card for the projects page, in the new look. The older ProjectCard is
 * still used by the DSOC pages, so it is left alone.
 */
export function ProjectTile({ project }: { project: ProjectItem }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E6E6E6] bg-white transition duration-200 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View details: ${project.title}`}
          className={`relative block aspect-video w-full overflow-hidden bg-[#F7F7F7] ${focusRing}`}
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </button>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="line-clamp-1 text-[20px] font-semibold tracking-[-0.02em]" title={project.title}>
            {project.title}
          </h3>
          <p className="mt-1 truncate text-sm text-[#5C5C5C]">By {project.submitterName}</p>
          <p className="mt-3 line-clamp-3 text-[15px] leading-[1.65] text-[#404040]">{project.description}</p>

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            <button type="button" onClick={() => setOpen(true)} className={btnSecondary}>
              Details
            </button>
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                Visit project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="block max-h-[90vh] max-w-2xl space-y-5 overflow-y-auto rounded-[24px] border-[#E6E6E6] bg-white p-6 text-[#0A0A0A] sm:rounded-[24px] sm:p-8">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="pr-6 text-[26px] font-semibold leading-tight tracking-[-0.03em] text-[#0A0A0A]">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-[15px] text-[#5C5C5C]">By {project.submitterName}</DialogDescription>
          </DialogHeader>

          <div className="relative aspect-video w-full overflow-hidden rounded-[16px] border border-[#E6E6E6] bg-[#F7F7F7]">
            <Image src={project.imageUrl} alt={project.title} fill sizes="(min-width: 768px) 640px, 100vw" className="object-cover" />
          </div>

          <p className="whitespace-pre-wrap text-[16px] leading-[1.7] text-[#404040]">{project.description}</p>

          {(project.demoUrl || project.videoDemoUrl || project.githubUrl) && (
            <div className="flex flex-col gap-3 border-t border-[#E6E6E6] pt-5 sm:flex-row sm:flex-wrap">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  Visit live project
                </a>
              )}
              {project.videoDemoUrl && (
                <a href={project.videoDemoUrl} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                  <Video className="h-4 w-4" aria-hidden="true" />
                  Watch video demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                  <Github className="h-4 w-4" aria-hidden="true" />
                  View source code
                </a>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
