import type { Metadata } from "next"

import { SmartLink } from "@/components/home/smart-link"
import { LINKS } from "@/components/home/data"
import { Voices } from "@/components/home/sections-bottom"
import { Button, Card, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"
import { FellowshipYearNav, OutcomeGrid } from "@/components/site/fellowship-blocks"
import { CardText, CheckList, Chip, DarkSteps, StatRow } from "@/components/site/program-blocks"
import { withSocial } from "@/lib/seo"
// Totals only, no personal data. Rebuild with: node scripts/build-fellowship-impact.mjs
import impact from "@/data/fellowship-2026-impact.json"

export const metadata: Metadata = withSocial({
  alternates: { canonical: "/fellowship" },
  title: "Fellowship 2026",
  description:
    "Dev Weekends Fellowship 2026 has ended. Read its impact report: projects built, LeetCode problems solved, and the internships and jobs fellows reported.",
})

const body = "mt-3 text-[15px] leading-[1.6] text-[#5C5C5C]"

/** From content/blog/fellowship-2026-by-the-numbers.md */
const SELECTED_FELLOWS = 1072

const fmt = (n: number) => n.toLocaleString("en-US")
const surveyDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "UTC" })

const impactStats = [
  { value: fmt(SELECTED_FELLOWS), label: "Fellows selected" },
  { value: fmt(impact.projects.total), label: "Projects built" },
  { value: fmt(impact.leetcode.total), label: "LeetCode problems solved" },
  { value: `${impact.ratings.program.average}/5`, label: "Overall rating" },
]

const impactOutcomes = [
  { value: fmt(impact.outcomes.internships), label: "Secured an internship" },
  { value: fmt(impact.outcomes.interviews), label: "Cleared interviews" },
  { value: fmt(impact.outcomes.jobs), label: "Landed a job" },
  { value: fmt(impact.outcomes.openSource), label: "Contributing to open source" },
  { value: fmt(impact.outcomes.freelance), label: "Working as freelancers" },
]

const impactRatings = [
  { title: "Overall experience", rating: impact.ratings.program },
  { title: "Mentor support", rating: impact.ratings.mentor },
]

const steps = [
  { title: "Join a clan", text: "Get assigned to one of 25 focused clans." },
  { title: "Meet your mentors", text: "2-3 mentors per clan track your progress." },
  { title: "Weekly tracking", text: "Progress reviews with accountability." },
  { title: "Earn certification", text: "Bronze, Silver or Gold." },
]

const stats = [
  { value: "60+", label: "Tech sessions" },
  { value: "12", label: "Weekend projects" },
  { value: "300+", label: "LeetCode problems" },
  { value: "3 months", label: "Intensive program" },
]

const timeline = [
  {
    week: "Weeks 1-4",
    title: "Foundation and skill building",
    text: "Master DSA, set up your development environment and start building your first projects.",
    milestone: "Complete projects and DSA",
  },
  {
    week: "Weeks 5-8",
    title: "Open source programs and projects",
    text: "Go deeper into DSA and system design, and contribute to open source projects like GSoC.",
    milestone: "Open source contributions",
  },
  {
    week: "Weeks 9-12",
    title: "Industry projects and remote jobs",
    text: "Work on complex projects, prepare for remote job interviews and build your portfolio.",
    milestone: "Remote job ready",
  },
]

const tracks = [
  {
    label: "Track 01, Level 0",
    title: "Full Stack AI Engineering",
    sub: "Foundations",
    text: "Master the fundamentals of full stack development with AI-first principles.",
    focus: "Full stack and AI fundamentals",
    format: "Guided level",
    items: [
      "Frontend and backend fundamentals",
      "Prompting and AI workflows",
      "APIs, authentication and databases",
      "Project-based learning with mentors",
      "Capstone project development",
    ],
  },
  {
    label: "Track 01, Level 1",
    title: "Full Stack AI Engineering",
    sub: "Advanced",
    text: "Build production-grade AI features and systems across the full stack.",
    focus: "AI systems and production engineering",
    format: "Advanced level",
    items: [
      "Agentic workflows and RAG systems",
      "Scalable microservices architecture",
      "LLM optimization and quality",
      "MLOps and deployment pipelines",
      "Industry-ready capstone project",
    ],
  },
  {
    label: "Track 02, Level 0",
    title: "Data Engineering",
    sub: "Open track",
    text: "Design and build reliable data platforms, pipelines and analytics solutions.",
    focus: "Data pipelines and warehousing",
    format: "Self-paced open track",
    items: [
      "Data modeling and warehouse design",
      "Batch and streaming pipelines",
      "Orchestration and monitoring",
      "Cloud infrastructure (AWS, GCP)",
      "Data quality and governance",
    ],
  },
]

