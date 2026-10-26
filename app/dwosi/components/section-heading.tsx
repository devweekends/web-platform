import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** Orange mono label above section titles */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("dw-label text-brand", className)}>{children}</p>
}
