"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ExternalLink, Linkedin, Mail, X } from "lucide-react"

import HomeImpact from "@/components/home-impact"
import { Button, Card, Section, SectionHeading, PageHero } from "@/components/site/page-kit"
import { JoinCta } from "@/components/site/join-cta"
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
const HIDDEN_MEMBERS = new Set(["muhammad ali", "muhammad faraz"])

// Mentors on board: working engineers who volunteer. The operational core team is loaded from the database.
const mentors: TeamMember[] = [
  { name: "Usman Sheikh", role: "Sr. Cloud Architect @ Microsoft", linkedin: "https://www.linkedin.com/in/usmanikramsheikh/", image: "/usman.jpg" },
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

function PersonCard({ person }: { person: TeamMember }) {
  return (
    <Card tone="white" className={`items-center p-6 text-center ${lift}`}>
      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#F7F7F7]">
        <Image src={person.image} alt={person.name} fill sizes="80px" className="object-cover object-top grayscale" />
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

const mentorMailto =
  "mailto:devweekends@gmail.com?subject=I%20Want%20to%20Become%20a%20Mentor&body=Hi%20Dev%20Weekends%20Team%2C%0A%0AI%20would%20like%20to%20become%20a%20mentor.%20Here%20is%20my%20story%3A%0A%0A[Please%20share%20your%20background%2C%20experience%2C%20and%20why%20you%20want%20to%20help]%0A%0ABest%20regards"

export default function TeamPage() {
  const [showMentorModal, setShowMentorModal] = useState(false)
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

  useEffect(() => {
    if (!showMentorModal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowMentorModal(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [showMentorModal])

  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Team"
        title="Built by people who learned here first"
        intro="A free, nonprofit community of engineers in 30 countries. Meet the team and the mentors, then read how we got here."
      />

      {/* Core team: the operational team that runs Dev Weekends */}
      <Section id="team" tone="gray">
        <SectionHeading
          eyebrow="Core team"
          title="The team that runs Dev Weekends"
          intro="The people who keep programs, sessions and platforms running, week after week."
        />
        {loadingCore ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-busy="true" aria-label="Loading the core team">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex animate-pulse flex-col items-center rounded-[20px] bg-white p-6">
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
              <PersonCard key={m.name + m.role} person={m} />
            ))}
          </div>
        )}
      </Section>

      {/* Mentors on board */}
      <Section id="mentors">
        <SectionHeading
          eyebrow="Mentors"
          title="Mentors on board"
          intro="Working engineers who volunteer 10 to 15 hours a week. Each of them was a mentee first."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {mentors.map((m) => (
            <PersonCard key={m.name} person={m} />
          ))}
        </div>
      </Section>

      {/* The founder story is written separately and rendered here */}
      <FounderStory />

      {/* Impact: outcomes (id="impact"), economy panel and scale */}
      <HomeImpact />

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

      {/* Join */}
      <Section id="apply" tone="gray">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">Start where you are.</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-[#5C5C5C]">
            Free, and open to anyone who will do the work.
          </p>
          <div className="mt-8">
            <JoinCta />
          </div>
          <div className="mt-10 border-t border-[#D4D4D4] pt-6">
            <button
              type="button"
              onClick={() => setShowMentorModal(true)}
              className="inline-flex min-h-11 items-center text-[15px] font-semibold underline underline-offset-4 hover:text-[#404040]"
            >
              Want to become a mentor?
            </button>
          </div>
        </div>
      </Section>

      {showMentorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="mentor-modal-title">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMentorModal(false)} aria-hidden="true" />
          <div className="relative w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowMentorModal(false)}
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-[#5C5C5C] transition-colors hover:bg-[#F7F7F7] hover:text-[#0A0A0A]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="text-center">
              <h3 id="mentor-modal-title" className="text-2xl font-semibold tracking-[-0.02em]">
                Become a mentor
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5C5C5C]">
                Share why you want to help the next generation of engineers and how your experience can make a difference.
              </p>
              <a
                href={mentorMailto}
                className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#0A0A0A] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-[#262626]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Write to us
              </a>
              <p className="mt-4 text-sm text-[#5C5C5C]">
                Email us at <span className="font-semibold text-[#0A0A0A]">devweekends@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
