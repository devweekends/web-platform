/**
 * Homepage content and links. Keep every URL here so a link can be fixed in one place.
 * `null` means "no destination yet": the UI shows the item as not clickable.
 */

export const LINKS = {
  discord: "https://discord.gg/Cy7Rgkf4Up",
  github: "https://github.com/devweekends",
  linkedin: "https://www.linkedin.com/company/devweekends/",
  youtube: "https://www.youtube.com/@devweekends",
  instagram: "https://www.instagram.com/devweekends",
  facebook: "https://www.facebook.com/DevWeekends/",
  resources: "https://resources.devweekends.com",
  pathment: "https://pathment.me/",
  inroad: "https://inroad-web.vercel.app/",
  goalslot: "https://www.goalslot.io/",
  qantara: "https://empactus.org.uk/qantara-the-palestinian-ai-fellowship/",
  email: "info@devweekends.com",
  communities: "/links",
  fellowship: "/fellowship",
  dsoc: "/dsoc",
  dwosi: "/dwosi",
  fyp: "/fyp-roadshow",
  getInvolved: "/#get-involved",
  partners: "/partners",
  stories: "/testimonials",
  guides: "/guides",
  blog: "/blog",
  ourStory: "/team",
  impactNumbers: "/team#impact",
  fellowshipReport: "/blog/fellowship-2026-by-the-numbers",
  gsocPost: "/blog/gsoc",
  lfxPost: "/blog/lfx-mentorship-2026-talha-amjad",
  sessions: "/sessions",
  /** Buildment has no public production URL yet */
  buildment: null as string | null,
}

export const mailto = (subject: string) => `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}`

/** Root-relative so the same header works on every page of the site */
export const navItems = [
  { label: "Programs", href: "/#programs" },
  { label: "Impact", href: "/#impact" },
  { label: "Team", href: LINKS.ourStory },
  { label: "Community links", href: "/links" },
  { label: "Partners", href: "/#partners" },
  { label: "Resources", href: "/#resources" },
  { label: "Blog", href: "/blog" },
]

export type ApplyProgram = {
  name: string
  when: string
  status: "OPEN" | "CLOSED" | "GROUP"
  cta: string
  href: string
}

export const applyPrograms: ApplyProgram[] = [
  {
    name: "Engineering Fellowship",
    when: "Seasonal cohort. 2026 closed, see what is next",
    status: "CLOSED",
    cta: "Learn more",
    href: LINKS.fellowship,
  },
  {
    name: "DSOC, Dev Weekends Summer of Code",
    when: "Seasonal. Opens next summer",
    status: "CLOSED",
    cta: "Learn more",
    href: LINKS.dsoc,
  },
  {
    name: "DWOSI, Open Source Initiative",
    when: "Contribute to our products any time",
    status: "OPEN",
    cta: "Start contributing",
    href: LINKS.dwosi,
  },
  {
    name: "Final year project (FYP) mentorship",
    when: "Guidance on your university final year project. All year, except while a fellowship is running",
    status: "OPEN",
    cta: "Apply",
    href: LINKS.fyp,
  },
  {
    name: "Campus Ambassador Program",
    when: "Lead Dev Weekends on your university campus",
    status: "OPEN",
    cta: "Learn more",
    href: "/ambassador-program",
  },
  {
    name: "GSoC prep",
    when: "Join the prep group on WhatsApp and Discord",
    status: "GROUP",
    cta: "Join the group",
    href: "/links#open-source",
  },
]

export const countries = [
  "Pakistan", "India", "Nepal", "USA", "UK", "Nigeria", "Egypt", "Morocco", "Kenya", "Palestine",
  "Rwanda", "Russia", "Australia", "Singapore", "Spain", "Italy", "China", "Turkey", "Cameroon",
  "Ethiopia", "Sri Lanka", "Myanmar", "UAE", "Cyprus", "South Africa", "Algeria", "Indonesia",
  "Haiti", "DR Congo",
]

export const reach = [
  { value: "30", label: "Countries" },
  { value: "222", label: "Universities" },
  { value: "2,100+", label: "Fellows trained" },
  { value: "100%", label: "Free, always" },
]

