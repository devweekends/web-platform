import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleBody } from "@/components/content/article-body";
import { formatDate } from "@/components/content/format-date";
import { Button, Eyebrow, container } from "@/components/site/page-kit";
import { SITE_NAME, blogPostingJsonLd, jsonLdString, withSocial } from "@/lib/seo";

const backLink =
  "inline-flex min-h-11 items-center text-[15px] font-medium text-[#5C5C5C] transition-colors hover:text-[#0A0A0A]";

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return { title: "Post not found", robots: { index: false } };
  const { data } = matter(fs.readFileSync(filePath, "utf-8"));
  const date = data.date ? new Date(data.date) : undefined;
  return withSocial({
    title: data.title,
    description: data.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: "en_US",
      title: data.title,
      description: data.description,
      url: `/blog/${slug}`,
      publishedTime: date && !Number.isNaN(date.getTime()) ? date.toISOString() : undefined,
      images: data.image ? [{ url: data.image }] : undefined,
    },
    twitter: data.image ? { images: [data.image] } : undefined,
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "content",
    "blog",
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return (
      <main className="bg-white">
        <div className={`${container} py-24 md:py-32`}>
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-4 text-[clamp(32px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Post not found
          </h1>
          <p className="mt-5 max-w-[48ch] text-[18px] leading-[1.65] text-[#404040]">
            This post does not exist or has moved.
          </p>
          <div className="mt-8">
            <Button href="/blog">Back to blog</Button>
          </div>
        </div>
      </main>
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const date = formatDate(data.date instanceof Date ? data.date.toISOString() : data.date);

  const fit: "cover" | "contain" =
    data.imageFit ?? (slug === "gsoc" ? "contain" : "cover");

  const jsonLd = blogPostingJsonLd({
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    image: data.image,
  });

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <div className={`${container} pb-20 pt-8 md:pb-24`}>
        <Link href="/blog" className={backLink}>
          <span aria-hidden="true" className="mr-2">&larr;</span>
          All posts
        </Link>

        {/* HEADER */}
        <header className="mx-auto mt-8 max-w-[720px]">
          {data.category && <Eyebrow>{data.category}</Eyebrow>}
          <h1 className="mt-4 text-[clamp(34px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#0A0A0A]">
            {data.title}
          </h1>
          {date && <p className="mt-6 text-[14px] text-[#5C5C5C]">{date}</p>}
        </header>

        {/* COVER IMAGE */}
        {data.image && (
          <div className="mx-auto mt-12 max-w-[720px] overflow-hidden rounded-[20px] bg-[#0A0A0A]">
            <div className={`relative w-full ${fit === "contain" ? "aspect-[4/5]" : "aspect-[16/9]"}`}>
              <Image
                src={data.image}
                alt={data.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 720px"
                className={fit === "contain" ? "object-contain" : "object-cover object-center"}
              />
            </div>
          </div>
        )}

        {/* MARKDOWN */}
        <article className="mt-12">
          <ArticleBody content={content} optimizeImages />
        </article>

        {/* FOOTER */}
        <div className="mx-auto mt-16 max-w-[720px] border-t border-[#E6E6E6] pt-6">
          <Link href="/blog" className={backLink}>
            <span aria-hidden="true" className="mr-2">&larr;</span>
            More from the blog
          </Link>
        </div>
      </div>
    </main>
  );
}
