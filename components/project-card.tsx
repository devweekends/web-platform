'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Github, User, ArrowUpRight, Eye, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  videoDemoUrl?: string;
  githubUrl?: string;
  submitterName: string;
  submitterEmail: string;
  isApproved: boolean;
  createdAt: string;
}

export function ProjectCard({ project }: { project: Project }) {
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border-muted/60">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
             <Button 
              size="sm" 
              variant="secondary" 
              className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white text-black"
              onClick={() => setIsReadMoreOpen(true)}
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </Button>
            {project.videoDemoUrl && (
              <Button asChild size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white text-black">
                <Link href={project.videoDemoUrl} target="_blank" rel="noopener noreferrer" title="Watch Video Demo">
                  <Video className="w-4 h-4" />
                </Link>
              </Button>
            )}
            {project.demoUrl && (
              <Button asChild size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white text-black">
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" title="View Demo">
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white text-black">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="View Code">
                  <Github className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        <CardHeader className="p-4 pb-2 space-y-1">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg font-semibold leading-tight line-clamp-1" title={project.title}>
              {project.title}
            </CardTitle>
          </div>
          <CardDescription className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
            <User className="w-3 h-3" />
            <span className="truncate">{project.submitterName}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-2 flex-1 flex flex-col gap-3">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <div className="mt-auto pt-2">
            <button 
              onClick={() => setIsReadMoreOpen(true)}
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              Read more
            </button>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
            {project.demoUrl ? (
             <Button asChild variant="default" size="sm" className="w-full text-xs h-8">
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Visit Project <ArrowUpRight className="w-3 h-3 ml-1.5" />
                </Link>
              </Button>
            ) : (
                <Button variant="secondary" size="sm" className="w-full text-xs h-8" disabled>
                   No Demo Available
                </Button>
            )}
        </CardFooter>
      </Card>

      <Dialog open={isReadMoreOpen} onOpenChange={setIsReadMoreOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{project.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2 mt-1">
                By <span className="font-medium text-foreground">{project.submitterName}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-2">
            <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted border">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed text-foreground/90">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                {project.demoUrl && (
                  <Button asChild className="flex-1">
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Live Project
                    </Link>
                  </Button>
                )}
                {project.videoDemoUrl && (
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={project.videoDemoUrl} target="_blank" rel="noopener noreferrer">
                      <Video className="w-4 h-4 mr-2" />
                      Watch Video Demo
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
