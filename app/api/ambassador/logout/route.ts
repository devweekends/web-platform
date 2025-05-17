import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set({
    name: 'ambassador-token',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
} 