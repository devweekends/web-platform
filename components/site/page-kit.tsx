import type { ReactNode } from "react"

import { SmartLink } from "@/components/home/smart-link"

/**
 * Building blocks for inner pages, in the same look as the homepage: white page,
 * black panels, Inter, rounded cards, small uppercase labels. Server components,
 * so they work in any page. Colors are fixed hex values on purpose: the site is
 * always light, and these pages should not depend on the old theme tokens.
 */

export const container = "mx-auto max-w-[1200px] px-6"

export function Eyebrow({ children, onDark }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${onDark ? "text-[#A3A3A3]" : "text-[#5C5C5C]"}`}>{children}</p>
  )
}

type ButtonProps = {
  href: string | null
  children: ReactNode
  variant?: "primary" | "secondary" | "onDark" | "onDarkSecondary"
  external?: boolean
}

const buttonStyles = {
  primary: "bg-[#0A0A0A] text-white hover:bg-[#262626]",
  secondary: "border border-[#D4D4D4] text-[#0A0A0A] hover:bg-[#F7F7F7]",
  onDark: "bg-white text-[#0A0A0A] hover:bg-[#E6E6E6]",
  onDarkSecondary: "border border-[#3D3D3D] text-white hover:bg-white/10",
}

/** Main call to action. 52px tall, rounded, one style per role. */
export function Button({ href, children, variant = "primary" }: ButtonProps) {
  const className = `inline-flex min-h-[52px] items-center justify-center rounded-xl px-7 py-4 text-base font-semibold transition-colors ${buttonStyles[variant]}`
  return (
    <SmartLink href={href} className={className}>
      {children}
    </SmartLink>
  )
}

/** Page title block. Use once per page, at the top. */
export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  actions?: ReactNode
}) {
  return (
    <section className="border-b border-[#E6E6E6] bg-white">
      <div className={`${container} py-16 md:py-24`}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="dw-rise mt-4 max-w-[18ch] text-[clamp(40px,6vw,76px)] font-semibold leading-[1.02] tracking-[-0.045em]">{title}</h1>
        {intro && <div className="dw-rise-late mt-6 max-w-[60ch] text-[19px] leading-[1.65] text-[#404040]">{intro}</div>}
        {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  )
}

/** A band of the page. `gray` gives a soft alternating background. */
export function Section({
  id,
  tone = "white",
  children,
  className = "",
}: {
  id?: string
  tone?: "white" | "gray"
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`${tone === "gray" ? "bg-[#F7F7F7]" : "bg-white"} scroll-mt-24`}>
      <div className={`${container} py-16 md:py-20 ${className}`}>{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  action?: ReactNode
}) {
  return (
    <div data-reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-3.5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">{title}</h2>
        {intro && <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.6] text-[#5C5C5C]">{intro}</p>}
      </div>
      {action}
    </div>
  )
}

/** Black rounded panel, used once or twice per page for the most important message. */
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className="px-6 py-6">
      <div data-reveal className="mx-auto max-w-[1392px] rounded-[28px] bg-[#0A0A0A] text-white">
        <div className={`${container} py-16 md:py-20 ${className}`}>{children}</div>
      </div>
    </section>
  )
}

/** White or gray card. Pass href to make the whole card a link. */
export function Card({
  children,
  href,
  tone = "white",
  className = "",
}: {
  children: ReactNode
  href?: string | null
  tone?: "white" | "gray" | "bordered"
  className?: string
}) {
  const base = {
    white: "bg-white",
    gray: "bg-[#F7F7F7]",
    bordered: "border border-[#E6E6E6] bg-white",
  }[tone]
  const classes = `flex flex-col rounded-[20px] p-7 transition duration-200 ${base} ${className}`
  if (href) {
    return (
      <SmartLink
        data-reveal
        href={href}
        className={`${classes} hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1`}
      >
        {children}
      </SmartLink>
    )
  }
  return (
    <div data-reveal className={classes}>
      {children}
    </div>
  )
}
