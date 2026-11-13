import type { Metadata } from "next";
import { cache } from "react";

import { getDsocProject } from "@/lib/dsoc-projects";
import { pageTitle, snippetOf, withSocial } from "@/lib/seo";
import ProjectDetail from "./project-detail";
import { SAMPLE_PROJECTS, type Project } from "./project-data";

// Read from the database at most once an hour per project
export const revalidate = 3600;

// The samples are built ahead of time. A database project is rendered on its
// first visit and then kept, so later visitors get it from the cache.
export function generateStaticParams() {
  return Object.keys(SAMPLE_PROJECTS).map((id) => ({ id }));
}

type Props = { params: Promise<{ id: string }> };

/**
 * A real project from the database, or one of the built-in samples by its short
 * name. Cached for the request, so the metadata and the page share one read.
 */
const loadProject = cache(
  async (id: string): Promise<{ project: Project | null; sample: boolean; unavailable: boolean }> => {
    if (SAMPLE_PROJECTS[id]) return { project: SAMPLE_PROJECTS[id], sample: true, unavailable: false };
    const found = await getDsocProject(id);
    return { project: (found ?? null) as Project | null, sample: false, unavailable: found === undefined };
  }
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { project, sample, unavailable } = await loadProject(id);
  // The database could not be read: the browser will load the project, so say nothing against indexing it
  if (unavailable) return { title: "DSOC project", alternates: { canonical: `/dsoc/projects/${id}` } };
  if (!project) return { title: "DSOC project", robots: { index: false, follow: true } };

  return withSocial({
    title: pageTitle(`${project.title}: DSOC project`),
    description: snippetOf(project.description),
    alternates: { canonical: `/dsoc/projects/${id}` },
    // The samples stand in when the database is unreachable and repeat real
    // projects, so they stay out of search
    ...(sample ? { robots: { index: false, follow: true } } : {}),
  });
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const { project } = await loadProject(id);
  return <ProjectDetail initialProject={project} />;
}
