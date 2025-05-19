'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2, Plus, Trash2, Edit, Youtube } from 'lucide-react';

// MindMaster Admin Page
export default function MindMasterAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('talkOfTheWeek');
  
  // New talk form
  const [newTalk, setNewTalk] = useState({
    title: '',
    bio: '',
    youtubeEmbedId: '',
    isPlaylist: false,
    isActive: true
  });
  
  // State for MindMaster content
  const [mindmasterData, setMindmasterData] = useState({
    talkOfTheWeek: {
      title: '',
      description: '',
      speaker: '',
      videoUrl: '',
      imageUrl: '',
      youtubeEmbedId: '',
      isActive: false
    },
    talkOfTheMonth: {
      title: '',
      description: '',
      speaker: '',
      videoUrl: '',
      imageUrl: '',
      youtubeEmbedId: '',
      isActive: false
    },
    bookOfTheWeek: {
      title: '',
      author: '',
      description: '',
      imageUrl: '',
      link: '',
      isActive: false
    },
    bookOfTheMonth: {
      title: '',
      author: '',
      description: '',
      imageUrl: '',
      link: '',
      isActive: false
    },
    recommendedTalks: []
  });
  
  // Load MindMaster data on component mount
  useEffect(() => {
    const fetchMindMasterData = async () => {
      try {
        setLoading(true);
        setError('');
        
        console.log('Fetching mindmaster data...');
        const response = await fetch('/api/admin/mindmaster', {
          // Add cache: no-store to prevent caching issues
          cache: 'no-store',
          headers: {
            'pragma': 'no-cache',
            'cache-control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to login if unauthorized
            router.push('/admin/login');
            return;
          }
          
          let errorMessage = 'Failed to load MindMaster data';
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
            console.error('API error details:', errorData);
          } catch (parseError) {
            console.error('Error parsing error response:', parseError);
          }
          
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data);
        setMindmasterData(data);
      } catch (err) {
        setError(`Failed to load MindMaster data: ${err.message}`);
        console.error('Error fetching mindmaster data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMindMasterData();
  }, [router]);
  
  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setMindmasterData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  // Handle toggle for active status
  const handleToggleActive = (section) => {
    setMindmasterData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        isActive: !prev[section].isActive
      }
    }));
  };
  
  // Handle new talk input change
  const handleNewTalkChange = (field, value) => {
    setNewTalk(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Extract YouTube video ID from URL
  const extractYoutubeId = (url) => {
    if (!url) return '';
    
    // Check if it's a playlist
    const playlistMatch = url.match(/[&?]list=([^&]+)/i);
    if (playlistMatch) {
      return playlistMatch[1]; // Return playlist ID
    }
    
    // Otherwise check for video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11)
      ? match[2]
      : '';
  };
  
  // Check if a YouTube URL is a playlist
  const isYoutubePlaylist = (url) => {
    if (!url) return false;
    return url.includes('list=');
  };
  
  // Handle YouTube URL change for new talk
  const handleNewTalkYoutubeUrlChange = (url) => {
    const youtubeId = extractYoutubeId(url);
    const isPlaylist = isYoutubePlaylist(url);
    
    setNewTalk(prev => ({
      ...prev,
      youtubeEmbedId: youtubeId,
      isPlaylist: isPlaylist
    }));
  };
  
  // Handle YouTube URL change and extract ID
  const handleYoutubeUrlChange = (section, url) => {
    const youtubeId = extractYoutubeId(url);
    const isPlaylist = isYoutubePlaylist(url);
    
    setMindmasterData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        videoUrl: url,
        youtubeEmbedId: youtubeId,
        isPlaylist: isPlaylist
      }
    }));
  };
  
  // Save MindMaster content
  const handleSave = async (section) => {
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        [section]: mindmasterData[section]
      };
      
      console.log(`Saving ${section}:`, JSON.stringify(payload));
      
      const response = await fetch('/api/admin/mindmaster', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'pragma': 'no-cache',
          'cache-control': 'no-cache'
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      });
      
      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        const errorMessage = responseData.error || responseData.details || 'Failed to save changes';
        console.error('Server error:', responseData);
        throw new Error(errorMessage);
      }
      
      // Update state with returned data
      if (responseData.data) {
        console.log('Successfully updated data:', responseData.data);
        setMindmasterData(responseData.data);
      }
      
      setSuccess(`${section.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} updated successfully!`);
    } catch (err) {
      setError(`Failed to save changes: ${err.message}`);
      console.error('Error saving data:', err);
    } finally {
      setSaving(false);
    }
  };
  
  // Handle adding a new recommended talk
  const handleAddRecommendedTalk = async () => {
    // Simple validation
    if (!newTalk.title || !newTalk.bio || !newTalk.youtubeEmbedId) {
      setError('Please fill in all required fields for the recommended talk.');
      return;
    }
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        recommendedTalks: true,
        action: 'add',
        recommendedTalk: newTalk
      };
      
      console.log('Adding new talk:', JSON.stringify(payload));
      
      const response = await fetch('/api/admin/mindmaster', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'pragma': 'no-cache',
          'cache-control': 'no-cache'
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      });
      
      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        const errorMessage = responseData.error || responseData.details || 'Failed to add recommended talk';
        console.error('Server error:', responseData);
        throw new Error(errorMessage);
      }
      
      // Update state with returned data
      if (responseData.data) {
        console.log('Successfully added talk:', responseData.data);
        setMindmasterData(responseData.data);
      }
      
      // Reset form
      setNewTalk({
        title: '',
        bio: '',
        youtubeEmbedId: '',
        isPlaylist: false,
        isActive: true
      });
      
      setSuccess('Recommended talk added successfully!');
    } catch (err) {
      setError(`Failed to add recommended talk: ${err.message}`);
      console.error('Error adding talk:', err);
    } finally {
      setSaving(false);
    }
  };
  
  // Handle removing a recommended talk
  const handleRemoveRecommendedTalk = async (talkId) => {
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        recommendedTalks: true,
        action: 'remove',
        talkId
      };
      
      console.log('Removing talk:', JSON.stringify(payload));
      
      const response = await fetch('/api/admin/mindmaster', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'pragma': 'no-cache',
          'cache-control': 'no-cache'
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      });
      
      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        const errorMessage = responseData.error || responseData.details || 'Failed to remove recommended talk';
        console.error('Server error:', responseData);
        throw new Error(errorMessage);
      }
      
      // Update state with returned data
      if (responseData.data) {
        console.log('Successfully removed talk:', responseData.data);
        setMindmasterData(responseData.data);
      }
      
      setSuccess('Recommended talk removed successfully!');
    } catch (err) {
      setError(`Failed to remove recommended talk: ${err.message}`);
      console.error('Error removing talk:', err);
    } finally {
      setSaving(false);
    }
  };
  
  // Toggle active status for a recommended talk
  const handleToggleRecommendedTalkActive = async (talkId, currentStatus) => {
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const payload = {
        recommendedTalks: true,
        action: 'update',
        talkId,
        recommendedTalk: {
          isActive: !currentStatus
        }
      };
      
      console.log('Toggling talk status:', JSON.stringify(payload));
      
      const response = await fetch('/api/admin/mindmaster', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'pragma': 'no-cache',
          'cache-control': 'no-cache'
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      });
      
      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        const errorMessage = responseData.error || responseData.details || 'Failed to update recommended talk';
        console.error('Server error:', responseData);
        throw new Error(errorMessage);
      }
      
      // Update state with returned data
      if (responseData.data) {
        console.log('Successfully updated talk status:', responseData.data);
        setMindmasterData(responseData.data);
      }
      
      setSuccess('Recommended talk updated successfully!');
    } catch (err) {
      setError(`Failed to update recommended talk: ${err.message}`);
      console.error('Error updating talk:', err);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold tracking-tight mb-6">MindMaster Content Management</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="mb-6 border-green-600 text-green-600 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="talkOfTheWeek" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="talkOfTheWeek">Talk of the Week</TabsTrigger>
          <TabsTrigger value="talkOfTheMonth">Talk of the Month</TabsTrigger>
          <TabsTrigger value="bookOfTheWeek">Book of the Week</TabsTrigger>
          <TabsTrigger value="bookOfTheMonth">Book of the Month</TabsTrigger>
          <TabsTrigger value="recommendedTalks">Recommended Talks</TabsTrigger>
        </TabsList>
        
        {/* Talk of the Week */}
        <TabsContent value="talkOfTheWeek">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Talk of the Week</CardTitle>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="talkOfTheWeekActive">Active</Label>
                  <Switch
                    id="talkOfTheWeekActive"
                    checked={mindmasterData.talkOfTheWeek.isActive}
                    onCheckedChange={() => handleToggleActive('talkOfTheWeek')}
                  />
                </div>
              </div>
              <CardDescription>Manage the current talk of the week content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="talkOfTheWeekTitle">Title</Label>
                <Input 
                  id="talkOfTheWeekTitle"
                  value={mindmasterData.talkOfTheWeek.title}
                  onChange={(e) => handleInputChange('talkOfTheWeek', 'title', e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="talkOfTheWeekDescription">Description</Label>
                <Textarea 
                  id="talkOfTheWeekDescription"
                  rows={4}
                  value={mindmasterData.talkOfTheWeek.description}
                  onChange={(e) => handleInputChange('talkOfTheWeek', 'description', e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="talkOfTheWeekVideoUrl">YouTube Video URL</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="talkOfTheWeekVideoUrl"
                    value={mindmasterData.talkOfTheWeek.videoUrl || ''}
                    onChange={(e) => handleYoutubeUrlChange('talkOfTheWeek', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <Youtube className="h-5 w-5 text-red-500" />
                </div>
                {mindmasterData.talkOfTheWeek.youtubeEmbedId && (
                  <div className="text-xs text-muted-foreground mt-1">
                    YouTube ID: {mindmasterData.talkOfTheWeek.youtubeEmbedId}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSave('talkOfTheWeek')}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Talk of the Month */}
        <TabsContent value="talkOfTheMonth">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Talk of the Month</CardTitle>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="talkOfTheMonthActive">Active</Label>
                  <Switch
                    id="talkOfTheMonthActive"
                    checked={mindmasterData.talkOfTheMonth.isActive}
                    onCheckedChange={() => handleToggleActive('talkOfTheMonth')}
                  />
                </div>
              </div>
              <CardDescription>Manage the current talk of the month content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="talkOfTheMonthTitle">Title</Label>
                <Input 
                  id="talkOfTheMonthTitle"
                  value={mindmasterData.talkOfTheMonth.title}
                  onChange={(e) => handleInputChange('talkOfTheMonth', 'title', e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="talkOfTheMonthDescription">Description</Label>
                <Textarea 
                  id="talkOfTheMonthDescription"
                  rows={4}
                  value={mindmasterData.talkOfTheMonth.description}
                  onChange={(e) => handleInputChange('talkOfTheMonth', 'description', e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="talkOfTheMonthVideoUrl">YouTube Video URL</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="talkOfTheMonthVideoUrl"
                    value={mindmasterData.talkOfTheMonth.videoUrl || ''}
                    onChange={(e) => handleYoutubeUrlChange('talkOfTheMonth', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <Youtube className="h-5 w-5 text-red-500" />
                </div>
                {mindmasterData.talkOfTheMonth.youtubeEmbedId && (
                  <div className="text-xs text-muted-foreground mt-1">
                    YouTube ID: {mindmasterData.talkOfTheMonth.youtubeEmbedId}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSave('talkOfTheMonth')}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Book of the Week */}
        <TabsContent value="bookOfTheWeek">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Book of the Week</CardTitle>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="bookOfTheWeekActive">Active</Label>
                  <Switch
                    id="bookOfTheWeekActive"
                    checked={mindmasterData.bookOfTheWeek.isActive}
                    onCheckedChange={() => handleToggleActive('bookOfTheWeek')}
                  />
                </div>
              </div>
              <CardDescription>Manage the current book of the week content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="bookOfTheWeekTitle">Title</Label>
                <Input 
                  id="bookOfTheWeekTitle"
                  value={mindmasterData.bookOfTheWeek.title}
                  onChange={(e) => handleInputChange('bookOfTheWeek', 'title', e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="bookOfTheWeekAuthor">Author</Label>
                <Input 
                  id="bookOfTheWeekAuthor"
                  value={mindmasterData.bookOfTheWeek.author}
                  onChange={(e) => handleInputChange('bookOfTheWeek', 'author', e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="bookOfTheWeekBio">Bio</Label>
                <Textarea 
                  id="bookOfTheWeekBio"
                  rows={4}
                  value={mindmasterData.bookOfTheWeek.bio}
                  onChange={(e) => handleInputChange('bookOfTheWeek', 'bio', e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSave('bookOfTheWeek')}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Book of the Month */}
        <TabsContent value="bookOfTheMonth">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Book of the Month</CardTitle>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="bookOfTheMonthActive">Active</Label>
                  <Switch
                    id="bookOfTheMonthActive"
                    checked={mindmasterData.bookOfTheMonth.isActive}
                    onCheckedChange={() => handleToggleActive('bookOfTheMonth')}
                  />
                </div>
              </div>
              <CardDescription>Manage the current book of the month content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="bookOfTheMonthTitle">Title</Label>
                <Input 
                  id="bookOfTheMonthTitle"
                  value={mindmasterData.bookOfTheMonth.title}
                  onChange={(e) => handleInputChange('bookOfTheMonth', 'title', e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="bookOfTheMonthAuthor">Author</Label>
                <Input 
                  id="bookOfTheMonthAuthor"
                  value={mindmasterData.bookOfTheMonth.author}
                  onChange={(e) => handleInputChange('bookOfTheMonth', 'author', e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="bookOfTheMonthBio">Bio</Label>
                <Textarea 
                  id="bookOfTheMonthBio"
                  rows={4}
                  value={mindmasterData.bookOfTheMonth.bio}
                  onChange={(e) => handleInputChange('bookOfTheMonth', 'bio', e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSave('bookOfTheMonth')}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Recommended Talks */}
        <TabsContent value="recommendedTalks">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Talks</CardTitle>
              <CardDescription>Add and manage recommended YouTube videos and playlists</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add new talk form */}
              <div className="border rounded-md p-4 bg-muted/20">
                <h3 className="text-lg font-medium mb-4">Add New Recommended Talk</h3>
                <div className="grid gap-4">
                  <div className="grid w-full gap-2">
                    <Label htmlFor="newTalkTitle">Title</Label>
                    <Input 
                      id="newTalkTitle"
                      value={newTalk.title}
                      onChange={(e) => handleNewTalkChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid w-full gap-2">
                    <Label htmlFor="newTalkBio">Bio</Label>
                    <Textarea 
                      id="newTalkBio"
                      rows={3}
                      value={newTalk.bio}
                      onChange={(e) => handleNewTalkChange('bio', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid w-full gap-2">
                    <Label htmlFor="newTalkYoutubeUrl">YouTube Video or Playlist URL</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="newTalkYoutubeUrl"
                        placeholder="https://www.youtube.com/watch?v=... or https://www.youtube.com/playlist?list=..."
                        onChange={(e) => handleNewTalkYoutubeUrlChange(e.target.value)}
                      />
                      <Youtube className="h-5 w-5 text-red-500" />
                    </div>
                    {newTalk.youtubeEmbedId && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {newTalk.isPlaylist ? 'Playlist' : 'Video'} ID: {newTalk.youtubeEmbedId}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="newTalkIsActive"
                      checked={newTalk.isActive}
                      onCheckedChange={(checked) => handleNewTalkChange('isActive', checked)}
                    />
                    <Label htmlFor="newTalkIsActive">Active</Label>
                  </div>
                  
                  {newTalk.youtubeEmbedId && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <div className="aspect-video w-full max-w-md">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${newTalk.isPlaylist ? 'videoseries?list=' + newTalk.youtubeEmbedId : newTalk.youtubeEmbedId}`}
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <Button 
                    onClick={handleAddRecommendedTalk} 
                    disabled={saving}
                    className="w-full sm:w-auto"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Recommended Talk
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* List of existing recommended talks */}
              <div>
                <h3 className="text-lg font-medium mb-4">Current Recommended Talks</h3>
                
                {!mindmasterData.recommendedTalks || mindmasterData.recommendedTalks.length === 0 ? (
                  <div className="text-muted-foreground text-center py-8">
                    No recommended talks added yet. Add your first talk above.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mindmasterData.recommendedTalks.map((talk, index) => (
                      <div key={talk._id || index} className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{talk.title}</h4>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2 mr-4">
                              <Switch
                                id={`talk-${talk._id}-active`}
                                checked={talk.isActive}
                                onCheckedChange={() => handleToggleRecommendedTalkActive(talk._id, talk.isActive)}
                              />
                              <Label htmlFor={`talk-${talk._id}-active`}>Active</Label>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveRecommendedTalk(talk._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-sm">{talk.bio}</p>
                        </div>
                        
                        {talk.youtubeEmbedId && (
                          <div className="mt-4">
                            <div className="text-xs text-muted-foreground mb-1">
                              {talk.isPlaylist ? 'Playlist' : 'Video'} ID: {talk.youtubeEmbedId}
                            </div>
                            <div className="aspect-video w-full">
                              <iframe 
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/${talk.isPlaylist ? 'videoseries?list=' + talk.youtubeEmbedId : talk.youtubeEmbedId}`}
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 