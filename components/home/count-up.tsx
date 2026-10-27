"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Counts a number like "2,100+" or "$2.5M+" up from zero the first time it
 * scrolls into view. The final value is what the server renders, so search
 * engines, screen readers and visitors without JavaScript see the real number.
 */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)

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

    // Already on screen when the page loads: leave the real number alone
    if (el.getBoundingClientRect().top < window.innerHeight) return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setShown(format(target * eased))
          if (t < 1) frame = requestAnimationFrame(tick)
          else setShown(value)
        }
        setShown(format(0))
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration])

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
