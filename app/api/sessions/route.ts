import { NextResponse } from 'next/server';
import { Session } from '@/models/Session';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    const sessions = await Session.find().sort({ createdAt: -1 });
    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 