/** Our direct partners, in display order */
export const partners: Org[] = [
  { name: "Olostep", href: "https://www.olostep.com", logo: "/logos/olostep.svg" },
  { name: "MicroTechX", href: "https://www.microtechx.com", logo: "/logos/microtechx.png" },
  { name: "EmpactUs", href: "https://empactus.org.uk", logo: "/logos/empactus.png" },
  { name: "MAX Circles", href: "https://onemax.org", logo: "/logos/max.png", tall: true },
  { name: "Hoopo", href: "https://www.gohoopo.com", logo: "/logos/hoopo.svg" },
  { name: "Cyberiad Labs", href: "https://cyberiadlabs.com", logo: "/logos/cyberiad-labs.svg", iconOnly: true },
]
export const communityPartners: Org[] = [
  { name: "MLSA COMSATS", href: "https://mvp.microsoft.com/studentambassadors", logo: null },
  { name: "AWS Cloud Club, UE Lahore", href: "https://builder.aws.com/community/student-builder-groups", logo: null },
  { name: "GDG on Campus, UE Lahore", href: "https://gdg.community.dev", logo: null },
]

/** Where alumni, mentors and fellows work and contribute. Not partners. */
export type Org = { name: string; href: string | null; logo: string | null; iconOnly?: boolean; tall?: boolean }

export const placesLike: Org[] = [
  { name: "Google Summer of Code", href: "https://summerofcode.withgoogle.com", logo: "/logos/google-summer-of-code.svg" },
  { name: "Linux Foundation", href: "https://www.linuxfoundation.org", logo: "/logos/linux-foundation.svg", tall: true },
  { name: "CNCF", href: "https://www.cncf.io", logo: "/logos/cncf.svg" },
  { name: "Apache", href: "https://www.apache.org", logo: "/logos/apache-software-foundation.svg", tall: true },
  { name: "Microsoft", href: "https://www.microsoft.com", logo: "/logos/microsoft.svg" },
  { name: "Turing", href: "https://www.turing.com", logo: "/logos/turing.svg" },
  { name: "Scale AI", href: "https://scale.com", logo: "/logos/scale-ai.svg" },
  { name: "Upwork", href: "https://www.upwork.com", logo: "/logos/upwork.svg", tall: true },
  { name: "Toptal", href: "https://www.toptal.com", logo: "/logos/toptal.png" },
  { name: "Calo", href: "https://calo.app/en", logo: "/logos/calo.svg", iconOnly: true, tall: true },
  { name: "Salla", href: "https://salla.sa", logo: "/logos/salla.png", iconOnly: true, tall: true },
  { name: "Unanime Planet", href: null, logo: null },
  { name: "Nectar Social", href: "https://www.nectarsocial.com", logo: "/logos/nectar-social.svg" },
  { name: "Olostep", href: "https://www.olostep.com", logo: "/logos/olostep.svg" },
]

export const impactBreakdown = [
  { label: "Remote salaries, every year", value: "$1.3M+" },
  { label: "Earned on Upwork", value: "$1M+" },
  { label: "Earned at Turing and Scale AI", value: "$250K+" },
  { label: "Open source stipends", value: "$20K+" },
]

export const outcomes = [
  {
    value: "9",
    title: "Google Summer of Code 2026",
    text: "Up from two in 2025, at Apache, NumFOCUS, FOSSASIA, Drupal and more.",
    link: { label: "Meet the 2026 class", href: LINKS.gsocPost },
  },
  {
    value: "1 + 1",
    title: "Linux Foundation LFX",
    text: "A mentee at CNCF on GPU scheduling in Volcano, and a fellow who became an LFX mentor.",
    link: { label: "Read Talha's story", href: LINKS.lfxPost },
  },
  {
    value: "100+",
    title: "Remote placements",
    text: "Engineers on international teams through Turing, Arc, Toptal and direct hires.",
  },
  {
    value: "20+",
    title: "At Turing and Scale AI",
    text: "Vetted for full-time remote work, or writing challenges that train leading AI models.",
  },
  {
    value: "50+",
    title: "Top-rated freelancers",
    text: "Top Rated on Upwork and similar platforms. 23 started in the last cohort alone.",
  },
  {
    value: "5",
    title: "Companies founded",
    text: "Startups built through the X-Team builder community and 2-Day Startup sprints.",
  },
]

