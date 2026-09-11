# Contributing to Dev Weekends Web Platform

First off, thank you for considering contributing to the Dev Weekends Web Platform! 🎉

This project powers the public site and internal portals for the Dev Weekends community. Your contributions help us serve our community of learners, mentors, and tech enthusiasts better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Guidelines](#coding-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Getting Help](#getting-help)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [devweekends@gmail.com](mailto:devweekends@gmail.com).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20+ (LTS recommended) – [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or another package manager
- **MongoDB** – Local installation or [MongoDB Atlas](https://www.mongodb.com/atlas) account
- **Git** – [Download](https://git-scm.com/)
- A code editor (we recommend [VS Code](https://code.visualstudio.com/) with TypeScript support)

### Finding Issues to Work On

1. **Good First Issues** – Perfect for newcomers! Look for the [`good first issue`](https://github.com/devweekends/web-platform/labels/good%20first%20issue) label.
2. **Help Wanted** – Issues where we need community help. Look for the [`help wanted`](https://github.com/devweekends/web-platform/labels/help%20wanted) label.
3. **Bug Fixes** – Check the [`bug`](https://github.com/devweekends/web-platform/labels/bug) label.
4. **Feature Requests** – Browse the [`enhancement`](https://github.com/devweekends/web-platform/labels/enhancement) label.

> 💡 **Tip**: Comment on an issue to let others know you're working on it. This prevents duplicate work!

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/web-platform.git
cd web-platform

# Add the original repository as upstream
git remote add upstream https://github.com/devweekends/web-platform.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```bash
# Required
MONGODB_URI=mongodb://localhost:27017/devweekends  # or your MongoDB Atlas URI
JWT_SECRET=your-secret-key-here

# Access codes (set your own for local development)
ADMIN_ACCESS_CODE=your-admin-code
MENTOR_ACCESS_CODE=your-mentor-code
AMBASSADOR_ACCESS_CODE=your-ambassador-code

# Optional
NEXT_PUBLIC_GA_ID=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 5. Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

1. Go to [Issues](https://github.com/devweekends/web-platform/issues)
2. Click "New Issue"
3. Select "Bug Report"
4. Fill in the template with as much detail as possible

**Include:**
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

### Suggesting Features

1. Go to [Issues](https://github.com/devweekends/web-platform/issues)
2. Click "New Issue"
3. Select "Feature Request"
4. Describe the feature and its use case

### Submitting Code Changes

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following our [coding guidelines](#coding-guidelines)

3. **Test your changes**:
   ```bash
   npm run lint    # Check for linting errors
   npm run build   # Ensure it builds successfully
   ```

4. **Commit your changes** following our [commit guidelines](#commit-guidelines)

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** against the `main` branch

## Coding Guidelines

### TypeScript

- Use **TypeScript** for all new code (`.ts` / `.tsx` files)
- Enable **strict mode** – avoid `any` type when possible
- Define proper types/interfaces for all props and function parameters
- Export types that may be reused

```typescript
// ✅ Good
interface SessionProps {
  id: string;
  name: string;
  date: Date;
}

export function Session({ id, name, date }: SessionProps) {
  // ...
}

// ❌ Bad
export function Session(props: any) {
  // ...
}
```

### Next.js Conventions

- Follow **App Router** conventions
- Use **Server Components** by default, Client Components only when needed
- Use **Server Actions** or **API Routes** for backend logic

```typescript
// Client component (only when needed)
'use client'

import { useState } from 'react'

export function InteractiveComponent() {
  const [state, setState] = useState(false)
  // ...
}
```

### File Organization

| Directory | Purpose |
|-----------|---------|
| `app/` | Pages and API routes (App Router) |
| `components/` | Reusable React components |
| `components/ui/` | Primitive UI components |
| `lib/` | Utilities, helpers, and shared logic |
| `models/` | Mongoose database models |
| `types/` | TypeScript type definitions |

### Imports

Use the `@/` path alias for imports:

```typescript
// ✅ Good
import { Button } from '@/components/ui/button'
import connectDB from '@/lib/db'
import { Session } from '@/models/Session'

// ❌ Bad
import { Button } from '../../../components/ui/button'
```

### Styling

- Use **Tailwind CSS** utility classes
- Follow existing patterns and component styles
- Ensure responsive design (mobile-first approach)
- Support both light and dark themes

```tsx
// ✅ Good - Using Tailwind
<div className="flex items-center gap-4 p-4 rounded-lg bg-card">
  <h2 className="text-lg font-semibold text-foreground">Title</h2>
</div>
```

### Database Access

- Always use `connectDB()` from `lib/db.ts`
- Use existing Mongoose models from `models/`
- Handle errors gracefully

```typescript
import connectDB from '@/lib/db'
import { Session } from '@/models/Session'

export async function GET() {
  try {
    await connectDB()
    const sessions = await Session.find()
    return Response.json(sessions)
  } catch (error) {
    console.error('Database error:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
```

### API Routes

- Validate all input data
- Return appropriate HTTP status codes
- Use consistent response formats
- Implement proper authentication checks for protected routes

```typescript
import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    await connectDB()
    // ... process request
    
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear and consistent commit messages.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, semicolons, etc.) |
| `refactor` | Code changes that neither fix bugs nor add features |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks (dependencies, configs, etc.) |
| `ci` | CI/CD configuration changes |

### Examples

```bash
# Feature
feat(sessions): add filtering by category

# Bug fix
fix(auth): resolve token expiration issue

# Documentation
docs(readme): update installation instructions

# Refactor
refactor(api): simplify mentor route handlers
```

### Tips

- Keep commits **small and focused** on a single change
- Write commit messages in **imperative mood** ("Add feature" not "Added feature")
- Reference issue numbers when applicable: `fix(auth): resolve login bug (#123)`

## Pull Request Process

### Before Submitting

- [ ] Code follows the project's coding guidelines
- [ ] Self-reviewed all changes
- [ ] `npm run lint` passes without errors
- [ ] `npm run build` completes successfully
- [ ] No sensitive data (secrets, API keys) is committed
- [ ] Updated documentation if needed

### PR Title

Use the same format as commit messages:

```
feat(component): add new feature description
fix(api): resolve specific bug
docs(contributing): update guidelines
```

### PR Description

1. Describe **what** the PR does
2. Explain **why** the change is needed
3. Note **how** to test the changes
4. Include screenshots for UI changes
5. Reference related issues

### Review Process

1. **Automated checks** must pass (lint, build)
2. At least **one maintainer approval** is required
3. Address review feedback promptly
4. Once approved, a maintainer will merge your PR

### After Merge

- Delete your feature branch
- Celebrate! 🎉 You've contributed to open source!

## Project Structure

```
web-platform/
├── .github/                # GitHub templates and workflows
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md
├── app/                    # Next.js App Router
│   ├── admin/              # Admin dashboard
│   ├── ambassador/         # Ambassador portal
│   ├── mentor/             # Mentor portal
│   ├── api/                # API routes
│   └── ...                 # Public pages
├── components/             # React components
│   ├── ui/                 # Primitive components
│   └── ...                 # Feature components
├── lib/                    # Utilities
│   ├── db.ts               # Database connection
│   ├── auth.ts             # Auth helpers
│   └── jwt.ts              # JWT utilities
├── models/                 # Mongoose models
├── public/                 # Static assets
├── types/                  # TypeScript types
├── .env.example            # Environment template
├── CODE_OF_CONDUCT.md      # Community guidelines
├── CONTRIBUTING.md         # This file
├── LICENSE                 # MIT License
├── README.md               # Project overview
└── SECURITY.md             # Security policy
```

## Testing

While we don't have extensive automated tests yet, please ensure:

1. **Manual testing** of your changes
2. **Cross-browser testing** for UI changes
3. **Mobile responsiveness** verification
4. **Authentication flows** work correctly for protected features

We welcome contributions to improve our testing infrastructure!

## Getting Help

### Resources

- 📖 **[README](README.md)** – Project overview and setup
- 📁 **[Project Structure](#project-structure)** – Code organization
- 🔒 **[Security Policy](SECURITY.md)** – Reporting vulnerabilities

### Communication

- 💬 **Issues** – For bugs and feature requests
- 🔗 **[Community](https://devweekends.com/links)** – Join our community channels
- 📧 **Email** – [devweekends@gmail.com](mailto:devweekends@gmail.com) for sensitive matters

### Tips

- Look for similar existing code and follow the same patterns
- When in doubt, ask! Open an issue to discuss your approach
- Start small – even documentation improvements are valuable

---

Thank you for contributing to Dev Weekends! Your efforts help us build a better platform for our community of learners and mentors. 🚀

**Happy coding!** ✨
