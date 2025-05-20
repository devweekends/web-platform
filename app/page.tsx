'use client'

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Code,
  Server,
  Cloud,
  Brain,
  CheckCircle2,
  Star,
  Linkedin,
} from "lucide-react";
import GoogleCalendar from "@/components/google_calender";
import { useState, useEffect } from "react";

interface Session {
  _id: string;
  name: string;
  description: string;
  category: string;
  date: string;
  time: string;
  speaker: string;
}

const testimonials = [
  {
    name: "Saqlain",
    role: "GSoC @ Chromium",
    quote:
      "Dev Weekends was originally founded to empower students of the University of Education. Today, it has grown into a national initiative, helping underserved students across Pakistan break into international remote job markets and become shining stars in the tech world.\n\nI'm truly proud to be a part of this organization. I have been serving as an instructor for the past two and a half years, and it has been an honor to contribute to its mission. With the guidance of the amazing mentors at Dev Weekends, I was able to crack Google Summer of Code. Today, I'm a well-rounded full-stack software engineer because of their constant support and mentorship. 🙌",
    image: "/client-3.jpg",
  },
  {
    name: "M Salman",
    role: "GSoC @ FOSSology",
    quote:
      "I'm super thankful for the Dev Weekends community! The mentorship, mentors, fellow members, resources, and support helped me a lot in cracking GSoC and development journey. Huge thanks to Zeeshan Bhai and the Dev Weekends core team. This community helped me level up my skills and even cracked GSoC and much more! I am excited to see Dev Weekends grow even more in the future, InshAllah. Best wishes and prayers!",
    image: "/client-3.jpg",
  },
  {
    name: "M Shehroz",
    role: "Software Engineer @ Unanime Planet",
    quote:
      "I'm overwhelmed with gratitude for the Dev Weekend community! From guiding me through learning the tech stack to polishing my skills as a full-stack engineer, they've been my rock throughout my journey.\n\nTheir expert guidance and preparation for remote job interviews were invaluable. They helped me navigate the application process, and their support during the different phases of interviews was instrumental in my success.\n\nI struggled with many interviews, facing rejections in behavioral, technical, DSA, and team interviews. But the community's motivation and encouragement kept me going. Their words of affirmation - 'You're almost there, just one step away' - became my mantra.\n\nThanks to Dev Weekend, I've landed my dream job and am now enjoying it. If you're struggling to break into the industry, I highly recommend joining this community. They'll provide you with the guidance, support, and motivation you need to succeed.\n\nThank you, Dev Weekend, for believing in me and helping me achieve my goals!",
    image: "/client-3.jpg",
  },
];

