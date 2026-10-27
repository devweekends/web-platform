import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Hand-picked opportunities for students and professionals across Dev Weekends and Dev Weekends partner companies.",
  alternates: { canonical: "/careers" },
  robots: { index: false },
}

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children
}
