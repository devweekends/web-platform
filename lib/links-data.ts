// Mirrors https://linktr.ee/DevWeekends so every community link lives on
// devweekends.com. Thumbnails are self-hosted under /public/links.

export type SocialPlatform = "instagram" | "youtube" | "linkedin" | "facebook" | "github" | "discord"

// Links to a platform rather than a community get a brand badge instead of a thumbnail.
export type LinkIcon = SocialPlatform | "resources"

export type LinkEntry =
  | { kind: "link"; title: string; url: string; thumbnail?: string; icon?: LinkIcon }
  | { kind: "header"; title: string }

export const linksProfile = {
  name: "Dev Weekends",
  bio: "Promoting Tech to develop Good Engineers with Free Series by Top Engineers.",
  avatar: "/links/profile.png",
}

export const socialLinks: { platform: SocialPlatform; label: string; url: string }[] = [
  { platform: "instagram", label: "Instagram", url: "https://instagram.com/devweekends" },
  { platform: "youtube", label: "YouTube", url: "https://www.youtube.com/@devweekends" },
  { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/dev-weekends/" },
  { platform: "facebook", label: "Facebook", url: "https://facebook.com/groups/devweekends" },
  { platform: "github", label: "GitHub", url: "https://github.com/devweekends" },
  { platform: "discord", label: "Discord", url: "https://discord.gg/Cy7Rgkf4Up" },
]

export const linkEntries: LinkEntry[] = [
  { kind: "link", title: "Dev Weekends", url: "/", thumbnail: "/links/dev-weekends.jpg" },
  { kind: "link", title: "Resources: Docs & Courses", url: "https://resources.devweekends.com", icon: "resources" },
  { kind: "header", title: "Join our Communities" },
  { kind: "link", title: "Dev Weekends Calendar", url: "https://calendar.google.com/calendar/u/0?cid=YjA1ZmMyMGM2YjE5ZjNlMDBjNTgwMjA5MzZhNzAxODcwMTY2NzNiZTBiZjk3MWE4ZjM3OTgwMmE1M2YwY2U0M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t", thumbnail: "/links/calendar.png" },
  { kind: "link", title: "Mock Interviews", url: "https://chat.whatsapp.com/J3iIn9tuoVtCD2sAPQyr9w" },
  { kind: "link", title: "Competitive Programming", url: "https://chat.whatsapp.com/EmYaLjCAEaHIDZBcbIJHh3?mode=wwt", thumbnail: "/links/competitive-programming.jpg" },
  { kind: "link", title: "LinkedIn Placement Group", url: "https://www.linkedin.com/groups/9077758", thumbnail: "/links/linkedin-placement-group.png" },
  { kind: "link", title: "GSoC Preparation", url: "https://chat.whatsapp.com/HGRGHwCOQ2z4A1aJXkicUx?mode=gi_t", thumbnail: "/links/gsoc-preparation.jpg" },
  { kind: "link", title: "Instagram", url: "https://www.instagram.com/devweekends/", icon: "instagram" },
  { kind: "link", title: "YouTube", url: "https://www.youtube.com/@devweekends", icon: "youtube" },
  { kind: "link", title: "LinkedIn", url: "https://www.linkedin.com/company/dev-weekends/", icon: "linkedin" },
  { kind: "link", title: "Facebook", url: "https://www.facebook.com/DevWeekends/", icon: "facebook" },
  { kind: "link", title: "Dev Weekends - Events and Hackathons", url: "https://chat.whatsapp.com/ILQGHC01BLZCTfySbaeZlP", thumbnail: "/links/events-hackathons.jpg" },
  { kind: "link", title: "Blood Donors Community", url: "https://chat.whatsapp.com/DrTEQ7c86xJ7eENUI73L4o", thumbnail: "/links/blood-donors.jpg" },
  { kind: "link", title: "Placement Community - 1", url: "https://chat.whatsapp.com/GK9uQTsyk8kJsn5l6vuorF", thumbnail: "/links/placement-community.png" },
  { kind: "link", title: "Placement Community - 2", url: "https://chat.whatsapp.com/JzShLso3HIlK19VcOwtCS0", thumbnail: "/links/placement-community.png" },
  { kind: "link", title: "Placement Community - 3", url: "https://chat.whatsapp.com/K04jJJqSKlS0XeUUNTrqfp", thumbnail: "/links/placement-community.png" },
  { kind: "link", title: "Placement Community - 4", url: "https://chat.whatsapp.com/BqbOxXPw52zEpE48QhEGeV", thumbnail: "/links/placement-community.png" },
  { kind: "link", title: "Placement Community - 5", url: "https://chat.whatsapp.com/FqisLzmJCBQ9DbI6ekzA0Y", thumbnail: "/links/placement-community.png" },
  { kind: "link", title: "Placement Community - 6", url: "https://chat.whatsapp.com/JVYqkiCyPoI2v4rmjgQQUM", thumbnail: "/links/placement-community.png" },
  { kind: "link", title: "Placement Community - 7", url: "https://chat.whatsapp.com/IJywQaVUMmpLbFokMRK1s5", thumbnail: "/links/placement-community.png" },
  { kind: "link", title: "Placement Community - 8", url: "https://chat.whatsapp.com/KqVXrOYWMSlDyh87h6Ue0y", thumbnail: "/links/placement-community.png" },
  { kind: "link", title: "Placement Community - 9", url: "https://chat.whatsapp.com/EgQ4jnfmTiN27B7wOZ8cvR", thumbnail: "/links/placement-community.png" },
  { kind: "link", title: "MERN Community - 1", url: "https://chat.whatsapp.com/CIGWuVjb2OD5X7goJIsSnH", thumbnail: "/links/mern-community.png" },
  { kind: "link", title: "MERN Community - 2", url: "https://chat.whatsapp.com/HCiNe4huUql4UemESOhlBL", thumbnail: "/links/mern-community.png" },
  { kind: "link", title: "Freelance Community - 1", url: "https://chat.whatsapp.com/H12loUTd5LU8pGznlosCy4", thumbnail: "/links/freelance-community.png" },
  { kind: "link", title: "Freelance Community - 2", url: "https://chat.whatsapp.com/HuRXXNp4CeRLp0ClSnVCmn", thumbnail: "/links/freelance-community.png" },
  { kind: "link", title: "Freelance Community - 3", url: "https://chat.whatsapp.com/FtTRBLlsHaVAY6FVV6KuH4", thumbnail: "/links/freelance-community.png" },
  { kind: "link", title: "Freelance Community - 4", url: "https://chat.whatsapp.com/E7FX9VzGxX7A398Jk8DroW", thumbnail: "/links/freelance-community.png" },
  { kind: "link", title: "DSA Community", url: "https://chat.whatsapp.com/Lt9p6n6AkSZItWDnwkSMQY", thumbnail: "/links/dsa-community.png" },
  { kind: "link", title: "Programming Community", url: "https://chat.whatsapp.com/KmszUQCmjDR5FnnJ09ZeoD", thumbnail: "/links/programming-community.png" },
  { kind: "link", title: "Remote Jobs Community", url: "https://chat.whatsapp.com/H7QZIJcZHqV52zWQa1yObm", thumbnail: "/links/remote-jobs-community.png" },
  { kind: "link", title: "Remote Jobs Community 2", url: "https://chat.whatsapp.com/H4SghteyvGiGA78wyX7CO0", thumbnail: "/links/remote-jobs-community-2.png" },
  { kind: "link", title: "Laravel Community", url: "https://chat.whatsapp.com/HuJKiJw1AtF3zI2P0nm9js", thumbnail: "/links/laravel-community.png" },
  { kind: "link", title: "Flutter Community", url: "https://chat.whatsapp.com/JljM00GRnhVKocT9Ki6oT5", thumbnail: "/links/flutter-community.png" },
  { kind: "link", title: "Amazon Community", url: "https://chat.whatsapp.com/HqTKL9MfozXEW8RHYGlRCP", thumbnail: "/links/amazon-community.png" },
  { kind: "link", title: "Ecommerce Community", url: "https://chat.whatsapp.com/EywGkaNRJH3HixI2MdmIXi", thumbnail: "/links/ecommerce-community.png" },
  { kind: "link", title: "QA Community", url: "https://chat.whatsapp.com/FBrmJfamazAIxuTp10aKOr", thumbnail: "/links/qa-community.png" },
  { kind: "link", title: "Game Dev Community", url: "https://chat.whatsapp.com/Hp8ip3OQ8je1LziSCLm580", thumbnail: "/links/game-dev-community.png" },
  { kind: "link", title: "SEO Community", url: "https://chat.whatsapp.com/D30vnmC9q7qI5Rs50YUpQ4", thumbnail: "/links/seo-community.png" },
  { kind: "link", title: "Django Community", url: "https://chat.whatsapp.com/H33ru8veuXNKSHo6TTtbYz", thumbnail: "/links/django-community.png" },
  { kind: "link", title: "React Native Community", url: "https://chat.whatsapp.com/FfllJRm8TSd6tZ6T3umgGC", thumbnail: "/links/react-native-community.png" },
  { kind: "link", title: "Data Science Community", url: "https://chat.whatsapp.com/I3xePjLXeRiGN1iWZCPs5f", thumbnail: "/links/data-science-community.png" },
  { kind: "link", title: "Design Community", url: "https://chat.whatsapp.com/DHkkXaywCwgKMKtToh45ia", thumbnail: "/links/design-community.png" },
  { kind: "link", title: "Cloud & DevOps Community", url: "https://chat.whatsapp.com/GGhgwRh9ShXAmADBLwI4V1", thumbnail: "/links/cloud-devops-community.png" },
  { kind: "link", title: ".NET Community", url: "https://chat.whatsapp.com/Fw4dF5UD3zN4LOZHhTivp8", thumbnail: "/links/dotnet-community.png" },
  { kind: "link", title: "Cyber Community", url: "https://chat.whatsapp.com/Iq6njLPLf3I6na9pbEb36z", thumbnail: "/links/cyber-community.png" },
  { kind: "link", title: "LinkedIn Community", url: "https://chat.whatsapp.com/EdofOOqytl0HV3Y60P6PKR", thumbnail: "/links/linkedin-community.png" },
  { kind: "link", title: "Vue.js Community", url: "https://chat.whatsapp.com/CoUUBSXJMSkGkYnGX6cxcQ", thumbnail: "/links/vue-community.png" },
  { kind: "link", title: "Java Spring Community", url: "https://chat.whatsapp.com/B8MdXofVLDc4iUCFKxZe94", thumbnail: "/links/java-spring-community.png" },
  { kind: "link", title: "Twitter Spaces - 1", url: "https://chat.whatsapp.com/D8XlD1N96DZFes0YX1iMYp", thumbnail: "/links/twitter-spaces.png" },
  { kind: "link", title: "Twitter Spaces - 2", url: "https://chat.whatsapp.com/HBvELR2f6L74MjFbxpucaX", thumbnail: "/links/twitter-spaces.png" },
  { kind: "link", title: "WordPress Community", url: "https://chat.whatsapp.com/JbUn60CjVxU510PGX5KPDk", thumbnail: "/links/wordpress-community.png" },
]
