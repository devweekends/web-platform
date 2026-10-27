'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Clock,
  Users,
  Code2,
  Github,
  X,
  BookOpen
} from "lucide-react";
import type { ReactNode } from "react";
import { Button, Card, Panel, PageHero, container } from "@/components/site/page-kit";
import DSOCNavbar from "../components/DSOCNavbar";

interface Project {
  _id: string;
  title: string;
  description: string;
  organization: string;
  repositoryUrl: string;
  repositoryUrls?: string[];
  websiteUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  technologies: string[];
  tags: string[];
  status: string;
  maxMentees: number;
  selectedMentees: string[];
  mentors: {
    _id: string;
    name: string;
    picture?: string;
    company?: string;
    jobTitle?: string;
  }[];
  applicationDeadline: string;
  featuredImage?: string;
  imageUrl?: string;
  wikiUrl?: string;
}

// Sample projects to show when API is unavailable
const SAMPLE_PROJECTS: Project[] = [
  {
    _id: 'psxworth',
    title: 'PsxWorth - Portfolio Tracking for PSX Investors',
    description: 'PsxWorth helps PSX investors track portfolios clearly and simply. It serves 950+ real users and is designed to support better investment decisions with custom dashboards, themes, and future mutual fund support.',
    organization: 'Dev Weekends',
    repositoryUrl: 'https://github.com/Wajahat43/psxworth',
    websiteUrl: 'https://psxworth.com',
    difficulty: 'intermediate',
    duration: '10-12 weeks',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Radix UI', 'Clerk', 'Drizzle ORM', 'PostgreSQL', 'TanStack Query', 'TanStack Table', 'PostHog', 'Upstash Redis', 'AI SDK', 'ApexCharts', 'Recharts', 'React Hook Form', 'Zod', 'NestJS'],
    tags: ['full-stack', 'fintech', 'portfolio-tracking', 'dashboard', 'open-source'],
    status: 'open',
    maxMentees: 3,
    selectedMentees: [],
    mentors: [
      {
        _id: 'mentor-psx-1',
        name: 'Wajahat Ali',
        picture: undefined,
        company: 'FinTech',
        jobTitle: 'Product Engineer'
      }
    ],
    applicationDeadline: '2026-05-25',
    imageUrl: '/images/dsoc/psxworth.png',
  },
  {
    _id: 'voiceybill',
    title: 'VoiceyBill - AI-Powered Open Source Finance Tracker',
    description: 'Log income and expenses by voice, receipt scan, or manual entry. AI classifies transactions, supports CSV import and recurring entries, and keeps the experience multilingual and fast.',
    organization: 'Dev Weekends',
    repositoryUrl: 'https://github.com/voiceyBill/voiceyBill-web',
    websiteUrl: 'https://www.voiceybill.com/',
    difficulty: 'intermediate',
    duration: '10-12 weeks',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript', 'Google Gemini AI', 'UpliftAI', 'Cloudinary', 'Redux Toolkit', 'RTK Query'],
    tags: ['full-stack', 'ai', 'finance', 'voice-input', 'open-source'],
    status: 'open',
    maxMentees: 3,
    selectedMentees: [],
    mentors: [
      {
        _id: 'mentor-voicey-1',
        name: 'Ahad Ali',
        company: 'FinTech',
        jobTitle: 'Senior Full-Stack Engineer'
      }
    ],
    applicationDeadline: '2026-05-25',
    imageUrl: '/images/dsoc/voiceybill.png',
  },
 {
    _id: 'pathment',
    title: 'Pathment',
    description: 'Pathment is a SaaS mentorship platform for organizations that want structured, mentor-guided employee training.\nIt connects mentees with real mentors, uses task-based workflows and progress tracking, and adds gamification to boost engagement and measurable outcomes.',
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
        name: 'Sheryar Ahmed',
        company: 'GitHub',
        jobTitle: 'Senior Software Engineer'
      },
    ],
    status: 'open',
    maxMentees: 3,
    selectedMentees: [],
    applicationDeadline: '2026-05-25',
    imageUrl: '/images/dsoc/pathment.png',
  },
  {
    _id: 'goalslot',
    title: 'GoalSlot',
    description: "GoalSlot connects your goals to your calendar and tracks every hour you work on them. Finally know if you're actually making progress.",
    organization: 'Dev Weekends',
    repositoryUrl: 'https://github.com/ZeeshanAdilButt/goal-slot-web',
    websiteUrl: 'https://www.goalslot.io/',
    difficulty: 'intermediate',
    duration: '8-12 weeks',
    technologies: ['Next.js', 'NestJS', 'TypeScript'],
    tags: ['productivity', 'calendar', 'time-tracking', 'open-source'],
    status: 'open',
    maxMentees: 3,
    selectedMentees: [],
    mentors: [
      {
        _id: 'mentor-psx-1',
        name: 'Wajahat Ali',
        picture: undefined,
        company: 'Nector Social',
        jobTitle: 'Software Engineer'
      }
    ],
    applicationDeadline: '2026-06-30',
    imageUrl: '/images/dsoc/goalslot.png',
  },
];

