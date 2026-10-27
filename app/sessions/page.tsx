"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Calendar, Clock, Search, Users } from "lucide-react"

import { LINKS } from "@/components/home/data"
import { Button, Card, PageHero, Section } from "@/components/site/page-kit"

const WHATSAPP_CHANNEL = "https://whatsapp.com/channel/0029VaEDHjV3rZZYUHRj2B1S"

type Session = {
  _id?: string
  name?: string
  description?: string
  category?: string
  date?: string
  time?: string
  speaker?: string
}

function getCategoryValue(sessionCategory?: string) {
  const category = (sessionCategory ?? "").toLowerCase()
  switch (category) {
    case "ai/ml":
    case "ai":
    case "ml":
      return "ai"
    case "cp & dsa":
      return "cp"
    case "remote job":
      return "remote"
    case "open source":
      return "opensource"
    default:
      return category
  }
}

const categoryLabels: Record<string, string> = {
  web: "Web development",
  devops: "DevOps",
  cloud: "Cloud computing",
  ai: "Machine learning and AI",
  cp: "CP and DSA",
  remote: "Remote job",
  opensource: "Open source",
}

function categoryLabel(value: string) {
  return categoryLabels[value] ?? value.charAt(0).toUpperCase() + value.slice(1)
}

const inputClass =
  "min-h-11 w-full rounded-xl border border-[#D4D4D4] bg-white px-4 text-base text-[#0A0A0A] placeholder:text-[#8A8A8A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [search, setSearch] = useState("")
  const [topic, setTopic] = useState("all")

  const load = useCallback(async () => {
    setLoading(true)
    setFailed(false)
    try {
      const res = await fetch("/api/sessions")
      if (!res.ok) throw new Error(`Sessions request failed with ${res.status}`)
      const data = await res.json()
      setSessions(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Could not load sessions:", error)
      setSessions([])
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const topics = useMemo(
    () => Array.from(new Set(sessions.map((s) => getCategoryValue(s.category)))).filter(Boolean),
    [sessions],
  )

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase()
    return sessions.filter((s) => {
      if (topic !== "all" && getCategoryValue(s.category) !== topic) return false
      if (!query) return true
      return [s.name, s.description, s.speaker].some((field) => (field ?? "").toLowerCase().includes(query))
    })
  }, [sessions, search, topic])

  const chip = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A] ${
      active ? "border-[#0A0A0A] bg-[#0A0A0A] text-white" : "border-[#D4D4D4] bg-white text-[#404040] hover:bg-[#F7F7F7]"
    }`

  return (
    <main>
      <PageHero
        eyebrow="Sessions"
        title="Upcoming sessions."
        intro="Public sessions led by industry experts. Search by name, topic or speaker. Join links are shared on our WhatsApp channel, and recordings are published on YouTube."
        actions={
          <>
            <Button href={WHATSAPP_CHANNEL}>Join the WhatsApp channel</Button>
            <Button href={LINKS.youtube} variant="secondary">
              Watch on YouTube
            </Button>
          </>
        }
      />

      <Section tone="gray">
        <div className="max-w-[420px]">
          <label htmlFor="session-search" className="sr-only">
            Search sessions
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8A8A]" aria-hidden="true" />
            <input
              id="session-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sessions"
              className={`${inputClass} pl-11`}
            />
          </div>
        </div>

        {topics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            <button type="button" aria-pressed={topic === "all"} onClick={() => setTopic("all")} className={chip(topic === "all")}>
              All sessions
            </button>
            {topics.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={topic === value}
                onClick={() => setTopic(value)}
                className={chip(topic === value)}
              >
                {categoryLabel(value)}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="motion-safe:animate-pulse">
                <div className="h-3 w-20 rounded bg-[#E6E6E6]" />
                <div className="mt-4 h-6 w-3/4 rounded bg-[#E6E6E6]" />
                <div className="mt-3 h-4 w-full rounded bg-[#E6E6E6]" />
                <div className="mt-6 h-4 w-1/2 rounded bg-[#E6E6E6]" />
                <div className="mt-2 h-4 w-1/3 rounded bg-[#E6E6E6]" />
              </Card>
            ))
          ) : visible.length === 0 ? (
            <div className="col-span-full rounded-[20px] border border-[#E6E6E6] bg-white p-8 text-center sm:p-12">
              <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
                {failed
                  ? "Sessions could not be loaded"
                  : sessions.length === 0
                    ? "No upcoming sessions right now"
                    : "No sessions match your search"}
              </h2>
              <p className="mx-auto mt-3 max-w-[48ch] text-[15px] leading-[1.6] text-[#5C5C5C]">
                {failed
                  ? "Something went wrong on our side. Try again in a moment."
                  : sessions.length === 0
                    ? "New sessions are announced on our WhatsApp channel, and past sessions are on YouTube."
                    : "Try a different search or topic."}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {failed ? (
                  <button
                    type="button"
                    onClick={load}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#0A0A0A] px-7 text-base font-semibold text-white transition-colors hover:bg-[#262626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
                  >
                    Try again
                  </button>
                ) : sessions.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("")
                      setTopic("all")
                    }}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[#D4D4D4] px-7 text-base font-semibold text-[#0A0A0A] transition-colors hover:bg-[#F7F7F7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
                  >
                    Clear filters
                  </button>
                ) : (
                  <Button href={WHATSAPP_CHANNEL}>Join the WhatsApp channel</Button>
                )}
              </div>
            </div>
          ) : (
            visible.map((session, idx) => (
              <Card key={session._id || idx} className="h-full motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)]">
                {session.category && (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">{session.category}</p>
                )}
                <h2 className="mt-3 line-clamp-2 text-[22px] font-semibold leading-tight tracking-[-0.02em]">{session.name}</h2>
                {session.description && (
                  <p className="mt-3 line-clamp-3 text-[15px] leading-[1.6] text-[#5C5C5C]">{session.description}</p>
                )}
                <dl className="mt-auto space-y-2 pt-6 text-sm text-[#404040]">
                  {session.date && (
                    <div className="flex items-center gap-2.5">
                      <dt className="sr-only">Date</dt>
                      <Calendar className="h-4 w-4 shrink-0 text-[#5C5C5C]" aria-hidden="true" />
                      <dd>{session.date}</dd>
                    </div>
                  )}
                  {session.time && (
                    <div className="flex items-center gap-2.5">
                      <dt className="sr-only">Time</dt>
                      <Clock className="h-4 w-4 shrink-0 text-[#5C5C5C]" aria-hidden="true" />
                      <dd>{session.time}</dd>
                    </div>
                  )}
                  {session.speaker && (
                    <div className="flex items-center gap-2.5 font-semibold text-[#0A0A0A]">
                      <dt className="sr-only">Speaker</dt>
                      <Users className="h-4 w-4 shrink-0 text-[#5C5C5C]" aria-hidden="true" />
                      <dd>{session.speaker}</dd>
                    </div>
                  )}
                </dl>
              </Card>
            ))
          )}
        </div>
      </Section>
    </main>
  )
}
