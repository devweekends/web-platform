'use client';

import { useState, useEffect } from 'react';
import { Book, Video, ArrowRight, ExternalLink, Play, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface MindMasterItem {
  _id?: string;
  title: string;
  bio: string;
  author?: string;
  link?: string;
  videoUrl?: string;
  youtubeEmbedId?: string;
  isPlaylist?: boolean;
}

interface MindMasterData {
  talkOfTheWeek: MindMasterItem | null;
  talkOfTheMonth: MindMasterItem | null;
  bookOfTheWeek: MindMasterItem | null;
  bookOfTheMonth: MindMasterItem | null;
  recommendedTalks?: MindMasterItem[];
}

export default function MindMaster() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mindmasterData, setMindmasterData] = useState<MindMasterData>({
    talkOfTheWeek: null,
    talkOfTheMonth: null,
    bookOfTheWeek: null,
    bookOfTheMonth: null,
    recommendedTalks: []
  });

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

  const noContent = !mindmasterData.talkOfTheWeek && 
                    !mindmasterData.talkOfTheMonth && 
                    !mindmasterData.bookOfTheWeek && 
                    !mindmasterData.bookOfTheMonth;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-2 border-foreground border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="bg-background text-foreground">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="py-16 md:py-20 px-6 lg:px-12 border-b border-border">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-6">
              A Closed Community for Thinkers
            </p>
            <h1 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight leading-[1.1] mb-6">
              Beyond Code,
              <br />
              <span className="text-muted-foreground">There's the Mind</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
              MindMaster is our invite-only space for engineers who understand that true growth 
              happens beyond the keyboard. Psychology, time mastery, spiritual grounding, and 
              the mental frameworks that turn good developers into exceptional human beings.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-12">
              {[
                { number: "200+", label: "Closed Members" },
                { number: "Weekly", label: "Deep Dives" },
                { number: "Invite", label: "Only Access" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold tracking-tight">{stat.number}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PHILOSOPHY SECTION
          ============================================ */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-muted/20">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Psychology of Excellence",
                description: "Understanding how the mind works is the first step to mastering it. We explore cognitive biases, decision-making, and the psychology behind peak performance."
              },
              {
                number: "02",
                title: "Time & Energy Mastery",
                description: "Time management is energy management. Learn frameworks from the world's top performers to structure your days, weeks, and life for maximum impact."
              },
              {
                number: "03",
                title: "The Spiritual Dimension",
                description: "Purpose, meaning, and inner peace. The best engineers we know have found balance between ambition and contentment. We explore that journey together."
              },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="text-[10px] font-bold tracking-[3px] text-muted-foreground/30 mb-4">
                  {item.number}
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {error && (
        <section className="py-12 px-6 lg:px-12 border-b border-border">
          <div className="max-w-[1100px] mx-auto">
            <div className="bg-destructive/10 border border-destructive/20 px-6 py-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        </section>
      )}

      {noContent && !error && (
        <section className="py-20 px-6 lg:px-12 border-b border-border">
          <div className="max-w-[1100px] mx-auto text-center">
            <div className="w-16 h-16 border border-border flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-7 h-7 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              New curated content is being prepared. Check back soon for fresh talks and book recommendations!
            </p>
          </div>
        </section>
      )}

      {/* ============================================
          FEATURED TALKS SECTION
          ============================================ */}
      {(mindmasterData.talkOfTheWeek || mindmasterData.talkOfTheMonth) && (
        <section className="py-12 md:py-16 px-6 lg:px-12 border-b border-border">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <Video className="w-5 h-5" />
              <h2 className="text-2xl font-bold tracking-tight">Featured Talks</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Talk of the Week */}
              {mindmasterData.talkOfTheWeek && (
                <div className="border border-border group hover:border-foreground transition-colors">
                  {mindmasterData.talkOfTheWeek.youtubeEmbedId && (
                    <div className="aspect-video w-full border-b border-border">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${mindmasterData.talkOfTheWeek.isPlaylist ? 'videoseries?list=' + mindmasterData.talkOfTheWeek.youtubeEmbedId : mindmasterData.talkOfTheWeek.youtubeEmbedId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-foreground text-background mb-4">
                      Talk of the Week
                    </span>
                    <h3 className="text-xl font-semibold mb-3">{mindmasterData.talkOfTheWeek.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{mindmasterData.talkOfTheWeek.bio}</p>
                    {(mindmasterData.talkOfTheWeek.videoUrl || mindmasterData.talkOfTheWeek.youtubeEmbedId) && (
                      <a
                        href={mindmasterData.talkOfTheWeek.videoUrl || `https://www.youtube.com/watch?v=${mindmasterData.talkOfTheWeek.youtubeEmbedId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
                      >
                        <Play className="w-4 h-4" />
                        Watch Now
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Talk of the Month */}
              {mindmasterData.talkOfTheMonth && (
                <div className="border border-border group hover:border-foreground transition-colors">
                  {mindmasterData.talkOfTheMonth.youtubeEmbedId && (
                    <div className="aspect-video w-full border-b border-border">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${mindmasterData.talkOfTheMonth.isPlaylist ? 'videoseries?list=' + mindmasterData.talkOfTheMonth.youtubeEmbedId : mindmasterData.talkOfTheMonth.youtubeEmbedId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-yellow-400 text-black mb-4">
                      Talk of the Month
                    </span>
                    <h3 className="text-xl font-semibold mb-3">{mindmasterData.talkOfTheMonth.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{mindmasterData.talkOfTheMonth.bio}</p>
                    {(mindmasterData.talkOfTheMonth.videoUrl || mindmasterData.talkOfTheMonth.youtubeEmbedId) && (
                      <a
                        href={mindmasterData.talkOfTheMonth.videoUrl || `https://www.youtube.com/watch?v=${mindmasterData.talkOfTheMonth.youtubeEmbedId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
                      >
                        <Play className="w-4 h-4" />
                        Watch Now
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          FEATURED BOOKS SECTION
          ============================================ */}
      {(mindmasterData.bookOfTheWeek || mindmasterData.bookOfTheMonth) && (
        <section className="py-12 md:py-16 px-6 lg:px-12 bg-muted/20 border-b border-border">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <Book className="w-5 h-5" />
              <h2 className="text-2xl font-bold tracking-tight">Featured Books</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Book of the Week */}
              {mindmasterData.bookOfTheWeek && (
                <div className="border border-border p-8 bg-background group hover:border-foreground transition-colors">
                  <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-foreground text-background mb-6">
                    Book of the Week
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{mindmasterData.bookOfTheWeek.title}</h3>
                  {mindmasterData.bookOfTheWeek.author && (
                    <p className="text-sm text-muted-foreground mb-5">by {mindmasterData.bookOfTheWeek.author}</p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{mindmasterData.bookOfTheWeek.bio}</p>
                  {mindmasterData.bookOfTheWeek.link && (
                    <a
                      href={mindmasterData.bookOfTheWeek.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Book
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}

              {/* Book of the Month */}
              {mindmasterData.bookOfTheMonth && (
                <div className="border border-border p-8 bg-background group hover:border-foreground transition-colors">
                  <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-yellow-400 text-black mb-6">
                    Book of the Month
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{mindmasterData.bookOfTheMonth.title}</h3>
                  {mindmasterData.bookOfTheMonth.author && (
                    <p className="text-sm text-muted-foreground mb-5">by {mindmasterData.bookOfTheMonth.author}</p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{mindmasterData.bookOfTheMonth.bio}</p>
                  {mindmasterData.bookOfTheMonth.link && (
                    <a
                      href={mindmasterData.bookOfTheMonth.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Book
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          RECOMMENDED TALKS SECTION
          ============================================ */}
      {mindmasterData.recommendedTalks && mindmasterData.recommendedTalks.length > 0 && (
        <section className="py-12 md:py-16 px-6 lg:px-12 border-b border-border">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <Video className="w-5 h-5" />
              <h2 className="text-2xl font-bold tracking-tight">More Recommended Talks</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mindmasterData.recommendedTalks.map((talk, idx) => (
                <div key={talk._id || idx} className="border border-border group hover:border-foreground transition-colors">
                  {talk.youtubeEmbedId && (
                    <div className="aspect-video w-full border-b border-border">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${talk.isPlaylist ? 'videoseries?list=' + talk.youtubeEmbedId : talk.youtubeEmbedId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{talk.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{talk.bio}</p>
                    {talk.youtubeEmbedId && (
                      <a
                        href={`https://www.youtube.com/${talk.isPlaylist ? 'playlist?list=' + talk.youtubeEmbedId : 'watch?v=' + talk.youtubeEmbedId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity"
                      >
                        <Play className="w-3 h-3" />
                        Watch
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-foreground text-background">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-background/40 mb-6">
            Join the Community
          </p>
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold tracking-tight mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-background/60 max-w-lg mx-auto mb-10">
            Join our weekly MindMaster sessions where we watch, discuss, and learn together. 
            It's not just about consuming content—it's about growing with a community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://discord.gg/devweekends"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-semibold text-sm uppercase tracking-[1px] hover:opacity-90 transition-all"
            >
              Join Discord
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://www.youtube.com/playlist?list=PL_yEmchnldCOSzL68HPc4jQTab5P1w4P3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-background/30 text-background font-semibold text-sm uppercase tracking-[1px] hover:bg-background/10 transition-all"
            >
              View Sessions
            </a>
          </div>
        </div>
      </section>
    </main>
  );
} 