"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { ChevronDown, Download, Search } from "lucide-react"

import { OFFICIAL_HANDLES, linkedInEmbedUrl, type FeedPost } from "@/lib/linkedin-feed-shared"
import { LinkedInLogo } from "./linkedin-logo"
import { button, card, field, focus, text } from "./ui"

const PAGE_SIZE = 6

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

/** Native select with the same look as the other fields */
function Select({
  label,
  value,
  onChange,
  options,
  className = "",
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: [string, string][]
  className?: string
}) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={`${field} appearance-none pr-10`}>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C5C5C]"
        aria-hidden="true"
      />
    </label>
  )
}

/** The real LinkedIn post, through LinkedIn's official embed. Loads only when scrolled near. */
function PostEmbed({ post, topicLabel }: { post: FeedPost; topicLabel: string }) {
  return (
    <article className={`${card} overflow-hidden`}>
      <div className="relative h-[640px]">
        {/* Shaped like a LinkedIn post so the layout doesn't jump when the embed loads over it */}
        <div aria-hidden="true" className="absolute inset-0 flex flex-col gap-4 p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7F7] text-[13px] font-semibold text-[#404040]">
              {initials(post.author)}
            </span>
            <span>
              <span className={`block ${text.title}`}>{post.author}</span>
              <span className={`block ${text.label}`}>Loading post from LinkedIn</span>
            </span>
          </div>
          <span className="h-4 w-4/5 rounded-full bg-[#F0F0F0]" />
          <span className="h-4 w-3/5 rounded-full bg-[#F0F0F0]" />
          <span className="flex-1 rounded-xl bg-[#F7F7F7]" />
        </div>
        {/* Long posts scroll inside the card; LinkedIn doesn't expose an embed's height to size it automatically */}
        <iframe
          src={linkedInEmbedUrl(post.id)}
          title={`LinkedIn post by ${post.author}`}
          loading="lazy"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <footer className="flex items-center justify-between gap-4 border-t border-[#E6E6E6] p-4">
        <span className="rounded-full bg-[#F7F7F7] px-3 py-1 text-[13px] font-medium text-[#404040]">{topicLabel}</span>
        <a href={post.url} target="_blank" rel="noopener noreferrer" className={button.secondary}>
          <LinkedInLogo className="h-4 w-4" />
          View on LinkedIn
          <span className="sr-only">(post by {post.author}, opens in a new tab)</span>
        </a>
      </footer>
    </article>
  )
}

