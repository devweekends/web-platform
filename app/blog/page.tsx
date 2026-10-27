import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogClient from "./blogClient";

export const metadata = {
  title: "Blog",
  description: "News and stories from Dev Weekends: fellowship updates, Google Summer of Code results and community highlights.",
  alternates: { canonical: "/blog" },
}

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  description?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: "top" | "center" | "bottom";
  featured?: boolean;
  order?: number;
};

const PORTRAIT_POSTER_SLUGS = new Set(["gsoc"]);

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), "content", "blog");
  let files: string[] = [];
  try {
    files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
  } catch (error) {
    console.error("Could not read blog posts:", error);
  }

  const posts: Post[] = files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    const slug = file.replace(".md", "");

    return {
      slug,
      title: data.title,
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date,
      category: data.category,
      description: data.description || "",
      image: data.image || "/post1.jpg",
      imageFit:
        data.imageFit ?? (PORTRAIT_POSTER_SLUGS.has(slug) ? "contain" : "cover"),
      imagePosition: data.imagePosition ?? "center",
      featured: data.featured || false,
      order: data.order ?? 999,
    };
  });

  return <BlogClient posts={posts} />;
}