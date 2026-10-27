import type { ReactNode } from "react"

import { LINKS } from "@/components/home/data"
import { Button } from "@/components/site/page-kit"

/**
 * The one pair of calls to action used across inner pages: join the community
 * or apply to a program. Both go to central places (Discord and the homepage
 * "Get involved" section), so a program added or renamed in
 * components/home/data.ts needs no edit here or on any page.
 */
export function JoinCta({ onDark = false, align = "center" }: { onDark?: boolean; align?: "center" | "start" }): ReactNode {
  return (
    <div className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
      <Button href={LINKS.getInvolved} variant={onDark ? "onDark" : "primary"}>
        Apply to a program
      </Button>
      <Button href={LINKS.discord} variant={onDark ? "onDarkSecondary" : "secondary"}>
        Join the community
      </Button>
    </div>
  )
}
