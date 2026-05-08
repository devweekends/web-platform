"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Clock,
  Code,
  Database,
  FileText,
  Flame,
  Focus,
  Laptop,
  Lightbulb,
  Pen,
  Rocket,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react"

const APPLICATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfDzZHzI9nFGW22YxuuwK88dNCoT3imHKHsY2mtcVmOSWl5sg/viewform"

const stats = [
  {
    label: "Hours of Deep Work",
    target: 48,
    suffix: "",
    icon: Clock,
  },
  {
    label: "Focused Sessions",
    target: 6,
    suffix: "",
    icon: Target,
  },
  {
    label: "Hours Per Session",
    target: 4,
    suffix: "",
    icon: Focus,
  },
  {
    label: "Days of Execution",
    target: 2,
    suffix: "",
    icon: Flame,
  },
]

const differentiators = [
  {
    title: "Execution Over Learning",
    description:
      "You don't come here to learn someday. You come here to build now. Real output, not theory.",
    icon: Zap,
  },
  {
    title: "Serious Environment",
    description:
      "Everyone around you is working. No noise. No distractions. Just focus and momentum.",
    icon: ShieldCheck,
  },
  {
    title: "Accountability Circles",
    description:
      "Small groups that push you to stay on track and actually finish what you started.",
    icon: Users,
  },
  {
    title: "Real Output",
    description:
      "By the end of the weekend, you ship code, features, content, or systems. Something tangible.",
    icon: Rocket,
  },
]

const workCategories = [
  {
    title: "Engineering",
    icon: Code,
    items: [
      "Build features end-to-end",
      "System design with implementation",
      "Fix real production problems",
    ],
  },
  {
    title: "AI / Data",
    icon: Database,
    items: [
      "Build RAG pipelines",
      "Experiment with LLM workflows",
      "Data processing and analysis",
    ],
  },
  {
    title: "Career",
    icon: Laptop,
    items: [
      "Resume and LinkedIn optimization",
      "Interview prep and mock rounds",
      "Outreach systems and strategy",
    ],
  },
  {
    title: "Content",
    icon: Pen,
    items: [
      "Technical blogs and writing",
      "Video content and tutorials",
      "Portfolio and personal brand",
    ],
  },
]

const schedule = [
  {
    step: "01",
    title: "Goal Declaration",
    description: "You clearly define what you will build. No vague plans. A concrete, measurable outcome.",
  },
  {
    step: "02",
    title: "Deep Work Blocks",
    description: "3 focused sessions of 3-4 hours each. No distractions. Just execution.",
  },
  {
    step: "03",
    title: "Circle Accountability",
    description: "You're placed in a small group that tracks your progress and keeps you honest.",
  },
  {
    step: "04",
    title: "Daily Closing",
    description: "You present what you did, what blocked you, and what's next. No hiding.",
  },
]

const outcomes = [
  "Something real shipped",
  "Clear direction on what comes next",
  "Better thinking and problem-solving habits",
  "Momentum you didn't have before",
  "Connections with serious builders",
  "Proof that you can execute under pressure",
]

const rules = [
  "No random scrolling",
  "No unnecessary talking",
  "No passive consumption",
  "Respect deep work",
]

const preparation = [
  {
    title: "A Clear Goal",
    description: "Know exactly what you want to build or accomplish by the end of the weekend.",
    icon: Target,
  },
  {
    title: "A Rough Plan",
    description: "Break your goal into tasks. You should know where to start when you sit down.",
    icon: FileText,
  },
  {
    title: "Your Environment Ready",
    description: "Laptop charged, tools installed, repos cloned. Zero setup time on Day 1.",
    icon: Laptop,
  },
]

