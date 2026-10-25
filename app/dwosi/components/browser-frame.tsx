import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** Minimal browser window used to present real product screenshots consistently. */
export function BrowserFrame({ url, children, className }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("dw-shadow-md overflow-hidden rounded-xl border bg-card", className)}>
      <div aria-hidden="true" className="grid h-8 grid-cols-[3rem_1fr_3rem] items-center border-b bg-muted px-3">
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-input" />
          <span className="h-2 w-2 rounded-full bg-input" />
          <span className="h-2 w-2 rounded-full bg-input" />
        </span>
        {url ? (
          <span className="dw-label mx-auto max-w-full truncate rounded-md bg-background px-3 text-muted-foreground">
            {url}
          </span>
        ) : (
          <span />
        )}
        <span />
      </div>
      <div className="relative aspect-[16/10] bg-muted">{children}</div>
    </div>
  )
}
