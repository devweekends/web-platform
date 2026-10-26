import Link from "next/link"

import { cn } from "@/lib/utils"

export function DwosiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <rect width="28" height="28" rx="6" className="fill-brand" />
      <g className="stroke-brand-foreground" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M10 9.5v9" />
        <path d="M18 11.5c0 3.5-3 4.5-8 6" />
      </g>
      <g className="fill-brand-foreground">
        <circle cx="10" cy="8" r="2.25" />
        <circle cx="10" cy="20" r="2.25" />
        <circle cx="18" cy="9.5" r="2.25" />
      </g>
    </svg>
  )
}

export function DwosiLogo({ className }: { className?: string }) {
  return (
    <Link href="/dwosi" className={cn("flex items-center gap-2.5", className)} aria-label="DWOSI home">
      <DwosiMark />
      <span className="dw-wordmark">dwosi</span>
    </Link>
  )
}
