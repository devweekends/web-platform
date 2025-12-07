import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCMentee } from '@/models/DSOCMentee';
import jwt from 'jsonwebtoken';

// POST - Login mentee
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    const mentee = await DSOCMentee.findOne({ 
      $or: [{ username }, { email: username }] 
    }).select('+password');
    
    if (!mentee) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const isMatch = await mentee.comparePassword(password);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    if (!mentee.isActive) {
      return NextResponse.json(
        { success: false, error: 'Account is deactivated' },
        { status: 403 }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: mentee._id, role: 'dsoc-mentee' },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
    
    const response = NextResponse.json({
      success: true,
      data: {
        id: mentee._id,
        name: mentee.name,
        email: mentee.email,
        username: mentee.username,
      },
    });
    
    // Set cookie
    response.cookies.set('dsoc-mentee-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    
    return response;
  } catch (error) {
    console.error('Error logging in DSOC mentee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to login' },
      { status: 500 }
    );
  }
}
