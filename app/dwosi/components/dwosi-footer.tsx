import Link from "next/link"

import { DWOSI_LINKS } from "../data"

const links = [
  { label: "GitHub", href: DWOSI_LINKS.github },
  { label: "Discord", href: DWOSI_LINKS.discord },
  { label: "LinkedIn", href: DWOSI_LINKS.linkedin },
  { label: "YouTube", href: DWOSI_LINKS.youtube },
]

export function DwosiFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground">
          DWOSI is an initiative of{" "}
          <Link href="/" className="underline underline-offset-4 can-hover:text-foreground">
            Dev Weekends
          </Link>
          . Free for contributors.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link href="/" className="dw-touch text-sm text-muted-foreground underline underline-offset-4 can-hover:text-foreground">
              Dev Weekends home
            </Link>
          </li>
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="dw-touch text-sm text-muted-foreground underline underline-offset-4 can-hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
