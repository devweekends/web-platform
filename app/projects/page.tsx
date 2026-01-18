import { Suspense } from 'react';
import connectDB from '@/lib/db';
import { Project } from '@/models/Project';
import { SubmitProjectModal } from '@/components/submit-project-modal';
import { ProjectCard } from '@/components/project-card';

async function getProjects() {
  await connectDB();
  // Fetch only approved projects
  const projects = await Project.find({ isApproved: true }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(projects));
}

export const metadata = {
  title: 'Community Projects | DevWeekends',
  description: 'Showcase of projects built by the DevWeekends community.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Community Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Check out what our amazing community members have built. Submit your own project to be featured!
          </p>
        </div>
        <SubmitProjectModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-20 text-muted-foreground">
            <p className="text-xl">No projects found yet. Be the first to submit!</p>
          </div>
        ) : (
          projects.map((project: any) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}
