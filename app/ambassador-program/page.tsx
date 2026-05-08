"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle,
  Compass,
  Gift,
  GraduationCap,
  Handshake,
  Megaphone,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react"

const APPLICATION_URL = "https://forms.gle/k8JtSqSh2SWVMwJ4A"

const stats = [
  {
    label: "Partner Campuses",
    target: 60,
    suffix: "+",
    blurb: "Universities already hosting Dev Weekends circles",
    icon: Users,
  },
  {
    label: "Local Tech Drives",
    target: 120,
    suffix: "+",
    blurb: "On-campus workshops and hacker meetups led by ambassadors",
    icon: Megaphone,
  },
  {
    label: "Industry Mentors",
    target: 45,
    suffix: "+",
    blurb: "Leaders you will collaborate with for university events",
    icon: Handshake,
  },
  {
    label: "Placement Impact",
    target: 92,
    suffix: "%",
    blurb: "Average placement success across partner campuses",
    icon: Trophy,
  },
]

const benefits = [
  {
    title: "All Fellowship Access",
    description:
      "Unlock everything Dev Weekends Certified Fellows enjoy — from masterclasses to private grind sessions — while you lead the charge on campus.",
    points: [
      "Free access to expert training and paid courses",
      "Dedicated mentorship pods and AMA sessions",
      "Priority seats in Fellowship grind cohorts",
    ],
    icon: GraduationCap,
  },
  {
    title: "Career Outcomes That Stick",
    description:
      "Turn campus momentum into real opportunities with referrals, interview prep, and data-backed success playbooks tailored by the core team.",
    points: [
      "Recommendations and personal referrals to companies",
      "Mock interviews and career sprint reviews",
      "Outcome-oriented OKRs and reporting support",
    ],
    icon: Award,
  },
  {
    title: "Community Leadership and Swag",
    description:
      "Deliver unforgettable experiences while earning recognition, spotlight features, and limited-edition ambassador goodies.",
    points: [
      "VIP access to all Dev Weekends events",
      "Ambassador swag kit: hoodie, stickers, and desk gear",
      "Monthly spotlights across Dev Weekends channels",
    ],
    icon: Gift,
  },
]

const ambassadorPerks = [
  "Free access to expert training",
  "Complimentary access to paid courses",
  "Direct entry into the partner network",
  "Membership in the mentor network",
  "Company recommendations from industry leaders",
  "Personal referrals to hiring partners",
  "VIP access to all Dev Weekends events",
  "Personalized mentorship and career roadmaps",
  "Mock interviews and structured career sprints",
  "Limited-edition Dev Weekends ambassador swag drops",
  "Seasonal goodies for top-performing ambassadors",
  "Spotlight features and recommendation letters from Dev Weekends leadership",
]

const responsibilities = [
  {
    title: "Lead Local Chapters",
    description:
      "Shape vibrant student communities by driving weekly tech circles, hack nights, and outcome-focused learning sprints.",
    items: [
      "Host at least two learning circles per month",
      "Onboard 50+ active learners every quarter",
      "Share campus stories and wins with the Dev Weekends marketing team",
    ],
    icon: Compass,
  },
  {
    title: "Grow Real Opportunities",
    description:
      "Bridge students with mentors, recruiters, and partner startups while advocating for the right learning pathways.",
    items: [
      "Coordinate mentor AMAs and placement clinics",
      "Nominate standout students for scholarships",
      "Manage the campus ambassador task board and KPIs",
    ],
    icon: Target,
  },
  {
    title: "Champion the Brand",
    description:
      "Tell compelling stories, showcase community wins, and amplify Dev Weekends impact across your campus networks.",
    items: [
      "Curate a monthly highlight recap",
      "Collaborate on reels, blogs, and newsletter features",
      "Drive social media growth with authentic narratives",
    ],
    icon: Sparkles,
  },
]

const kpis = [
  {
    label: "Community Activation",
    value: 78,
    description: "Average active members joining monthly sessions",
  },
  {
    label: "Placement Readiness",
    value: 84,
    description: "Students completing mock interviews and career tracks",
  },
  {
    label: "Event Excellence",
    value: 91,
    description: "Workshops rated 4.5★ and above by participants",
  },
  {
    label: "Mentor Collaborations",
    value: 88,
    description: "On-campus mentor hours facilitated per cohort",
  },
]

