## Dev Weekends Web Platform

This repository contains the **Dev Weekends** web platform – the public site and internal portals (admin, mentors, ambassadors, mentees) for the Dev Weekends community.

It is built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **MongoDB via Mongoose**.

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React, Tailwind CSS, Radix‑based UI components
- **Database**: MongoDB (via Mongoose)
- **Auth / Tokens**: Custom auth using JWT
- **Other**: Google Analytics, Cloudinary for media, role‑based access for Admin / Mentor / Ambassador

---

## Getting Started

### 1. Prerequisites

- Node.js (LTS, e.g. 20+ recommended)
- npm (or another package manager; this repo ships with `package-lock.json`)
- Access to a MongoDB instance (local or hosted)

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env.local` file in the project root.  
Use `.env.example` as a reference – it includes all the required keys, for example:

```bash
NEXT_PUBLIC_GA_ID=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

JWT_SECRET=

NODE_ENV=production

ADMIN_ACCESS_CODE=devweekends
MENTOR_ACCESS_CODE=devweekends
AMBASSADOR_ACCESS_CODE=devweekends

MONGODB_URI=
```

> **Note**: Do **not** commit your real `.env.local` or any secrets.

### 4. Run the development server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

For a production build:

```bash
npm run build
npm start
```

To run linting:

```bash
npm run lint
```

---

## Project Structure

High‑level overview of important directories:

- **`app/`** – Next.js App Router structure.
  - Public pages such as `page.tsx`, `about`, `community`, `fellowship`, `mentorship`, `resources`, `sessions`, `mindmaster`, etc.
  - Authenticated portals under `admin`, `ambassador`, and `mentor` for dashboards, mentees, tags, tasks, sessions, and resources.
  - API routes under `app/api/*` for auth, mentors/mentees, ambassadors, sessions, tags, resources, tasks, uploads, etc.
  - `app/layout.tsx` sets global metadata/SEO, theme, navbar/footer, analytics, and social modal.
- **`components/`** – Reusable React components, including:
  - Site‑wide components like navbar, footer, analytics, MentorshipGraph, MentorsPage, TagAssignment, Google calendar integration, etc.
  - `components/ui/` contains primitive UI components (buttons, inputs, dialogs, tabs, etc.).
- **`lib/`** – Shared logic/utilities:
  - `db.ts` (MongoDB connection via Mongoose with connection caching),
  - `auth.ts`, `jwt.ts` for authentication and token helpers,
  - Analytics helpers, resources data, and general utilities.
- **`models/`** – Mongoose models for Admin, Mentor, Mentee, Ambassador, CoreTeamMember, ActivityLog, Session, Resource, Tag, Task, MindMaster, etc.
- **`public/`** – Static assets (images, icons, manifest, favicons).
- **Config** – `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.*`, etc.

---

## Development Notes

- The project uses **strict TypeScript** – prefer strongly‑typed code and avoid `any` when possible.
- Use the `@/*` path alias for imports within the repo (configured in `tsconfig.json`), for example:

  ```ts
  import Navbar from "@/components/navbar"
  import connectDB from "@/lib/db"
  ```

- Database access should use the shared `connectDB` helper from `lib/db.ts` and the centralized Mongoose models in `models/`.
- New features should follow existing patterns in pages/components/API routes whenever possible.

---

## Contributing

Contributions are welcome from the Dev Weekends community and beyond.

- Please read **`CONTRIBUTING.md`** for:
  - Development environment setup,
  - Coding standards and project structure,
  - Branching / PR workflow,
  - How to add or modify pages, components, and API routes.

If you’re unsure how or where to implement a change, open an issue or discuss it with the maintainers before starting work.

---

## License

Unless otherwise specified by the maintainers, this project is proprietary to **Dev Weekends**.  
Please contact the core team if you’d like to use or redistribute any part of this codebase.
