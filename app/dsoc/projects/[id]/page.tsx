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
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, container } from "@/components/site/page-kit";
import DSOCNavbar from "../../components/DSOCNavbar";

interface Mentor {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  company?: string;
  jobTitle?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  organization: string;
  repositoryUrl: string;
  repositoryUrls?: string[];
  websiteUrl?: string;
  timelineUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  technologies: string[];
  tags: string[];
  mentors: Mentor[];
  selectedMentees: { _id: string; name: string; picture?: string; university?: string }[];
  maxMentees: number;
  status: string;
  applicationDeadline: string;
  startDate: string;
  endDate: string;
  requirements: string[];
  learningOutcomes: string[];
  milestones: { title: string; description: string; dueDate: string; completed: boolean }[];
  discordChannelId?: string;
  season: string;
  featuredImage?: string;
  gallery?: string[];
}

// Sample projects for fallback when API is unavailable
const SAMPLE_PROJECTS: Record<string, Project> = {
  'psxworth': {
    _id: 'psxworth',
    title: 'PsxWorth',
    description: 'PsxWorth is a portfolio tracking app for PSX investors. It serves 950+ real users and focuses on simple, clear portfolio tracking with custom dashboards and themes.',
    longDescription: `PsxWorth is a portfolio tracking platform built for PSX investors who want a clearer view of their holdings, performance, and investment decisions. The product already serves 950+ real users, so the contribution work needs to respect an existing production audience while improving the experience.

The project proposal centers on three additions: support for mutual funds, custom dashboards, and custom themes. The current stack uses Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, Clerk, Drizzle ORM, PostgreSQL, TanStack Query, TanStack Table, PostHog, Upstash Redis, AI SDK, ApexCharts, Recharts, React Hook Form, and Zod. The backend is based on NestJS, though it is not open source yet.

The goal is to help investors in Pakistan make better decisions and keep portfolio tracking simple, clear, and useful. Project images and Loom video will be added later.`,
    organization: 'Dev Weekends',
    repositoryUrl: 'https://github.com/Wajahat43/psxworth',
    websiteUrl: 'https://psxworth.com',
    difficulty: 'intermediate',
    duration: '10-12 weeks',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Radix UI', 'Clerk', 'Drizzle ORM', 'PostgreSQL', 'TanStack Query', 'TanStack Table', 'PostHog', 'Upstash Redis', 'AI SDK', 'ApexCharts', 'Recharts', 'React Hook Form', 'Zod'],
    tags: ['fintech', 'portfolio-tracking', 'dashboard', 'open-source', 'psx'],
    mentors: [
      {
        _id: 'mentor-psx-1',
        name: 'Wajahat Islam Gul',
        email: 'amina@devweekends.org',
        company: 'Nector Social',
        jobTitle: 'Software Engineer',
        
        linkedin: 'https://www.linkedin.com/in/wajahatx1/',
        github: 'https://github.com/Wajahat43'
      },
      
    ],
    selectedMentees: [],
    maxMentees: 3,
    status: 'open',
    applicationDeadline: '2026-05-25',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    requirements: [
      'JavaScript/TypeScript fundamentals',
      'Experience with React and Next.js',
      'Comfort with PostgreSQL and ORM-based data access',
      'Ability to work with dashboards and analytics-heavy UIs',
      'Ability to commit 10-15 hours per week'
    ],
    learningOutcomes: [
      'Build dashboards for portfolio and performance tracking',
      'Model financial data and reporting workflows in PostgreSQL',
      'Implement clean, themeable interfaces with modern UI libraries',
      'Work with analytics, tables, and chart-heavy product interfaces',
      'Understand how to extend an existing product used by real users'
    ],
    milestones: [
      { title: 'Data Model Review', description: 'Understand the current portfolio model and map the mutual fund extension plan', dueDate: '2026-06-15', completed: false },
      { title: 'Custom Dashboard Layouts', description: 'Build configurable dashboard views for different investor needs', dueDate: '2026-06-30', completed: false },
      { title: 'Theme System', description: 'Add custom themes and polish visual consistency across key screens', dueDate: '2026-07-15', completed: false },
      { title: 'Mutual Funds Support', description: 'Extend portfolio tracking to include mutual fund data and display', dueDate: '2026-07-31', completed: false },
      { title: 'Analytics & Release', description: 'Refine charts, reports, and UX details before final review', dueDate: '2026-08-31', completed: false }
    ],
    season: 'DSOC 2026'
  },
  'voiceybill': {
    _id: 'voiceybill',
    title: 'VoiceyBill',
    description: 'VoiceyBill is an open source AI-powered finance tracker that lets people log income and expenses by voice, receipt scan, or manual entry.\nIt uses Gemini and UpliftAI to classify transactions, supports CSV imports and recurring entries, and keeps the experience fast for multilingual users.\nThe product is designed around a responsive, multi-theme UI with analytics and monthly reports.',
    longDescription: `VoiceyBill is an open source, AI-powered personal finance platform designed for multilingual users who want to track money without fighting a form. It supports voice commands, receipt scanning, manual entry, CSV import, recurring transactions, analytics dashboards, and monthly email reports.

The project is built on the MERN stack with TypeScript and integrates Google Gemini AI and UpliftAI to classify transactions from voice and image inputs. The codebase is split across a web frontend and a backend service, and DSOC contributors will extend it with expense splitting, budget planning, AI-powered financial insights, forecasting, and multi-currency support.`,
    organization: 'Dev Weekends',
    repositoryUrl: 'https://github.com/voiceyBill/voiceyBill-web',
    websiteUrl: 'https://www.voiceybill.com/',
    difficulty: 'intermediate',
    duration: '10-12 weeks',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript', 'Google Gemini AI', 'UpliftAI', 'Cloudinary', 'Redux Toolkit', 'RTK Query'],
    tags: ['full-stack', 'ai', 'finance', 'voice-input', 'open-source'],
    mentors: [
      {
        _id: 'mentor-1',
        name: 'Ahad Ali',
        email: 'alex@devweekends.org',  
        linkedin: 'https://www.linkedin.com/in/ahadalireach/',
        github: 'https://github.com/ahadalireach'
      }
    ],
    selectedMentees: [],
    maxMentees: 3,
    status: 'open',
    applicationDeadline: '2026-05-25',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    requirements: [
      'JavaScript/TypeScript fundamentals',
      'Experience with React or Node.js',
      'Familiarity with MongoDB and REST APIs',
      'Comfort with Git and GitHub',
      'Ability to commit 10-15 hours per week'
    ],
    learningOutcomes: [
      'Build a production-style MERN application with AI integrations',
      'Implement voice and receipt-based transaction workflows',
      'Model financial data in MongoDB and build aggregation queries',
      'Create dashboards, reports, and notification flows',
      'Add multi-currency and internationalization support'
    ],
    milestones: [
      { title: 'Voice Logging Pipeline', description: 'Build microphone capture, transcription, and transaction classification flow', dueDate: '2026-06-15', completed: false },
      { title: 'Receipt Scanning', description: 'Add image upload and Gemini-based receipt extraction', dueDate: '2026-06-30', completed: false },
      { title: 'CSV Import & Recurring Transactions', description: 'Support bulk imports and automated scheduled entries', dueDate: '2026-07-15', completed: false },
      { title: 'Analytics & Monthly Reports', description: 'Finish dashboards, charts, and email summaries', dueDate: '2026-07-31', completed: false },
      { title: 'Budgeting & Multi-Currency', description: 'Deliver smart alerts, insights, splitting, and currency support', dueDate: '2026-08-31', completed: false }
    ],
    season: 'DSOC 2026'
  },
  'pathment': {
    _id: 'pathment',
    title: 'Pathment',
    description: 'Pathment is a SaaS mentorship platform for organizations that want structured, mentor-guided employee training.\nIt connects mentees with real mentors, uses task-based workflows and progress tracking, and adds gamification to boost engagement and measurable outcomes.',
    longDescription: `Pathment is a SaaS-based mentorship platform built for organizations and learning teams that want to run structured, mentor-guided programs. The platform centers on three roles (Admin, Mentor, and Mentee) and supports multi-level programs, mentor matching, task submission with feedback, gamification, and analytics to measure learning outcomes.

  The codebase is a monorepo consisting of a public marketing site, a backend server (Node.js + Express + PostgreSQL with Sequelize), and a Next.js + TypeScript client interface. An AI layer (Groq/OpenAI) can generate personalized roadmaps and weekly task breakdowns, saving curriculum design time for admins. Real-time messaging is implemented with Socket.IO, and media is handled via Cloudinary. The project is contributor-friendly with many beginner-friendly issues: UI polish, accessibility, email templates, stricter API validation, test coverage, seed/demo data, and analytics improvements.`,
    organization: 'Dev Weekends',
    repositoryUrl: 'https://github.com/Sheryar-Ahmed/pathment.git',
    websiteUrl: 'https://pathment.me/',
    difficulty: 'intermediate',
    duration: '10-12 weeks',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Socket.io', 'Tailwind CSS', 'Tiptap', 'Cloudinary'],
    tags: ['full-stack', 'real-time', 'developer-tools', 'collaboration'],
    mentors: [
      {
        _id: 'mentor-1',
        name: 'Alex Chen',
        email: 'alex@devweekends.org',
        company: 'GitHub',
        jobTitle: 'Senior Software Engineer',
        bio: 'Full-stack developer with 8+ years of experience building developer tools.',
        linkedin: 'https://linkedin.com/in/alexchen',
        github: 'https://github.com/alexchen'
      },
      {
        _id: 'mentor-2',
        name: 'Sarah Williams',
        email: 'sarah@devweekends.org',
        company: 'Vercel',
        jobTitle: 'Staff Engineer',
        bio: 'Passionate about building performant web applications and mentoring developers.',
        linkedin: 'https://linkedin.com/in/sarahwilliams',
        github: 'https://github.com/sarahwilliams'
      }
    ],
    selectedMentees: [],
    maxMentees: 3,
    status: 'open',
    applicationDeadline: '2026-05-25',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    requirements: [
      'JavaScript/TypeScript fundamentals',
      'Experience with React or Next.js',
      'Familiarity with REST APIs and relational databases',
      'Comfort with Git and GitHub',
      'Ability to commit 10-15 hours per week'
    ],
    learningOutcomes: [
      'Build full-stack web applications with Next.js and Express',
      'Implement role-based flows (Admin/Mentor/Mentee) and task workflows',
      'Integrate real-time messaging with Socket.IO',
      'Work with relational databases (PostgreSQL + Sequelize)',
      'Add AI-assisted roadmap generation and analytics dashboards'
    ],
    milestones: [
      { title: 'Project Setup & Onboarding', description: 'Get the monorepo running locally, seed demo data, and familiarise with architecture', dueDate: '2026-06-15', completed: false },
      { title: 'Mentor Matching & Task Flow', description: 'Implement mentor assignment, task creation, and submission/feedback loop', dueDate: '2026-06-30', completed: false },
      { title: 'AI Roadmap Integration', description: 'Add AI-generated roadmap/task suggestions for program levels', dueDate: '2026-07-15', completed: false },
      { title: 'Real-time Messaging & Notifications', description: 'Enhance Socket.IO messaging and notification delivery', dueDate: '2026-07-31', completed: false },
      { title: 'Analytics & Deploy', description: 'Complete admin analytics, polish UI, and deploy the marketing site', dueDate: '2026-08-31', completed: false }
    ],
    season: 'DSOC 2026'
  },
  'goalslot': {
    _id: 'goalslot',
    title: 'GoalSlot',
    description: "GoalSlot connects goals to your calendar and tracks every hour you work on them.",
    longDescription: `GoalSlot is a productivity-focused project that helps users connect goals to scheduled work and measure actual time spent. Contributors will refine calendar syncing, time tracking, analytics, and onboarding flows while keeping the experience simple and useful.

The project is designed to be practical and contributor-friendly, with a focus on clear workflows, useful reporting, and a polished interface. It is a strong fit for mentees who want to work on scheduling, productivity UX, and data-driven product features.`,
    organization: 'Dev Weekends',
    repositoryUrl: 'https://github.com/ZeeshanAdilButt/goal-slot-web',
    websiteUrl: 'https://www.goalslot.io/',
    difficulty: 'intermediate',
    duration: '8-12 weeks',
    technologies: ['Next.js', 'NestJS', 'TypeScript'],
    tags: ['productivity', 'calendar', 'time-tracking', 'open-source'],
    mentors: [
      {
        _id: 'mentor-goalslot-1',
        name: 'Wajahat Islam Gul',
        email: 'amina@devweekends.org',
        company: 'Nector Social',
        jobTitle: 'Software Engineer',
        linkedin: 'https://www.linkedin.com/in/wajahatx1/',
        github: 'https://github.com/Wajahat43'
      }
    ],
    selectedMentees: [],
    maxMentees: 3,
    status: 'open',
    applicationDeadline: '2026-06-30',
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    requirements: [
      'Familiarity with React and Next.js',
      'Comfort with TypeScript',
      'Willingness to work with calendar integrations and APIs',
      'Ability to commit 8-12 hours per week'
    ],
    learningOutcomes: [
      'Implement calendar syncing and time-tracking features',
      'Build end-to-end features across Next.js and NestJS',
      'Design analytics and reporting for goal progress'
    ],
    milestones: [
      { title: 'Onboarding & Setup', description: 'Get the monorepo and local dev environment working', dueDate: '2026-07-07', completed: false },
      { title: 'Calendar Sync', description: 'Implement calendar integration and event mapping', dueDate: '2026-08-01', completed: false },
      { title: 'Time Tracking UI', description: 'Add time tracking flows and analytics dashboards', dueDate: '2026-08-31', completed: false }
    ],
    season: 'DSOC 2026'
  },
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const routeParams = useParams<{ id: string }>();
  const projectId = routeParams?.id;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
            src={lightboxImage}
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
                              src={url}
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
