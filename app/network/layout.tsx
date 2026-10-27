import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Mentorship network",
  description: "The Dev Weekends mentorship network: mentors and mentees and how they connect.",
  alternates: { canonical: "/network" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
