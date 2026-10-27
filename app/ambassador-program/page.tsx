import type { Metadata } from "next"
import { Button, Card, Eyebrow, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"

export const metadata: Metadata = {
  alternates: { canonical: "/ambassador-program" },
  title: "Campus Ambassador Program",
  description:
    "Lead Dev Weekends on your campus. Activate your university community, unlock mentor access and deliver career outcomes with playbooks, support and recognition.",
}

const APPLICATION_URL = "https://forms.gle/k8JtSqSh2SWVMwJ4A"
const CONTACT_EMAIL = "devweekends@gmail.com"

const benefits = [
  {
    title: "All Fellowship access",
    description: "Everything Dev Weekends Certified Fellows enjoy, from masterclasses to private grind sessions.",
    points: [
      "Free access to expert training and paid courses",
      "Dedicated mentorship pods and AMA sessions",
      "Priority seats in Fellowship grind cohorts",
    ],
  },
  {
    title: "Career outcomes that stick",
    description: "Referrals, interview prep and data-backed success playbooks from the core team.",
    points: [
      "Recommendations and personal referrals to companies",
      "Mock interviews and career sprint reviews",
      "Outcome-oriented OKRs and reporting support",
    ],
  },
  {
    title: "Leadership and swag",
    description: "Recognition, spotlight features and limited-edition ambassador goodies.",
    points: [
      "VIP access to all Dev Weekends events",
      "Ambassador swag kit: hoodie, stickers, and desk gear",
      "Monthly spotlights across Dev Weekends channels",
    ],
  },
]

const exclusivePerks = [
  "Direct entry into the partner network",
  "Membership in the mentor network",
  "Personalized mentorship and career roadmaps",
  "Seasonal goodies for top-performing ambassadors",
  "Limited-edition ambassador swag drops",
  "Spotlight features and recommendation letters from Dev Weekends leadership",
]

const responsibilities = [
  {
    title: "Lead local chapters",
    items: [
      "Host at least two learning circles per month",
      "Onboard 50+ active learners every quarter",
      "Share campus stories and wins with the Dev Weekends marketing team",
    ],
  },
  {
    title: "Grow real opportunities",
    items: [
      "Coordinate mentor AMAs and placement clinics",
      "Nominate standout students for scholarships",
      "Manage the campus ambassador task board and KPIs",
    ],
  },
  {
    title: "Champion the brand",
    items: [
      "Curate a monthly highlight recap",
      "Collaborate on reels, blogs, and newsletter features",
      "Drive social media growth with authentic narratives",
    ],
  },
]

const support = [
  {
    title: "Dedicated playbooks",
    description: "Plug-and-play templates for event planning, partner outreach, and storytelling, so you never start from scratch.",
  },
  {
    title: "Monthly strategy labs",
    description: "Live sync-ups with the Dev Weekends core team to review KPIs, unlock blockers, and double down on what works.",
  },
  {
    title: "Always-on support desk",
    description: "A Slack channel with mentors, designers, and marketing coaches ready to help with your next campus event.",
  },
]

const journey = [
  {
    timeline: "Week 1",
    phase: "Discover",
    focus: "Ambassador onboarding",
    description: "Kick off with a leadership bootcamp, a campus audit, and OKR mapping led by the core team.",
  },
  {
    timeline: "Month 1",
    phase: "Launch",
    focus: "First flagship event",
    description: "Deliver your campus debut with full-stack collateral, a marketing calendar, and mentorship support.",
  },
  {
    timeline: "Month 2 to 3",
    phase: "Grow",
    focus: "Community flywheel",
    description: "Run thematic sprints, showcase talent, and partner with clubs to scale consistent engagement.",
  },
  {
    timeline: "Month 4+",
    phase: "Elevate",
    focus: "Career outcomes",
    description: "Connect students with recruiters, publish success stories, and unlock stipends and leadership badges.",
  },
]

function Bullet() {
  return <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A0A0A]" />
}

export default function AmbassadorProgramPage() {
  return (
    <main className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Campus Ambassador Program"
        title="Lead Dev Weekends on your campus"
        intro="Become the catalyst for innovation at your university. Activate communities, unlock mentor access, and deliver career outcomes with playbooks, support, and recognition from Dev Weekends."
        actions={
          <>
            <Button href={APPLICATION_URL}>Apply to become an ambassador</Button>
            <Button href="#journey" variant="secondary">See the journey</Button>
          </>
        }
      />

      <Section tone="gray">
        <SectionHeading
          eyebrow="Why join"
          title="Every campus needs an ambassador"
          intro="Lead the tech heartbeat of your university with playbooks, resources, and expert backing."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="h-full">
              <h3 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.02em]">{benefit.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#5C5C5C]">{benefit.description}</p>
              <ul className="mt-6 space-y-3 border-t border-[#E6E6E6] pt-6 text-[15px] leading-[1.6] text-[#404040]">
                {benefit.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <Bullet />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Panel>
        <Eyebrow onDark>Ambassador perks</Eyebrow>
        <h2 className="mt-3.5 max-w-[22ch] text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
          All Fellowship advantages, plus ambassador-only rewards
        </h2>
        <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-[#C7C7C7]">
          Deliver high-impact initiatives and unlock seasonal swag drops: hoodies, badges, desk gear, and limited pins.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exclusivePerks.map((perk) => (
            <li key={perk} className="rounded-[20px] bg-[#161616] p-6 text-[15px] leading-[1.6] text-[#E6E6E6]">
              {perk}
            </li>
          ))}
        </ul>
      </Panel>

      <Section>
        <SectionHeading
          eyebrow="Your mission"
          title="What you will drive every quarter"
          intro="Focus on real outcomes for students: community building, skill development, and career breakthroughs. An OKR model keeps you aligned."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {responsibilities.map((item) => (
            <Card key={item.title} tone="bordered" className="h-full">
              <h3 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.02em]">{item.title}</h3>
              <ul className="mt-5 space-y-3 text-[15px] leading-[1.6] text-[#404040]">
                {item.items.map((entry) => (
                  <li key={entry} className="flex gap-3">
                    <Bullet />
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Support from the core team</h3>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {support.map((resource) => (
              <div key={resource.title} className="border-t border-[#0A0A0A] pt-5">
                <h4 className="text-[18px] font-semibold tracking-[-0.01em]">{resource.title}</h4>
                <p className="mt-2 text-[15px] leading-[1.65] text-[#5C5C5C]">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="journey" tone="gray">
        <SectionHeading
          eyebrow="Ambassador journey"
          title="From selection to impact"
          intro="Four clear phases designed to keep you supported and growing as a leader."
        />
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {journey.map((step) => (
            <li key={step.phase} className="h-full">
              <Card className="h-full">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">{step.timeline}</p>
                <h3 className="mt-3 text-[22px] font-semibold leading-[1.25] tracking-[-0.02em]">{step.phase}</h3>
                <p className="mt-1 text-[15px] font-medium text-[#0A0A0A]">{step.focus}</p>
                <p className="mt-4 text-[15px] leading-[1.65] text-[#5C5C5C]">{step.description}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Panel>
        <div className="max-w-[720px]">
          <h2 className="text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Ready to champion innovation on your campus?
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#C7C7C7]">
            Tell us how you plan to build your community. We review applications on a rolling basis and onboard ambassadors in micro-cohorts for personalized support.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href={APPLICATION_URL} variant="onDark">Apply now</Button>
            <p className="text-[15px] text-[#C7C7C7]">
              Prefer a quick chat?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-4 hover:text-[#E6E6E6]"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </Panel>
    </main>
  )
}
