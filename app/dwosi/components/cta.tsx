import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Press feedback: transform/opacity only, strong ease-out, under 160ms.
const press =
  "transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:ring-0"

const ctaStyles = {
  primary: cn(
    buttonVariants(),
    press,
    "h-11 rounded-md bg-cta px-6 font-semibold text-cta-foreground shadow-none hover:bg-cta can-hover:bg-cta/90"
  ),
  secondary: cn(
    buttonVariants({ variant: "outline" }),
    press,
    "h-11 rounded-md bg-transparent px-6 shadow-none hover:bg-transparent hover:text-foreground can-hover:bg-accent"
  ),
}

export const iconButtonClass = cn(
  press,
  "dw-hit h-9 w-9 rounded-md text-muted-foreground hover:bg-transparent hover:text-muted-foreground can-hover:bg-accent can-hover:text-foreground"
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
      {isExternal(href) && <span className="sr-only">(opens in a new tab)</span>}
    </SmartLink>
  )
}
