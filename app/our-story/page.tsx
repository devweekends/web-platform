"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, X, Mail, Linkedin, Sun, Sunset, Moon } from "lucide-react"

export default function OurStoryPage() {
  const [showMentorModal, setShowMentorModal] = useState(false)
  const [showSponsorModal, setShowSponsorModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    members: 0,
    engineers: 0,
    centurions: 0,
    sessions: 0,
    placements: 0,
    views: 0,
    turing: 0,
    success: 0,
  })
  const statsRef = useRef<HTMLDivElement>(null)
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false)

  const animateStats = () => {
    const targets = {
      members: 20000,
      engineers: 800,
      centurions: 500,
      sessions: 200,
      placements: 1000,
      views: 50000,
      turing: 20,
      success: 67,
    }

    const duration = 2000
    const steps = 60
    const increment = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setAnimatedStats({
        members: Math.floor(targets.members * easeOut),
        engineers: Math.floor(targets.engineers * easeOut),
        centurions: Math.floor(targets.centurions * easeOut),
        sessions: Math.floor(targets.sessions * easeOut),
        placements: Math.floor(targets.placements * easeOut),
        views: Math.floor(targets.views * easeOut),
        turing: Math.floor(targets.turing * easeOut),
        success: Math.floor(targets.success * easeOut),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedStats(targets)
      }
    }, increment)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (statsRef.current && !hasAnimatedStats) {
        const rect = statsRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setHasAnimatedStats(true)
          animateStats()
        }
      }
    }

    const reveals = document.querySelectorAll('.reveal')
    const revealOnScroll = () => {
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight
        const elementTop = element.getBoundingClientRect().top
        const revealPoint = 150

        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('active')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', revealOnScroll)
    revealOnScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', revealOnScroll)
    }
  }, [hasAnimatedStats])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* ============================================
          SECTION 1: HERO - THE EMOTIONAL HOOK
          ============================================ */}
      <section className="relative min-h-[90vh] flex items-center py-12 md:py-16 px-6 lg:px-12 overflow-hidden">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        </div>

        <div className="max-w-[1100px] mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              {/* Main Headline */}
              <h1 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] tracking-tight mb-6">
                We Don&apos;t Just Teach Code.
                <br />
                We Build{" "}
                <span className="relative inline-block">
                  Engineers
                  <span className="absolute bottom-1 md:bottom-2 left-0 right-0 h-2 md:h-3 bg-yellow-300 -z-10"></span>
                </span>
                <br />
                Who Change Lives.
              </h1>

              {/* Subheadline */}
              <p className="text-muted-foreground max-w-[520px] mb-8 leading-relaxed">
                Join 20,000+ members and 800+ successful engineers who transformed their careers through
                FREE mentorship, world-class training, and a community that believes in giving back.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 mb-12">
                <Link 
                  href="/fellowship" 
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-semibold text-xs uppercase tracking-[2px] hover:opacity-90 transition-all"
                >
                  Join the Fellowship
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="https://discord.gg/Cy7Rgkf4Up" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 border border-foreground/20 font-semibold text-xs uppercase tracking-[2px] hover:border-foreground hover:bg-foreground hover:text-background transition-all"
                >
                  Join Discord
                </a>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: "7", label: "Countries" },
                  { number: "50+", label: "Universities" },
                  { number: "800+", label: "Engineers Trained" },
                  { number: "100%", label: "Free Forever" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
                    <div className="text-[10px] tracking-[2px] uppercase text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
              <Image 
                src="https://res.cloudinary.com/dcrgvq3lf/image/upload/v1748606356/about_img_lcygp4.jpg" 
                alt="Dev Weekends Community" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: OUR FOCUS AREAS
          ============================================ */}
      <section id="focus" className="py-12 md:py-16 px-6 lg:px-12 bg-muted/20">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-4">
              What We Teach
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-5">
              Our Focus Areas
            </h2>
            <p className="text-base text-muted-foreground max-w-[500px] mx-auto">
              Mentorship and sessions across various domains of technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {[
              { 
                title: "Software Engineering", 
                desc: "Web, Mobile, Desktop applications and full-stack development." 
              },
              { 
                title: "DSA & Competitive Programming", 
                desc: "Data Structures, Algorithms, and competitive programming contests." 
              },
              { 
                title: "DevOps & Cloud", 
                desc: "CI/CD, containerization, AWS, Azure, GCP, and cloud architecture." 
              },
              { 
                title: "Machine Learning/AI", 
                desc: "ML fundamentals, deep learning, NLP, and AI applications." 
              },
              { 
                title: "Open Source Programs", 
                desc: "GSoC, Hacktoberfest, Outreachy, and open source contributions." 
              },
              { 
                title: "Remote Jobs", 
                desc: "Remote opportunities, freelancing, and international careers." 
              },
            ].map((area, i) => (
              <div 
                key={i} 
                className="group bg-background border border-border p-6 hover:border-foreground/40 transition-all duration-300"
              >
                <h3 className="text-base font-bold mb-2 tracking-tight">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: THE PROBLEM WE SOLVE
          ============================================ */}
      <section className="py-12 md:py-16 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-4">
              The Gap We Bridge
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-5">
              Brilliant Minds. Broken System.
            </h2>
            <p className="text-base text-muted-foreground max-w-[500px] mx-auto">
              We produce exceptional talent. But talent alone doesn&apos;t build careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border reveal">
            {[
              { 
                num: "01",
                title: "The Education Gap", 
                text: "Universities teach syntax. Industry needs systems thinking, problem-solving, and the ability to build at scale." 
              },
              { 
                num: "02",
                title: "No Roadmap", 
                text: "Brilliant minds stuck without direction. No mentors to guide them toward global careers." 
              },
              { 
                num: "03",
                title: "Learning Alone", 
                text: "Self-learning without community means falling behind. No accountability, no support." 
              },
            ].map((problem, i) => (
              <div 
                key={i} 
                className="bg-background p-8 relative"
              >
                <span className="text-[72px] font-bold text-muted-foreground/30 leading-none block mb-4">
                  {problem.num}
                </span>
                <h3 className="text-base font-bold mb-3 tracking-tight">{problem.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{problem.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 py-8 bg-foreground text-background reveal">
            <p className="text-lg md:text-xl font-semibold">We built something different.</p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: THE THREE PILLARS PHILOSOPHY
          ============================================ */}
      <section id="philosophy" className="py-12 md:py-16 px-6 lg:px-12 bg-foreground text-background">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-background/40 mb-4">
              Our Philosophy
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-2">
              Engineering Excellence
            </h2>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight text-background/50">
              Requires Three Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 reveal">
            {[
              {
                num: "01",
                subtitle: "The WHY",
                title: "Purpose",
                tagline: "Find your 'why' before your 'what'",
                points: [
                  "Spiritual grounding and connection",
                  "Finding deeper purpose beyond a job",
                  "Building resilience through meaning",
                  "Daily reflection and intentional living",
                ],
              },
              {
                num: "02",
                subtitle: "The MINDSET",
                title: "Psychology",
                tagline: "Your mindset is your most important algorithm",
                points: [
                  "Dopamine management and discipline",
                  "Overcoming procrastination",
                  "Winner mentality and growth mindset",
                  "Handling rejection, building persistence",
                ],
              },
              {
                num: "03",
                subtitle: "The SKILLS",
                title: "Practice",
                tagline: "World-class engineering through deliberate practice",
                points: [
                  "Data Structures & Algorithms mastery",
                  "Real-world tech stack proficiency",
                  "System design and architecture",
                  "Open source contribution excellence",
                ],
              },
            ].map((pillar, i) => (
              <div 
                key={i} 
                className="border border-background/15 p-7 hover:border-background/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] text-background/30 tracking-[3px] font-medium">
                    PILLAR {pillar.num}
                  </span>
                </div>
                
                <p className="text-[10px] text-background/40 tracking-[2px] uppercase mb-1">
                  {pillar.subtitle}
                </p>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{pillar.title}</h3>
                <p className="text-sm text-background/60 mb-5 italic">&quot;{pillar.tagline}&quot;</p>
                
                <ul className="space-y-2.5">
                  {pillar.points.map((point, j) => (
                    <li key={j} className="text-sm text-background/60 flex items-start gap-2.5">
                      <span className="w-1 h-1 bg-background/30 mt-2 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 5: THE DEV WEEKENDS METHOD
          ============================================ */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-muted/20">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-4">
              The Dev Weekends Method
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-5">
              A Day in the Life of Transformation
            </h2>
            <p className="text-base text-muted-foreground max-w-[500px] mx-auto">
              Three talks. Three dimensions of growth. Every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-border reveal">
            {[
              { 
                time: "Morning", 
                title: "Mindset Talks", 
                desc: "Productivity hacks, discipline frameworks, and the psychology of high performers.",
                tags: ["Productivity", "Discipline", "Mindset"],
                icon: Sun
              },
              { 
                time: "Afternoon", 
                title: "Tech Talks", 
                desc: "Deep dives into system design, industry best practices, and technical skills.",
                tags: ["System Design", "DSA", "Industry Skills"],
                icon: Sunset
              },
              { 
                time: "Evening", 
                title: "Spiritual Talks", 
                desc: "Purpose, resilience, giving back, and building a life beyond code.",
                tags: ["Purpose", "Resilience", "Community"],
                icon: Moon
              },
            ].map((talk, i) => (
              <div 
                key={i} 
                className="p-8 bg-background"
              >
                <div className="flex items-center gap-2 mb-4">
                  <talk.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-semibold tracking-[2px] uppercase text-muted-foreground">
                    {talk.time}
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-3">{talk.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{talk.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {talk.tags.map((tag, j) => (
                    <span 
                      key={j} 
                      className="text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: THE 3-TRACK SYSTEM
          ============================================ */}
      <section id="tracks" className="py-12 md:py-16 px-6 lg:px-12 bg-foreground text-background">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-background/40 mb-4">
              Choose Your Path
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-4">
              Three Paths. One Mission.
            </h2>
            <p className="text-base text-background/60 max-w-[550px] mx-auto">
              Every path requires engineering excellence. The difference is where you want to go deep.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-background/10 reveal">
            {[
              {
                num: "01",
                title: "The Competitive Edge",
                tagline: "ICPC & Algorithmic Mastery",
                desc: "For those who want to compete at the highest level. Master algorithms, crack ICPC regionals, and compete in Meta Hacker Cup.",
                features: [
                  "Deep algorithmic problem solving",
                  "ICPC team formation & training",
                  "Meta Hacker Cup preparation",
                  "Codeforces rating progression",
                  "Advanced data structures",
                ],
                highlight: "ICPC Regionals | Div 1 Codeforces",
              },
              {
                num: "02",
                title: "The Balanced Engineer",
                tagline: "Engineering + Problem Solving",
                desc: "Excel in both worlds. Build production-grade products while maintaining strong DSA skills. Target remote roles and side projects.",
                features: [
                  "Full-stack product development",
                  "LeetCode 200+ problems mastery",
                  "GSoC + ICPC participation",
                  "Remote job interview prep",
                  "Side project to revenue",
                ],
                highlight: "Remote Roles | GSoC + ICPC",
              },
              {
                num: "03",
                title: "The Open Source Path",
                tagline: "Become a Global Contributor",
                desc: "Go deep into open source. Crack GSoC, LFX, Outreachy, and more. Build your reputation in the global developer community.",
                features: [
                  "GSoC proposal writing mastery",
                  "LFX Mentorship preparation",
                  "Outreachy application strategy",
                  "Open source contribution workflow",
                  "Building maintainer relationships",
                ],
                highlight: "3+ Programs/Year | Global Impact",
              },
            ].map((track, i) => (
              <div 
                key={i} 
                className="bg-foreground p-8 hover:bg-foreground/95 transition-all duration-300"
              >
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-background/30 mb-3 block">
                  Path {track.num}
                </span>
                <h3 className="text-lg font-bold tracking-tight mb-1">{track.title}</h3>
                <p className="text-xs text-background/50 font-medium mb-4">{track.tagline}</p>
                <p className="text-sm text-background/60 leading-relaxed mb-5">{track.desc}</p>
                
                <ul className="space-y-2 mb-6">
                  {track.features.map((f, j) => (
                    <li key={j} className="text-xs text-background/50 flex items-center gap-2">
                      <span className="w-1 h-1 bg-background/30"></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-background/10">
                  <span className="text-xs font-bold text-background/80">{track.highlight}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-background/40 mt-8 reveal">
            All paths include: Engineering fundamentals, mentorship, community support, and certification
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 7: THE FELLOWSHIP EXPERIENCE
          ============================================ */}
      <section id="fellowship" className="py-12 md:py-16 px-6 lg:px-12 bg-muted/20">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-4">
              The Fellowship
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-5">
              Your 4-Month Transformation
            </h2>
            <p className="text-base text-muted-foreground max-w-[500px] mx-auto">
              A structured journey from wherever you are to wherever you want to be
            </p>
          </div>

          {/* Journey Steps */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border mb-12 reveal">
            {[
              { num: "01", title: "Join a Clan", text: "Get assigned to one of 25 focused clans" },
              { num: "02", title: "Meet Your Mentors", text: "2-3 mentors per clan tracking progress" },
              { num: "03", title: "Weekly Tracking", text: "Progress reviews with accountability" },
              { num: "04", title: "Earn Certification", text: "Bronze, Silver, or Gold" },
            ].map((step, i) => (
              <div 
                key={i} 
                className="bg-background p-6 text-center"
              >
                <div className="text-4xl font-bold text-muted-foreground/30 mb-2">{step.num}</div>
                <h4 className="text-sm font-bold mb-1.5">{step.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border reveal">
            {[
              { 
                title: "Personal Mentor", 
                text: "1:1 guidance from engineers at top companies. Direct support." 
              },
              { 
                title: "30+ Live Sessions", 
                text: "DSA deep dives, engineering grinds, and mock interviews." 
              },
              { 
                title: "Up to 5 Mock Interviews", 
                text: "Practice with real engineers. Get feedback. Land your job." 
              },
            ].map((feature, i) => (
              <div key={i} className="bg-background p-7">
                <h4 className="text-sm font-bold mb-2">{feature.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Certification Tiers */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 reveal">
            {[
              { tier: "Bronze", color: "bg-amber-700", desc: "Core program completion" },
              { tier: "Silver", color: "bg-gray-400", desc: "Advanced projects + competitions" },
              { tier: "Gold", color: "bg-amber-500", desc: "GSoC/Major success + mentoring" },
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-4 p-5 border border-border">
                <div className={`w-8 h-8 ${cert.color} flex items-center justify-center flex-shrink-0`}>
                </div>
                <div>
                  <h4 className="text-sm font-bold">{cert.tier}</h4>
                  <p className="text-xs text-muted-foreground">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7.25: THE CIRCLES ECOSYSTEM
          ============================================ */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-muted/20">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-4">
              The Circles Ecosystem
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-4">
              Specialized Communities Within
            </h2>
            <p className="text-base text-muted-foreground max-w-[500px] mx-auto">
              Join focused circles based on your interests and goals
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 reveal">
            {[
              { title: "Open Source Alpha", desc: "Beginner open source contributors", color: "border-l-blue-500" },
              { title: "Open Source Beta", desc: "Intermediate contributors on real projects", color: "border-l-purple-500" },
              { title: "X-Team", desc: "Elite performers building production systems", color: "border-l-red-500" },
              { title: "Co-Working", desc: "Virtual sessions for focused productivity", color: "border-l-green-500" },
              { title: "ICPC Team", desc: "Competitive programming for ICPC", color: "border-l-orange-500" },
              { title: "GSoC Prep", desc: "Google Summer of Code preparation", color: "border-l-cyan-500" },
              { title: "Interview Prep", desc: "Mock interviews and placement prep", color: "border-l-pink-500" },
              { title: "2-Day Startup", desc: "Onsite weekend sprints to beat procrastination", color: "border-l-yellow-500" },
              { title: "Hackathon Circle", desc: "Building flawlessly engineered products", color: "border-l-emerald-500" },
              { title: "Weekend Deep-Dives", desc: "Topic-focused intensive sessions", color: "border-l-amber-500" },
              { title: "Remote Job Placement", desc: "Landing international remote opportunities", color: "border-l-teal-500" },
            ].map((circle, i) => (
              <div 
                key={i} 
                className={`bg-muted/30 p-5 border-l-4 ${circle.color} hover:bg-muted/50 transition-all duration-300`}
              >
                <h4 className="text-sm font-bold mb-1">{circle.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{circle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7.5: EVENTS CALENDAR
          ============================================ */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-foreground text-background">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left: Info */}
            <div className="lg:col-span-1 reveal">
              <p className="text-[11px] font-semibold tracking-[3px] uppercase text-background/40 mb-4">
                Stay Updated
              </p>
              <h2 className="text-[clamp(24px,3vw,36px)] font-bold tracking-tight mb-5">
                Never Miss a Session
              </h2>
              <p className="text-sm text-background/60 leading-relaxed mb-6">
                We host 3+ sessions every week—DSA deep dives, system design talks, 
                mock interviews, and mindset workshops. Subscribe to stay in the loop.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { day: "Mon - Fri", event: "Daily DSA & Mindset Talks" },
                  { day: "Weekends", event: "Deep Dive Sessions & Workshops" },
                  { day: "Monthly", event: "Industry Expert Masterclasses" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-background/30 w-20 flex-shrink-0 pt-0.5">
                      {item.day}
                    </span>
                    <span className="text-sm text-background/70">{item.event}</span>
                  </div>
                ))}
              </div>

              <a 
                href="https://calendar.google.com/calendar/u/0?cid=ZGV2d2Vla2VuZHNAZ21haWwuY29t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground font-semibold text-xs uppercase tracking-[1px] hover:opacity-90 transition-all"
              >
                Add to Your Calendar
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Right: Calendar Embed */}
            <div className="lg:col-span-2 reveal">
              <div className="border border-background/10 bg-background/5">
                <div className="aspect-[4/3] w-full">
                  <iframe
                    src="https://calendar.google.com/calendar/embed?src=devweekends%40gmail.com&ctz=Asia%2FKarachi&mode=AGENDA&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0"
                    style={{ border: 0 }}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 10: RESOURCES & TOOLS
          ============================================ */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-muted/20">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-4">
              Resources & Tools
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-5">
              Free Tools for Your Journey
            </h2>
            <p className="text-base text-muted-foreground max-w-[500px] mx-auto">
              Everything you need to succeed, curated by our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
            {[
              { 
                title: "LeetCode Templates", 
                desc: "Battle-tested patterns for common interview problems", 
                link: "https://resources.devweekends.com/resources/cp-dsa" 
              },
              { 
                title: "Study Schedules", 
                desc: "Winner study schedule templates with productivity frameworks", 
                link: "https://resources.devweekends.com/productivity-sheets/overview" 
              },
              { 
                title: "Weekly Articles", 
                desc: "Curated engineering articles shared every week", 
                link: "https://resources.devweekends.com/resources/engineering-channels#weekly-engineering-articles-curated-learning-resources" 
              },
              { 
                title: "DSA Roadmap Repository", 
                desc: "Structured path from basics to advanced algorithms", 
                link: "https://github.com/devweekends/DW-Fellowship-DSA-Roadmap" 
              },
              { 
                title: "Interview Question Bank", 
                desc: "MERN stack interview questions from real interviews", 
                link: "https://resources.devweekends.com/resources/mern-interview-qs" 
              },
              { 
                title: "Resume & Portfolio Templates", 
                desc: "ATS-friendly templates that get callbacks", 
                link: "https://resources.devweekends.com/resources/job-prep-branding" 
              },
            ].map((resource, i) => (
              <a 
                key={i}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-background p-5 border border-border hover:border-foreground/20 hover:shadow-sm transition-all duration-300 group block"
              >
                <h4 className="text-sm font-bold mb-2 group-hover:underline">{resource.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{resource.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  Access Resource <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 11: IMPACT DASHBOARD
          ============================================ */}
      <section id="impact" ref={statsRef} className="py-12 md:py-16 px-6 lg:px-12 bg-foreground text-background">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-background/40 mb-4">
              Our Impact
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight">
              Dev Weekends in Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-background/10 mb-16 reveal">
            {[
              { value: animatedStats.members, suffix: "K+", label: "Community Members", divisor: 1000 },
              { value: animatedStats.engineers, suffix: "+", label: "Engineers Trained", divisor: 1 },
              { value: animatedStats.centurions, suffix: "+", label: "LeetCode Centurions", divisor: 1 },
              { value: animatedStats.sessions, suffix: "+", label: "Sessions Delivered", divisor: 1 },
              { value: animatedStats.placements, suffix: "+", label: "Job Placements", divisor: 1 },
              { value: animatedStats.views, suffix: "K+", label: "YouTube Views", divisor: 1000 },
              { value: animatedStats.turing, suffix: "+", label: "Engineers at Turing", divisor: 1 },
              { value: animatedStats.success, suffix: "%", label: "Career Success Rate", divisor: 1 },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-foreground p-6 md:p-8 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  {Math.floor(stat.value / stat.divisor)}{stat.suffix}
                </div>
                <div className="text-[9px] tracking-[1.5px] uppercase text-background/40 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Success Stories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal">
            {[
              { 
                badge: "GSoC @ Chromium", 
                name: "Saqlain Nawaz", 
                desc: "From unknown to contributing to the world's most used browser." 
              },
              { 
                badge: "GSoC @ FOSSology", 
                name: "M. Salman", 
                desc: "Open source is the gateway to global opportunities." 
              },
              { 
                badge: "Industry Placement", 
                name: "M. Shehroz", 
                desc: "Fellowship to full-time in 4 months." 
              },
            ].map((story, i) => (
              <div 
                key={i} 
                className="border border-background/15 p-6 hover:border-background/30 transition-all duration-300"
              >
                <span className="text-[10px] font-bold tracking-[2px] uppercase text-background/60 mb-2 block">
                  {story.badge}
                </span>
                <h4 className="text-base font-bold mb-1">{story.name}</h4>
                <p className="text-xs text-background/50 leading-relaxed">{story.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 12: THE GIVING BACK MODEL
          ============================================ */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-muted/20">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-4">
              Why It&apos;s Free
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-6">
              It&apos;s Free Because We Believe
            </h2>
            <p className="text-lg md:text-xl font-medium max-w-[600px] mx-auto">
              &quot;Someone believed in us.{" "}
              <span className="text-muted-foreground">Now we pay it forward.</span>&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal">
            {[
              { 
                title: "10-15 Hours Weekly", 
                text: "Our mentors are working professionals who volunteer their time to build the next generation." 
              },
              { 
                title: "Equipment Sponsors", 
                text: "We sponsor laptops, registration fees, and resources for students who can't afford them." 
              },
              { 
                title: "The Chain Continues", 
                text: "Mentees become mentors. The cycle of giving back never stops." 
              },
            ].map((item, i) => (
              <div key={i} className="bg-muted/30 p-7 text-center">
                <h4 className="text-base font-bold tracking-tight mb-3">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 12.5: LEARN FROM INDUSTRY LEADERS
          ============================================ */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-muted/20">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-4">
              Expert Mentors
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-4">
              Learn from Industry Leaders
            </h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Our mentors are experienced professionals working at top companies, 
              sharing real-world insights and guiding you to success.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border reveal">
            {[
              {
                name: "Usman Sheikh",
                role: "Sr. Cloud Architect @ Microsoft",
                linkedin: "https://www.linkedin.com/in/usmanikramsheikh/",
                image: "/usman.jpg",
              },
              {
                name: "Zeeshan Adil",
                role: "Lead Engineer | Top Rated Plus",
                linkedin: "https://www.linkedin.com/in/zeeshanadilbutt/",
                image: "/zee.png",
              },
              {
                name: "Moeez Ahmad",
                role: "SWE @ Calo",
                linkedin: "https://www.linkedin.com/in/moeezahmad01/",
                image: "/m3.png",
              },
              {
                name: "Tanzeel Saleem",
                role: "Founder @ DevNexus",
                linkedin: "https://www.linkedin.com/in/tanzeel-saleem/",
                image: "/tanzeel.jpg",
              },
              {
                name: "Fiaz Ahmad",
                role: "Top Rated Plus @ Upwork",
                linkedin: "https://www.linkedin.com/in/fiazahmad/",
                image: "/m5.jpeg",
              },
              {
                name: "Muhammad Shehroz",
                role: "SWE @ Unanime Planet",
                linkedin: "https://www.linkedin.com/in/muhammad-shehroze",
                image: "/shehroz.png",
              },
              {
                name: "Abu Bakar",
                role: "SWE @ Salla Ecommerce",
                linkedin: "https://www.linkedin.com/in/iamaboubakar/",
                image: "/bakar.png",
              },
              {
                name: "Farooq Tahir",
                role: "Top Rated Plus @ Upwork",
                linkedin: "https://www.linkedin.com/in/farooqtahir/",
                image: "/farooq.png",
              },
            ].map((mentor, i) => (
              <div key={i} className="bg-background p-6 text-center group">
                <div className="w-20 h-20 mx-auto mb-4 relative overflow-hidden">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="font-semibold text-sm mb-1">{mentor.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{mentor.role}</p>
                <Link
                  href={mentor.linkedin}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-3 h-3" />
                  Connect
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 13: TESTIMONIALS / FELLOW VOICES
          ============================================ */}
      <section id="community" className="py-12 md:py-16 px-6 lg:px-12 bg-foreground text-background">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-background/40 mb-4">
              Fellow Voices
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight">
              What They Say About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 reveal">
            {[
              {
                quote: "Before joining the fellowship, my technical knowledge was limited to HTML, CSS, and JavaScript. Through the mentorship, resources, and structured guidance provided, I gained proficiency in React, Node.js, and the MERN stack as a whole. The fellowship also played a significant role in improving my confidence. In addition, the fellowship introduced me to Data Structures and Algorithms, an area where I had no prior experience. I am proud to have now solved over 100 problems.",
                name: "Henry Anomah Yeboah",
              },
              {
                quote: "At first, I thought that to grow in this field you just need to go deep into one technology and keep pushing until you become a pro. But through this fellowship, I understood that real growth means understanding concepts, applying them by building projects, and then moving on to new challenges. Along the way, I also realized the importance of consistency in coding practice and effective problem-solving strategies.",
                name: "Alisha Fatima",
              },
            ].map((testimonial, i) => (
              <div key={i} className="border border-background/15 p-7">
                <div className="text-3xl font-serif text-background/15 leading-none mb-4">&quot;</div>
                <p className="text-sm leading-relaxed mb-6 text-background/70">{testimonial.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-background/10">
                  <div className="w-8 h-8 bg-background/15 flex items-center justify-center font-bold text-xs">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 14: JOIN THE MOVEMENT (CTA)
          ============================================ */}
      <section id="apply" className="py-12 md:py-16 px-6 lg:px-12 text-center">
        <div className="max-w-[700px] mx-auto reveal">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight mb-5">
            Ready to Transform Your Career?
          </h2>
          <p className="text-base text-muted-foreground mb-12 leading-relaxed max-w-[550px] mx-auto">
            Join the community that has helped 800+ engineers level up. 
            It&apos;s free. It&apos;s intense. It works.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <Link 
              href="/fellowship" 
              className="group inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-semibold text-xs uppercase tracking-[2px] hover:opacity-90 transition-all"
            >
              Apply for Fellowship
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/mentorship" 
              className="inline-flex items-center gap-2 px-8 py-4 border border-foreground/20 font-semibold text-xs uppercase tracking-[2px] hover:border-foreground hover:bg-foreground hover:text-background transition-all"
            >
              Apply for Mentorship
            </Link>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border mb-12">
            {[
              { num: "1", text: "Join Discord" },
              { num: "2", text: "Complete Kickoff" },
              { num: "3", text: "Get Your Clan" },
              { num: "4", text: "Begin Journey" },
            ].map((step, i) => (
              <div key={i} className="p-5 bg-background">
                <div className="text-2xl font-bold text-muted-foreground/30 mb-1">{step.num}</div>
                <div className="text-xs font-medium text-muted-foreground">{step.text}</div>
              </div>
            ))}
          </div>

          {/* Become a Mentor */}
          <div className="pt-6 border-t border-border">
            <button 
              onClick={() => setShowMentorModal(true)}
              className="inline-flex items-center gap-2 text-foreground hover:underline font-medium text-sm"
            >
              Want to Become a Mentor?
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Mentor Modal */}
      {showMentorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMentorModal(false)}
          />
          <div className="relative bg-background border border-border max-w-md w-full p-8 shadow-2xl">
            <button 
              onClick={() => setShowMentorModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">Become a Mentor</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Share why you want to help the next generation of engineers and how your experience can make a difference.
              </p>
              
              <a 
                href="mailto:devweekends@gmail.com?subject=I%20Want%20to%20Become%20a%20Mentor&body=Hi%20Dev%20Weekends%20Team%2C%0A%0AI%20would%20like%20to%20become%20a%20mentor.%20Here%20is%20my%20story%3A%0A%0A[Please%20share%20your%20background%2C%20experience%2C%20and%20why%20you%20want%20to%20help]%0A%0ABest%20regards"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold text-xs uppercase tracking-[1px] hover:opacity-90 transition-all w-full justify-center mb-4"
              >
                <Mail className="w-4 h-4" />
                Write to Us
              </a>
              
              <p className="text-xs text-muted-foreground">
                Email us at <span className="font-semibold">devweekends@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sponsor Modal */}
      {showSponsorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSponsorModal(false)}
          />
          <div className="relative bg-background border border-border max-w-md w-full p-8 shadow-2xl">
            <button 
              onClick={() => setShowSponsorModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">Sponsor a Student</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Your sponsorship can change a student&apos;s life. Help us provide free education, 
                resources, and mentorship to underserved engineering students across Pakistan.
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 border border-border">
                  <div className="text-xl font-bold">$25</div>
                  <div className="text-xs text-muted-foreground">1 Month</div>
                </div>
                <div className="p-3 border border-border bg-foreground/5">
                  <div className="text-xl font-bold">$100</div>
                  <div className="text-xs text-muted-foreground">6 Months</div>
                </div>
                <div className="p-3 border border-border">
                  <div className="text-xl font-bold">$200</div>
                  <div className="text-xs text-muted-foreground">Full Year</div>
                </div>
              </div>
              
              <a 
                href="mailto:devweekends@gmail.com?subject=I%20Want%20to%20Sponsor%20a%20Student&body=Hi%20Dev%20Weekends%20Team%2C%0A%0AI%20would%20like%20to%20sponsor%20a%20student.%20Please%20share%20more%20details%20about%20how%20I%20can%20help.%0A%0ABest%20regards"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold text-xs uppercase tracking-[1px] hover:opacity-90 transition-all w-full justify-center mb-4"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
              
              <p className="text-xs text-muted-foreground">
                100% of donations go directly to student support
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowContactModal(false)}
          />
          <div className="relative bg-background border border-border max-w-md w-full p-8 shadow-2xl">
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">Contact Us</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Have questions about our programs? Want to collaborate or partner with us? 
                We&apos;d love to hear from you.
              </p>
              
              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-center gap-3 p-3 border border-border">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="text-sm font-medium">devweekends@gmail.com</div>
                  </div>
                </div>
              </div>
              
              <a 
                href="mailto:devweekends@gmail.com?subject=General%20Inquiry&body=Hi%20Dev%20Weekends%20Team%2C%0A%0A"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold text-xs uppercase tracking-[1px] hover:opacity-90 transition-all w-full justify-center mb-4"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
              
              <p className="text-xs text-muted-foreground">
                We typically respond within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}