const perks = [
  "Free access to expert training",
  "Free access to paid courses",
  "Access to the partner network",
  "Part of the mentor network",
  "Recommendations to companies",
  "Personal referrals to companies",
  "VIP access to all events",
  "Personalized guidance",
  "Mock interviews",
]

const highlights = [
  { title: "Personal mentor", text: "1:1 guidance from engineers at top companies." },
  { title: "30+ live sessions", text: "DSA deep dives, engineering grinds and mock interviews." },
  { title: "Up to 5 mock interviews", text: "Practice with real engineers and get feedback." },
]

export default function FellowshipPage() {
  return (
    <main>
      <PageHero
        eyebrow="Dev Weekends Fellowship"
        title="Fellowship 2026"
        intro="Three months of DSA training, weekend engineering projects and mentorship for 1,072 fellows, with the goal of making them industry-ready."
        actions={<FellowshipYearNav current="2026" />}
      />

      <Panel>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div>
            <Chip onDark>Ended</Chip>
            <h2 className="mt-5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Fellowship 2026 has ended.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.65] text-[#C7C7C7]">
              Thank you to all 1,072 fellows, their mentors and the clans that kept each other going. Read what came out of it in the
              impact report below.
            </p>
            <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.65] text-[#C7C7C7]">
              The next Fellowship opens next summer. We are always open to passionate people who show deep interest in technology and a
              strong willingness to get things done. We review exceptional cases at{" "}
              <a
                href="mailto:info@devweekends.com"
                className="font-semibold text-white underline underline-offset-4 hover:text-[#E6E6E6]"
              >
                info@devweekends.com
              </a>
              .
            </p>
            <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.65] text-[#C7C7C7]">
              Working on a final year project (FYP)? Start with our FYP guidance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#impact" variant="onDark">
                Read the impact report
              </Button>
              <Button href="/blog/fellowship-2026-next-steps" variant="onDarkSecondary">
                See what comes next
              </Button>
            </div>
          </div>
          <div className="rounded-[20px] border border-[#262626] bg-[#161616] p-7">
            <Chip onDark>Closed</Chip>
            <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.02em]">DSOC 2026 is closed</h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-[#C7C7C7]">
              Dev Weekends Summer of Code, our mentored open source program, is closed for 2026.
            </p>
            <SmartLink href="/dsoc" className="mt-5 inline-flex min-h-11 items-center text-[15px] font-semibold text-white hover:text-[#E6E6E6]">
              About DSOC →
            </SmartLink>
          </div>
        </div>
      </Panel>

      <Section id="impact">
        <SectionHeading
          eyebrow="Impact report"
          title="What Fellowship 2026 led to."
          intro={`From the end-of-fellowship survey, answered by ${fmt(impact.survey.respondents)} fellows between ${surveyDate(
            impact.survey.from,
          )} and ${surveyDate(impact.survey.to)} 2026. Everything here is what fellows told us themselves.`}
          action={
            <Button href="/blog/fellowship-2026-by-the-numbers" variant="secondary">
              Who was selected
            </Button>
          }
        />
        <StatRow stats={impactStats} />

        <h3 className="mt-14 text-[22px] font-semibold tracking-[-0.02em]">Where it led them</h3>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-[#5C5C5C]">
          {fmt(impact.outcomes.anyPath)} of the {fmt(impact.survey.respondents)} fellows who answered took at least one of these
          paths. Some took more than one.
        </p>
        <div className="mt-6">
          <OutcomeGrid items={impactOutcomes} />
        </div>

        <h3 className="mt-14 text-[22px] font-semibold tracking-[-0.02em]">How fellows rated it</h3>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {impactRatings.map(({ title, rating }) => (
            <li key={title}>
              <Card tone="gray" className="h-full">
                <p className="text-[clamp(28px,4vw,40px)] font-semibold leading-none tracking-[-0.04em]">{rating.average}/5</p>
                <CardText title={title}>
                  <p className={body}>
                    {fmt(rating.fourOrFive)} of {fmt(rating.answered)} gave 4 or 5 stars.
                  </p>
                </CardText>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[70ch] text-sm leading-[1.6] text-[#5C5C5C]">
          How we counted: each fellow is counted once, using their latest answer. A path counts only when the answer was a clear yes.
          {`Projects were reported by ${fmt(impact.projects.reportedBy)} fellows and LeetCode totals by ${fmt(
            impact.leetcode.reportedBy,
          )}; the rest left those questions blank.`}{" "}
          Looking for an earlier year? Read the{" "}
          <SmartLink href="/fellowship/2025" className="font-semibold text-[#0A0A0A] underline underline-offset-4">
            Fellowship 2025 report
          </SmartLink>
          .
        </p>
      </Section>

      <Voices />

      <Section>
        <SectionHeading eyebrow="How it works" title="A structured journey, start to finish." />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Card tone="gray" className="h-full">
                <p className="text-sm font-semibold text-[#8A8A8A]">0{index + 1}</p>
                <CardText title={step.title}>
                  <p className={body}>{step.text}</p>
                </CardText>
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-5">
          <StatRow stats={stats} />
        </div>
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <li key={item.title}>
              <Card tone="bordered" className="h-full">
                <CardText title={item.title}>
                  <p className={body}>{item.text}</p>
                </CardText>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="timeline" tone="gray">
        <SectionHeading eyebrow="Timeline" title="The three months." />
        <ol className="grid gap-5 md:grid-cols-3">
          {timeline.map((item) => (
            <li key={item.week}>
              <Card className="h-full">
                <CardText label={item.week} title={item.title}>
                  <p className={body}>{item.text}</p>
                  <p className="mt-auto pt-5 text-sm font-semibold">{item.milestone}</p>
                </CardText>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="levels" tone="gray">
        <SectionHeading
          eyebrow="Tracks"
          title="Fellowship tracks."
          intro="Full Stack AI Engineering has two levels. Data Engineering is an open track."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {tracks.map((track) => (
            <Card key={track.label}>
              <CardText label={track.label} title={track.title}>
                <p className="mt-1 text-[15px] font-medium text-[#5C5C5C]">{track.sub}</p>
                <p className={body}>{track.text}</p>
                <p className="mt-4 text-sm leading-[1.7] text-[#5C5C5C]">
                  <span className="font-semibold text-[#0A0A0A]">Focus:</span> {track.focus}
                  <br />
                  <span className="font-semibold text-[#0A0A0A]">Format:</span> {track.format}
                </p>
                <div className="mt-5">
                  <CheckList items={track.items} />
                </div>
              </CardText>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="gray">
        <SectionHeading eyebrow="Perks" title="Fellowship perks." intro="For DW Certified Fellows (Bronze, Silver and Gold)." />
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {perks.map((perk) => (
            <li key={perk}>
              <Card className="h-full">
                <p className="text-base font-semibold">{perk}</p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[60ch] text-[15px] leading-[1.6] text-[#5C5C5C]">
          We stand with Palestine. Exclusive access for Palestinians.
        </p>
      </Section>

      <Panel>
        <div className="max-w-[60ch]">
          <h2 className="text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">Build an FYP worth showing.</h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#C7C7C7]">
            Use practical guidance to choose a problem, plan the work and build a final year project that goes beyond the final
            presentation.
          </p>
        </div>
        <div className="mt-10">
          <DarkSteps
            steps={[
              { title: "Choose a problem", text: "Find a problem with real users and technical depth." },
              { title: "Plan the work", text: "Turn your idea into a focused execution plan." },
              { title: "Get guidance", text: "Follow the next FYP mentorship and submission updates." },
            ]}
          />
        </div>
        <div className="mt-10">
          <Button href={LINKS.getInvolved} variant="onDark">
            Apply to a program
          </Button>
        </div>
      </Panel>
    </main>
  )
}
