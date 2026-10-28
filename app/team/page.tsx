"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ExternalLink, Linkedin } from "lucide-react"

import { Impact, Outcomes } from "@/components/home/sections-top"
import { Button, Card, Section, SectionHeading, PageHero } from "@/components/site/page-kit"
import { Voices } from "@/components/home/sections-bottom"
import { Slider } from "@/components/site/slider"
import { StartHere } from "@/components/site/start-here"
import { FounderStory } from "@/components/story/founder-story"

const lift = "motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)]"

interface TeamMember {
  name: string
  role: string
  linkedin: string
  image: string
}

// Members hidden from the page (matched by exact, trimmed, lower-cased name).
// The records still live in the database.
const HIDDEN_MEMBERS = new Set([
  "muhammad ali",
  "muhammad faraz",
  "ahsaan ullah",
  "falak sher",
  "zulkifal",
  "muhammad junaid raza",
  "usama razzaq",
  "haris baig",
])

// Top mentors, in the order they are shown. The operational core team is loaded from the database.
const mentors: TeamMember[] = [
  { name: "Usman Sheikh", role: "Sr. Cloud Architect @ Microsoft", linkedin: "https://www.linkedin.com/in/usmanikramsheikh/", image: "/usman.jpg" },
  { name: "Zeeshan Adil", role: "Lead Engineer | Top 1% on Upwork, Expert-Vetted | ex-UN", linkedin: "https://www.linkedin.com/in/zeeshanadilbutt/", image: "/zee.png" },
  { name: "Moeez Ahmad", role: "SWE @ Calo", linkedin: "https://www.linkedin.com/in/moeezahmad01/", image: "/m3.png" },
  { name: "Tanzeel Saleem", role: "Founder @ DevNexus", linkedin: "https://www.linkedin.com/in/tanzeel-saleem/", image: "/tanzeel.jpg" },
  { name: "Fiaz Ahmad", role: "Top Rated Plus @ Upwork", linkedin: "https://www.linkedin.com/in/fiazahmad/", image: "/m5.jpeg" },
  { name: "Muhammad Shehroz", role: "SWE @ Unanime Planet", linkedin: "https://www.linkedin.com/in/muhammad-shehroze", image: "/shehroz.png" },
  { name: "Abu Bakar", role: "SWE @ Salla Ecommerce", linkedin: "https://www.linkedin.com/in/iamaboubakar/", image: "/bakar.png" },
  { name: "Farooq Tahir", role: "Top Rated Plus @ Upwork", linkedin: "https://www.linkedin.com/in/farooqtahir/", image: "/farooq.png" },
]

// Orders the team: the admin-assigned order first, then by role tier.
function rankMember(m: { name?: string; role?: string }): number {
  const name = (m.name || "").trim().toLowerCase()
  const role = (m.role || "").toLowerCase()
  if (name === "zeeshan adil" || role === "founder") return 0
  if (name.includes("moeez")) return 1
  if (name === "abdul moiz") return 2
  if (role.includes("chief") || role.includes("officer")) return 10
  if (role.includes("head")) return 20
  if ((role.includes("sr.") || role.includes("senior")) && role.includes("lead")) return 30
  if (role.includes("lead") && role.includes("technical")) return 45
  if (role.includes("lead")) return 40
  if (role.includes("mentor")) return 50
  if (role.includes("manager")) return 60
  return 70
}

function compareMembers(a: { order?: number; name?: string; role?: string }, b: { order?: number; name?: string; role?: string }): number {
  const oa = a.order && a.order > 0 ? a.order : null
  const ob = b.order && b.order > 0 ? b.order : null
  if (oa !== null && ob !== null) return oa - ob
  if (oa !== null) return -1
  if (ob !== null) return 1
  return rankMember(a) - rankMember(b)
}

const pillars = [
  {
    title: "Human skills",
    text: "Psychology, communication, teamwork and a growth mindset, because engineering is done with other people.",
  },
  {
    title: "Purpose",
    text: "Knowing what you are building toward, up to the very large, ambitious projects we want to build together.",
  },
  {
    title: "Discipline",
    text: "Showing up every week and hitting your milestones, with people who hold you to them.",
  },
]

