import { NextResponse } from 'next/server';
import { Mentor } from '@/models/Mentor';
import { Mentee } from '@/models/Mentee';
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

// POST assign/unassign tags to mentor or mentee
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
    if (!data.personId || !data.personType || !Array.isArray(data.tagIds)) {
      return NextResponse.json(
        { error: 'Person ID, person type, and tag IDs array are required' },
        { status: 400 }
      );
    }

    const { personId, personType, tagIds } = data;

    // Validate person type
    if (!['mentor', 'mentee'].includes(personType)) {
      return NextResponse.json(
        { error: 'Person type must be either "mentor" or "mentee"' },
        { status: 400 }
      );
    }

    // Validate tag IDs exist
    const validTags = await Tag.find({ _id: { $in: tagIds } });
    if (validTags.length !== tagIds.length) {
      return NextResponse.json(
        { error: 'One or more tag IDs are invalid' },
        { status: 400 }
      );
    }

    let updatedPerson;
    let personName = '';

    if (personType === 'mentor') {
      updatedPerson = await Mentor.findByIdAndUpdate(
        personId,
        { tags: tagIds },
        { new: true }
      ).populate('tags');
      
      if (!updatedPerson) {
        return NextResponse.json(
          { error: 'Mentor not found' },
          { status: 404 }
        );
      }
      
      personName = updatedPerson.name;
    } else {
      updatedPerson = await Mentee.findByIdAndUpdate(
        personId,
        { tags: tagIds },
        { new: true }
      ).populate('tags');
      
      if (!updatedPerson) {
        return NextResponse.json(
          { error: 'Mentee not found' },
          { status: 404 }
        );
      }
      
      personName = updatedPerson.name;
    }

    // Log activity
    await ActivityLog.create({
      entityType: personType.charAt(0).toUpperCase() + personType.slice(1),
      entityId: personId,
      action: 'edit',
      adminUsername,
      details: { 
        name: personName,
        action: 'Tag assignment updated',
        tagCount: tagIds.length
      },
    });

    return NextResponse.json({
      message: 'Tags assigned successfully',
      person: updatedPerson
    });
  } catch (error) {
    console.error('Error assigning tags:', error);
    return NextResponse.json(
      { error: 'Failed to assign tags' },
      { status: 500 }
    );
  }
} 