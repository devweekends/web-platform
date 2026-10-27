'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Code2,
  Users,
  Calendar,
  GitBranch,
  Rocket,
  Trophy,
  Github,
  MessageCircle,
  Clock,
  Target,
  BookOpen
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button, Card, Panel, PageHero, Section, SectionHeading, container } from "@/components/site/page-kit";
import DSOCNavbar from "./components/DSOCNavbar";

interface Stats {
  projects: { total: number; open: number; inProgress: number; completed: number };
  mentors: number;
  mentees: number;
  applications: number;
  technologies: number;
  topTechnologies: string[];
}

interface Project {
  _id: string;
  title: string;
  description: string;
  organization: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  status: string;
  duration: string;
  featuredImage?: string;
  imageUrl?: string;
  repositoryUrl?: string;
  repositoryUrls?: string[];
  wikiUrl?: string;
}

// Sample projects to show when API is unavailable
const SAMPLE_PROJECTS: Project[] = [
  {
    _id: 'voiceybill',
    title: 'VoiceyBill',
    description: 'VoiceyBill is an open source AI-powered finance tracker that lets people log income and expenses by voice, receipt scan, or manual entry.\nIt uses Gemini and UpliftAI to classify transactions, supports CSV imports and recurring entries, and keeps the experience fast for multilingual users.\nThe product is designed around a responsive, multi-theme UI with analytics and monthly reports.',
    organization: 'Dev Weekends',
    difficulty: 'intermediate',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript', 'Google Gemini AI', 'UpliftAI', 'Cloudinary', 'Redux Toolkit', 'RTK Query'],
    status: 'open',
    duration: '10-12 weeks',
    imageUrl: '/images/dsoc/voiceybill.png',
    repositoryUrl: 'https://github.com/voiceyBill/voiceyBill-web',
  },
  {
    _id: 'pathment',
    title: 'Pathment',
    description: 'Pathment is a SaaS mentorship platform for organizations that want structured, mentor-guided employee training.\nIt connects mentees with real mentors, uses task-based workflows and progress tracking, and adds gamification to boost engagement and measurable outcomes.',
    organization: 'Dev Weekends',
    difficulty: 'intermediate',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Socket.io', 'Tailwind CSS', 'Tiptap', 'Cloudinary'],
    status: 'open',
    duration: '10-12 weeks',
    imageUrl: '/images/dsoc/pathment.png',
    repositoryUrl: 'https://github.com/Sheryar-Ahmed/pathment.git',    
  },
];

// Sample stats to show when API is unavailable
const SAMPLE_STATS: Stats = {
  projects: { total: 2, open: 2, inProgress: 0, completed: 0 },
  mentors: 3,
  mentees: 0,
  applications: 0,
  technologies: 10,
  topTechnologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'Tailwind CSS']
};

