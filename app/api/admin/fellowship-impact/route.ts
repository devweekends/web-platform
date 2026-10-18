import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import connectImpactDB from '@/lib/impact-db';
import { getFellowshipSurveyResponseModel } from '@/models/FellowshipSurveyResponse';

const JWT_SECRET = process.env.JWT_SECRET;

async function isAdmin() {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token || !JWT_SECRET) return false;

  try {
    verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const connection = await connectImpactDB();
    const FellowshipSurveyResponse = getFellowshipSurveyResponseModel(connection);
    const responses = await FellowshipSurveyResponse.find()
      .select('-sourcePayload -dedupeKey')
      .sort({ 'source.submittedAt': -1, createdAt: -1 })
      .lean();

    return NextResponse.json(responses);
  } catch (error) {
    console.error('Error fetching fellowship impact:', error);
    return NextResponse.json({ error: 'Failed to fetch fellowship impact data' }, { status: 500 });
  }
}
