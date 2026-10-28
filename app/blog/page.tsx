import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogClient from "./blogClient";
import { withSocial } from "@/lib/seo";

export const metadata = withSocial({
  title: "News, guides and blog",
  description:
    "News, practical guides and stories from Dev Weekends: fellowship updates, Google Summer of Code results, career guides and community highlights.",
  alternates: { canonical: "/blog" },
})

export type ReadKind = "news" | "guides" | "blog";

/** One readable item on /blog: a news post, a guide or a blog post */
export type Post = {
  slug: string;
  href: string;
  kind: ReadKind;
  title: string;
  date: string;
  description?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: "top" | "center" | "bottom";
  featured?: boolean;
  readingTime?: string;
};

const PORTRAIT_POSTER_SLUGS = new Set(["gsoc"]);

function readFolder(folder: "blog" | "guides") {
  const dir = path.join(process.cwd(), "content", folder);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((file) => ({ slug: file.replace(/\.md$/, ""), data: matter(fs.readFileSync(path.join(dir, file), "utf-8")).data }));
  } catch (error) {
    console.error(`Could not read ${folder}:`, error);
    return [];
  }
}

const isoDate = (value: unknown) => (value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? ""));

export default function BlogPage() {
  // Posts tagged "news" go under News; every other post (no category, or "blog") under Blog
  const posts: Post[] = readFolder("blog")
    .filter(({ data }) => data.draft !== true)
    .map(({ slug, data }) => ({
      slug,
      href: `/blog/${slug}`,
      kind: String(data.category ?? "").toLowerCase() === "news" ? "news" : "blog",
      title: data.title,
      date: isoDate(data.date),
      description: data.description || "",
      image: data.image || "/post1.jpg",
      imageFit: data.imageFit ?? (PORTRAIT_POSTER_SLUGS.has(slug) ? "contain" : "cover"),
      imagePosition: data.imagePosition ?? "center",
      featured: data.featured || false,
    }));

  const guides: Post[] = readFolder("guides")
    .filter(({ data }) => data.draft !== true)
    .map(({ slug, data }) => ({
      slug,
      href: `/guides/${slug}`,
      kind: "guides",
      title: data.title ?? slug,
      date: isoDate(data.date),
      description: data.description ?? "",
      image: data.image,
      imageFit: "contain",
      featured: data.featured ?? false,
      readingTime: data.readingTime ?? "",
    }));

  return <BlogClient items={[...posts, ...guides]} />;
}
