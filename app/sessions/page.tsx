import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Users, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SessionsPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4 mb-10">
        <h1 className="text-4xl font-bold">Upcoming Sessions</h1>
        <p className="text-muted-foreground text-lg">
          Browse and register for our upcoming mentorship sessions led by industry experts. Filter by topic, date, or
          mentor to find the perfect session for your learning journey.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input placeholder="Search sessions..." />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              <SelectItem value="web">Web Development</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
              <SelectItem value="cloud">Cloud Computing</SelectItem>
              <SelectItem value="ai">Machine Learning/AI</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="upcoming">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="past">Past Sessions</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sessions Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Sessions</TabsTrigger>
          <TabsTrigger value="web">Web Dev</TabsTrigger>
          <TabsTrigger value="devops">DevOps</TabsTrigger>
          <TabsTrigger value="cloud">Cloud</TabsTrigger>
          <TabsTrigger value="ai">AI/ML</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Session Card 1 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Web Development</Badge>
                <CardTitle>Modern React Patterns</CardTitle>
                <CardDescription>Learn advanced React patterns and best practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Saturday, March 15, 2025</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>10:00 AM - 12:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Sarah Johnson, Senior Frontend Developer</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>

            {/* Session Card 2 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">DevOps</Badge>
                <CardTitle>CI/CD Pipeline Mastery</CardTitle>
                <CardDescription>Build robust CI/CD pipelines for your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Sunday, March 16, 2025</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>1:00 PM - 3:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Michael Chen, DevOps Engineer</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>

            {/* Session Card 3 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">AI/ML</Badge>
                <CardTitle>Intro to Large Language Models</CardTitle>
                <CardDescription>Understanding and implementing LLMs in your applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Saturday, March 22, 2025</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>11:00 AM - 1:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Dr. Priya Patel, AI Researcher</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>

            {/* Session Card 4 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Cloud Computing</Badge>
                <CardTitle>Serverless Architecture</CardTitle>
                <CardDescription>Building scalable applications with serverless technologies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Sunday, March 23, 2025</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>2:00 PM - 4:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>James Wilson, Cloud Architect</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>

            {/* Session Card 5 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Web Development</Badge>
                <CardTitle>Next.js App Router Deep Dive</CardTitle>
                <CardDescription>Master the latest features of Next.js App Router</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Saturday, March 29, 2025</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>10:00 AM - 12:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>David Kim, Full Stack Developer</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>

            {/* Session Card 6 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">DevOps</Badge>
                <CardTitle>Kubernetes for Beginners</CardTitle>
                <CardDescription>Getting started with container orchestration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Sunday, March 30, 2025</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>1:00 PM - 3:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Lisa Rodriguez, DevOps Specialist</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More Sessions</Button>
          </div>
        </TabsContent>

        <TabsContent value="web" className="space-y-8">
          {/* Web Development Sessions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Web Development</Badge>
                <CardTitle>Modern React Patterns</CardTitle>
                <CardDescription>Learn advanced React patterns and best practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Saturday, March 15, 2025</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>10:00 AM - 12:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Sarah Johnson, Senior Frontend Developer</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Web Development</Badge>
                <CardTitle>Next.js App Router Deep Dive</CardTitle>
                <CardDescription>Master the latest features of Next.js App Router</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Saturday, March 29, 2025</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>10:00 AM - 12:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>David Kim, Full Stack Developer</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs content would be similar */}
      </Tabs>
    </div>
  )
}

