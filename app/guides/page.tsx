import matter from "gray-matter";
import GuidesClient from "./guidesClient";
import { withSocial } from "@/lib/seo";
import { contentSlugs, readContent } from "@/lib/site-files";

export const metadata = withSocial({
  alternates: { canonical: "/guides" },
  title: "Guides",
  description:
    "Curated, practical guides by Dev Weekends on cracking tech roles, building habits, open source, and growing as an engineer.",
});

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  order: number;
  date: string;
  author?: string;
  icon?: string;
  readingTime?: string;
};

// Launch set of categories. Categories with zero guides still render a tab
// with an empty state so the structure is visible as content grows.
export const GUIDE_CATEGORIES = [
  "Career & Tech Roles",
  "Productivity & Habits",
  "Open Source",
  "Mindset & Growth",
] as const;

export default function GuidesPage() {
  const guides: Guide[] = contentSlugs("guides").map((slug) => {
    const { data } = matter(readContent("guides", slug) ?? "");

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      category: data.category ?? "Mindset & Growth",
      featured: data.featured ?? false,
      order: data.order ?? 999,
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : (data.date ?? ""),
      author: data.author ?? "Dev Weekends",
      icon: data.icon ?? "BookOpen",
      readingTime: data.readingTime ?? "",
    };
  });

  return (
    <GuidesClient
      guides={guides}
      categories={[...GUIDE_CATEGORIES]}
    />
  );
}
