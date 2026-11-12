import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: { absolute: "DSOC projects | Dev Weekends" },
  description:
    "Open source projects in Dev Weekends Summer of Code: what each one builds, the skills it needs and the mentors who guide it.",
  alternates: { canonical: "/dsoc/projects" },
  openGraph: { url: "/dsoc/projects" },
}

export default function DsocProjectsLayout({ children }: { children: ReactNode }) {
  return children
}
