"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

/**
 * Short welcome notice for the mentorship page. Opens on load and can be closed
 * with the button, the Continue action, the backdrop or the Escape key.
 */
export function MentorshipDialog() {
  const [open, setOpen] = useState(true)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#0A0A0A]/50" onClick={() => setOpen(false)} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentorship-dialog-title"
        className="relative w-full max-w-md rounded-[28px] bg-white p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#5C5C5C] hover:bg-[#F7F7F7] hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="pr-12 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">100% free, no hidden costs</p>
        <h2 id="mentorship-dialog-title" className="mt-3 pr-10 text-[28px] font-semibold leading-tight tracking-[-0.03em]">
          3-month mentorship program
        </h2>
        <ul className="mt-5 space-y-2.5 text-[15px] leading-[1.55] text-[#404040]">
          <li>20 live interactive sessions with industry experts</li>
          <li>A personal mentor for your entire journey</li>
          <li>Job placement assistance and industry referrals</li>
          <li>Selection is based on commitment and passion to learn. Seats are limited.</li>
        </ul>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#0A0A0A] px-7 text-base font-semibold text-white transition-colors hover:bg-[#262626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
