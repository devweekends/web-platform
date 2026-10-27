import type { Metadata } from "next"

import { LINKS } from "@/components/home/data"
import { Voices } from "@/components/home/sections-bottom"
import { Button, Card, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"
import { CardText, CheckList, DarkSteps, StatRow } from "@/components/site/program-blocks"
import { MentorshipDialog } from "@/components/site/mentorship-dialog"

export const metadata: Metadata = {
  alternates: { canonical: "/mentorship" },
  title: "Mentorship",
  description:
    "Dev Weekends mentorship: a free 3-month program with a personal mentor, live coding sessions and job preparation. It runs all year, except while a fellowship is running.",
}

const body = "mt-3 text-[15px] leading-[1.6] text-[#5C5C5C]"

const stats = [
  { value: "30", label: "DSA grind sessions" },
  { value: "12", label: "Weekend projects" },
  { value: "300+", label: "LeetCode problems" },
  { value: "3 months", label: "Intensive program" },
]

const features = [
  {
    title: "Personal mentor",
    text: "Get matched with an experienced industry mentor based on your goals and learning style.",
    items: [
      "A dedicated mentor throughout the program",
      "A personalized learning path",
      "Career guidance and planning",
      "Project review and feedback",
    ],
  },
  {
    title: "Live interactive sessions",
    text: "Live coding sessions, workshops and Q&A with instructors and industry experts.",
    items: [
      "2 live sessions per week",
      "Interactive problem solving and real-time doubt clearing",
      "Peer collaboration",
      "Session recordings available",
    ],
  },
  {
    title: "1:1 mentorship hours",
    text: "Regular one-on-one sessions for personalized guidance and support.",
    items: ["Weekly or bi-weekly sessions", "Code review and optimization", "Interview preparation", "Career counseling"],
  },
]

const levels = [
  {
    label: "Level 0",
    title: "Foundation track",
    sub: "Complete beginner journey",
    text: "For absolute beginners starting their coding journey with comprehensive support.",
    meta: "Beginner friendly. 20 live sessions and 24 hours of 1:1 mentorship.",
    items: [
      "Programming fundamentals from scratch",
      "Web development essentials",
      "Data structures and algorithms basics",
      "Weekly 1:1 mentor sessions",
      "Personal project guidance",
    ],
    path: "Mentee to Foundation level",
  },
  {
    label: "Level 1",
    title: "Professional track",
    sub: "Industry-ready development",
    text: "For engineers with basic knowledge aiming for professional excellence.",
    meta: "Moderate pace. 20 live sessions.",
    items: [
      "Advanced data structures and complex algorithms",
      "System design fundamentals",
      "Bi-weekly 1:1 mentor sessions",
      "Mock interviews with feedback",
      "Open source contribution guidance",
    ],
    path: "Foundation to Professional level",
  },
]

const perks = [
  "Free access to all live sessions",
  "A dedicated personal mentor",
  "1:1 mentorship hours",
  "Job placement assistance",
  "Industry referrals",
  "Mock interview practice",
  "Certificate of completion",
  "Lifetime community access",
  "Project portfolio development",
  "Resume and LinkedIn optimization",
  "Exclusive industry workshops",
  "Peer learning groups",
]

export default function MentorshipPage() {
  return (
    <main>
      <MentorshipDialog />

      <PageHero
        eyebrow="Dev Weekends Mentorship"
        title="Mentorship, all year round."
        intro={
          <>
            <p>
              Mentorship runs all year, except while a fellowship is running. Get a personal mentor, join live coding sessions and
              become job-ready, whether you are starting from scratch or already have experience and feel stuck.
            </p>
            <p className="mt-4">Final year project (FYP) mentorship is closed for now. The next round is announced on Discord.</p>
          </>
        }
        actions={
          <>
            <Button href={LINKS.getInvolved}>Apply to a program</Button>
            <Button href="#timeline" variant="secondary">
              See the 3-month plan
            </Button>
          </>
        }
      />

      <Section>
        <StatRow stats={stats} />
      </Section>

      <Voices />

      <Section id="mentorship" tone="gray">
        <SectionHeading eyebrow="What you get" title="Personal mentorship that transforms." />
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardText title={feature.title}>
                <p className={body}>{feature.text}</p>
                <div className="mt-5">
                  <CheckList items={feature.items} />
                </div>
              </CardText>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="levels">
        <SectionHeading
          eyebrow="Tracks"
          title="DSA and engineering tracks."
          intro="Both levels include the 30 DSA sessions and 12 engineering sessions."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {levels.map((level) => (
            <Card key={level.label} tone="gray">
              <CardText label={level.label} title={level.title}>
                <p className="mt-1 text-[15px] font-medium text-[#5C5C5C]">{level.sub}</p>
                <p className={body}>{level.text}</p>
                <p className="mt-4 text-sm font-semibold">{level.meta}</p>
                <div className="mt-5">
                  <CheckList items={level.items} />
                </div>
                <p className="mt-6 text-sm text-[#5C5C5C]">Path: {level.path}</p>
              </CardText>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Perks" title="Mentorship perks." intro="For everyone who joins the mentorship program." />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk) => (
            <li key={perk}>
              <Card tone="gray" className="h-full">
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
          <h2 className="text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">Ready to get industry-ready?</h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#C7C7C7]">
            Build a stronger FYP with practical project-selection guidance, community feedback and upcoming mentor opportunities.
          </p>
        </div>
        <div className="mt-10">
          <DarkSteps
            steps={[
              { title: "Choose a problem", text: "Find a project with real users and technical depth." },
              { title: "Plan the work", text: "Turn your idea into a focused execution plan." },
              { title: "Get guidance", text: "Follow upcoming FYP mentorship updates." },
            ]}
          />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={LINKS.getInvolved} variant="onDark">
            Apply to a program
          </Button>
          <Button href="/blog/fellowship-2026-next-steps" variant="onDarkSecondary">
            Fellowship 2026 next steps
          </Button>
        </div>
      </Panel>
    </main>
  )
}
