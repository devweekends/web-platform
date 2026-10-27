"use client"

import { usePathname } from "next/navigation"

import { HomeFooter } from "@/components/home/footer"
import { hasOwnChrome } from "@/components/site-header"
import { RevealObserver } from "@/components/site/reveal"

export function SiteFooter() {
  const pathname = usePathname()

  return (
    <>
      <RevealObserver />
      {hasOwnChrome(pathname) ? null : <HomeFooter />}
    </>
  )
}
