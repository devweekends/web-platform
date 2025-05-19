import { NextResponse } from 'next/server';
import { MindMaster } from '@/models/MindMaster';
import connectDB from '@/lib/db';

// Get current active MindMaster content for public viewing
export async function GET() {
  try {
    await connectDB();
    
    // Get the most recent MindMaster content
    const mindmasterContent = await MindMaster.findOne().sort({ createdAt: -1 });
    
    if (!mindmasterContent) {
      return NextResponse.json({ 
        error: 'No MindMaster content found' 
      }, { status: 404 });
    }
    
    // Format response to only include active content and necessary fields
    const response = {
      talkOfTheWeek: mindmasterContent.talkOfTheWeek && mindmasterContent.talkOfTheWeek.isActive 
        ? {
            title: mindmasterContent.talkOfTheWeek.title || '',
            bio: mindmasterContent.talkOfTheWeek.bio || '',
            videoUrl: mindmasterContent.talkOfTheWeek.videoUrl || '',
            youtubeEmbedId: mindmasterContent.talkOfTheWeek.youtubeEmbedId || '',
            isPlaylist: mindmasterContent.talkOfTheWeek.isPlaylist || false,
            date: mindmasterContent.talkOfTheWeek.date || new Date(),
            isActive: mindmasterContent.talkOfTheWeek.isActive || false
          } 
        : null,
      
      talkOfTheMonth: mindmasterContent.talkOfTheMonth && mindmasterContent.talkOfTheMonth.isActive 
        ? {
            title: mindmasterContent.talkOfTheMonth.title || '',
            bio: mindmasterContent.talkOfTheMonth.bio || '',
            videoUrl: mindmasterContent.talkOfTheMonth.videoUrl || '',
            youtubeEmbedId: mindmasterContent.talkOfTheMonth.youtubeEmbedId || '',
            isPlaylist: mindmasterContent.talkOfTheMonth.isPlaylist || false,
            date: mindmasterContent.talkOfTheMonth.date || new Date(),
            isActive: mindmasterContent.talkOfTheMonth.isActive || false
          } 
        : null,
      
      bookOfTheWeek: mindmasterContent.bookOfTheWeek && mindmasterContent.bookOfTheWeek.isActive 
        ? {
            title: mindmasterContent.bookOfTheWeek.title || '',
            author: mindmasterContent.bookOfTheWeek.author || '',
            bio: mindmasterContent.bookOfTheWeek.bio || '',
            link: mindmasterContent.bookOfTheWeek.link || '',
            date: mindmasterContent.bookOfTheWeek.date || new Date()
          } 
        : null,
      
      bookOfTheMonth: mindmasterContent.bookOfTheMonth && mindmasterContent.bookOfTheMonth.isActive 
        ? {
            title: mindmasterContent.bookOfTheMonth.title || '',
            author: mindmasterContent.bookOfTheMonth.author || '',
            bio: mindmasterContent.bookOfTheMonth.bio || '',
            link: mindmasterContent.bookOfTheMonth.link || '',
            date: mindmasterContent.bookOfTheMonth.date || new Date()
          } 
        : null,
        
      recommendedTalks: Array.isArray(mindmasterContent.recommendedTalks)
        ? mindmasterContent.recommendedTalks
            .filter(talk => talk && talk.isActive)
            .map(talk => ({
              id: talk._id || '',
              title: talk.title || '',
              bio: talk.bio || '',
              youtubeEmbedId: talk.youtubeEmbedId || '',
              isPlaylist: talk.isPlaylist || false,
              date: talk.date || new Date(),
              isActive: talk.isActive || false
            }))
        : []
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching MindMaster content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MindMaster content', details: error.message },
      { status: 500 }
    );
  }
} 