export const programs = [
  {
    label: "Learn and build",
    name: "Engineering Fellowship",
    text: "A structured four-month journey. Real projects, focused study groups (clans), mentor guidance and the accountability to keep growing.",
    link: { label: "Explore the fellowship", href: LINKS.fellowship },
    dark: false,
  },
  {
    label: "Contribute and grow",
    name: "Open Source and GSoC",
    text: "DWOSI products, DSOC cohorts and GSoC and LFX preparation. Work with maintainers and build a public record.",
    link: { label: "Explore open source", href: LINKS.dwosi },
    dark: false,
  },
  {
    label: "Think and thrive",
    name: "MindMaster",
    text: "Human skills that make great engineers: growth mindset, communication, adaptability, teamwork, personal development and purpose.",
    tag: "Invite only",
    link: { label: "Courses coming soon on Buildment", href: null as string | null },
    dark: false,
  },
]

export const platforms = [
  { name: "Pathment", text: "Where fellowships run: clans, mentors, tasks and progress.", href: LINKS.pathment },
  { name: "Buildment", text: "Where our courses will live, MindMaster included. Coming soon.", href: LINKS.buildment },
]

export const products: { name: string; tag: string; text: string; href: string | null }[] = [
  { name: "Pathment", tag: "PLATFORM", text: "Runs our fellowships: clans, mentors, tasks and progress tracking.", href: LINKS.pathment },
  { name: "Buildment", tag: "PLATFORM", text: "Our courses, MindMaster included, are coming here. Learn engineering by building.", href: LINKS.buildment },
  { name: "Community Cloud", tag: "FREE COMPUTE", text: "Shared Kubernetes from contributed compute for members' workloads.", href: "/dwosi#projects" },
  { name: "Inroad", tag: "CAREERS", text: "Finds companies that fit you and drafts a note to the person who can hire you.", href: LINKS.inroad },
  { name: "GoalSlot", tag: "PRODUCTIVITY", text: "Goals on your calendar, deep work on a timer, progress in reports.", href: LINKS.goalslot },
  { name: "Content Control Platform", tag: "LEARNING", text: "Video and blog apps that guide each learner by background and goals.", href: null },
]

export type Circle = { name: string; text: string; href: string | null; note?: string }

export const circles: Circle[] = [
  { name: "LFX Mentorship", text: "Prepare for Linux Foundation (LFX) mentorships", href: "/links" },
  { name: "GSoC Prep", text: "Google Summer of Code proposals, organizations and practice", href: "/links#open-source" },
  { name: "DSOC", text: "Dev Weekends Summer of Code, mentored open source", href: LINKS.dsoc },
  { name: "DWOSI", text: "Dev Weekends Open Source Initiative", href: LINKS.dwosi },
  { name: "Open Source", text: "First contributions to real projects", href: "/links#open-source" },
  { name: "Weekend Deep-Dives", text: "Topic-focused intensive sessions", href: LINKS.sessions },
  { name: "2-Day Startup", text: "Onsite sprints to ship fast. Ask on Discord", href: LINKS.discord, note: "Invite only" },
  { name: "Remote Job Placement", text: "Landing international remote roles", href: "/links#placements" },
  { name: "Mock Interviews", text: "Practice with working engineers", href: "/links#competitive-programming" },
  { name: "ICPC Team", text: "Competitive programming for the ICPC contest", href: "/links#competitive-programming" },
  { name: "Hackathons", text: "Building well-engineered products together", href: "/links#events" },
  { name: "Co-Working", text: "Virtual sessions for focused work", href: LINKS.discord },
]

export type StartPath = {
  id: string
  label: string
  heading: string
  text: string
  /** Shown instead of the program list for paths that are not applications */
  detail?: string
  showPrograms?: boolean
  actions: { label: string; href: string }[]
}

