import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Job } from '@/models/Job';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ActivityLog } from '@/models/ActivityLog';

const JWT_SECRET = process.env.JWT_SECRET;

async function checkAdmin(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token || !JWT_SECRET) return null;
  try {
    const decoded: any = verify(token, JWT_SECRET);
    return decoded.username || 'Unknown';
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const adminUsername = await checkAdmin();
    if (!adminUsername) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const jobs = await Job.find().sort({ createdAt: -1 });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('GET /api/admin/jobs', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const adminUsername = await checkAdmin();
    if (!adminUsername) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const data = await request.json();

    if (!data.title || !data.company || !data.description) {
      return NextResponse.json(
        { error: 'title, company, and description are required' },
        { status: 400 }
      );
    }

    const job = new Job({
      title: String(data.title).trim(),
      company: String(data.company).trim(),
      location: String(data.location || '').trim(),
      workplaceType: String(data.workplaceType || 'Remote').trim(),
      employmentType: String(data.employmentType || 'Full-time').trim(),
      audience: String(data.audience || 'Both').trim(),
      description: String(data.description).trim(),
      requirements: String(data.requirements || '').trim(),
      applyUrl: String(data.applyUrl || '').trim(),
      applyEmail: String(data.applyEmail || '').trim(),
      deadline: data.deadline ? new Date(data.deadline) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map((t: any) => String(t).trim()).filter(Boolean) : [],
      isActive: data.isActive !== false,
      lastModifiedBy: adminUsername,
    });

    await job.save();

    await ActivityLog.create({
      entityType: 'Job',
      entityId: job._id.toString(),
      action: 'add',
      adminUsername,
      details: { title: job.title, company: job.company },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/admin/jobs', error);
    return NextResponse.json({ error: error?.message || 'Failed to create job' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const adminUsername = await checkAdmin();
    if (!adminUsername) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });

    const data = await request.json();
    const update: any = {
      lastModifiedBy: adminUsername,
    };

    if (data.title !== undefined) update.title = String(data.title).trim();
    if (data.company !== undefined) update.company = String(data.company).trim();
    if (data.location !== undefined) update.location = String(data.location || '').trim();
    if (data.workplaceType !== undefined) update.workplaceType = String(data.workplaceType || '').trim();
    if (data.employmentType !== undefined) update.employmentType = String(data.employmentType || '').trim();
    if (data.audience !== undefined) update.audience = String(data.audience || '').trim();
    if (data.description !== undefined) update.description = String(data.description || '').trim();
    if (data.requirements !== undefined) update.requirements = String(data.requirements || '').trim();
    if (data.applyUrl !== undefined) update.applyUrl = String(data.applyUrl || '').trim();
    if (data.applyEmail !== undefined) update.applyEmail = String(data.applyEmail || '').trim();
    if (data.deadline !== undefined) update.deadline = data.deadline ? new Date(data.deadline) : undefined;
    if (data.tags !== undefined) {
      update.tags = Array.isArray(data.tags) ? data.tags.map((t: any) => String(t).trim()).filter(Boolean) : [];
    }
    if (data.isActive !== undefined) update.isActive = !!data.isActive;

    const job = await Job.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

    await ActivityLog.create({
      entityType: 'Job',
      entityId: job._id.toString(),
      action: 'edit',
      adminUsername,
      details: { title: job.title, company: job.company },
    });

    return NextResponse.json(job);
  } catch (error: any) {
    console.error('PUT /api/admin/jobs', error);
    return NextResponse.json({ error: error?.message || 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const adminUsername = await checkAdmin();
    if (!adminUsername) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });

    const job = await Job.findByIdAndDelete(id);
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

    await ActivityLog.create({
      entityType: 'Job',
      entityId: job._id.toString(),
      action: 'delete',
      adminUsername,
      details: { title: job.title, company: job.company },
    });

    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/admin/jobs', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}


