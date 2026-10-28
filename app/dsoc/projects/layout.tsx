import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: { absolute: "DSOC projects | Dev Weekends" },
  alternates: { canonical: "/dsoc/projects" },
}

export default function DsocProjectsLayout({ children }: { children: ReactNode }) {
  return children
}
