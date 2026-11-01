"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"

import { FEED_TOPICS, type FeedPost } from "@/lib/linkedin-feed-shared"

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

/**
 * Feed rail: the latest member posts from the /feed wall, under Fellow voices.
 * Each card opens the post on LinkedIn and the last card opens the full wall.
 * Renders nothing until posts load, so the section never shows an empty rail.
 */
export function FeedRail() {
  const rail = useRef<HTMLDivElement>(null)
  const [posts, setPosts] = useState<FeedPost[]>([])

  useEffect(() => {
    fetch("/api/feed/latest")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
  }, [])

  if (posts.length === 0) return null

  const scrollBy = (direction: 1 | -1) => {
    const el = rail.current
    if (!el) return
    el.scrollBy({ left: direction * Math.max(320, el.clientWidth * 0.8), behavior: "smooth" })
  }

  return (
    <div className="mt-16">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-6">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Community feed</p>
          <h3 className="mt-3 text-[clamp(26px,3vw,36px)] font-semibold leading-[1.1] tracking-[-0.03em]">Shared on LinkedIn with #DevWeekends.</h3>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/feed" className="mr-2 inline-flex min-h-11 items-center text-[15px] font-semibold">
            See all posts →
          </Link>
          <button
            type="button"
            aria-label="Previous posts"
            onClick={() => scrollBy(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4D4D4] hover:bg-[#F7F7F7]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next posts"
            onClick={() => scrollBy(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0A0A0A] text-white hover:bg-[#262626]"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={rail}
        tabIndex={0}
        role="region"
        aria-label="Posts from the community feed. Scroll sideways to see more."
        className="hm-scroll mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(24px,calc((100%-1200px)/2+24px))] scroll-px-[max(24px,calc((100%-1200px)/2+24px))] pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]"
      >
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            // relative keeps the absolutely positioned sr-only text inside the rail, so it can't widen the page
            className="relative flex min-h-[260px] w-[320px] shrink-0 snap-start flex-col gap-4 rounded-[20px] border border-[#E6E6E6] p-6 transition-shadow duration-200 hover:shadow-[0_18px_36px_-24px_rgba(0,0,0,0.3)]"
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F7F7] text-[13px] font-semibold text-[#404040]"
              >
                {initials(post.author)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-semibold">{post.author}</span>
                {post.postedAt && <span className="block text-[13px] text-[#5C5C5C]">{dateFormat.format(new Date(post.postedAt))}</span>}
              </span>
            </span>
            <span className="line-clamp-5 text-[15px] leading-[1.6] text-[#262626]">{post.excerpt}</span>
            <span className="mt-auto flex items-center justify-between gap-3 border-t border-[#E6E6E6] pt-4">
              <span className="text-[13px] font-medium text-[#5C5C5C]">{FEED_TOPICS[post.topic] ?? FEED_TOPICS.community}</span>
              <span className="inline-flex items-center gap-1 text-[13px] font-semibold">
                LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </span>
            <span className="sr-only">(post by {post.author}, opens in a new tab)</span>
          </a>
        ))}

        <Link
          href="/feed"
          className="flex min-h-[260px] w-[260px] shrink-0 snap-start flex-col justify-between rounded-[20px] bg-[#0A0A0A] p-7 text-white"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">More</span>
          <span className="text-2xl font-semibold tracking-[-0.02em]">See every post on the community feed</span>
          <span className="text-sm font-semibold">Open the feed →</span>
        </Link>
      </div>
    </div>
  )
}
