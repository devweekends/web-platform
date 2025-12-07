import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { DSOCProject } from '@/models/DSOCProject';
import { DSOCMentor } from '@/models/DSOCMentor';
import { DSOCMentee } from '@/models/DSOCMentee';
import { DSOCApplication } from '@/models/DSOCApplication';

// GET DSOC stats
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const season = searchParams.get('season');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const projectQuery: any = { isActive: true };
    if (season) projectQuery.season = season;
    
    const [
      totalProjects,
      openProjects,
      inProgressProjects,
      completedProjects,
      totalMentors,
      totalMentees,
      totalApplications,
      technologies,
    ] = await Promise.all([
      DSOCProject.countDocuments(projectQuery),
      DSOCProject.countDocuments({ ...projectQuery, status: 'open' }),
      DSOCProject.countDocuments({ ...projectQuery, status: 'in-progress' }),
      DSOCProject.countDocuments({ ...projectQuery, status: 'completed' }),
      DSOCMentor.countDocuments({ isActive: true }),
      DSOCMentee.countDocuments({ isActive: true }),
      DSOCApplication.countDocuments(),
      DSOCProject.distinct('technologies', projectQuery),
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        projects: {
          total: totalProjects,
          open: openProjects,
          inProgress: inProgressProjects,
          completed: completedProjects,
        },
        mentors: totalMentors,
        mentees: totalMentees,
        applications: totalApplications,
        technologies: technologies.length,
        topTechnologies: technologies.slice(0, 10),
      },
    });
  } catch (error) {
    console.error('Error fetching DSOC stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