const support = [
  {
    title: "Dedicated Playbooks",
    description:
      "Plug-and-play templates for event planning, partner outreach, and storytelling, so you never start from scratch.",
  },
  {
    title: "Monthly Strategy Labs",
    description:
      "Live sync-ups with the Dev Weekends core team to review KPIs, unlock blockers, and double down on what works.",
  },
  {
    title: "Always-On Support Desk",
    description:
      "A Slack channel with mentors, designers, and marketing coaches ready to co-create your next campus breakthrough.",
  },
]

const journey = [
  {
    phase: "Discover",
    timeline: "Week 1",
    focus: "Ambassador onboarding",
    description: "Kick off with a leadership bootcamp, a campus audit, and OKR mapping led by the core team.",
  },
  {
    phase: "Launch",
    timeline: "Month 1",
    focus: "First flagship event",
    description: "Deliver your campus debut with full-stack collateral, a marketing calendar, and mentorship support.",
  },
  {
    phase: "Grow",
    timeline: "Month 2-3",
    focus: "Community flywheel",
    description: "Run thematic sprints, showcase talent, and partner with clubs to scale consistent engagement.",
  },
  {
    phase: "Elevate",
    timeline: "Month 4+",
    focus: "Career outcomes",
    description: "Connect students with recruiters, publish success stories, and unlock stipends and leadership badges.",
  },
]

