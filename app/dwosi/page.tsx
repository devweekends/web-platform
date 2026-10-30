import type { Metadata } from "next"
import { ArrowUpRight, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { ContributionField } from "./components/contribution-field"
import { Cta } from "./components/cta"
import { Eyebrow } from "./components/section-heading"
import {
  DWOSI_LINKS,
  PRIMARY_CTA,
  communityStats,
  hiringSteps,
  partnerOffers,
  record,
  repositories,
} from "./data"

const title = "DWOSI · Dev Weekends Open Source Initiative"
const description =
  "Where early-career engineers prove their work in public. A free open source initiative where contributors build live products, with every pull request reviewed by product maintainers."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/dwosi" },
  openGraph: {
    type: "website",
    siteName: "Dev Weekends",
    title,
    description,
    url: "https://www.devweekends.com/dwosi",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dev Weekends" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
}

const container = "mx-auto max-w-6xl px-4 sm:px-6"
const section = "scroll-mt-16 border-t py-16 sm:py-24"
const partnerHref = "/dwosi#partners"
const partnerMail = `mailto:${DWOSI_LINKS.email}?subject=DWOSI%20partnership`

function Hero() {
  return (
    <section>
      <div className={`${container} pb-16 pt-20 sm:pb-24 sm:pt-28`}>
        <div className="dw-stagger">
          <Eyebrow>Dev Weekends Open Source Initiative</Eyebrow>
          <h1 className="dw-display mt-6">Where early&#8209;career engineers prove their work in public.</h1>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="dw-lead max-w-[60ch] text-muted-foreground">
              A free open source initiative where contributors build live products, from Volcano-scheduled
              Kubernetes clusters to AI career tools, with every pull request reviewed by product maintainers.
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Cta href={PRIMARY_CTA.href} className="w-full sm:w-auto">
                {PRIMARY_CTA.label}
              </Cta>
              <Cta href={partnerHref} variant="secondary" className="w-full sm:w-auto">
                Partner with us
              </Cta>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-xl border bg-card p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="dw-label truncate text-muted-foreground">contributions to devweekends/* over one summer</p>
            <span className="dw-label shrink-0 rounded-md border px-2 text-muted-foreground">Example</span>
          </div>
          <div className="relative mt-4 h-[148px] sm:h-[204px]">
            <ContributionField mode="panel" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Record() {
  return (
    <section id="record" className={section}>
      <div className={`${container} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <Eyebrow>The record</Eyebrow>
          <h2 className="dw-title mt-4">A resume says. A pull request shows.</h2>
          <p className="dw-lead mt-6 max-w-[48ch] text-muted-foreground">
            Every contribution leaves a public trail: the code, the review conversation, the revisions and the
            release it shipped in.
          </p>
        </div>
        <div>
          <ul className="divide-y overflow-hidden rounded-xl border bg-card">
            {record.map((entry) => (
              <li key={entry.url}>
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 px-4 py-4 can-hover:bg-accent sm:px-6"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{entry.title}</span>
                    <span className="dw-label mt-1 block text-muted-foreground">
                      {entry.repo} · {entry.detail}
                    </span>
                    <span className="sr-only">(opens the pull request on GitHub in a new tab)</span>
                  </span>
                  <span
                    className={cn(
                      "dw-label shrink-0 rounded-md px-2",
                      entry.status === "merged" ? "bg-cta text-cta-foreground" : "border text-foreground"
                    )}
                  >
                    {entry.status}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="dw-label mt-4 text-muted-foreground">Real pull requests from DWOSI repositories.</p>
        </div>
      </div>
    </section>
  )
}

function Community() {
  return (
    <section className="border-t">
      <div className={`${container} py-16 sm:py-24`}>
        <p className="border-b pb-6 text-sm text-muted-foreground">From a 30K+ member community</p>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {communityStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-3">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="dw-stat">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Repositories() {
  const cellClass = "group flex flex-col gap-2 bg-card p-5 sm:p-6"

  return (
    <section id="projects" className={section}>
      <div className={container}>
        <h2 className="dw-title">Pick a repository</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {repositories.map((repository) => {
            const content = (
              <>
                <span className="flex items-start justify-between gap-3">
                  <span className="dw-label text-brand">
                    {repository.slug}
                    {repository.dsoc && " · DSOC 2026"}
                  </span>
                  {repository.href && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  )}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{repository.description}</span>
              </>
            )

            return repository.href ? (
              <a
                key={repository.slug}
                href={repository.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(cellClass, "can-hover:bg-accent")}
              >
                {content}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <div key={repository.slug} className={cellClass}>
                {content}
              </div>
            )
          })}
          <a
            href={`mailto:${DWOSI_LINKS.email}?subject=DWOSI%20project%20proposal`}
            // Spans two columns so six repositories plus this tile fill the grid evenly
            className={cn(cellClass, "can-hover:bg-accent sm:col-span-2")}
          >
            <span className="flex items-start justify-between gap-3">
              <span className="dw-label text-brand">your-project</span>
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">
              Building something the community should own? Propose it for DWOSI.
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Partners() {
  return (
    <section id="partners" className="dw-light scroll-mt-16 border-t bg-background py-16 sm:py-24">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className="dw-title">Partner on code, mentorship and hiring.</h2>
          <p className="dw-lead max-w-[48ch] text-muted-foreground">
            Join current partner Cyberiad Labs in backing public engineering education that produces verifiable,
            production-ready contributors.
          </p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partnerOffers.map((offer, index) => (
            <li
              key={offer.title}
              className={cn(
                "flex min-h-48 flex-col rounded-xl border p-6",
                index === 0 ? "dw-dark bg-card" : "bg-card"
              )}
            >
              <span aria-hidden="true" className="dw-label text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="dw-heading mt-4">{offer.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Cta href={partnerMail} variant="secondary">
            Partner at {DWOSI_LINKS.email}
          </Cta>
        </div>
      </div>
    </section>
  )
}

function Hiring() {
  return (
    <section id="hiring" className={section}>
      <div className={`${container} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <Eyebrow>For hiring teams</Eyebrow>
          <h2 className="dw-title mt-4">
            {/* Non-breaking hyphen keeps "take-home" on one line */}
            <span className="block">Skip the take&#8209;home.</span>
            <span className="block">Read the history.</span>
          </h2>
        </div>
        <ol className="divide-y border-y">
          {hiringSteps.map((step, index) => (
            <li key={step.title} className="flex gap-4 py-5">
              <span aria-hidden="true" className="dw-label pt-0.5 text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="dw-heading block">{step.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{step.description}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="dw-title">Your next commit could be on a live product.</h2>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Cta href={PRIMARY_CTA.href} className="w-full sm:w-auto">
            {PRIMARY_CTA.label}
          </Cta>
          <Cta href={partnerMail} variant="secondary" className="w-full sm:w-auto">
            Partner at {DWOSI_LINKS.email}
          </Cta>
        </div>
      </div>
    </section>
  )
}

export default function DwosiPage() {
  return (
    <>
      <Hero />
      <Record />
      <Community />
      <Repositories />
      <Partners />
      <Hiring />
      <FinalCta />
    </>
  )
}
