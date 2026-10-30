/** Open issues across the public DWOSI repositories (not the website's own issues). */
const OPEN_ISSUES_QUERY = [
  "is:issue",
  "is:open",
  "repo:pathment/pathment",
  "repo:devweekends/meshly-cloud-core",
  "repo:devweekends/meshly-cloud-api",
  "repo:devweekends/meshly-cloud-web",
  "repo:devweekends/meshly-cloud-desktop",
  "repo:devweekends/codehands-desktop",
  "repo:devweekends/codehands-contracts",
].join(" ")

export const DWOSI_LINKS = {
  github: "https://github.com/devweekends",
  discord: "https://discord.gg/Cy7Rgkf4Up",
  linkedin: "https://www.linkedin.com/company/devweekends/",
  youtube: "https://www.youtube.com/@devweekends",
  email: "info@devweekends.com",
  openIssues: `https://github.com/search?type=issues&q=${encodeURIComponent(OPEN_ISSUES_QUERY)}`,
}

/** The one conversion goal on DWOSI pages. Repeated in the header, hero and closing CTA. */
export const PRIMARY_CTA = { label: "View open issues", href: DWOSI_LINKS.openIssues }

export interface RecordEntry {
  title: string
  repo: string
  detail: string
  status: "merged" | "in review"
  url: string
}

/** Real pull requests from DWOSI repositories, as of October 2026. */
export const record: RecordEntry[] = [
  {
    title: "feat(orgs): add workspace logo upload, cropping, and display",
    repo: "pathment",
    detail: "1 review",
    status: "merged",
    url: "https://github.com/pathment/pathment/pull/794",
  },
  {
    title: "fix: resolve file upload failures in mentee task submissions",
    repo: "pathment",
    detail: "1 review",
    status: "merged",
    url: "https://github.com/pathment/pathment/pull/793",
  },
  {
    title: "feat(gamification): improve XP, coins, and role based badges",
    repo: "pathment",
    detail: "1 review",
    status: "merged",
    url: "https://github.com/pathment/pathment/pull/791",
  },
  {
    title: "fix(community): don't count self-rewards on the contribution leaderboard",
    repo: "pathment",
    detail: "awaiting review",
    status: "in review",
    url: "https://github.com/pathment/pathment/pull/804",
  },
]

/** Published Dev Weekends numbers. Keep in sync with components/home/data.ts. */
export const communityStats = [
  { value: "1,000+", label: "Engineers trained since 2018" },
  { value: "$20K+", label: "Open source stipends" },
  { value: "100+", label: "Remote placements" },
  { value: "20+", label: "Engineers at Turing and Scale AI" },
]

export interface Repository {
  slug: string
  description: string
  href?: string
  /** Part of the DSOC 2026 cohort */
  dsoc?: boolean
}

export const repositories: Repository[] = [
  {
    // Repository devweekends/Buildment is private for now
    slug: "edorax",
    href: "https://edorax.com",
    description: "Learn engineering by building projects, with several variants per course.",
  },
  {
    slug: "pathment",
    description: "Mentor-guided training for organizations, with task workflows and progress tracking.",
    href: "https://github.com/pathment/pathment",
    dsoc: true,
  },
  {
    // Community Cloud, built as Meshly Cloud
    slug: "devweekends/meshly-cloud",
    description: "Our community cloud: shared Kubernetes from contributed compute, scheduled with Volcano.",
    href: "https://github.com/orgs/devweekends/repositories?q=meshly-cloud",
  },
  {
    slug: "devweekends/codehands",
    description: "A local-first coding agent that plans, implements, tests in a sandbox and hands you a change to approve.",
    href: "https://github.com/orgs/devweekends/repositories?q=codehands",
  },
  {
    // SafeStream; repository and Slack channel: content-control-platform
    slug: "content-control-platform",
    description: "SafeStream: ask a question and get the video moments that answer it, filtered by your own rules.",
  },
]

export const partnerOffers = [
  {
    title: "Underwrite DSOC cohorts",
    description: "Fund monthly stipends tied to delivered milestones in a 10 to 12 week summer cycle.",
  },
  {
    title: "Provide code reviewers",
    description: "3 to 5 hours a week from your team to review pull requests and guide contributors 1:1.",
  },
  {
    title: "Host open repositories",
    description: "Place an open source project inside DWOSI for steady contributors and maintainer oversight.",
  },
  {
    title: "Hire by pull request",
    description: "Hire engineers by reading their merged, maintainer-reviewed work across DWOSI products.",
  },
]

export const hiringSteps = [
  { title: "Tell us the role", description: "Stack, level and location or remote." },
  {
    title: "Review real contributions",
    description: "Merged pull requests and review threads from matching contributors.",
  },
  { title: "Interview with context", description: "Talk through code you have already read." },
]
