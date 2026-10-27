"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ExternalLink, Linkedin, Mail, Moon, Sun, Sunset, X } from "lucide-react"

import HomeImpact from "@/components/home-impact"
import { LINKS } from "@/components/home/data"
import { SmartLink } from "@/components/home/smart-link"
import { Button, Card, Eyebrow, Panel, Section, SectionHeading, PageHero } from "@/components/site/page-kit"
import { FounderStory } from "@/components/story/founder-story"

const lift = "motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)]"

const team = [
  { name: "Usman Sheikh", role: "Sr. Cloud Architect @ Microsoft", linkedin: "https://www.linkedin.com/in/usmanikramsheikh/", image: "/usman.jpg" },
  { name: "Zeeshan Adil", role: "Lead Engineer | Top 1% on Upwork, Expert-Vetted | ex-UN", linkedin: "https://www.linkedin.com/in/zeeshanadilbutt/", image: "/zee.png" },
  { name: "Moeez Ahmad", role: "SWE @ Calo", linkedin: "https://www.linkedin.com/in/moeezahmad01/", image: "/m3.png" },
  { name: "Tanzeel Saleem", role: "Founder @ DevNexus", linkedin: "https://www.linkedin.com/in/tanzeel-saleem/", image: "/tanzeel.jpg" },
  { name: "Fiaz Ahmad", role: "Top Rated Plus @ Upwork", linkedin: "https://www.linkedin.com/in/fiazahmad/", image: "/m5.jpeg" },
  { name: "Muhammad Shehroz", role: "SWE @ Unanime Planet", linkedin: "https://www.linkedin.com/in/muhammad-shehroze", image: "/shehroz.png" },
  { name: "Abu Bakar", role: "SWE @ Salla Ecommerce", linkedin: "https://www.linkedin.com/in/iamaboubakar/", image: "/bakar.png" },
  { name: "Farooq Tahir", role: "Top Rated Plus @ Upwork", linkedin: "https://www.linkedin.com/in/farooqtahir/", image: "/farooq.png" },
]

const moreNumbers = [
  { value: "500+", label: "LeetCode centurions" },
  { value: "200+", label: "Sessions delivered" },
  { value: "400+", label: "Job placements, remote and local" },
  { value: "65K+", label: "YouTube views" },
  { value: "442", label: "Projects shipped last cohort" },
]

const stories = [
  { badge: "GSoC @ Chromium", name: "Saqlain Nawaz", desc: "From unknown to contributing to the world's most used browser." },
  { badge: "GSoC @ FOSSology", name: "M. Salman", desc: "Open source is the gateway to global opportunities." },
  { badge: "Industry Placement", name: "M. Shehroz", desc: "Fellowship to full-time in 4 months." },
]

const gaps = [
  { title: "The education gap", text: "Universities teach syntax. Industry needs systems thinking, problem-solving, and the ability to build at scale." },
  { title: "No roadmap", text: "Brilliant minds stuck without direction. No mentors to guide them toward global careers." },
  { title: "Learning alone", text: "Self-learning without community means falling behind. No accountability, no support." },
]

const pillars = [
  {
    title: "Human skills",
    text: "The human side of engineering: psychology, communication, teamwork and a growth mindset.",
  },
  {
    title: "Purpose",
    text: "A reason big enough to keep going when the work gets hard.",
  },
  {
    title: "Discipline",
    text: "High-impact, hard-working, consistent discipline. Show up every day and do the work.",
  },
]

const dayTalks = [
  { time: "Morning", title: "Mindset talks", desc: "Productivity hacks, discipline frameworks, and the psychology of high performers.", icon: Sun },
  { time: "Afternoon", title: "Tech talks", desc: "Deep dives into system design, industry best practices, and technical skills.", icon: Sunset },
  { time: "Evening", title: "Spiritual talks", desc: "Purpose, resilience, giving back, and building a life beyond code.", icon: Moon },
]

const fellowshipSteps = [
  { title: "Join a clan", text: "Get assigned to one of 25 focused clans" },
  { title: "Meet your mentors", text: "2-3 mentors per clan tracking progress" },
  { title: "Weekly tracking", text: "Progress reviews with accountability" },
  { title: "Earn certification", text: "Bronze, Silver, or Gold" },
]

const fellowshipFeatures = [
  { title: "Personal mentor", text: "1:1 guidance from engineers at top companies. Direct support." },
  { title: "30+ live sessions", text: "DSA deep dives, engineering grinds, and mock interviews." },
  { title: "Up to 5 mock interviews", text: "Practice with real engineers. Get feedback. Land your job." },
]

const tiers = [
  { tier: "Bronze", desc: "Core program completion" },
  { tier: "Silver", desc: "Advanced projects and competitions" },
  { tier: "Gold", desc: "GSoC or major success, plus mentoring" },
]

const circleNames = [
  "Open Source Alpha",
  "Open Source Beta",
  "X-Team",
  "Co-Working",
  "ICPC Team",
  "GSoC Prep",
  "Interview Prep",
  "2-Day Startup",
  "Hackathon Circle",
  "Weekend Deep-Dives",
  "Remote Job Placement",
]

