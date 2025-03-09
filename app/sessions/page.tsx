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
            {/* GSoC Sunday Meetup */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Open Source</Badge>
                <CardTitle>GSoC Sunday Meetup</CardTitle>
                <CardDescription>Weekly Google Summer of Code mentorship and guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Every Saturday</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>3:30 PM PKT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Aqib Nawab and Muhammad Saqlain</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Calender on Home Page to Join
                </Button>
              </CardFooter>
            </Card>

            {/* Dev Weekends DevOps Bootcamp */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">DevOps</Badge>
                <CardTitle>Dev Weekends DevOps Bootcamp</CardTitle>
                <CardDescription>Learn the DevOps from basic concepts to Advance concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Every Saturday</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>9:00 PM PKT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Sheryar Ahmad, Software Engineer</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Calender on Home Page to Join
                </Button>
              </CardFooter>
            </Card>

            {/* DW Ramdan Upwork Series */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Freelancing</Badge>
                <CardTitle>DW Ramdan Upwork Series</CardTitle>
                <CardDescription>Master Upwork to build your successfull freelancing career </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Every Sunday</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>9:30 PM PKT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Fiaz Ahmad, Top Rated Upworker</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Calender on Home Page to Join
                </Button>
              </CardFooter>
            </Card>

            {/* DW Remote Jobs Series */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Career</Badge>
                <CardTitle>DW Remote Jobs Series</CardTitle>
                <CardDescription>Find and secure remote job opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Every Sunday</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>3:00 PM PKT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Muhammad Shehroz, Software Engineer</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Calender on Home Page to Join
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="web" className="space-y-8">
          {/* Web Development Sessions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Open Source</Badge>
                <CardTitle>GSoC Sunday Meetup</CardTitle>
                <CardDescription>Weekly Google Summer of Code mentorship and guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Every Saturday</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>3:30 PM PKT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Aqib Nawab and Muhammad Saqlain</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Calender on Home Page to Join
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devops" className="space-y-8">
          {/* DevOps Sessions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">DevOps</Badge>
                <CardTitle>Dev Weekends DevOps Bootcamp</CardTitle>
                <CardDescription>Learn DevOps from the basic to advance concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Every Saturday</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>9:00 PM PKT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Sheryar Ahmad, Software Engineer</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Calender on Home Page to Join
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cloud" className="space-y-8">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No current session</p>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-8">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No current session</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

