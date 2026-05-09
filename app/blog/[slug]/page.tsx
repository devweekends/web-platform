import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-3">Post not found</h1>
          <Link href="/blog" className="underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/blog" className="text-sm text-gray-500 hover:text-black">
        ← Back
      </Link>

      {/* HEADER */}
      <header className="mt-10 mb-14 max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
          {data.category}
        </p>

        <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
          {data.title}
        </h1>

        <p className="text-gray-500 text-sm">{data.date}</p>
      </header>

      {/* COVER IMAGE */}
      {data.image && (
        (() => {
          const fit: "cover" | "contain" =
            data.imageFit ?? (slug === "gsoc" ? "contain" : "cover");
          const aspect = fit === "contain" ? "aspect-[4/5]" : "aspect-[16/9]";
          const fitClass =
            fit === "contain" ? "object-contain" : "object-cover object-center";
          return (
            <div className="relative w-full mb-16 overflow-hidden rounded-2xl bg-neutral-950">
              <div className={`relative ${aspect} w-full mx-auto max-w-3xl`}>
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className={`transition duration-700 hover:scale-105 ${fitClass}`}
                />
              </div>
            </div>
          );
        })()
      )}
      {/* MARKDOWN */}
      <article className="mx-auto max-w-2xl">
        <div className="prose prose-lg prose-neutral max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p({ node, children }) {
                const hasImg = node?.children?.some(
                  (child: any) => child.tagName === "img"
                );

                if (hasImg) {
                  return <div className="my-12">{children}</div>;
                }

                return (
                  <p className="text-gray-800 leading-[1.85] my-6 text-[1.075rem]">
                    {children}
                  </p>
                );
              },

              img({ src = "", alt = "" }) {
                return (
                  <span className="block my-14">
                    <Image
                      src={src}
                      alt={alt}
                      width={1600}
                      height={2000}
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="rounded-xl w-full h-auto"
                    />
                  </span>
                );
              },

              h1: ({ children }) => (
                <h1 className="text-4xl md:text-5xl font-serif tracking-tight mt-16 mb-8 text-black">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="text-3xl font-serif tracking-tight mt-20 mb-6 text-black">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="text-xl font-serif font-semibold mt-12 mb-3 text-black">
                  {children}
                </h3>
              ),

              ul: ({ children }) => (
                <ul className="my-6 space-y-2 list-disc pl-6 text-gray-800 leading-[1.75]">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="my-6 space-y-2 list-decimal pl-6 text-gray-800 leading-[1.75]">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="pl-1">{children}</li>
              ),

              blockquote: ({ children }) => (
                <blockquote className="my-8 border-l-2 border-black pl-6 italic text-gray-700">
                  {children}
                </blockquote>
              ),

              hr: () => (
                <hr className="my-16 border-0 h-px bg-gray-200" />
              ),

              strong: ({ children }) => (
                <strong className="font-semibold text-black">
                  {children}
                </strong>
              ),

              a: ({ href, children }) => (
                <a
                  href={href}
                  className="underline underline-offset-4 decoration-gray-300 text-black hover:decoration-black transition"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}