const schedule = [
  { day: "Mon to Fri", event: "Daily DSA and mindset talks" },
  { day: "Weekends", event: "Deep dive sessions and workshops" },
  { day: "Monthly", event: "Industry expert masterclasses" },
]

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

const giveBack = [
  { title: "10-15 hours weekly", text: "Our mentors are working professionals who volunteer their time to build the next generation." },
  { title: "Equipment sponsors", text: "We sponsor laptops, registration fees, and resources for students who can't afford them." },
  { title: "The chain continues", text: "Mentees become mentors. The cycle of giving back never stops." },
]

const testimonials = [
  {
    quote:
      "Before joining the fellowship, my technical knowledge was limited to HTML, CSS, and JavaScript. Through the mentorship, resources, and structured guidance provided, I gained proficiency in React, Node.js, and the MERN stack as a whole. The fellowship also played a significant role in improving my confidence. In addition, the fellowship introduced me to Data Structures and Algorithms, an area where I had no prior experience. I am proud to have now solved over 100 problems.",
    name: "Henry Anomah Yeboah",
  },
  {
    quote:
      "At first, I thought that to grow in this field you just need to go deep into one technology and keep pushing until you become a pro. But through this fellowship, I understood that real growth means understanding concepts, applying them by building projects, and then moving on to new challenges. Along the way, I also realized the importance of consistency in coding practice and effective problem-solving strategies.",
    name: "Alisha Fatima",
  },
]

const joinSteps = ["Join Discord", "Complete Kickoff", "Get Your Clan", "Begin Journey"]

const mentorMailto =
  "mailto:devweekends@gmail.com?subject=I%20Want%20to%20Become%20a%20Mentor&body=Hi%20Dev%20Weekends%20Team%2C%0A%0AI%20would%20like%20to%20become%20a%20mentor.%20Here%20is%20my%20story%3A%0A%0A[Please%20share%20your%20background%2C%20experience%2C%20and%20why%20you%20want%20to%20help]%0A%0ABest%20regards"

