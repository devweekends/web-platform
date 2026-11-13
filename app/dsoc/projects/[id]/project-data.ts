/**
 * The shape of a DSOC project and the built-in sample projects, shared by the
 * server page (which reads them to render the first HTML) and the client view.
 */

export interface Mentor {
  _id: string;
  name: string;
  /** Only present when the project came from the API, never shown */
  email?: string;
  picture?: string;
  company?: string;
  jobTitle?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
}

export interface Project {
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
export const SAMPLE_PROJECTS: Record<string, Project> = {
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
