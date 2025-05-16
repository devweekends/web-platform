import { NextRequest, NextResponse } from 'next/server';
import { Mentee } from '@/models/Mentee';
import { Mentor } from '@/models/Mentor';
import connectDB from '@/lib/db';
import { getMentorFromToken } from '@/lib/auth';

// GET - Get a specific mentee (with authorization check)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const mentor = await getMentorFromToken(request);
    
    if (!mentor) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const mentee = await Mentee.findById(params.id);
    
    if (!mentee) {
      return NextResponse.json(
        { error: 'Mentee not found' },
        { status: 404 }
      );
    }
    
    // Security: Check if this mentee belongs to the authenticated mentor
    if (mentee.mentor.toString() !== mentor._id.toString()) {
      return NextResponse.json(
        { error: 'Unauthorized access to this mentee' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(mentee);
  } catch (error) {
    console.error('Error fetching mentee:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentee' },
      { status: 500 }
    );
  }
}

// PUT - Update a mentee
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const mentor = await getMentorFromToken(request);
    
    if (!mentor) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const mentee = await Mentee.findById(params.id);
    
    if (!mentee) {
      return NextResponse.json(
        { error: 'Mentee not found' },
        { status: 404 }
      );
    }
    
    // Security: Check if this mentee belongs to the authenticated mentor
    if (mentee.mentor.toString() !== mentor._id.toString()) {
      return NextResponse.json(
        { error: 'Unauthorized access to this mentee' },
        { status: 403 }
      );
    }
    
    const updatedData = await request.json();
    
    // Don't allow changing the mentor
    delete updatedData.mentor;
    
    const updatedMentee = await Mentee.findByIdAndUpdate(
      params.id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(updatedMentee);
  } catch (error) {
    console.error('Error updating mentee:', error);
    return NextResponse.json(
      { error: 'Failed to update mentee' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a mentee
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const mentor = await getMentorFromToken(request);
    
    if (!mentor) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const mentee = await Mentee.findById(params.id);
    
    if (!mentee) {
      return NextResponse.json(
        { error: 'Mentee not found' },
        { status: 404 }
      );
    }
    
    // Security: Check if this mentee belongs to the authenticated mentor
    if (mentee.mentor.toString() !== mentor._id.toString()) {
      return NextResponse.json(
        { error: 'Unauthorized access to this mentee' },
        { status: 403 }
      );
    }
    
    await Mentee.findByIdAndDelete(params.id);
    
    // Also remove the mentee from the mentor's mentees array
    await Mentor.findByIdAndUpdate(
      mentor._id,
      { $pull: { mentees: params.id } }
    );
    
    return NextResponse.json({ message: 'Mentee deleted successfully' });
  } catch (error) {
    console.error('Error deleting mentee:', error);
    return NextResponse.json(
      { error: 'Failed to delete mentee' },
      { status: 500 }
    );
  }
} 