export default function OurStoryPage() {
  const [showMentorModal, setShowMentorModal] = useState(false)

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
        eyebrow="Our story"
        title="We build engineers who change lives."
        intro="Dev Weekends is an international community, founded in 2018, that started in Pakistan. Free mentorship, a structured fellowship, and engineers who walked the road before you. Join 30,000+ members. It costs nothing."
        actions={
          <>
            <Button href={LINKS.fyp}>Explore FYP Mentorship</Button>
            <Button href={LINKS.discord} variant="secondary">
              Join Discord
            </Button>
          </>
        }
      />

      {/* The founder story is written separately and rendered here */}
      <FounderStory />

      {/* The team */}
      <Section id="team" tone="gray">
        <SectionHeading
          eyebrow="The team"
          title="Learn from people who did it"
          intro="Experienced professionals working at top companies, sharing real-world insights."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {team.map((m) => (
            <Card key={m.name} tone="white" className={`items-center p-6 text-center ${lift}`}>
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#F7F7F7]">
                <Image src={m.image} alt={m.name} fill sizes="80px" className="object-cover object-top grayscale" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold">{m.name}</h3>
              <p className="mt-1 flex-1 text-[13px] leading-snug text-[#5C5C5C]">{m.role}</p>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with ${m.name} on LinkedIn`}
                className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-[#404040] underline-offset-4 hover:text-[#0A0A0A] hover:underline"
              >
                <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                Connect
              </a>
            </Card>
          ))}
        </div>
      </Section>

      {/* Impact: outcomes (id="impact"), economy panel and scale */}
      <HomeImpact />

      {/* More numbers and stories */}
      <Section id="numbers">
        <SectionHeading eyebrow="Our impact" title="Dev Weekends in numbers" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {moreNumbers.map((s, i) => (
            <Card key={s.label} tone="gray" className={i === moreNumbers.length - 1 ? "col-span-2 sm:col-span-1" : ""}>
              <div className="text-[34px] font-semibold leading-none tracking-[-0.04em]">{s.value}</div>
              <div className="mt-2 text-sm leading-snug text-[#5C5C5C]">{s.label}</div>
            </Card>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {stories.map((s) => (
            <Card key={s.name} tone="bordered" className={lift}>
              <Eyebrow>{s.badge}</Eyebrow>
              <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#404040]">{s.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* The gap */}
      <Section tone="gray">
        <SectionHeading
          eyebrow="The gap we bridge"
          title="Brilliant minds. Broken system."
          intro="We produce exceptional talent. But talent alone doesn't build careers. So we built something different."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {gaps.map((g) => (
            <Card key={g.title} tone="white" className={lift}>
              <h3 className="text-lg font-semibold">{g.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#404040]">{g.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pillars */}
      <Section id="philosophy">
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
        <p className="mt-8 max-w-[60ch] text-[19px] font-medium leading-[1.55]">
          The goal: building amazing, large-scale, ambitious projects.
        </p>

        <h3 className="mt-16 text-2xl font-semibold tracking-[-0.02em]">A day at Dev Weekends</h3>
        <p className="mt-2 text-[17px] text-[#5C5C5C]">Three talks. Three dimensions of growth. Every single day.</p>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {dayTalks.map((t) => (
            <Card key={t.title} tone="gray" className={lift}>
              <div className="flex items-center gap-2 text-[#5C5C5C]">
                <t.icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em]">{t.time}</span>
              </div>
              <h4 className="mt-3 text-lg font-semibold">{t.title}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-[#404040]">{t.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Fellowship */}
      <Section id="fellowship" tone="gray">
        <SectionHeading
          eyebrow="The fellowship"
          title="Your 4-month transformation"
          intro="A structured journey from wherever you are to wherever you want to be."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {fellowshipSteps.map((s, i) => (
            <Card key={s.title} tone="white">
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">Step {i + 1}</span>
              <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5C5C5C]">{s.text}</p>
            </Card>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {fellowshipFeatures.map((f) => (
            <Card key={f.title} tone="white">
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5C5C5C]">{f.text}</p>
            </Card>
          ))}
        </div>
        <Card tone="bordered" className="mt-4 gap-5 md:flex-row md:gap-10">
          {tiers.map((t) => (
            <div key={t.tier} className="flex-1">
              <h3 className="text-base font-semibold">{t.tier}</h3>
              <p className="mt-1 text-sm text-[#5C5C5C]">{t.desc}</p>
            </div>
          ))}
        </Card>

        <h3 className="mt-14 text-2xl font-semibold tracking-[-0.02em]">Circles inside the community</h3>
        <p className="mt-2 max-w-[56ch] text-[17px] text-[#5C5C5C]">
          Join focused circles based on your interests and goals.{" "}
          <SmartLink href="/about#circles" className="font-semibold text-[#0A0A0A] underline underline-offset-4">
            See what each one does
          </SmartLink>
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {circleNames.map((c) => (
            <li key={c} className="rounded-full border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-medium text-[#404040]">
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {/* Events */}
      <Section>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
          <div>
            <Eyebrow>Stay updated</Eyebrow>
            <h2 className="mt-3.5 text-[clamp(28px,3vw,40px)] font-semibold leading-[1.05] tracking-[-0.04em]">Never miss a session</h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#5C5C5C]">
              We host 3+ sessions every week: DSA deep dives, system design talks, mock interviews, and mindset workshops.
            </p>
            <dl className="mt-6 space-y-3">
              {schedule.map((s) => (
                <div key={s.day} className="flex gap-4 text-[15px]">
                  <dt className="w-24 shrink-0 font-semibold text-[#0A0A0A]">{s.day}</dt>
                  <dd className="text-[#404040]">{s.event}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <Button href="https://calendar.google.com/calendar/u/0?cid=ZGV2d2Vla2VuZHNAZ21haWwuY29t">
                Add to your calendar
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-[#E6E6E6] lg:col-span-2">
            <div className="aspect-[4/3] w-full">
              <iframe
                title="Dev Weekends events calendar"
                src="https://calendar.google.com/calendar/embed?src=devweekends%40gmail.com&ctz=Asia%2FKarachi&mode=AGENDA&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0"
                style={{ border: 0 }}
                width="100%"
                height="100%"
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Resources */}
      <Section tone="gray">
        <SectionHeading
          eyebrow="Resources and tools"
          title="Free tools for your journey"
          intro="Everything you need to succeed, curated by our community."
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

      {/* Why it is free: the second and last black panel */}
      <Panel>
        <Eyebrow onDark>Why it&apos;s free</Eyebrow>
        <h2 className="mt-3.5 max-w-[20ch] text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
          Someone believed in us. <span className="text-[#8A8A8A]">Now we pay it forward.</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {giveBack.map((g) => (
            <div key={g.title} className="rounded-[20px] bg-[#161616] p-7">
              <h3 className="text-lg font-semibold">{g.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#C7C7C7]">{g.text}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Fellow voices */}
      <Section id="community">
        <SectionHeading eyebrow="Fellow voices" title="What they say about us" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.name} tone="gray">
              <blockquote className="flex-1 text-[15px] leading-[1.7] text-[#404040]">&ldquo;{t.quote}&rdquo;</blockquote>
              <p className="mt-6 border-t border-[#E6E6E6] pt-4 text-sm font-semibold">{t.name}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Join */}
      <Section id="apply" tone="gray">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">Ready to transform your career?</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-[#5C5C5C]">
            Join the community that has helped 1,000+ engineers level up. It&apos;s free. It&apos;s intense. It works.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={LINKS.fyp}>Explore FYP Mentorship</Button>
            <Button href={LINKS.discord} variant="secondary">
              Join Discord
            </Button>
          </div>
          <ol className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {joinSteps.map((s, i) => (
              <li key={s} className="rounded-[20px] bg-white p-5 text-left">
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">Step {i + 1}</span>
                <p className="mt-2 text-sm font-semibold">{s}</p>
              </li>
            ))}
          </ol>
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
