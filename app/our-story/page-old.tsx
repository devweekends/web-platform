"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
// import "./styles.css"

export default function OurStoryPage() {
  const [scrollY, setScrollY] = useState(0)
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
      setScrollY(window.scrollY)

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
    window.addEventListener('load', revealOnScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', revealOnScroll)
      window.removeEventListener('load', revealOnScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimatedStats])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative py-32 md:py-40 lg:py-48 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(0,0,0,0.02)_0%,transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(0,0,0,0.02)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-muted rounded-full text-xs font-semibold tracking-[2px] uppercase text-muted-foreground mb-10">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Your Gateway to Becoming a Better Software Engineer
            </div>

            <h1 className="hero-title text-[clamp(48px,8vw,96px)] mb-8 max-w-[1000px]">
              We Don&apos;t Just Teach Code.<br />
              We Build <span className="relative inline-block">
                Engineers
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#FFD700] opacity-60 -z-10"></span>
              </span><br />
              Who Change Lives.
            </h1>

            <p className="text-[clamp(18px,2.5vw,24px)] text-muted-foreground max-w-[640px] mb-12 leading-relaxed">
              Join 20,000+ students and 800+ successful engineers who transformed their careers through
              FREE mentorship, world-class training, and a community that believes in giving back.
            </p>

            <div className="flex flex-wrap gap-4 mb-20">
              <Link href="/fellowship" className="btn-primary">
                Join the Fellowship
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/mentorship" className="btn-secondary">
                Explore Mentorship
              </Link>
              <Link href="/ambassador-program" className="btn-secondary">
                Become Ambassador
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border border border-border">
              {[
                { number: '7', label: 'Countries' },
                { number: '50+', label: 'Universities' },
                { number: '800+', label: 'Engineers Trained' },
                { number: '100%', label: 'Free Forever' },
              ].map((stat, i) => (
                <div key={i} className="bg-background p-8 text-center">
                  <div className="text-5xl font-bold mb-2 section-title">{stat.number}</div>
                  <div className="text-xs tracking-[2px] uppercase text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Focus Areas */}
        <section className="py-32 px-6 lg:px-12 bg-muted/30">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20 reveal">
              <p className="section-eyebrow text-muted-foreground mb-6">What We Teach</p>
              <h2 className="section-title text-[clamp(36px,5vw,64px)] mb-6">Our Focus Areas</h2>
              <p className="text-xl text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
                We offer mentorship and sessions across various domains of technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
              {[
                { title: 'Software Engineering', desc: 'Web Application, Mobile Application, Desktop Application, and more.' },
                { title: 'DSA & Competitive Programming', desc: 'Data Structures, Algorithms, Problem Solving, and Competitive Programming Contests.' },
                { title: 'DevOps & Cloud', desc: 'CI/CD, Infrastructure as Code, Containerization, AWS, Azure, GCP, and Cloud Architecture.' },
                { title: 'Machine Learning/AI', desc: 'ML fundamentals, deep learning, NLP, computer vision, and AI applications.' },
                { title: 'Open Source Programs', desc: 'GSoC, Hacktoberfest, Outreachy, and other open source contribution programs.' },
                { title: 'Remote Jobs', desc: 'Remote job opportunities, freelancing, and international tech careers.' },
              ].map((area, i) => (
                <div key={i} className="bg-background border-2 border-border p-12 hover:border-foreground transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-32 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20 reveal">
              <p className="section-eyebrow text-muted-foreground mb-6">The Gap We Bridge</p>
              <h2 className="section-title text-[clamp(36px,5vw,64px)] mb-6">Brilliant Minds. Broken System.</h2>
              <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                We produce exceptional talent. But talent alone doesn&apos;t build careers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-border reveal">
              {[
                { num: '01', icon: '🎓', title: 'The Education Gap', text: 'Universities teach syntax. Industry needs systems thinking, problem-solving, and the ability to build at scale.' },
                { num: '02', icon: '🗺️', title: 'No Roadmap', text: 'Brilliant minds stuck without direction. No mentors to guide them toward global careers and international opportunities.' },
                { num: '03', icon: '🧍', title: 'Learning Alone', text: 'Self-learning without community means falling behind. No accountability, no support, no one to push you forward.' },
              ].map((problem, i) => (
                <div key={i} className="bg-background p-16 relative hover:bg-muted/50 transition-all duration-400">
                  <span className="problem-number absolute top-5 right-8 text-muted/5">{problem.num}</span>
                  <div className="w-12 h-12 flex items-center justify-center bg-foreground text-background text-2xl mb-8">
                    {problem.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem.text}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-20 p-16 bg-foreground text-background reveal">
              <p className="text-[clamp(24px,3vw,36px)] font-semibold section-title">We built something different.</p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-32 px-6 lg:px-12 bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-24 reveal">
              <p className="section-eyebrow text-background/60 mb-6">Our Philosophy</p>
              <h2 className="section-title text-[clamp(36px,5vw,64px)]">
                Engineering Excellence<br />Requires Three Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 reveal">
              {[
                {
                  num: 'PILLAR 01',
                  icon: '🎯',
                  title: 'Purpose',
                  subtitle: 'The WHY',
                  tagline: '"Find your \'why\' before your \'what\'"',
                  text: 'Every morning, we start with mindset. Why do you code? What problem do you want to solve? Purpose drives persistence when motivation fades.',
                },
                {
                  num: 'PILLAR 02',
                  icon: '🧠',
                  title: 'Psychology',
                  subtitle: 'The MINDSET',
                  tagline: '"Your mindset is your most important algorithm"',
                  text: 'Technical skills plateau without mental resilience. We build engineers who think like winners, handle rejection, and never stop growing.',
                },
                {
                  num: 'PILLAR 03',
                  icon: '⚡',
                  title: 'Practice',
                  subtitle: 'The SKILLS',
                  tagline: '"Deliberate, world-class skill building"',
                  text: '500+ LeetCode centurions. GSoC selections. Competition golds. We don\'t just practice—we practice with intention and intensity.',
                },
              ].map((pillar, i) => (
                <div key={i} className="border border-background/20 p-12 hover:border-background/60 hover:bg-background/5 transition-all duration-400">
                  <span className="text-xs text-background/60 tracking-[2px] mb-8 block">{pillar.num}</span>
                  <div className="w-16 h-16 border-2 border-[#FFD700] flex items-center justify-center text-3xl mb-8">
                    {pillar.icon}
                  </div>
                  <h3 className="pillar-title mb-4">{pillar.title}</h3>
                  <p className="text-base text-[#FFD700] mb-6 italic">{pillar.tagline}</p>
                  <p className="text-background/70 leading-relaxed">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Method Section */}
        <section className="py-32 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-20 reveal">
              <p className="section-eyebrow text-muted-foreground mb-6">The Dev Weekends Method</p>
              <h2 className="section-title text-[clamp(36px,5vw,64px)] mb-6">A Day in the Life of Transformation</h2>
              <p className="text-xl text-muted-foreground max-w-[800px]">
                Three talks. Three dimensions of growth. Every single day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 reveal">
              {[
                { time: 'Morning + Breakfast', title: 'MINDSET TALKS', desc: 'Start with purpose. Productivity hacks, discipline frameworks, and the psychology of high performers.', tags: ['Productivity', 'Discipline', 'Winner Mentality'] },
                { time: 'Lunch Sessions', title: 'TECH TALKS', desc: 'Deep dives into system design, industry best practices, and the technical skills that get you hired.', tags: ['System Design', 'DSA', 'Industry Skills'] },
                { time: 'Evening + Dinner', title: 'SPIRITUAL TALKS', desc: 'End with reflection. Purpose, resilience, giving back, and building a life beyond code.', tags: ['Purpose', 'Resilience', 'Community'] },
              ].map((talk, i) => (
                <div key={i} className="p-16 border border-border hover:bg-muted/50 transition-all duration-300">
                  <span className="text-[11px] font-semibold tracking-[2px] uppercase text-muted-foreground mb-6 block">{talk.time}</span>
                  <h3 className="text-[28px] font-bold tracking-tight mb-4">{talk.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{talk.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {talk.tags.map((tag, j) => (
                      <span key={j} className="text-[11px] font-semibold tracking-wider uppercase px-4 py-2 bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fellowship Section */}
        <section id="fellowship" className="py-32 px-6 lg:px-12 bg-muted/30">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20 reveal">
              <p className="section-eyebrow text-muted-foreground mb-6">The Fellowship</p>
              <h2 className="section-title text-[clamp(36px,5vw,64px)] mb-6">Your 4-Month Transformation</h2>
              <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                A structured journey from wherever you are to wherever you want to be.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 reveal">
              {[
                { num: '01', title: 'Join a Clan', text: 'Get assigned to one of 25 focused clans with personalized mentorship' },
                { num: '02', title: 'Weekly Tracking', text: 'Progress reviews, accountability partners, and milestone celebrations' },
                { num: '03', title: 'Mock Interviews', text: 'Up to 5 mock interviews with real engineers from top companies' },
                { num: '04', title: 'Certification', text: 'Earn Bronze, Silver, or Gold based on your dedication and growth' },
              ].map((step, i) => (
                <div key={i} className="bg-background p-10 text-center hover:translate-y-[-8px] hover:shadow-2xl transition-all duration-300">
                  <div className="text-[64px] leading-none font-bold text-muted/20 mb-4 section-title">{step.num}</div>
                  <h4 className="text-lg font-bold mb-3 tracking-tight">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-border reveal">
              {[
                { icon: '👥', title: 'Personal Mentor', text: '1:1 guidance from engineers at top companies who volunteer their time' },
                { icon: '📊', title: '30+ Live Sessions', text: 'DSA deep dives, engineering grinds, and capstone project guidance' },
                { icon: '🔗', title: 'Circles Ecosystem', text: 'Alpha/Beta Open Source, X-Team, co-working sessions, and specialized tracks' },
              ].map((feature, i) => (
                <div key={i} className="bg-background p-12 flex gap-6 items-start">
                  <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center flex-shrink-0 text-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Dashboard */}
        <section id="impact" ref={statsRef} className="py-32 px-6 lg:px-12 bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20 reveal">
              <p className="section-eyebrow text-background/60 mb-6">Our Impact</p>
              <h2 className="section-title text-[clamp(36px,5vw,64px)]">Dev Weekends in Numbers</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-background/20 mb-20 reveal">
              {[
                { value: animatedStats.members, suffix: 'K+', label: 'Community Members', divisor: 1000 },
                { value: animatedStats.engineers, suffix: '+', label: 'Engineers Trained', divisor: 1 },
                { value: animatedStats.centurions, suffix: '+', label: 'LeetCode Centurions', divisor: 1 },
                { value: animatedStats.sessions, suffix: '+', label: 'Sessions Delivered', divisor: 1 },
                { value: animatedStats.placements, suffix: '+', label: 'Job Placements', divisor: 1 },
                { value: animatedStats.views, suffix: 'K+', label: 'YouTube Views', divisor: 1000 },
                { value: animatedStats.turing, suffix: '+', label: 'Engineers at Turing', divisor: 1 },
                { value: animatedStats.success, suffix: '%', label: 'Career Success Rate', divisor: 1 },
              ].map((stat, i) => (
                <div key={i} className="bg-foreground p-12 text-center hover:bg-background/5 transition-all duration-300">
                  <div className="impact-number text-[56px] mb-2 bg-gradient-to-br from-background to-background/40 bg-clip-text text-transparent">
                    {Math.floor(stat.value / stat.divisor)}{stat.suffix}
                  </div>
                  <div className="text-xs tracking-[2px] uppercase text-background/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
              {[
                { badge: 'GSoC Success', name: 'Saqlain Nawaz', desc: 'Google Summer of Code @ Chromium. From unknown to contributing to the world\'s most used browser.' },
                { badge: 'Open Source', name: 'M. Salman', desc: 'GSoC @ FOSSology. Proving that open source is the gateway to global opportunities.' },
                { badge: 'Industry Placement', name: 'M. Shehroz', desc: 'Software Engineer @ Unanime Planet. From fellowship to full-time in 4 months.' },
              ].map((story, i) => (
                <div key={i} className="border border-background/20 p-10 hover:border-[#FFD700] hover:bg-background/5 transition-all duration-400">
                  <span className="text-[11px] font-bold tracking-[2px] uppercase text-[#FFD700] mb-4 block">{story.badge}</span>
                  <h4 className="text-[22px] font-bold mb-2">{story.name}</h4>
                  <p className="text-sm text-background/70 leading-relaxed">{story.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tracks Section */}
        <section id="tracks" className="py-32 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20 reveal">
              <p className="section-eyebrow text-muted-foreground mb-6">Learning Tracks</p>
              <h2 className="section-title text-[clamp(36px,5vw,64px)] mb-6">Choose Your Path</h2>
              <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                Structured tracks designed for different goals and experience levels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
              {[
                {
                  label: 'Foundation Track',
                  title: 'DSA & Competitive',
                  desc: 'From basics to advanced patterns. Build the problem-solving muscle that gets you through any technical interview.',
                  levels: ['Level 0: Basics', 'Level 1: 100 Problems', 'Level 2: 250+ Advanced'],
                },
                {
                  label: 'Professional Track',
                  title: 'Engineering Grind',
                  desc: 'Full-stack development with real projects. Frontend, backend, DevOps, and everything in between.',
                  levels: ['Frontend', 'Backend', 'Full-Stack', 'DevOps'],
                },
                {
                  label: 'Competition Track',
                  title: 'ICPC & Contests',
                  desc: 'Train for Meta Hacker Cup, Google Code Jam, Codeforces, and international programming competitions.',
                  levels: ['Contest Prep', 'ICPC Training', 'Hacker Cup'],
                },
                {
                  label: 'Open Source Track',
                  title: 'GSoC & Contributions',
                  desc: 'Learn to contribute to open source. Prepare for GSoC, LFX Mentorship, and build a global portfolio.',
                  levels: ['Alpha (Beginner)', 'Beta (Intermediate)', 'X-Team (Advanced)'],
                },
              ].map((track, i) => (
                <div key={i} className="border-2 border-border p-12 hover:border-foreground transition-all duration-300">
                  <span className="text-[11px] font-bold tracking-[2px] uppercase text-muted-foreground mb-4 block">{track.label}</span>
                  <h3 className="text-[28px] font-bold tracking-tight mb-4">{track.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{track.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {track.levels.map((level, j) => (
                      <span key={j} className="px-4 py-2.5 bg-muted text-sm font-semibold text-muted-foreground">
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Giving Back Section */}
        <section className="py-32 px-6 lg:px-12 bg-muted/30">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20 reveal">
              <p className="section-eyebrow text-muted-foreground mb-6">Why It&apos;s Free</p>
              <h2 className="section-title text-[clamp(36px,5vw,64px)] mb-16">It&apos;s Free Because We Believe</h2>
            </div>

            <p className="text-center text-[clamp(24px,3vw,40px)] font-semibold tracking-tight mb-20 reveal">
              &quot;Someone believed in us. <span className="text-muted-foreground">Now we pay it forward.</span>&quot;
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
              {[
                { icon: '⏰', title: '10-15 Hours Weekly', text: 'Our mentors are working professionals who volunteer their evenings and weekends to build the next generation.' },
                { icon: '💻', title: 'Equipment Sponsors', text: 'We sponsor laptops, competition fees, and resources for underprivileged students who can\'t afford them.' },
                { icon: '🔄', title: 'The Chain Continues', text: 'Mentees become mentors. The cycle of giving back never stops. One day, you\'ll lead someone too.' },
              ].map((item, i) => (
                <div key={i} className="bg-background p-12 text-center">
                  <div className="w-20 h-20 mx-auto bg-foreground text-background flex items-center justify-center text-[32px] mb-6">
                    {item.icon}
                  </div>
                  <h4 className="text-[22px] font-bold tracking-tight mb-3">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="community" className="py-32 px-6 lg:px-12 bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20 reveal">
              <p className="section-eyebrow text-background/60 mb-6">Community Voices</p>
              <h2 className="section-title text-[clamp(36px,5vw,64px)]">What They Say About Us</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
              {[
                {
                  quote: 'The fellowship didn\'t just teach me to code. It taught me to think, build, and ship. I landed my first job within a month of completing.',
                  initials: 'AK',
                  name: 'Ahmed Khan',
                  role: 'SWE @ Careem • Cohort 2024',
                },
                {
                  quote: 'I went from 0 LeetCode to 150+ problems in 3 months. The accountability and community made all the difference. Now I\'m at Turing.',
                  initials: 'SF',
                  name: 'Sara Fatima',
                  role: 'Engineer @ Turing • Cohort 2023',
                },
                {
                  quote: 'GSoC seemed impossible before Dev Weekends. The mentors guided me step by step. Now I\'m contributing to Chromium.',
                  initials: 'SN',
                  name: 'Saqlain Nawaz',
                  role: 'GSoC @ Chromium • Cohort 2024',
                },
              ].map((testimonial, i) => (
                <div key={i} className="border border-background/20 p-12">
                  <div className="text-[80px] font-serif text-background/20 leading-none mb-4">&quot;</div>
                  <p className="text-base leading-relaxed mb-8 text-background/90">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-background/20 flex items-center justify-center font-bold text-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{testimonial.name}</div>
                      <div className="text-xs text-background/60">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="apply" className="py-32 px-6 lg:px-12 text-center">
          <div className="max-w-[800px] mx-auto reveal">
            <h2 className="section-title text-[clamp(40px,6vw,72px)] mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Join the community that has helped 800+ engineers level up. It&apos;s free. It&apos;s intense. It works.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link href="/fellowship" className="btn-primary">
                Apply for Fellowship 2025-26
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/mentorship" className="btn-secondary">
                Apply for Mentorship
              </Link>
              <a href="https://linktr.ee/DevWeekends" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Join Discord Community
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { num: '1', text: 'Join Discord' },
                { num: '2', text: 'Complete Kickoff' },
                { num: '3', text: 'Get Your Clan' },
                { num: '4', text: 'Begin Journey' },
              ].map((step, i) => (
                <div key={i} className="p-6">
                  <div className="text-[48px] font-bold text-muted/20 mb-2 section-title">{step.num}</div>
                  <div className="text-sm font-medium text-muted-foreground">{step.text}</div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link href="/mentorship" className="inline-flex items-center gap-2 text-foreground hover:underline font-semibold">
                Want to Become a Mentor?
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }
