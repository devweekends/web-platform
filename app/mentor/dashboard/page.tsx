'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Plus, Users, User, Edit, Trash } from 'lucide-react';

// Define Mentee type
interface Mentee {
  _id: string;
  name: string;
  email: string;
  university?: string;
  picture?: string;
}

export default function MentorDashboard() {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch mentor's mentees
    async function fetchMentees() {
      try {
        const response = await fetch('/api/mentor/mentees');
        
        if (!response.ok) {
          if (response.status === 401) {
            // Unauthorized, redirect to login
            router.push('/mentor');
            return;
          }
          throw new Error('Failed to fetch mentees');
        }
        
        const data = await response.json();
        setMentees(data);
      } catch (err) {
        console.error('Error fetching mentees:', err);
        setError('Failed to load mentees');
      } finally {
        setLoading(false);
      }
    }
    
    fetchMentees();
  }, [router]);

  const handleLogout = async () => {
    try {
      // Clear the cookie
      document.cookie = 'mentor-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      router.push('/mentor');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        <Button variant="ghost" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      <Tabs defaultValue="mentees" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="mentees">
            <Users className="mr-2 h-4 w-4" />
            My Mentees
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            My Profile
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="mentees">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Mentees</h2>
            <Button asChild>
              <Link href="/mentor/mentees/add">
                <Plus className="mr-2 h-4 w-4" /> Add Mentee
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">Loading mentees...</div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">{error}</div>
          ) : mentees.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No mentees yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't added any mentees to your network yet.
                </p>
                <Button asChild>
                  <Link href="/mentor/mentees/add">
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Mentee
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentees.map((mentee) => (
                <Card key={mentee._id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{mentee.name}</CardTitle>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/mentor/mentees/edit/${mentee._id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/mentor/mentees/delete/${mentee._id}`}>
                            <Trash className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{mentee.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    {mentee.university && (
                      <div className="text-sm text-muted-foreground mb-2">
                        {mentee.university}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/mentor/mentees/${mentee._id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>
                View and manage your profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Profile management features will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 