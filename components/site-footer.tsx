"use client"

import { usePathname } from "next/navigation"

import { HomeFooter } from "@/components/home/footer"
import { hasOwnChrome } from "@/components/site-header"

export function SiteFooter() {
  const pathname = usePathname()

  if (hasOwnChrome(pathname)) {
    return null
  }

  return <HomeFooter />
}
