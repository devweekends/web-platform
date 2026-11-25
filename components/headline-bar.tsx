'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type HeadlineMessage = {
  label: string
  text: string
  href: string
  /** Shown instead of `text` on phones, where the bar has one line */
  shortText?: string
  /** A second link beside the message, for example the partner's own page */
  secondary?: { label: string; href: string }
}

// Add an entry here to show a banner. Leave the array empty to hide the bar.
// Past entries, for reference:
//   { label: 'DSOC', text: 'DSOC 2026 applications are open now. Start your open source journey today.', href: '/dsoc' }
//   { label: 'Fellowship', text: 'Fellowship 2026 applications are now closed. See what comes next and how to stay involved.', href: '/blog/fellowship-2026-next-steps' }
const messages: HeadlineMessage[] = [
  {
    label: 'Coming soon',
    text: 'Qantara, the Palestinian AI Fellowship, is coming. We are excited to be a partner.',
    shortText: "Qantara is coming. We're excited!",
    href: '/qantara',
    secondary: { label: 'EmpactUs', href: 'https://empactus.org.uk/qantara-the-palestinian-ai-fellowship/' },
  },
]

/** One banner message: the main link, and an optional second link beside it */
function Row({ message, animation }: { message: HeadlineMessage; animation: string }) {
  return (
    <div
      className="absolute inset-x-4 flex items-center justify-center gap-3"
      style={{ animation: `${animation} 650ms ease-out both` }}
    >
      <Link href={message.href} className="flex items-center justify-center gap-2">
        <span
          className={`whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 uppercase text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-[#0A4A1D] shadow-sm ${message.secondary ? 'hidden sm:inline-block' : ''}`}
        >
          {message.label}
        </span>
        <span className="hidden lg:inline">{message.text}</span>
        <span className="whitespace-nowrap lg:hidden">{message.shortText ?? message.text}</span>
      </Link>
      {message.secondary && (
        <a
          href={message.secondary.href}
          target="_blank"
          rel="noopener"
          className="whitespace-nowrap font-bold underline underline-offset-4 decoration-white/60 hover:decoration-white"
        >
          {message.secondary.label} <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  )
}

export function HeadlineBar() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null)
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1)

  useEffect(() => {
    if (messages.length < 2) return
    const interval = window.setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex = (current + 1) % messages.length
        setLeavingIndex(current)
        setSlideDirection(current === 0 ? 1 : -1)

        window.setTimeout(() => {
          setLeavingIndex(null)
        }, 650)

        return nextIndex
      })
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  if (messages.length === 0) return null

  const activeMessage = messages[activeIndex]
  const leavingMessage = leavingIndex !== null ? messages[leavingIndex] : null
  const enteringAnimation = slideDirection === 1 ? 'headlineEnterFromLeft' : 'headlineEnterFromRight'
  const leavingAnimation = slideDirection === 1 ? 'headlineExitToRight' : 'headlineExitToLeft'

  return (
    <div className="w-full border-b border-white/20 bg-[linear-gradient(135deg,#0a4a1d_0%,#007622_100%)] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-10 items-center justify-center overflow-hidden py-2 text-center text-[11px] sm:text-sm font-semibold tracking-wide">
          {leavingMessage && (
            <Row key={`leaving-${leavingIndex}`} message={leavingMessage} animation={leavingAnimation} />
          )}

          <Row key={`active-${activeIndex}`} message={activeMessage} animation={enteringAnimation} />
        </div>
      </div>
      <style jsx global>{`
        @keyframes headlineEnterFromLeft {
          from {
            transform: translateX(-120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes headlineEnterFromRight {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes headlineExitToRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(120%);
            opacity: 0;
          }
        }

        @keyframes headlineExitToLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-120%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
