import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Job } from '@/models/Job';

// Public endpoint: only returns active jobs
export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('GET /api/jobs', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}