export default function DSOCPage() {
  const [stats, setStats] = useState<Stats | null>(SAMPLE_STATS);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(SAMPLE_PROJECTS);

  useEffect(() => {
    // Fetch stats
    fetch('/api/dsoc/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setStats(data.data);
      })
      .catch(() => {
        // Use sample stats on error
        setStats(SAMPLE_STATS);
      });

    // Fetch featured projects
    fetch('/api/dsoc/projects?status=open&limit=3')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setFeaturedProjects(data.data);
        } else {
          setFeaturedProjects(SAMPLE_PROJECTS);
        }
      })
      .catch(() => {
        // Use sample projects on error
        setFeaturedProjects(SAMPLE_PROJECTS);
      });
  }, []);

  const timeline = [
    {
      phase: "Phase 1",
      title: "Contributions Start",
      date: "May 15, 2026",
      description: "Contributors begin onboarding, review project goals with mentors, and prepare their development environment.",
      status: "upcoming"
    },
    {
      phase: "Phase 2",
      title: "Applications Open",
      date: "May 25, 2026",
      description: "Mentee applications begin. Browse projects, connect with mentors, and submit your proposals.",
      status: "upcoming"
    },
    {
      phase: "Phase 3",
      title: "Applications Deadline",
      date: "May 28, 2026",
      description: "Final day to submit mentee applications. Ensure your proposal is complete before the deadline.",
      status: "upcoming"
    },
    {
      phase: "Phase 4",
      title: "Result Announced",
      date: "May 31, 2026",
      description: "Final selections are announced, shortlisted applicants are notified.",
      status: "upcoming"
    },
    {
      phase: "Phase 5",
      title: "Coding Period Begins",
      date: "June 1, 2026",
      description: "The three-month coding period begins. Mentees start project work.",
      status: "upcoming"
    },
    {
      phase: "Phase 6",
      title: "June Milestone Review",
      date: "June 30, 2026",
      description: "At the end of the first month, mentors review progress, verify the milestone, and release the monthly stipend.",
      status: "upcoming"
    },
    {
      phase: "Phase 7",
      title: "July Milestone Review",
      date: "July 31, 2026",
      description: "At the end of the second month, mentors review progress, verify the milestone, and release the monthly stipend.",
      status: "upcoming"
    },
    {
      phase: "Phase 8",
      title: "August Milestone Review",
      date: "August 31, 2026",
      description: "At the end of the third month, mentors review progress, verify the final milestone, and release the last monthly stipend.",
      status: "upcoming"
    }
  ];

  const benefits = [
    {
      icon: Code2,
      title: "Real-World Experience",
      description: "Work on production-level open source projects that make a difference."
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Learn directly from industry professionals and open source maintainers.",
    },
    {
      icon: GitBranch,
      title: "Portfolio Building",
      description: "Build an impressive portfolio with real contributions to open source.",
    },
    {
      icon: MessageCircle,
      title: "Community Support",
      description: "Join our Discord community for networking and peer support.",
    },
    {
      icon: Trophy,
      title: "Recognition",
      description: "Get certificates, swag, and recognition for your contributions.",
    },
    {
      icon: Rocket,
      title: "Career Launch",
      description: "Many past participants have landed jobs at top tech companies.",
    }
  ];

  const liveStats = [
    { value: stats?.projects.total, label: "Projects" },
    { value: stats?.mentors, label: "Mentors" },
    { value: stats?.mentees, label: "Mentees" },
    { value: stats?.technologies, label: "Technologies" },
  ]
    .filter((stat): stat is { value: number; label: string } => typeof stat.value === "number" && stat.value > 0)
    .map((stat) => ({ value: String(stat.value), label: stat.label }));

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {/* DSOC Navigation */}
      <DSOCNavbar />

      <PageHero
        eyebrow="DSOC 2026, applications closed"
        title="Dev Weekends Summer of Code"
        intro="An intensive open source program connecting aspiring developers with expert mentors on real-world projects. Learn, build, and grow with the community."
        actions={
          <>
            <Button href="/dsoc/projects">Explore Projects</Button>
            <Button href={CONTACT_HREF} variant="secondary">Contact Us</Button>
          </>
        }
      />

      {/* Application status */}
      <Panel>
        <div className="max-w-[62ch]">
          <span className="inline-flex min-h-9 items-center rounded-full border border-[#3D3D3D] px-4 text-sm font-medium text-[#C7C7C7]">
            Closed
          </span>
          <h2 className="mt-5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
            DSOC 2026 applications are closed.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#C7C7C7]">
            DSOC applications will open next summer. We are always open to passionate talent who can demonstrate deep interest in technology and a strong willingness to get things done.
          </p>
          <p className="mt-4 text-[17px] leading-[1.65] text-[#C7C7C7]">
            We review exceptional cases at{" "}
            <a href="mailto:info@devweekends.com" className="font-semibold text-white underline underline-offset-4 hover:text-[#E6E6E6]">
              info@devweekends.com
            </a>
            .
          </p>
        </div>
      </Panel>

      {/* Stats: only real numbers from the API, so nothing is shown before data loads */}
      {liveStats.length > 0 && (
      <Section>
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {liveStats.map((stat) => (
            <div key={stat.label} className="min-w-0 rounded-[20px] bg-[#F7F7F7] p-5 sm:p-7">
              <dd className="text-[clamp(32px,6vw,52px)] font-semibold leading-none tracking-[-0.04em]">{stat.value}</dd>
              <dt className="mt-3 text-sm text-[#5C5C5C]">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Section>
      )}

      {/* What is DSOC Section */}
      <Section tone="gray">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="About" title="What is DSOC?" />
            <div className="-mt-4 max-w-[56ch] space-y-4 text-[17px] leading-[1.65] text-[#404040]">
              <p>
                <strong className="font-semibold text-[#0A0A0A]">Dev Weekends Summer of Code (DSOC)</strong> is a
                community-driven program inspired by Google Summer of Code and LFX Mentorship.
              </p>
              <p>
                We connect passionate student developers with experienced mentors to work on
                meaningful open source projects. Whether you&apos;re looking to build your first
                open source contribution or mentor the next generation of developers, DSOC
                has a place for you.
              </p>
              <p>
                Unlike traditional programs, we focus on accessibility: no complex application
                processes, no geographic restrictions, just pure learning and contribution.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/dsoc/projects">
                Explore Projects
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <ul className="space-y-4">
            {[
              { icon: Target, title: "Project-Based Learning", text: "Work on real projects with real impact" },
              { icon: Users, title: "1-on-1 Mentorship", text: "Direct guidance from industry experts" },
              { icon: MessageCircle, title: "Discord Community", text: "24/7 peer support and networking" },
            ].map((item) => (
              <li key={item.title}>
                <Card className="flex-row items-start gap-5">
                  <IconTile icon={item.icon} />
                  <div>
                    <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.6] text-[#5C5C5C]">{item.text}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <SectionHeading
          eyebrow="Benefits"
          title="Why join DSOC?"
          intro="More than just coding: it's a launchpad for your tech career."
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit.title}>
              <Card tone="gray" className="h-full">
                <IconTile icon={benefit.icon} />
                <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.02em]">{benefit.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#5C5C5C]">{benefit.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Timeline Section */}
      <Section id="timeline" tone="gray">
        <SectionHeading eyebrow="Timeline" title="Program timeline." intro="The schedule for DSOC 2026." />
        <ol className="divide-y divide-[#D4D4D4] border-y border-[#D4D4D4]">
          {timeline.map((item) => (
            <li key={item.phase} className="grid gap-3 py-7 md:grid-cols-[240px_1fr] md:gap-10">
              <div>
                <p className="text-sm font-semibold text-[#5C5C5C]">{item.phase}</p>
                <p className="mt-1.5 flex items-center gap-2 text-[15px] font-semibold">
                  <Calendar aria-hidden="true" className="h-4 w-4 flex-shrink-0" />
                  {item.date}
                </p>
              </div>
              <div>
                <h3 className="text-[22px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-[#5C5C5C]">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Projects"
            title="Featured projects."
            intro="Check out some of the exciting projects waiting for contributors."
          />
          <ul className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project) => {
              const image = project.featuredImage || project.imageUrl;
              const repoUrl = project.repositoryUrl || (project.repositoryUrls && project.repositoryUrls[0]);
              return (
                <li key={project._id}>
                  <Card
                    tone="bordered"
                    className="group relative h-full overflow-hidden hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1"
                  >
                    {image && (
                      <div className="relative -mx-7 -mt-7 mb-6 overflow-hidden bg-[#F7F7F7]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image}
                          alt={project.title}
                          className="h-52 w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[#0A0A0A] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white">
                          Applications closed
                        </span>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">{project.organization}</span>
                      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${difficultyStyle(project.difficulty)}`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.03em]">
                      <Link href={`/dsoc/projects/${project._id}`} className="after:absolute after:inset-0 after:content-['']">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-3 line-clamp-2 text-[15px] leading-[1.6] text-[#5C5C5C]">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                      {project.technologies.length > 5 && <Tag>+{project.technologies.length - 5}</Tag>}
                    </div>
                    <div className="mt-auto pt-6">
                      <div className="flex flex-wrap items-center justify-between gap-x-4 border-t border-[#E6E6E6] pt-2">
                        <span className="flex min-h-11 items-center gap-1.5 text-sm text-[#5C5C5C]">
                          <Clock aria-hidden="true" className="h-4 w-4" />
                          {project.duration}
                        </span>
                        <div className="flex flex-wrap gap-x-4">
                          {repoUrl && (
                            <a
                              href={repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative z-10 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold hover:text-[#5C5C5C]"
                            >
                              <Github aria-hidden="true" className="h-4 w-4" />
                              GitHub
                            </a>
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
                      </div>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
          <div className="mt-10">
            <Button href="/dsoc/projects" variant="secondary">
              View All Projects
              <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Section>
      )}

      {/* How It Works Section */}
      <Section tone="gray">
        <SectionHeading eyebrow="How it works" title="Simple steps to start." intro="Your open source journey, for mentees and mentors." />
        <div className="grid gap-5 lg:grid-cols-2">
          {/* For Mentees */}
          <div className="flex flex-col rounded-[20px] bg-[#0A0A0A] p-7 text-white sm:p-9">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-white text-[#0A0A0A]">
                <Code2 className="h-5 w-5" />
              </span>
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">For mentees</h3>
            </div>
            <StepList
              onDark
              steps={[
                "Create your profile and join our Discord",
                "Browse projects and find one that excites you",
                "Submit your application with a proposal",
                "Get selected and bond with your mentor",
                "Code, learn, and contribute for 3 months",
                "Complete your project and get certified"
              ]}
            />
            <div className="mt-auto pt-8 text-center sm:text-left">
              <Button href={CONTACT_HREF} variant="onDark">Contact Us About an Exceptional Case</Button>
            </div>
          </div>

          {/* For Mentors */}
          <div className="flex flex-col rounded-[20px] bg-white p-7 sm:p-9">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#0A0A0A] text-white">
                <Users className="h-5 w-5" />
              </span>
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">For mentors</h3>
            </div>
            <StepList
              steps={[
                "Register and get verified as a mentor",
                "Submit your project idea with details",
                "Review applications from mentees",
                "Select your mentee(s) for the project",
                "Guide them through weekly check-ins",
                "Evaluate and celebrate their success"
              ]}
            />
            <div className="mt-auto pt-8 text-center sm:text-left">
              <Button href="mailto:info@devweekends.com?subject=DSOC%20Mentor%20Interest">Contact Us About Mentoring</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading eyebrow="FAQ" title="Common questions." />
        <dl className="grid gap-5 md:grid-cols-2">
          {[
            {
              q: "Who can participate in DSOC?",
              a: "Anyone! Students, professionals, and hobbyists from anywhere in the world can apply as mentees. We especially encourage underrepresented groups in tech."
            },
            {
              q: "Is there a stipend for participants?",
              a: "Yes. DSOC is a paid program, and selected participants receive a stipend during the coding period."
            },
            {
              q: "What's the time commitment?",
              a: "Mentees should expect to dedicate 15-20 hours per week. Mentors typically spend 3-5 hours per week on guidance and code reviews."
            },
            {
              q: "Do I need prior open source experience?",
              a: "Not at all! We have projects for all skill levels. Beginner projects are specifically designed for first-time contributors."
            }
          ].map((faq) => (
            <Card key={faq.q} tone="gray">
              <dt className="text-[19px] font-semibold tracking-[-0.02em]">{faq.q}</dt>
              <dd className="mt-3 text-[15px] leading-[1.6] text-[#5C5C5C]">{faq.a}</dd>
            </Card>
          ))}
        </dl>
      </Section>

      {/* CTA Section */}
      <Panel>
        <div className="max-w-[60ch]">
          <h2 className="text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">Ready to start your journey?</h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#C7C7C7]">
            DSOC 2026 applications are closed. The next application cycle opens next summer.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={CONTACT_HREF} variant="onDark">Contact Us</Button>
          <Button href="https://discord.com/invite/Cy7Rgkf4Up" variant="onDarkSecondary">Join Discord</Button>
        </div>
      </Panel>

      {/* Footer Links */}
      <footer className="border-t border-[#E6E6E6] bg-white">
        <div className={`${container} py-10`}>
          <nav aria-label="DSOC footer" className="flex flex-wrap justify-center gap-x-2 text-[15px] font-medium">
            <Link href="/dsoc/projects" className={footerLink}>Projects</Link>
            <a href={CONTACT_HREF} className={footerLink}>Exceptional Cases</a>
            <Link href="/dsoc/login" className={footerLink}>Login</Link>
            <a href="https://github.com/devweekends" target="_blank" rel="noopener noreferrer" className={`${footerLink} gap-1.5`}>
              <Github aria-hidden="true" className="h-4 w-4" /> GitHub
            </a>
            <a href="https://discord.com/invite/Cy7Rgkf4Up" target="_blank" rel="noopener noreferrer" className={`${footerLink} gap-1.5`}>
              <MessageCircle aria-hidden="true" className="h-4 w-4" /> Discord
            </a>
          </nav>
          <p className="mt-4 text-center text-[15px] text-[#5C5C5C]">
            DSOC is a program by <Link href="/team" className="inline-flex min-h-11 items-center font-semibold text-[#0A0A0A] hover:text-[#5C5C5C]">Dev Weekends</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

const CONTACT_HREF = "mailto:info@devweekends.com?subject=DSOC%20Exceptional%20Case";

const footerLink = "inline-flex min-h-11 items-center px-3 text-[#404040] transition-colors hover:text-black";

/** Difficulty in black and white: outline for beginner, grey fill for intermediate, black fill for advanced. */
function difficultyStyle(difficulty: string) {
  switch (difficulty) {
    case 'beginner': return 'border-[#D4D4D4] bg-white text-[#404040]';
    case 'advanced': return 'border-[#0A0A0A] bg-[#0A0A0A] text-white';
    default: return 'border-[#E6E6E6] bg-[#E6E6E6] text-[#262626]';
  }
}

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span aria-hidden="true" className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-[#0A0A0A] text-white">
      <Icon className="h-5 w-5" />
    </span>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#F7F7F7] px-3 py-1 text-xs font-medium text-[#404040]">
      {children}
    </span>
  );
}

function StepList({ steps, onDark }: { steps: string[]; onDark?: boolean }) {
  return (
    <ol className="mt-7 space-y-4">
      {steps.map((step, i) => (
        <li key={step} className="flex items-start gap-3.5">
          <span
            aria-hidden="true"
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
              onDark ? 'bg-[#262626] text-white' : 'bg-[#F7F7F7] text-[#0A0A0A]'
            }`}
          >
            {i + 1}
          </span>
          <span className={`pt-1 text-base leading-[1.5] ${onDark ? 'text-[#E6E6E6]' : 'text-[#404040]'}`}>{step}</span>
        </li>
      ))}
    </ol>
  );
}
