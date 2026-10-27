'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

import { LINKS } from "@/components/home/data"
import { Button, Card, Eyebrow, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"

interface CoreTeamMember {
  _id: string;
  name: string;
  image: string;
  role: string;
  linkedin: string;
  order?: number;
}

// Members hidden from the "Meet the People Behind" section (matched by
// exact, trimmed, lower-cased name). The records still live in the DB.
const HIDDEN_MEMBERS = new Set(["muhammad ali", "muhammad faraz"]);

// Orders the core team for the "Meet the People Behind" section:
// Founder -> Moeez -> Abdul Moiz -> Chiefs/Officers -> Heads ->
// Senior Leads -> Program/Specialty Leads (GSOC, DevOps, etc.) ->
// generic Technical Leads -> Mentors -> Managers -> everyone else.
// Pinned people are matched by name; everyone else falls into a role tier.
function rankMember(m: CoreTeamMember): number {
  const name = (m.name || "").trim().toLowerCase();
  const role = (m.role || "").toLowerCase();

  if (name === "zeeshan adil" || role === "founder") return 0;
  if (name.includes("moeez")) return 1;
  if (name === "abdul moiz") return 2;

  if (role.includes("chief") || role.includes("officer")) return 10;
  if (role.includes("head")) return 20;
  if ((role.includes("sr.") || role.includes("senior")) && role.includes("lead")) return 30;
  // Specialty / program leads (GSOC, DevOps, Research, etc.) sit above
  // generic technical leads.
  if (role.includes("lead") && role.includes("technical")) return 45;
  if (role.includes("lead")) return 40;
  if (role.includes("mentor")) return 50;
  if (role.includes("manager")) return 60;
  return 70;
}

// Members with an admin-assigned order (> 0) come first, in that order.
// Anyone without an explicit order falls back to the role hierarchy, so the
// section stays sensible until orders are assigned in the admin dashboard.
function compareMembers(a: CoreTeamMember, b: CoreTeamMember): number {
  const oa = a.order && a.order > 0 ? a.order : null;
  const ob = b.order && b.order > 0 ? b.order : null;

  if (oa !== null && ob !== null) return oa - ob;
  if (oa !== null) return -1;
  if (ob !== null) return 1;
  return rankMember(a) - rankMember(b);
}

const stats = [
  { value: "30K+", label: "Community members" },
  { value: "1,000+", label: "Engineers trained" },
  { value: "200+", label: "Sessions delivered" },
  { value: "100%", label: "Free forever" },
]

const beliefs = [
  "Talent is everywhere, opportunity is not",
  "The best mentors are those who remember struggling",
  "Practice beats theory, always",
  "Community accelerates everything",
  "Free education is a right, not a privilege",
]

const circles = [
  { title: "Open Source Alpha", desc: "Beginner open source contributors" },
  { title: "Open Source Beta", desc: "Intermediate contributors on real projects" },
  { title: "X-Team", desc: "Elite performers building production systems" },
  { title: "Co-Working", desc: "Virtual sessions for focused productivity" },
  { title: "ICPC Team", desc: "Competitive programming for ICPC" },
  { title: "GSoC Prep", desc: "Google Summer of Code preparation" },
  { title: "Interview Prep", desc: "Mock interviews and placement prep" },
  { title: "2-Day Startup", desc: "Onsite weekend sprints to beat procrastination" },
  { title: "Hackathon Circle", desc: "Building flawlessly engineered products" },
  { title: "Weekend Deep-Dives", desc: "Topic-focused intensive sessions" },
  { title: "Remote Job Placement", desc: "Landing international remote opportunities" },
]

const engine = [
  {
    title: "Policy & Strategy Team",
    text: "Continuously evaluating approaches, rethinking resources and methods, and testing everything before deployment.",
  },
  {
    title: "Curriculum Development",
    text: "Well-planned and tested assignments, personalized guidance instead of generic advice, and regular updates based on industry trends.",
  },
  {
    title: "Resource Curation",
    text: "Weekly article sharing (3 articles/week), curated book recommendations, and interview question databases.",
  },
  {
    title: "Quality Assurance",
    text: "Mock interviews (up to 5 levels), project audits and case studies, and resume, LinkedIn and portfolio reviews.",
  },
]

const lift = "motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)]"

export default function AboutPage() {
  const [coreTeam, setCoreTeam] = useState<CoreTeamMember[]>([]);
  const [loadingCore, setLoadingCore] = useState(true);

  useEffect(() => {
    fetch('/api/core-team')
      .then(res => res.json())
      .then(data => {
        const list: CoreTeamMember[] = Array.isArray(data) ? data : [];
        setCoreTeam(
          list
            .filter((m) => !HIDDEN_MEMBERS.has((m.name || "").trim().toLowerCase()))
            .sort(compareMembers)
        );
      })
      .catch((error) => {
        console.error("Failed to load core team", error)
        setCoreTeam([])
      })
      .finally(() => setLoadingCore(false));
  }, []);

  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="About Dev Weekends"
        title="We build engineers who change lives."
        intro="Your gateway to becoming a better software engineer. Dev Weekends is an international community, founded in 2018, that started in Pakistan."
        actions={
          <>
            <Button href="/our-story">Our full story</Button>
            <Button href={LINKS.discord} variant="secondary">
              Join the community
            </Button>
          </>
        }
      />

      {/* Stats and photo */}
      <Section tone="gray">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="relative h-[280px] overflow-hidden rounded-[20px] bg-[#E6E6E6] md:h-[360px]">
            <Image
              src="https://res.cloudinary.com/dcrgvq3lf/image/upload/v1748606356/about_img_lcygp4.jpg"
              alt="Dev Weekends meetup"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover grayscale"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <Card key={s.label} tone="white">
                <div className="text-[clamp(32px,4vw,44px)] font-semibold leading-none tracking-[-0.04em]">{s.value}</div>
                <div className="mt-2 text-sm text-[#5C5C5C]">{s.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission: the first black panel */}
      <Panel>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Eyebrow onDark>Our mission</Eyebrow>
            <h2 className="mt-3.5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">Why we exist</h2>
            <p className="mt-6 max-w-[60ch] text-[18px] leading-[1.65] text-[#C7C7C7]">
              We started Dev Weekends because we saw brilliant minds falling through the cracks. Students with incredible potential
              but no roadmap. Engineers who could build anything but didn&apos;t know where to start. A generation of talent lost to a
              broken system.
            </p>
            <p className="mt-5 max-w-[60ch] text-[18px] leading-[1.65] text-[#C7C7C7]">
              So we built something different. A community where engineers at top companies mentor the next generation. Where
              practice isn&apos;t optional, it&apos;s daily. Where success is measured not by what you know, but by how many lives you
              change after your own transformation.
            </p>
          </div>
          <div className="rounded-[20px] bg-[#161616] p-7">
            <h3 className="text-lg font-semibold">What we believe</h3>
            <ul className="mt-4 space-y-3">
              {beliefs.map((b) => (
                <li key={b} className="border-t border-[#262626] pt-3 text-[15px] leading-snug text-[#C7C7C7] first:border-t-0 first:pt-0">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>

      {/* Circles */}
      <Section id="circles">
        <SectionHeading
          eyebrow="The circles ecosystem"
          title="Specialized communities within"
          intro="Join focused circles based on your interests and goals."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {circles.map((c) => (
            <Card key={c.title} tone="bordered" className={`p-6 ${lift}`}>
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C5C5C]">{c.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Internal engine */}
      <Section tone="gray">
        <SectionHeading
          eyebrow="The internal engine"
          title="How we stay cutting edge"
          intro="Our internal teams ensure you always get the best guidance."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {engine.map((t) => (
            <Card key={t.title} tone="white" className={lift}>
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#404040]">{t.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Core team */}
      <Section id="team">
        <SectionHeading eyebrow="Core team" title="Meet the people behind" />
        {loadingCore ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-busy="true" aria-label="Loading the core team">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex animate-pulse flex-col items-center rounded-[20px] bg-[#F7F7F7] p-6">
                <div className="h-20 w-20 rounded-full bg-[#E6E6E6]" />
                <div className="mt-4 h-4 w-24 rounded bg-[#E6E6E6]" />
                <div className="mt-2 h-3 w-16 rounded bg-[#E6E6E6]" />
              </div>
            ))}
          </div>
        ) : coreTeam.length === 0 ? (
          <p className="text-[17px] text-[#5C5C5C]">The team list is not available right now. Please check back soon.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {coreTeam.map((member) => {
              const body = (
                <>
                  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#E6E6E6]">
                    <Image
                      src={member.image || '/placeholder-avatar.jpg'}
                      alt={member.name}
                      fill
                      sizes="80px"
                      className="object-cover grayscale"
                    />
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold">{member.name}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-[#5C5C5C]">{member.role}</p>
                </>
              )
              return (
                <Card key={member._id} tone="gray" href={member.linkedin || null} className={`items-center p-6 text-center ${lift}`}>
                  {body}
                </Card>
              )
            })}
          </div>
        )}
      </Section>

      {/* Call to action */}
      <Section tone="gray">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">Ready to transform?</h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-[#5C5C5C]">
            Join 30,000+ engineers who chose to stop waiting and start building. Your transformation starts with one decision.
            It&apos;s free, forever.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={LINKS.discord}>Join Discord community</Button>
            <Button href="/fyp-roadshow" variant="secondary">
              Explore FYP mentorship
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
