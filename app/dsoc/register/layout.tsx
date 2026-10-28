import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: { absolute: "DSOC registration | Dev Weekends" },
  alternates: { canonical: "/dsoc/register" },
}

export default function DsocRegisterLayout({ children }: { children: ReactNode }) {
  return children
}
