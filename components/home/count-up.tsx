"use client"

import { useEffect, useRef } from "react"

/**
 * Counts a number like "2,100+" or "$2.5M+" up from zero the first time it
 * scrolls into view. The final value is what the server renders, so search
 * engines, screen readers and visitors without JavaScript see the real number.
 * The steps are written straight to the element, so React does not re-render on
 * every frame, and where the number sits comes from the observer, not from
 * measuring it (which would force a layout while the page is still loading).
 */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/)
    const el = ref.current
    if (!match || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const [, prefix, digits, suffix] = match
    const target = Number(digits.replace(/,/g, ""))
    const decimals = digits.includes(".") ? digits.split(".")[1].length : 0
    const grouped = digits.includes(",")
    const format = (n: number) =>
      prefix + (grouped ? n.toLocaleString("en-US", { maximumFractionDigits: 0 }) : n.toFixed(decimals)) + suffix

    let frame = 0
    let firstReport = true
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]
        if (firstReport) {
          firstReport = false
          // Already on screen (or above it) when the page loads: leave the real number alone
          if (!entry.rootBounds || entry.boundingClientRect.top < entry.rootBounds.bottom) {
            observer.disconnect()
            return
          }
        }
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          el.textContent = t < 1 ? format(target * eased) : value
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        el.textContent = format(0)
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      el.textContent = value
    }
  }, [value, duration])

  return <span ref={ref}>{value}</span>
}
