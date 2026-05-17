import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCApplication } from '@/models/DSOCApplication';
import { DSOCProject } from '@/models/DSOCProject';
import { DSOCMentee } from '@/models/DSOCMentee';
import jwt from 'jsonwebtoken';

async function getMentorFromToken(request: NextRequest) {
  const token = request.cookies.get('dsoc-mentor-token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
    if (decoded.role !== 'dsoc-mentor') return null;
    return decoded.id;
  } catch {
    return null;
  }
}

async function getAdminFromToken(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id?: string };
    return decoded.id || null;
  } catch {
    return null;
  }
}

function hasMentorAccess(
  mentorId: string,
  project: { mentors?: Array<{ _id?: string } | string> } | null
) {
  if (!project || !Array.isArray(project.mentors)) return false;

  return project.mentors.some((mentor) => {
    if (!mentor) return false;
    if (typeof mentor === 'string') return mentor === mentorId;
    if (mentor._id) return mentor._id.toString() === mentorId;
    const asAny = mentor as { toString?: () => string };
    return asAny.toString?.() === mentorId;
  });
}

// GET single application
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const mentorId = await getMentorFromToken(request);
    const adminId = await getAdminFromToken(request);
    if (!mentorId && !adminId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const application = await DSOCApplication.findById(id)
      .populate('project', 'title organization status mentors')
      .populate('mentee', 'name email picture university github linkedin')
      .lean();
    
    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    if (mentorId) {
      const project = application.project as { mentors?: Array<{ _id?: string } | string> } | null;
      if (!hasMentorAccess(mentorId, project)) {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
    }
    
    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}

// PUT update application status (mentor/admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const mentorId = await getMentorFromToken(request);
    const adminId = await getAdminFromToken(request);
    if (!mentorId && !adminId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status, mentorNotes, adminNotes, score } = body;
    
    const application = await DSOCApplication.findById(id);
    
    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    if (mentorId) {
      const project = await DSOCProject.findById(application.project)
        .select('mentors')
        .lean();

      if (!project || !hasMentorAccess(mentorId, project)) {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
    }
    
    // Update application
    if (status) application.status = status;
    if (mentorNotes !== undefined) application.mentorNotes = mentorNotes;
    if (adminNotes !== undefined) application.adminNotes = adminNotes;
    if (score !== undefined) application.score = score;
    
    if (status && status !== application.status) {
      application.reviewedAt = new Date();
    }
    
    await application.save();
    
    // If accepted, add mentee to project
    if (status === 'accepted') {
      await DSOCProject.findByIdAndUpdate(
        application.project,
        { $addToSet: { selectedMentees: application.mentee } }
      );
      
      await DSOCMentee.findByIdAndUpdate(
        application.mentee,
        { $addToSet: { projects: application.project } }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE withdraw application
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const application = await DSOCApplication.findById(id);
    
    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }
    
    // Can only withdraw pending applications
    if (application.status !== 'pending') {
      return NextResponse.json(
        { success: false, error: 'Cannot withdraw a processed application' },
        { status: 400 }
      );
    }
    
    application.status = 'withdrawn';
    await application.save();
    
    return NextResponse.json({
      success: true,
      message: 'Application withdrawn successfully',
    });
  } catch (error) {
    console.error('Error withdrawing application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to withdraw application' },
      { status: 500 }
    );
  }
}
