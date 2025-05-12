import { NextResponse } from 'next/server';
import { ActivityLog } from '@/models/ActivityLog';
import connectDB from '@/lib/db';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(limit);
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch activity logs' }, { status: 500 });
  }
} 