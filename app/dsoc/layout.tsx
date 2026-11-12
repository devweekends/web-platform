import type { Metadata } from "next"
import type { ReactNode } from "react"

import { withSocial } from "@/lib/seo"

// No canonical here on purpose: this layout wraps every /dsoc route, and a
// canonical set here would point all of them at the same address.
export const metadata: Metadata = withSocial({
  title: "DSOC: Dev Weekends Summer of Code",
  description:
    "Dev Weekends Summer of Code (DSOC) is a mentored open source program with a monthly stipend per milestone. 2026 applications are closed.",
  alternates: { canonical: "/dsoc" },
})

export default function DsocLayout({ children }: { children: ReactNode }) {
  return children
}
