import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCMentor } from '@/models/DSOCMentor';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get('dsoc-mentor-token')?.value;
    if (!token) {
      return NextResponse.json({ success: false }, { status: 200 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };

    if (decoded.role !== 'dsoc-mentor') {
      return NextResponse.json({ success: false }, { status: 200 });
    }

    const mentor = await DSOCMentor.findById(decoded.id)
      .select('_id name email username isActive')
      .lean();

    if (!mentor || !mentor.isActive) {
      return NextResponse.json({ success: false }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        username: mentor.username,
      },
    });
  } catch (error) {
    console.error('Error checking DSOC mentor session:', error);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
