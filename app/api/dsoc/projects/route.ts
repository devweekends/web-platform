import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import '@/models/DSOCMentor';
import { DSOCProject } from '@/models/DSOCProject';
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
    const mentorOnly = searchParams.get('mentor') === 'true';
    
    // Build query
    const query: any = { isActive: true };
    
    if (mentorOnly) {
      const mentorId = await getMentorFromToken(request);
      if (!mentorId) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }
      query.mentors = mentorId;
    }

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

    // Support both legacy imageUrl and schema-native featuredImage.
    const normalizedBody = {
      ...body,
      featuredImage: body.featuredImage || body.imageUrl,
    };

    const project = new DSOCProject(normalizedBody);
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
