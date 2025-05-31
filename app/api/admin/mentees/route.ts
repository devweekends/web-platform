import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ActivityLog } from '@/models/ActivityLog';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

// Import models in correct order to ensure proper registration
import { Tag } from '@/models/Tag';
import { Mentee } from '@/models/Mentee';
import { Mentor } from '@/models/Mentor';

// In-memory cache for admin mentees
export const adminMenteesCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

const JWT_SECRET = process.env.JWT_SECRET;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET all mentees or a single mentee by ID with full details (admin view)
export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Check if an ID is provided in the query string
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      // For single mentee, check cache first
      const cacheKey = `admin-mentee-${id}`;
      const cached = adminMenteesCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json(cached.data);
      }

      // Return a single mentee by ID with populated mentor and tags
      const mentee = await Mentee.findById(id)
        .populate('mentor')
        .populate('tags')
        .maxTimeMS(10000); // 10 second timeout
      
      if (!mentee) {
        return NextResponse.json({ error: 'Mentee not found' }, { status: 404 });
      }

      // Cache the result
      adminMenteesCache.set(cacheKey, {
        data: mentee,
        timestamp: Date.now()
      });
      
      return NextResponse.json(mentee);
    } else {
      // For all mentees, check cache first
      const cacheKey = 'admin-mentees-all';
      const cached = adminMenteesCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json(cached.data);
      }

      // Return all mentees with populated mentor and tags
      const mentees = await Mentee.find()
        .populate('mentor')
        .populate('tags')
        .sort({ createdAt: -1 })
        .maxTimeMS(15000); // 15 second timeout

      // Cache the result
      adminMenteesCache.set(cacheKey, {
        data: mentees,
        timestamp: Date.now()
      });

      return NextResponse.json(mentees);
    }
  } catch (error) {
    console.error('Error fetching mentees:', error);
    
    // Try to return stale cache if available
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const cacheKey = id ? `admin-mentee-${id}` : 'admin-mentees-all';
    const staleCache = adminMenteesCache.get(cacheKey);
    
    if (staleCache) {
      return NextResponse.json(staleCache.data);
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch mentees',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to invalidate caches and notify other tabs
function invalidateAdminMenteesCaches(menteeId?: string) {
  adminMenteesCache.delete('admin-mentees-all');
  if (menteeId) {
    adminMenteesCache.delete(`admin-mentee-${menteeId}`);
  }
  
  // Notify other tabs/windows about mentee data changes
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mentorship-data-updated', JSON.stringify({
        type: 'mentee',
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

// POST new mentee
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { username: string };
    const adminUsername = decoded.username;

    await connectDB();
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.mentor) {
      return NextResponse.json(
        { error: 'Name, email, and mentor are required' },
        { status: 400 }
      );
    }

    // Check if mentor exists
    const mentor = await Mentor.findById(data.mentor);
    if (!mentor) {
      return NextResponse.json(
        { error: 'Selected mentor does not exist' },
        { status: 400 }
      );
    }

    // Handle image upload if provided
    let pictureUrl = data.picture || '';
    if (data.picture && data.picture.startsWith('data:image')) {
      const result = await cloudinary.uploader.upload(data.picture, {
        folder: 'mentees',
      });
      pictureUrl = result.secure_url;
    }

    // Create mentee
    const mentee = new Mentee({
      ...data,
      picture: pictureUrl,
    });

    await mentee.save();

    // Update the mentor to add this mentee to their mentees array
    await Mentor.findByIdAndUpdate(data.mentor, {
      $addToSet: { mentees: mentee._id }
    });

    // Log activity
    await ActivityLog.create({
      action: 'add',
      entityType: 'mentee',
      entityId: mentee._id,
      details: `Added mentee: ${mentee.name}`,
      adminUsername,
    });

    // Invalidate caches after creating new mentee
    invalidateAdminMenteesCaches();

    return NextResponse.json(mentee);
  } catch (error) {
    console.error('Error creating mentee:', error);
    return NextResponse.json(
      { error: 'Failed to create mentee' },
      { status: 500 }
    );
  }
}

// PUT update mentee
export async function PUT(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Mentee ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Get admin username from JWT
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { username: string };
    const adminUsername = decoded.username;

    // Find the existing mentee to get current data
    const existingMentee = await Mentee.findById(id);
    if (!existingMentee) {
      return NextResponse.json(
        { error: 'Mentee not found' },
        { status: 404 }
      );
    }

    // Handle image upload if it's a new image
    let imageUrl = data.picture;
    if (data.picture?.startsWith('data:image')) {
      const result = await cloudinary.uploader.upload(data.picture, {
        folder: 'mentees',
      });
      imageUrl = result.secure_url;
    }

    // Check if mentor has changed
    const oldMentorId = existingMentee.mentor?.toString();
    const newMentorId = data.mentor?.toString();

    if (oldMentorId !== newMentorId) {
      // Remove mentee from old mentor's mentees array
      if (oldMentorId) {
        await Mentor.findByIdAndUpdate(oldMentorId, {
          $pull: { mentees: existingMentee._id }
        });
      }

      // Add mentee to new mentor's mentees array
      if (newMentorId) {
        await Mentor.findByIdAndUpdate(newMentorId, {
          $addToSet: { mentees: existingMentee._id }
        });
      }
    }

    // Update the mentee
    const updateData = {
      ...data,
      picture: imageUrl,
    };

    const mentee = await Mentee.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('mentor').populate('tags');

    // Log activity
    await ActivityLog.create({
      action: 'edit',
      entityType: 'mentee',
      entityId: mentee._id,
      details: `Updated mentee: ${mentee.name}`,
      adminUsername,
    });

    // Invalidate caches after updating mentee
    invalidateAdminMenteesCaches(id);

    return NextResponse.json(mentee);
  } catch (error) {
    console.error('Error updating mentee:', error);
    return NextResponse.json(
      { error: 'Failed to update mentee' },
      { status: 500 }
    );
  }
}

// DELETE mentee
export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { username: string };
    const adminUsername = decoded.username;

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Mentee ID is required' },
        { status: 400 }
      );
    }

    const mentee = await Mentee.findById(id);
    if (!mentee) {
      return NextResponse.json(
        { error: 'Mentee not found' },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary if exists
    if (mentee.picture) {
      const publicId = mentee.picture.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Remove mentee from mentor's mentees array if they are a mentor
    if (mentee.isMentor && mentee.mentor) {
      await Mentor.findByIdAndUpdate(mentee.mentor, {
        $pull: { mentees: mentee._id },
      });
    }

    await Mentee.findByIdAndDelete(id);

    // Log activity
    await ActivityLog.create({
      action: 'delete',
      entityType: 'mentee',
      entityId: mentee._id,
      details: `Deleted mentee: ${mentee.name}`,
      adminUsername,
    });

    // Invalidate caches after deleting mentee
    invalidateAdminMenteesCaches(id);

    return NextResponse.json({ message: 'Mentee deleted successfully' });
  } catch (error) {
    console.error('Error deleting mentee:', error);
    return NextResponse.json(
      { error: 'Failed to delete mentee' },
      { status: 500 }
    );
  }
}

// Export function to clear admin mentee cache
export function clearAdminMenteeCache() {
  adminMenteesCache.clear();
} 