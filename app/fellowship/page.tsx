import type { Metadata } from "next"

import { SmartLink } from "@/components/home/smart-link"
import { Button, Card, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"
import { CardText, CheckList, Chip, DarkSteps, StatRow } from "@/components/site/program-blocks"

export const metadata: Metadata = {
  alternates: { canonical: "/fellowship" },
  title: "Fellowship 2026",
  description:
    "Dev Weekends Fellowship 2026: three months of DSA training, weekend engineering projects and mentorship. Applications are closed.",
}

const body = "mt-3 text-[15px] leading-[1.6] text-[#5C5C5C]"

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

const sessions = [
  {
    label: "30 deep sessions",
    title: "DSA grind sessions",
    text: "Intensive data structures and algorithms training.",
    items: ["3 sessions a week, 2 hours each", "LeetCode practice from 100 up to 1000+", "MERN stack integration"],
  },
  {
    label: "12 weekend sessions",
    title: "Engineering grind sessions",
    text: "Hands-on engineering and project development.",
    items: [
      "JS, React, Redux and Node.js",
      "Database design, data modeling and warehousing",
      "ETL / ELT pipelines, Spark and Airflow",
      "Microservices, system design, AWS, Docker and Kubernetes",
      "CI/CD and DevOps practices",
    ],
  },
  {
    label: "12 major projects",
    title: "Deep grind projects",
    text: "Real-world projects with expert guidance, one per weekend.",
    items: ["Industry-standard practices", "Portfolio-ready applications", "Deployment and optimization"],
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

const topics = [
  "JavaScript",
  "React",
  "Redux",
  "Node.js",
  "Next.js",
  "Database design",
  "Data modeling",
  "Spark and streaming",
  "Cloud warehouses (BigQuery, Snowflake)",
  "Delta Lake and lakehouse",
  "System architecture",
  "Microservices (3 HLD design sessions)",
  "ORM (Prisma, TypeORM)",
  "ETL / ELT and CDC",
  "Airflow and orchestration",
  "System design",
  "Interview prep",
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
        intro="Three months of DSA training, weekend engineering projects and mentorship, with the goal of making you industry-ready."
      />

      <Panel>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div>
            <Chip onDark>Closed</Chip>
            <h2 className="mt-5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Fellowship 2026 applications are closed.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.65] text-[#C7C7C7]">
              Applications will open next summer. We are always open to passionate people who show deep interest in technology and a
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
              <Button href="/blog/fellowship-2026-next-steps" variant="onDark">
                See what comes next
              </Button>
              <Button href="/fyp-roadshow" variant="onDarkSecondary">
                Explore FYP mentorship
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
        <SectionHeading eyebrow="Timeline" title="Your three months." />
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

      <Section id="program">
        <SectionHeading
          eyebrow="The program"
          title="Intensive training, real projects, expert mentors."
          intro="Every session type comes with 20+ hours of pre-recorded content."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {sessions.map((session) => (
            <Card key={session.title} tone="gray">
              <CardText label={session.label} title={session.title}>
                <p className={body}>{session.text}</p>
                <div className="mt-5">
                  <CheckList items={session.items} />
                </div>
              </CardText>
            </Card>
          ))}
        </div>
        <Card tone="bordered" className="mt-5 gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[60ch]">
            <CardText label="Mega capstone project" title="One industry-level project, guided by 2 expert mentors">
              <p className={body}>The crown jewel of your portfolio: full-stack development, industry-standard practices, and deployment and scaling strategies.</p>
            </CardText>
          </div>
          <p className="text-[clamp(32px,4vw,48px)] font-semibold leading-none tracking-[-0.04em]">1 project</p>
        </Card>
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

      <Section>
        <SectionHeading
          eyebrow="Technology"
          title="What the engineering sessions cover."
          intro="Dedicated 2-hour sessions each weekend, plus pre-recorded content to work through first."
        />
        <ul className="flex flex-wrap gap-2.5">
          {topics.map((topic) => (
            <li key={topic}>
              <Chip>{topic}</Chip>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="gray">
        <SectionHeading eyebrow="Perks" title="Fellowship perks." intro="For DW Certified Fellows (Bronze, Silver and Gold)." />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <Button href="/fyp-roadshow" variant="onDark">
            Explore FYP mentorship
          </Button>
        </div>
      </Panel>
    </main>
  )
}
