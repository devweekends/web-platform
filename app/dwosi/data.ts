import type { LucideIcon } from "lucide-react"
import { Briefcase, CalendarClock, Cloud, GraduationCap, MonitorPlay, Route } from "lucide-react"

export const DWOSI_LINKS = {
  github: "https://github.com/devweekends",
  discord: "https://discord.gg/Cy7Rgkf4Up",
  linkedin: "https://www.linkedin.com/company/devweekends/",
  youtube: "https://www.youtube.com/@devweekends",
  email: "info@devweekends.com",
  dsoc: "/dsoc",
  dsocProjects: "/dsoc/projects",
  impactNumbers: "/our-story#impact",
  stories: "/testimonials",
}

/** The one conversion goal on DWOSI pages. Repeated in the header, hero and closing CTA. */
export const PRIMARY_CTA = { label: "Start contributing", href: "/dwosi#how-it-works" }

export interface DwosiProject {
  slug: string
  name: string
  category: string
  description: string
  icon: LucideIcon
  websiteUrl?: string
  repositoryUrl?: string
  /** Part of the DSOC 2026 cohort */
  dsoc?: boolean
  /** Real screenshot of the product, top of the page, 16:10 or wider */
  screenshot?: string
}

export const flagshipProjects: DwosiProject[] = [
  {
    slug: "buildment",
    name: "Buildment",
    category: "Learning",
    description:
      "An interactive course platform where you learn engineering by building projects, with several project variants per course so every learner's work is their own.",
    icon: GraduationCap,
  },
  {
    slug: "pathment",
    name: "Pathment",
    category: "Mentorship",
    description:
      "A mentorship platform for organizations that run structured, mentor-guided training, with task-based workflows, progress tracking and gamification.",
    icon: Route,
    websiteUrl: "https://pathment.me/",
    repositoryUrl: "https://github.com/Sheryar-Ahmed/pathment",
    dsoc: true,
    screenshot: "/images/dsoc/pathment.png",
  },
  {
    slug: "community-cloud",
    name: "Community Cloud",
    category: "Infrastructure",
    description:
      "Contribute spare compute and submit workloads that a shared Kubernetes cluster schedules with Volcano, with monitoring and usage tracking built in.",
    icon: Cloud,
  },
]

export const moreProjects: DwosiProject[] = [
  {
    slug: "inroad",
    name: "Inroad",
    category: "Careers · AI",
    description:
      "Finds companies that fit you, researches each one, finds the person who can hire you and drafts a note you send from your own Gmail.",
    icon: Briefcase,
    websiteUrl: "https://inroad-web.vercel.app/",
  },
  {
    // Built by the CodeHands AI team
    slug: "goalslot",
    name: "GoalSlot",
    category: "Productivity",
    description:
      "Define goals, block time for them on your calendar, track deep work with a live timer and prove your progress with reports.",
    icon: CalendarClock,
    websiteUrl: "https://www.goalslot.io/",
    repositoryUrl: "https://github.com/ZeeshanAdilButt/goal-slot-web",
    dsoc: true,
  },
  {
    slug: "content-control-platform",
    name: "Content Control Platform",
    category: "Learning content",
    description:
      "Video and blog apps on shared infrastructure that guide each learner using their background, goals and what they have already watched or read.",
    icon: MonitorPlay,
  },
]

export const comparison = {
  before: {
    label: "Practice projects",
    points: [
      "Nobody uses what you build.",
      "Nobody reviews your code.",
      "Your GitHub fills up with tutorial clones.",
    ],
  },
  after: {
    label: "DWOSI projects",
    points: [
      "Your code ships in real products, not throwaway demos.",
      "Maintainers review your pull request before it merges.",
      "Your profile shows merged work on live products.",
    ],
  },
}

export const steps: { title: string; description: string; link: { label: string; href: string } }[] = [
  {
    title: "Pick a project",
    description: "Choose a product below and get it running locally from its README.",
    link: { label: "See the projects", href: "/dwosi#projects" },
  },
  {
    title: "Say hi on Discord",
    description: "Introduce yourself and ask a maintainer which issue to start with.",
    link: { label: "Join the Discord", href: DWOSI_LINKS.discord },
  },
  {
    title: "Open a pull request",
    description: "Push your change, get a review from a maintainer and watch it ship.",
    link: { label: "Browse repositories", href: DWOSI_LINKS.github },
  },
]

/** Published Dev Weekends numbers. Keep in sync with components/home-impact.tsx. */
export const proofStats = [
  { value: "9", label: "Members selected for Google Summer of Code 2026" },
  { value: "$20K+", label: "Open source stipends earned through GSoC and LFX" },
  { value: "2,800+", label: "Engineers in the Dev Weekends Discord" },
  { value: "1,000+", label: "Engineers trained by Dev Weekends since 2018" },
]

export const dsocFacts = [
  { value: "10–12 wks", label: "Coding period" },
  { value: "1:1", label: "Mentorship" },
  { value: "Monthly", label: "Stipend per milestone" },
  { value: "15–20 hrs", label: "Per week" },
]

export const faqs = [
  {
    question: "Do I need open source experience?",
    answer:
      "No. You need the basics of the project's stack and a willingness to read code you didn't write. Ask on Discord and the maintainers can suggest an issue that fits your level.",
  },
  {
    question: "Do I need to be in DSOC to contribute?",
    answer:
      "No. The repositories are public, so you can pick an issue and open a pull request at any time. DSOC adds a dedicated mentor, a structured plan and a stipend.",
  },
  {
    question: "Does it cost anything?",
    answer: "No. Contributing is free, and DSOC participants are paid a monthly stipend.",
  },
  {
    question: "How much time does it take?",
    answer:
      "Contribute at your own pace. DSOC participants should plan for 15–20 hours a week, and mentors usually spend 3–5 hours a week.",
  },
  {
    question: "When do DSOC applications open?",
    answer:
      "DSOC 2026 applications are closed. The next cycle opens next summer, and dates will be announced on the DSOC page and in our Discord.",
  },
  {
    question: "How do I become a mentor?",
    answer: `Email ${DWOSI_LINKS.email} with your experience and the project you would like to mentor. Mentors run weekly check-ins and review pull requests.`,
  },
  {
    question: "Can I propose my own project?",
    answer: `Yes. Email ${DWOSI_LINKS.email} with what you want to build and who it is for, and the team will get back to you.`,
  },
]
