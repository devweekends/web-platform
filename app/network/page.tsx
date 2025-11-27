"use client"

import React, { useEffect, useState, useCallback } from "react"
import { ZoomIn, ZoomOut, Maximize2, RefreshCw, Target, Network, Table, ChevronDown, ChevronUp, Tag as TagIcon } from "lucide-react"
import dynamic from "next/dynamic"

// Import MentorshipGraph component dynamically with SSR disabled
const MentorshipGraph = dynamic(() => import("@/components/MentorshipGraph"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[500px]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-muted rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-muted-foreground">Loading graph visualization...</p>
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
    <div className="p-4 sm:p-6 space-y-8">
      {/* Mentors Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4 px-2">Mentors ({mentors.length})</h3>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[150px]">
                  Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[120px]">
                  University
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[120px]">
                  Tags
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[100px]">
                  Social
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[100px]">
                  Mentees
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {mentors.map((mentor) => {
                const mentorMentees = mentees.filter((m) =>
                  typeof m.mentor === "object"
                    ? m.mentor._id?.toString() === mentor._id.toString()
                    : m.mentor?.toString() === mentor._id.toString(),
                )

                return (
                  <React.Fragment key={mentor._id}>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={mentor.picture || "/avatar.svg"}
                            alt={mentor.name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                          <span className="ml-3 font-medium text-sm sm:text-base">{mentor.name}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-muted-foreground text-sm">
                        <div className="max-w-[150px] truncate" title={mentor.university}>
                          {mentor.university || "-"}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {mentor.tags && mentor.tags.length > 0 ? (
                            mentor.tags.slice(0, 3).map((tag) => (
                              <span 
                                key={tag._id}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: tag.color }}
                                title={tag.description}
                              >
                                {tag.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">No tags</span>
                          )}
                          {mentor.tags && mentor.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{mentor.tags.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {mentor.linkedin && (
                            <a
                              href={mentor.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/70 hover:text-primary transition-colors"
                              title="LinkedIn"
                            >
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </a>
                          )}
                          {mentor.github && (
                            <a
                              href={mentor.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/70 hover:text-foreground transition-colors"
                              title="GitHub"
                            >
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                                />
                              </svg>
                            </a>
                          )}
                          {mentor.leetcode && (
                            <a
                              href={mentor.leetcode}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/70 hover:text-orange-500 transition-colors"
                              title="LeetCode"
                            >
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744 1.31 0 2.315-.925 2.315-2.301 0-.688-.28-1.357-.783-1.85l-3.137-3.082c-1.576-1.576-3.709-2.392-5.85-2.392-2.142 0-4.275.816-5.851 2.392l-4.872 4.914c-1.561 1.576-2.392 3.709-2.392 5.851s.83 4.276 2.392 5.851l4.886 4.914c1.576 1.576 3.709 2.392 5.851 2.392s4.275-.816 5.851-2.392l3.137-3.082c.516-.503.783-1.173.783-1.845 0-1.123-.728-2.301-2.198-2.301-.604 0-1.201.227-1.715.741z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        {mentorMentees.length > 0 ? (
                          <button
                            onClick={() => toggleRow(mentor._id.toString())}
                            className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm transition-colors"
                          >
                            {expandedRows.has(mentor._id.toString()) ? (
                              <>
                                <span className="hidden sm:inline">Hide</span> <ChevronUp size={16} />
                              </>
                            ) : (
                              <>
                                <span className="hidden sm:inline">View</span> ({mentorMentees.length}) <ChevronDown size={16} />
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </td>
                    </tr>
                    {expandedRows.has(mentor._id.toString()) && mentorMentees.length > 0 && (
                      <tr className="bg-muted/30">
                        <td colSpan={5} className="px-4 sm:px-6 py-4">
                          <div className="pl-2 sm:pl-11">
                            <h4 className="text-sm font-medium mb-3">Mentees</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {mentorMentees.map((mentee) => (
                                <div
                                  key={mentee._id.toString()}
                                  className="flex flex-col gap-2 p-3 border rounded-lg bg-card shadow-sm"
                                >
                                  <div className="flex items-center gap-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={mentee.picture || "/avatar.svg"}
                                      alt={mentee.name}
                                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                      <div className="font-medium text-sm truncate">{mentee.name}</div>
                                      <div className="text-xs text-muted-foreground truncate">
                                        {mentee.university || "No university"}
                                      </div>
                                    </div>
                                  </div>
                                  {mentee.tags && mentee.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {mentee.tags.slice(0, 2).map((tag) => (
                                        <span 
                                          key={tag._id}
                                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                                          style={{ backgroundColor: tag.color }}
                                          title={tag.description}
                                        >
                                          {tag.name}
                                        </span>
                                      ))}
                                      {mentee.tags.length > 2 && (
                                        <span className="text-xs text-muted-foreground">+{mentee.tags.length - 2}</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
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
        <h3 className="text-xl font-semibold mb-4 px-2">Mentees ({mentees.length})</h3>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[150px]">
                  Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[120px]">
                  University
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[120px]">
                  Tags
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[100px]">
                  Social
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[120px]">
                  Mentor
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {mentees.map((mentee) => {
                // Find mentor info
                const mentorInfo =
                  typeof mentee.mentor === "object" && mentee.mentor && mentee.mentor._id
                    ? mentee.mentor
                    : mentors.find((m) => m._id.toString() === mentee.mentor?.toString())

                return (
                  <tr key={mentee._id.toString()} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={mentee.picture || "/avatar.svg"}
                          alt={mentee.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <span className="ml-3 font-medium text-sm sm:text-base">{mentee.name}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-muted-foreground text-sm">
                      <div className="max-w-[150px] truncate" title={mentee.university}>
                        {mentee.university || "-"}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {mentee.tags && mentee.tags.length > 0 ? (
                          mentee.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag._id}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: tag.color }}
                              title={tag.description}
                            >
                              {tag.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">No tags</span>
                        )}
                        {mentee.tags && mentee.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{mentee.tags.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {mentee.linkedin && (
                          <a
                            href={mentee.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/70 hover:text-primary transition-colors"
                            title="LinkedIn"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                        {mentee.github && (
                          <a
                            href={mentee.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/70 hover:text-foreground transition-colors"
                            title="GitHub"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                              />
                            </svg>
                          </a>
                        )}
                        {mentee.leetcode && (
                          <a
                            href={mentee.leetcode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/70 hover:text-orange-500 transition-colors"
                            title="LeetCode"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744 1.31 0 2.315-.925 2.315-2.301 0-.688-.28-1.357-.783-1.85l-3.137-3.082c-1.576-1.576-3.709-2.392-5.85-2.392-2.142 0-4.275.816-5.851 2.392l-4.872 4.914c-1.561 1.576-2.392 3.709-2.392 5.851s.83 4.276 2.392 5.851l4.886 4.914c1.576 1.576 3.709 2.392 5.851 2.392s4.275-.816 5.851-2.392l3.137-3.082c.516-.503.783-1.173.783-1.845 0-1.123-.728-2.301-2.198-2.301-.604 0-1.201.227-1.715.741z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      {mentorInfo ? (
                        <div className="flex items-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={mentorInfo.picture || "/avatar.svg"}
                            alt={mentorInfo.name}
                            className="w-6 h-6 rounded-full object-cover mr-2 flex-shrink-0"
                          />
                          <span className="text-foreground text-sm truncate">{mentorInfo.name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">No mentor</span>
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
        setMentors(newMentors)
        setMentees(newMentees)
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
    
    const handleDataUpdate = (event: Event) => {
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
      
      setMentors(newMentors)
      setMentees(newMentees)
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

  const renderView = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-muted rounded-full"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-full py-20">
          <div className="text-center max-w-md p-6">
            <div className="text-destructive mb-2">⚠️</div>
            <h3 className="text-lg font-medium mb-2">Error Loading Data</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => fetchData()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    switch (view) {
      case "spider":
        return (
          <div className="relative w-full h-[calc(100vh-12rem)]">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
              <button
                onClick={() => handleGraphControl("zoomIn")}
                className="p-2 rounded-md bg-background/90 shadow-lg hover:bg-background transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleGraphControl("zoomOut")}
                className="p-2 rounded-md bg-background/90 shadow-lg hover:bg-background transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleGraphControl("center")}
                className="p-2 rounded-md bg-background/90 shadow-lg hover:bg-background transition-all"
                title="Center"
              >
                <Target className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleGraphControl("fit")}
                className="p-2 rounded-md bg-background/90 shadow-lg hover:bg-background transition-all"
                title="Fit"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleGraphControl("reset")}
                className="p-2 rounded-md bg-background/90 shadow-lg hover:bg-background transition-all"
                title="Reset"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
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
    <div className="container mx-auto py-6">
      {/* Update notifications */}
      {hasNewData && (
        <div className="mb-4 flex items-center justify-center">
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>New updates available! Click refresh to see the latest changes.</span>
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
            </button>
          </div>
        </div>
      )}
      
      {isRefreshing && (
        <div className="mb-4 flex items-center justify-center">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Refreshing data...</span>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h1 className="text-2xl font-semibold">Mentorship Network</h1>
          {lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">Last updated: {lastUpdated.toLocaleTimeString()}</span>
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className="p-1 hover:bg-muted rounded transition-colors flex-shrink-0 disabled:opacity-50"
                title="Refresh now"
                aria-label="Refresh data"
              >
                <RefreshCw 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isRefreshing ? 'animate-spin' : 'hover:rotate-180'
                  }`} 
                />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="inline-flex rounded-md border overflow-hidden bg-background shadow-sm">
            {VIEW_OPTIONS.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.key}
                  onClick={() => setView(option.key)}
                  className={`
                    flex items-center justify-center px-2 sm:px-3 py-2 text-sm font-medium transition-all duration-200
                    min-w-[70px] sm:min-w-[100px]
                    ${view === option.key 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-primary hover:bg-muted hover:text-primary-foreground"
                    }
                  `}
                  title={option.label}
                >
                  <Icon className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">{option.label}</span>
                  <span className="sm:hidden text-xs">{option.label.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">{renderView()}</div>
    </div>
  )
}