/** "Start where you are": who the visitor is, and their way in */
export const startPaths: StartPath[] = [
  {
    id: "learner",
    label: "I want to learn",
    heading: "Join, then apply.",
    text: "Discord is home: sessions, circles, opportunities and 30,000+ people who have done it before. Free and open all year.",
    showPrograms: true,
    actions: [{ label: "Join on Discord", href: LINKS.discord }],
  },
  {
    id: "mentor",
    label: "I want to mentor",
    heading: "Make your experience useful to someone next.",
    text: "Tell us your background and why you want to help.",
    detail: "Mentors join sessions, review work and guide people through programs. Say hello and we will take it from there.",
    actions: [
      { label: "Become a mentor", href: mailto("Becoming a Dev Weekends mentor") },
      { label: "Join on Discord", href: LINKS.discord },
    ],
  },
  {
    id: "hiring",
    label: "I am hiring",
    heading: "Meet engineers through the work they have shipped.",
    text: "Talk to us about hiring from the Dev Weekends talent pool.",
    detail: "Our members build real projects, contribute to open source and mentor each other. Tell us what you are hiring for.",
    actions: [{ label: "Hire from the talent pool", href: mailto("Hiring from the Dev Weekends talent pool") }],
  },
  {
    id: "sponsor",
    label: "I want to sponsor",
    heading: "Keep people building.",
    text: "Fund stipends, equipment and the moments that keep people going.",
    detail: "Dev Weekends is free and nonprofit. Sponsorship goes to the people who cannot pay.",
    actions: [{ label: "Support the mission", href: mailto("Sponsoring Dev Weekends") }],
  },
  {
    id: "partner",
    label: "I represent an organization",
    heading: "Build a bridge with us.",
    text: "Universities, companies and communities running programs with us.",
    detail: "Tell us what you have in mind, or see how we already work with partners.",
    actions: [
      { label: "Reach out to us", href: mailto("Partnering with Dev Weekends") },
      { label: "See our partners", href: LINKS.partners },
    ],
  },
]

export const resourceGuides = [
  { title: "A grad's guide to growing as a person and cracking tech", href: "/guides/cracking-tech-roles" },
  { title: "Choosing the right project to build", href: "/guides/choosing-the-right-project" },
  { title: "Building better habits and a balanced schedule", href: "/guides/better-habits-balanced-schedule" },
]

export const resourcePosts = [
  { title: "Fellowship 2026 by the numbers: 3,000+ applied, 1,072 selected", href: LINKS.fellowshipReport },
  { title: "9 contributors in GSoC 2026, and 5 more in other programs", href: LINKS.gsocPost },
  { title: "What actually happens at a Tech Grind", href: "/blog/weekend-tech-grind-1" },
]

export const qantaraStages = [
  { name: "Foundation", text: "JavaScript, React, Node.js" },
  { name: "Structure", text: "Cloud, DevOps" },
  { name: "Frontier", text: "LLMs, AI agents" },
]

/**
 * Partners shown on the Qantara fellowship page (empactus.org.uk). They are
 * partners of Qantara, not necessarily direct Dev Weekends partners, so they
 * are only shown inside the Qantara section.
 */
export const qantaraPartners: Org[] = [
  { name: "EmpactUs", href: "https://empactus.org.uk", logo: "/logos/empactus.png" },
  { name: "Ruhcare", href: "https://www.ruhcare.com", logo: "/logos/ruhcare.png" },
  { name: "Hoopo", href: "https://www.gohoopo.com", logo: "/logos/hoopo.svg" },
  { name: "The CollectV", href: "https://www.thecollectv.ca", logo: "/logos/the-collectv.png" },
  { name: "MAX", href: "https://onemax.org", logo: "/logos/max.png", tall: true },
  { name: "iSource Professionals", href: "https://isourceprofessionals.com", logo: "/logos/isource-professionals.png" },
]

export const partnerCards = [
  { label: "For universities", title: "Fellowship cohorts on your campus", text: "Final year project (FYP) mentorship, study groups called clans, and a certification your faculty can point to." },
  { label: "For companies", title: "Hire, or sponsor", text: "Hire remote-ready engineers and host mock interviews, or sponsor stipends and equipment." },
  { label: "For communities and organizations", title: "Run programs together", text: "Co-host sessions, hackathons and joint fellowship and open source tracks." },
]

