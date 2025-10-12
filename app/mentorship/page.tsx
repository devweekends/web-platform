"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Users,
  Trophy,
  Target,
  CheckCircle,
  ArrowRight,
  Globe,
  Award,
  Lightbulb,
  Rocket,
  TrendingUp,
  Briefcase,
  Sparkles,
  ChevronRight,
  Play,
  Star,
  Clock,
  Brain,
  Code,
  Database,
  Server,
  Layers,
  Calendar,
  X,
  UserPlus,
  Headphones,
  VideoIcon,
  MessageCircle,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function MentorshipPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0])
  const [timelineProgress, setTimelineProgress] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false)
  const [hasAnimatedTimeline, setHasAnimatedTimeline] = useState(false)
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (statsRef.current && !hasAnimatedStats) {
        const rect = statsRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setHasAnimatedStats(true)
          animateStats()
        }
      }

      if (timelineRef.current && !hasAnimatedTimeline) {
        const rect = timelineRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setHasAnimatedTimeline(true)
          animateTimeline()
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasAnimatedStats, hasAnimatedTimeline])

  const animateStats = () => {
    const targets = [20, 24, 400, 6]
    const duration = 2000
    const steps = 60
    const increment = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setAnimatedStats(targets.map((target) => Math.floor(target * easeOut)))

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedStats(targets)
      }
    }, increment)
  }

  const animateTimeline = () => {
    let progress = 0
    const timer = setInterval(() => {
      progress += 2
      setTimelineProgress(progress)
      if (progress >= 100) {
        clearInterval(timer)
      }
    }, 30)
  }

  const handleApplyClick = () => {
    window.open(
      "https://forms.gle/48tZYzJn2zzUQ1EC6","_blank",
    )
  }

  const levels = [
    {
      level: 0,
      title: "Foundation Track",
      subtitle: "Complete Beginner Journey",
      description: "Perfect for absolute beginners starting their coding journey with comprehensive support",
      duration: "6 months",
      intensity: "Beginner Friendly",
      liveSessions: "20 Live Sessions",
      mentorshipHours: "24 Hours 1:1 Mentorship",
      highlights: [
        "Programming fundamentals from scratch",
        "Web development essentials",
        "Data structures & algorithms basics",
        "Weekly 1:1 mentor sessions",
        "Live coding workshops twice a week",
        "Personal project guidance"
      ],
      icon: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />,
      achievement: "Mentee → Certified Fellow (Bronze)"
    },
    {
      level: 1,
      title: "Professional Track",
      subtitle: "Industry-Ready Development",
      description: "For developers with basic knowledge aiming for professional excellence",
      duration: "6 months",
      intensity: "Moderate Pace",
      liveSessions: "48 Live Sessions",
      mentorshipHours: "36 Hours 1:1 Mentorship",
      highlights: [
        "Advanced data structures mastery",
        "Complex algorithms & optimization",
        "System design fundamentals",
        "Bi-weekly 1:1 mentor sessions",
        "Mock interviews with feedback",
        "Open source contribution guidance"
      ],
      icon: <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />,
      achievement: "Fellow (Bronze) → Certified Fellow (Silver)"
    },
    {
      level: 2,
      title: "Expert Track",
      subtitle: "Leadership & Architecture",
      description: "Intensive program for experienced developers targeting senior roles",
      duration: "6 months",
      intensity: "Expert Level",
      liveSessions: "48 Live Sessions",
      mentorshipHours: "48 Hours 1:1 Mentorship",
      highlights: [
        "Complex system architecture design",
        "Advanced algorithms & performance",
        "Leadership & team mentoring",
        "Weekly 1:1 mentor sessions",
        "Industry project collaboration",
        "Career strategy & negotiation"
      ],
      icon: <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />,
      achievement: "Fellow (Silver) → Certified Fellow (Gold)"
    }
  ]

  const timelineData = [
    {
      month: "Month 1-2",
      title: "Foundation & Core Skills",
      description: "Master fundamentals through live sessions, build strong programming base with direct mentor guidance",
      milestone: "Complete Core Foundations",
      features: ["8 Live Sessions/month", "4 Mentor Sessions", "2 Projects"]
    },
    {
      month: "Month 3-4",
      title: "Advanced Concepts & Practice",
      description: "Deep dive into DSA, system design, and development practices with personalized mentorship",
      milestone: "Build Portfolio Projects",
      features: ["8 Live Sessions/month", "4 Mentor Sessions", "3 Projects"]
    },
    {
      month: "Month 5-6",
      title: "Industry Readiness & Placement",
      description: "Real-world projects, interview preparation, and job placement support with mentor advocacy",
      milestone: "Job Ready & Certified",
      features: ["8 Live Sessions/month", "6 Mentor Sessions", "Capstone Project"]
    }
  ]

  const mentorshipFeatures = [
    {
      title: "Personal Mentor Assignment",
      icon: <UserPlus className="h-6 w-6 sm:h-8 sm:w-8" />,
      description: "Get matched with an experienced industry mentor based on your goals and learning style",
      details: [
        "Dedicated mentor throughout program",
        "Personalized learning path",
        "Career guidance & planning",
        "Project review & feedback",
        "Industry insights & networking"
      ]
    },
    {
      title: "Live Interactive Sessions",
      icon: <VideoIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
      description: "Attend live coding sessions, workshops, and Q&A with instructors and industry experts",
      details: [
        "2 live sessions per week",
        "Interactive problem solving",
        "Real-time doubt clearing",
        "Peer collaboration",
        "Session recordings available"
      ]
    },
    {
      title: "1:1 Mentorship Hours",
      icon: <Headphones className="h-6 w-6 sm:h-8 sm:w-8" />,
      description: "Regular one-on-one sessions with your mentor for personalized guidance and support",
      details: [
        "Weekly/Bi-weekly sessions",
        "Customized problem solving",
        "Code review & optimization",
        "Interview preparation",
        "Career counseling"
      ]
    }
  ]

  const programSessions = [
    {
      title: "DSA Mastery Sessions",
      icon: <Brain className="h-6 w-6 sm:h-8 sm:w-8" />,
      sessions: "48 Live Sessions",
      description: "Comprehensive data structures and algorithms training with live problem-solving",
      details: [
        "2 live sessions per week",
        "3 hours per session",
        "500+ problems solved",
        "LeetCode contests",
        "Pattern recognition training",
        "Time & space complexity mastery"
      ]
    },
    {
      title: "Engineering Excellence",
      icon: <Code className="h-6 w-6 sm:h-8 sm:w-8" />,
      sessions: "24 Weekend Sessions",
      description: "Hands-on engineering workshops building production-ready applications",
      details: [
        "Weekend intensive workshops",
        "Full-stack development",
        "Cloud & DevOps practices",
        "Microservices architecture",
        "Testing & CI/CD",
        "Performance optimization"
      ]
    },
    {
      title: "Mentorship & Guidance",
      icon: <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />,
      sessions: "24-48 Hours 1:1",
      description: "Personalized mentorship sessions tailored to your learning pace and goals",
      details: [
        "Weekly check-ins",
        "Project guidance",
        "Career planning",
        "Resume building",
        "Interview coaching",
        "Salary negotiation tips"
      ]
    }
  ]

  const techStack = [
    { name: "JavaScript/TypeScript", sessions: "8 sessions", icon: <Code2 className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "React & Next.js", sessions: "8 sessions", icon: <Code className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "Node.js & Express", sessions: "6 sessions", icon: <Server className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "Database & SQL", sessions: "6 sessions", icon: <Database className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "System Design", sessions: "8 sessions", icon: <Layers className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "Cloud & DevOps", sessions: "6 sessions", icon: <Globe className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "DSA & Algorithms", sessions: "48 sessions", icon: <Brain className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "Project Development", sessions: "12 sessions", icon: <Rocket className="h-4 w-4 sm:h-5 sm:w-5" /> },
  ]

  const mentorshipPerks = [
    "Free Access to All Live Sessions",
    "Dedicated Personal Mentor",
    "1:1 Mentorship Hours",
    "Job Placement Assistance",
    "Industry Referrals",
    "Mock Interview Practice",
    "Certificate of Completion",
    "Lifetime Community Access",
    "Project Portfolio Development",
    "Resume & LinkedIn Optimization",
    "Exclusive Industry Workshops",
    "Peer Learning Groups",
  ]

  const achievementTags = [
    { level: "Mentee", requirements: "Entry level" },
    { level: "Fellow", requirements: "Complete foundation" },
    { level: "Certified Fellow (Bronze)", requirements: "Complete beginner track" },
    { level: "Certified Fellow (Silver)", requirements: "Complete intermediate track" },
    { level: "Certified Fellow (Gold)", requirements: "Complete advanced track" },
    { level: "Industry Ready", requirements: "Job placement achieved" },
  ]

  const stats = [
    {
      number: animatedStats[0],
      suffix: "",
      label: "Live Sessions",
      icon: <VideoIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      number: animatedStats[1],
      suffix: "+",
      label: "Mentorship Hours",
      icon: <Headphones className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      number: animatedStats[2],
      suffix: "+",
      label: "Problems Solved",
      icon: <Target className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      number: animatedStats[3],
      suffix: " Months",
      label: "Comprehensive Program",
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
  ]

  const progressMetrics = [
    { label: "Placement Rate", value: 92, icon: <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: "Mentor Satisfaction", value: 98, icon: <Star className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: "Skill Improvement", value: 95, icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: "Project Completion", value: 90, icon: <Trophy className="h-4 w-4 sm:h-5 sm:w-5" /> },
  ]

  return (
    <div>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Overlay for blur and dim, closes modal on click */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300"
            onClick={() => setShowModal(false)}
          />
          <Card className="max-w-md w-full relative z-10 animate-modalIn">
            <Button variant="ghost" size="icon" onClick={() => setShowModal(false)} className="absolute top-2 right-2">
              <X className="w-5 h-5" />
            </Button>
            <CardHeader>
              <CardTitle>6-Month Mentorship Program</CardTitle>
              <CardDescription>
                <span className="font-semibold text-green-600">100% Free - No hidden costs!</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>48 Live interactive sessions with industry experts</li>
                <li>Personal mentor assigned for your entire journey</li>
                <li>24-48 hours of 1:1 mentorship based on your track</li>
                <li>Job placement assistance and industry referrals</li>
                <li className="font-bold text-primary">Limited seats - Apply now!</li>
                <li>Selection based on commitment and passion to learn</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
      <div className={`min-h-screen bg-background text-foreground overflow-x-hidden transition-all duration-300 ${showModal ? 'blur-sm brightness-75 pointer-events-none select-none' : ''}`}>
        {/* Hero Section */}
        <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/30"></div>
          <div
            className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          ></div>
          <div
            className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-primary/3 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          ></div>

          <div className="container mx-auto relative z-10 animate-heroFadeIn">
            <div
              className={`text-center transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Badge
                variant="outline"
                className="mb-6 sm:mb-8 border-primary text-primary px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-xs sm:text-sm"
              >
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                2025 Cohort - 6-Month Mentorship Program
              </Badge>

              <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-8 leading-[1.1] sm:leading-[0.9] tracking-tight">
                Dev Weekends
                <br />
                <span className="relative inline-block mt-2 sm:mt-0">
                  <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 sm:px-4 md:px-6 py-2 sm:py-3 inline-block transform -rotate-1 rounded-lg text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                    Mentorship 2025-26
                  </span>
                </span>
              </h1>
              <p className="text-sm sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
                <strong>6-month comprehensive mentorship program with live sessions</strong>
                <br className="hidden sm:block" />
                Get personal mentorship, attend live coding sessions, and become job-ready with our industry-focused curriculum.
              </p>

              <div className="flex flex-row flex-wrap sm:flex-row gap-3 sm:gap-6 justify-center items-center mb-8 sm:mb-16 px-4">
                <Button
                  size="lg"
                  onClick={handleApplyClick}
                  className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90 px-4 sm:px-12 py-2.5 sm:py-5 rounded-lg text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 min-w-[140px] sm:w-auto"
                >
                  Apply for Mentorship
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById('mentorship')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 sm:flex-none border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4 sm:px-12 py-2.5 sm:py-5 rounded-lg text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 min-w-[140px] sm:w-auto"
                >
                  Learn About Mentorship
                </Button>
              </div>

              {/* Achievement Tags Preview */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto px-4">
                {achievementTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-primary text-primary px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm"
                  >
                    {tag.level}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          ref={statsRef}
          className="py-8 sm:py-12 lg:py-16 bg-primary text-primary-foreground relative overflow-hidden"
        >
          <div
            className="absolute top-0 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-primary-foreground/5 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          ></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-3 sm:mb-4 p-2 sm:p-3 bg-primary-foreground/10 rounded-full w-fit mx-auto group-hover:bg-primary-foreground/20 transition-all duration-300 group-hover:scale-110">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 transition-all duration-300">
                    {stat.number}
                    {stat.suffix}
                  </div>
                  <div className="text-primary-foreground/70 font-medium text-xs sm:text-sm lg:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Mentorship Section - NEW */}
        <section
          id="mentorship"
          className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/30"></div>

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <Badge
                variant="outline"
                className="mb-4 sm:mb-6 border-primary text-primary px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-xs sm:text-sm"
              >
                <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Direct Mentorship Program
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
                Personal Mentorship That Transforms
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Get matched with industry experts who guide you through your entire learning journey with personalized support
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12 sm:mb-16">
              {mentorshipFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="border-2 border-border hover:border-primary transition-all duration-500 hover:shadow-xl group bg-card/80 backdrop-blur-sm hover:-translate-y-1"
                >
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                      {feature.description}
                    </CardDescription>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-muted-foreground">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section
          id="timeline"
          ref={timelineRef}
          className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/30"></div>

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <Badge
                variant="outline"
                className="mb-4 sm:mb-6 border-primary text-primary px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-xs sm:text-sm"
              >
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Program Timeline
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
                Your 6-Month Transformation
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                A structured journey from beginner to industry-ready developer with continuous mentorship
              </p>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border"></div>
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary transition-all duration-2000 ease-out"
                  style={{ height: `${timelineProgress}%` }}
                ></div>

                {/* Timeline Items */}
                <div className="space-y-16">
                  {timelineData.map((item, index) => (
                    <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                      <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                        <Card className="border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                          <CardHeader className="pb-3">
                            <Badge variant="outline" className="w-fit border-primary text-primary mb-2 text-xs">
                              {item.month}
                            </Badge>
                            <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-muted-foreground mb-3 text-base">{item.description}</p>
                            <div className="flex items-center text-primary font-semibold text-sm mb-3">
                              <Trophy className="h-4 w-4 mr-2" />
                              {item.milestone}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.features.map((feature, fIndex) => (
                                <Badge key={fIndex} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Timeline Node */}
                      <div className="relative z-10">
                        <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                      </div>

                      <div className="w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden max-w-2xl mx-auto">
              <div className="relative">
                {/* Mobile Timeline Line - positioned on the left */}
                <div className="absolute left-6 top-0 w-0.5 h-full bg-border"></div>
                <div
                  className="absolute left-6 top-0 w-0.5 bg-primary transition-all duration-2000 ease-out"
                  style={{ height: `${timelineProgress}%` }}
                ></div>

                {/* Mobile Timeline Items */}
                <div className="space-y-8">
                  {timelineData.map((item, index) => (
                    <div key={index} className="flex items-start">
                      {/* Timeline Node */}
                      <div className="relative z-10 mr-6">
                        <div className="w-3 h-3 bg-primary rounded-full border-2 border-background shadow-lg"></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <Card className="border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                          <CardHeader className="pb-3">
                            <Badge variant="outline" className="w-fit border-primary text-primary mb-2 text-xs">
                              {item.month}
                            </Badge>
                            <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-muted-foreground mb-3 text-sm">{item.description}</p>
                            <div className="flex items-center text-primary font-semibold text-sm mb-3">
                              <Trophy className="h-3 w-3 mr-2" />
                              {item.milestone}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.features.map((feature, fIndex) => (
                                <Badge key={fIndex} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
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
      </div>
    </div>
  )
}