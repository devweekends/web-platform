import type { Metadata } from "next"
import type { ReactNode } from "react"

// A sign-in screen has nothing to rank for
export const metadata: Metadata = {
  title: { absolute: "DSOC sign in | Dev Weekends" },
  alternates: { canonical: "/dsoc/login" },
  robots: { index: false, follow: false },
}

export default function DsocLoginLayout({ children }: { children: ReactNode }) {
  return children
}
