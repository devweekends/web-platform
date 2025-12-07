import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCMentor } from '@/models/DSOCMentor';

// POST - Register new mentor
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, email, username, password, ...rest } = body;
    
    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, username, and password are required' },
        { status: 400 }
      );
    }
    
    // Check if mentor already exists
    const existingMentor = await DSOCMentor.findOne({
      $or: [{ email }, { username }],
    });
    
    if (existingMentor) {
      return NextResponse.json(
        { success: false, error: 'Mentor with this email or username already exists' },
        { status: 400 }
      );
    }
    
    const mentor = new DSOCMentor({
      name,
      email,
      username,
      password,
      ...rest,
    });
    
    await mentor.save();
    
    // Remove password from response
    const mentorObject = mentor.toObject();
    delete mentorObject.password;
    
    return NextResponse.json({
      success: true,
      data: mentorObject,
      message: 'Registration successful. Please wait for admin verification.',
    }, { status: 201 });
  } catch (error) {
    console.error('Error registering DSOC mentor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to register mentor' },
      { status: 500 }
    );
  }
}
