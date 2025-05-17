import { NextResponse } from 'next/server';
import { Ambassador } from '@/models/Ambassador';
import connectDB from '@/lib/db';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { id, username, password } = await request.json();
    
    if (!id || !username) {
      return NextResponse.json({ error: 'Ambassador ID and username are required' }, { status: 400 });
    }
    
    // Check admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    if (!token || !JWT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    let adminUsername = 'Unknown';
    try {
      const decoded: any = verify(token, JWT_SECRET);
      adminUsername = decoded.username || 'Unknown';
    } catch {}

    // Find the ambassador first
    const ambassador = await Ambassador.findById(id);
    if (!ambassador) {
      return NextResponse.json({ error: 'Ambassador not found' }, { status: 404 });
    }
    
    // Update ambassador properties
    ambassador.username = username;
    ambassador.lastModifiedBy = adminUsername;
    
    // Only update password if provided
    if (password && password.trim() !== '') {
      ambassador.password = password;
    }
    
    // Save to trigger the password hashing middleware
    await ambassador.save();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating ambassador credentials:', error);
    
    // Check for duplicate key error (username already exists)
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: 'Username already exists. Please choose another username.' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Failed to update credentials' }, { status: 500 });
  }
} 