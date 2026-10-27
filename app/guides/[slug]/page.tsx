import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { Metadata } from "next";
import { ArticleBody } from "@/components/content/article-body";
import { formatDate } from "@/components/content/format-date";
import { Button, Eyebrow, container } from "@/components/site/page-kit";
import { blogPostingJsonLd, jsonLdString, withSocial } from "@/lib/seo";

const guidesDir = path.join(process.cwd(), "content", "guides");

function readGuide(slug: string) {
  const filePath = path.join(guidesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return matter(fileContent);
}

export function generateStaticParams() {
  if (!fs.existsSync(guidesDir)) return [];
  return fs
    .readdirSync(guidesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = readGuide(slug);
  if (!guide) return { title: "Guide not found", robots: { index: false } };
  return withSocial({
    title: guide.data.title,
    description: guide.data.description ?? "",
    alternates: { canonical: `/guides/${slug}` },
  });
}

const backLink =
  "inline-flex min-h-11 items-center text-[15px] font-medium text-[#5C5C5C] transition-colors hover:text-[#0A0A0A]";

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = readGuide(slug);

  if (!guide) {
    return (
      <main className="bg-white">
        <div className={`${container} py-24 md:py-32`}>
          <Eyebrow>Guides</Eyebrow>
          <h1 className="mt-4 text-[clamp(32px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Guide not found
          </h1>
          <p className="mt-5 max-w-[48ch] text-[18px] leading-[1.65] text-[#404040]">
            This guide does not exist or has moved.
          </p>
          <div className="mt-8">
            <Button href="/guides">Back to guides</Button>
          </div>
        </div>
      </main>
    );
  }

  const { data, content } = guide;
  const date = formatDate(data.date instanceof Date ? data.date.toISOString() : data.date);
  const meta = [data.author, data.readingTime, date].filter(Boolean);
  const jsonLd = blogPostingJsonLd({
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    image: data.image,
    author: data.author,
    folder: "guides",
  });

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <div className={`${container} pb-20 pt-8 md:pb-24`}>
        <Link href="/guides" className={backLink}>
          <span aria-hidden="true" className="mr-2">&larr;</span>
          All guides
        </Link>

        {/* HEADER */}
        <header className="mx-auto mt-8 max-w-[720px]">
          {data.category && <Eyebrow>{data.category}</Eyebrow>}
          <h1 className="mt-4 text-[clamp(34px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#0A0A0A]">
            {data.title}
          </h1>
          {data.description && (
            <p className="mt-5 text-[19px] leading-[1.6] text-[#5C5C5C]">{data.description}</p>
          )}
          {meta.length > 0 && (
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-[#8A8A8A]">
              {meta.map((item, i) => (
                <span key={`${item}-${i}`} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#D4D4D4]" />}
                  <span className="text-[#5C5C5C]">{item}</span>
                </span>
              ))}
            </p>
          )}
        </header>

        {/* COVER */}
        {data.image && (
          <div className="mx-auto mt-12 max-w-[720px] overflow-hidden rounded-[20px] border border-[#E6E6E6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image} alt={data.title} className="block h-auto w-full" />
          </div>
        )}

        {/* MARKDOWN */}
        <article className="mt-12">
          <ArticleBody content={content} />
        </article>

        {/* FOOTER */}
        <div className="mx-auto mt-16 max-w-[720px] border-t border-[#E6E6E6] pt-6">
          <Link href="/guides" className={backLink}>
            <span aria-hidden="true" className="mr-2">&larr;</span>
            Explore more guides
          </Link>
        </div>
      </div>
    </main>
  );
}
