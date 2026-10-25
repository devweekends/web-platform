import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: "center" | "left"
  className?: string
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("dw-label text-muted-foreground", className)}>{children}</p>
}

export function SectionHeading({ eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  const centered = align === "center"

  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="dw-title mt-2">{title}</h2>
      {description && (
        <p className={cn("dw-lead mt-4 max-w-[60ch] text-muted-foreground", centered && "mx-auto")}>{description}</p>
      )}
    </div>
  )
}
