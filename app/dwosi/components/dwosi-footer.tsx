import Link from "next/link"

import { DWOSI_LINKS } from "../data"
import { DwosiLogo } from "./dwosi-logo"

const columns = [
  {
    title: "Initiative",
    links: [
      { label: "Projects", href: "/dwosi#projects" },
      { label: "How it works", href: "/dwosi#how-it-works" },
      { label: "DSOC", href: DWOSI_LINKS.dsoc },
      { label: "FAQ", href: "/dwosi#faq" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: DWOSI_LINKS.github },
      { label: "Discord", href: DWOSI_LINKS.discord },
      { label: "LinkedIn", href: DWOSI_LINKS.linkedin },
      { label: "YouTube", href: DWOSI_LINKS.youtube },
    ],
  },
  {
    title: "Dev Weekends",
    links: [
      { label: "Home", href: "/" },
      { label: "Mentorship", href: "/mentorship" },
      { label: "Contact", href: `mailto:${DWOSI_LINKS.email}` },
    ],
  },
]

const linkClass = "dw-touch text-sm text-muted-foreground can-hover:text-foreground"

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {label}
      </a>
    )
  }
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={linkClass}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  )
}

export function DwosiFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-x-6 gap-y-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="col-span-3 max-w-xs md:col-span-1">
          <DwosiLogo />
          <p className="dw-body mt-4 text-muted-foreground">
            The Dev Weekends Open Source Initiative. Real products, built in the open by our community.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="dw-label text-muted-foreground">{column.title}</p>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <p className="dw-label mx-auto max-w-6xl px-4 py-6 text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Dev Weekends
        </p>
      </div>
    </footer>
  )
}
