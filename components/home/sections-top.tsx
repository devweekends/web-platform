import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { CountUp } from "./count-up"
import { LogoMark } from "./logo-mark"
import { PartnersStrip } from "./partners-strip"
import { SmartLink } from "./smart-link"
import {
  LINKS,
  communityPartners,
  countries,
  type Org,
  impactBreakdown,
  outcomes,
  partners,
  placesLike,
  reach,
} from "./data"

const eyebrow = "text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]"
const h2 = "mt-3.5 text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em]"

const faces = [
  { src: "/saqlain.jpg", alt: "Muhammad Saqlain" },
  { src: "/salman.jpg", alt: "M Salman" },
  { src: "/shehroz.png", alt: "M Shehroz" },
  { src: "/usman.jpg", alt: "Usman Sheikh" },
]

export function Hero() {
  return (
    <section id="top" className="px-6 pt-2">
      <div className="mx-auto max-w-[1392px] overflow-hidden rounded-[28px] bg-[#0A0A0A] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-16 px-6 py-20 lg:py-24">
          <div className="min-w-0 flex-[1.1_1_520px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">A community, not just a classroom</p>
            <h1 className="dw-rise mt-6 text-[clamp(52px,6.4vw,92px)] font-semibold leading-none tracking-[-0.045em]">
              Great engineers.
              <br />
              <span className="text-[#8A8A8A]">Greater impact.</span>
            </h1>
            <p className="dw-rise-late mt-7 max-w-[52ch] text-[19px] leading-[1.65] text-[#C7C7C7]">
              Talent is everywhere. Opportunity should be too. Dev Weekends is a free community helping engineers learn, build and
              open doors to the world.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <SmartLink
                href={LINKS.discord}
                className="inline-flex min-h-[52px] items-center rounded-xl bg-white px-[26px] py-4 text-base font-semibold text-[#0A0A0A] transition-colors hover:bg-[#E6E6E6]"
              >
                Join the community
              </SmartLink>
              <SmartLink
                href="#get-involved"
                className="inline-flex min-h-[52px] items-center rounded-xl border border-[#3D3D3D] px-[26px] py-4 text-base font-medium transition-colors hover:bg-white/10"
              >
                Apply to a program
              </SmartLink>
            </div>
            <p className="mt-4 text-sm text-[#A3A3A3]">
              Representing a company, university or community?{" "}
              <a href="#partners" className="text-white underline underline-offset-4">
                Partner with us
              </a>
            </p>
            <div className="mt-11 flex items-center gap-4 border-t border-[#262626] pt-7">
              <div className="flex shrink-0" aria-hidden="true">
                {faces.map((face, index) => (
                  <Image
                    key={face.src}
                    src={face.src}
                    alt=""
                    width={40}
                    height={40}
                    className={`h-10 w-10 rounded-full border-2 border-[#0A0A0A] object-cover grayscale ${index > 0 ? "-ml-2.5" : ""}`}
                  />
                ))}
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold">30,000+ people. One shared purpose.</p>
                <p className="mt-0.5 text-sm text-[#A3A3A3]">From your first line of code to your next big leap.</p>
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-[1_1_440px]">
            <div className="group relative aspect-[5/4] overflow-hidden rounded-[20px] bg-[#1A1A1A]">
              <Image
                src="https://res.cloudinary.com/dcrgvq3lf/image/upload/v1748606356/about_img_lcygp4.jpg"
                alt="Dev Weekends community members at a live session"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                priority
                className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
              />
              <div className="absolute bottom-6 left-6 rounded-[14px] bg-white px-5 py-4 text-[#0A0A0A]">
                <p className="text-[15px] font-semibold">Built in Pakistan. Gone global.</p>
                <p className="mt-0.5 text-[13px] text-[#5C5C5C]">Members across 30 countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Reach() {
  return (
    <section aria-label="Reach">
      <div className="hm-marquee mt-6 overflow-hidden border-y border-[#E6E6E6] py-4" aria-hidden="true">
        <div className="hm-track">
          {[...countries, ...countries].map((name, index) => (
            <span key={`${name}-${index}`} className="whitespace-nowrap px-6 text-[13px] font-medium uppercase tracking-[0.14em] text-[#5C5C5C]">
              {name}
            </span>
          ))}
        </div>
      </div>
      <dl className="mx-auto grid max-w-[1200px] grid-cols-4 gap-x-3 px-6 py-12 md:gap-8 md:py-16">
        {reach.map((item) => (
          <div key={item.label} data-reveal className="flex min-w-0 flex-col-reverse gap-1.5 border-l border-[#E6E6E6] pl-3 md:pl-6">
            <dt className="text-[11px] leading-snug text-[#5C5C5C] sm:text-sm md:text-[15px]">{item.label}</dt>
            <dd className="text-[clamp(22px,6.4vw,48px)] font-semibold leading-none tracking-[-0.04em]">
              <CountUp value={item.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function Network() {
  return (
    <>
      <section id="partners-strip" aria-label="Partners and communities" className="pb-16 pt-6">
        <p className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Partners and communities</p>
        <div className="mt-8">
          <PartnersStrip partners={partners} communities={communityPartners} />
        </div>
        <p className="mt-7 text-center text-sm">
          <SmartLink href={LINKS.partners} className="font-semibold">
            See all partners →
          </SmartLink>
        </p>
      </section>

      <section aria-label="Where our community works" className="border-t border-[#E6E6E6]">
        <div className="mx-auto max-w-[1200px] px-6 py-[72px]">
          <p className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">
            Our community&apos;s journeys reach places like
          </p>
          <ul className="mx-auto mt-10 grid max-w-[1100px] grid-cols-4 gap-2 sm:gap-3 md:grid-cols-7">
            {placesLike.map((org) => (
              <li key={org.name} data-reveal>
                <OrgTile org={org} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

/** Logo tile for an organization. Falls back to the name when there is no logo. */
function OrgTile({ org }: { org: Org }) {
  const className =
    "group flex h-14 items-center justify-center overflow-hidden rounded-xl border border-[#E6E6E6] px-1.5 text-center text-[15px] font-semibold tracking-[-0.01em] text-[#8A8A8A] sm:h-20 sm:rounded-2xl sm:px-4"
  return (
    <SmartLink
      href={org.href}
      aria-label={org.name}
      className={`${className} transition duration-200 hover:border-[#0A0A0A] hover:text-[#0A0A0A] hover:shadow-[0_12px_26px_-16px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-0.5`}
      fallbackClassName={className}
    >
      <LogoMark org={org} compact />
    </SmartLink>
  )
}

export function Impact() {
  return (
    <section id="impact" className="px-6">
      <div data-reveal className="mx-auto max-w-[1392px] rounded-[28px] bg-[#0A0A0A] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-end gap-14 px-6 py-24">
          <div className="min-w-0 flex-[1.2_1_480px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">Value created</p>
            <p className="mt-5 text-[clamp(88px,12vw,176px)] font-semibold leading-[0.9] tracking-[-0.06em]">
              <CountUp value="$2.5M+" />
            </p>
            <p className="mt-5 max-w-[30ch] text-[22px] leading-[1.5] text-[#C7C7C7]">
              earned by our members. Free to join, life-changing to finish.
            </p>
          </div>
          <dl className="m-0 flex min-w-0 flex-[1_1_380px] flex-col">
            {impactBreakdown.map((item, index) => (
              <div
                key={item.label}
                className={`flex items-baseline justify-between gap-4 border-t border-[#262626] py-5 ${
                  index === impactBreakdown.length - 1 ? "border-b" : ""
                }`}
              >
                <dt className="text-[15px] text-[#A3A3A3]">{item.label}</dt>
                <dd className="text-[28px] font-semibold tracking-[-0.03em]">{item.value}</dd>
              </div>
            ))}
          </dl>
          <details className="group min-w-0 basis-full border-t border-[#262626] pt-2 text-white">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
              How we count these numbers
              <span aria-hidden="true" className="transition-transform group-open:rotate-90">→</span>
            </summary>
            <ul className="mt-2 grid grid-cols-1 gap-x-10 gap-y-4 pb-2 md:grid-cols-2">
              {impactBreakdown.map((item) => (
                <li key={item.label} className="text-sm leading-[1.6] text-[#A3A3A3]">
                  <span className="font-semibold text-white">{item.label}, {item.value}.</span> {item.info}
                </li>
              ))}
              <li className="text-sm leading-[1.6] text-[#A3A3A3]">
                The total is the sum of these lines, rounded down. Remote salaries are counted for one year only, so the real
                figure grows every year.
              </li>
            </ul>
          </details>
        </div>
      </div>
    </section>
  )
}

export function Outcomes() {
  return (
    <section>
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={eyebrow}>Outcomes</p>
            <h2 data-reveal className={h2}>
              Where the work led them.
            </h2>
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-3 border-l border-t border-[#E6E6E6] md:mt-14 xl:grid-cols-6">
          {outcomes.map((item) => (
            <li key={item.title} data-reveal className="flex min-w-0 flex-col gap-1.5 border-b border-r border-[#E6E6E6] p-3 transition-colors duration-200 hover:bg-[#FAFAFA] sm:gap-2.5 sm:p-6 lg:p-8 xl:p-5">
              <p className="text-[clamp(22px,6vw,44px)] font-semibold leading-none tracking-[-0.04em] xl:text-[36px]">{item.value}</p>
              <h3 className="text-[12px] font-semibold leading-snug sm:text-[17px] xl:text-[15px]">{item.title}</h3>
              <p className="text-[11px] leading-[1.45] text-[#5C5C5C] sm:text-[15px] sm:leading-[1.6] xl:text-[13px] xl:leading-[1.5]">{item.text}</p>
              {item.link && (
                <SmartLink href={item.link.href} className="mt-auto inline-flex min-h-11 items-center gap-1 pt-1 text-[11px] font-semibold sm:pt-2 sm:text-sm xl:text-[13px]">
                  {item.link.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </SmartLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
