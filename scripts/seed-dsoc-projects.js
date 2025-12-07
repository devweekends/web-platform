// Seed DSOC Projects
// Run with: node scripts/seed-dsoc-projects.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const DSOCProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  longDescription: String,
  organization: String,
  repositoryUrl: String,
  websiteUrl: String,
  difficulty: String,
  duration: String,
  technologies: [String],
  tags: [String],
  mentors: [mongoose.Schema.Types.ObjectId],
  selectedMentees: [mongoose.Schema.Types.ObjectId],
  maxMentees: Number,
  status: String,
  applicationDeadline: Date,
  startDate: Date,
  endDate: Date,
  requirements: [String],
  learningOutcomes: [String],
  milestones: [{
    title: String,
    description: String,
    dueDate: Date,
    completed: Boolean
  }],
  featuredImage: String,
  isActive: Boolean,
  season: String
}, { timestamps: true });

const DSOCProject = mongoose.models.DSOCProject || mongoose.model('DSOCProject', DSOCProjectSchema);

const projects = [
  {
    title: "NoteFlow - Modern Notion Clone",
    description: "Build a beautiful, real-time collaborative workspace that rivals Notion. Create a stunning note-taking app with blocks, databases, and seamless collaboration features.",
    longDescription: `# NoteFlow - Your Personal Knowledge Hub 📝✨

## The Vision
Create a powerful, modern workspace application inspired by Notion - but with your own creative twist. This isn't just another notes app; it's a canvas for your ideas, a home for your knowledge, and a platform for collaboration.

## What You'll Build

### 🎨 Beautiful Block Editor
- Rich text editing with markdown support
- Drag-and-drop blocks (text, headings, lists, code, images)
- Nested pages and infinite hierarchy
- Real-time collaborative editing

### 📊 Powerful Databases
- Table, Board (Kanban), Gallery, and List views
- Custom properties and filters
- Sorting, grouping, and searching
- Relations between databases

### 🚀 Modern Tech Stack
- **Frontend**: Next.js 14 with App Router, TailwindCSS, Framer Motion
- **Backend**: NestJS with TypeORM
- **Database**: PostgreSQL via Supabase
- **Real-time**: WebSockets for live collaboration
- **Auth**: Supabase Auth with OAuth providers

### ✨ Polish & Delight
- Beautiful animations and transitions
- Dark/light mode with smooth switching
- Responsive design for all devices
- Keyboard shortcuts for power users

## Why This Project?
This project combines complex state management, real-time features, and beautiful UI/UX - skills that are highly valued in the industry. You'll work with modern technologies and patterns that top companies use.`,
    organization: "Dev Weekends",
    repositoryUrl: "https://github.com/devweekends/noteflow",
    websiteUrl: "https://noteflow.devweekends.com",
    difficulty: "advanced",
    duration: "3 months",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Supabase", "TypeScript", "TailwindCSS", "WebSocket", "Prisma"],
    tags: ["fullstack", "collaboration", "real-time", "productivity", "saas"],
    maxMentees: 4,
    status: "open",
    applicationDeadline: new Date("2025-01-31"),
    startDate: new Date("2025-02-15"),
    endDate: new Date("2025-05-15"),
    requirements: [
      "Strong understanding of React and Next.js",
      "Experience with TypeScript",
      "Familiarity with REST APIs and databases",
      "Basic understanding of WebSockets",
      "Passion for building beautiful user interfaces"
    ],
    learningOutcomes: [
      "Master complex state management in React",
      "Build real-time collaborative features",
      "Design and implement scalable database schemas",
      "Create polished, production-ready UI/UX",
      "Work with modern authentication flows",
      "Deploy and maintain a full-stack application"
    ],
    milestones: [
      {
        title: "Foundation & Authentication",
        description: "Set up project structure, authentication with Supabase, and basic page layout",
        dueDate: new Date("2025-02-28"),
        completed: false
      },
      {
        title: "Block Editor Core",
        description: "Implement the block-based editor with basic blocks (text, headings, lists)",
        dueDate: new Date("2025-03-15"),
        completed: false
      },
      {
        title: "Database Views",
        description: "Create table and board views with filtering and sorting",
        dueDate: new Date("2025-04-01"),
        completed: false
      },
      {
        title: "Real-time Collaboration",
        description: "Add WebSocket support for live editing and presence indicators",
        dueDate: new Date("2025-04-20"),
        completed: false
      },
      {
        title: "Polish & Launch",
        description: "Final polish, testing, documentation, and deployment",
        dueDate: new Date("2025-05-15"),
        completed: false
      }
    ],
    featuredImage: "/images/dsoc/noteflow-preview.svg",
    isActive: true,
    season: "2025"
  },
  {
    title: "TimeMaster - Ultimate Productivity Suite",
    description: "Create a comprehensive productivity platform combining goal setting, time tracking, scheduling, and analytics in a powerful spreadsheet-like interface. Think Notion meets Google Sheets meets Toggl.",
    longDescription: `# TimeMaster - Master Your Time, Achieve Your Goals ⏰🎯

## The Vision
Build the ultimate productivity suite that brings together everything you need to manage your time and reach your goals. A powerful yet intuitive application that adapts to your workflow.

## What You'll Build

### 📊 Spreadsheet-Powered Interface
- Familiar spreadsheet-like grid for data entry
- Custom formulas for calculations
- Pivot tables for analytics
- Keyboard-first navigation

### 🎯 Goal Setting System
- SMART goal framework
- OKRs (Objectives & Key Results)
- Goal hierarchies and dependencies
- Progress tracking with visualizations

### ⏱️ Time Tracking
- One-click timer with project/task assignment
- Manual time entry
- Pomodoro technique integration
- Weekly/monthly time reports

### 📅 Smart Scheduling
- Calendar integration (Google, Outlook)
- Time blocking
- Task scheduling with drag-and-drop
- Recurring events and reminders

### 📈 Analytics Dashboard
- Beautiful charts and graphs
- Productivity trends over time
- Goal completion rates
- Time allocation breakdown

## Tech Stack
- **Frontend**: Next.js 14, React Query, Zustand, TailwindCSS
- **Backend**: NestJS with CQRS pattern
- **Database**: PostgreSQL with Supabase
- **Charts**: Recharts/Visx
- **Calendar**: FullCalendar integration

## Why This Project?
You'll tackle complex UI patterns (spreadsheet interfaces are notoriously difficult!), state management challenges, and data visualization - all skills that set senior developers apart.`,
    organization: "Dev Weekends",
    repositoryUrl: "https://github.com/devweekends/timemaster",
    websiteUrl: "https://timemaster.devweekends.com",
    difficulty: "advanced",
    duration: "3 months",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Supabase", "TypeScript", "TailwindCSS", "Recharts", "React Query"],
    tags: ["fullstack", "productivity", "analytics", "time-tracking", "saas"],
    maxMentees: 3,
    status: "open",
    applicationDeadline: new Date("2025-01-31"),
    startDate: new Date("2025-02-15"),
    endDate: new Date("2025-05-15"),
    requirements: [
      "Solid React and TypeScript skills",
      "Understanding of state management patterns",
      "Experience with data visualization",
      "Familiarity with backend development",
      "Interest in productivity and time management"
    ],
    learningOutcomes: [
      "Build complex grid/spreadsheet interfaces",
      "Master data visualization with modern charting libraries",
      "Implement CQRS pattern in NestJS",
      "Design intuitive productivity workflows",
      "Integrate with external calendar APIs",
      "Build performant applications handling large datasets"
    ],
    milestones: [
      {
        title: "Core Architecture",
        description: "Set up monorepo, authentication, and base spreadsheet component",
        dueDate: new Date("2025-02-28"),
        completed: false
      },
      {
        title: "Goal Setting Module",
        description: "Implement goal creation, hierarchy, and basic tracking",
        dueDate: new Date("2025-03-15"),
        completed: false
      },
      {
        title: "Time Tracking",
        description: "Build timer, manual entry, and time reports",
        dueDate: new Date("2025-04-01"),
        completed: false
      },
      {
        title: "Calendar & Scheduling",
        description: "Add calendar view, time blocking, and external integrations",
        dueDate: new Date("2025-04-20"),
        completed: false
      },
      {
        title: "Analytics & Polish",
        description: "Create dashboard, charts, and final polish",
        dueDate: new Date("2025-05-15"),
        completed: false
      }
    ],
    featuredImage: "/images/dsoc/timemaster-preview.svg",
    isActive: true,
    season: "2025"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing DSOC projects (optional - comment out if you want to keep existing)
    // await DSOCProject.deleteMany({});
    // console.log('Cleared existing projects');

    // Insert new projects
    for (const project of projects) {
      const existing = await DSOCProject.findOne({ title: project.title });
      if (existing) {
        console.log(`Project "${project.title}" already exists, skipping...`);
        continue;
      }
      await DSOCProject.create(project);
      console.log(`Created project: ${project.title}`);
    }

    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
}

seed();
