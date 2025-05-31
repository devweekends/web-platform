import { NextResponse } from 'next/server';
import { Tag } from '@/models/Tag';
import connectDB from '@/lib/db';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ActivityLog } from '@/models/ActivityLog';

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check admin authentication
async function checkAdmin() {
  const cookieStore = await cookies();
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

// GET all tags
export async function GET() {
  try {
    await connectDB();
    const tags = await Tag.find().sort({ name: 1 });
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

// POST create new tag
export async function POST(request: Request) {
  try {
    const adminUsername = await checkAdmin();
    if (!adminUsername) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.color) {
      return NextResponse.json(
        { error: 'Name and color are required' },
        { status: 400 }
      );
    }

    // Create new tag
    const tag = new Tag({
      name: data.name.trim(),
      description: data.description?.trim() || '',
      color: data.color,
    });

    await tag.save();

    // Log activity
    await ActivityLog.create({
      entityType: 'Tag',
      entityId: tag._id.toString(),
      action: 'add',
      adminUsername,
      details: { name: tag.name },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error: any) {
    console.error('Error creating tag:', error);
    
    // Handle duplicate name error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Tag name already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create tag' },
      { status: 500 }
    );
  }
}

// PUT update tag
export async function PUT(request: Request) {
  try {
    const adminUsername = await checkAdmin();
    if (!adminUsername) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Tag ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    const tag = await Tag.findByIdAndUpdate(
      id,
      {
        name: data.name?.trim(),
        description: data.description?.trim() || '',
        color: data.color,
      },
      { new: true, runValidators: true }
    );

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    // Log activity
    await ActivityLog.create({
      entityType: 'Tag',
      entityId: tag._id.toString(),
      action: 'edit',
      adminUsername,
      details: { name: tag.name },
    });

    return NextResponse.json(tag);
  } catch (error: any) {
    console.error('Error updating tag:', error);
    
    // Handle duplicate name error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Tag name already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update tag' },
      { status: 500 }
    );
  }
}

// DELETE tag
export async function DELETE(request: Request) {
  try {
    const adminUsername = await checkAdmin();
    if (!adminUsername) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Tag ID is required' },
        { status: 400 }
      );
    }

    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    // Remove tag from all mentors and mentees
    const { Mentor } = await import('@/models/Mentor');
    const { Mentee } = await import('@/models/Mentee');
    
    await Promise.all([
      Mentor.updateMany(
        { tags: id },
        { $pull: { tags: id } }
      ),
      Mentee.updateMany(
        { tags: id },
        { $pull: { tags: id } }
      )
    ]);

    // Log activity
    await ActivityLog.create({
      entityType: 'Tag',
      entityId: tag._id.toString(),
      action: 'delete',
      adminUsername,
      details: { name: tag.name },
    });

    return NextResponse.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 }
    );
  }
} 