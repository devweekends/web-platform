"use client"

import React, { useEffect, useState, useCallback } from "react"
import { ZoomIn, ZoomOut, Maximize2, RefreshCw, Target, Network, Table, ChevronDown, ChevronUp } from "lucide-react"
import dynamic from "next/dynamic"

import { PageHero, Section } from "@/components/site/page-kit"

const spinner = "h-10 w-10 animate-spin rounded-full border-4 border-[#E6E6E6] border-t-[#0A0A0A]"

// Import MentorshipGraph component dynamically with SSR disabled
const MentorshipGraph = dynamic(() => import("@/components/MentorshipGraph"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className={spinner} />
        <p className="text-[#5C5C5C]">Loading graph visualization...</p>
      </div>
    </div>
  )
})

interface Tag {
  _id: string
  name: string
  description?: string
  color: string
}

interface Mentor {
  _id: string
  name: string
  picture?: string
  university?: string
  email: string
  phone?: string
  linkedin?: string
  github?: string
  leetcode?: string
  tags?: Tag[]
}

interface Mentee {
  _id: string
  name: string
  picture?: string
  university?: string
  email?: string
  phone?: string
  linkedin?: string
  github?: string
  leetcode?: string
  mentor?: string | { _id: string; name: string; university?: string; picture?: string }
  tags?: Tag[]
}

const VIEW_OPTIONS = [
  { key: "spider", label: "Spider Web", icon: Network },
  { key: "table", label: "Table", icon: Table },
]

const iconButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4D4D4] bg-white text-[#0A0A0A] transition-colors hover:bg-[#F7F7F7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"

const th = "px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C] sm:px-6"

/** Small tags: neutral pill with a dot in the tag's own color, so the color stays meaningful. */
function TagPills({ tags, max }: { tags?: Tag[]; max: number }) {
  if (!tags || tags.length === 0) return <span className="text-xs text-[#8A8A8A]">No tags</span>
  return (
    <>
      {tags.slice(0, max).map((tag) => (
        <span
          key={tag._id}
          title={tag.description}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F7F7] px-2.5 py-1 text-xs font-medium text-[#404040]"
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tag.color }} aria-hidden="true" />
          {tag.name}
        </span>
      ))}
      {tags.length > max && <span className="text-xs text-[#5C5C5C]">+{tags.length - max}</span>}
    </>
  )
}

const socialLink =
  "inline-flex h-11 w-9 items-center justify-center text-[#5C5C5C] transition-colors hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"

function SocialLinks({ person }: { person: { linkedin?: string; github?: string; leetcode?: string; name: string } }) {
  return (
    <div className="flex">
      {person.linkedin && (
        <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className={socialLink} title="LinkedIn" aria-label={`${person.name} on LinkedIn`}>
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      )}
      {person.github && (
        <a href={person.github} target="_blank" rel="noopener noreferrer" className={socialLink} title="GitHub" aria-label={`${person.name} on GitHub`}>
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
            />
          </svg>
        </a>
      )}
      {person.leetcode && (
        <a href={person.leetcode} target="_blank" rel="noopener noreferrer" className={socialLink} title="LeetCode" aria-label={`${person.name} on LeetCode`}>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744 1.31 0 2.315-.925 2.315-2.301 0-.688-.28-1.357-.783-1.85l-3.137-3.082c-1.576-1.576-3.709-2.392-5.85-2.392-2.142 0-4.275.816-5.851 2.392l-4.872 4.914c-1.561 1.576-2.392 3.709-2.392 5.851s.83 4.276 2.392 5.851l4.886 4.914c1.576 1.576 3.709 2.392 5.851 2.392s4.275-.816 5.851-2.392l3.137-3.082c.516-.503.783-1.173.783-1.845 0-1.123-.728-2.301-2.198-2.301-.604 0-1.201.227-1.715.741z" />
          </svg>
        </a>
      )}
    </div>
  )
}

function Avatar({ src, name, size }: { src?: string; name: string; size: "sm" | "md" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || "/avatar.svg"}
      alt={name}
      className={`${size === "md" ? "h-9 w-9" : "h-6 w-6"} flex-shrink-0 rounded-full bg-[#F7F7F7] object-cover`}
    />
  )
}

