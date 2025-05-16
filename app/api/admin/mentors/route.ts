import { NextResponse } from 'next/server';
import { Mentor } from '@/models/Mentor';
import { Mentee } from '@/models/Mentee';
import connectDB from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ActivityLog } from '@/models/ActivityLog';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const JWT_SECRET = process.env.JWT_SECRET;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET all mentors or a single mentor by ID with full details (admin view)
export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Check if an ID is provided in the query string
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      // Return a single mentor by ID with populated mentees
      const mentor = await Mentor.findById(id).populate('mentees');
      
      if (!mentor) {
        return NextResponse.json({ error: 'Mentor not found' }, { status: 404 });
      }
      
      return NextResponse.json(mentor);
    } else {
      // Return all mentors with populated mentees
      const mentors = await Mentor.find()
        .populate('mentees')
        .sort({ createdAt: -1 });
      return NextResponse.json(mentors);
    }
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentors' },
      { status: 500 }
    );
  }
}

// POST new mentor
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Get admin username from JWT
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    let adminUsername = 'Unknown';
    if (token && JWT_SECRET) {
      try {
        const decoded: any = verify(token, JWT_SECRET as string);
        adminUsername = decoded.username || 'Unknown';
      } catch {}
    }

    // Upload image to Cloudinary if it's a base64 string
    let imageUrl = data.picture;
    if (data.picture?.startsWith('data:image')) {
      const result = await cloudinary.uploader.upload(data.picture, {
        folder: 'mentors',
      });
      imageUrl = result.secure_url;
    }

    const mentor = new Mentor({
      ...data,
      picture: imageUrl,
    });

    await mentor.save();

    // If this mentor is also a mentee, update their isMentor status
    if (data.isMentee) {
      await Mentee.findOneAndUpdate(
        { email: data.email },
        { isMentor: true }
      );
    }

    await ActivityLog.create({
      entityType: 'Mentor',
      entityId: mentor._id.toString(),
      action: 'add',
      adminUsername,
      details: { name: mentor.name, email: mentor.email },
    });

    return NextResponse.json(mentor);
  } catch (error) {
    console.error('Error creating mentor:', error);
    return NextResponse.json(
      { error: 'Failed to create mentor' },
      { status: 500 }
    );
  }
}

// PUT update mentor
export async function PUT(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Mentor ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Get admin username from JWT
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    let adminUsername = 'Unknown';
    if (token && JWT_SECRET) {
      try {
        const decoded: any = verify(token, JWT_SECRET as string);
        adminUsername = decoded.username || 'Unknown';
      } catch {}
    }

    // Find the existing mentor to get current data
    const existingMentor = await Mentor.findById(id).populate('mentees');
    if (!existingMentor) {
      return NextResponse.json(
        { error: 'Mentor not found' },
        { status: 404 }
      );
    }

    // Handle image upload if it's a new image
    let imageUrl = data.picture;
    if (data.picture?.startsWith('data:image')) {
      const result = await cloudinary.uploader.upload(data.picture, {
        folder: 'mentors',
      });
      imageUrl = result.secure_url;
    }

    // Update the mentor
    const updateData = {
      ...data,
      picture: imageUrl,
    };

    // Special handling for password
    // If password is empty or undefined, remove it from updateData to not override existing password
    if (!updateData.password) {
      delete updateData.password;
    }

    let mentor;
    
    // If password is included, use save() method to trigger password hashing middleware
    if (updateData.password) {
      // Update fields one by one to avoid overriding other fields
      Object.assign(existingMentor, updateData);
      mentor = await existingMentor.save();
    } else {
      // Use findByIdAndUpdate for updates without password changes
      mentor = await Mentor.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      ).populate('mentees');
    }

    await ActivityLog.create({
      entityType: 'Mentor',
      entityId: mentor._id.toString(),
      action: 'edit',
      adminUsername,
      details: { name: mentor.name, email: mentor.email },
    });

    console.log(`Updated mentor: ${mentor.name}, username: ${mentor.username}`);
    return NextResponse.json(mentor);
  } catch (error) {
    console.error('Error updating mentor:', error);
    return NextResponse.json(
      { error: 'Failed to update mentor' },
      { status: 500 }
    );
  }
}

// DELETE mentor
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Mentor ID is required' },
        { status: 400 }
      );
    }

    const mentor = await Mentor.findByIdAndDelete(id);
    if (!mentor) {
      return NextResponse.json(
        { error: 'Mentor not found' },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary if it exists
    if (mentor.picture?.includes('cloudinary')) {
      const publicId = mentor.picture.split('/').slice(-1)[0].split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // Get admin username from JWT
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    let adminUsername = 'Unknown';
    if (token && JWT_SECRET) {
      try {
        const decoded: any = verify(token, JWT_SECRET as string);
        adminUsername = decoded.username || 'Unknown';
      } catch {}
    }

    await ActivityLog.create({
      entityType: 'Mentor',
      entityId: mentor._id.toString(),
      action: 'delete',
      adminUsername,
      details: { name: mentor.name, email: mentor.email },
    });

    return NextResponse.json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    console.error('Error deleting mentor:', error);
    return NextResponse.json(
      { error: 'Failed to delete mentor' },
      { status: 500 }
    );
  }
} 