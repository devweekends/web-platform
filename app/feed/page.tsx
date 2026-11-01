import type { Metadata } from "next"

import { Button, Eyebrow, container } from "@/components/site/page-kit"
import { getFeedPosts } from "@/lib/linkedin-feed"
import { FEED_TOPICS, OFFICIAL_HANDLES } from "@/lib/linkedin-feed-shared"
import { withSocial } from "@/lib/seo"
import { FeedWall } from "./feed-wall"
import { LinkedInLogo } from "./linkedin-logo"
import { SubmitPostForm } from "./submit-post-form"
import { card, focus, text } from "./ui"

// Posts change when the daily collector runs or an admin approves one; both also revalidate on demand
export const revalidate = 3600

export const metadata: Metadata = withSocial({
  alternates: { canonical: "/feed" },
  title: "Community Feed",
  description:
    "Milestones, builds and breakthroughs shared by the Dev Weekends community on LinkedIn with #DevWeekends.",
})

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "UTC" })

const steps = [
  "Post about your Dev Weekends journey on LinkedIn",
  "Add #DevWeekends so search can find it",
  "Paste the link above for a quick review",
]

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

export default async function FeedPage() {
  const posts = await getFeedPosts()
  const memberPosts = posts.filter((post) => !OFFICIAL_HANDLES.has(post.handle))
  const members = new Set(memberPosts.map((post) => post.handle)).size
  const years = new Set(posts.map((post) => post.postedAt?.slice(0, 4)).filter(Boolean)).size
  const recentMembers = [...new Map(memberPosts.map((post) => [post.handle, post.author])).values()].slice(0, 5)
  const latest = memberPosts[0]

  const stats = [
    { value: posts.length, label: "Posts" },
    { value: members, label: "Members" },
    { value: years, label: years === 1 ? "Year" : "Years" },
  ]

  const aside = (
    <>
      <SubmitPostForm />
      <div className={`${card} p-6`}>
        <p className={text.title}>How to get featured</p>
        <ol className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F7F7F7] text-[13px] font-semibold tabular-nums text-[#404040]"
              >
                {index + 1}
              </span>
              <span className={text.body}>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  )

  return (
    <>
      <section className="border-b border-[#E6E6E6] bg-white">
        <div className={`${container} grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16`}>
          <div>
            <Eyebrow>Community feed</Eyebrow>
            <h1 className="dw-rise mt-4 max-w-[14ch] text-balance text-[clamp(40px,6vw,72px)] font-semibold leading-[1.02] tracking-[-0.045em]">
              Real people. Real progress.
            </h1>
            <p className="dw-rise-late mt-6 max-w-[52ch] text-pretty text-[19px] leading-[1.6] text-[#404040]">
              Milestones, builds and breakthroughs the Dev Weekends community has shared on LinkedIn with #DevWeekends,
              in one feed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#share"
                className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-7 text-base font-semibold text-white transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] can-hover:bg-[#004182] ${focus}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-white">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                </svg>
                Share your post
              </a>
              <Button href="#feed" variant="secondary">
                Browse the feed
              </Button>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#0A0A0A] p-8 text-white">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-[17px] font-semibold">
                <LinkedInLogo className="h-6 w-6" />
                #DevWeekends
              </span>
              <span className="text-[13px] font-medium text-[#A3A3A3]">On LinkedIn</span>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-2">
                  <dt className="text-[13px] font-medium text-[#A3A3A3]">{stat.label}</dt>
                  <dd className="text-[clamp(32px,4vw,44px)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            {latest && (
              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex -space-x-2" aria-hidden="true">
                  {recentMembers.map((name) => (
                    <span
                      key={name}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#262626] text-[12px] font-semibold ring-2 ring-[#0A0A0A]"
                    >
                      {initials(name)}
                    </span>
                  ))}
                </div>
                <p className="text-[13px] leading-5 text-[#A3A3A3]">
                  Latest from <span className="font-medium text-white">{latest.author}</span>
                  {latest.postedAt && <>, {dateFormat.format(new Date(latest.postedAt))}</>}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="feed" className="scroll-mt-16 bg-[#F7F7F7]">
        <div className={`${container} py-12 md:py-16`}>
          <FeedWall posts={posts} topics={FEED_TOPICS} aside={aside} />
        </div>
      </section>

      <section className="bg-white">
        <p className={`${container} py-8 ${text.label} font-normal`}>
          These are public LinkedIn posts, found through search and shown with LinkedIn&apos;s own embed. Dev Weekends is
          not affiliated with LinkedIn. To remove a post, email info@devweekends.com.
        </p>
      </section>
    </>
  )
}
