"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * One hand-scrolled row with previous and next buttons. It never moves by
 * itself. When everything fits (wide screens) the buttons are hidden, so the
 * same component works for a handful of cards and for a long list. Used for
 * programs, products and mentors, so the behaviour is changed in one place.
 */
export function Slider({
  label,
  itemClassName = "w-[300px]",
  children,
}: {
  label: string
  /** Width of each slide, for example "w-[300px]" */
  itemClassName?: string
  children: ReactNode[]
}) {
  const track = useRef<HTMLUListElement>(null)
  const [overflowing, setOverflowing] = useState(false)

  const measure = useCallback(() => {
    const el = track.current
    if (el) setOverflowing(el.scrollWidth > el.clientWidth + 2)
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure, children.length])

  const scrollBy = (direction: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: direction * Math.max(240, el.clientWidth * 0.8), behavior: "smooth" })
  }

  return (
    <div>
      <ul
        ref={track}
        aria-label={label}
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, index) => (
          <li key={index} className={`flex shrink-0 snap-start ${itemClassName}`}>
            {child}
          </li>
        ))}
      </ul>
      {overflowing && (
        <div className="mt-2 flex gap-2">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => scrollBy(direction)}
              aria-label={direction === 1 ? `Next in ${label}` : `Previous in ${label}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4D4D4] bg-white text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-white"
            >
              {direction === 1 ? <ChevronRight className="h-5 w-5" aria-hidden="true" /> : <ChevronLeft className="h-5 w-5" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
