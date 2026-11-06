import type { Metadata } from "next"

import { FellowshipYearNav, FileButton, OutcomeGrid } from "@/components/site/fellowship-blocks"
import { Button, Card, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"
import { CardText, Chip, StatRow } from "@/components/site/program-blocks"
import { withSocial } from "@/lib/seo"

export const metadata: Metadata = withSocial({
  alternates: { canonical: "/fellowship/2025" },
  title: "Fellowship 2025",
  description:
    "Dev Weekends Summer Fellowship 2025 had 800 fellows. 100 finished and were certified, built 442 projects and solved 8,000 LeetCode problems.",
})

const REPORT_POST = "/blog/fellowship-2025-impact-report"
const ORIGINAL_REPORT = "/reports/fellowship-2025-impact-report.html"

// Numbers from content/blog/fellowship-2025-impact-report.md. Keep the two in step.
const stats = [
  { value: "800", label: "Fellows" },
  { value: "100", label: "Finished and certified" },
  { value: "442", label: "Projects built" },
  { value: "8,000", label: "LeetCode problems solved" },
]

const outcomes = [
  { value: "17", label: "Secured an internship" },
  { value: "16", label: "Cleared interviews" },
  { value: "13", label: "Landed a full-time job" },
  { value: "16", label: "Contributing to open source" },
  { value: "13", label: "Working as freelancers" },
]

const builds = [
  { title: "Real estate apps", text: "Built by several fellows: full stack, with authentication, listings and search." },
  { title: "Multivendor e-commerce", text: "Vendor management, payments and real-time updates." },
  { title: "Learning management systems", text: "Course management, user roles and progress tracking." },
]

const body = "mt-3 text-[15px] leading-[1.6] text-[#5C5C5C]"

export default function Fellowship2025Page() {
  return (
    <main>
      <PageHero
        eyebrow="Dev Weekends Fellowship"
        title="Fellowship 2025"
        intro="Our Summer Fellowship 2025: projects, DSA and mentorship for 800 fellows, after a first cohort of 300+ earlier that year."
        actions={<FellowshipYearNav current="2025" />}
      />

      <Panel>
        <div className="max-w-[60ch]">
          <Chip onDark>Ended</Chip>
          <h2 className="mt-5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Summer Fellowship 2025 has ended.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#C7C7C7]">
            800 fellows joined and 100 finished and were certified. The report below covers those 100, from their own answers when the
            fellowship ended.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={REPORT_POST} variant="onDark">
              Read the full report
            </Button>
            <FileButton href={ORIGINAL_REPORT} onDark>
              Original 2025 report
            </FileButton>
          </div>
        </div>
      </Panel>

      <Section id="impact">
        <SectionHeading eyebrow="Impact report" title="What Fellowship 2025 led to." />
        <StatRow stats={stats} />

        <h3 className="mt-14 text-[22px] font-semibold tracking-[-0.02em]">Where it led them</h3>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-[#5C5C5C]">
          59 certified fellows took at least one of these paths. Some took more than one.
        </p>
        <div className="mt-6">
          <OutcomeGrid items={outcomes} />
        </div>
      </Section>

      <Section tone="gray">
        <SectionHeading
          eyebrow="Projects"
          title="What they built."
          intro="Alongside projects and DSA, fellows went through mindset talks, spiritual talks, dinner talks, weekly articles and daily reflection writing."
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {builds.map((item) => (
            <li key={item.title}>
              <Card className="h-full">
                <CardText title={item.title}>
                  <p className={body}>{item.text}</p>
                </CardText>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Panel>
        <div className="max-w-[60ch]">
          <h2 className="text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">What came next.</h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#C7C7C7]">
            After 2025 we moved to one Fellowship a year, with tracks, milestones and accountability. Fellowship 2026 selected 1,072
            fellows from more than 3,000 applicants.
          </p>
        </div>
        <div className="mt-8">
          <Button href="/fellowship" variant="onDark">
            See Fellowship 2026
          </Button>
        </div>
      </Panel>
    </main>
  )
}