function TableView({ mentors, mentees }: { mentors: Mentor[], mentees: Mentee[] }) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <div className="space-y-10 p-4 sm:p-6">
      {/* Mentors Table */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold tracking-[-0.02em]">Mentors ({mentors.length})</h2>
        <div className="overflow-x-auto rounded-[20px] border border-[#E6E6E6]">
          <table className="min-w-full divide-y divide-[#E6E6E6]">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th scope="col" className={`${th} min-w-[170px]`}>Name</th>
                <th scope="col" className={`${th} min-w-[120px]`}>University</th>
                <th scope="col" className={`${th} min-w-[120px]`}>Tags</th>
                <th scope="col" className={`${th} min-w-[100px]`}>Social</th>
                <th scope="col" className={`${th} min-w-[100px]`}>Mentees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E6E6] bg-white">
              {mentors.map((mentor) => {
                const mentorMentees = mentees.filter((m) =>
                  typeof m.mentor === "object"
                    ? m.mentor._id?.toString() === mentor._id.toString()
                    : m.mentor?.toString() === mentor._id.toString(),
                )

                return (
                  <React.Fragment key={mentor._id}>
                    <tr className="transition-colors hover:bg-[#F7F7F7]">
                      <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                        <div className="flex items-center gap-3">
                          <Avatar src={mentor.picture} name={mentor.name} size="md" />
                          <span className="text-[15px] font-semibold">{mentor.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#5C5C5C] sm:px-6">
                        <div className="max-w-[150px] truncate" title={mentor.university}>
                          {mentor.university || "-"}
                        </div>
                      </td>
                      <td className="px-4 py-3 sm:px-6">
                        <div className="flex max-w-[220px] flex-wrap gap-1">
                          <TagPills tags={mentor.tags} max={3} />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-1 sm:px-6">
                        <SocialLinks person={mentor} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-1 sm:px-6">
                        {mentorMentees.length > 0 ? (
                          <button
                            type="button"
                            onClick={() => toggleRow(mentor._id.toString())}
                            aria-expanded={expandedRows.has(mentor._id.toString())}
                            className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#0A0A0A] underline-offset-4 hover:underline"
                          >
                            {expandedRows.has(mentor._id.toString()) ? (
                              <>
                                <span>Hide</span> <ChevronUp size={16} aria-hidden="true" />
                              </>
                            ) : (
                              <>
                                <span>View</span> ({mentorMentees.length}) <ChevronDown size={16} aria-hidden="true" />
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-sm text-[#8A8A8A]">None</span>
                        )}
                      </td>
                    </tr>
                    {expandedRows.has(mentor._id.toString()) && mentorMentees.length > 0 && (
                      <tr className="bg-[#F7F7F7]">
                        <td colSpan={5} className="px-4 py-4 sm:px-6">
                          <h3 className="mb-3 text-sm font-semibold">Mentees</h3>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {mentorMentees.map((mentee) => (
                              <div key={mentee._id.toString()} className="flex flex-col gap-2 rounded-xl bg-white p-3">
                                <div className="flex items-center gap-3">
                                  <Avatar src={mentee.picture} name={mentee.name} size="md" />
                                  <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold">{mentee.name}</div>
                                    <div className="truncate text-xs text-[#5C5C5C]">{mentee.university || "No university"}</div>
                                  </div>
                                </div>
                                {mentee.tags && mentee.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    <TagPills tags={mentee.tags} max={2} />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mentees Table */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold tracking-[-0.02em]">Mentees ({mentees.length})</h2>
        <div className="overflow-x-auto rounded-[20px] border border-[#E6E6E6]">
          <table className="min-w-full divide-y divide-[#E6E6E6]">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th scope="col" className={`${th} min-w-[170px]`}>Name</th>
                <th scope="col" className={`${th} min-w-[120px]`}>University</th>
                <th scope="col" className={`${th} min-w-[120px]`}>Tags</th>
                <th scope="col" className={`${th} min-w-[100px]`}>Social</th>
                <th scope="col" className={`${th} min-w-[140px]`}>Mentor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E6E6] bg-white">
              {mentees.map((mentee) => {
                // Find mentor info
                const mentorInfo =
                  typeof mentee.mentor === "object" && mentee.mentor && mentee.mentor._id
                    ? mentee.mentor
                    : mentors.find((m) => m._id.toString() === mentee.mentor?.toString())

                return (
                  <tr key={mentee._id.toString()} className="transition-colors hover:bg-[#F7F7F7]">
                    <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                      <div className="flex items-center gap-3">
                        <Avatar src={mentee.picture} name={mentee.name} size="md" />
                        <span className="text-[15px] font-semibold">{mentee.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#5C5C5C] sm:px-6">
                      <div className="max-w-[150px] truncate" title={mentee.university}>
                        {mentee.university || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-6">
                      <div className="flex max-w-[220px] flex-wrap gap-1">
                        <TagPills tags={mentee.tags} max={3} />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-1 sm:px-6">
                      <SocialLinks person={mentee} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                      {mentorInfo ? (
                        <div className="flex items-center gap-2">
                          <Avatar src={mentorInfo.picture} name={mentorInfo.name} size="sm" />
                          <span className="truncate text-sm">{mentorInfo.name}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-[#8A8A8A]">No mentor</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function MentorshipPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [mentees, setMentees] = useState<Mentee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState("spider")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hasNewData, setHasNewData] = useState(false)

  const fetchData = useCallback(async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true)
    if (!showRefreshIndicator) setLoading(true)
    setError(null)

    try {
      // Add cache-busting for real-time updates
      const timestamp = Date.now()
      const res = await fetch(`/api/mentorship?t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })

      if (!res.ok) throw new Error("Failed to fetch mentorship data")

      const { mentors: newMentors, mentees: newMentees } = await res.json()

      // Check if data actually changed to avoid unnecessary re-renders
      const dataChanged = JSON.stringify(mentors) !== JSON.stringify(newMentors) ||
                         JSON.stringify(mentees) !== JSON.stringify(newMentees)

      if (dataChanged || !lastUpdated) {
        setMentors(Array.isArray(newMentors) ? newMentors : [])
        setMentees(Array.isArray(newMentees) ? newMentees : [])
        setLastUpdated(new Date())

        // Show "new data" indicator if this was a background refresh
        if (showRefreshIndicator && dataChanged) {
          setHasNewData(true)
          setTimeout(() => setHasNewData(false), 3000)
        }
      }
    } catch (error) {
      setError("Failed to load mentorship data.")
      console.error(error)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }, [mentors, mentees, lastUpdated])

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Listen for admin updates via localStorage or window events (but don't auto-refresh)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'tags-updated') {
        // Just show notification, don't auto-refresh
        setHasNewData(true)
        setTimeout(() => setHasNewData(false), 5000)
      }

      // Listen for any mentorship data updates (mentor/mentee changes)
      if (e.key === 'mentorship-data-updated') {
        // Just show notification, don't auto-refresh
        setHasNewData(true)
        setTimeout(() => setHasNewData(false), 5000)
      }
    }

    const handleTagUpdate = () => {
      // Just show notification, don't auto-refresh
      setHasNewData(true)
      setTimeout(() => setHasNewData(false), 5000)
    }

    const handleDataUpdate = () => {
      // Just show notification, don't auto-refresh
      setHasNewData(true)
      setTimeout(() => setHasNewData(false), 5000)
    }

    // Listen for storage events (cross-tab communication)
    window.addEventListener('storage', handleStorageChange)

    // Listen for custom events
    window.addEventListener('tags-updated', handleTagUpdate)
    window.addEventListener('mentorship-data-updated', handleDataUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('tags-updated', handleTagUpdate)
      window.removeEventListener('mentorship-data-updated', handleDataUpdate)
    }
  }, [])

  // Manual refresh function with improved UX
  const handleManualRefresh = async () => {
    if (isRefreshing) return // Prevent multiple simultaneous refreshes

    setIsRefreshing(true)
    setError(null)
    setHasNewData(false)

    try {
      // Add cache-busting for real-time updates
      const timestamp = Date.now()
      const res = await fetch(`/api/mentorship?t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })

      if (!res.ok) throw new Error("Failed to fetch mentorship data")

      const { mentors: newMentors, mentees: newMentees } = await res.json()

      // Check if data actually changed
      const dataChanged = JSON.stringify(mentors) !== JSON.stringify(newMentors) ||
                         JSON.stringify(mentees) !== JSON.stringify(newMentees)

      setMentors(Array.isArray(newMentors) ? newMentors : [])
      setMentees(Array.isArray(newMentees) ? newMentees : [])
      setLastUpdated(new Date())

      if (dataChanged) {
        // Show brief success indication
        setHasNewData(true)
        setTimeout(() => setHasNewData(false), 2000)
      }
    } catch (error) {
      setError("Failed to refresh mentorship data.")
      console.error(error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Graph controls (zoom, pan, fit, reset)
  const handleGraphControl = (action: string) => {
    const event = new CustomEvent("mentorship-graph-control", { detail: { action } })
    window.dispatchEvent(event)
  }

  const graphControls = [
    { action: "zoomIn", title: "Zoom in", icon: ZoomIn },
    { action: "zoomOut", title: "Zoom out", icon: ZoomOut },
    { action: "center", title: "Center", icon: Target },
    { action: "fit", title: "Fit", icon: Maximize2 },
    { action: "reset", title: "Reset", icon: RefreshCw },
  ]

  const renderView = () => {
    if (loading) {
      return (
        <div className="flex h-full items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4" role="status">
            <div className={spinner} />
            <p className="text-[#5C5C5C]">Loading data...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex h-full items-center justify-center py-20">
          <div className="max-w-md p-6 text-center" role="alert">
            <h2 className="mb-2 text-xl font-semibold">Error loading data</h2>
            <p className="mb-5 text-[#5C5C5C]">{error}</p>
            <button
              type="button"
              onClick={() => fetchData()}
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#0A0A0A] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-[#262626]"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    switch (view) {
      case "spider":
        return (
          <div className="relative h-[calc(100vh-12rem)] min-h-[420px] w-full">
            <div className="absolute left-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2">
              {graphControls.map(({ action, title, icon: Icon }) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => handleGraphControl(action)}
                  className={`${iconButton} shadow-md`}
                  title={title}
                  aria-label={title}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </button>
              ))}
            </div>
            <MentorshipGraph
              mentors={mentors}
              mentees={mentees}
              isAdmin={false}
              useImages={true}
              nodeSpacing={150}
              view={view}
              autoFit={true}
            />
          </div>
        )
      case "table":
        return <TableView mentors={mentors} mentees={mentees} />
      default:
        return null
    }
  }

  return (
    <div className="bg-white text-[#0A0A0A]">
      <PageHero eyebrow="Mentorship" title="Mentorship network" />

      <Section className="!pt-10 md:!pt-12">
        {/* Update notifications */}
        <div aria-live="polite">
          {hasNewData && (
            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-[#D4D4D4] bg-[#F7F7F7] px-4 py-3 text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#0A0A0A]" aria-hidden="true" />
              <span>New updates available! Click refresh to see the latest changes.</span>
              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className="inline-flex min-h-11 items-center rounded-lg bg-[#0A0A0A] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#262626] disabled:opacity-50"
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh now'}
              </button>
            </div>
          )}
          {isRefreshing && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-[#E6E6E6] bg-white px-4 py-3 text-sm text-[#5C5C5C]">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0A0A0A] border-t-transparent" />
              <span>Refreshing data...</span>
            </div>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-h-11 items-center gap-2 text-sm text-[#5C5C5C]">
            {lastUpdated && (
              <>
                <span className="whitespace-nowrap">Last updated: {lastUpdated.toLocaleTimeString()}</span>
                <button
                  type="button"
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                  className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-[#F7F7F7] disabled:opacity-50"
                  title="Refresh now"
                  aria-label="Refresh data"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          <div role="group" aria-label="View" className="inline-flex self-start overflow-hidden rounded-xl border border-[#D4D4D4] bg-white lg:self-auto">
            {VIEW_OPTIONS.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setView(option.key)}
                  aria-pressed={view === option.key}
                  className={`flex min-h-11 min-w-[110px] items-center justify-center gap-2 px-4 text-sm font-semibold transition-colors ${
                    view === option.key ? "bg-[#0A0A0A] text-white" : "text-[#0A0A0A] hover:bg-[#F7F7F7]"
                  }`}
                  title={option.label}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>{option.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-[#E6E6E6] bg-white">{renderView()}</div>
      </Section>
    </div>
  )
}
