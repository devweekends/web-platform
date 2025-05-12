import { NextResponse } from 'next/server';
import { Ambassador } from '@/models/Ambassador';
import connectDB from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ActivityLog } from '@/models/ActivityLog';

const JWT_SECRET = process.env.JWT_SECRET;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET all ambassadors
export async function GET() {
  try {
    await connectDB();
    const ambassadors = await Ambassador.find().sort({ createdAt: -1 });
    return NextResponse.json(ambassadors);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch ambassadors' },
      { status: 500 }
    );
  }
}

// POST new ambassador
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Get admin username from JWT
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    let adminUsername = 'Unknown';
    if (token && JWT_SECRET) {
      try {
        const decoded: any = verify(token, JWT_SECRET as string);
        adminUsername = decoded.username || 'Unknown';
      } catch {}
    }

    // Upload image to Cloudinary if it's a base64 string
    let imageUrl = data.image;
    if (data.image.startsWith('data:image')) {
      const result = await cloudinary.uploader.upload(data.image, {
        folder: 'ambassadors',
      });
      imageUrl = result.secure_url;
    }

    const ambassador = new Ambassador({
      ...data,
      image: imageUrl,
      lastModifiedBy: adminUsername,
    });

    await ambassador.save();
    await ActivityLog.create({
      entityType: 'Ambassador',
      entityId: ambassador._id.toString(),
      action: 'add',
      adminUsername,
      details: { name: ambassador.name, university: ambassador.university },
    });
    return NextResponse.json(ambassador);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create ambassador' },
      { status: 500 }
    );
  }
}

// PUT update ambassador
export async function PUT(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Ambassador ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    // Get admin username from JWT
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    let adminUsername = 'Unknown';
    if (token && JWT_SECRET) {
      try {
        const decoded: any = verify(token, JWT_SECRET as string);
        adminUsername = decoded.username || 'Unknown';
      } catch {}
    }
    const ambassador = await Ambassador.findByIdAndUpdate(
      id,
      { ...data, lastModifiedBy: adminUsername },
      { new: true }
    );

    if (!ambassador) {
      return NextResponse.json(
        { error: 'Ambassador not found' },
        { status: 404 }
      );
    }

    await ActivityLog.create({
      entityType: 'Ambassador',
      entityId: ambassador._id.toString(),
      action: 'edit',
      adminUsername,
      details: { name: ambassador.name, university: ambassador.university },
    });
    return NextResponse.json(ambassador);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update ambassador' },
      { status: 500 }
    );
  }
}

// DELETE ambassador
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Ambassador ID is required' },
        { status: 400 }
      );
    }

    const ambassador = await Ambassador.findByIdAndDelete(id);
    if (!ambassador) {
      return NextResponse.json(
        { error: 'Ambassador not found' },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary if it's a Cloudinary URL
    if (ambassador.image.includes('cloudinary')) {
      const publicId = ambassador.image.split('/').slice(-1)[0].split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // In DELETE, extract adminUsername from JWT
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    let adminUsername = 'Unknown';
    if (token && JWT_SECRET) {
      try {
        const decoded: any = verify(token, JWT_SECRET as string);
        adminUsername = decoded.username || 'Unknown';
      } catch {}
    }
    await ActivityLog.create({
      entityType: 'Ambassador',
      entityId: ambassador._id.toString(),
      action: 'delete',
      adminUsername,
      details: { name: ambassador.name, university: ambassador.university },
    });

    return NextResponse.json({ message: 'Ambassador deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete ambassador' },
      { status: 500 }
    );
  }
} 