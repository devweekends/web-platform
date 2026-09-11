import type { ComponentType, ReactNode } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { DM_Sans } from "next/font/google"
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  Cloud,
  Code,
  Facebook,
  GitBranch,
  Github,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  MessageCircle,
  Palette,
  PartyPopper,
  Trophy,
  Youtube,
} from "lucide-react"
import { LinksShareButton } from "@/components/links-share-button"
import {
  linkSections,
  linksProfile,
  quickLinks,
  socialLinks,
  type Community,
  type JoinPlatform,
  type LinkSection,
  type QuickLink,
  type SectionIcon,
  type SocialPlatform,
} from "@/lib/links-data"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Links",
  description:
    "Join the Dev Weekends communities: competitive programming, open source, placements, tech stacks, events and more.",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    title: "Dev Weekends | Links",
    description: "Find and join the right Dev Weekends community in one tap.",
    url: "https://devweekends.com/links",
    images: ["/og-image.jpg"],
  },
}

type IconComponent = ComponentType<{ className?: string }>

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

const socialIcons: Record<SocialPlatform, IconComponent> = {
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
  github: Github,
  discord: DiscordIcon,
}

const brandStyles: Record<SocialPlatform, string> = {
  instagram: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]",
  youtube: "bg-[#ff0000]",
  linkedin: "bg-[#0a66c2]",
  facebook: "bg-[#1877f2]",
  github: "bg-[#24292f]",
  discord: "bg-[#5865f2]",
}

const sectionIcons: Record<SectionIcon, IconComponent> = {
  trophy: Trophy,
  "open-source": GitBranch,
  briefcase: Briefcase,
  code: Code,
  cloud: Cloud,
  palette: Palette,
  events: PartyPopper,
}

const quickLinkIcons: Record<QuickLink["icon"], IconComponent> = {
  website: Globe,
  resources: BookOpen,
  calendar: CalendarDays,
}

// How each platform's join action looks: button label, icons and colors.
const joinStyles: Record<
  JoinPlatform,
  { label: string; buttonIcon: IconComponent; badgeIcon: IconComponent; button: string; chip: string; badge: string }
> = {
  whatsapp: {
    label: "Join on WhatsApp",
    buttonIcon: MessageCircle,
    badgeIcon: MessageCircle,
    button: "bg-[#25D366] text-[#04140a] hover:bg-[#3ee27a]",
    chip: "bg-[#25D366]/15 text-[#4ae38a] hover:bg-[#25D366] hover:text-[#04140a]",
    badge: "bg-[#25D366] text-[#04140a]",
  },
  linkedin: {
    label: "Join on LinkedIn",
    buttonIcon: Linkedin,
    badgeIcon: Linkedin,
    button: "bg-[#0a66c2] text-white hover:bg-[#1877d6]",
    chip: "bg-[#0a66c2]/20 text-[#6cb2f5] hover:bg-[#0a66c2] hover:text-white",
    badge: "bg-[#0a66c2] text-white",
  },
  facebook: {
    label: "Join on Facebook",
    buttonIcon: Facebook,
    badgeIcon: Facebook,
    button: "bg-[#1877f2] text-white hover:bg-[#3b8cf5]",
    chip: "bg-[#1877f2]/20 text-[#7fb2f8] hover:bg-[#1877f2] hover:text-white",
    badge: "bg-[#1877f2] text-white",
  },
  github: {
    label: "Open GitHub",
    buttonIcon: ArrowUpRight,
    badgeIcon: Github,
    button: "bg-white text-[#040404] hover:bg-white/85",
    chip: "bg-white/10 text-white hover:bg-white hover:text-[#040404]",
    badge: "bg-[#24292f] text-white",
  },
  website: {
    label: "Learn more",
    buttonIcon: ArrowUpRight,
    badgeIcon: Globe,
    button: "bg-white text-[#040404] hover:bg-white/85",
    chip: "bg-white/10 text-white hover:bg-white hover:text-[#040404]",
    badge: "bg-white text-[#040404]",
  },
}

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

function SmartLink({
  href,
  className,
  ariaLabel,
  children,
}: {
  href: string
  className: string
  ariaLabel?: string
  children: ReactNode
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
      {children}
    </a>
  )
}

function CommunityImage({ community, size }: { community: Community; size: "md" | "sm" }) {
  const box = size === "md" ? "h-12 w-12" : "h-10 w-10"

  if (community.thumbnail) {
    return (
      <Image
        src={community.thumbnail}
        alt=""
        width={48}
        height={48}
        className={`${box} shrink-0 rounded-xl object-cover`}
      />
    )
  }

  const { badgeIcon: Icon, badge } = joinStyles[community.platform]
  return (
    <span className={`${box} flex shrink-0 items-center justify-center rounded-xl ${badge}`} aria-hidden="true">
      <Icon className="h-5 w-5" />
    </span>
  )
}

