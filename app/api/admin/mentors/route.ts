import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ActivityLog } from '@/models/ActivityLog';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

// Import models in correct order to ensure proper registration
import { Tag } from '@/models/Tag';
import { Mentor } from '@/models/Mentor';
import { Mentee } from '@/models/Mentee';

// In-memory cache for admin routes
export const adminCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

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
      // For single mentor, check cache first
      const cacheKey = `admin-mentor-${id}`;
      const cached = adminCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json(cached.data);
      }

      // Return a single mentor by ID with populated mentees and tags
      const mentor = await Mentor.findById(id)
        .populate('mentees')
        .populate('tags')
        .maxTimeMS(10000); // 10 second timeout
      
      if (!mentor) {
        return NextResponse.json({ error: 'Mentor not found' }, { status: 404 });
      }

      // Cache the result
      adminCache.set(cacheKey, {
        data: mentor,
        timestamp: Date.now()
      });
      
      return NextResponse.json(mentor);
    } else {
      // For all mentors, check cache first
      const cacheKey = 'admin-mentors-all';
      const cached = adminCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json(cached.data);
      }

      // Return all mentors with populated mentees and tags
      const mentors = await Mentor.find()
        .populate('mentees')
        .populate('tags')
        .sort({ createdAt: -1 })
        .maxTimeMS(15000); // 15 second timeout

      // Cache the result
      adminCache.set(cacheKey, {
        data: mentors,
        timestamp: Date.now()
      });

      return NextResponse.json(mentors);
    }
  } catch (error) {
    console.error('Error fetching mentors:', error);
    
    // Try to return stale cache if available
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const cacheKey = id ? `admin-mentor-${id}` : 'admin-mentors-all';
    const staleCache = adminCache.get(cacheKey);
    
    if (staleCache) {
      return NextResponse.json(staleCache.data);
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch mentors',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to invalidate caches and notify other tabs
function invalidateAdminMentorCaches(mentorId?: string) {
  adminCache.delete('admin-mentors-all');
  if (mentorId) {
    adminCache.delete(`admin-mentor-${mentorId}`);
  }
  
  // Notify other tabs/windows about mentor data changes
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mentorship-data-updated', JSON.stringify({
        type: 'mentor',
        action: 'update',
        timestamp: Date.now()
      }));
      localStorage.removeItem('mentorship-data-updated'); // Trigger storage event
    }
  } catch (error) {
    // Server-side or localStorage not available
    console.warn('Cross-tab communication not available:', error);
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

    // Invalidate caches after creating new mentor
    invalidateAdminMentorCaches();

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
    const existingMentor = await Mentor.findById(id)
      .populate('mentees')
      .populate('tags');
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
      ).populate('mentees').populate('tags');
    }

    await ActivityLog.create({
      entityType: 'Mentor',
      entityId: mentor._id.toString(),
      action: 'edit',
      adminUsername,
      details: { name: mentor.name, email: mentor.email },
    });

    // Invalidate caches after updating mentor
    invalidateAdminMentorCaches(id);

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
      entityId: id,
      action: 'delete',
      adminUsername,
      details: { name: mentor.name, email: mentor.email },
    });

    // Invalidate caches after deleting mentor
    invalidateAdminMentorCaches(id);

    return NextResponse.json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    console.error('Error deleting mentor:', error);
    return NextResponse.json(
      { error: 'Failed to delete mentor' },
      { status: 500 }
    );
  }
}

// Export function to clear admin mentor cache
export function clearAdminMentorCache() {
  adminCache.clear();
} 