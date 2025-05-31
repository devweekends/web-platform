import { NextResponse } from 'next/server';
import { Mentee } from '@/models/Mentee';
import { Tag } from '@/models/Tag';
import connectDB from '@/lib/db';

// GET all mentees with their mentors (public view)
export async function GET() {
  try {
    await connectDB();
    const mentees = await Mentee.find()
      .populate({
        path: 'mentor',
        select: 'name university picture', // Only select public fields
      })
      .populate('tags') // Include tags for public display
      .sort({ createdAt: -1 });

    return NextResponse.json(mentees);
  } catch (error) {
    console.error('Error fetching mentees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentees' },
      { status: 500 }
    );
  }
} 