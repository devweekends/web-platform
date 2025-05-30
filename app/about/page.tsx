'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Handshake, GraduationCap, Share2 } from "lucide-react"
import { useEffect, useState } from "react"

interface CoreTeamMember {
  _id: string;
  name: string;
  image: string;
  role: string;
  linkedin: string;
}

export default function AboutPage() {
  const [coreTeam, setCoreTeam] = useState<CoreTeamMember[]>([]);
  const [loadingCore, setLoadingCore] = useState(true);

  useEffect(() => {
    fetch('/api/core-team')
      .then(res => res.json())
      .then(data => setCoreTeam(Array.isArray(data) ? data : []))
      .finally(() => setLoadingCore(false));
  }, []);

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4 mb-10">
        <h1 className="text-4xl font-bold">About Dev Weekends</h1>
        <p className="text-muted-foreground text-lg">
          Learn about our mission, values, and the team behind Dev Weekends.
        </p>
      </div>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 py-8 md:py-12 lg:py-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At Dev Weekends, we empower students,developers and professionals through mentorship, competitive preparation, and
            real-world engagement. We connect students with experienced engineers for career guidance, help them excel
            in ICPC and Meta HackerCup, and encourage contributions to open source programs like GSoC.
          </p>
          <p className="text-muted-foreground mb-4">
            With a community of 20,000+ members across various platforms, we foster collaboration, networking, and skill
            development through hackathons, workshops, and technology-specific groups. We provide resources on
            freelancing, job opportunities, and problem-solving, along with weekly meetups and code review sessions.
          </p>
          <p className="text-muted-foreground">
            Our free DSA courses, tech talks, and mentorship programs ensure continuous learning and growth. Join us to
            connect, learn, and innovate together! 🚀
          </p>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image src="https://res.cloudinary.com/dcrgvq3lf/image/upload/v1748606356/about_img_lcygp4.jpg" alt="Dev Weekends Meetup" fill className="object-cover" />
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mb-16 py-8 md:py-12 lg:py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-muted-foreground">
                  Embrace and drive new ideas, technologies, and methodologies to keep the community at the cutting edge
                  of tech.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Handshake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Collaboration</h3>
                <p className="text-muted-foreground">
                  Foster a supportive environment where sharing knowledge and working together is at the heart of every
                  initiative.
                </p>
              </div>
            </CardContent>
          </Card>

        

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Continuous Learning</h3>
                <p className="text-muted-foreground">
                  Cultivate a culture where education—through mentorship, workshops, and peer-to-peer sessions—is
                  ongoing and adaptive.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Share2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community Impact</h3>
                <p className="text-muted-foreground">
                  Commit to initiatives that not only uplift members professionally but also contribute positively to
                  society at large.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mentorship Approach Section */}
      <section className="mb-16 py-8 md:py-12 lg:py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How Do We Mentor?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-start space-y-3">
                <h3 className="text-xl font-bold">One-on-One Mentoring</h3>
                <p className="text-muted-foreground">
                  Personalized sessions that allow experienced developers to guide individuals through specific
                  challenges and career decisions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-start space-y-3">
                <h3 className="text-xl font-bold">Group Workshops and Bootcamps</h3>
                <p className="text-muted-foreground">
                  Interactive sessions focused on specific technologies or skill sets, encouraging peer learning and
                  collective problem-solving.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-start space-y-3">
                <h3 className="text-xl font-bold">Peer Mentoring Circles</h3>
                <p className="text-muted-foreground">
                  Small groups of members who regularly share experiences and provide mutual support and accountability.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-start space-y-3">
                <h3 className="text-xl font-bold">Project-Based Mentorship</h3>
                <p className="text-muted-foreground">
                  Real-world projects where mentors guide teams through the entire development lifecycle, enhancing
                  practical skills.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-start space-y-3">
                <h3 className="text-xl font-bold">Code Review Sessions</h3>
                <p className="text-muted-foreground">
                  Regular meetups where seasoned developers review code submitted by mentees, offering constructive
                  feedback and best practices.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-start space-y-3">
                <h3 className="text-xl font-bold">Hackathon Guidance</h3>
                <p className="text-muted-foreground">
                  Mentors provide on-site or virtual support during hackathons, helping teams navigate challenges and
                  innovate effectively.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-start space-y-3">
                <h3 className="text-xl font-bold">Career Guidance and Job Placement</h3>
                <p className="text-muted-foreground">
                  Structured mentorship sessions dedicated to resume building, interview preparation, and industry
                  networking.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-start space-y-3">
                <h3 className="text-xl font-bold">Virtual Q&A and Office Hours</h3>
                <p className="text-muted-foreground">
                  Scheduled online sessions where community members can ask questions and receive expert advice in real
                  time.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-start space-y-3">
                <h3 className="text-xl font-bold">Technical Deep-Dive Sessions</h3>
                <p className="text-muted-foreground">
                  In-depth seminars on emerging technologies and trends, led by industry veterans, to keep the community
                  abreast of the latest developments.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16 py-8 md:py-12 lg:py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {loadingCore ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center text-center space-y-2 animate-pulse">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted" />
                    <div className="h-4 w-24 bg-muted rounded mb-1" />
                    <div className="h-3 w-16 bg-muted rounded" />
                  </div>
                ))
              ) : (
                coreTeam.map((member) => (
                  <a
                    key={member._id}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center space-y-2 group hover:bg-accent rounded-xl p-2 transition-colors"
                  >
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                      <Image
                        src={member.image || '/placeholder-avatar.jpg'}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:underline">{member.name}</h3>
                      <p className="text-sm text-muted-foreground ">{member.role}</p>
                    </div>
                  </a>
                ))
              )}
            </div>
        
      </section>
    </div>
  )
}