const inputClass =
  "min-h-[52px] w-full rounded-xl border border-[#D4D4D4] bg-white px-4 text-base text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:border-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]/10";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    difficulty: '',
    technology: '',
    status: 'open'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [allTechnologies, setAllTechnologies] = useState<string[]>([]);
  const [usingSampleData, setUsingSampleData] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.technology) params.append('technology', filters.technology);
      if (search) params.append('search', search);

      const res = await fetch(`/api/dsoc/projects?${params.toString()}`);
      const data = await res.json();

      if (data.success && data.data.length > 0) {
        setProjects(data.data);
        setUsingSampleData(false);
        // Extract unique technologies
        const techs = new Set<string>();
        data.data.forEach((p: Project) => p.technologies.forEach(t => techs.add(t)));
        setAllTechnologies(Array.from(techs).sort());
      } else {
        // Use sample data as fallback
        setProjects(SAMPLE_PROJECTS);
        setUsingSampleData(true);
        const techs = new Set<string>();
        SAMPLE_PROJECTS.forEach((p) => p.technologies.forEach(t => techs.add(t)));
        setAllTechnologies(Array.from(techs).sort());
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Use sample data on error
      setProjects(SAMPLE_PROJECTS);
      setUsingSampleData(true);
      const techs = new Set<string>();
      SAMPLE_PROJECTS.forEach((p) => p.technologies.forEach(t => techs.add(t)));
      setAllTechnologies(Array.from(techs).sort());
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProjects();
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

  const getRepoName = (url: string) => {
    try {
      const parts = new URL(url).pathname.split('/').filter(Boolean);
      const last = parts[parts.length - 1] || 'Repository';
      return last.replace(/\.git$/, '');
    } catch {
      return 'Repository';
    }
  };

  const getProjectRepoUrls = (project: Project): string[] => {
    if (Array.isArray(project.repositoryUrls) && project.repositoryUrls.length > 0) {
      return project.repositoryUrls;
    }
    return project.repositoryUrl ? [project.repositoryUrl] : [];
  };

  const activeFilters = (filters.difficulty ? 1 : 0) + (filters.technology ? 1 : 0);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {/* DSOC Navigation */}
      <DSOCNavbar />

      {/* Header */}
      <PageHero
        eyebrow="DSOC 2026"
        title="DSOC projects"
        intro={
          <>
            Find the perfect project to kickstart your open source journey.
            <span className="mt-3 block text-base text-[#5C5C5C]">
              DSOC 2026 applications are closed. They open again next summer.
            </span>
          </>
        }
      />

      {/* Search & Filters */}
      <section className="border-b border-[#E6E6E6] bg-[#F7F7F7]">
        <div className={`${container} py-8`}>
          <form onSubmit={handleSearch} className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8A8A8A]" />
              <input
                type="text"
                aria-label="Search projects"
                placeholder="Search projects, technologies, organizations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${inputClass} pl-12`}
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0A0A0A] px-7 text-base font-semibold text-white transition-colors hover:bg-[#262626]"
            >
              <Search aria-hidden="true" className="h-5 w-5" />
              Search
            </button>
            <button
              type="button"
              aria-expanded={showFilters}
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#D4D4D4] bg-white px-7 text-base font-semibold text-[#0A0A0A] transition-colors hover:bg-[#F7F7F7]"
            >
              <Filter aria-hidden="true" className="h-5 w-5" />
              Filters
              {activeFilters > 0 && (
                <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0A0A0A] text-xs font-semibold text-white">
                  {activeFilters}
                </span>
              )}
            </button>
          </form>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="mt-4">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold tracking-[-0.02em]">Filter projects</h2>
                <button
                  type="button"
                  onClick={() => {
                    setFilters({ difficulty: '', technology: '', status: 'open' });
                    setShowFilters(false);
                  }}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-[10px] px-3 text-sm font-medium text-[#5C5C5C] hover:text-black"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                  Clear All
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="dsoc-filter-status" className="mb-2 block text-sm font-semibold">Status</label>
                  <select
                    id="dsoc-filter-status"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">All Status</option>
                    <option value="open">Open for Applications</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dsoc-filter-difficulty" className="mb-2 block text-sm font-semibold">Difficulty</label>
                  <select
                    id="dsoc-filter-difficulty"
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dsoc-filter-technology" className="mb-2 block text-sm font-semibold">Technology</label>
                  <select
                    id="dsoc-filter-technology"
                    value={filters.technology}
                    onChange={(e) => setFilters({ ...filters, technology: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">All Technologies</option>
                    {allTechnologies.map((tech) => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-white">
        <div className={`${container} py-12 md:py-16`}>
          {loading ? (
            <div role="status" className="py-20 text-center">
              <div aria-hidden="true" className="inline-block h-10 w-10 animate-spin rounded-full border-[3px] border-[#E6E6E6] border-t-[#0A0A0A]" />
              <p className="mt-4 text-[#5C5C5C]">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="py-20 text-center">
              <Code2 aria-hidden="true" className="mx-auto mb-4 h-14 w-14 text-[#8A8A8A]" />
              <h2 className="mb-2 text-2xl font-semibold tracking-[-0.03em]">No Projects Found</h2>
              <p className="mb-6 text-[#5C5C5C]">
                Try adjusting your filters or search query
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setFilters({ difficulty: '', technology: '', status: '' });
                }}
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#0A0A0A] px-7 text-base font-semibold text-white transition-colors hover:bg-[#262626]"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[#5C5C5C]">
                  Showing <span className="font-semibold text-[#0A0A0A]">{projects.length}</span> projects
                  {usingSampleData && (
                    <span className="ml-2 text-sm text-[#8A8A8A]">(Sample Projects)</span>
                  )}
                </p>
              </div>

              <ul className="grid gap-5 md:grid-cols-2">
                {projects.map((project) => {
                  const projectImage = project.featuredImage || project.imageUrl;
                  const repoUrls = getProjectRepoUrls(project);
                  const hasRepos = repoUrls.length > 0;

                  return (
                    <li key={project._id}>
                      <Card
                        tone="bordered"
                        className="group relative h-full overflow-hidden hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1"
                      >
                        {/* Project Image */}
                        {projectImage && (
                          <div className="relative -mx-7 -mt-7 mb-6 overflow-hidden bg-[#F7F7F7]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={projectImage}
                              alt={project.title}
                              className="h-48 w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                            />
                            <span className={`absolute right-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">
                            {project.organization}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#F7F7F7] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#404040]">
                            Paid
                          </span>
                          {!projectImage && (
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          )}
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${getDifficultyColor(project.difficulty)}`}>
                            {project.difficulty}
                          </span>
                        </div>

                        <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.03em]">
                          <Link href={`/dsoc/projects/${project._id}`} className="after:absolute after:inset-0 after:content-['']">
                            {project.title}
                          </Link>
                        </h3>
                        <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-[1.6] text-[#5C5C5C]">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map((tech, i) => (
                            <Tag key={i}>{tech}</Tag>
                          ))}
                          {project.technologies.length > 5 && (
                            <Tag>+{project.technologies.length - 5}</Tag>
                          )}
                        </div>

                        {/* Meta Info */}
                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#E6E6E6] pt-4 text-sm text-[#5C5C5C]">
                          <span className="flex items-center gap-1.5">
                            <Clock aria-hidden="true" className="h-4 w-4" />
                            {project.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users aria-hidden="true" className="h-4 w-4" />
                            {project.selectedMentees?.length || 0}/{project.maxMentees} spots
                          </span>
                        </div>

                        {/* Mentors */}
                        {project.mentors && project.mentors.length > 0 && (
                          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">
                              Mentors
                            </span>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                              {project.mentors.slice(0, 3).map((mentor) => (
                                <div key={mentor._id} className="flex items-center gap-1.5">
                                  <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[#0A0A0A] text-xs font-semibold text-white">
                                    {mentor.picture ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img src={mentor.picture} alt={mentor.name} className="h-full w-full object-cover" />
                                    ) : (
                                      mentor.name.charAt(0)
                                    )}
                                  </div>
                                  <span className="text-xs font-medium">{mentor.name.split(' ')[0]}</span>
                                </div>
                              ))}
                              {project.mentors.length > 3 && (
                                <span className="text-xs text-[#5C5C5C]">+{project.mentors.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* GitHub and Wiki Links */}
                        {(hasRepos || project.wikiUrl) && (
                          <div className="mt-4 flex flex-wrap items-center gap-x-4 border-t border-[#E6E6E6] pt-2">
                            {hasRepos && (
                              repoUrls.length === 1 ? (
                                <a
                                  href={repoUrls[0]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative z-10 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold hover:text-[#5C5C5C]"
                                >
                                  <Github aria-hidden="true" className="h-4 w-4" />
                                  GitHub
                                </a>
                              ) : (
                                <div className="flex flex-wrap items-center gap-2 py-1">
                                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">
                                    <Github aria-hidden="true" className="h-4 w-4 text-[#0A0A0A]" />
                                    Repos
                                  </span>
                                  {repoUrls.map((url, i) => (
                                    <a
                                      key={i}
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title={url}
                                      className="relative z-10 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[#D4D4D4] bg-white px-4 text-xs font-semibold transition-colors hover:bg-[#F7F7F7]"
                                    >
                                      <Github aria-hidden="true" className="h-3 w-3" />
                                      {getRepoName(url)}
                                    </a>
                                  ))}
                                </div>
                              )
                            )}
                            {project.wikiUrl && (
                              <a
                                href={project.wikiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative z-10 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold hover:text-[#5C5C5C]"
                              >
                                <BookOpen aria-hidden="true" className="h-4 w-4" />
                                Wiki
                              </a>
                            )}
                          </div>
                        )}
                      </Card>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <Panel>
        <div className="max-w-[60ch]">
          <h2 className="text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">Don&apos;t see what you&apos;re looking for?</h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#C7C7C7]">
            We&apos;re always adding new projects. Join our Discord to get notified when new projects are added,
            or become a mentor and propose your own project!
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="https://discord.com/invite/Cy7Rgkf4Up" variant="onDark">Join Discord</Button>
          <Button href="/dsoc/register/mentor" variant="onDarkSecondary">Propose a Project</Button>
        </div>
      </Panel>
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#F7F7F7] px-3 py-1 text-xs font-medium text-[#404040]">
      {children}
    </span>
  );
}
