import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { Mentor } from '@/models/Mentor';
import connectDB from '@/lib/db';

// Get mentor from request token
export async function getMentorFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get('mentor-token')?.value;
    
    if (!token) return null;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };
    
    if (decoded.role !== 'mentor') return null;
    
    await connectDB();
    const mentor = await Mentor.findById(decoded.id);
    
    return mentor;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
} 