import { NextRequest, NextResponse } from 'next/server';
import { Mentee } from '@/models/Mentee';
import { Mentor } from '@/models/Mentor';
import connectDB from '@/lib/db';
import { getMentorFromToken } from '@/lib/auth';

// GET - Get mentees for the authenticated mentor
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const mentor = await getMentorFromToken(request);
    
    if (!mentor) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const mentees = await Mentee.find({ mentor: mentor._id });
    
    return NextResponse.json(mentees);
  } catch (error) {
    console.error('Error fetching mentees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentees' },
      { status: 500 }
    );
  }
}

// POST - Create a new mentee for the authenticated mentor
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const mentor = await getMentorFromToken(request);
    
    if (!mentor) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const menteeData = await request.json();
    
    // Create new mentee linked to this mentor
    const mentee = new Mentee({
      ...menteeData,
      mentor: mentor._id
    });
    
    await mentee.save();
    
    // Update mentor's mentees array
    await Mentor.findByIdAndUpdate(
      mentor._id,
      { $push: { mentees: mentee._id } }
    );
    
    return NextResponse.json(mentee, { status: 201 });
  } catch (error) {
    console.error('Error creating mentee:', error);
    return NextResponse.json(
      { error: 'Failed to create mentee' },
      { status: 500 }
    );
  }
} 