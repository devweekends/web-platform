import type { ComponentType } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight, BookOpen, CalendarDays, Facebook, Github, Globe, Instagram, Linkedin, MessageCircle, Youtube } from "lucide-react"

import { SmartLink } from "@/components/home/smart-link"
import { Card, Eyebrow, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"
import {
  linkSections,
  linksProfile,
  quickLinks,
  socialLinks,
  type Community,
  type JoinPlatform,
  type QuickLink,
  type SocialPlatform,
} from "@/lib/links-data"
import { ShareButton } from "./share-button"

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

const quickLinkIcons: Record<QuickLink["icon"], IconComponent> = {
  website: Globe,
  resources: BookOpen,
  calendar: CalendarDays,
}

// Icon for communities without a thumbnail, and the join button label, per platform.
const joinIcons: Record<JoinPlatform, IconComponent> = {
  whatsapp: MessageCircle,
  linkedin: Linkedin,
  facebook: Facebook,
  github: Github,
  website: Globe,
}

const joinLabels: Record<JoinPlatform, string> = {
  whatsapp: "Join on WhatsApp",
  linkedin: "Join on LinkedIn",
  facebook: "Join on Facebook",
  github: "Open GitHub",
  website: "Learn more",
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"

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

  const Icon = joinIcons[community.platform]
  return (
    <span className={`${box} flex shrink-0 items-center justify-center rounded-xl bg-[#0A0A0A] text-white`} aria-hidden="true">
      <Icon className="h-5 w-5" />
    </span>
  )
}

function JoinActions({ community }: { community: Community }) {
  const label = joinLabels[community.platform]

  if (community.links.length === 1) {
    return (
      <SmartLink
        href={community.links[0].url}
        aria-label={`${label}: ${community.title}`}
        className={`inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#0A0A0A] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#262626] ${focusRing}`}
      >
        {label}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </SmartLink>
    )
  }

  return (
    <div>
      <p className="mb-3 text-[14px] leading-[1.5] text-[#5C5C5C]">Pick any group. If one is full, try the next.</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {community.links.map((link) => (
          <SmartLink
            key={link.url}
            href={link.url}
            aria-label={`Join ${community.title}, ${link.label}`}
            className={`inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0A0A0A] px-2 text-[15px] font-semibold text-white transition-colors hover:bg-[#262626] ${focusRing}`}
          >
            {link.label}
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

function CommunityCard({ community, tone }: { community: Community; tone: "white" | "gray" }) {
  return (
    <li>
      <Card tone={tone} className="h-full gap-5 p-6">
        <div className="flex items-start gap-4">
          <CommunityImage community={community} size="md" />
          <div className="min-w-0">
            <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.02em]">{community.title}</h3>
            {community.description && (
              <p className="mt-1.5 text-[15px] leading-[1.6] text-[#404040]">{community.description}</p>
            )}
          </div>
        </div>
        <div className="mt-auto">
          <JoinActions community={community} />
        </div>
      </Card>
    </li>
  )
}

function CommunityTile({ community, tone }: { community: Community; tone: "white" | "gray" }) {
  const label = joinLabels[community.platform]
  const bg = tone === "white" ? "bg-white" : "bg-[#F7F7F7]"
  const tileClass = `flex h-full min-h-[64px] items-center gap-3 rounded-2xl p-3 ${bg}`
  const title = <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug">{community.title}</span>

  if (community.links.length === 1) {
    return (
      <li>
        <SmartLink
          href={community.links[0].url}
          aria-label={`${label}: ${community.title}`}
          className={`${tileClass} transition duration-200 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1 ${focusRing}`}
        >
          <CommunityImage community={community} size="sm" />
          {title}
          <span className="inline-flex min-h-[44px] shrink-0 items-center rounded-xl bg-[#0A0A0A] px-4 text-[14px] font-semibold text-white">
            Join
          </span>
        </SmartLink>
      </li>
    )
  }

  return (
    <li className={tileClass}>
      <CommunityImage community={community} size="sm" />
      {title}
      <span className="flex shrink-0 gap-2">
        {community.links.map((link, index) => (
          <SmartLink
            key={link.url}
            href={link.url}
            aria-label={`Join ${community.title}, ${link.label}`}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A0A0A] text-[14px] font-semibold text-white transition-colors hover:bg-[#262626] ${focusRing}`}
          >
            {index + 1}
          </SmartLink>
        ))}
      </span>
    </li>
  )
}

export default function LinksPage() {
  const categories = [...linkSections.map(({ id, navLabel }) => ({ id, navLabel })), { id: "follow", navLabel: "Follow" }]

  return (
    <>
      <PageHero
        eyebrow="Links"
        title="Join a community."
        intro={
          <div className="flex items-start gap-4">
            <Image
              src={linksProfile.avatar}
              alt={`${linksProfile.name} logo`}
              width={56}
              height={56}
              priority
              className="h-14 w-14 shrink-0 rounded-full object-cover"
            />
            <p>{linksProfile.bio}</p>
          </div>
        }
        actions={<ShareButton />}
      />

      <Section className="!py-10 md:!py-12">
        <ul className="grid gap-3 sm:grid-cols-3" aria-label="Quick links">
          {quickLinks.map((link) => {
            const Icon = quickLinkIcons[link.icon]
            return (
              <li key={link.title}>
                <Card href={link.url} tone="bordered" className="h-full flex-row items-center gap-4 p-5">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0A0A0A] text-white"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[17px] font-semibold leading-tight tracking-[-0.01em]">{link.title}</span>
                    <span className="mt-0.5 block text-[14px] leading-[1.5] text-[#5C5C5C]">{link.subtitle}</span>
                  </span>
                </Card>
              </li>
            )
          })}
        </ul>

        <nav aria-label="Link categories" className="mt-8">
          <Eyebrow>Jump to</Eyebrow>
          <ul className="mt-4 flex flex-wrap gap-3">
            {categories.map(({ id, navLabel }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`inline-flex min-h-11 items-center rounded-full border border-[#D4D4D4] px-5 text-[15px] font-semibold transition-colors hover:bg-[#F7F7F7] ${focusRing}`}
                >
                  {navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {linkSections.map((section, index) => {
        const sectionTone = index % 2 === 0 ? "gray" : "white"
        const cardTone = sectionTone === "gray" ? "white" : "gray"
        return (
          <Section key={section.id} id={section.id} tone={sectionTone}>
            <SectionHeading title={section.title} intro={section.description} />
            <ul
              className={
                section.layout === "tiles" ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-4 md:grid-cols-2"
              }
            >
              {section.communities.map((community) =>
                section.layout === "tiles" ? (
                  <CommunityTile key={community.title} community={community} tone={cardTone} />
                ) : (
                  <CommunityCard key={community.title} community={community} tone={cardTone} />
                ),
              )}
            </ul>
          </Section>
        )
      })}

      <div id="follow" className="scroll-mt-24">
        <Panel>
          <Eyebrow onDark>Follow</Eyebrow>
          <h2 className="mt-3.5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Follow Dev Weekends
          </h2>
          <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.6] text-[#A3A3A3]">
            Sessions, announcements and recordings.
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {socialLinks.map(({ platform, label, handle, url }) => {
              const Icon = socialIcons[platform]
              return (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[64px] items-center gap-4 rounded-2xl border border-[#3D3D3D] p-4 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0A0A0A]"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[16px] font-semibold">{label}</span>
                      <span className="block truncate text-[14px] text-[#A3A3A3]">{handle}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </Panel>
      </div>
    </>
  )
}
