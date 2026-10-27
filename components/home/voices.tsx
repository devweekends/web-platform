"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Play } from "lucide-react"

import { getVideoEmbed } from "@/lib/video-url"
import { byStoryRank } from "@/lib/story-order"
import { LINKS, videoStories, voices } from "./data"

type LiveVideo = { name: string; role: string; url: string; previewUrl?: string }

/**
 * Stories rail: video stories, loaded from the same approved stories as the
 * stories page, merged with the videos listed in data.ts and ordered by
 * lib/story-order.ts (LFX, then GSoC, then senior engineers, then the rest).
 * Written quotes only fill in when there are too few videos. It does not move
 * by itself: people scroll it with the arrows, a swipe or the trackpad.
 */
export function VoicesRail() {
  const rail = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState<string | null>(null)
  const [live, setLive] = useState<LiveVideo[]>([])

  useEffect(() => {
    fetch("/api/stories/videos")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setLive(Array.isArray(data) ? data : []))
      .catch(() => setLive([]))
  }, [])

  const seen = new Set<string>()
  const listed: { name: string; role: string; url: string | null; previewUrl?: string }[] = [...videoStories, ...live]
  const videos = byStoryRank(listed).flatMap((story) => {
    const embed = getVideoEmbed(story.url ?? undefined)
    if (!embed || seen.has(embed.embedUrl)) return []
    seen.add(embed.embedUrl)
    const preview = story.previewUrl ?? embed.thumbnailUrl
    return [{ name: story.name, role: story.role, embed, preview }]
  })
  const quotes = videos.length < 3 ? voices : []

  const scrollBy = (direction: 1 | -1) => {
    const el = rail.current
    if (!el) return
    el.scrollBy({ left: direction * Math.max(320, el.clientWidth * 0.8), behavior: "smooth" })
  }

  return (
    <div>
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-6">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Fellow voices</p>
          <h2 className="mt-3.5 text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em]">What they say about us.</h2>
          <p className="mt-4 max-w-[42ch] text-[17px] leading-[1.6] text-[#5C5C5C]">Most started with no network and no resume worth reading. Here is the receipt.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={LINKS.stories} className="mr-2 inline-flex min-h-11 items-center text-[15px] font-semibold">
            See all stories →
          </Link>
          <button
            type="button"
            aria-label="Previous stories"
            onClick={() => scrollBy(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4D4D4] hover:bg-[#F7F7F7]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next stories"
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
        aria-label="Stories from our community. Scroll sideways to see more."
        className="hm-scroll mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(24px,calc((100%-1200px)/2+24px))] scroll-px-[max(24px,calc((100%-1200px)/2+24px))] pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]"
      >
        {videos.map((video) => (
          <article key={video.embed.embedUrl} className="w-[360px] shrink-0 snap-start overflow-hidden rounded-[20px] border border-[#E6E6E6]">
            <div className="relative aspect-video bg-[#0A0A0A]">
              {playing === video.embed.embedUrl ? (
                <iframe
                  src={video.embed.embedUrl}
                  title={`${video.name}: video story`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(video.embed.embedUrl)}
                  aria-label={`Play video: ${video.name}`}
                  className="group absolute inset-0 flex items-center justify-center"
                >
                  {video.preview && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={video.preview}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  )}
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0A0A0A] shadow-lg">
                    <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                  </span>
                </button>
              )}
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Video</p>
              <p className="mt-1.5 text-[17px] font-semibold tracking-[-0.01em]">{video.name}</p>
              <p className="mt-0.5 text-sm text-[#5C5C5C]">{video.role}</p>
            </div>
          </article>
        ))}

        {quotes.map((voice) => (
          <article key={voice.name} className="flex min-h-[320px] w-[360px] shrink-0 snap-start flex-col rounded-[20px] border border-[#E6E6E6] p-7 transition-shadow duration-200 hover:shadow-[0_18px_36px_-24px_rgba(0,0,0,0.3)]">
            <p className="text-[17px] leading-[1.6] text-[#262626]">&ldquo;{voice.quote}&rdquo;</p>
            <div className="mt-auto border-t border-[#E6E6E6] pt-[18px]">
              <p className="text-[15px] font-semibold">{voice.name}</p>
              <p className="mt-0.5 text-[13px] text-[#5C5C5C]">{voice.role}</p>
            </div>
          </article>
        ))}

        <Link
          href={LINKS.stories}
          className="flex min-h-[320px] w-[260px] shrink-0 snap-start flex-col justify-between rounded-[20px] bg-[#0A0A0A] p-7 text-white"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">More</span>
          <span className="text-2xl font-semibold tracking-[-0.02em]">See all stories and videos</span>
          <span className="text-sm font-semibold">Open the stories page →</span>
        </Link>
      </div>
    </div>
  )
}
