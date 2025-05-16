'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Shield, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MentorCredentialsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    async function fetchMentor() {
      try {
        const response = await fetch(`/api/admin/mentors?id=${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch mentor');
        }
        
        const data = await response.json();
        setMentor(data);
        setUsername(data.username || '');
      } catch (err) {
        console.error('Error fetching mentor:', err);
        setError('Failed to load mentor data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchMentor();
  }, [id]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password && password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (!username) {
      setError('Username is required');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(`/api/admin/mentors?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...mentor,
          username,
          password: password || undefined // Only send password if it's not empty
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update mentor credentials');
      }
      
      setSuccess('Mentor credentials updated successfully');
      
      // Clear password fields after successful update
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error updating mentor credentials:', err);
      setError(err instanceof Error ? err.message : 'Failed to update mentor credentials');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <div className="text-center py-12">Loading mentor data...</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Mentorship
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Set Mentor Credentials
          </CardTitle>
          <CardDescription>
            {mentor?.username 
              ? `Update login credentials for ${mentor.name}`
              : `Create login credentials for ${mentor?.name || 'the mentor'}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30">
              <Check className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="flex gap-2">
                <User className="h-4 w-4 mt-3 text-muted-foreground" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter a username"
                  required
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                This username will be used for the mentor to log in
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">
                {mentor?.username ? 'New Password (leave blank to keep current)' : 'Password'}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mentor?.username ? 'New password (optional)' : 'Enter a password'}
                required={!mentor?.username}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {mentor?.username ? 'Confirm New Password' : 'Confirm Password'}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required={!mentor?.username || password.length > 0}
              />
            </div>
          
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : (mentor?.username ? 'Update Credentials' : 'Create Credentials')}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <div className="text-sm text-center text-muted-foreground">
            After setting credentials, mentors can log in at{' '}
            <Link href="/mentor" className="text-primary font-medium hover:underline">
              /mentor
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 