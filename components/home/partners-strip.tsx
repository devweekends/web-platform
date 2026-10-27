"use client"

import { useEffect, useRef } from "react"

import { LogoMark } from "./logo-mark"
import { SmartLink } from "./smart-link"
import type { Org } from "./data"

/** Pixels per second. Deliberately very slow. */
const DRIFT_SPEED = 14
/** Drift stays paused this long after a hand scroll, so swipe momentum can finish. */
const RESUME_AFTER_SCROLL_MS = 2500
/** While a finger or mouse button is down. Cleared as soon as it is released. */
const HOLD_MS = 8000

type Props = {
  partners: Org[]
  communities: Org[]
}

/**
 * Partners (bold) sit in the middle and community partners (light) flank them.
 * The strip starts centered on the partners the first time it scrolls into view,
 * drifts slowly, and can be scrolled by hand. Hovering does not pause it: only
 * real interaction does, and it always resumes by itself.
 * Three copies side by side let it wrap around without a visible jump.
 */
export function PartnersStrip({ partners, communities }: Props) {
  const scroller = useRef<HTMLDivElement>(null)
  const middleGroup = useRef<HTMLSpanElement>(null)
  const pos = useRef(0)
  const lastWritten = useRef(0)
  const pausedUntil = useRef(0)
  const interacted = useRef(false)
  const visible = useRef(false)

  const left = communities.slice(0, Math.ceil(communities.length / 2))
  const right = communities.slice(Math.ceil(communities.length / 2))

  useEffect(() => {
    const el = scroller.current
    const group = middleGroup.current
    if (!el || !group) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const write = (value: number) => {
      pos.current = value
      lastWritten.current = value
      el.scrollLeft = value
    }

    // Centre the partners in the middle copy. Repeated after the font loads and
    // on resize, until someone has interacted with the strip.
    const center = () => {
      if (interacted.current) return
      write(group.offsetLeft + group.offsetWidth / 2 - el.clientWidth / 2)
    }
    center()
    document.fonts?.ready.then(center)
    window.addEventListener("resize", center)

    // Drift only while the strip is on screen, and re-centre the first time it
    // scrolls into view so visitors always meet the partners in the middle.
    let seen = false
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
      if (entry.isIntersecting && !seen) {
        seen = true
        center()
      }
    })
    observer.observe(el)

    // Any scroll we did not cause (swipe momentum, keyboard, scrollbar, anchor
    // focus) pauses the drift and becomes the new position.
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - lastWritten.current) > 2) {
        interacted.current = true
        pausedUntil.current = Date.now() + RESUME_AFTER_SCROLL_MS
        pos.current = el.scrollLeft
        lastWritten.current = el.scrollLeft
      }
    }
    el.addEventListener("scroll", onScroll, { passive: true })

    const hold = () => {
      interacted.current = true
      pausedUntil.current = Date.now() + HOLD_MS
    }
    const release = () => {
      if (pausedUntil.current > Date.now()) pausedUntil.current = Date.now() + RESUME_AFTER_SCROLL_MS
    }
    const wheel = (event: WheelEvent) => {
      // Vertical page scrolling over the strip must not pause it
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        interacted.current = true
        pausedUntil.current = Date.now() + RESUME_AFTER_SCROLL_MS
      }
    }
    el.addEventListener("pointerdown", hold)
    el.addEventListener("touchstart", hold, { passive: true })
    el.addEventListener("keydown", release)
    el.addEventListener("wheel", wheel, { passive: true })
    window.addEventListener("pointerup", release)
    window.addEventListener("pointercancel", release)
    window.addEventListener("touchend", release)
    window.addEventListener("touchcancel", release)

    let last = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64)
      last = now
      const copy = el.scrollWidth / 3
      const paused = Date.now() < pausedUntil.current
      if (visible.current && !paused && !reduceMotion && document.visibilityState === "visible") {
        let next = pos.current + (DRIFT_SPEED * dt) / 1000
        if (next >= copy * 2) next -= copy
        write(next)
      } else if (paused) {
        // Follow manual scrolling and keep it inside the middle copies.
        if (el.scrollLeft >= copy * 2) write(el.scrollLeft - copy)
        else if (el.scrollLeft <= 1) write(el.scrollLeft + copy)
        else {
          pos.current = el.scrollLeft
          lastWritten.current = el.scrollLeft
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener("resize", center)
      window.removeEventListener("pointerup", release)
      window.removeEventListener("pointercancel", release)
      window.removeEventListener("touchend", release)
      window.removeEventListener("touchcancel", release)
    }
  }, [])

  const group = (key: number, withRef: boolean) => (
    <div key={key} className="flex items-center">
      {left.map((org) => (
        <Community key={`l-${org.name}`} org={org} />
      ))}
      <span ref={withRef ? middleGroup : undefined} className="flex items-center">
        {partners.map((org) => (
          <SmartLink
            key={org.name}
            href={org.href}
            aria-label={org.name}
            draggable={false}
            className="flex shrink-0 items-center whitespace-nowrap px-9 text-[26px] font-bold tracking-[-0.03em] text-[#0A0A0A]"
          >
            <LogoMark org={org} size="lg" muted={false} />
          </SmartLink>
        ))}
      </span>
      {right.map((org) => (
        <Community key={`r-${org.name}`} org={org} />
      ))}
    </div>
  )

  return (
    <div
      ref={scroller}
      tabIndex={0}
      role="region"
      aria-label="Partners and communities. Scroll to see more."
      className="hm-scroll overflow-x-auto overflow-y-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]"
    >
      <div className="flex w-max items-center">{[0, 1, 2].map((i) => group(i, i === 1))}</div>
    </div>
  )
}

function Community({ org }: { org: Org }) {
  const className =
    "mx-7 whitespace-nowrap rounded-full border border-[#E6E6E6] px-4 py-2 text-[17px] font-medium tracking-[-0.01em] text-[#8A8A8A]"
  return (
    <SmartLink href={org.href} draggable={false} className={`${className} transition-colors hover:border-[#0A0A0A] hover:text-[#0A0A0A]`} fallbackClassName={className}>
      {org.name}
    </SmartLink>
  )
}
