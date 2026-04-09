import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Project } from '@/models/Project';
import { ActivityLog } from '@/models/ActivityLog';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const JWT_SECRET = process.env.JWT_SECRET;

// Helper to check admin auth
async function checkAdminAuth() {
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

// GET: Fetch all projects (for admin dashboard)
export async function GET() {
  try {
    await connectDB();
    
    // Optional: Check auth, though middleware might handle it. 
    // Good practice to check here too if critical.
    const adminUser = await checkAdminAuth();
    if (!adminUser) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST: Admin manually create a project (auto-approved)
export async function POST(request: Request) {
  try {
    await connectDB();
    const adminUsername = await checkAdminAuth();
    if (!adminUsername) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const project = await Project.create({
      ...data,
      isApproved: true, // Auto-approved for admin
    });

    // Log activity
    await ActivityLog.create({
      entityType: 'Project',
      entityId: project._id.toString(),
      action: 'create',
      adminUsername,
      details: { title: project.title },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
