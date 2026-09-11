// Every Dev Weekends community link (originally on linktr.ee/DevWeekends),
// grouped by topic so people can find and join the right group quickly.
// Thumbnails are self-hosted under /public/links.

export type SocialPlatform = "instagram" | "youtube" | "linkedin" | "facebook" | "github" | "discord"

// Picks the join button's label, icon and color.
export type JoinPlatform = "whatsapp" | "linkedin" | "facebook" | "github" | "website"

export type Community = {
  title: string
  description?: string
  platform: JoinPlatform
  thumbnail?: string
  // One link joins directly; several links are parallel groups and any one works.
  links: { label: string; url: string }[]
}

export type SectionIcon = "trophy" | "open-source" | "briefcase" | "code" | "cloud" | "palette" | "events"

export type LinkSection = {
  id: string
  title: string
  navLabel: string
  description: string
  icon: SectionIcon
  // "tiles" packs many small communities into a compact grid.
  layout: "cards" | "tiles"
  communities: Community[]
}

export type QuickLink = {
  title: string
  subtitle: string
  url: string
  icon: "website" | "resources" | "calendar"
}

const join = (url: string) => [{ label: "Join", url }]
const groups = (...urls: string[]) => urls.map((url, i) => ({ label: `Group ${i + 1}`, url }))

export const linksProfile = {
  name: "Dev Weekends",
  bio: "Promoting Tech to develop Good Engineers with Free Series by Top Engineers.",
  avatar: "/links/profile.png",
}

export const socialLinks: { platform: SocialPlatform; label: string; handle: string; url: string }[] = [
  { platform: "instagram", label: "Instagram", handle: "@devweekends", url: "https://www.instagram.com/devweekends/" },
  { platform: "youtube", label: "YouTube", handle: "@devweekends", url: "https://www.youtube.com/@devweekends" },
  { platform: "linkedin", label: "LinkedIn", handle: "Dev Weekends", url: "https://www.linkedin.com/company/dev-weekends/" },
  { platform: "facebook", label: "Facebook", handle: "DevWeekends", url: "https://www.facebook.com/DevWeekends/" },
  { platform: "github", label: "GitHub", handle: "devweekends", url: "https://github.com/devweekends" },
  { platform: "discord", label: "Discord", handle: "Join the server", url: "https://discord.gg/Cy7Rgkf4Up" },
]

export const quickLinks: QuickLink[] = [
  { title: "Dev Weekends", subtitle: "Fellowship, mentorship & programs", url: "/", icon: "website" },
  { title: "Resources", subtitle: "Free docs & courses", url: "https://resources.devweekends.com", icon: "resources" },
  {
    title: "Calendar",
    subtitle: "Upcoming sessions & events",
    url: "https://calendar.google.com/calendar/u/0?cid=YjA1ZmMyMGM2YjE5ZjNlMDBjNTgwMjA5MzZhNzAxODcwMTY2NzNiZTBiZjk3MWE4ZjM3OTgwMmE1M2YwY2U0M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
    icon: "calendar",
  },
]

