import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Testimonial } from '@/models/Testimonial';
import { ActivityLog } from '@/models/ActivityLog';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const JWT_SECRET = process.env.JWT_SECRET;

async function getAdminUser() {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token = cookieStore.get('admin-token')?.value;

  if (!token || !JWT_SECRET) {
    return null;
  }

  try {
    const decoded: any = verify(token, JWT_SECRET);
    return decoded.username || 'Unknown';
  } catch {
    return null;
  }
}

// GET: Fetch all testimonials (for admin dashboard)
export async function GET() {
  try {
    await connectDB();
    const adminUsername = await getAdminUser();
    if (!adminUsername) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST: Admin manually create a testimonial (auto-approved)
export async function POST(request: Request) {
  try {
    await connectDB();
    const adminUsername = await getAdminUser();
    if (!adminUsername) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const testimonial = await Testimonial.create({
      ...data,
      isApproved: true, // Auto-approved for admin
      type: data.videoUrl ? 'video' : 'text'
    });

    // Log activity
    await ActivityLog.create({
      entityType: 'Testimonial',
      entityId: testimonial._id.toString(),
      action: 'create',
      adminUsername,
      details: { name: testimonial.name },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