export function FeedWall({
  posts,
  topics,
  aside,
}: {
  posts: FeedPost[]
  topics: Record<string, string>
  /** Sidebar: share card and community numbers */
  aside: ReactNode
}) {
  const [query, setQuery] = useState("")
  const [topic, setTopic] = useState("all")
  const [year, setYear] = useState("all")
  const [audience, setAudience] = useState("all")
  const [sort, setSort] = useState("newest")
  const [visible, setVisible] = useState(PAGE_SIZE)
  const sentinel = useRef<HTMLDivElement>(null)

  const years = useMemo(
    () => [...new Set(posts.map((post) => post.postedAt?.slice(0, 4)).filter(Boolean) as string[])].sort().reverse(),
    [posts]
  )

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const post of posts) counts[post.topic] = (counts[post.topic] ?? 0) + 1
    return counts
  }, [posts])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const matches = posts.filter((post) => {
      const official = OFFICIAL_HANDLES.has(post.handle)
      if (audience === "members" && official) return false
      if (audience === "official" && !official) return false
      if (topic !== "all" && post.topic !== topic) return false
      if (year !== "all" && post.postedAt?.slice(0, 4) !== year) return false
      if (!needle) return true
      return [post.author, post.title, post.excerpt, ...post.tags].join(" ").toLowerCase().includes(needle)
    })
    return sort === "newest" ? matches : [...matches].reverse()
  }, [posts, query, topic, year, audience, sort])

  const hasMore = visible < filtered.length

  // Load the next posts as the reader nears the end, like a LinkedIn feed
  useEffect(() => {
    const node = sentinel.current
    if (!node || !hasMore) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible((count) => count + PAGE_SIZE)
      },
      { rootMargin: "1200px 0px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, filtered])

  // Any filter change starts the feed again from the top
  const update = (setter: (value: string) => void) => (value: string) => {
    setter(value)
    setVisible(PAGE_SIZE)
  }

  const reset = () => {
    setQuery("")
    setTopic("all")
    setYear("all")
    setAudience("all")
    setVisible(PAGE_SIZE)
  }

  const shown = filtered.slice(0, visible)
  const topicChips: [string, string, number][] = [
    ["all", "All topics", posts.length],
    ...Object.entries(topics)
      .filter(([value]) => topicCounts[value])
      .map(([value, label]): [string, string, number] => [value, label, topicCounts[value]]),
  ]

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <div className={`${card} p-4`}>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_repeat(3,auto)]">
            <label className="relative block">
              <span className="sr-only">Search posts</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C5C5C]" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => update(setQuery)(event.target.value)}
                placeholder="Search members and topics"
                className={`${field} pl-10`}
              />
            </label>
            <div className="grid grid-cols-2 gap-3 sm:contents">
              <Select
                label="Show posts from"
                className="col-span-2 sm:col-span-1"
                value={audience}
                onChange={update(setAudience)}
                options={[
                  ["all", "Everyone"],
                  ["members", "Members"],
                  ["official", "Official"],
                ]}
              />
              <Select
                label="Year"
                value={year}
                onChange={update(setYear)}
                options={[["all", "All years"], ...years.map((value): [string, string] => [value, value])]}
              />
              <Select
                label="Sort"
                value={sort}
                onChange={update(setSort)}
                options={[
                  ["newest", "Newest"],
                  ["oldest", "Oldest"],
                ]}
              />
            </div>
          </div>

          {/* Wraps on larger screens; swipes sideways on phones without a visible scrollbar */}
          <ul
            aria-label="Topics"
            className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {topicChips.map(([value, label, count]) => (
              <li key={value} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={topic === value}
                  onClick={() => update(setTopic)(value)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[14px] font-medium ${focus} ${
                    topic === value
                      ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                      : "border-[#E6E6E6] bg-white text-[#404040] can-hover:border-[#D4D4D4] can-hover:bg-[#F7F7F7]"
                  }`}
                >
                  {label}
                  <span className="tabular-nums opacity-60">{count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className={`flex items-center gap-2 ${text.label}`} aria-live="polite">
            <LinkedInLogo className="h-4 w-4" />
            <span>
              {filtered.length} {filtered.length === 1 ? "post" : "posts"}
              <span className="hidden sm:inline"> tagged #DevWeekends</span>
            </span>
          </p>
          <a href="/api/feed/export" className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-2 ${text.label} can-hover:text-[#0A0A0A] ${focus}`}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Export CSV
          </a>
        </div>

        {shown.length === 0 ? (
          <div className={`${card} mt-4 flex flex-col items-center gap-4 p-12 text-center`}>
            <p className={text.title}>No posts match those filters.</p>
            <button type="button" onClick={reset} className={button.secondary}>
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="mt-4 space-y-4">
            {shown.map((post) => (
              <li key={post.id}>
                <PostEmbed post={post} topicLabel={topics[post.topic] ?? "Community"} />
              </li>
            ))}
          </ul>
        )}

        {hasMore && (
          <div ref={sentinel} className="mt-8 flex justify-center">
            <button type="button" onClick={() => setVisible((count) => count + PAGE_SIZE)} className={button.secondary}>
              Load more posts
            </button>
          </div>
        )}
      </div>

      <aside className="min-w-0 space-y-4 lg:sticky lg:top-24">{aside}</aside>
    </div>
  )
}
