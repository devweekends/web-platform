import { ArrowUpRight } from "lucide-react"

import { SmartLink } from "./smart-link"
import {
  LINKS,
  circles,
  fellowshipPerks,
  fellowshipSteps,
  platforms,
  products,
  programs,
} from "./data"

const eyebrow = "text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]"
const h2 = "mt-3.5 text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em]"

export function Programs() {
  return (
    <section id="programs" className="bg-[#F7F7F7]">
      <div className="mx-auto max-w-[1200px] px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={eyebrow}>Programs</p>
            <h2 className={h2}>
              Different paths. <span className="text-[#8A8A8A]">One purpose.</span>
            </h2>
          </div>
          <a href="#get-involved" className="inline-flex min-h-11 items-center text-[15px] font-semibold">
            Explore all opportunities →
          </a>
        </div>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {programs.map((program) => (
            <article key={program.name} className="flex min-h-[320px] flex-col rounded-[20px] bg-white p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">{program.label}</p>
              <h3 className="mt-3.5 text-[22px] font-semibold tracking-[-0.02em]">{program.name}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-[#5C5C5C]">{program.text}</p>
              <SmartLink href={program.link.href} className="mt-auto inline-flex min-h-11 items-end pt-5 text-[15px] font-semibold">
                {program.link.label} →
              </SmartLink>
            </article>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-8 rounded-[20px] bg-[#0A0A0A] p-8 text-white">
          <div className="min-w-0 flex-[1_1_280px]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">Built by us, run on our own platforms</p>
            <p className="mt-2.5 text-[22px] font-semibold tracking-[-0.02em]">Every program runs on tools our community builds.</p>
          </div>
          {platforms.map((platform) => (
            <SmartLink
              key={platform.name}
              href={platform.href}
              className="flex min-w-0 flex-[1_1_260px] flex-col gap-1 rounded-2xl border border-[#2A2A2A] px-[22px] py-5 hover:border-[#5A5A5A]"
              fallbackClassName="flex min-w-0 flex-[1_1_260px] flex-col gap-1 rounded-2xl border border-[#2A2A2A] px-[22px] py-5"
            >
              <span className="flex items-center justify-between text-lg font-semibold">
                {platform.name}
                {platform.href ? (
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <span className="rounded-full border border-[#3D3D3D] px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.1em] text-[#A3A3A3]">SOON</span>
                )}
              </span>
              <span className="text-sm text-[#C7C7C7]">{platform.text}</span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Products() {
  return (
    <section aria-label="Products we build">
      <div className="mx-auto max-w-[1200px] px-6 pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={eyebrow}>Built in the open</p>
            <h2 className="mt-3.5 max-w-[22ch] text-[clamp(32px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.035em]">
              Products we build, and tools we give the community for free.
            </h2>
          </div>
          <SmartLink href={LINKS.dwosi} className="inline-flex min-h-11 items-center text-[15px] font-semibold">
            See DWOSI, our open source initiative →
          </SmartLink>
        </div>
        <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border-l border-t border-[#E6E6E6]">
          {products.map((product) => (
            <li key={product.name} className="border-b border-r border-[#E6E6E6]">
              <SmartLink
                href={product.href}
                className="flex min-h-[150px] flex-col gap-1.5 p-6 hover:bg-[#FAFAFA]"
                fallbackClassName="flex min-h-[150px] flex-col gap-1.5 p-6"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold">{product.name}</span>
                  <span className="whitespace-nowrap rounded-full border border-[#D4D4D4] px-2 py-[3px] text-[11px] font-semibold tracking-[0.1em] text-[#5C5C5C]">
                    {product.href ? product.tag : "COMING SOON"}
                  </span>
                </span>
                <span className="text-sm leading-[1.55] text-[#5C5C5C]">{product.text}</span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Fellowship() {
  return (
    <section>
      <div className="mx-auto max-w-[1200px] px-6 py-28">
        <p className={eyebrow}>The Fellowship</p>
        <h2 className={`${h2} max-w-[16ch]`}>Structure does what motivation can&apos;t.</h2>
        <ol className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-8">
          {fellowshipSteps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-[#0A0A0A] pt-5">
              <p className="text-[13px] font-semibold text-[#8A8A8A]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-[19px] font-semibold">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-[#5C5C5C]">{step.text}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {fellowshipPerks.map((perk) => (
            <li key={perk.title} className="rounded-2xl bg-[#F7F7F7] p-7">
              <h3 className="text-[17px] font-semibold">{perk.title}</h3>
              <p className="mt-2 text-[15px] text-[#5C5C5C]">{perk.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-7 text-[15px] font-semibold">
          <SmartLink href={LINKS.fellowship} className="inline-flex min-h-11 items-center">
            See the fellowship →
          </SmartLink>
          <SmartLink href={LINKS.fellowshipReport} className="inline-flex min-h-11 items-center">
            Read the 2026 report: 3,000+ applied, 1,072 selected →
          </SmartLink>
        </div>
      </div>
    </section>
  )
}

export function Communities() {
  return (
    <section id="communities" className="border-t border-[#E6E6E6]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-14 px-6 py-28">
        <div className="min-w-0 flex-[1_1_320px]">
          <p className={eyebrow}>Communities</p>
          <h2 className={h2}>Specialized communities within.</h2>
          <p className="mt-[18px] text-[17px] leading-[1.6] text-[#5C5C5C]">
            Smaller circles, each with its own focus and people. Find yours on our community page.
          </p>
          <SmartLink
            href={LINKS.communities}
            className="mt-7 inline-flex min-h-[52px] items-center rounded-xl bg-[#0A0A0A] px-6 py-4 text-[15px] font-semibold text-white"
          >
            Find your community
          </SmartLink>
        </div>
        <ul className="grid min-w-0 flex-[1.6_1_560px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8 border-t border-[#E6E6E6]">
          {circles.map((circle) => (
            <li key={circle.name} className="border-b border-[#E6E6E6]">
              <SmartLink
                href={circle.href}
                className="flex min-h-[72px] flex-col gap-1 py-[18px] hover:text-black"
                fallbackClassName="flex min-h-[72px] flex-col gap-1 py-[18px] text-[#5C5C5C]"
              >
                <span className="flex items-center justify-between gap-3 text-[17px] font-semibold">
                  {circle.name}
                  {circle.note && (
                    <span className="whitespace-nowrap rounded-full border border-[#D4D4D4] px-2 py-0.5 text-[11px] font-semibold tracking-[0.08em] text-[#5C5C5C]">
                      {circle.note.toUpperCase()}
                    </span>
                  )}
                </span>
                <span className="text-sm text-[#5C5C5C]">{circle.text}</span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
