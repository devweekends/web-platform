import fs from "fs"
import path from "path"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import Link from "next/link"

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "blog",
    `${params.slug}.md`
  )

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
    )
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/blog" className="text-sm text-gray-500">
        ← Back
      </Link>

      {/* HEADER */}
      <header className="mt-10 mb-10">
        <p className="text-xs uppercase text-gray-500 mb-3">
          {data.category}
        </p>

        <h1 className="text-5xl font-serif mb-4">
          {data.title}
        </h1>

        <p className="text-gray-500 text-sm">
          {data.date}
        </p>
      </header>

      {/* COVER IMAGE */}
      {data.image && (
        <div className="relative w-full h-[400px] mb-12">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}

      {/* MARKDOWN RENDERER */}
      <article className="mx-auto max-w-3xl px-4 py-6">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold mt-10 mb-6">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mt-10 mb-4">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mt-6 mb-3">
                {children}
              </h3>
            ),

            p: ({ children }) => (
              <p className="text-gray-700 leading-7 mb-5">
                {children}
              </p>
            ),

            ul: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
                {children}
              </ul>
            ),

            li: ({ children }) => <li>{children}</li>,

            img: ({ src, alt }) => (
              <img
                src={src || ""}
                alt={alt || ""}
                className="my-10 w-full rounded-2xl shadow-lg border"
              />
            ),

            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6">
                {children}
              </blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  )
}