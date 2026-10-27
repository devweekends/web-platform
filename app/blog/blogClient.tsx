"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "./page";
import { formatDate } from "@/components/content/format-date";
import { Eyebrow, PageHero, Section } from "@/components/site/page-kit";

const cardHover =
  "transition duration-200 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]";

function imageClasses(post: Post) {
  const fit = post.imageFit === "contain" ? "object-contain" : "object-cover";
  const positionMap = {
    top: "object-top",
    center: "object-center",
    bottom: "object-bottom",
  } as const;
  const position = positionMap[post.imagePosition ?? "center"];
  return `${fit} ${position}`;
}

function PostImage({ post, priority, sizes }: { post: Post; priority?: boolean; sizes: string }) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden ${
        post.imageFit === "contain" ? "bg-[#0A0A0A]" : "bg-[#F7F7F7]"
      }`}
    >
      <Image
        src={post.image || "/post1.jpg"}
        alt={post.title}
        fill
        priority={priority}
        sizes={sizes}
        className={imageClasses(post)}
      />
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E6E6E6] bg-white ${cardHover} ${focusRing}`}
    >
      <PostImage post={post} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px" />
      <div className="flex flex-1 flex-col p-7">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">
          {[post.category, formatDate(post.date)].filter(Boolean).join(" · ")}
        </p>
        <h2 className="mt-3 text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#0A0A0A]">
          {post.title}
        </h2>
        {post.description && (
          <p className="mt-3 line-clamp-3 text-[15px] leading-[1.65] text-[#5C5C5C]">{post.description}</p>
        )}
        <span className="mt-auto inline-flex min-h-11 items-center pt-5 text-[15px] font-semibold text-[#0A0A0A]">
          Read post
          <span aria-hidden="true" className="ml-2 transition-transform motion-safe:group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group grid overflow-hidden rounded-[28px] bg-[#F7F7F7] md:grid-cols-2 ${cardHover} ${focusRing}`}
    >
      <div
        className={`relative aspect-[16/10] w-full md:aspect-auto md:min-h-[360px] ${
          post.imageFit === "contain" ? "bg-[#0A0A0A]" : "bg-[#E6E6E6]"
        }`}
      >
        <Image
          src={post.image || "/post1.jpg"}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 600px"
          className={imageClasses(post)}
        />
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12">
        <Eyebrow>{["Featured", formatDate(post.date)].filter(Boolean).join(" · ")}</Eyebrow>
        <h2 className="mt-4 text-[clamp(26px,3vw,38px)] font-semibold leading-[1.12] tracking-[-0.035em] text-[#0A0A0A]">
          {post.title}
        </h2>
        {post.description && (
          <p className="mt-5 line-clamp-4 text-[16px] leading-[1.65] text-[#404040]">{post.description}</p>
        )}
        <span className="mt-8 inline-flex min-h-[52px] w-fit items-center rounded-xl bg-[#0A0A0A] px-7 text-base font-semibold text-white transition-colors group-hover:bg-[#262626]">
          Read the post
        </span>
      </div>
    </Link>
  );
}

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeTab, setActiveTab] = useState<"news" | "blog">("news");

  const filteredPosts = useMemo(
    () =>
      posts
        .filter((post) => post.category?.toLowerCase() === activeTab)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    [posts, activeTab]
  );

  const featuredPost = useMemo(
    () => filteredPosts.find((post) => post.featured),
    [filteredPosts]
  );

  const gridPosts = useMemo(
    () => filteredPosts.filter((post) => post.slug !== featuredPost?.slug),
    [filteredPosts, featuredPost]
  );

  const newsCount = useMemo(
    () => posts.filter((p) => p.category?.toLowerCase() === "news").length,
    [posts]
  );

  const blogCount = useMemo(
    () => posts.filter((p) => p.category?.toLowerCase() === "blog").length,
    [posts]
  );

  const tabs = [
    { key: "news", label: `News (${newsCount})` },
    { key: "blog", label: `Blog (${blogCount})` },
  ] as const;

  return (
    <main className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Stay updated"
        title="News & Blog"
        intro="Insights, updates, and deep dives into engineering, open source, and growth."
      />

      <Section className="space-y-10">
        <div role="group" aria-label="Filter posts by category" className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveTab(tab.key)}
                className={`min-h-11 rounded-full border px-5 text-[14px] font-semibold transition-colors ${focusRing} ${
                  active
                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                    : "border-[#D4D4D4] bg-white text-[#404040] hover:bg-[#F7F7F7]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {featuredPost && <FeaturedPost post={featuredPost} />}

        {filteredPosts.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-[#D4D4D4] px-6 py-16 text-center">
            <p className="text-[#5C5C5C]">No posts in this category.</p>
          </div>
        ) : (
          gridPosts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )
        )}
      </Section>
    </main>
  );
}
