"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

import { SmartLink } from "./smart-link"
import { LINKS, applyPrograms, navItems } from "./data"

const badge = (status: string) =>
  status === "OPEN"
    ? "bg-[#0A0A0A] text-white"
    : "border border-[#D4D4D4] text-[#5C5C5C]"

export function HomeHeader() {
  const [involvedOpen, setInvolvedOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setInvolvedOpen(false)
        setMobileOpen(false)
      }
    }
    const onClick = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setInvolvedOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [])

  const close = () => {
    setInvolvedOpen(false)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#E6E6E6] bg-white/90 backdrop-blur">
      <div ref={wrapRef} className="relative mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex min-h-11 items-center gap-2.5" aria-label="Dev Weekends home">
          <span className="text-[22px] font-bold tracking-[-0.03em]">Dev</span>
          <span className="border-[1.5px] border-[#0A0A0A] px-1.5 py-[3px] text-[11px] font-semibold tracking-[0.18em]">
            {"{WEEKENDS}"}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] font-medium md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-[#404040] transition-colors hover:text-black">
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            aria-expanded={involvedOpen}
            aria-controls="get-involved-menu"
            onClick={() => setInvolvedOpen((open) => !open)}
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[#0A0A0A] px-[18px] py-3 text-[15px] font-semibold text-white"
          >
            Get involved
            <ChevronDown className={`h-4 w-4 transition-transform ${involvedOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#E6E6E6] md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {involvedOpen && (
          <div
            id="get-involved-menu"
            className="absolute right-6 top-[68px] hidden w-[min(680px,calc(100%-48px))] overflow-hidden rounded-[18px] border border-[#E6E6E6] bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)] md:grid md:grid-cols-[1fr_1.1fr]"
          >
            <GetInvolvedPanel onNavigate={close} />
          </div>
        )}
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-[#E6E6E6] bg-white md:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-6 py-2 text-[17px] font-medium">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className="flex min-h-12 items-center border-b border-[#F0F0F0]">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="grid">
            <GetInvolvedPanel onNavigate={close} />
          </div>
        </div>
      )}
    </header>
  )
}

function GetInvolvedPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <>
      <div className="flex flex-col gap-2.5 bg-[#0A0A0A] p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">Join the community</p>
        <p className="text-xl font-semibold tracking-[-0.02em]">30,000+ engineers, one Discord away.</p>
        <p className="text-sm leading-[1.55] text-[#C7C7C7]">Sessions, circles, opportunities and people who have done it before.</p>
        <SmartLink
          href={LINKS.discord}
          onClick={onNavigate}
          className="mt-auto flex min-h-11 items-center justify-between rounded-[10px] bg-white px-4 py-3 text-[15px] font-semibold text-[#0A0A0A]"
        >
          Join on Discord <span aria-hidden="true">→</span>
        </SmartLink>
        <SmartLink href={LINKS.communities} onClick={onNavigate} className="inline-flex min-h-11 items-center text-sm text-white">
          All community links →
        </SmartLink>
      </div>
      <div className="px-3 py-4">
        <p className="mx-3 mb-1.5 mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Apply to a program</p>
        {applyPrograms.map((program) => (
          <SmartLink
            key={program.name}
            href={program.href}
            onClick={onNavigate}
            className="flex min-h-11 items-center justify-between gap-3 rounded-[10px] p-3 hover:bg-[#F7F7F7]"
          >
            <span>
              <span className="block text-[15px] font-semibold">{program.name}</span>
              <span className="mt-0.5 block text-[13px] text-[#5C5C5C]">{program.when}</span>
            </span>
            <span className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.1em] ${badge(program.status)}`}>
              {program.status}
            </span>
          </SmartLink>
        ))}
      </div>
    </>
  )
}
