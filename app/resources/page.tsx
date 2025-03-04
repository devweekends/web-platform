import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Video, BookOpen, Download, ExternalLink } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4 mb-10">
        <h1 className="text-4xl font-bold">Resources</h1>
        <p className="text-muted-foreground text-lg">
          Access learning materials, guides, and tools to support your tech journey.
        </p>
      </div>

      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="guides">Guides & Tutorials</TabsTrigger>
          <TabsTrigger value="videos">Video Content</TabsTrigger>
          <TabsTrigger value="books">Books & Reading</TabsTrigger>
          <TabsTrigger value="tools">Tools & Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Guide 1 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Web Development</Badge>
                <CardTitle>Getting Started with Next.js</CardTitle>
                <CardDescription>A comprehensive guide for beginners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <FileText className="h-4 w-4" />
                  <span>15 min read</span>
                </div>
                <p className="text-muted-foreground">
                  Learn how to set up your first Next.js project, understand the file structure, and build your first
                  pages.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read Guide
                </Button>
              </CardFooter>
            </Card>

            {/* Guide 2 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">DevOps</Badge>
                <CardTitle>Docker for Beginners</CardTitle>
                <CardDescription>Step-by-step containerization tutorial</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <FileText className="h-4 w-4" />
                  <span>20 min read</span>
                </div>
                <p className="text-muted-foreground">
                  Understand Docker concepts, create your first container, and learn best practices for
                  containerization.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read Guide
                </Button>
              </CardFooter>
            </Card>

            {/* Guide 3 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">AI/ML</Badge>
                <CardTitle>Introduction to Prompt Engineering</CardTitle>
                <CardDescription>Mastering LLM interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <FileText className="h-4 w-4" />
                  <span>25 min read</span>
                </div>
                <p className="text-muted-foreground">
                  Learn the principles of effective prompt engineering to get better results from large language models.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read Guide
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">View All Guides</Button>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Video 1 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Web Development</Badge>
                <CardTitle>Building a Full-Stack App with Next.js</CardTitle>
                <CardDescription>Workshop recording</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Video className="h-4 w-4" />
                  <span>1 hour 20 min</span>
                </div>
                <p className="text-muted-foreground">
                  Watch Sarah Johnson build a complete full-stack application with Next.js, including authentication and
                  database integration.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Watch Video
                </Button>
              </CardFooter>
            </Card>

            {/* Video 2 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">DevOps</Badge>
                <CardTitle>CI/CD Pipeline Implementation</CardTitle>
                <CardDescription>Live coding session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Video className="h-4 w-4" />
                  <span>55 min</span>
                </div>
                <p className="text-muted-foreground">
                  Michael Chen demonstrates how to set up a complete CI/CD pipeline using GitHub Actions and deploy to a
                  cloud provider.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Watch Video
                </Button>
              </CardFooter>
            </Card>

            {/* Video 3 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">AI/ML</Badge>
                <CardTitle>Fine-tuning LLMs for Specific Tasks</CardTitle>
                <CardDescription>Technical deep dive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Video className="h-4 w-4" />
                  <span>1 hour 45 min</span>
                </div>
                <p className="text-muted-foreground">
                  Dr. Priya Patel explains the process of fine-tuning large language models for specific domain tasks
                  and applications.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Watch Video
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="books" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Book 1 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Web Development</Badge>
                <CardTitle>Modern JavaScript for the Impatient</CardTitle>
                <CardDescription>Recommended reading</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <BookOpen className="h-4 w-4" />
                  <span>352 pages</span>
                </div>
                <p className="text-muted-foreground">
                  A concise guide to modern JavaScript features and patterns for experienced developers looking to
                  update their skills.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            {/* Book 2 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">DevOps</Badge>
                <CardTitle>The DevOps Handbook</CardTitle>
                <CardDescription>Essential reading</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <BookOpen className="h-4 w-4" />
                  <span>480 pages</span>
                </div>
                <p className="text-muted-foreground">
                  A comprehensive guide to DevOps principles, practices, and cultural philosophies for transforming your
                  organization.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            {/* Book 3 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">AI/ML</Badge>
                <CardTitle>Hands-On Machine Learning</CardTitle>
                <CardDescription>Practical guide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <BookOpen className="h-4 w-4" />
                  <span>600 pages</span>
                </div>
                <p className="text-muted-foreground">
                  A practical approach to machine learning with scikit-learn, Keras, and TensorFlow, with hands-on
                  examples and exercises.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tool 1 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Web Development</Badge>
                <CardTitle>Next.js Project Starter Template</CardTitle>
                <CardDescription>Development template</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  A production-ready Next.js starter template with TypeScript, Tailwind CSS, authentication, and
                  database setup.
                </p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Download className="h-4 w-4" />
                  <span>1.2k downloads</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Template
                </Button>
              </CardFooter>
            </Card>

            {/* Tool 2 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">DevOps</Badge>
                <CardTitle>CI/CD Workflow Templates</CardTitle>
                <CardDescription>GitHub Actions workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  A collection of ready-to-use GitHub Actions workflow templates for various deployment scenarios and
                  testing strategies.
                </p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Download className="h-4 w-4" />
                  <span>875 downloads</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Templates
                </Button>
              </CardFooter>
            </Card>

            {/* Tool 3 */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">AI/ML</Badge>
                <CardTitle>Prompt Engineering Cheat Sheet</CardTitle>
                <CardDescription>Quick reference guide</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  A comprehensive cheat sheet with prompt patterns, examples, and best practices for working with large
                  language models.
                </p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Download className="h-4 w-4" />
                  <span>2.3k downloads</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Cheat Sheet
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mt-16 py-8 px-6 bg-muted rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold">Contribute to Our Resources</h2>
            <p className="text-muted-foreground">
              Have a guide, tutorial, or tool you'd like to share with the community? We welcome contributions!
            </p>
          </div>
          <div>
            <Button>
              Submit a Resource <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

