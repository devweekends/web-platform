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

// PATCH: Update testimonial (e.g. approve)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const adminUsername = await getAdminUser();
    
    if (!adminUsername) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { isApproved: data.isApproved },
      { new: true }
    );

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    // Log activity
    await ActivityLog.create({
      entityType: 'Testimonial',
      entityId: testimonial._id.toString(),
      action: 'update',
      adminUsername,
      details: { 
        name: testimonial.name, 
        isApproved: testimonial.isApproved 
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// DELETE: Delete testimonial
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const adminUsername = await getAdminUser();
    
    if (!adminUsername) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    // Log activity
    await ActivityLog.create({
      entityType: 'Testimonial',
      entityId: id,
      action: 'delete',
      adminUsername,
      details: { name: testimonial.name },
    });

    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
