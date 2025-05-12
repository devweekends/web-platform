"use client"

import React, { useEffect, useState } from "react"
import { ZoomIn, ZoomOut, Maximize2, RefreshCw, Target, Network, Table, ChevronDown, ChevronUp } from "lucide-react"
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
    <div className="p-6 space-y-8">
      {/* Mentors Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4 px-2">Mentors ({mentors.length})</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Social Profiles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Mentees
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mentors.map((mentor) => {
                const mentorMentees = mentees.filter((m) =>
                  typeof m.mentor === "object"
                    ? m.mentor._id?.toString() === mentor._id.toString()
                    : m.mentor?.toString() === mentor._id.toString(),
                )

                return (
                  <React.Fragment key={mentor._id}>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={mentor.picture || "/avatar.svg"}
                            alt={mentor.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="ml-3 font-medium">{mentor.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{mentor.university || "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          {mentor.linkedin && (
                            <a
                              href={mentor.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/70 hover:text-primary"
                              title="LinkedIn"
                            >
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </a>
                          )}
                          {mentor.github && (
                            <a
                              href={mentor.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/70 hover:text-foreground"
                              title="GitHub"
                            >
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
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
                              className="text-foreground/70 hover:text-orange-500"
                              title="LeetCode"
                            >
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744 1.31 0 2.315-.925 2.315-2.301 0-.688-.28-1.357-.783-1.85l-3.137-3.082c-1.576-1.576-3.709-2.392-5.85-2.392-2.142 0-4.275.816-5.851 2.392l-4.872 4.914c-1.561 1.576-2.392 3.709-2.392 5.851s.83 4.276 2.392 5.851l4.886 4.914c1.576 1.576 3.709 2.392 5.851 2.392s4.275-.816 5.851-2.392l3.137-3.082c.516-.503.783-1.173.783-1.845 0-1.123-.728-2.301-2.198-2.301-.604 0-1.201.227-1.715.741z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {mentorMentees.length > 0 ? (
                          <button
                            onClick={() => toggleRow(mentor._id.toString())}
                            className="text-primary hover:text-primary/80 flex items-center gap-1"
                          >
                            {expandedRows.has(mentor._id.toString()) ? (
                              <>
                                Hide Mentees <ChevronUp size={16} />
                              </>
                            ) : (
                              <>
                                View Mentees ({mentorMentees.length}) <ChevronDown size={16} />
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-muted-foreground">No mentees</span>
                        )}
                      </td>
                    </tr>
                    {expandedRows.has(mentor._id.toString()) && mentorMentees.length > 0 && (
                      <tr className="bg-muted/50">
                        <td colSpan={4} className="px-6 py-4">
                          <div className="pl-11">
                            <h4 className="text-sm font-medium mb-3">Mentees</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {mentorMentees.map((mentee) => (
                                <div
                                  key={mentee._id.toString()}
                                  className="flex items-center gap-3 p-3 border rounded-lg bg-card"
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={mentee.picture || "/avatar.svg"}
                                    alt={mentee.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                  <div>
                                    <div className="font-medium">{mentee.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {mentee.university || "No university"}
                                    </div>
                                  </div>
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Social Profiles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Mentor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mentees.map((mentee) => {
                // Find mentor info
                const mentorInfo =
                  typeof mentee.mentor === "object" && mentee.mentor && mentee.mentor._id
                    ? mentee.mentor
                    : mentors.find((m) => m._id.toString() === mentee.mentor?.toString())

                return (
                  <tr key={mentee._id.toString()} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={mentee.picture || "/avatar.svg"}
                          alt={mentee.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="ml-3 font-medium">{mentee.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{mentee.university || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        {mentee.linkedin && (
                          <a
                            href={mentee.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/70 hover:text-primary"
                            title="LinkedIn"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                        {mentee.github && (
                          <a
                            href={mentee.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/70 hover:text-foreground"
                            title="GitHub"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
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
                            className="text-foreground/70 hover:text-orange-500"
                            title="LeetCode"
                          >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744 1.31 0 2.315-.925 2.315-2.301 0-.688-.28-1.357-.783-1.85l-3.137-3.082c-1.576-1.576-3.709-2.392-5.85-2.392-2.142 0-4.275.816-5.851 2.392l-4.872 4.914c-1.561 1.576-2.392 3.709-2.392 5.851s.83 4.276 2.392 5.851l4.886 4.914c1.576 1.576 3.709 2.392 5.851 2.392s4.275-.816 5.851-2.392l3.137-3.082c.516-.503.783-1.173.783-1.845 0-1.123-.728-2.301-2.198-2.301-.604 0-1.201.227-1.715.741z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mentorInfo ? (
                        <div className="flex items-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={mentorInfo.picture || "/avatar.svg"}
                            alt={mentorInfo.name}
                            className="w-6 h-6 rounded-full object-cover mr-2"
                          />
                          <span className="text-foreground">{mentorInfo.name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No mentor</span>
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/mentorship")
        if (!res.ok) throw new Error("Failed to fetch mentorship data")
        const { mentors, mentees } = await res.json()
        setMentors(mentors)
        setMentees(mentees)
      } catch (error) {
        setError("Failed to load mentorship data.")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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
              onClick={() => window.location.reload()}
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
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">Mentorship Network</h1>

        <div className="flex space-x-2 border rounded-md overflow-hidden">
          {VIEW_OPTIONS.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.key}
                onClick={() => setView(option.key)}
                className={`
                  flex items-center px-3 py-1.5 text-sm font-medium transition-colors
                  ${view === option.key ? "bg-primary text-primary-foreground" : "text-primary hover:bg-muted"}
                `}
              >
                <Icon className="w-4 h-4 mr-2" />
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">{renderView()}</div>
    </div>
  )
}