/**
 * Video stories, shown first. Paste a YouTube, Google Drive or Loom link into
 * `url` and the card appears; entries with no url are not shown.
 */
export const videoStories: { name: string; role: string; url: string | null }[] = [
  {
    name: "14 contributors, one community",
    role: "How Dev Weekends members cracked GSoC, ESoC and more",
    url: "https://www.youtube.com/watch?v=eP25H9HX8D8",
  },
  { name: "Muhammad Saqlain", role: "GSoC 2026, NumFOCUS", url: "https://youtu.be/7mtCxDtcYvA" },
  { name: "Mateeb Haider", role: "GSoC 2026, FOSSASIA", url: "https://youtu.be/VQHqeFUKvF8" },
  { name: "Muhammad Junaid Shaukat", role: "GSoC 2026, Apache Beam", url: "https://youtu.be/6SfzvbiRspg" },
  { name: "Aqib Nawab", role: "GSoC 2026, C2SI", url: "https://youtu.be/N_PP62MsaEE" },
  { name: "Kamran ul Haq", role: "GSoC 2026, FLARE", url: "https://youtu.be/v01zfRuV9Vw" },
]

export const voices = [
  { name: "Muhammad Saqlain", role: "GSoC @ Chromium, instructor", quote: "With the guidance of the amazing mentors at Dev Weekends, I was able to crack Google Summer of Code." },
  { name: "Henry Anomah Yeboah", role: "Fellow", quote: "I gained proficiency in React, Node.js and the MERN stack, and have now solved over 100 DSA problems." },
  { name: "M Salman", role: "GSoC @ FOSSology", quote: "The mentorship, mentors, fellow members, resources and support helped me a lot in cracking GSoC." },
  { name: "Alisha Fatima", role: "Fellow", quote: "Real growth means understanding concepts, applying them by building projects, and moving on to new challenges." },
  { name: "M Shehroz", role: "Software Engineer @ Unanime Planet", quote: "Thanks to Dev Weekends, I have landed my dream job and am now enjoying it." },
  { name: "Saqlain Nawaz", role: "Open source contributor", quote: "From unknown to contributing to the world's most used browser. Open source is the gateway to global opportunities." },
]

export const footerColumns = [
  {
    title: "Get involved",
    links: [
      { label: "Join the community", href: LINKS.discord },
      { label: "All community links", href: LINKS.communities },
      { label: "Apply to a program", href: "/#get-involved" },
      { label: "Become a mentor", href: mailto("Becoming a Dev Weekends mentor") },
      { label: "Hire talent", href: mailto("Hiring from the Dev Weekends talent pool") },
      { label: "Sponsor or partner", href: LINKS.partners },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Engineering Fellowship", href: LINKS.fellowship },
      { label: "DSOC", href: LINKS.dsoc },
      { label: "DWOSI", href: LINKS.dwosi },
      { label: "FYP mentorship", href: LINKS.fyp },
      { label: "Campus ambassadors", href: "/ambassador-program" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Pathment", href: LINKS.pathment },
      { label: "Community Cloud", href: "/dwosi#projects" },
      { label: "All products", href: LINKS.dwosi },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: LINKS.guides },
      { label: "Blog", href: LINKS.blog },
      { label: "Free docs and courses", href: LINKS.resources },
      { label: "YouTube videos", href: LINKS.youtube },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Team and story", href: LINKS.ourStory },
      { label: "Impact", href: LINKS.impactNumbers },
      { label: "Stories", href: LINKS.stories },
      { label: "Partners", href: LINKS.partners },
      { label: "Projects", href: "/projects" },
      { label: "Brand kit", href: "/brand" },
      { label: LINKS.email, href: `mailto:${LINKS.email}` },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Discord", href: LINKS.discord },
      { label: "LinkedIn", href: LINKS.linkedin },
      { label: "YouTube", href: LINKS.youtube },
      { label: "Instagram", href: LINKS.instagram },
      { label: "GitHub", href: LINKS.github },
    ],
  },
]
