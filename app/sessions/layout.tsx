import type { Metadata } from "next"
import type { ReactNode } from "react"
import { withSocial } from "@/lib/seo"

export const metadata: Metadata = withSocial({
  title: "Sessions",
  description: "Upcoming and past Dev Weekends sessions: tech talks, deep dives and live learning.",
  alternates: { canonical: "/sessions" },
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
