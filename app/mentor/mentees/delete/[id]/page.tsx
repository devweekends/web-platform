'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Mentee {
  _id: string;
  name: string;
  email: string;
}

export default function DeleteMenteePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [mentee, setMentee] = useState<Mentee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
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
  
  const handleDelete = async () => {
    setIsDeleting(true);
    setError('');
    
    try {
      const response = await fetch(`/api/mentor/mentees/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete mentee');
      }
      
      router.push('/mentor/dashboard');
    } catch (err) {
      console.error('Error deleting mentee:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete mentee');
      setIsDeleting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <div className="text-center py-12">Loading mentee data...</div>
      </div>
    );
  }
  
  if (!mentee) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <div className="text-center py-12 text-destructive">Mentee not found</div>
        <div className="flex justify-center">
          <Button onClick={() => router.push('/mentor/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-md">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-center">Delete Confirmation</CardTitle>
          <CardDescription className="text-center">
            Are you sure you want to delete this mentee?
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="border rounded-md p-4 mb-6">
            <p className="text-lg font-medium">{mentee.name}</p>
            <p className="text-muted-foreground">{mentee.email}</p>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            This action cannot be undone. This will permanently delete the mentee from your mentorship network.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete} 
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Mentee'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 