import { NextResponse } from 'next/server';
import { Ambassador } from '@/models/Ambassador';
import { signToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    const ambassador = await Ambassador.findOne({ username }).select('+password');
    if (!ambassador) {
      console.log('Ambassador not found:', username);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    console.log('Ambassador found, verifying password');
    const isValid = await ambassador.comparePassword(password);
    if (!isValid) {
      console.log('Password verification failed');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    console.log('Password verified, signing token');
    const token = await signToken({
      id: ambassador._id.toString(),
      username: ambassador.username,
      type: 'ambassador',
    });
    
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );
    
    response.cookies.set({
      name: 'ambassador-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });
    
    return response;
  } catch (error) {
    console.error('Ambassador login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 