function JoinActions({ community }: { community: Community }) {
  const style = joinStyles[community.platform]

  if (community.links.length === 1) {
    const Icon = style.buttonIcon
    return (
      <SmartLink
        href={community.links[0].url}
        ariaLabel={`${style.label}: ${community.title}`}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${focusRing} ${style.button}`}
      >
        <Icon className="h-4 w-4" />
        {style.label}
      </SmartLink>
    )
  }

  return (
    <div>
      <p className="mb-2 text-xs text-white/50">Pick any group. If one is full, try the next.</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {community.links.map((link) => (
          <SmartLink
            key={link.url}
            href={link.url}
            ariaLabel={`Join ${community.title}, ${link.label}`}
            className={`rounded-full px-2 py-2 text-center text-sm font-semibold transition-colors ${focusRing} ${style.chip}`}
          >
            {link.label}
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

function CommunityCard({ community }: { community: Community }) {
  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-white/25">
      <div className="flex items-start gap-3">
        <CommunityImage community={community} size="md" />
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug">{community.title}</h3>
          {community.description && (
            <p className="mt-1 text-sm leading-relaxed text-white/60">{community.description}</p>
          )}
        </div>
      </div>
      <div className="mt-auto">
        <JoinActions community={community} />
      </div>
    </li>
  )
}

function CommunityTile({ community }: { community: Community }) {
  const style = joinStyles[community.platform]
  const tileClass = "flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
  const title = <span className="min-w-0 flex-1 truncate text-sm font-semibold">{community.title}</span>

  if (community.links.length === 1) {
    return (
      <li>
        <SmartLink
          href={community.links[0].url}
          ariaLabel={`${style.label}: ${community.title}`}
          className={`${tileClass} transition-colors hover:border-white/25 hover:bg-white/[0.07] ${focusRing}`}
        >
          <CommunityImage community={community} size="sm" />
          {title}
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${style.button}`}>Join</span>
        </SmartLink>
      </li>
    )
  }

  return (
    <li className={tileClass}>
      <CommunityImage community={community} size="sm" />
      {title}
      <span className="flex shrink-0 gap-1.5">
        {community.links.map((link, index) => (
          <SmartLink
            key={link.url}
            href={link.url}
            ariaLabel={`Join ${community.title}, ${link.label}`}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${focusRing} ${style.button}`}
          >
            {index + 1}
          </SmartLink>
        ))}
      </span>
    </li>
  )
}

function SectionHeader({ id, title, description, icon: Icon }: { id: string; title: string; description: string; icon: IconComponent }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10" aria-hidden="true">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h2 id={`${id}-title`} className="text-lg font-bold leading-tight">
          {title}
        </h2>
        <p className="mt-0.5 text-sm text-white/60">{description}</p>
      </div>
    </div>
  )
}

function Section({ section }: { section: LinkSection }) {
  const isTiles = section.layout === "tiles"
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-20">
      <SectionHeader id={section.id} title={section.title} description={section.description} icon={sectionIcons[section.icon]} />
      <ul className={isTiles ? "grid gap-3 sm:grid-cols-2 md:grid-cols-3" : "grid gap-4 sm:grid-cols-2"}>
        {section.communities.map((community) =>
          isTiles ? (
            <CommunityTile key={community.title} community={community} />
          ) : (
            <CommunityCard key={community.title} community={community} />
          ),
        )}
      </ul>
    </section>
  )
}

export default function LinksPage() {
  return (
    <div className={`${dmSans.className} min-h-screen bg-[#040404] text-white`}>
      <header className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-8 pt-12 text-center">
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
        <h1 className="mt-4 text-2xl font-bold">{linksProfile.name}</h1>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/70">{linksProfile.bio}</p>

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
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:scale-110 ${focusRing}`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              </li>
            )
          })}
        </ul>
      </header>

      <nav aria-label="Link categories" className="sticky top-0 z-10 border-y border-white/10 bg-[#040404]/85 backdrop-blur">
        <ul className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[...linkSections.map(({ id, navLabel }) => ({ id, navLabel })), { id: "follow", navLabel: "Follow" }].map(
            ({ id, navLabel }) => (
              <li key={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  className={`block rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-medium text-white/80 transition-colors hover:border-white hover:text-white ${focusRing}`}
                >
                  {navLabel}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 pb-16 pt-8">
        <ul className="grid gap-3 sm:grid-cols-3" aria-label="Quick links">
          {quickLinks.map((link) => {
            const Icon = quickLinkIcons[link.icon]
            return (
              <li key={link.title}>
                <SmartLink
                  href={link.url}
                  className={`flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 transition-colors hover:border-white/25 hover:bg-white/[0.1] ${focusRing}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#040404]" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block font-semibold leading-tight">{link.title}</span>
                    <span className="block text-xs text-white/60">{link.subtitle}</span>
                  </span>
                </SmartLink>
              </li>
            )
          })}
        </ul>

        {linkSections.map((section) => (
          <Section key={section.id} section={section} />
        ))}

        <section id="follow" aria-labelledby="follow-title" className="scroll-mt-20">
          <SectionHeader
            id="follow"
            title="Follow Dev Weekends"
            description="Sessions, announcements and recordings."
            icon={Heart}
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {socialLinks.map(({ platform, label, handle, url }) => {
              const Icon = socialIcons[platform]
              return (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-white/25 hover:bg-white/[0.07] ${focusRing}`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white ${brandStyles[platform]}`}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{label}</span>
                      <span className="block truncate text-xs text-white/50">{handle}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        <Link href="/" className="self-center text-sm font-medium text-white/60 transition-colors hover:text-white">
          devweekends.com
        </Link>
      </div>
    </div>
  )
}
