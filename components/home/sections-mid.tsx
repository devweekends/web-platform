import { ArrowUpRight } from "lucide-react"

import { Slider } from "@/components/site/slider"
import { SmartLink } from "./smart-link"
import {
  LINKS,
  circles,
  platforms,
  products,
  programs,
} from "./data"

const eyebrow = "text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]"
const h2 = "mt-3.5 text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em]"

export function Programs() {
  return (
    <section id="programs" className="bg-[#F7F7F7]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
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

        <div className="mt-14">
          <Slider label="Programs" itemClassName="w-[300px] sm:w-[340px] lg:w-[calc((100%-2rem)/3)]">
          {programs.map((program) => (
            <article key={program.name} className="flex min-h-[320px] w-full flex-col rounded-[20px] bg-white p-8 transition duration-200 hover:shadow-[0_22px_44px_-26px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1">
              <p className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">
                {program.label}
                {"tag" in program && program.tag && (
                  <span className="rounded-full border border-[#D4D4D4] px-2.5 py-0.5 text-[11px] tracking-[0.1em]">{program.tag}</span>
                )}
              </p>
              <h3 className="mt-3.5 text-[22px] font-semibold tracking-[-0.02em]">{program.name}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-[#5C5C5C]">{program.text}</p>
              <SmartLink
                href={program.link.href}
                className="mt-auto inline-flex min-h-11 items-end pt-5 text-[15px] font-semibold"
                fallbackClassName="mt-auto inline-flex min-h-11 items-end pt-5 text-[15px] font-medium text-[#5C5C5C]"
              >
                {program.link.label}
                {program.link.href && " →"}
              </SmartLink>
            </article>
          ))}
          </Slider>
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
      <div className="mx-auto max-w-[1200px] px-6 pt-16">
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
        <div className="mt-10">
          <Slider label="Products" itemClassName="w-[270px]">
          {products.map((product) => (
            <div key={product.name} className="w-full rounded-[20px] border border-[#E6E6E6]">
              <SmartLink
                href={product.href}
                className="flex h-full min-h-[170px] flex-col gap-1.5 rounded-[20px] p-6 hover:bg-[#FAFAFA]"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold">{product.name}</span>
                  <span className="whitespace-nowrap rounded-full border border-[#D4D4D4] px-2 py-[3px] text-[11px] font-semibold tracking-[0.1em] text-[#5C5C5C]">
                    {product.soon ? "COMING SOON" : product.tag}
                  </span>
                </span>
                <span className="text-sm leading-[1.55] text-[#5C5C5C]">{product.text}</span>
              </SmartLink>
            </div>
          ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export function Communities() {
  return (
    <section id="communities" className="border-t border-[#E6E6E6]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-14 px-6 py-20">
        <div className="min-w-0 flex-[1_1_320px]">
          <p className={eyebrow}>Communities</p>
          <h2 className={h2}>Specialized communities within.</h2>
          <p className="mt-[18px] text-[17px] leading-[1.6] text-[#5C5C5C]">
            Smaller circles, each with its own focus and people. Find yours on our community page.
          </p>
          <SmartLink
            href={LINKS.communities}
            className="mt-7 inline-flex min-h-[52px] items-center rounded-xl bg-[#0A0A0A] px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#262626]"
          >
            Find your community
          </SmartLink>
        </div>
        <ul className="grid min-w-0 flex-[1.6_1_560px] grid-cols-3 gap-2 sm:gap-3">
          {circles.map((circle) => (
            <li key={circle.name} className="flex">
              <SmartLink
                href={circle.href}
                className="flex w-full min-w-0 flex-col gap-1 rounded-xl border border-[#E6E6E6] p-2.5 transition duration-200 hover:border-[#0A0A0A] sm:rounded-2xl sm:p-4"
                fallbackClassName="flex w-full min-w-0 flex-col gap-1 rounded-xl border border-[#E6E6E6] p-2.5 text-[#5C5C5C] sm:rounded-2xl sm:p-4"
              >
                <span className="text-[12px] font-semibold leading-snug sm:text-[17px]">{circle.name}</span>
                {circle.note && (
                  <span className="w-fit rounded-full border border-[#D4D4D4] px-1.5 py-px text-[9px] font-semibold tracking-[0.06em] text-[#5C5C5C] sm:px-2 sm:py-0.5 sm:text-[11px]">
                    {circle.note.toUpperCase()}
                  </span>
                )}
                <span className="text-[11px] leading-[1.4] text-[#5C5C5C] sm:text-sm">{circle.text}</span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
