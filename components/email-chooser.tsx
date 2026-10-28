"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy, Mail } from "lucide-react"

/**
 * A mailto link does nothing when the device has no default email app, which
 * is common in Chrome on Windows and on phones. This catches clicks on any
 * mailto link on the site and offers Gmail, Outlook, the email app or copying
 * the address, with the subject and body already filled in.
 */

type Open = { href: string; to: string; subject: string; body: string; top: number; left: number; anchor: HTMLAnchorElement }

const MENU_WIDTH = 264
const MENU_HEIGHT = 236

function parseMailto(href: string) {
  const url = new URL(href)
  return {
    to: decodeURIComponent(url.pathname),
    subject: url.searchParams.get("subject") ?? "",
    body: url.searchParams.get("body") ?? "",
  }
}

export function EmailChooser() {
  const [open, setOpen] = useState<Open | null>(null)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest?.('a[href^="mailto:"]') as HTMLAnchorElement | null
      if (!anchor || anchor.hasAttribute("data-email-direct")) return
      event.preventDefault()

      const rect = anchor.getBoundingClientRect()
      const left = Math.min(Math.max(rect.left, 12), window.innerWidth - MENU_WIDTH - 12)
      const below = rect.bottom + 8
      const top = below + MENU_HEIGHT > window.innerHeight ? Math.max(rect.top - 8 - MENU_HEIGHT, 12) : below
      setCopied(false)
      setOpen({ href: anchor.href, ...parseMailto(anchor.href), top, left, anchor })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  useEffect(() => {
    if (!open) return
    // preventScroll: a scroll would close the menu straight away
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true })

    const close = () => setOpen(null)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        open.anchor.focus()
        close()
      }
    }
    const onDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) close()
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onDown)
    window.addEventListener("resize", close)
    window.addEventListener("scroll", close, { passive: true })
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onDown)
      window.removeEventListener("resize", close)
      window.removeEventListener("scroll", close)
    }
  }, [open])

  if (!open) return null

  const q = encodeURIComponent
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${q(open.to)}&su=${q(open.subject)}&body=${q(open.body)}`
  const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${q(open.to)}&subject=${q(open.subject)}&body=${q(open.body)}`
  const item =
    "flex min-h-11 w-full items-center gap-3 rounded-[10px] px-3 text-left text-[15px] font-medium text-[#0A0A0A] hover:bg-[#F2F2F2] focus-visible:bg-[#F2F2F2] focus-visible:outline-none"

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(open.to)
      setCopied(true)
      window.setTimeout(() => setOpen(null), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-label={`Email ${open.to}`}
      style={{ top: open.top, left: open.left, width: MENU_WIDTH }}
      className="fixed z-[100] rounded-2xl border border-[#E6E6E6] bg-white p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.3)]"
    >
      <p className="px-3 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#5C5C5C]">Send with</p>
      <a href={gmail} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(null)} className={item}>
        <Mail className="h-4 w-4" aria-hidden="true" /> Gmail
      </a>
      <a href={outlook} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(null)} className={item}>
        <Mail className="h-4 w-4" aria-hidden="true" /> Outlook
      </a>
      <a href={open.href} data-email-direct onClick={() => setOpen(null)} className={item}>
        <Mail className="h-4 w-4" aria-hidden="true" /> Your email app
      </a>
      <button type="button" onClick={copy} className={item}>
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {copied ? "Copied" : "Copy address"}
      </button>
    </div>
  )
}
