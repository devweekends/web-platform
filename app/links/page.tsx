import type { ComponentType } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { DM_Sans } from "next/font/google"
import { BookOpen, Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react"
import { LinksShareButton } from "@/components/links-share-button"
import {
  linkEntries,
  linksProfile,
  socialLinks,
  type LinkEntry,
  type LinkIcon,
  type SocialPlatform,
} from "@/lib/links-data"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Links",
  description:
    "Every Dev Weekends link in one place: community WhatsApp groups, placement and tech communities, events, calendar, and socials.",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    title: "Dev Weekends | Links",
    description: "Join the Dev Weekends communities and follow us everywhere.",
    url: "https://devweekends.com/links",
    images: ["/og-image.jpg"],
  },
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

const socialIcons: Record<SocialPlatform, ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
  github: Github,
  discord: DiscordIcon,
}

const linkIcons: Record<LinkIcon, ComponentType<{ className?: string }>> = {
  ...socialIcons,
  resources: BookOpen,
}

// Brand colors for the badges shown in place of a thumbnail.
const linkIconStyles: Record<LinkIcon, string> = {
  instagram: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white",
  youtube: "bg-[#ff0000] text-white",
  linkedin: "bg-[#0a66c2] text-white",
  facebook: "bg-[#1877f2] text-white",
  github: "bg-[#24292f] text-white",
  discord: "bg-[#5865f2] text-white",
  resources: "bg-white text-[#040404]",
}

// Linktree "soft shadow, circular" button style on the dark Dev Weekends theme.
const buttonClass =
  "relative flex min-h-[60px] w-full items-center justify-center rounded-full bg-[#444] px-16 py-3 text-center text-[15px] font-medium leading-snug text-white shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-transform duration-150 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

function LinkButton({ entry }: { entry: Extract<LinkEntry, { kind: "link" }> }) {
  const BadgeIcon = entry.icon ? linkIcons[entry.icon] : null
  const content = (
    <>
      {entry.icon && BadgeIcon ? (
        <span
          className={`absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full ${linkIconStyles[entry.icon]}`}
          aria-hidden="true"
        >
          <BadgeIcon className="h-6 w-6" />
        </span>
      ) : (
        entry.thumbnail && (
          <Image
            src={entry.thumbnail}
            alt=""
            width={44}
            height={44}
            className="absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full object-cover"
          />
        )
      )}
      <span>{entry.title}</span>
    </>
  )

  if (entry.url.startsWith("/")) {
    return (
      <Link href={entry.url} className={buttonClass}>
        {content}
      </Link>
    )
  }

  return (
    <a href={entry.url} target="_blank" rel="noopener noreferrer" className={buttonClass}>
      {content}
    </a>
  )
}

export default function LinksPage() {
  return (
    <div className={`${dmSans.className} min-h-screen bg-[#040404] text-white`}>
      <div className="relative mx-auto flex w-full max-w-[680px] flex-col items-center px-4 pb-16 pt-12">
        <div className="absolute right-4 top-4">
          <LinksShareButton />
        </div>

        <Image
          src={linksProfile.avatar}
          alt={`${linksProfile.name} logo`}
          width={96}
          height={96}
          priority
          className="h-24 w-24 rounded-full object-cover"
        />
        <h1 className="mt-4 text-xl font-bold">{linksProfile.name}</h1>
        <p className="mt-2 max-w-md text-center text-[15px] leading-relaxed text-white/80">{linksProfile.bio}</p>

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-3" aria-label="Social profiles">
          {socialLinks.map(({ platform, label, url }) => {
            const Icon = socialIcons[platform]
            return (
              <li key={platform}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <Icon className="h-6 w-6" />
                </a>
              </li>
            )
          })}
        </ul>

        <ul className="mt-8 flex w-full flex-col gap-4">
          {linkEntries.map((entry, index) =>
            entry.kind === "header" ? (
              <li key={`header-${index}`} className="pt-4 text-center">
                <h2 className="text-base font-semibold">{entry.title}</h2>
              </li>
            ) : (
              <li key={`${entry.url}-${index}`}>
                <LinkButton entry={entry} />
              </li>
            ),
          )}
        </ul>

        <Link href="/" className="mt-12 text-sm font-medium text-white/60 transition-colors hover:text-white">
          devweekends.com
        </Link>
      </div>
    </div>
  )
}
