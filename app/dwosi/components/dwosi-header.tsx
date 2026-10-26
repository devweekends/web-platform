import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { PRIMARY_CTA } from "../data"
import { Cta, iconButtonClass } from "./cta"
import { DwosiLogo } from "./dwosi-logo"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { label: "The record", href: "/dwosi#record" },
  { label: "Projects", href: "/dwosi#projects" },
  { label: "Partners", href: "/dwosi#partners" },
  { label: "Hiring", href: "/dwosi#hiring" },
]

const menuItemClass = "rounded-[4px] px-3 py-3 transition-none"

export function DwosiHeader() {
  return (
    <header className="dw-header sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <DwosiLogo />

        <div className="flex items-center gap-2">
          <nav aria-label="DWOSI" className="mr-2 hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="dw-hit rounded-md px-3 py-2 text-sm text-muted-foreground can-hover:bg-accent can-hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
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
            <DropdownMenuContent align="end" sideOffset={8} className="dw-menu w-56 rounded-lg p-1">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild className={menuItemClass}>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className={cn(menuItemClass, "font-medium text-brand")}>
                <a href={PRIMARY_CTA.href} target="_blank" rel="noopener noreferrer">
                  {PRIMARY_CTA.label}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
