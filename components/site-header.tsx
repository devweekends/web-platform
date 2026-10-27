"use client"

import { usePathname } from "next/navigation"

import { HeadlineBar } from "@/components/headline-bar"
import { HomeHeader } from "@/components/home/header"

/** Sections with their own header: DSOC, DWOSI and the links page */
export function hasOwnChrome(pathname: string | null) {
  return Boolean(pathname?.startsWith("/dsoc") || pathname?.startsWith("/dwosi") || pathname === "/links")
}

export function SiteHeader() {
  const pathname = usePathname()

  if (hasOwnChrome(pathname)) {
    return null
  }

  return (
    <div className="sticky top-0 z-50 w-full">
      <HeadlineBar />
      <HomeHeader />
    </div>
  )
}
