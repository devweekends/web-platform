import Link from "next/link"
import { Github, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { DWOSI_LINKS, PRIMARY_CTA } from "../data"
import { Cta, iconButtonClass } from "./cta"
import { DwosiLogo } from "./dwosi-logo"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { label: "Projects", href: "/dwosi#projects" },
  { label: "How it works", href: "/dwosi#how-it-works" },
  { label: "DSOC", href: "/dwosi#dsoc" },
  { label: "FAQ", href: "/dwosi#faq" },
]

const menuItemClass = "rounded-lg px-3 py-3 transition-none"

export function DwosiHeader() {
  return (
    <header className="dw-header sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <DwosiLogo />

        <nav aria-label="DWOSI" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="dw-hit rounded-full px-3 py-2 text-sm text-muted-foreground can-hover:bg-accent can-hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className={cn(iconButtonClass, "hidden sm:inline-flex")}>
            <a href={DWOSI_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="Dev Weekends on GitHub">
              <Github />
            </a>
          </Button>
          <ThemeToggle />
          <Cta href={PRIMARY_CTA.href} className="dw-hit ml-2 hidden h-9 px-4 sm:inline-flex">
            {PRIMARY_CTA.label}
          </Cta>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(iconButtonClass, "md:hidden")} aria-label="Open menu">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="dw-menu w-56 rounded-xl p-1">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild className={menuItemClass}>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className={cn(menuItemClass, "font-medium text-brand")}>
                <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className={menuItemClass}>
                <a href={DWOSI_LINKS.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
