import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Press feedback: transform/opacity only, strong ease-out, under 160ms.
const press =
  "transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:ring-0"

const ctaStyles = {
  primary: cn(
    buttonVariants(),
    press,
    "h-11 rounded-full bg-brand px-6 text-brand-foreground shadow-none hover:bg-brand can-hover:opacity-90"
  ),
  secondary: cn(
    buttonVariants({ variant: "outline" }),
    press,
    "h-11 rounded-full bg-transparent px-6 shadow-none hover:bg-transparent hover:text-foreground can-hover:bg-accent"
  ),
}

export const iconButtonClass = cn(
  press,
  "dw-hit h-9 w-9 rounded-full text-muted-foreground hover:bg-transparent hover:text-muted-foreground can-hover:bg-accent can-hover:text-foreground"
)

const isExternal = (href: string) => href.startsWith("http")

function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

interface CtaProps {
  href: string
  children: ReactNode
  variant?: "primary" | "secondary"
  arrow?: boolean
  className?: string
}

export function Cta({ href, children, variant = "primary", arrow = false, className }: CtaProps) {
  return (
    <SmartLink href={href} className={cn(ctaStyles[variant], "dw-arrow-link", arrow && "pr-5", className)}>
      {children}
      {arrow && <ArrowRight className="dw-arrow" aria-hidden="true" />}
    </SmartLink>
  )
}

/** Brand-colored inline link. Arrow points right for in-site links, diagonally for external ones. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const external = isExternal(href)
  const Icon = external ? ArrowUpRight : ArrowRight

  return (
    <SmartLink
      href={href}
      className={cn(
        "dw-hit dw-arrow-link inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 can-hover:underline",
        className
      )}
    >
      {children}
      <Icon className={cn("dw-arrow h-3.5 w-3.5", external && "dw-arrow-diagonal")} aria-hidden="true" />
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </SmartLink>
  )
}
