import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users, Calendar, ArrowRight } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4 mb-10">
        <h1 className="text-4xl font-bold">Community</h1>
        <p className="text-muted-foreground text-lg">
          Connect with fellow developers, share experiences, and grow together.
        </p>
      </div>

      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            {/* Discussion 1 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Best practices for CI/CD in small teams</CardTitle>
                    <CardDescription>Started by Michael Chen • 2 days ago</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>24 replies</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  I'm working with a small team of 5 developers and we're looking to improve our CI/CD pipeline. What
                  are some best practices that have worked well for other small teams?
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Join Discussion</Button>
              </CardFooter>
            </Card>

            {/* Discussion 2 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Transitioning from traditional ML to LLMs</CardTitle>
                    <CardDescription>Started by Dr. Priya Patel • 1 week ago</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>42 replies</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For those who have been working with traditional ML models, what was your experience transitioning to
                  working with LLMs? What were the biggest challenges and learning curves?
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Join Discussion</Button>
              </CardFooter>
            </Card>

            {/* Discussion 3 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>React Server Components: Experiences and Patterns</CardTitle>
                    <CardDescription>Started by Sarah Johnson • 3 days ago</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>18 replies</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  I've been using React Server Components in production for a few months now. Let's share experiences,
                  patterns, and challenges we've encountered.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Join Discussion</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">View All Discussions</Button>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Virtual Coffee & Code</CardTitle>
                <CardDescription>Weekly casual coding session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Every Wednesday • 7:00 PM - 8:30 PM EST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Users className="h-4 w-4" />
                  <span>32 attending</span>
                </div>
                <p className="text-muted-foreground">
                  Bring your laptop and a coffee for this casual weekly coding session. Work on personal projects, ask
                  for help, or just hang out with fellow developers.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">RSVP</Button>
              </CardFooter>
            </Card>

            {/* Event 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Tech Talk: The Future of Web Development</CardTitle>
                <CardDescription>Special guest speaker event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>April 15, 2025 • 6:00 PM - 8:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Users className="h-4 w-4" />
                  <span>87 attending</span>
                </div>
                <p className="text-muted-foreground">
                  Join us for an exciting talk about the future of web development with special guest speaker Alex
                  Thompson, CTO of WebTech Inc.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">RSVP</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Group 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Frontend Developers</CardTitle>
                <CardDescription>246 members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A group for frontend developers to discuss the latest frameworks, tools, and best practices in UI/UX
                  development.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Join Group</Button>
              </CardFooter>
            </Card>

            {/* Group 2 */}
            <Card>
              <CardHeader>
                <CardTitle>DevOps Enthusiasts</CardTitle>
                <CardDescription>189 members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share knowledge about CI/CD, infrastructure as code, containerization, and all things DevOps.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Join Group</Button>
              </CardFooter>
            </Card>

            {/* Group 3 */}
            <Card>
              <CardHeader>
                <CardTitle>AI & ML Practitioners</CardTitle>
                <CardDescription>173 members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Discuss machine learning algorithms, AI applications, and the latest research in the field.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Join Group</Button>
              </CardFooter>
            </Card>

            {/* Group 4 */}
            <Card>
              <CardHeader>
                <CardTitle>Cloud Computing</CardTitle>
                <CardDescription>215 members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For professionals working with AWS, Azure, GCP, and other cloud platforms to share experiences and
                  solutions.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Join Group</Button>
              </CardFooter>
            </Card>

            {/* Group 5 */}
            <Card>
              <CardHeader>
                <CardTitle>Career Changers</CardTitle>
                <CardDescription>128 members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Support group for those transitioning into tech from other fields, sharing resources and advice.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Join Group</Button>
              </CardFooter>
            </Card>

            {/* Group 6 */}
            <Card>
              <CardHeader>
                <CardTitle>Open Source Contributors</CardTitle>
                <CardDescription>97 members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Collaborate on open source projects, find contributors, and discuss open source development.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Join Group</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mt-16 py-8 px-6 bg-muted rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold">Join Our Community Today</h2>
            <p className="text-muted-foreground">
              Connect with mentors and peers, attend sessions, and accelerate your tech career.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button>Sign Up</Button>
            <Button variant="outline">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

