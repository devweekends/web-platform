'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  Clock,
  Users,
  Calendar,
  Github,
  ExternalLink,
  Linkedin,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Target,
  Code2,
  MessageCircle,
  Star,
  ImageIcon,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { resizedImage } from "@/lib/image-url";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, container } from "@/components/site/page-kit";
import DSOCNavbar from "../../components/DSOCNavbar";

import { SAMPLE_PROJECTS, type Project } from "./project-data";

/**
 * The project view. `initialProject` is the project as the server read it, so
 * the first HTML already holds the title and description. Without it (the
 * database was unreachable on the server) the project is loaded here instead.
 */
export default function ProjectDetail({ initialProject }: { initialProject: Project | null }) {
  const routeParams = useParams<{ id: string }>();
  const projectId = routeParams?.id;
  const [project, setProject] = useState<Project | null>(initialProject);
  const [loading, setLoading] = useState(!initialProject);
  const [error, setError] = useState('');
  const [isMentee, setIsMentee] = useState<boolean | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const getRepoLabel = (url: string) => {
    try {
      const path = new URL(url).pathname;
      const parts = path.split('/').filter(Boolean);
      if (parts.length >= 2) {
        return parts.slice(-2).join('/');
      }
      return 'Repository';
    } catch {
      return 'Repository';
    }
  };

  const repoUrls = project
    ? Array.isArray(project.repositoryUrls) && project.repositoryUrls.length > 0
      ? project.repositoryUrls
      : (project.repositoryUrl ? [project.repositoryUrl] : [])
    : [];

  useEffect(() => {
    fetchProject();
    checkMenteeSession();
  }, [projectId]);

  const checkMenteeSession = async () => {
    try {
      const res = await fetch('/api/dsoc/mentee/me', { credentials: 'include' });
      const data = await res.json();
      setIsMentee(Boolean(data?.success));
    } catch (err) {
      console.error('Error checking mentee session:', err);
      setIsMentee(false);
    }
  };

  const fetchProject = async () => {
    // Already here from the server
    if (initialProject) return;
    if (!projectId) {
      setLoading(true);
      return;
    }

    // Check for sample project first
    if (SAMPLE_PROJECTS[projectId]) {
      setProject(SAMPLE_PROJECTS[projectId]);
      setLoading(false);
      return;
    }
    
    try {
      const res = await fetch(`/api/dsoc/projects/${projectId}`);
      const data = await res.json();
      
      if (data.success) {
        setProject(data.data);
      } else {
        setError(data.error || 'Project not found');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  /** Difficulty in black and white: outline for beginner, grey fill for intermediate, black fill for advanced. */
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'border border-[#D4D4D4] bg-white text-[#404040]';
      case 'advanced': return 'border border-[#0A0A0A] bg-[#0A0A0A] text-white';
      default: return 'border border-[#E6E6E6] bg-[#E6E6E6] text-[#262626]';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'border border-[#0A0A0A] bg-[#0A0A0A] text-white';
      case 'in-progress': return 'border border-[#E6E6E6] bg-[#E6E6E6] text-[#262626]';
      default: return 'border border-[#D4D4D4] bg-white text-[#404040]';
    }
  };

  const formatDate = (dateString: string) => {
    // Dates are stored as a calendar day at midnight UTC. Reading them in UTC
    // shows that day to every visitor, and the same text on the server and in the browser.
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  const getDeadlineEnd = (dateValue: string | Date) => {
    if (dateValue instanceof Date) {
      return new Date(
        dateValue.getUTCFullYear(),
        dateValue.getUTCMonth(),
        dateValue.getUTCDate(),
        23,
        59,
        59,
        999
      );
    }

    const [year, month, day] = dateValue.slice(0, 10).split('-').map(Number);

    if (!year || !month || !day) {
      return new Date(dateValue);
    }

    return new Date(year, month - 1, day, 23, 59, 59, 999);
  };

  const isDeadlinePassed = project ? new Date() > getDeadlineEnd(project.applicationDeadline) : false;
  const spotsRemaining = project ? project.maxMentees - (project.selectedMentees?.length || 0) : 0;
  const canApply = project ? project.status === 'open' && !isDeadlinePassed && spotsRemaining > 0 : false;



  if (loading) {
    return (
      <div className="min-h-screen bg-white text-[#0A0A0A]">
        <DSOCNavbar />
        <div role="status" className="py-32 text-center">
          <div aria-hidden="true" className="inline-block h-10 w-10 animate-spin rounded-full border-[3px] border-[#E6E6E6] border-t-[#0A0A0A]" />
          <p className="mt-4 text-[#5C5C5C]">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white text-[#0A0A0A]">
        <DSOCNavbar />
        <div className={`${container} py-24 text-center`}>
          <AlertCircle aria-hidden="true" className="mx-auto mb-5 h-14 w-14 text-[#8A8A8A]" />
          <h1 className="mb-3 text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.04em]">Project Not Found</h1>
          <p className="mx-auto mb-8 max-w-[48ch] text-[17px] leading-[1.6] text-[#5C5C5C]">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
          <Link href="/dsoc/projects" className={primaryButton}>
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <DSOCNavbar />
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project image"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[200] flex cursor-zoom-out items-center justify-center bg-black/80 p-4"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            aria-label="Close image"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0A0A0A] transition-colors hover:bg-[#E6E6E6]"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resizedImage(lightboxImage, 1920)}
            alt="Project image"
            className="max-h-[90vh] max-w-[90vw] rounded-[14px] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Header */}
      <section className="border-b border-[#E6E6E6] bg-white">
        <div className={`${container} py-10 md:py-16`}>
          <Link
            href="/dsoc/projects"
            className="-ml-3 inline-flex min-h-11 items-center gap-2 rounded-[10px] px-3 text-[15px] font-medium text-[#404040] transition-colors hover:text-black"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">
              {project.organization}
            </span>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${getDifficultyColor(project.difficulty)}`}>
              {project.difficulty}
            </span>
          </div>
          <h1 className="mt-5 max-w-[22ch] text-[clamp(36px,5.5vw,64px)] font-semibold leading-[1.04] tracking-[-0.04em]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-[19px] leading-[1.65] text-[#404040]">
            {project.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {repoUrls.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryButton}
              >
                <Github aria-hidden="true" className="h-5 w-5" />
                {getRepoLabel(url)}
              </a>
            ))}
            {project.timelineUrl && (
              <a
                href={project.timelineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButton}
              >
                <Calendar aria-hidden="true" className="h-5 w-5" />
                Timeline
              </a>
            )}
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButton}
              >
                <ExternalLink aria-hidden="true" className="h-5 w-5" />
                Website
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#F7F7F7]">
        <div className={`${container} py-12 md:py-16`}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
            {/* Left Column - Main Content */}
            <div className="min-w-0 space-y-6">
              {/* Technologies */}
              <Card>
                <BlockTitle icon={Code2}>Technologies</BlockTitle>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="inline-flex items-center rounded-full bg-[#F7F7F7] px-3.5 py-1.5 text-sm font-medium text-[#404040]">
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Gallery */}
              {Array.isArray(project.gallery) && project.gallery.length > 0 && (
                <Card>
                  <BlockTitle icon={ImageIcon}>Gallery</BlockTitle>
                  <div className={galleryClasses}>
                    <Swiper
                      modules={[Navigation, Pagination, Keyboard]}
                      navigation
                      pagination={{ clickable: true }}
                      keyboard={{ enabled: true }}
                      loop={project.gallery.length > 1}
                      spaceBetween={0}
                      slidesPerView={1}
                      className="w-full"
                    >
                      {project.gallery.map((url, i) => (
                        <SwiperSlide key={url + i}>
                          <button
                            type="button"
                            onClick={() => setLightboxImage(url)}
                            className="block w-full cursor-zoom-in border-0 bg-transparent p-0"
                            aria-label={`Open gallery image ${i + 1}`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={resizedImage(url, 1080)}
                              alt={`${project.title} image ${i + 1}`}
                              className="h-64 w-full object-cover sm:h-80 md:h-96"
                              loading={i === 0 ? 'eager' : 'lazy'}
                            />
                          </button>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </Card>
              )}

              {/* Long Description */}
              {project.longDescription && (
                <Card>
                  <BlockTitle icon={BookOpen}>About This Project</BlockTitle>
                  <p className="whitespace-pre-line text-[16px] leading-[1.7] text-[#404040]">{project.longDescription}</p>
                </Card>
              )}

              {/* Requirements */}
              {project.requirements && project.requirements.length > 0 && (
                <Card>
                  <BlockTitle icon={CheckCircle}>Requirements</BlockTitle>
                  <ul className="space-y-3">
                    {project.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#404040]">
                        <CheckCircle aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0A0A0A]" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Learning Outcomes */}
              {project.learningOutcomes && project.learningOutcomes.length > 0 && (
                <Card>
                  <BlockTitle icon={Target}>What You&apos;ll Learn</BlockTitle>
                  <ol className="space-y-3">
                    {project.learningOutcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#404040]">
                        <span aria-hidden="true" className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#F7F7F7] text-xs font-semibold text-[#0A0A0A]">
                          {i + 1}
                        </span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              )}

              {/* Milestones */}
              {project.milestones && project.milestones.length > 0 && (
                <Card>
                  <BlockTitle icon={Calendar}>Project Milestones</BlockTitle>
                  <ol className="space-y-3">
                    {project.milestones.map((milestone, i) => (
                      <li
                        key={i}
                        className={`rounded-[14px] border border-[#E6E6E6] p-4 ${milestone.completed ? 'bg-[#F7F7F7]' : 'bg-white'}`}
                      >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div>
                            <h3 className="flex items-center gap-2 font-semibold">
                              {milestone.completed && (
                                <CheckCircle aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
                              )}
                              {milestone.title}
                            </h3>
                            <p className="mt-1 text-sm leading-[1.55] text-[#5C5C5C]">{milestone.description}</p>
                          </div>
                          {milestone.dueDate && (
                            <span className="text-xs font-semibold text-[#5C5C5C] sm:whitespace-nowrap">
                              {formatDate(milestone.dueDate)}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </Card>
              )}

              {/* Mentors */}
              <Card>
                <BlockTitle icon={Users}>Mentors</BlockTitle>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {project.mentors.map((mentor) => (
                    <li key={mentor._id} className="rounded-[14px] border border-[#E6E6E6] p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0A0A0A] text-xl font-semibold text-white">
                          {mentor.picture ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={mentor.picture} alt={mentor.name} className="h-full w-full object-cover" />
                          ) : (
                            mentor.name.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold tracking-[-0.02em]">{mentor.name}</h3>
                          {mentor.jobTitle && (
                            <p className="text-sm text-[#5C5C5C]">
                              {mentor.jobTitle}
                              {mentor.company && ` @ ${mentor.company}`}
                            </p>
                          )}
                          {mentor.bio && (
                            <p className="mt-2 line-clamp-2 text-sm leading-[1.55] text-[#404040]">{mentor.bio}</p>
                          )}
                          <div className="-mb-1 mt-2 flex gap-2">
                            {mentor.github && (
                              <a
                                href={mentor.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${mentor.name} on GitHub`}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4D4D4] transition-colors hover:bg-[#F7F7F7]"
                              >
                                <Github aria-hidden="true" className="h-4 w-4" />
                              </a>
                            )}
                            {mentor.linkedin && (
                              <a
                                href={mentor.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${mentor.name} on LinkedIn`}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4D4D4] transition-colors hover:bg-[#F7F7F7]"
                              >
                                <Linkedin aria-hidden="true" className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="min-w-0 space-y-6">
              {/* Apply Card */}
              <div className="rounded-[20px] bg-[#0A0A0A] p-7 text-white">
                <h2 className="mb-5 text-[22px] font-semibold tracking-[-0.02em]">Apply to This Project</h2>

                <dl className="mb-6 divide-y divide-[#262626] text-[15px]">
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-[#A3A3A3]">Duration</dt>
                    <dd className="flex items-center gap-1.5 font-semibold">
                      <Clock aria-hidden="true" className="h-4 w-4" />
                      {project.duration}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-[#A3A3A3]">Spots Available</dt>
                    <dd className="flex items-center gap-1.5 font-semibold">
                      <Users aria-hidden="true" className="h-4 w-4" />
                      {spotsRemaining} / {project.maxMentees}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-[#A3A3A3]">Deadline</dt>
                    <dd className={`font-semibold ${isDeadlinePassed ? 'text-[#A3A3A3] line-through' : ''}`}>
                      {formatDate(project.applicationDeadline)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-[#A3A3A3]">Start Date</dt>
                    <dd className="font-semibold">{formatDate(project.startDate)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-[#A3A3A3]">End Date</dt>
                    <dd className="font-semibold">{formatDate(project.endDate)}</dd>
                  </div>
                </dl>

                {canApply ? (
                  isMentee === null ? (
                    <button disabled className={`${sidebarButton} cursor-not-allowed bg-[#262626] text-[#8A8A8A]`}>
                      Checking eligibility...
                    </button>
                  ) : isMentee ? (
                    <Link
                      href={`/dsoc/apply/${project._id}`}
                      className={`${sidebarButton} bg-white text-[#0A0A0A] hover:bg-[#E6E6E6]`}
                    >
                      Apply Now
                    </Link>
                  ) : (
                    <Link
                      href="/dsoc/register/mentee"
                      className={`${sidebarButton} bg-white text-[#0A0A0A] hover:bg-[#E6E6E6]`}
                    >
                      Apply as Mentee First
                    </Link>
                  )
                ) : (
                  <button disabled className={`${sidebarButton} cursor-not-allowed bg-[#262626] text-[#8A8A8A]`}>
                    {isDeadlinePassed ? 'Deadline Passed' :
                     spotsRemaining <= 0 ? 'No Spots Available' :
                     'Applications Closed'}
                  </button>
                )}

                <p className="mt-4 text-center text-[13px] leading-[1.5] text-[#A3A3A3]">
                  By applying, you agree to commit {project.duration} to this project
                </p>
              </div>

              {/* Star Card */}
              <Card>
                <div className="mb-3 flex items-center gap-3">
                  <IconTile icon={Star} />
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">Support This Project</h3>
                </div>
                <p className="mb-5 text-[15px] leading-[1.6] text-[#5C5C5C]">
                  Love this project? Show your support by starring the repository on GitHub! It helps increase visibility, motivates the mentors, and grows our open-source community.
                </p>
                <div className="space-y-3">
                  {repoUrls.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#D4D4D4] px-4 py-3 text-[15px] font-semibold transition-colors hover:bg-[#F7F7F7]"
                    >
                      <Github aria-hidden="true" className="h-4 w-4" />
                      Star {getRepoLabel(url)}
                    </a>
                  ))}
                </div>
              </Card>

              {project.timelineUrl && (
                <Card>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold tracking-[-0.02em]">
                        <Calendar aria-hidden="true" className="h-5 w-5" />
                        Project Timeline
                      </h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-[#5C5C5C]">
                        See the full schedule, milestones, and key dates before you apply.
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-[#0A0A0A] px-2.5 py-1 text-xs font-semibold text-white">
                      New
                    </span>
                  </div>
                  <a
                    href={project.timelineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex min-h-11 w-full items-center justify-center rounded-xl border border-[#D4D4D4] px-4 py-3 text-[15px] font-semibold transition-colors hover:bg-[#F7F7F7]"
                  >
                    View Timeline
                  </a>
                </Card>
              )}

              {/* Discord Card */}
              <Card>
                <IconTile icon={MessageCircle} />
                <h3 className="mb-2 mt-4 text-lg font-semibold tracking-[-0.02em]">Have Questions?</h3>
                <p className="mb-5 text-[15px] leading-[1.6] text-[#5C5C5C]">
                  Join our Discord to chat with mentors and other mentees
                </p>
                <a
                  href="https://discord.com/invite/Cy7Rgkf4Up"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[#0A0A0A] px-4 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#262626]"
                >
                  Join Discord
                </a>
              </Card>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <Card>
                  <h3 className="mb-4 text-lg font-semibold tracking-[-0.02em]">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="inline-flex items-center rounded-full border border-[#E6E6E6] px-3 py-1 text-xs font-medium text-[#404040]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const primaryButton =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0A0A0A] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-[#262626]";

const secondaryButton =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#D4D4D4] px-7 py-4 text-base font-semibold text-[#0A0A0A] transition-colors hover:bg-[#F7F7F7]";

const sidebarButton =
  "flex min-h-[52px] w-full items-center justify-center rounded-xl px-7 py-4 text-base font-semibold transition-colors";

/** Swiper is themed through its own CSS variables and class names, so the black and white overrides live here. */
const galleryClasses = [
  "overflow-hidden rounded-[14px] border border-[#E6E6E6] bg-white",
  "[--swiper-theme-color:#0A0A0A] [--swiper-navigation-size:16px]",
  "[&_.swiper-button-prev]:!h-11 [&_.swiper-button-prev]:!w-11 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:bg-white [&_.swiper-button-prev]:shadow-md",
  "[&_.swiper-button-next]:!h-11 [&_.swiper-button-next]:!w-11 [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:bg-white [&_.swiper-button-next]:shadow-md",
  "[&_.swiper-pagination]:!relative [&_.swiper-pagination]:!bottom-auto [&_.swiper-pagination]:!py-3 [&_.swiper-pagination]:bg-white",
].join(" ");

function BlockTitle({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-[22px] font-semibold tracking-[-0.02em]">
      <IconTile icon={Icon} />
      {children}
    </h2>
  );
}

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span aria-hidden="true" className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[12px] bg-[#0A0A0A] text-white">
      <Icon className="h-5 w-5" />
    </span>
  );
}
