import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Project } from '@/models/Project';
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

// PATCH: Update project (e.g. approve)
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
    
    const project = await Project.findByIdAndUpdate(
      id,
      { isApproved: data.isApproved },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Log activity
    await ActivityLog.create({
      entityType: 'Project',
      entityId: project._id.toString(),
      action: 'update',
      adminUsername,
      details: { 
        title: project.title, 
        isApproved: project.isApproved 
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE: Delete project
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

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Log activity
    await ActivityLog.create({
      entityType: 'Project',
      entityId: id,
      action: 'delete',
      adminUsername,
      details: { title: project.title },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
