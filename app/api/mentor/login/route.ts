import { NextRequest, NextResponse } from 'next/server';
import { Mentor } from '@/models/Mentor';
import connectDB from '@/lib/db';
import { createToken } from '@/lib/jwt';
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    console.log(`Login attempt for username: ${username}`);
    
    await connectDB();
    
    // Find mentor with password included
    const mentor = await Mentor.findOne({ username }).select('+password');
    
    if (!mentor) {
      console.log(`No mentor found with username: ${username}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Direct password comparison as a fallback if method is missing
    let isValid = false;
    
    if (typeof mentor.comparePassword === 'function') {
      try {
        isValid = await mentor.comparePassword(password);
        console.log(`Password comparison result: ${isValid}`);
      } catch (err) {
        console.error('Error using comparePassword method:', err);
      }
    } else {
      // Fallback comparison if method is missing
      try {
        isValid = await bcryptjs.compare(password, mentor.password as string);
        console.log(`Fallback password comparison result: ${isValid}`);
      } catch (err) {
        console.error('Error in fallback password comparison:', err);
      }
    }
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Create token
    const token = await createToken({ 
      id: mentor._id.toString(),
      role: 'mentor'
    });
    
    // Create response
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );
    
    // Set cookie
    response.cookies.set({
      name: 'mentor-token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    console.log(`Login successful for mentor: ${mentor.name}`);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
} 