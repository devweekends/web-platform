import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCMentee } from '@/models/DSOCMentee';

// POST - Register new mentee
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
    
    // Check if mentee already exists
    const existingMentee = await DSOCMentee.findOne({
      $or: [{ email }, { username }],
    });
    
    if (existingMentee) {
      return NextResponse.json(
        { success: false, error: 'Mentee with this email or username already exists' },
        { status: 400 }
      );
    }
    
    const mentee = new DSOCMentee({
      name,
      email,
      username,
      password,
      ...rest,
    });
    
    await mentee.save();
    
    // Remove password from response
    const menteeObject = mentee.toObject();
    delete menteeObject.password;
    
    return NextResponse.json({
      success: true,
      data: menteeObject,
      message: 'Registration successful!',
    }, { status: 201 });
  } catch (error) {
    console.error('Error registering DSOC mentee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to register mentee' },
      { status: 500 }
    );
  }
}
