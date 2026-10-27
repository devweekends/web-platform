import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Team and story",
  description: "The people behind Dev Weekends, and how weekend sessions in 2018 became a free community of 30,000+ engineers.",
  alternates: { canonical: "/team" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
