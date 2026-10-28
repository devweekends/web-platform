import connectDB from '@/lib/db';
import { Project } from '@/models/Project';
import { SubmitProjectDialog } from '@/components/projects/submit-project-dialog';
import { ProjectTile, type ProjectItem } from '@/components/projects/project-tile';
import { Card, Eyebrow, PageHero, Panel, Section } from '@/components/site/page-kit';
import { withSocial } from "@/lib/seo";

// Served from cache and rebuilt at most every five minutes. Admin changes to
// approved projects refresh it straight away through revalidatePath.
export const revalidate = 300;

async function getProjects(): Promise<ProjectItem[]> {
  try {
    await connectDB();
    // Fetch only approved projects
    const projects = await Project.find({ isApproved: true }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error('Unable to load community projects:', error);
    return [];
  }
}

export const metadata = withSocial({
  alternates: { canonical: "/projects" },
  title: 'Community projects',
  description: 'Showcase of projects built by the DevWeekends community.',
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Community projects"
        title="Built by our community."
        intro="See what our members have built. Submit your own project to be featured."
        actions={<SubmitProjectDialog />}
      />

      <Section>
        {projects.length === 0 ? (
          <Card tone="gray" className="items-center py-16 text-center">
            <p className="text-[19px] font-semibold tracking-[-0.01em]">No projects yet.</p>
            <p className="mt-2 text-[17px] text-[#5C5C5C]">Be the first to submit one.</p>
          </Card>
        ) : (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project._id}>
                <ProjectTile project={project} />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Panel>
        <Eyebrow onDark>Your turn</Eyebrow>
        <h2 className="mt-3.5 max-w-[20ch] text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
          Built something? Show it here.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-[#C7C7C7]">
          Every project is reviewed before it is published.
        </p>
        <div className="mt-9">
          <SubmitProjectDialog variant="onDark" />
        </div>
      </Panel>
    </>
  );
}