export default function WeekendTechGrindPage() {
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
    document.getElementById("what-is-it")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
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
              <Flame className="h-4 w-4" />
              Weekend Tech Grind
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight sm:leading-[1.05]">
              Think Like a Senior Engineer.
              <br />
              <span className="relative inline-block mt-2 sm:mt-3">
                <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg -rotate-1 shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Build Like One.
                </span>
              </span>
            </h1>

            <p className="mt-6 sm:mt-8 max-w-3xl mx-auto text-sm sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              48 hours of deep work. No distractions. No fake productivity.
              Just real execution with serious builders.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Button
                size="lg"
                onClick={handleApply}
                className="flex items-center gap-2 px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Apply for Weekend Grind
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleLearnMore}
                className="border-2 border-primary text-primary px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1"
              >
                See How It Works
              </Button>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                48 hours of focused execution
              </span>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Small accountability circles
              </span>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-primary" />
                Ship something real
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
          <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center group">
                  <div className="flex justify-center mb-3 sm:mb-4 p-2 sm:p-3 bg-primary-foreground/10 rounded-full w-fit mx-auto group-hover:bg-primary-foreground/20 transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 transition-all duration-300">
                    {statValues[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-primary-foreground/70 font-medium text-xs sm:text-sm lg:text-base">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What is Weekend Grind */}
      <section id="what-is-it" className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">
              The Format
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">What is Weekend Grind?</h2>
            <p className="mt-6 text-base text-muted-foreground sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Weekend Grind is a high-intensity, in-person build sprint designed for people who are tired of
              watching tutorials without building, learning without direction, and working alone without accountability.
            </p>
            <p className="mt-4 text-base text-foreground sm:text-lg font-medium">
              You show up with a goal. You leave with something real.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">
              Why This Works
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">What Makes This Different</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              This is not another workshop or hackathon. This is structured execution time with real accountability.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {differentiators.map((item) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.title}
                  className="h-full border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">{item.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">
              Right Fit
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">Who It&apos;s For</h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            <Card className="border border-primary/40 bg-gradient-to-br from-primary/5 via-background to-background">
              <CardHeader className="space-y-3">
                <Badge variant="secondary" className="w-fit gap-2 bg-primary text-primary-foreground">
                  <CheckCircle className="h-4 w-4" />
                  This is for you if
                </Badge>
                <CardTitle className="text-xl font-semibold">Builders Who Are Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "You're stuck in the tutorial loop",
                    "You know things but struggle to execute",
                    "You want to think like a senior engineer",
                    "You're building something — a job, startup, skill, or content",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-destructive/30 bg-gradient-to-br from-destructive/5 via-background to-background">
              <CardHeader className="space-y-3">
                <Badge variant="secondary" className="w-fit gap-2 bg-destructive text-destructive-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  Not for
                </Badge>
                <CardTitle className="text-xl font-semibold">Wrong Expectations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Passive learners looking for spoon-fed content",
                    "People looking for entertainment or networking events",
                    "People without a clear goal or willingness to prepare",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-destructive" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Can Work On */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">
              Bring Your Own Goal
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">What You Can Work On</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              You bring your own goal. Here are some examples of what past participants have shipped.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {workCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.title}
                  className="h-full border border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                >
                  <CardHeader className="space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <ArrowRight className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
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
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">
              Day 1 and Day 2
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Two days. Four phases. One clear outcome.
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block mt-16 max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border" />
              <div className="space-y-16">
                {schedule.map((item, index) => (
                  <div key={item.step} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <Card className="border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                        <CardHeader className="pb-3">
                          <Badge variant="outline" className="w-fit border-primary text-primary mb-2 text-xs">
                            Step {item.step}
                          </Badge>
                          <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground text-base">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="relative z-10">
                      <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg" />
                    </div>
                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden mt-12 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 top-0 w-0.5 h-full bg-border" />
              <div className="space-y-8">
                {schedule.map((item) => (
                  <div key={item.step} className="flex items-start">
                    <div className="relative z-10 mr-6">
                      <div className="w-3 h-3 bg-primary rounded-full border-2 border-background shadow-lg" />
                    </div>
                    <div className="flex-1">
                      <Card className="border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                        <CardHeader className="pb-3">
                          <Badge variant="outline" className="w-fit border-primary text-primary mb-2 text-xs">
                            Step {item.step}
                          </Badge>
                          <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-primary-foreground/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">What You Walk Away With</h2>
            <p className="mt-4 text-base text-primary-foreground/70 sm:text-lg">
              After 2 days of focused execution.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {outcomes.map((outcome) => (
              <Card key={outcome} className="border-0 bg-primary-foreground/10 text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{outcome}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-8 sm:p-10 shadow-lg">
              <div className="text-center mb-8">
                <Badge variant="outline" className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">
                  Ground Rules
                </Badge>
                <h2 className="text-3xl font-bold sm:text-4xl">Rules of the Grind</h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                  Simple expectations. Non-negotiable.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {rules.map((rule) => (
                  <div key={rule} className="flex items-center gap-3 rounded-xl border border-dashed border-primary/30 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-base font-semibold text-foreground">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before You Apply */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">
              Come Prepared
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">Before You Apply</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              If you don&apos;t prepare, you waste your own time. Show up ready.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {preparation.map((item) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.title}
                  className="h-full border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-primary/10" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl rounded-3xl border border-primary/20 bg-background/80 p-8 text-center shadow-2xl backdrop-blur">
            <h2 className="text-3xl font-bold sm:text-4xl">
              48 Hours Can Change Your Trajectory.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto">
              Most people stay stuck for months.
              You don&apos;t have to. Apply now and start building.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={handleApply} className="px-10 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1">
                Apply for Weekend Grind
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="text-sm text-muted-foreground">
                Questions?
                <br className="sm:hidden" />
                {" "}Email us at <span className="font-semibold text-foreground">devweekends@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
