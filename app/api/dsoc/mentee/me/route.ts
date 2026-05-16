import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCMentee } from '@/models/DSOCMentee';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get('dsoc-mentee-token')?.value;
    if (!token) {
      return NextResponse.json({ success: false }, { status: 200 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };

    if (decoded.role !== 'dsoc-mentee') {
      return NextResponse.json({ success: false }, { status: 200 });
    }

    const mentee = await DSOCMentee.findById(decoded.id)
      .select('_id name email username isActive')
      .lean();

    if (!mentee || !mentee.isActive) {
      return NextResponse.json({ success: false }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: mentee._id,
        name: mentee.name,
        email: mentee.email,
        username: mentee.username,
      },
    });
  } catch (error) {
    console.error('Error checking DSOC mentee session:', error);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
