import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, ArrowRight } from "lucide-react"

const mentors = [
  {
    name: "Zeeshan Adil",
    role: "Lead Engineer | Expert Vetted Upworker",
    skills: ["K8s", "AWS", ".NET"],
    linkedin: "https://www.linkedin.com/in/zeeshanadilbutt/",
    image: "/m2.jpg",
  },
  {
    name: "Fiaz Ahmad",
    role: "TOP RATED PLUS (Top 3%) @ Upwork ",
    skills: ["CI/CD", "Docker", "Kubernetes"],
    linkedin: "https://www.linkedin.com/in/fiazahmad/",
    image: "/m5.jpeg",
  },
  {
    name: "Moeez Ahmad",
    role: "SWE @ Calo",
    skills: ["Full Stack", "DevOps", "Serverless"],
    linkedin: "https://www.linkedin.com/in/moeezahmad01/",
    image: "/m4.jpg",
  },
  {
    name: "Tanzeel Saleem",
    role: "Founder @ DevNexus",
    skills: ["AWS", "Azure", "Serverless"],
    linkedin: "https://www.linkedin.com/in/tanzeel-saleem/",
    image: "/m1.jpg",
  },
]

export default function MentorsPage() {
  return (
    <div className="container py-10">
  

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

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Want to Become a Mentor?</h2>
        <p className="text-muted-foreground text-lg mb-6 max-w-[600px] mx-auto">
          Share your expertise and help shape the next generation of tech professionals.
        </p>
        <Button size="lg" className="rounded-full">
          Apply to be a Mentor <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

