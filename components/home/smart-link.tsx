import type { AnchorHTMLAttributes, ReactNode } from "react"
import Link from "next/link"

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | null
  children: ReactNode
  /** What to render when href is null. Defaults to a plain span. */
  fallbackClassName?: string
}

/**
 * Internal paths use next/link, http(s) links open in a new tab, and a null
 * href renders as plain text so unfinished destinations are never clickable.
 */
export function SmartLink({ href, children, className, fallbackClassName, ...rest }: Props) {
  if (href === null) {
    return <span className={fallbackClassName ?? className}>{children}</span>
  }
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    )
  }
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