const mentors = [
  {
    name: "Usman Sheikh",
    role: "Sr. Cloud Architect at Microsoft",
    skills: ["K8s", "Cloud", "Azure"],
    linkedin: "https://www.linkedin.com/in/usmanikramsheikh/",
    image: "/usman.jpg",
  },
  {
    name: "Zeeshan Adil",
    role: "Lead Engineer | Expert Vetted Upworker",
    skills: ["K8s", "AWS", ".NET"],
    linkedin: "https://www.linkedin.com/in/zeeshanadilbutt/",
    image: "/m2.png",
  },
  // {
  //   name: "Fiaz Ahmad",
  //   role: "TOP RATED PLUS (Top 3%) @ Upwork ",
  //   skills: ["CI/CD", "Docker", "Kubernetes"],
  //   linkedin: "https://www.linkedin.com/in/fiazahmad/",
  //   image: "/m5.jpeg",
  // },
  {
    name: "Moeez Ahmad",
    role: "SWE @ Calo",
    skills: ["Full Stack", "DevOps", "Serverless"],
    linkedin: "https://www.linkedin.com/in/moeezahmad01/",
    image: "/m3.png",
  },
  {
    name: "Tanzeel Saleem",
    role: "Founder @ DevNexus",
    skills: ["AWS", "Azure", "Serverless"],
    linkedin: "https://www.linkedin.com/in/tanzeel-saleem/",
    image: "/m1.jpg",
  },
];

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/sessions');
        if (!response.ok) throw new Error('Failed to fetch sessions');
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 lg:py-24 xl:py-40 bg-background border-b">
        <div className="container">
          <div className="flex flex-col items-center space-y-8 text-center">
            <Badge className="px-3 py-1 text-sm">Tech Community</Badge>
            <div className="space-y-4 max-w-[800px]">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Your Gateway to becoming a better Software Engineer.
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join a thriving community of students and tech enthusiasts
                learning, building, and growing together through weekend events
                and bootcamps.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/sessions">
                  Explore Events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <Link href="https://linktr.ee/DevWeekends">Join Community</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-muted-foreground">Events Hosted</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">20k+</div>
                <div className="text-muted-foreground">Community Members</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">30+</div>
                <div className="text-muted-foreground">Expert Speakers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoogleCalendar />

      {/* Featured Sessions */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="px-3 py-1 text-sm">Upcoming Sessions</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Learn from the Best
            </h2> 
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Join our weekend sessions led by industry experts and enhance your
              skills in various tech domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-4 w-20 bg-muted rounded mb-2"></div>
                    <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
                    <div className="h-4 w-full bg-muted rounded"></div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2">
                      <div className="h-4 w-1/2 bg-muted rounded"></div>
                      <div className="h-4 w-1/3 bg-muted rounded"></div>
                      <div className="h-4 w-2/3 bg-muted rounded"></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 w-full bg-muted rounded"></div>
                  </CardFooter>
                </Card>
              ))
            ) : sessions.length > 0 ? (
              sessions.slice(0, 3).map((session) => (
                <Card key={session._id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <Badge className="w-fit mb-2 bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20">
                      {session.category}
                    </Badge>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {session.name}
                    </CardTitle>
                    <CardDescription>
                      {session.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                      <Clock className="h-4 w-4" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{session.speaker}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                    >
                      Check the Calendar Above to Join
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No upcoming sessions at the moment. Please check back later!</p>
              </div>
            )}

         
          </div>

          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" className="group rounded-full">
              <Link href="/sessions">
                View All Sessions{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Expert Speakers Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="px-3 py-1 text-sm">Expert Speakers</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Learn from Industry Leaders
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Our events feature experienced professionals who share their
              expertise, insights, and real-world experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {mentors.map((mentor, index) => (
              <Card
                key={index}
                className="overflow-hidden border border-border/50 bg-card shadow-sm hover:shadow transition-all duration-300"
              >
                <CardHeader className="p-0">
                  <div className="aspect-[4.5/4] relative overflow-hidden">
                    <Image
                      src={mentor.image || "/placeholder.svg"}
                      alt={mentor.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div>
                    <CardTitle className="text-sm font-semibold">{mentor.name}</CardTitle>
                    <p className="text-xs text-muted-foreground leading-tight">{mentor.role}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mentor.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0.5 font-normal bg-secondary/50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={mentor.linkedin}
                    className="inline-flex items-center justify-center rounded text-xs font-medium h-8 px-3 w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Linkedin className="h-4 w-4 mr-2" /> Connect on LinkedIn
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Focus Areas
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                We offer mentorship and sessions across various domains of
                technology
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Software Engineering */}
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Software Engineering</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Web Application, Mobile Application, Desktop Application, and more.
                </p>
              </CardContent>
            </Card>

            {/* DSA & Competitive Programming */}
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Server className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>DSA & Competitive Programming</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Data Structures, Algorithms, Problem Solving, and Competitive Programming Contests.
                </p>
              </CardContent>
            </Card>

            {/* DevOps & Cloud */}
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Cloud className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>DevOps & Cloud</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  CI/CD, Infrastructure as Code, Containerization, AWS, Azure, GCP, and Cloud Architecture.
                </p>
              </CardContent>
            </Card>

            {/* Machine Learning/AI */}
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Machine Learning/AI</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  ML fundamentals, deep learning, NLP, computer vision, and AI applications.
                </p>
              </CardContent>
            </Card>

            {/* Open Source Programs */}
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Open Source Programs</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  GSoC, Hacktoberfest, Outreachy, and other open source contribution programs.
                </p>
              </CardContent>
            </Card>

            {/* Remote Jobs */}
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Remote Jobs</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Remote job opportunities, freelancing, and international tech careers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <Badge className="px-3 py-1 text-sm">About Us</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Building a Thriving Tech Community
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Dev Weekends started with a simple goal: create a space where
                  tech enthusiasts could learn, collaborate, and grow together.
                  we've hosted over 100+ events and welcomed more than 20k+
                  community members.
                </p>
                <p>
                  Our focus is on practical, hands-on learning experiences that
                  help attendees build real-world skills. Whether you're a
                  student just starting out or a seasoned developer looking to
                  expand your knowledge, our events are designed to provide
                  value for everyone.
                </p>
              </div>
              <Button asChild className="rounded-full group">
                <Link href="https://linktr.ee/DevWeekends">
                  Join our community{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/ab.png"
                alt="Dev Weekends Community"
                fill
                className="object-cover"
              />
              {/* <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Events Hosted</div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Community Voices
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Hear from our community members about their experiences
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {testimonials.map((testimonial, index) => {
              const [showTooltip, setShowTooltip] = useState(false);
              return (
                <Card
                  key={index}
                  className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border relative"
                >
                  <CardContent className="pt-6">
                    <div className="mb-6 p-6 bg-muted rounded-lg relative group"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      onFocus={() => setShowTooltip(true)}
                      onBlur={() => setShowTooltip(false)}
                      tabIndex={0}
                    >
                      <div className="absolute -bottom-4 left-6 w-0 h-0 border-l-[12px] border-l-transparent border-t-[16px] border-t-muted border-r-[12px] border-r-transparent"></div>
                      <p className="italic text-muted-foreground line-clamp-6 cursor-pointer">
                        {testimonial.quote}
                      </p>
                      {showTooltip && (
                        <div className="absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-full bg-zinc-900 text-white p-4 rounded-lg shadow-lg w-[320px] max-w-[90vw] text-sm flex flex-col items-center">
                          <div className="mb-2 text-left w-full">{testimonial.quote}</div>
                          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[16px] border-b-zinc-900 border-r-[12px] border-r-transparent mt-2"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3 border-2 border-primary">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Community Section */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <Badge className="px-3 py-1 text-sm">Join Our Community</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Become a Member</h2>
              <p className="text-muted-foreground">
                Join our community to stay updated with the latest events and connect with fellow tech enthusiasts.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    className="rounded-md bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-md bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="text-sm font-medium">
                    WhatsApp Number
                  </label>
                  <Input
                    id="whatsapp"
                    placeholder="+1 (123) 456-7890"
                    className="rounded-md bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">We'll send you event notifications via WhatsApp</p>
                </div>
                <Button className="w-full rounded-full">Join Community</Button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-bold mb-6">Community Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Early access to event registrations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>WhatsApp notifications for upcoming events</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Connect with like-minded tech enthusiasts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Opportunities to speak at future events</span>
                </li>
              </ul>

              <div className="mt-8 p-6 bg-secondary rounded-lg">
                <p className="italic text-muted-foreground mb-4">
                  "Dev Weekends helped me connect with amazing developers and significantly improved my skills through
                  their bootcamps."
                </p>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3 border-2 border-primary">
                    <Image
                      src="/me.png"
                      alt="Zain"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium"> Zain </p>
                    <p className="text-sm text-muted-foreground"> Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background  ">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-3 max-w-[800px]">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Our Community Today
              </h2>
              <p className="md:text-xl/relaxed">
                Connect with mentors, attend sessions, and accelerate your tech
                career
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="rounded-full">
                <Link
                  href="https://linktr.ee/DevWeekends"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Community
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
