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
    const observer = new IntersectionObserver(
      (entries) => {
        alive = true
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            observer.unobserve(entry.target)
            show(entry.target as HTMLElement, Math.min(index, 5) * 70)
          })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    )

    // Find marked elements not handled yet: show the ones on screen, watch the rest
    const scan = () => {
      const fold = window.innerHeight * 0.95
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed):not([data-reveal-watch])").forEach((el) => {
        if (el.getBoundingClientRect().top < fold) {
          el.classList.add("is-revealed")
          el.removeAttribute("data-reveal")
        } else {
          el.setAttribute("data-reveal-watch", "")
          observer.observe(el)
        }
      })
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

    scan()
    document.documentElement.classList.add("reveal-ready")
    const mutations = new MutationObserver(scan)
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
      observer.disconnect()
      mutations.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [pathname])

  return null
}
