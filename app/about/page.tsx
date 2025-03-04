import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Timeline from "@/components/timeline"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, Award, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4 mb-10">
        <h1 className="text-4xl font-bold">About Dev Weekends</h1>
        <p className="text-muted-foreground text-lg">
          Learn about our mission, values, and the team behind Dev Weekends.
        </p>
      </div>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            Dev Weekends was founded with a simple yet powerful mission: to make quality tech mentorship accessible to everyone, regardless of their background or experience level.
          </p>
          <p className="text-muted-foreground mb-4">
            We believe that personalized guidance from experienced professionals is one of the most effective ways to learn and grow in the tech industry. Our community brings together mentors and learners in a supportive environment where knowledge sharing and collaboration are encouraged.
          </p>
          <p className="text-muted-foreground">
            Through our weekend sessions, resources, and community platform, we aim to help individuals accelerate their learning journey and achieve their career goals in technology.
          </p>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mqSImhcpQVcNR5qvCyOav9qYXJf6pl.png" 
            alt="Dev Weekends Community" 
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community First</h3>
                <p className="text-muted-foreground">
                  We believe in the power of community and create spaces where everyone feels welcome and supported.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Quality Education</h3>
                <p className="text-muted-foreground">
                  We are committed to providing high-quality, practical education that helps people solve real-world problems.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Inclusivity</h3>
                <p className="text-muted-foreground">
                  We embrace diversity and create an inclusive environment where everyone has equal opportunities to learn and grow.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Continuous Learning</h3>
                <p className="text-muted-foreground">
                  We foster a culture of continuous learning and improvement, both for our community members and ourselves.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        
        <Tabs defaultValue="leadership" className="w-full">
          <TabsList className="mb-6 justify-center">
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
            <TabsTrigger value="mentors">Core Mentors</TabsTrigger>
            <TabsTrigger value="community">Community Team</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leadership" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-40 h-40 rounded-full overflow-hidden">
                  <Image 
                   src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mqSImhcpQVcNR5qvCyOav9qYXJf6pl.png" 
                    alt="Alex Thompson" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Alex Thompson</h3>
                  <p className="text-muted-foreground">Founder & CEO</p>
                </div>
                <p className="text-muted-foreground">
                  Former tech lead at a major tech company who founded Dev Weekends to help others navigate their tech careers.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-40 h-40 rounded-full overflow-hidden">
                  <Image 
               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mqSImhcpQVcNR5qvCyOav9qYXJf6pl.png" 
                    alt="Maya Rodriguez" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Maya Rodriguez</h3>
                  <p className="text-muted-foreground">COO</p>
                </div>
                <p className="text-muted-foreground">
                  Operations expert with a passion for creating efficient systems and processes that help communities thrive.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-40 h-40 rounded-full overflow-hidden">
                  <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mqSImhcpQVcNR5qvCyOav9qYXJf6pl.png" 
                    alt="Jason Lee" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Jason Lee</h3>
                  <p className="text-muted-foreground">CTO</p>
                </div>
                <p className="text-muted-foreground">
                  Experienced engineering leader who oversees the technical direction and platform development for Dev Weekends.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mentors" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Core Mentors would be listed here */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mqSImhcpQVcNR5qvCyOav9qYXJf6pl.png" 
                      alt={`Core Mentor ${i + 1}`} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Core Mentor {i + 1}</h3>
                    <p className="text-sm text-muted-foreground">Specialty Area</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Link href="/mentors">
                <Button variant="outline">View All Mentors</Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="community" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Community Team would be listed here */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image 
                     src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mqSImhcpQVcNR5qvCyOav9qYXJf6pl.png" 
                      alt={`Community Team Member ${i + 1}`} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Team Member {i + 1}</h3>
                    <p className="text-sm text-muted-foreground">Role</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
              <Timeline/>
   
</div>
);
}

