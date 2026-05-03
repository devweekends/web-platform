import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const files = fs.readdirSync(blogDir);

  const posts = files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug: file.replace('.md', ''),
      title: data.title,
      date: data.date,
      category: data.category,
      description: data.description || '',
      image: data.image || '/post1.jpg',
    };
  });

 return (
  <div className="min-h-screen bg-white text-black">
    <div className="max-w-4xl mx-auto px-6 py-24">

      {/* HERO */}
      <header className="mb-24">
        <p className="uppercase text-xs tracking-[0.25em] text-gray-400 mb-6">
          Stay updated with our latest happenings and upcoming events
        </p>

        <h1 className="text-6xl md:text-7xl font-serif leading-[1.05] tracking-tight mb-8">
          Weekend Tech Grind|
          <br />
          GSOC| ICPC
          <br />
          Live Engineering Sessions
        </h1>

        <p className="text-gray-600 text-lg leading-8 max-w-2xl">
          Building in public through weekend engineering sessions,
          documenting progress toward{" "}
          <span className="text-black font-medium">ICPC</span>,{" "}
          <span className="text-black font-medium">GSOC</span>, open-source
          contributions, and deep systems learning.
        </p>
      </header>

      {/* POSTS */}
      <div className="space-y-20">

        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gray-400 mb-4">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-serif leading-tight group-hover:opacity-70 transition mb-6">
              {post.title}
            </h2>

            {/* Description */}
            {post.description && (
              <p className="text-gray-700 leading-8 max-w-2xl mb-8 text-lg">
                {post.description}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                #weekend-tech-grind
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                #engineering-session
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                #gsoc-prep
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                #icpc-training
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                #open-source
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                #buildinpublic
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                #systems-thinking
              </span>
            </div>

            {/* Divider */}
            <div className="mt-14 border-b border-gray-200" />

          </Link>
        ))}

      </div>
    </div>
  </div>
);
}