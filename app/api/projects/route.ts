import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Project } from '@/models/Project';

// GET: Fetch approved projects for public display
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({ isApproved: true }).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST: Submit a new project
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    const missingFields = [];
    if (!data.title) missingFields.push('title');
    if (!data.description) missingFields.push('description');
    if (!data.imageUrl) missingFields.push('imageUrl');
    if (!data.submitterName) missingFields.push('submitterName');
    if (!data.submitterEmail) missingFields.push('submitterEmail');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const project = await Project.create({
      ...data,
      isApproved: false, // Ensure explicitly false on creation
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error submitting project:', error);
    return NextResponse.json(
      { error: 'Failed to submit project' },
      { status: 500 }
    );
  }
}
