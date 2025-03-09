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
} from "lucide-react";
import MentorsPage from "@/components/MentorsPage";
import GoogleCalendar from "@/components/google_calender";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Frontend Developer",
    quote:
      "The mentorship I received at Dev Weekends completely transformed my career. I went from struggling with basic concepts to landing a job as a frontend developer in just 6 months.",
    image: "/client-1.jpg",
  },
  {
    name: "Jamie Lee",
    role: "DevOps Engineer",
    quote:
      "The DevOps sessions were incredibly practical. I was able to implement what I learned immediately at work, which impressed my team and led to a promotion.",
    image: "/client-2.jpg",
  },
  {
    name: "Taylor Morgan",
    role: "Cloud Solutions Architect",
    quote:
      "As someone transitioning into tech from a non-technical background, the supportive community at Dev Weekends made all the difference. The mentors are patient and truly care about your growth.",
    image: "/client-3.jpg",
  },
];

export default function Home() {
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
            {/* Session Card 1 */}
            <Card className="group hover:shadow-lg transition-all duration-300 bg-background border-border">
              <CardHeader className="pb-3">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20">
                  GSoC
                </Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  GSoC Sunday Meetup
                </CardTitle>
                <CardDescription>
                  Want to crack Google Summer of Code, join this meetup
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Every Saturday</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>03:30 PM PKT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Aqib Nawab, Muhammad Saqlain</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  Check the Calender Above to Join
                </Button>
              </CardFooter>
            </Card>

            {/* Session Card 2 */}
            <Card className="group hover:shadow-lg transition-all duration-300 bg-background border-border">
              <CardHeader className="pb-3">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20">
                  DevOps
                </Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  Dev Weekends DevOps Bootcamp
                </CardTitle>
                <CardDescription>
                  Master DevOps and Deployment form Basics to Advance
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Every Saturday</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>09:00 PM PKT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Sheryar Ahmad, Software Engineer</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  Check the Calender Above to Join
                </Button>
              </CardFooter>
            </Card>

            {/* Session Card 3 */}
            <Card className="group hover:shadow-lg transition-all duration-300 bg-background border-border">
              <CardHeader className="pb-3">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20">
                  Freelance
                </Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  DW Ramdan Upwork Series
                </CardTitle>
                <CardDescription>
                  Complete freelancing guide from Top Rated Freelancers
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Every Sunday</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>09:30 PM PKT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Fiaz Ahmad, Top Rated Upworker</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  Check the Calender Above to Join
                </Button>
              </CardFooter>
            </Card>
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

          <MentorsPage></MentorsPage>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {/* Web Development */}
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Web Development</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Frontend, backend, and full-stack development with modern
                  frameworks and tools.
                </p>
              </CardContent>
            </Card>

            {/* DevOps */}
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Server className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>DevOps</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  CI/CD, infrastructure as code, containerization, and
                  deployment strategies.
                </p>
              </CardContent>
            </Card>

            {/* Cloud Computing */}
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Cloud className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Cloud Computing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  AWS, Azure, GCP, serverless architectures, and cloud-native
                  applications.
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
                  ML fundamentals, deep learning, NLP, computer vision, and AI
                  applications.
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
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-card hover:shadow-lg transition-shadow duration-300 border-2 border-border"
              >
                <CardContent className="pt-6">
                  <div className="mb-6 p-6 bg-muted rounded-lg relative">
                    <div className="absolute -bottom-4 left-6 w-0 h-0 border-l-[12px] border-l-transparent border-t-[16px] border-t-muted border-r-[12px] border-r-transparent"></div>
                    <p className="italic text-muted-foreground">
                      {testimonial.quote}
                    </p>
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
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
