import type { Metadata } from "next"

import { communityPartners, mailto, partners } from "@/components/home/data"
import { LogoMark } from "@/components/home/logo-mark"
import { SmartLink } from "@/components/home/smart-link"
import { Button, Card, Eyebrow, PageHero, Panel, Section } from "@/components/site/page-kit"

export const metadata: Metadata = {
  alternates: { canonical: "/partners" },
  title: "Partners",
  description: "The organisations and communities helping Dev Weekends create access to meaningful learning opportunities.",
}

const cyberiadRegistrationUrl =
  "https://cyberiadlabs.com/partner/ums1e7vdj3w8lm080hzlcr7xujrc0lyh5mvdot"

const partnerMail = mailto("Partnership with Dev Weekends")

const ways = [
  {
    title: "Universities",
    text: "Create focused pathways for students and early-career engineers to grow together.",
  },
  {
    title: "Companies",
    text: "Support practical programs, mentorship, projects, or career opportunities with long-term value.",
  },
  {
    title: "Communities and organizations",
    text: "Offer high-quality courses, resources, or certifications to learners who are ready to do the work.",
  },
]

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="More access. More opportunity."
        intro="We work with organizations, communities and universities that help our members learn deeply and reach opportunities beyond the classroom."
        actions={<Button href={partnerMail}>Partner with Dev Weekends</Button>}
      />

      <Section>
        <Eyebrow>Our partners</Eyebrow>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {partners.map((org) => (
            <li key={org.name}>
              <SmartLink
                href={org.href}
                className={`group flex min-h-[112px] items-center justify-center rounded-[20px] border border-[#E6E6E6] bg-white px-6 py-6 transition duration-200 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1 ${focusRing}`}
                aria-label={org.name}
              >
                <LogoMark org={org} size="lg" />
              </SmartLink>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Eyebrow>Community partners</Eyebrow>
          <ul className="mt-4 flex flex-wrap gap-3">
            {communityPartners.map((org) => (
              <li key={org.name}>
                <SmartLink
                  href={org.href}
                  className={`inline-flex min-h-11 items-center rounded-full border border-[#D4D4D4] px-5 text-[15px] font-semibold transition-colors hover:bg-[#F7F7F7] ${focusRing}`}
                >
                  {org.name}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-[20px] bg-[#F7F7F7] p-6 md:flex-row md:items-center md:justify-between md:p-7">
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.01em]">Free AI course with Cyberiad Labs</p>
            <p className="mt-1.5 max-w-[56ch] text-[15px] leading-[1.6] text-[#404040]">
              4 weeks, 16 live sessions, 50 places. Starts 2 November 2026.
            </p>
          </div>
          <Button href={cyberiadRegistrationUrl} variant="secondary">
            Register through Dev Weekends
          </Button>
        </div>
      </Section>

      <Section tone="gray">
        <Eyebrow>Ways to partner</Eyebrow>
        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ways.map((way) => (
            <li key={way.title}>
              <Card tone="white" className="h-full">
                <h2 className="text-[20px] font-semibold tracking-[-0.02em]">{way.title}</h2>
                <p className="mt-3 text-[15px] leading-[1.65] text-[#404040]">{way.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Panel>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Eyebrow onDark>Start a partnership</Eyebrow>
            <h2 className="mt-3.5 max-w-[22ch] text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Let&apos;s create access to work that changes careers.
            </h2>
          </div>
          <Button href={partnerMail} variant="onDark">
            Get in touch
          </Button>
        </div>
      </Panel>
    </>
  )
}
