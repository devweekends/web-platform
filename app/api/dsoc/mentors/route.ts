import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCMentor } from '@/models/DSOCMentor';

// GET active, verified mentors for project assignment
export async function GET() {
  try {
    await connectDB();

    const mentors = await DSOCMentor.find({
      isActive: true,
      isVerified: true,
    })
      .select('_id name company jobTitle picture expertise')
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: mentors,
    });
  } catch (error) {
    console.error('Error fetching DSOC mentors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch mentors' },
      { status: 500 }
    );
  }
}