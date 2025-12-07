import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCMentor } from '@/models/DSOCMentor';
import jwt from 'jsonwebtoken';

// POST - Login mentor
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
    
    const mentor = await DSOCMentor.findOne({ 
      $or: [{ username }, { email: username }] 
    }).select('+password');
    
    if (!mentor) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const isMatch = await mentor.comparePassword(password);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    if (!mentor.isActive) {
      return NextResponse.json(
        { success: false, error: 'Account is deactivated' },
        { status: 403 }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: mentor._id, role: 'dsoc-mentor' },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
    
    const response = NextResponse.json({
      success: true,
      data: {
        id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        username: mentor.username,
      },
    });
    
    // Set cookie
    response.cookies.set('dsoc-mentor-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    
    return response;
  } catch (error) {
    console.error('Error logging in DSOC mentor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to login' },
      { status: 500 }
    );
  }
}
