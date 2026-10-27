import type { Metadata } from "next"

import { Button, Card, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"
import { CardText, CheckList, Chip, DarkSteps, StatRow } from "@/components/site/program-blocks"
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

const timeline = [
  {
    month: "Month 1",
    title: "Foundation and core skills",
    text: "Master programming fundamentals, DSA basics and web development essentials. Build your first portfolio projects with expert mentor guidance.",
    milestone: "Core foundations and first projects",
    items: ["8+ 1:1 mentor sessions", "LeetCode 100-200", "MERN stack fundamentals"],
  },
  {
    month: "Month 2",
    title: "Advanced DSA and system design",
    text: "Go deep on complex algorithms, advanced data structures and system design patterns. Work on real-world projects and prepare for technical interviews.",
    milestone: "Advanced problem solving and system design",
    items: ["4+ 1:1 mentor sessions", "LeetCode 300-400", "System design fundamentals", "Open source contributions"],
  },
  {
    month: "Month 3",
    title: "Industry readiness and job preparation",
    text: "Master advanced system design, build capstone projects, practice with mock interviews and get ready for job applications.",
    milestone: "Industry ready and job placement",
    items: [
      "4+ 1:1 mentor sessions",
      "LeetCode 400+",
      "Mock interviews and feedback",
      "Resume and LinkedIn optimization",
      "Job application strategy",
    ],
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
      "Database design and architecture",
      "Microservices and system design",
      "AWS, Docker, Kubernetes, CI/CD and DevOps",
    ],
  },
  {
    label: "12 major projects",
    title: "Deep grind projects",
    text: "Real-world projects with expert guidance, one per weekend.",
    items: ["Industry-standard practices", "Portfolio-ready applications", "Deployment and optimization"],
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

const topics = [
  "JavaScript",
  "React",
  "Redux",
  "Node.js",
  "Next.js",
  "Database design",
  "System architecture",
  "Microservices (3 HLD design sessions)",
  "ORM (Prisma, TypeORM)",
  "System design",
  "Interview prep",
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
            <p className="mt-4">Final year project (FYP) students can apply through the FYP Roadshow.</p>
          </>
        }
        actions={
          <>
            <Button href="/fyp-roadshow">Apply for FYP mentorship</Button>
            <Button href="#timeline" variant="secondary">
              See the 3-month plan
            </Button>
          </>
        }
      />

      <Section>
        <StatRow stats={stats} />
      </Section>

      <Section id="mentorship" tone="gray">
        <SectionHeading eyebrow="What you get" title="Personal mentorship that transforms." />
        <div className="grid gap-5 lg:grid-cols-3">
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

      <Section id="timeline">
        <SectionHeading
          eyebrow="Timeline"
          title="Your three months."
          intro="Suitable for all levels, with Foundation and Professional tracks."
        />
        <ol className="grid gap-5 lg:grid-cols-3">
          {timeline.map((item) => (
            <li key={item.month}>
              <Card tone="gray" className="h-full">
                <CardText label={item.month} title={item.title}>
                  <p className={body}>{item.text}</p>
                  <p className="mt-5 text-sm font-semibold">{item.milestone}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.items.map((entry) => (
                      <li key={entry}>
                        <Chip>{entry}</Chip>
                      </li>
                    ))}
                  </ul>
                </CardText>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="program" tone="gray">
        <SectionHeading
          eyebrow="The program"
          title="Intensive training, real projects, expert mentors."
          intro="Every session type comes with 20+ hours of pre-recorded content."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {sessions.map((session) => (
            <Card key={session.title}>
              <CardText label={session.label} title={session.title}>
                <p className={body}>{session.text}</p>
                <div className="mt-5">
                  <CheckList items={session.items} />
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

      <Section tone="gray">
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
          <Button href="/fyp-roadshow" variant="onDark">
            Explore FYP mentorship
          </Button>
          <Button href="/blog/fellowship-2026-next-steps" variant="onDarkSecondary">
            Fellowship 2026 next steps
          </Button>
        </div>
      </Panel>
    </main>
  )
}
