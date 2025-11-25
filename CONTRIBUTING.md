## Contributing to Dev Weekends Web Platform

Thank you for your interest in contributing to the **Dev Weekends** web platform!  
This project powers the public site and internal portals (admin, mentors, ambassadors, mentees) for the Dev Weekends community.

This document explains how the project is structured, how to run it locally, and the conventions to follow when you open a PR.

---

## Project Overview & Structure

This is a **Next.js 15** application using the **App Router**, **TypeScript**, **Tailwind CSS**, and **MongoDB (via Mongoose)**.

High‑level layout:

- **`app/`**: Next.js App Router structure.
  - **`app/page.tsx`**: Landing page.
  - **`app/about`, `app/community`, `app/fellowship`, `app/mentorship`, `app/resources`, `app/sessions`, `app/mindmaster`, etc.**: Public marketing and community pages.
  - **`app/admin/*`**: Admin dashboard (mentors, mentees, tags, tasks, sessions, resources, activity log, etc.).
  - **`app/ambassador/*` & `app/mentor/*`**: Ambassador and mentor portals (login, dashboards, mentees management, etc.).
  - **`app/api/*`**: API routes for authentication, mentors/mentees, sessions, resources, tags, tasks, file uploads, etc.
  - **`app/layout.tsx`**: Root layout, global metadata/SEO, theme provider, navbar/footer, analytics, and social modal.
- **`components/`**: Reusable UI and domain components.
  - **Top‑level components** such as `navbar`, `footer`, `analytics`, `MentorshipGraph`, `MentorsPage`, `TagAssignment`, `google_calender`, etc.
  - **`components/ui/`**: Primitive UI building blocks (buttons, inputs, dialogs, tabs, badges, etc.), largely based on Radix UI + Tailwind.
- **`lib/`**:
  - **`db.ts`**: MongoDB connection helper (Mongoose) with connection caching and model preloading.
  - **`auth.ts`, `jwt.ts`**: Authentication and JWT helpers.
  - **`analytics.ts`, `resources-*.ts`, `utils.ts`**: Misc. shared utilities and data.
- **`models/`**: Mongoose models such as `Admin`, `Mentor`, `Mentee`, `Ambassador`, `CoreTeamMember`, `ActivityLog`, `Session`, `Resource`, `Tag`, `Task`, `MindMaster`, etc.
- **`public/`**: Static assets (images, icons, manifest, favicons).
- **`styles & config`**:
  - **`app/globals.css`**: Global styles and Tailwind layers.
  - **`tailwind.config.ts`**, **`postcss.config.mjs`**: Tailwind/PostCSS configuration.
  - **`tsconfig.json`**: TypeScript configuration with `@/*` alias to the project root.
  - **`next.config.*`**: Next.js configuration.

If you’re adding a new page, it should usually go under `app/`. For reusable UI, prefer `components/` (or `components/ui/` for primitives).

---

## Prerequisites

- **Node.js**: Use a recent LTS version (e.g. Node 20+ recommended).
- **Package manager**: `npm` (repo includes a `package-lock.json`), but `yarn`, `pnpm`, or `bun` can also work if you prefer.
- **MongoDB**: Access to a MongoDB instance (local or hosted).

Global tools like `git` and a code editor with TypeScript support (VS Code, etc.) are strongly recommended.

---

## Environment Setup

1. **Clone the repository**

   ```bash
   git clone <your-fork-or-origin-url>
   cd web-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   - Create a `.env.local` file at the project root.
   - Use `.env.example` (if present in the repo) as a reference for required variables.
   - At minimum, you will need:
     - `MONGODB_URI` – MongoDB connection string (required by `lib/db.ts`).
     - Any analytics / auth / third‑party keys used in layout or API routes (for example `NEXT_PUBLIC_GA_ID` as referenced in `app/layout.tsx`).

4. **Run database locally or connect to a remote cluster**

   - If running MongoDB locally, ensure it is started before you run the app.
   - If using a hosted solution (e.g. MongoDB Atlas), ensure your `MONGODB_URI` is correct and IP‑whitelisted.

---

## Running the Project

From the project root:

- **Development server**

  ```bash
  npm run dev
  ```

  Open `http://localhost:3000` in your browser.

