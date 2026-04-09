'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type JobDoc = {
  _id: string;
  title: string;
  company: string;
  location?: string;
  workplaceType?: string;
  employmentType?: string;
  audience?: string;
  description: string;
  requirements?: string;
  applyUrl?: string;
  applyEmail?: string;
  deadline?: string;
  tags?: string[];
  createdAt?: string;
};

export default function CarrersPage() {
  const [jobs, setJobs] = useState<JobDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [audience, setAudience] = useState<'all' | 'Students' | 'Professionals' | 'Both'>('all');
  const [workplace, setWorkplace] = useState<'all' | 'Remote' | 'Hybrid' | 'Onsite'>('all');
  const [employment, setEmployment] = useState<'all' | 'Internship' | 'Full-time' | 'Part-time' | 'Contract'>('all');
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobDoc | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsJob, setDetailsJob] = useState<JobDoc | null>(null);

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      if (audience !== 'all' && (j.audience || 'Both') !== audience) return false;
      if (workplace !== 'all' && (j.workplaceType || 'Remote') !== workplace) return false;
      if (employment !== 'all' && (j.employmentType || 'Full-time') !== employment) return false;
      if (!q) return true;
      return (
        j.title?.toLowerCase().includes(q) ||
        j.company?.toLowerCase().includes(q) ||
        (j.location || '').toLowerCase().includes(q) ||
        (j.tags || []).join(' ').toLowerCase().includes(q)
      );
    });
  }, [jobs, search, audience, workplace, employment]);

  const openApply = (job: JobDoc) => {
    setSelectedJob(job);
    setApplyOpen(true);
  };

  const openDetails = (job: JobDoc) => {
    setDetailsJob(job);
    setDetailsOpen(true);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold">Careers</h1>
        <p className="text-muted-foreground mt-3">
          Hand-picked opportunities for students and professionals across Dev Weekends and Dev Weekends partner companies.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Input
          placeholder="Search jobs (title, company, tags...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-md"
        />
        <Select value={audience} onValueChange={(v) => setAudience(v as any)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Audience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Students">Students</SelectItem>
            <SelectItem value="Professionals">Professionals</SelectItem>
            <SelectItem value="Both">Both</SelectItem>
          </SelectContent>
        </Select>
        <Select value={workplace} onValueChange={(v) => setWorkplace(v as any)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Workplace" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Workplaces</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Onsite">Onsite</SelectItem>
          </SelectContent>
        </Select>
        <Select value={employment} onValueChange={(v) => setEmployment(v as any)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Employment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employment</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Button asChild variant="outline">
          <Link href="https://linktr.ee/DevWeekends" target="_blank" rel="noopener noreferrer">
            Share a Job
          </Link>
        </Button>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="text-muted-foreground">Loading jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-lg font-medium">No jobs right now</div>
              <div className="text-muted-foreground mt-2">Check back soon — we post opportunities regularly.</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              return (
                <Card key={job._id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {job.workplaceType ? <Badge variant="secondary">{job.workplaceType}</Badge> : null}
                      {job.employmentType ? <Badge variant="secondary">{job.employmentType}</Badge> : null}
                      {job.audience ? <Badge variant="outline">{job.audience}</Badge> : null}
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>
                        <span className="text-foreground font-semibold">Company:</span>{' '}
                        <span className="text-foreground">{job.company}</span>
                      </div>
                      <div>
                        <span className="text-foreground font-semibold">Location:</span>{' '}
                        <span>{job.location || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-foreground font-semibold">Deadline:</span>{' '}
                        <span>{job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <p className="text-sm line-clamp-4">{job.description}</p>
                    {Array.isArray(job.tags) && job.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {job.tags.slice(0, 6).map((t, idx) => (
                          <Badge key={`${job._id}-${idx}`} variant="outline">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="w-full flex flex-col sm:flex-row gap-2">
                      <Button className="w-full" variant="outline" onClick={() => openDetails(job)}>
                        Read more
                      </Button>
                      <Button className="w-full" onClick={() => openApply(job)}>
                        Apply
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Dialog
        open={detailsOpen}
        onOpenChange={(open) => {
          setDetailsOpen(open);
          if (!open) setDetailsJob(null);
        }}
      >
        <DialogContent className="w-[calc(100vw-1.5rem)] sm:w-full max-w-2xl max-h-[90vh] overflow-hidden p-4 sm:p-6 grid-rows-[auto,1fr]">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
            <DialogDescription>
              {detailsJob ? (
                <>
                  {detailsJob.title} @ {detailsJob.company}
                </>
              ) : (
                'Job details'
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 overflow-y-auto pr-1 space-y-4">
            <div className="text-sm text-muted-foreground space-y-1">
              <div>
                <span className="text-foreground font-semibold">Company:</span>{' '}
                <span className="text-foreground">{detailsJob?.company || ''}</span>
              </div>
              <div>
                <span className="text-foreground font-semibold">Location:</span>{' '}
                <span>{detailsJob?.location || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-foreground font-semibold">Deadline:</span>{' '}
                <span>
                  {detailsJob?.deadline ? new Date(detailsJob.deadline).toLocaleDateString() : 'Not specified'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Description</div>
              <div className="text-sm whitespace-pre-wrap">{detailsJob?.description || ''}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Requirements</div>
              <div className="text-sm whitespace-pre-wrap">
                {detailsJob?.requirements?.trim() ? detailsJob.requirements : 'Not provided'}
              </div>
            </div>

            {Array.isArray(detailsJob?.tags) && detailsJob!.tags!.length > 0 ? (
              <div className="space-y-2">
                <div className="text-sm font-semibold">Tags</div>
                <div className="flex flex-wrap gap-1">
                  {detailsJob!.tags!.map((t, idx) => (
                    <Badge key={`details-${detailsJob!._id}-${idx}`} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={applyOpen}
        onOpenChange={(open) => {
          setApplyOpen(open);
          if (!open) setSelectedJob(null);
        }}
      >
        <DialogContent className="w-[calc(100vw-1.5rem)] sm:w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>Apply Details</DialogTitle>
            <DialogDescription>
              {selectedJob ? (
                <>
                  {selectedJob.title} @ {selectedJob.company}
                </>
              ) : (
                'Job apply details'
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold">Apply URL</div>
              <div className="flex items-center gap-2">
                <Input readOnly value={selectedJob?.applyUrl?.trim() || 'Not provided'} />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => copyToClipboard(selectedJob?.applyUrl?.trim() || '')}
                  disabled={!selectedJob?.applyUrl?.trim()}
                >
                  Copy
                </Button>
              </div>
              {selectedJob?.applyUrl?.trim() ? (
                <div className="text-xs text-muted-foreground">
                  You can also open it in a new tab:{" "}
                  <a
                    className="underline"
                    href={selectedJob.applyUrl.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open link
                  </a>
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Apply Email</div>
              <div className="flex items-center gap-2">
                <Input readOnly value={selectedJob?.applyEmail?.trim() || 'Not provided'} />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => copyToClipboard(selectedJob?.applyEmail?.trim() || '')}
                  disabled={!selectedJob?.applyEmail?.trim()}
                >
                  Copy
                </Button>
              </div>
              {selectedJob?.applyEmail?.trim() ? (
                <div className="text-xs text-muted-foreground">
                  You can email directly:{" "}
                  <a className="underline" href={`mailto:${selectedJob.applyEmail.trim()}`}>
                    Open email
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


