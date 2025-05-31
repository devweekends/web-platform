import { NextResponse } from 'next/server';
import { Mentor } from '@/models/Mentor';
import { Tag } from '@/models/Tag';
import connectDB from '@/lib/db';

// GET all mentors with their mentees (public view)
export async function GET() {
  try {
    await connectDB();
    const mentors = await Mentor.find()
      .populate({
        path: 'mentees',
        select: 'name university picture', // Only select public fields
      })
      .populate('tags') // Include tags for public display
      .sort({ createdAt: -1 });

    return NextResponse.json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentors' },
      { status: 500 }
    );
  }
} 