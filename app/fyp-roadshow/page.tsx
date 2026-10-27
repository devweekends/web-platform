import type { Metadata } from "next"
import { Compass, Users, Wrench } from "lucide-react"

import { Button, Card, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"
import { CardText, CheckList } from "@/components/site/program-blocks"

export const metadata: Metadata = {
  alternates: { canonical: "/fyp-roadshow" },
  title: "FYP Roadshow",
  description:
    "Practical guidance for final-year students choosing, planning, and building a final year project (FYP) worth showing after graduation.",
}

const discordUrl = "https://discord.gg/Cy7Rgkf4Up"
const fypMentorshipFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeJTkpAM6aTPpS6QcCO2iuB4VmKx537T84KBGlquqePwuuTfg/viewform"

const covers = [
  {
    icon: Compass,
    title: "Choose a problem that matters",
    text: "Move beyond another generic project by finding a problem with clear users, meaningful depth, and a realistic scope.",
  },
  {
    icon: Wrench,
    title: "Plan how to build it",
    text: "Turn an idea into a focused execution plan: research, architecture, milestones, and the engineering work that will stretch you.",
  },
  {
    icon: Users,
    title: "Get feedback from builders",
    text: "The strongest submitted projects can be shortlisted for follow-up guidance from Dev Weekends mentors.",
  },
]

export default function FYPRoadshowPage() {
  return (
    <main>
      <PageHero
        eyebrow="Final year project (FYP) roadshow"
        title="Build an FYP worth showing after graduation."
        intro="Your final year project can be more than a last-minute submission. Learn how to choose a problem, plan the work, and build something with real technical depth and real users."
        actions={
          <>
            <Button href={fypMentorshipFormUrl}>Submit your FYP idea</Button>
            <Button href="/guides/choosing-the-right-project" variant="secondary">
              Read the project guide
            </Button>
            <Button href={discordUrl} variant="secondary">
              Get updates on Discord
            </Button>
          </>
        }
      />

      <Section tone="gray">
        <SectionHeading eyebrow="What the roadshow covers" title="Practical direction before you commit months of work." />
        <div className="grid gap-5 md:grid-cols-3">
          {covers.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <Icon className="mb-6 h-6 w-6" aria-hidden="true" />
              <CardText title={title}>
                <p className="mt-3 text-[15px] leading-[1.6] text-[#5C5C5C]">{text}</p>
              </CardText>
            </Card>
          ))}
        </div>
      </Section>

      <Panel>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">For final-year students</p>
            <h2 className="mt-3.5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Make your FYP something you are proud to explain.
            </h2>
          </div>
          <div>
            <CheckList
              onDark
              items={[
                "Use the project-selection guide to test your idea before building.",
                "Submit your FYP idea or project for consideration.",
                "Strong submissions may be shortlisted for focused mentor guidance.",
              ]}
            />
            <div className="mt-8">
              <Button href={fypMentorshipFormUrl} variant="onDark">
                Submit your FYP idea
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </main>
  )
}
