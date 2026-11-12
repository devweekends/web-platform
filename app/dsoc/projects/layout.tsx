import type { Metadata } from "next"
import type { ReactNode } from "react"

import { withSocial } from "@/lib/seo"

// withSocial fills the share tags, including the share image, which a bare
// openGraph object here would drop
export const metadata: Metadata = withSocial({
  title: { absolute: "DSOC projects | Dev Weekends" },
  description:
    "Open source projects in Dev Weekends Summer of Code: what each one builds, the skills it needs and the mentors who guide it.",
  alternates: { canonical: "/dsoc/projects" },
})

export default function DsocProjectsLayout({ children }: { children: ReactNode }) {
  return children
}
