import { ArrowUpRight } from "lucide-react"

import { LINKS } from "@/components/home/data"
import { Button, Card, Eyebrow, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"
import { withSocial } from "@/lib/seo"

export const metadata = withSocial({
  title: "Community",
  description: "Join the Dev Weekends community: Discord, WhatsApp groups, live sessions and the people who have done it before.",
  alternates: { canonical: "/community" },
})

// The old page showed sample discussions, events and groups (invented names,
// dates and member counts) with buttons that did nothing. This version only
// points to places that exist and numbers that are published on /team.

const ways = [
  {
    title: "Discord",
    text: "Chat with mentors and peers. Our Discord has 2,800+ members.",
    href: LINKS.discord,
  },
  {
    title: "Community links",
    text: "60+ WhatsApp groups for placement, MERN, competitive programming and mock interviews, all in one place.",
    href: LINKS.communities,
  },
  {
    title: "Live sessions",
    text: "DSA deep dives, system design talks, mock interviews, and mindset workshops, every week.",
    href: LINKS.sessions,
  },
  {
    title: "Mentorship network",
    text: "See how mentors and mentees connect across the community.",
    href: "/network",
  },
  {
    title: "Projects",
    text: "See what members have built.",
    href: "/projects",
  },
  {
    title: "Stories",
    text: "Hear from members about what changed for them.",
    href: LINKS.stories,
  },
]

const groups = [
  { title: "Fellowship", href: LINKS.fellowship },
  { title: "Mentorship", href: "/mentorship" },
  { title: "DSoC, our summer of code", href: LINKS.dsoc },
  { title: "Open Source Prep", href: "/links#open-source" },
  { title: "MindMaster", href: "/mindmaster" },
  { title: "X Team, for builders and founders", href: LINKS.communities },
]

const lift = "motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)]"

export default function CommunityPage() {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Community"
        title="Grow together with 30,000+ engineers."
        intro="Connect with fellow developers, share experiences, and grow together. Dev Weekends is an international community, founded in 2018, and every part of it is free."
        actions={
          <>
            <Button href={LINKS.discord}>Join Discord</Button>
            <Button href="/team" variant="secondary">
              Read our story
            </Button>
          </>
        }
      />

      <Section>
        <SectionHeading eyebrow="Ways to take part" title="Where the community lives" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ways.map((w) => (
            <Card key={w.title} href={w.href} tone="bordered" className={lift}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{w.title}</h3>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[#5C5C5C]" aria-hidden="true" />
              </div>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#404040]">{w.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Panel>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Eyebrow onDark>Join us</Eyebrow>
            <h2 className="mt-3.5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Join our community today
            </h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.65] text-[#C7C7C7]">
              Connect with mentors and peers, attend sessions, and accelerate your tech career.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={LINKS.discord} variant="onDark">
              Join Discord
            </Button>
            <Button href="/team" variant="onDarkSecondary">
              Learn more
            </Button>
          </div>
        </div>
      </Panel>

      <Section tone="gray">
        <SectionHeading
          eyebrow="Specialized communities"
          title="Find your group"
          intro="Focused groups for different goals. Looking for something narrower? The circles are listed on the About page."
          action={
            <Button href="/links" variant="secondary">
              See the circles
            </Button>
          }
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <Card key={g.title} href={g.href} tone="white" className={`min-h-[88px] !flex-row items-center justify-between gap-3 p-6 ${lift}`}>
              <h3 className="text-base font-semibold">{g.title}</h3>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#5C5C5C]" aria-hidden="true" />
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
