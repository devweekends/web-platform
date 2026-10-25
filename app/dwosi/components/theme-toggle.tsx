"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DWOSI_THEME_ATTR, DWOSI_THEME_KEY } from "../theme"
import { iconButtonClass } from "./cta"

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement
    const next = root.getAttribute(DWOSI_THEME_ATTR) === "light" ? "dark" : "light"
    if (next === "light") root.setAttribute(DWOSI_THEME_ATTR, "light")
    else root.removeAttribute(DWOSI_THEME_ATTR)
    try {
      localStorage.setItem(DWOSI_THEME_KEY, next)
    } catch {
      // Storage can be blocked; the choice still applies for this visit
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={iconButtonClass}
      aria-label="Switch between dark and light mode"
      onClick={toggle}
    >
      <Sun className="dwosi-icon-light" />
      <Moon className="dwosi-icon-dark" />
    </Button>
  )
}
