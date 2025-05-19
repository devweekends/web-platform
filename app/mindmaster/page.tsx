'use client';

import { useState, useEffect } from 'react';
import { Book, Video, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

// MindMaster component for the public page
export default function MindMaster() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mindmasterData, setMindmasterData] = useState({
    talkOfTheWeek: null,
    talkOfTheMonth: null,
    bookOfTheWeek: null,
    bookOfTheMonth: null
  });

  // Fetch MindMaster data on component mount
  useEffect(() => {
    const fetchMindMasterData = async () => {
      try {
        const response = await fetch('/api/mindmaster');
        
        if (!response.ok) {
          throw new Error('Failed to load MindMaster content');
        }
        
        const data = await response.json();
        setMindmasterData(data);
      } catch (err) {
        setError('Failed to load MindMaster content. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMindMasterData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Check if there's no active content
  const noContent = !mindmasterData.talkOfTheWeek && 
                    !mindmasterData.talkOfTheMonth && 
                    !mindmasterData.bookOfTheWeek && 
                    !mindmasterData.bookOfTheMonth;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">MindMaster Community</h1>
        <p className="text-xl text-muted-foreground">Expand your mind with our curated talks and books</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {noContent && !error && (
        <Alert className="mb-6">
          <AlertDescription>
            No MindMaster content is currently available. Please check back later!
          </AlertDescription>
        </Alert>
      )}

      {/* Featured Talks Section */}
      {(mindmasterData.talkOfTheWeek || mindmasterData.talkOfTheMonth) && (
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Video className="mr-2 h-5 w-5 text-primary" />
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2 w-full">
              Featured Talks
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Talk of the Week */}
            {mindmasterData.talkOfTheWeek && (
              <Card className="relative overflow-hidden">
                <CardContent className="pt-8">
                  <span className="inline-block mb-3 px-3 py-1 text-sm rounded bg-primary text-primary-foreground">
                    Talk of the Week
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{mindmasterData.talkOfTheWeek.title}</h3>
                  {mindmasterData.talkOfTheWeek.youtubeEmbedId && (
                    <div className="aspect-video w-full mb-4">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${mindmasterData.talkOfTheWeek.isPlaylist ? 'videoseries?list=' + mindmasterData.talkOfTheWeek.youtubeEmbedId : mindmasterData.talkOfTheWeek.youtubeEmbedId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  <p className="text-sm mb-4">{mindmasterData.talkOfTheWeek.bio}</p>
                  {(mindmasterData.talkOfTheWeek.videoUrl || mindmasterData.talkOfTheWeek.youtubeEmbedId) && (
                    <Button variant="default" asChild>
                      <a
                        href={mindmasterData.talkOfTheWeek.videoUrl || `https://www.youtube.com/watch?v=${mindmasterData.talkOfTheWeek.youtubeEmbedId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Watch Talk
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Talk of the Month */}
            {mindmasterData.talkOfTheMonth && (
              <Card className="relative overflow-hidden">
                <CardContent className="pt-8">
                  <span className="inline-block mb-3 px-3 py-1 text-sm rounded bg-green-600 text-white">
                    Talk of the Month
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{mindmasterData.talkOfTheMonth.title}</h3>
                  {mindmasterData.talkOfTheMonth.youtubeEmbedId && (
                    <div className="aspect-video w-full mb-4">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${mindmasterData.talkOfTheMonth.isPlaylist ? 'videoseries?list=' + mindmasterData.talkOfTheMonth.youtubeEmbedId : mindmasterData.talkOfTheMonth.youtubeEmbedId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  <p className="text-sm mb-4">{mindmasterData.talkOfTheMonth.bio}</p>
                  {(mindmasterData.talkOfTheMonth.videoUrl || mindmasterData.talkOfTheMonth.youtubeEmbedId) && (
                    <Button className="bg-green-600 hover:bg-green-700" asChild>
                      <a
                        href={mindmasterData.talkOfTheMonth.videoUrl || `https://www.youtube.com/watch?v=${mindmasterData.talkOfTheMonth.youtubeEmbedId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Watch Talk
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Featured Books Section */}
      {(mindmasterData.bookOfTheWeek || mindmasterData.bookOfTheMonth) && (
        <section>
          <div className="flex items-center mb-6">
            <Book className="mr-2 h-5 w-5 text-primary" />
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2 w-full">
              Featured Books
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Book of the Week */}
            {mindmasterData.bookOfTheWeek && (
              <Card className="relative overflow-hidden">
                <CardContent className="pt-8">
                  <span className="inline-block mb-3 px-3 py-1 text-sm rounded bg-primary text-primary-foreground">
                    Book of the Week
                  </span>
                  <h3 className="text-xl font-semibold mb-1">{mindmasterData.bookOfTheWeek.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">By {mindmasterData.bookOfTheWeek.author}</p>
                  <p className="text-sm mb-4">{mindmasterData.bookOfTheWeek.bio}</p>
                  {mindmasterData.bookOfTheWeek.link && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={mindmasterData.bookOfTheWeek.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        View Book
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Book of the Month */}
            {mindmasterData.bookOfTheMonth && (
              <Card className="relative overflow-hidden">
                <CardContent className="pt-8">
                  <span className="inline-block mb-3 px-3 py-1 text-sm rounded bg-green-600 text-white">
                    Book of the Month
                  </span>
                  <h3 className="text-xl font-semibold mb-1">{mindmasterData.bookOfTheMonth.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">By {mindmasterData.bookOfTheMonth.author}</p>
                  <p className="text-sm mb-4">{mindmasterData.bookOfTheMonth.bio}</p>
                  {mindmasterData.bookOfTheMonth.link && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700"
                      asChild
                    >
                      <a
                        href={mindmasterData.bookOfTheMonth.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        View Book
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Recommended Talks Section */}
      {mindmasterData.recommendedTalks && mindmasterData.recommendedTalks.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Video className="mr-2 h-5 w-5 text-primary" />
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2 w-full">
              Recommended Talks
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mindmasterData.recommendedTalks.map((talk, idx) => (
              <Card key={talk.id || idx} className="relative overflow-hidden">
                <CardContent className="pt-8">
                  <span className="inline-block mb-3 px-3 py-1 text-sm rounded bg-blue-600 text-white">
                    Recommended Talk
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{talk.title}</h3>
                  {talk.youtubeEmbedId && (
                    <div className="aspect-video w-full mb-4">
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
                  )}
                  <p className="text-sm mb-4">{talk.bio}</p>
                  {talk.youtubeEmbedId && (
                    <Button variant="default" asChild>
                      <a
                        href={`https://www.youtube.com/${talk.isPlaylist ? 'playlist?list=' + talk.youtubeEmbedId : 'watch?v=' + talk.youtubeEmbedId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Watch Talk
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 