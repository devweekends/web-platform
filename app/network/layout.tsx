import type { Metadata } from "next"
import type { ReactNode } from "react"
import { withSocial } from "@/lib/seo"

export const metadata: Metadata = withSocial({
  title: "Mentorship network",
  description: "The Dev Weekends mentorship network: mentors and mentees and how they connect.",
  alternates: { canonical: "/network" },
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
