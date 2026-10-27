import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Our story",
  description: "The story of Dev Weekends: how weekend sessions in 2018 became a free community of 30,000+ engineers.",
  alternates: { canonical: "/our-story" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
