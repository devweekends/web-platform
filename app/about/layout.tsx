import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "About",
  description: "About Dev Weekends: a free, nonprofit, international community of engineers, started in 2018.",
  alternates: { canonical: "/about" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
