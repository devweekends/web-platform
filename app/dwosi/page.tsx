import type { Metadata } from "next"
import { Check, Minus } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ContributionField } from "./components/contribution-field"
import { Cta, TextLink } from "./components/cta"
import { DsocStories } from "./components/dsoc-stories"
import { DwosiMark } from "./components/dwosi-logo"
import { FlagshipCard, ProjectCard } from "./components/project-cards"
import { Eyebrow, SectionHeading } from "./components/section-heading"
import {
  DWOSI_LINKS,
  PRIMARY_CTA,
  comparison,
  dsocFacts,
  faqs,
  flagshipProjects,
  moreProjects,
  proofStats,
  steps,
} from "./data"

// DSOC stories come from the impact-stories database
export const revalidate = 3600

const title = "DWOSI · Dev Weekends Open Source Initiative"
const description =
  "Contribute to products like Buildment, Pathment and Community Cloud, and get your pull requests reviewed by the engineers who maintain them."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/dwosi" },
  openGraph: {
    type: "website",
    siteName: "Dev Weekends",
    title,
    description,
    url: "https://devweekends.com/dwosi",
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
const section = "scroll-mt-16 py-12 sm:py-16"

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <ContributionField />
      <div className="dw-stagger relative mx-auto max-w-4xl px-4 pb-16 pt-24 text-center sm:px-6 sm:pb-24 sm:pt-32">
        <p className="dw-shadow-sm mx-auto inline-flex max-w-full items-center gap-2 rounded-full border bg-background py-1 pl-1 pr-3 text-sm">
          <DwosiMark className="h-6 w-6 shrink-0" />
          <span className="truncate">
            <span className="font-semibold">DWOSI</span>
            <span className="text-muted-foreground"> · Dev Weekends Open Source Initiative</span>
          </span>
        </p>
        <h1 className="dw-display mt-6">Ship real products, not practice projects.</h1>
        <p className="dw-lead mx-auto mt-6 max-w-[60ch] text-muted-foreground">
          Students and early-career engineers contribute to products like Buildment, Pathment and Community Cloud,
          and get their pull requests reviewed by the engineers who maintain them.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Cta href={PRIMARY_CTA.href} arrow className="w-full sm:w-auto">
            {PRIMARY_CTA.label}
          </Cta>
          <Cta href="/dwosi#projects" variant="secondary" className="w-full sm:w-auto">
            See the projects
          </Cta>
        </div>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section id="why" className={section}>
      <div className={container}>
        <SectionHeading
          eyebrow="Why DWOSI"
          title="Practice projects only take you so far"
          description="Tutorials teach syntax. Real products teach you how software gets built, reviewed and shipped."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-muted p-6 sm:p-8">
            <p className="dw-label text-muted-foreground">{comparison.before.label}</p>
            <ul className="mt-6 space-y-4">
              {comparison.before.points.map((point) => (
                <li key={point} className="dw-body flex gap-3 text-muted-foreground">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="dw-shadow-md rounded-2xl border bg-card p-6 sm:p-8">
            <p className="dw-label">{comparison.after.label}</p>
            <ul className="mt-6 space-y-4">
              {comparison.after.points.map((point) => (
                <li key={point} className="dw-body flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className={section}>
      <div className={container}>
        <SectionHeading eyebrow="How it works" title="Your first contribution in three steps" />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col rounded-2xl border bg-card p-6">
              <span
                aria-hidden="true"
                className="dw-label flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground"
              >
                {index + 1}
              </span>
              <h3 className="dw-heading mt-6">{step.title}</h3>
              <p className="dw-body mt-2 flex-1 text-muted-foreground">{step.description}</p>
              <TextLink href={step.link.href} className="mt-6 self-start">
                {step.link.label}
              </TextLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className={section}>
      <div className={container}>
        <SectionHeading
          eyebrow="Projects"
          title="Products you can contribute to"
          description="Every DWOSI project is a working product, built in public by Dev Weekends engineers, mentors and students."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {flagshipProjects.map((project) => (
            <FlagshipCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="dw-heading">More from DWOSI</h3>
            <p className="dw-body text-muted-foreground">Earlier-stage products and DSOC projects.</p>
          </div>
          <TextLink href={DWOSI_LINKS.dsocProjects} className="self-start sm:self-auto">
            All DSOC projects
          </TextLink>
        </div>

        <div
          className={cn(
            "mt-6 grid gap-6 sm:grid-cols-2",
            moreProjects.length === 3 && "lg:grid-cols-3",
            moreProjects.length >= 4 && "lg:grid-cols-4"
          )}
        >
          {moreProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Proof() {
  return (
    <section id="track-record" className={section}>
      <div className={container}>
        <SectionHeading
          eyebrow="Track record"
          title="Part of a community that ships"
          description="DWOSI is built by Dev Weekends, a free community of engineers. These are its published numbers."
        />
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border lg:grid-cols-4">
          {proofStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2 bg-card p-6 sm:p-8">
              <dt className="dw-body text-muted-foreground">{stat.label}</dt>
              <dd className="dw-stat">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 text-center">
          <TextLink href={DWOSI_LINKS.impactNumbers}>How we count these numbers</TextLink>
        </div>
        <DsocStories />
      </div>
    </section>
  )
}

function Dsoc() {
  return (
    <section id="dsoc" className={section}>
      <div className={container}>
        <div className="grid gap-12 rounded-3xl border bg-muted p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>DSOC · Dev Weekends Summer of Code</Eyebrow>
            <h2 className="dw-title mt-2">Get a mentor and a stipend with DSOC</h2>
            <p className="dw-lead mt-4 max-w-[60ch] text-muted-foreground">
              DSOC is the mentored summer program inside DWOSI. Selected contributors spend 10–12 weeks building a
              DWOSI project with a mentor, with progress reviewed every month.
            </p>
            <div className="dw-body mt-6 flex flex-wrap items-center gap-2 text-muted-foreground">
              <Badge variant="outline" className="dw-label rounded-full bg-background px-2 font-normal">
                Closed
              </Badge>
              <p>The next cycle opens next summer.</p>
            </div>
            <Cta href={DWOSI_LINKS.dsoc} variant="secondary" arrow className="mt-8 bg-background">
              Explore DSOC
            </Cta>
          </div>
          <dl className="grid grid-cols-2 gap-px self-center overflow-hidden rounded-2xl border bg-border">
            {dsocFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse gap-2 bg-card p-6">
                <dt className="dw-body text-muted-foreground">{fact.label}</dt>
                <dd className="text-2xl font-semibold tabular-nums tracking-[-0.03em]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq" className={section}>
      <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16`}>
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions, answered"
          description={
            <>
              Something else on your mind? Email{" "}
              <a
                href={`mailto:${DWOSI_LINKS.email}`}
                className="dw-hit text-brand underline underline-offset-4"
              >
                {DWOSI_LINKS.email}
              </a>
              .
            </>
          }
        />
        <Accordion type="single" collapsible className="dw-faq border-t">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="py-6 text-base hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="dw-body pb-6 pr-8 text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <ContributionField fadeTop focus={{ x: 0.5, y: 0.5, rx: 0.4, ry: 0.42 }} />
      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <h2 className="dw-title">Pick a project and open your first pull request.</h2>
        <p className="dw-lead mx-auto mt-4 max-w-[60ch] text-muted-foreground">
          It&apos;s free, the code is public, and maintainers review what you send.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Cta href={PRIMARY_CTA.href} arrow className="w-full sm:w-auto">
            {PRIMARY_CTA.label}
          </Cta>
          <Cta href={DWOSI_LINKS.discord} variant="secondary" className="w-full sm:w-auto">
            Join the Discord
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
      <Why />
      <HowItWorks />
      <Projects />
      <Proof />
      <Dsoc />
      <Faq />
      <FinalCta />
    </>
  )
}
