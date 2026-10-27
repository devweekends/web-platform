"use client"

import { useState } from "react"
import { Eye } from "lucide-react"

import { SmartLink } from "@/components/home/smart-link"
import { LINKS, applyPrograms, startPaths } from "@/components/home/data"

const statusClass = (status: string) =>
  status === "OPEN" ? "bg-[#0A0A0A] text-white" : "border border-[#D4D4D4] text-[#5C5C5C]"

/**
 * "Start where you are": the one place to join or apply. A visitor picks who
 * they are and sees their own way in. Paths and programs come from
 * components/home/data.ts, so adding a program there updates every page.
 * On phones the choices are a swipeable row of large chips and the actions
 * are full-width, so the choice and the next step fit in one thumb reach.
 */
export function StartHere() {
  const [selected, setSelected] = useState(startPaths[0].id)
  const path = startPaths.find((p) => p.id === selected) ?? startPaths[0]

  return (
    <section id="get-involved" className="scroll-mt-24 border-t border-[#E6E6E6] bg-[#F7F7F7]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Get involved</p>
        <h2 className="mt-3.5 text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em]">
          Start where you are. <span className="text-[#8A8A8A]">Who are you?</span>
        </h2>

        <div
          role="tablist"
          aria-label="Who are you"
          className="-mx-6 mt-8 flex snap-x scroll-px-6 gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {startPaths.map((p) => {
            const active = p.id === selected
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`start-tab-${p.id}`}
                aria-selected={active}
                aria-controls="start-panel"
                onClick={() => setSelected(p.id)}
                className={`min-h-12 shrink-0 snap-start whitespace-nowrap rounded-full border px-5 text-[15px] font-semibold transition-colors ${
                  active
                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                    : "border-[#D4D4D4] bg-white text-[#0A0A0A] hover:border-[#0A0A0A]"
                }`}
              >
                {p.label}
              </button>
            )
          })}
        </div>

        <div
          id="start-panel"
          role="tabpanel"
          aria-labelledby={`start-tab-${path.id}`}
          className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12"
        >
          <div className="flex flex-col gap-4 rounded-[20px] bg-[#0A0A0A] p-6 text-white sm:p-9 lg:col-span-5">
            <h3 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[32px]">{path.heading}</h3>
            <p className="text-[15px] leading-[1.6] text-[#C7C7C7]">{path.text}</p>
            <div className="mt-2 flex flex-col gap-3">
              {path.actions.map((action, index) => (
                <SmartLink
                  key={action.label}
                  href={action.href}
                  className={`flex min-h-[52px] items-center justify-between rounded-xl px-5 py-4 text-base font-semibold transition-colors ${
                    index === 0 ? "bg-white text-[#0A0A0A] hover:bg-[#E6E6E6]" : "border border-[#404040] text-white hover:bg-[#161616]"
                  }`}
                >
                  {action.label} <span aria-hidden="true">→</span>
                </SmartLink>
              ))}
            </div>
          </div>

          <div className="min-w-0 rounded-[20px] border border-[#E6E6E6] bg-white p-5 sm:p-9 lg:col-span-7">
            {path.showPrograms ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Apply to a program</p>
                <ul className="mt-3">
                  {applyPrograms.map((program) => (
                    <li key={program.name} className="border-b border-[#E6E6E6] last:border-b-0">
                      <SmartLink href={program.href} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4 hover:bg-[#FAFAFA]">
                        <span className="min-w-0 flex-1 basis-[200px]">
                          <span className="block text-base font-semibold sm:text-lg">{program.name}</span>
                          <span className="mt-0.5 block text-sm text-[#5C5C5C]">{program.when}</span>
                        </span>
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.1em] ${statusClass(program.status)}`}
                        >
                          {program.status}
                        </span>
                        {program.status === "CLOSED" ? (
                          // Closed programs still have a page worth reading: say so
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5C5C5C]">
                            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                            View details →
                          </span>
                        ) : (
                          <span className="text-sm font-semibold">{program.cta} →</span>
                        )}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-[1.55] text-[#5C5C5C]">
                  Fellowship and DSOC run in seasons. Closed programs show what is next. Everything else is open all year.
                </p>
              </>
            ) : (
              <div className="flex h-full flex-col justify-between gap-6">
                <p className="text-[19px] leading-[1.6] text-[#262626]">{path.detail}</p>
                <SmartLink href={LINKS.communities} className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
                  Or see all our community links
                </SmartLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
