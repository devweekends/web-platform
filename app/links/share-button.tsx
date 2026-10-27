"use client"

import { useState } from "react"
import { Check, Share2 } from "lucide-react"

export function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: "Dev Weekends", url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Share sheet dismissed or clipboard blocked; nothing to do.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#D4D4D4] px-7 py-4 text-base font-semibold text-[#0A0A0A] transition-colors hover:bg-[#F7F7F7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
    >
      {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Share2 className="h-5 w-5" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Link copied" : "Share this page"}</span>
    </button>
  )
}
