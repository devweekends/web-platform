import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCProject } from '@/models/DSOCProject';

// GET single project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const project = await DSOCProject.findById(id)
      .populate('mentors', 'name email picture company jobTitle bio linkedin github')
      .populate('selectedMentees', 'name picture university')
      .lean();
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error fetching DSOC project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    // TODO: Add admin/mentor authentication check
    const body = await request.json();

    // Support both legacy imageUrl and schema-native featuredImage.
    const normalizedBody = {
      ...body,
      featuredImage: body.featuredImage || body.imageUrl,
    };
    
    const project = await DSOCProject.findByIdAndUpdate(
      id,
      { $set: normalizedBody },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error updating DSOC project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    // TODO: Add admin authentication check
    const project = await DSOCProject.findByIdAndDelete(id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting DSOC project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
