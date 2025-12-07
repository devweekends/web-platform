import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCProject } from '@/models/DSOCProject';

// GET all projects with filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const difficulty = searchParams.get('difficulty');
    const technology = searchParams.get('technology');
    const season = searchParams.get('season');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { isActive: true };
    
    if (status) query.status = status;
    if (difficulty) query.difficulty = difficulty;
    if (technology) query.technologies = { $in: [technology] };
    if (season) query.season = season;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { organization: { $regex: search, $options: 'i' } },
        { technologies: { $regex: search, $options: 'i' } },
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const [projects, total] = await Promise.all([
      DSOCProject.find(query)
        .populate('mentors', 'name picture company jobTitle')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      DSOCProject.countDocuments(query),
    ]);
    
    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching DSOC projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST create new project (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // TODO: Add admin authentication check
    const body = await request.json();
    
    const project = new DSOCProject(body);
    await project.save();
    
    return NextResponse.json({
      success: true,
      data: project,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating DSOC project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
