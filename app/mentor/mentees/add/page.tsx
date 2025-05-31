'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload } from 'lucide-react';

export default function AddMenteePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    leetcode: '',
    university: '',
    picture: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('File must be an image');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      setFormData(prev => ({ ...prev, picture: result }));
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setError('Name and email are required fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/mentor/mentees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add mentee');
      }
      
      // Notify other tabs about the new mentee
      try {
        localStorage.setItem('mentorship-data-updated', JSON.stringify({
          type: 'mentee',
          action: 'create',
          timestamp: Date.now()
        }));
        localStorage.removeItem('mentorship-data-updated'); // Trigger storage event
        
        window.dispatchEvent(new CustomEvent('mentorship-data-updated', {
          detail: { type: 'mentee', action: 'create', data: data }
        }));
      } catch (error) {
        console.warn('Cross-tab communication not available:', error);
      }
      
      router.push('/mentor/dashboard');
    } catch (err) {
      console.error('Error adding mentee:', err);
      setError(err instanceof Error ? err.message : 'Failed to add mentee');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Mentee</CardTitle>
          <CardDescription>
            Add a new mentee to your mentorship network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="picture">Profile Picture</Label>
              <div className="flex flex-col items-center gap-4">
                {imagePreview && (
                  <div className="relative w-24 h-24 overflow-hidden rounded-full border-2 border-primary/20">
                    <img 
                      src={imagePreview} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="w-full">
                  <Label 
                    htmlFor="picture-upload" 
                    className="flex items-center justify-center w-full h-20 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none dark:bg-background dark:border-gray-600 dark:hover:border-gray-500"
                  >
                    <span className="flex flex-col items-center space-y-2">
                      <Upload className="w-6 h-6 text-gray-500" />
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        {imagePreview ? 'Change picture' : 'Click to upload profile picture'}
                      </span>
                    </span>
                    <input 
                      id="picture-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Optional. Recommended size: 200x200 pixels.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="university">University/Institution</Label>
              <Input
                id="university"
                name="university"
                placeholder="University or institution name"
                value={formData.university}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                name="linkedin"
                placeholder="LinkedIn profile URL"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Profile</Label>
              <Input
                id="github"
                name="github"
                placeholder="GitHub username"
                value={formData.github}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leetcode">LeetCode Profile</Label>
              <Input
                id="leetcode"
                name="leetcode"
                placeholder="LeetCode username"
                value={formData.leetcode}
                onChange={handleChange}
              />
            </div>
            
            {error && (
              <div className="text-sm font-medium text-destructive">{error}</div>
            )}
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Mentee'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 