export const linkSections: LinkSection[] = [
  {
    id: "competitive-programming",
    title: "Competitive Programming & DSA",
    navLabel: "CP & DSA",
    description: "Contests, problem solving and interview practice.",
    icon: "trophy",
    layout: "cards",
    communities: [
      {
        title: "Competitive Programming",
        description: "Contests, problem discussions and CP practice.",
        platform: "whatsapp",
        thumbnail: "/links/competitive-programming.jpg",
        links: join("https://chat.whatsapp.com/EmYaLjCAEaHIDZBcbIJHh3?mode=wwt"),
      },
      {
        title: "DSA Community",
        description: "Data structures and algorithms practice for interviews.",
        platform: "whatsapp",
        thumbnail: "/links/dsa-community.png",
        links: join("https://chat.whatsapp.com/Lt9p6n6AkSZItWDnwkSMQY"),
      },
      {
        title: "Mock Interviews",
        description: "Practice technical interviews with the community.",
        platform: "whatsapp",
        links: join("https://chat.whatsapp.com/J3iIn9tuoVtCD2sAPQyr9w"),
      },
      {
        title: "Programming Community",
        description: "Programming questions, help and discussions.",
        platform: "whatsapp",
        thumbnail: "/links/programming-community.png",
        links: join("https://chat.whatsapp.com/KmszUQCmjDR5FnnJ09ZeoD"),
      },
    ],
  },
  {
    id: "open-source",
    title: "Open Source",
    navLabel: "Open Source",
    description: "Contribute to real projects and prepare for GSoC.",
    icon: "open-source",
    layout: "cards",
    communities: [
      {
        title: "GSoC Preparation",
        description: "Get ready for Google Summer of Code: organizations, proposals and guidance.",
        platform: "whatsapp",
        thumbnail: "/links/gsoc-preparation.jpg",
        links: join("https://chat.whatsapp.com/HGRGHwCOQ2z4A1aJXkicUx?mode=gi_t"),
      },
      {
        title: "Dev Weekends Summer of Code",
        description: "Browse projects, connect with mentors and submit your proposal.",
        platform: "website",
        links: join("/dsoc"),
      },
      {
        title: "Dev Weekends on GitHub",
        description: "Our open-source repositories.",
        platform: "github",
        links: join("https://github.com/devweekends"),
      },
    ],
  },
  {
    id: "placements",
    title: "Placements & Jobs",
    navLabel: "Placements",
    description: "Job openings, referrals, remote work and freelancing.",
    icon: "briefcase",
    layout: "cards",
    communities: [
      {
        title: "Placement Community",
        description: "Job openings, referrals and placement updates.",
        platform: "whatsapp",
        thumbnail: "/links/placement-community.png",
        links: groups(
          "https://chat.whatsapp.com/GK9uQTsyk8kJsn5l6vuorF",
          "https://chat.whatsapp.com/JzShLso3HIlK19VcOwtCS0",
          "https://chat.whatsapp.com/K04jJJqSKlS0XeUUNTrqfp",
          "https://chat.whatsapp.com/BqbOxXPw52zEpE48QhEGeV",
          "https://chat.whatsapp.com/FqisLzmJCBQ9DbI6ekzA0Y",
          "https://chat.whatsapp.com/JVYqkiCyPoI2v4rmjgQQUM",
          "https://chat.whatsapp.com/IJywQaVUMmpLbFokMRK1s5",
          "https://chat.whatsapp.com/KqVXrOYWMSlDyh87h6Ue0y",
          "https://chat.whatsapp.com/EgQ4jnfmTiN27B7wOZ8cvR",
        ),
      },
      {
        title: "Remote Jobs",
        description: "Remote job openings.",
        platform: "whatsapp",
        thumbnail: "/links/remote-jobs-community.png",
        links: groups("https://chat.whatsapp.com/H7QZIJcZHqV52zWQa1yObm", "https://chat.whatsapp.com/H4SghteyvGiGA78wyX7CO0"),
      },
      {
        title: "Freelance Community",
        description: "Freelancing gigs, clients and tips.",
        platform: "whatsapp",
        thumbnail: "/links/freelance-community.png",
        links: groups(
          "https://chat.whatsapp.com/H12loUTd5LU8pGznlosCy4",
          "https://chat.whatsapp.com/HuRXXNp4CeRLp0ClSnVCmn",
          "https://chat.whatsapp.com/FtTRBLlsHaVAY6FVV6KuH4",
          "https://chat.whatsapp.com/E7FX9VzGxX7A398Jk8DroW",
        ),
      },
      {
        title: "LinkedIn Placement Group",
        description: "Placement updates on LinkedIn.",
        platform: "linkedin",
        thumbnail: "/links/linkedin-placement-group.png",
        links: join("https://www.linkedin.com/groups/9077758"),
      },
      {
        title: "LinkedIn Community",
        description: "LinkedIn profile tips and networking.",
        platform: "whatsapp",
        thumbnail: "/links/linkedin-community.png",
        links: join("https://chat.whatsapp.com/EdofOOqytl0HV3Y60P6PKR"),
      },
    ],
  },
  {
    id: "web-mobile",
    title: "Web & Mobile Development",
    navLabel: "Web & Mobile",
    description: "Talk to developers working with the same stack.",
    icon: "code",
    layout: "tiles",
    communities: [
      {
        title: "MERN",
        platform: "whatsapp",
        thumbnail: "/links/mern-community.png",
        links: groups("https://chat.whatsapp.com/CIGWuVjb2OD5X7goJIsSnH", "https://chat.whatsapp.com/HCiNe4huUql4UemESOhlBL"),
      },
      { title: "Vue.js", platform: "whatsapp", thumbnail: "/links/vue-community.png", links: join("https://chat.whatsapp.com/CoUUBSXJMSkGkYnGX6cxcQ") },
      { title: "Laravel", platform: "whatsapp", thumbnail: "/links/laravel-community.png", links: join("https://chat.whatsapp.com/HuJKiJw1AtF3zI2P0nm9js") },
      { title: "Django", platform: "whatsapp", thumbnail: "/links/django-community.png", links: join("https://chat.whatsapp.com/H33ru8veuXNKSHo6TTtbYz") },
      { title: "Java Spring", platform: "whatsapp", thumbnail: "/links/java-spring-community.png", links: join("https://chat.whatsapp.com/B8MdXofVLDc4iUCFKxZe94") },
      { title: ".NET", platform: "whatsapp", thumbnail: "/links/dotnet-community.png", links: join("https://chat.whatsapp.com/Fw4dF5UD3zN4LOZHhTivp8") },
      { title: "WordPress", platform: "whatsapp", thumbnail: "/links/wordpress-community.png", links: join("https://chat.whatsapp.com/JbUn60CjVxU510PGX5KPDk") },
      { title: "Flutter", platform: "whatsapp", thumbnail: "/links/flutter-community.png", links: join("https://chat.whatsapp.com/JljM00GRnhVKocT9Ki6oT5") },
      { title: "React Native", platform: "whatsapp", thumbnail: "/links/react-native-community.png", links: join("https://chat.whatsapp.com/FfllJRm8TSd6tZ6T3umgGC") },
      { title: "Game Dev", platform: "whatsapp", thumbnail: "/links/game-dev-community.png", links: join("https://chat.whatsapp.com/Hp8ip3OQ8je1LziSCLm580") },
    ],
  },
  {
    id: "data-cloud",
    title: "Data, Cloud & Security",
    navLabel: "Data & Cloud",
    description: "Data science, DevOps, security and testing.",
    icon: "cloud",
    layout: "tiles",
    communities: [
      { title: "Data Science", platform: "whatsapp", thumbnail: "/links/data-science-community.png", links: join("https://chat.whatsapp.com/I3xePjLXeRiGN1iWZCPs5f") },
      { title: "Cloud & DevOps", platform: "whatsapp", thumbnail: "/links/cloud-devops-community.png", links: join("https://chat.whatsapp.com/GGhgwRh9ShXAmADBLwI4V1") },
      { title: "Cyber Security", platform: "whatsapp", thumbnail: "/links/cyber-community.png", links: join("https://chat.whatsapp.com/Iq6njLPLf3I6na9pbEb36z") },
      { title: "QA & Testing", platform: "whatsapp", thumbnail: "/links/qa-community.png", links: join("https://chat.whatsapp.com/FBrmJfamazAIxuTp10aKOr") },
    ],
  },
  {
    id: "design-business",
    title: "Design, Marketing & Business",
    navLabel: "Design & Business",
    description: "Design, SEO and online business.",
    icon: "palette",
    layout: "tiles",
    communities: [
      { title: "Design", platform: "whatsapp", thumbnail: "/links/design-community.png", links: join("https://chat.whatsapp.com/DHkkXaywCwgKMKtToh45ia") },
      { title: "SEO", platform: "whatsapp", thumbnail: "/links/seo-community.png", links: join("https://chat.whatsapp.com/D30vnmC9q7qI5Rs50YUpQ4") },
      { title: "Ecommerce", platform: "whatsapp", thumbnail: "/links/ecommerce-community.png", links: join("https://chat.whatsapp.com/EywGkaNRJH3HixI2MdmIXi") },
      { title: "Amazon", platform: "whatsapp", thumbnail: "/links/amazon-community.png", links: join("https://chat.whatsapp.com/HqTKL9MfozXEW8RHYGlRCP") },
    ],
  },
  {
    id: "events",
    title: "Events & Community",
    navLabel: "Events",
    description: "Hackathons, live spaces and giving back.",
    icon: "events",
    layout: "cards",
    communities: [
      {
        title: "Events & Hackathons",
        description: "Event and hackathon announcements.",
        platform: "whatsapp",
        thumbnail: "/links/events-hackathons.jpg",
        links: join("https://chat.whatsapp.com/ILQGHC01BLZCTfySbaeZlP"),
      },
      {
        title: "Twitter Spaces",
        description: "Live Twitter (X) Spaces with the community.",
        platform: "whatsapp",
        thumbnail: "/links/twitter-spaces.png",
        links: groups("https://chat.whatsapp.com/D8XlD1N96DZFes0YX1iMYp", "https://chat.whatsapp.com/HBvELR2f6L74MjFbxpucaX"),
      },
      {
        title: "Blood Donors Community",
        description: "Request or offer blood donations.",
        platform: "whatsapp",
        thumbnail: "/links/blood-donors.jpg",
        links: join("https://chat.whatsapp.com/DrTEQ7c86xJ7eENUI73L4o"),
      },
      {
        title: "Facebook Group",
        description: "Discussions and announcements on Facebook.",
        platform: "facebook",
        links: join("https://facebook.com/groups/devweekends"),
      },
    ],
  },
]