export default function AmbassadorProgramPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [statValues, setStatValues] = useState(stats.map(() => 0))
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false)
  const statsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsHeroVisible(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!statsRef.current || hasAnimatedStats) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimatedStats) {
          setHasAnimatedStats(true)
          animateStats()
        }
      },
      {
        threshold: 0.4,
      }
    )

    observer.observe(statsRef.current)

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statsRef, hasAnimatedStats])

  const animateStats = () => {
    const duration = 1600
    const frames = 60
    const interval = duration / frames
    let frame = 0

    const timer = setInterval(() => {
      frame += 1
      const progress = frame / frames
      const eased = 1 - Math.pow(1 - progress, 3)

      setStatValues(
        stats.map((stat) => Math.round(stat.target * eased))
      )

      if (frame >= frames) {
        clearInterval(timer)
        setStatValues(stats.map((stat) => stat.target))
      }
    }, interval)
  }

  const handleApply = () => {
    window.open(APPLICATION_URL, "_blank")
  }

  const handleLearnMore = () => {
    if (typeof window === "undefined") return
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/30" />
        <div
          className="absolute top-12 sm:top-20 left-6 sm:left-16 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-primary/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.12}px)` }}
        />
        <div
          className="absolute bottom-12 sm:bottom-20 right-6 sm:right-16 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-primary/5 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.08}px)` }}
        />

        <div className="container mx-auto relative z-10 animate-heroFadeIn">
          <div
            className={`mx-auto max-w-5xl text-center transition-all duration-1000 ${
              isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge
              variant="outline"
              className="mb-6 sm:mb-8 inline-flex items-center justify-center gap-2 border-primary px-4 py-2 text-xs sm:text-sm font-medium text-primary rounded-full"
            >
              <Sparkles className="h-4 w-4" />
              Ambassador Program · Spring 2026 Cohort
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight sm:leading-[1.05]">
              Lead the Dev Weekends Movement
              <br />
              <span className="relative inline-block mt-2 sm:mt-3">
                <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg -rotate-1 shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Campus Ambassador Program
                </span>
              </span>
            </h1>

            <p className="mt-6 sm:mt-8 max-w-3xl mx-auto text-sm sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Become the catalyst for innovation at your university. Activate communities, unlock mentor access, and deliver
              career outcomes with playbooks, support, and recognition curated by Dev Weekends.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Button
                size="lg"
                onClick={handleApply}
                className="flex items-center gap-2 px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Apply to Become an Ambassador
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleLearnMore}
                className="border-2 border-primary text-primary px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1"
              >
                Explore Program Journey
              </Button>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                60+ campuses already onboarded
              </span>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-2">
                <Handshake className="h-4 w-4 text-primary" />
                Work directly with industry mentors
              </span>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Earn leadership badges and recommendation letters
              </span>
            </div>

            <p className="mt-6 text-xs sm:text-sm text-muted-foreground">
              Applications close on <span className="font-semibold text-foreground">15 December 2025</span>. Shortlisted
              ambassadors join onboarding labs in January 2026.
            </p>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute -top-24 left-1/4 h-40 w-40 sm:h-60 sm:w-60 rounded-full bg-primary-foreground/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
        <div
          className="absolute -bottom-32 right-12 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-white/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.04}px)` }}
        />
        <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="border-0 bg-primary-foreground/10 text-primary-foreground">
                  <CardContent className="space-y-5 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">
                          {statValues[index]}
                          {stat.suffix}
                        </div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-primary-foreground/70">{stat.blurb}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">
              Why Join
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">Every Campus Needs a Dev Weekends Ambassador</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Lead the tech heartbeat of your university with playbooks, resources, and expert backing that transform passion into measurable impact.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={benefit.title}
                  className="h-full border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">{benefit.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {benefit.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-16">
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary"
              >
                Ambassador Perks
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
                All Fellowship Advantages + Ambassador-Only Rewards
              </h3>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                Step into the benefit stack enjoyed by Dev Weekends Certified Fellows, and then layer exclusive ambassador
                goodies and recognition on top.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ambassadorPerks.map((perk) => (
                <Card key={perk} className="border border-border/80 bg-card/80 transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{perk}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                  <Gift className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-foreground">Swag and Spotlight for Top Ambassadors</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Deliver high-impact initiatives and unlock seasonal swag drops — hoodies, badges, desk gear, and limited pins —
                    alongside featured stories across Dev Weekends channels and official recommendation letters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Badge variant="outline" className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Your Mission
              </Badge>
              <h2 className="text-3xl font-bold sm:text-4xl">What You&apos;ll Drive Every Quarter</h2>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Focus on real outcomes that uplift students — community building, skill development, and career breakthroughs. Our OKR model keeps you aligned and energized.
              </p>

              <div className="mt-8 space-y-6">
                {responsibilities.map((responsibility) => {
                  const Icon = responsibility.icon
                  return (
                    <Card key={responsibility.title} className="border border-border/70 bg-card/70 backdrop-blur">
                      <CardHeader className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-xl font-semibold">{responsibility.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base text-muted-foreground">
                          {responsibility.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {responsibility.items.map((item) => (
                            <li key={item} className="flex gap-2">
                              <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background">
                <CardHeader className="space-y-3">
                  <Badge variant="secondary" className="w-fit gap-2 bg-primary text-primary-foreground">
                    <Megaphone className="h-4 w-4" />
                    KPI Dashboard
                  </Badge>
                  <CardTitle className="text-2xl font-semibold">Track Momentum with Clarity</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    KPIs we review together every month to celebrate wins and plan what comes next.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {kpis.map((kpi) => (
                    <div key={kpi.label}>
                      <div className="flex items-center justify-between text-sm font-medium text-foreground">
                        <span>{kpi.label}</span>
                        <span>{kpi.value}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${kpi.value}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{kpi.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-border/80">
                <CardHeader className="space-y-3">
                  <Badge variant="outline" className="w-fit border-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    We&apos;ve Got You
                  </Badge>
                  <CardTitle className="text-2xl font-semibold">Support Backbone</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Everything you need to lead with confidence.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {support.map((resource) => (
                    <div key={resource.title} className="rounded-xl border border-dashed border-primary/30 p-4">
                      <h3 className="text-lg font-semibold text-foreground">{resource.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Ambassador Journey
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">Your Path from Selection to Impact</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Four clear phases designed to keep you inspired, supported, and growing as a leader.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {journey.map((step) => (
              <Card key={step.phase} className="relative border border-border/70">
                <CardHeader className="space-y-2">
                  <Badge variant="secondary" className="w-fit bg-primary/10 text-primary">
                    {step.timeline}
                  </Badge>
                  <CardTitle className="text-xl font-semibold">{step.phase}</CardTitle>
                  <CardDescription className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    {step.focus}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-primary/10" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl rounded-3xl border border-primary/20 bg-background/80 p-8 text-center shadow-2xl backdrop-blur">
            <Badge variant="secondary" className="mx-auto mb-4 gap-2 bg-primary text-primary-foreground">
              <Calendar className="h-4 w-4" />
              Next Cohort Launches January 2026
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Champion Innovation on Your Campus?</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Submit your application and tell us how you plan to build an unstoppable community. We review applications on a rolling basis and onboard ambassadors in micro-cohorts for personalized support.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={handleApply} className="px-10 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="text-sm text-muted-foreground">
                Prefer a quick chat?
                <br className="sm:hidden" />
                Email us at <span className="font-semibold text-foreground">devweekends@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

