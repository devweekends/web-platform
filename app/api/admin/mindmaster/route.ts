import { NextResponse } from 'next/server';
import { MindMaster } from '@/models/MindMaster';
import connectDB from '@/lib/db';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Helper to safely serialize MongoDB objects
const safeSerialize = (doc) => {
  try {
    if (!doc) return null;
    if (typeof doc.toJSON === 'function') {
      return doc.toJSON();
    } else if (typeof doc.toObject === 'function') {
      return doc.toObject();
    }
    return doc;
  } catch (error) {
    console.error('Serialization error:', error);
    return doc;
  }
};

// Get current MindMaster content
export async function GET() {
  try {
    await connectDB();
    
    // Check admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    if (!token || !JWT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      verify(token, JWT_SECRET);
    } catch (error) {
      console.error('JWT verification error:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the most recent MindMaster content
    let mindmasterContent = await MindMaster.findOne().sort({ createdAt: -1 });
    
    // If no content exists, create default empty structure
    if (!mindmasterContent) {
      mindmasterContent = new MindMaster({
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
          amazonLink: '',
          isActive: false
        },
        bookOfTheMonth: {
          title: '',
          author: '',
          description: '',
          imageUrl: '',
          amazonLink: '',
          isActive: false
        },
        recommendedTalks: []
      });
      await mindmasterContent.save();
    }
    
    // Serialize the MongoDB document to avoid issues
    const serializedContent = safeSerialize(mindmasterContent);
    
    return NextResponse.json(serializedContent);
  } catch (error) {
    console.error('Error fetching MindMaster content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MindMaster content', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

// Update MindMaster content
export async function PUT(request: Request) {
  try {
    await connectDB();
    
    // Check admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    if (!token || !JWT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    let adminUsername = 'Unknown';
    try {
      const decoded: any = verify(token, JWT_SECRET);
      adminUsername = decoded.username || 'Unknown';
    } catch (error) {
      console.error('JWT verification error:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse request body safely
    let data;
    try {
      data = await request.json();
      console.log('Received data:', data);
    } catch (parseError) {
      console.error('Error parsing request JSON:', parseError);
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
    }
    
    // Get the current content or create a new one
    let mindmasterContent = await MindMaster.findOne().sort({ createdAt: -1 });
    
    if (!mindmasterContent) {
      mindmasterContent = new MindMaster();
    }
    
    // Update fields based on data received
    try {
      if (data.talkOfTheWeek) {
        mindmasterContent.talkOfTheWeek = {
          ...mindmasterContent.talkOfTheWeek?.toObject?.() || mindmasterContent.talkOfTheWeek || {},
          ...data.talkOfTheWeek
        };
      }
      
      if (data.talkOfTheMonth) {
        mindmasterContent.talkOfTheMonth = {
          ...mindmasterContent.talkOfTheMonth?.toObject?.() || mindmasterContent.talkOfTheMonth || {},
          ...data.talkOfTheMonth
        };
      }
      
      if (data.bookOfTheWeek) {
        mindmasterContent.bookOfTheWeek = {
          ...mindmasterContent.bookOfTheWeek?.toObject?.() || mindmasterContent.bookOfTheWeek || {},
          ...data.bookOfTheWeek
        };
      }
      
      if (data.bookOfTheMonth) {
        mindmasterContent.bookOfTheMonth = {
          ...mindmasterContent.bookOfTheMonth?.toObject?.() || mindmasterContent.bookOfTheMonth || {},
          ...data.bookOfTheMonth
        };
      }
      
      // Handle recommended talks
      if (data.recommendedTalks) {
        // If we're adding a new talk
        if (data.action === 'add' && data.recommendedTalk) {
          mindmasterContent.recommendedTalks.push({
            ...data.recommendedTalk,
            date: new Date()
          });
        } 
        // If we're removing a talk
        else if (data.action === 'remove' && data.talkId) {
          try {
            mindmasterContent.recommendedTalks = mindmasterContent.recommendedTalks.filter(
              talk => talk._id.toString() !== data.talkId
            );
          } catch (err) {
            console.error('Error removing talk:', err);
          }
        } 
        // If we're updating a talk
        else if (data.action === 'update' && data.talkId && data.recommendedTalk) {
          try {
            const index = mindmasterContent.recommendedTalks.findIndex(
              talk => talk._id.toString() === data.talkId
            );
            if (index !== -1) {
              const existingTalk = mindmasterContent.recommendedTalks[index];
              const updatedTalk = {
                ...existingTalk.toObject ? existingTalk.toObject() : existingTalk,
                ...data.recommendedTalk
              };
              // Update the array using MongoDB's native method to avoid issues
              mindmasterContent.recommendedTalks.set(index, updatedTalk);
            }
          } catch (err) {
            console.error('Error updating talk:', err);
          }
        }
        // If we're replacing the entire array
        else if (Array.isArray(data.recommendedTalks)) {
          mindmasterContent.recommendedTalks = data.recommendedTalks;
        }
      }
      
      // Update metadata
      mindmasterContent.lastModifiedBy = adminUsername;
      mindmasterContent.lastUpdated = new Date();
      
      console.log('Saving content...');
      
      // Save changes
      await mindmasterContent.save();
      console.log('Content saved successfully');
      
      // Serialize the MongoDB document to avoid issues
      const serializedContent = safeSerialize(mindmasterContent);
      
      return NextResponse.json({ 
        success: true, 
        message: 'MindMaster content updated successfully',
        data: serializedContent
      });
    } catch (updateError) {
      console.error('Error updating document fields:', updateError);
      return NextResponse.json(
        { error: 'Failed to update MindMaster content', details: updateError.message || 'Error updating fields' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating MindMaster content:', error);
    return NextResponse.json(
      { error: 'Failed to update MindMaster content', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
} 