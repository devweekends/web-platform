"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Scroll reveal for anything marked `data-reveal`. Elements already on screen
 * are shown at once, so nothing above the fold flickers; the rest rise in as
 * they scroll into view, a few at a time with a short stagger. Page content can
 * stream in after this runs, so new elements are picked up as they arrive.
 * Without JavaScript, or with reduced motion, everything is visible: the hidden
 * state only applies under `html.reveal-ready` (see globals.css).
 *
 * Positions come from the IntersectionObserver, never from measuring elements
 * here: measuring right after the page loads makes the browser lay the whole
 * page out early, which is slow on a phone.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Once shown, drop the marker so the element gets its own hover transitions back
    const show = (el: HTMLElement, delay: number) => {
      el.style.setProperty("--reveal-delay", `${delay}ms`)
      el.classList.add("is-revealed")
      window.setTimeout(() => el.removeAttribute("data-reveal"), delay + 800)
    }

    let alive = false
    // Elements the observer has already reported on once
    const placed = new WeakSet<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        alive = true
        let index = 0
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          const firstReport = !placed.has(el)
          placed.add(el)

          // The first report says where the element is right now. On screen or
          // above it: show it as it is, with no animation.
          if (firstReport && (!entry.rootBounds || entry.boundingClientRect.top < entry.rootBounds.bottom)) {
            observer.unobserve(el)
            el.classList.add("is-revealed")
            el.removeAttribute("data-reveal")
            return
          }
          if (entry.isIntersecting) {
            observer.unobserve(el)
            show(el, Math.min(index++, 5) * 70)
          }
        })
        // Hide what is still waiting only after the first reports are in
        document.documentElement.classList.add("reveal-ready")
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    )

    // Hand marked elements not handled yet to the observer
    const scan = () => {
      const fresh = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed):not([data-reveal-watch])")
      fresh.forEach((el) => {
        el.setAttribute("data-reveal-watch", "")
        observer.observe(el)
      })
      return fresh.length
    }

    // Safety net for browsers that pause or skip the observer: plain scroll
    // events also reveal anything that has entered the screen
    let last = 0
    const onScroll = () => {
      const now = Date.now()
      if (now - last < 120) return
      last = now
      const bottom = window.innerHeight * 0.95
      let index = 0
      document.querySelectorAll<HTMLElement>("[data-reveal-watch]:not(.is-revealed)").forEach((el) => {
        if (el.getBoundingClientRect().top < bottom) {
          observer.unobserve(el)
          show(el, Math.min(index++, 5) * 70)
        }
      })
    }

    // With nothing to report on, the observer never calls back
    if (scan() === 0) document.documentElement.classList.add("reveal-ready")

    // New content can arrive in many small changes: look once per frame at most
    let queued = 0
    const mutations = new MutationObserver(() => {
      if (queued) return
      queued = requestAnimationFrame(() => {
        queued = 0
        scan()
      })
    })
    mutations.observe(document.body, { childList: true, subtree: true })
    window.addEventListener("scroll", onScroll, { passive: true })

    // A working observer reports every watched element at once. If it stays
    // silent (paused background tabs, some crawlers), show everything now
    const failsafe = window.setTimeout(() => {
      if (alive) return
      document.querySelectorAll<HTMLElement>("[data-reveal-watch]:not(.is-revealed)").forEach((el) => show(el, 0))
    }, 1500)

    return () => {
      window.clearTimeout(failsafe)
      cancelAnimationFrame(queued)
      observer.disconnect()
      mutations.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [pathname])

  return null
}