- **Production build**

  ```bash
  npm run build
  npm start
  ```

- **Linting**

  ```bash
  npm run lint
  ```

Please make sure your code passes `npm run lint` before pushing or opening a PR.

---

## Coding Guidelines

- **Language & framework**
  - Use **TypeScript** for new code (`.ts` / `.tsx`).
  - Follow **Next.js App Router** conventions (server components by default, client components only when needed).
  - Prefer **server actions / API routes** for backend logic instead of calling the database from the client.

- **Project structure**
  - Place **pages and route handlers** under `app/`.
  - Place **shared UI components** under `components/` (or `components/ui/` for primitives).
  - Place **business logic & helpers** under `lib/` (auth, DB helpers, utilities).
  - Define or reuse **Mongoose models** under `models/` and ensure you use the shared `connectDB` helper from `lib/db.ts`.

- **Styling**
  - Use **Tailwind CSS** and existing utility classes.
  - Prefer existing utility and component patterns for consistency.

- **TypeScript & strictness**
  - The project uses **`strict`** TypeScript.
  - Avoid `any` wherever possible; define proper types or interfaces.
  - Keep props and return types explicit for exported functions and components.

- **Imports & paths**
  - Use the `@/*` path alias when importing from within this repo:

    ```ts
    import Navbar from "@/components/navbar"
    import connectDB from "@/lib/db"
    ```

- **API & models**
  - Reuse existing patterns in `app/api/*/route.ts` for:
    - Connecting to the database with `connectDB`.
    - Handling errors and returning `NextResponse`.
    - Using centralized models from `models/`.

---

## Git & Branching Workflow

1. **Fork or branch**
   - If you are an external contributor: fork the repository, then create a feature branch from `main`.
   - If you are in the core team: create a branch from `main`.

2. **Create a descriptive branch name**

   Examples:

   - `feature/add-mentor-dashboard-filtering`
   - `fix/ambassador-login-redirect`
   - `chore/update-tailwind-config`

3. **Make focused commits**

   - Keep commits small and focused on a single concern.
   - Use clear, descriptive commit messages (e.g. “Fix mentor session filtering bug” rather than “fix stuff”).

4. **Keep your branch up to date**

   - Regularly pull from `main` and rebase or merge as appropriate to avoid large drift.

---

## Pull Request Guidelines

Before opening a PR, please ensure:

- **Build & lint pass**
  - `npm run build`
  - `npm run lint`

- **Scope is clear**
  - The PR addresses a single feature, fix, or refactor.
  - Large refactors should be split into smaller PRs where possible.

- **Description**
  - Clearly describe:
    - What you changed.
    - Why you changed it.
    - How to test it (steps, relevant pages, and any required env variables).

- **Screenshots / GIFs (recommended)**
  - For UI changes, include before/after screenshots or GIFs in the PR description.

- **No sensitive data**
  - Make sure no secrets, tokens, or private data are committed.

---

## Adding or Updating API Routes

If you introduce or modify an API route under `app/api/`:

- Use `connectDB` from `lib/db.ts` for any database access.
- Reuse existing response patterns and status codes from similar routes.
- Validate input payloads to avoid runtime errors.
- Ensure authentication/authorization is respected for admin/mentor/ambassador endpoints.

---

## Adding or Updating UI Pages/Components

- Follow existing layout and design patterns (Tailwind + existing components).
- Prefer composition over duplication: extract shared parts into reusable components under `components/`.
- Make sure pages are responsive (mobile‑first) and accessible where possible (ARIA attributes, semantic HTML, keyboard navigation, etc.).

---

## Questions & Support

If you’re unsure about where to place code, how to name something, or what pattern to follow:

- Look for similar existing pages/components/routes and mirror their approach.
- If you’re contributing as part of the Dev Weekends community, reach out to the maintainers or core team in the relevant communication channel.

We appreciate every contribution that helps improve the platform for learners, mentors, and ambassadors. 🚀


