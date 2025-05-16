'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, Phone, User, Building2, Github, Linkedin } from 'lucide-react';

interface Mentee {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  university?: string;
  linkedin?: string;
  github?: string;
  leetcode?: string;
  picture?: string;
}

export default function MenteeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [mentee, setMentee] = useState<Mentee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    async function fetchMentee() {
      try {
        const response = await fetch(`/api/mentor/mentees/${id}`);
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/mentor');
            return;
          }
          throw new Error('Failed to fetch mentee');
        }
        
        const data = await response.json();
        setMentee(data);
      } catch (err) {
        console.error('Error fetching mentee:', err);
        setError('Failed to load mentee data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchMentee();
  }, [id, router]);
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="text-center py-12">Loading mentee details...</div>
      </div>
    );
  }
  
  if (error || !mentee) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="text-center py-12 text-destructive">
          {error || 'Mentee not found'}
        </div>
        <div className="flex justify-center">
          <Button onClick={() => router.push('/mentor/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{mentee.name}</CardTitle>
          <CardDescription>Mentee Details</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a 
                      href={`mailto:${mentee.email}`} 
                      className="text-foreground hover:underline"
                    >
                      {mentee.email}
                    </a>
                  </div>
                </div>
                
                {mentee.phone && (
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a 
                        href={`tel:${mentee.phone}`} 
                        className="text-foreground hover:underline"
                      >
                        {mentee.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {mentee.university && (
                  <div className="flex items-start">
                    <Building2 className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">University/Institution</p>
                      <p className="text-foreground">{mentee.university}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Social Profiles */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Social Profiles</h3>
              
              <div className="space-y-3">
                {mentee.github && (
                  <div className="flex items-start">
                    <Github className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">GitHub</p>
                      <a 
                        href={mentee.github.startsWith('http') ? mentee.github : `https://github.com/${mentee.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-foreground hover:underline"
                      >
                        {mentee.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                      </a>
                    </div>
                  </div>
                )}
                
                {mentee.linkedin && (
                  <div className="flex items-start">
                    <Linkedin className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <a 
                        href={mentee.linkedin.startsWith('http') ? mentee.linkedin : `https://linkedin.com/in/${mentee.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-foreground hover:underline"
                      >
                        {mentee.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/, '')}
                      </a>
                    </div>
                  </div>
                )}
                
                {mentee.leetcode && (
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">LeetCode</p>
                      <a 
                        href={mentee.leetcode.startsWith('http') ? mentee.leetcode : `https://leetcode.com/${mentee.leetcode}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-foreground hover:underline"
                      >
                        {mentee.leetcode.replace(/^https?:\/\/(www\.)?leetcode\.com\//, '')}
                      </a>
                    </div>
                  </div>
                )}
                
                {!mentee.github && !mentee.linkedin && !mentee.leetcode && (
                  <p className="text-muted-foreground text-sm">No social profiles provided</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button asChild>
            <Link href={`/mentor/mentees/edit/${id}`}>
              Edit Mentee
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 