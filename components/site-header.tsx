"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import { HeadlineBar } from "@/components/headline-bar"

export function SiteHeader() {
  const pathname = usePathname()
  const isDsocRoute = pathname?.startsWith("/dsoc")
  const isLinksRoute = pathname === "/links"

  if (isDsocRoute || isLinksRoute) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <HeadlineBar />
      <Navbar />
    </header>
  )
}