function PersonCard({ person, tone = "white", className = "" }: { person: TeamMember; tone?: "white" | "gray"; className?: string }) {
  return (
    <Card tone={tone} className={`group items-center p-6 text-center ${lift} ${className}`}>
      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#F7F7F7]">
        {/* Grey until the card is hovered or its link has focus, like the home hero */}
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="80px"
          className="object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0 group-focus-within:grayscale-0"
        />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold">{person.name}</h3>
      <p className="mt-1 flex-1 text-[13px] leading-snug text-[#5C5C5C]">{person.role}</p>
      {person.linkedin && (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Connect with ${person.name} on LinkedIn`}
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-[#404040] underline-offset-4 hover:text-[#0A0A0A] hover:underline"
        >
          <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
          Connect
        </a>
      )}
    </Card>
  )
}

const resources = [
  { title: "LeetCode Templates", desc: "Battle-tested patterns for common interview problems", link: "https://resources.devweekends.com/resources/cp-dsa" },
  { title: "Study Schedules", desc: "Winner study schedule templates with productivity frameworks", link: "https://resources.devweekends.com/productivity-sheets/overview" },
  { title: "Weekly Articles", desc: "Curated engineering articles shared every week", link: "https://resources.devweekends.com/resources/engineering-channels#weekly-engineering-articles-curated-learning-resources" },
  { title: "DSA Roadmap Repository", desc: "Structured path from basics to advanced algorithms", link: "https://github.com/devweekends/DW-Fellowship-DSA-Roadmap" },
  { title: "Interview Question Bank", desc: "MERN stack interview questions from real interviews", link: "https://resources.devweekends.com/resources/mern-interview-qs" },
  { title: "System Design", desc: "Design large systems and explain your trade-offs.", link: "https://resources.devweekends.com/system-design/overview" },
  { title: "Low-Level Design", desc: "Object-oriented design, patterns and clean code.", link: "https://resources.devweekends.com/lld/overview" },
  { title: "AI Engineering", desc: "Build with language models and AI tooling.", link: "https://resources.devweekends.com/ai-engineering/overview" },
  { title: "AWS", desc: "Core cloud services and how they fit together.", link: "https://resources.devweekends.com/aws/overview" },
  { title: "Operating Systems", desc: "Processes, memory, scheduling and files.", link: "https://resources.devweekends.com/operating-systems/overview" },
  { title: "DSA Patterns", desc: "Recognize the pattern, then solve the problem.", link: "https://resources.devweekends.com/dsa-patterns/overview" },
  { title: "Courses", desc: "Structured courses to learn step by step.", link: "https://resources.devweekends.com/courses" },
  { title: "Case Studies", desc: "Learn from real engineering write-ups.", link: "https://resources.devweekends.com/case-studies" },
]


export default function TeamPage() {
  const [coreTeam, setCoreTeam] = useState<TeamMember[]>([])
  const [loadingCore, setLoadingCore] = useState(true)

  useEffect(() => {
    fetch("/api/core-team")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return
        const list = data
          .filter((m) => m && m.name && !HIDDEN_MEMBERS.has(String(m.name).trim().toLowerCase()))
          .sort(compareMembers)
          .map((m) => ({ name: m.name, role: m.role || "", linkedin: m.linkedin || "", image: m.image || "/placeholder-avatar.jpg" }))
        setCoreTeam(list)
      })
      .catch(() => {})
      .finally(() => setLoadingCore(false))
  }, [])


  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Team"
        title="Built by people who learned here first"
        intro="A free, nonprofit community of engineers in 30 countries. Meet the mentors and the team, then read how we got here."
      />

      {/* Top mentors: one hand-scrolled row, in the order they are listed */}
      <Section id="mentors" tone="gray">
        <SectionHeading
          eyebrow="Top mentors"
          title="Learn from people who did it"
        />
        <Slider label="Top mentors" itemClassName="w-[220px]">
          {mentors.map((m) => (
            <PersonCard key={m.name} person={m} className="w-full" />
          ))}
        </Slider>
      </Section>

      {/* Core team: the operational team that runs Dev Weekends */}
      <Section id="team">
        <SectionHeading
          eyebrow="Core team"
          title="The team that runs Dev Weekends"
          intro="The people who keep programs, sessions and platforms running, week after week."
        />
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
            {coreTeam.map((m) => (
              <PersonCard key={m.name + m.role} person={m} tone="gray" />
            ))}
          </div>
        )}
      </Section>

      <Voices />

      {/* Impact and outcomes: the same sections as the homepage */}
      <Impact />
      <Outcomes />

      {/* The founder story is written separately and rendered here */}
      <FounderStory />

      {/* Pillars */}
      <Section id="philosophy" tone="gray">
        <SectionHeading eyebrow="Our philosophy" title="Engineering excellence rests on three pillars" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Card key={p.title} tone="bordered" className={lift}>
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">0{i + 1}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#404040]">{p.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Resources */}
      <Section>
        <SectionHeading
          eyebrow="Resources and tools"
          title="Free tools for your journey"
          intro="Free guides, roadmaps and question banks."
          action={
            <Button href="https://resources.devweekends.com" variant="secondary">
              All resources
            </Button>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Card key={r.title} href={r.link} tone="white" className="p-6">
              <h3 className="text-base font-semibold">{r.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5C5C5C]">{r.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                Access resource <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Card>
          ))}
        </div>
      </Section>

      <StartHere />
    </div>
  )
}
