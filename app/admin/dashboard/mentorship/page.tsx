"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  Network,
  Table,
  Grid,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Target,
  ChevronUp,
  ChevronDown,
  Plus,
} from "lucide-react"

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

const VIEW_OPTIONS = [
  { key: "spider", label: "Spider Web", icon: Network },
  { key: "table", label: "Table", icon: Table },
  { key: "gallery", label: "Gallery", icon: Grid },
]

function TableView({ mentors, mentees }: any) {
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Phone
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
              {mentors.map((mentor: any) => {
                const mentorMentees = mentees.filter((m: any) =>
                  typeof m.mentor === "object"
                    ? m.mentor._id?.toString() === mentor._id.toString()
                    : m.mentor?.toString() === mentor._id.toString(),
                )

                return (
                  <React.Fragment key={mentor._id}>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={mentor.picture || "/avatar.svg"}
                            alt={mentor.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="ml-3 font-medium">{mentor.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`mailto:${mentor.email}`} className="text-muted-foreground hover:text-primary">
                          {mentor.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                        {mentor.phone ? (
                          <a href={`tel:${mentor.phone}`} className="hover:text-primary">
                            {mentor.phone}
                          </a>
                        ) : (
                          "-"
                        )}
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
                        <td colSpan={6} className="px-6 py-4">
                          <div className="pl-11">
                            <h4 className="text-sm font-medium mb-3">Mentees</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {mentorMentees.map((mentee: any) => (
                                <div
                                  key={mentee._id.toString()}
                                  className="flex items-center gap-3 p-3 border rounded-lg bg-card"
                                >
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
                                    <a href={`mailto:${mentee.email}`} className="text-sm text-primary hover:underline">
                                      {mentee.email}
                                    </a>
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Phone
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
              {mentees.map((mentee: any) => {
                // Find mentor info
                const mentorInfo =
                  typeof mentee.mentor === "object" && mentee.mentor && mentee.mentor._id
                    ? mentee.mentor
                    : mentors.find((m: any) => m._id.toString() === mentee.mentor?.toString())

                return (
                  <tr key={mentee._id.toString()} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={mentee.picture || "/avatar.svg"}
                          alt={mentee.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="ml-3 font-medium">{mentee.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`mailto:${mentee.email}`} className="text-muted-foreground hover:text-primary">
                        {mentee.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {mentee.phone ? (
                        <a href={`tel:${mentee.phone}`} className="hover:text-primary">
                          {mentee.phone}
                        </a>
                      ) : (
                        "-"
                      )}
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

function GalleryView({ mentors, mentees }: any) {
  return (
    <div className="p-6">
      {/* Mentors Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 px-2">Mentors ({mentors.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentors.map((mentor: any) => {
            const mentorMentees = mentees.filter((m: any) =>
              typeof m.mentor === "object"
                ? m.mentor._id?.toString() === mentor._id.toString()
                : m.mentor?.toString() === mentor._id.toString(),
            )

            return (
              <div
                key={mentor._id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-all bg-card"
              >
                {/* Header with avatar and name */}
                <div className="p-4 border-b flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={mentor.picture || "/avatar.svg"}
                      alt={mentor.name}
                      className="h-16 w-16 rounded-full object-cover border-2 border-primary/20"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{mentor.name}</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Mentor
                    </span>
                  </div>
                </div>

                {/* Contact & University Info */}
                <div className="p-4 space-y-3">
                  {mentor.university && (
                    <div className="flex items-center text-sm">
                      <svg
                        className="h-5 w-5 text-muted-foreground mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="text-foreground">{mentor.university}</span>
                    </div>
                  )}

                  <div className="flex items-center text-sm">
                    <svg
                      className="h-5 w-5 text-muted-foreground mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a href={`mailto:${mentor.email}`} className="text-foreground hover:text-primary">
                      {mentor.email}
                    </a>
                  </div>

                  {mentor.phone && (
                    <div className="flex items-center text-sm">
                      <svg
                        className="h-5 w-5 text-muted-foreground mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a href={`tel:${mentor.phone}`} className="text-foreground hover:text-primary">
                        {mentor.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="px-4 py-3 border-t flex justify-between">
                  <div className="flex space-x-3">
                    {mentor.linkedin && (
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-primary"
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
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744 1.31 0 2.315-.925 2.315-2.301 0-.688-.28-1.357-.783-1.85l-3.137-3.082c-1.576-1.576-3.709-2.392-5.85-2.392-2.142 0-4.275.816-5.851 2.392l-4.872 4.914c-1.561 1.576-2.392 3.709-2.392 5.851s.83 4.276 2.392 5.851l4.886 4.914c1.576 1.576 3.709 2.392 5.851 2.392s4.275-.816 5.851-2.392l3.137-3.082c.516-.503.783-1.173.783-1.845 0-1.123-.728-2.301-2.198-2.301-.604 0-1.201.227-1.715.741z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground border rounded px-2 py-1">
                      {mentorMentees.length} mentee{mentorMentees.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mentees Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 px-2">Mentees ({mentees.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentees.map((mentee: any) => {
            // Find mentor info
            const mentorInfo =
              typeof mentee.mentor === "object" && mentee.mentor && mentee.mentor._id
                ? mentee.mentor
                : mentors.find((m: any) => m._id.toString() === mentee.mentor?.toString())

            return (
              <div
                key={mentee._id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-all bg-card"
              >
                {/* Header with avatar and name */}
                <div className="p-4 border-b flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={mentee.picture || "/avatar.svg"}
                      alt={mentee.name}
                      className="h-16 w-16 rounded-full object-cover border-2 border-secondary/20"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{mentee.name}</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                      Mentee
                    </span>
                  </div>
                </div>

                {/* Contact & University Info */}
                <div className="p-4 space-y-3">
                  {mentee.university && (
                    <div className="flex items-center text-sm">
                      <svg
                        className="h-5 w-5 text-muted-foreground mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="text-foreground">{mentee.university}</span>
                    </div>
                  )}

                  <div className="flex items-center text-sm">
                    <svg
                      className="h-5 w-5 text-muted-foreground mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a href={`mailto:${mentee.email}`} className="text-foreground hover:text-primary">
                      {mentee.email}
                    </a>
                  </div>

                  {mentee.phone && (
                    <div className="flex items-center text-sm">
                      <svg
                        className="h-5 w-5 text-muted-foreground mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a href={`tel:${mentee.phone}`} className="text-foreground hover:text-primary">
                        {mentee.phone}
                      </a>
                    </div>
                  )}

                  {mentorInfo && (
                    <div className="flex items-center text-sm">
                      <svg
                        className="h-5 w-5 text-muted-foreground mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="text-foreground">Mentor: {mentorInfo.name}</span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="px-4 py-3 border-t flex justify-start space-x-3">
                  {mentee.linkedin && (
                    <a
                      href={mentee.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary"
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
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744 1.31 0 2.315-.925 2.315-2.301 0-.688-.28-1.357-.783-1.85l-3.137-3.082c-1.576-1.576-3.709-2.392-5.85-2.392-2.142 0-4.275.816-5.851 2.392l-4.872 4.914c-1.561 1.576-2.392 3.709-2.392 5.851s.83 4.276 2.392 5.851l4.886 4.914c1.576 1.576 3.709 2.392 5.851 2.392s4.275-.816 5.851-2.392l3.137-3.082c.516-.503.783-1.173.783-1.845 0-1.123-.728-2.301-2.198-2.301-.604 0-1.201.227-1.715.741z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function AdminMentorshipPage() {
  const [data, setData] = useState<{ mentors: any[]; mentees: any[] }>({ mentors: [], mentees: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState("spider")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [mentorsRes, menteesRes] = await Promise.all([fetch("/api/admin/mentors"), fetch("/api/admin/mentees")])
        if (!mentorsRes.ok || !menteesRes.ok) throw new Error("Failed to fetch data")
        const [mentors, mentees] = await Promise.all([mentorsRes.json(), menteesRes.json()])
        setData({ mentors, mentees })
      } catch (err) {
        setError("Failed to load mentorship data.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleGraphControl = (action: string) => {
    // Only dispatch event if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const event = new CustomEvent("mentorship-graph-control", { detail: { action } })
      window.dispatchEvent(event)
    }
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
              onClick={() => typeof window !== 'undefined' && window.location.reload()}
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
              mentors={data.mentors}
              mentees={data.mentees}
              isAdmin={true}
              useImages={true}
              nodeSpacing={150}
              view={view}
              autoFit={true}
            />
          </div>
        )
      case "table":
        return <TableView mentors={data.mentors} mentees={data.mentees} />
      case "gallery":
        return <GalleryView mentors={data.mentors} mentees={data.mentees} />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">Mentorship Network</h1>

        <div className="flex items-center gap-2">
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

          <Link
            href="/admin/dashboard/add-mentorship"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
          >
            <Plus size={16} /> Add New
          </Link>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">{renderView()}</div>
    </div>
  )
}
