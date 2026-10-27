import { ArrowUpRight } from "lucide-react"

import { SmartLink } from "./smart-link"
import { LogoMark } from "./logo-mark"
import { VoicesRail } from "./voices"
import {
  LINKS,
  mailto,
  partnerCards,
  qantaraPartners,
  qantaraStages,
  resourceGuides,
  resourcePosts,
} from "./data"

const eyebrow = "text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]"
const h2 = "mt-3.5 text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em]"

export function Qantara() {
  return (
    <section id="qantara" className="px-3 pt-4 sm:px-6 sm:pt-6">
      <div className="relative mx-auto max-w-[1392px] overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#0a4a1d_0%,#007622_100%)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle_at_center,transparent_0,transparent_26px,#fff_27px,#fff_29px,transparent_30px)] [background-size:64px_64px]"
        />
        <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-8 px-5 py-10 sm:gap-14 sm:px-6 sm:py-24">
          <div className="min-w-0 flex-[1.3_1_520px]">
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#CDE8D4]">
              <span aria-hidden="true" className="h-[3px] w-8 bg-[#F80000]" />A program we are proud of
            </p>
            <h2 className="mt-3 text-[clamp(38px,5.6vw,80px)] font-semibold leading-none tracking-[-0.045em]">
              Qantara
              <br />
              <span className="text-[#CDE8D4]">The Palestinian AI Fellowship.</span>
            </h2>
            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-[#E3F1E7] sm:mt-6 sm:text-[19px] sm:leading-[1.65]">
              Talent isn&apos;t the missing piece. The bridge is. A fully funded, six-month fellowship for Palestinian youth, with real
              mentors, real training and a path to a global career.
            </p>
            <p className="mt-3 text-[15px] text-[#CDE8D4] sm:mt-4">In partnership with EmpactUs.</p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <SmartLink
                href={LINKS.qantara}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-white px-[26px] py-4 text-base font-semibold text-[#0A4A1D] sm:w-auto"
              >
                Learn more and apply <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </SmartLink>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_360px]">
            <ul className="flex flex-col">
              {qantaraStages.map((stage, index) => (
                <li key={stage.name} className="flex items-baseline gap-4 border-t border-white/20 py-3.5 sm:gap-5 sm:py-5">
                  <span className="text-[13px] font-semibold text-[#CDE8D4]">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-base font-semibold sm:text-lg">{stage.name}</span>
                    <span className="mt-0.5 block text-sm text-[#CDE8D4] sm:mt-1 sm:text-[15px]">{stage.text}</span>
                  </span>
                </li>
              ))}
              <li className="flex items-baseline gap-4 border-y border-white/20 py-3.5 sm:gap-5 sm:py-5">
                <span className="text-[13px] font-semibold text-[#CDE8D4]">04</span>
                <span>
                  <span className="block text-base font-semibold sm:text-lg">Virtual Career Fair</span>
                  <span className="mt-0.5 block text-sm text-[#CDE8D4] sm:mt-1 sm:text-[15px]">Graduates meet employers who are hiring. $0 cost, with a monthly stipend.</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative mx-auto max-w-[1200px] border-t border-white/20 px-5 pb-8 pt-6 sm:px-6 sm:pb-14 sm:pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#CDE8D4]">Partners on Qantara</p>
          <ul className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            {qantaraPartners.map((partner) => (
              <li key={partner.name}>
                <SmartLink
                  href={partner.href}
                  aria-label={partner.name}
                  className="group flex h-12 min-w-0 items-center justify-center overflow-hidden rounded-xl bg-white px-2 text-[13px] sm:h-14 sm:min-w-[120px] sm:px-5 sm:text-[15px] font-semibold text-[#0A4A1D] transition duration-200 hover:ring-2 hover:ring-white/70 hover:shadow-[0_16px_32px_-14px_rgba(0,0,0,0.6)] motion-safe:hover:-translate-y-1"
                  fallbackClassName="flex h-12 min-w-0 items-center justify-center rounded-xl bg-white px-2 text-[13px] font-semibold text-[#0A4A1D] sm:h-14 sm:min-w-[120px] sm:px-5 sm:text-[15px]"
                >
                  <LogoMark org={partner} muted={false} compact />
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Partnerships() {
  return (
    <section id="partners" className="px-6 py-6">
      <div className="mx-auto max-w-[1392px] rounded-[28px] bg-[#0A0A0A] text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">Partnerships</p>
          <h2 className="mt-3.5 text-[clamp(44px,5.6vw,80px)] font-semibold leading-none tracking-[-0.045em]">Build the bridge with us.</h2>
          <p className="mt-6 max-w-[62ch] text-[19px] leading-[1.65] text-[#C7C7C7]">
            Great engineers grow up everywhere. The teams that need them cannot find them fast enough. Dev Weekends sits in the middle.
          </p>
          <ul className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
            {partnerCards.map((card) => (
              <li key={card.title} className="flex flex-col gap-3 rounded-[20px] bg-[#161616] p-8 transition-colors duration-200 hover:bg-[#1F1F1F]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">{card.label}</p>
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">{card.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[#C7C7C7]">{card.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
            <SmartLink
              href={mailto("Partnering with Dev Weekends")}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-white px-7 py-4 text-base font-semibold text-[#0A0A0A] transition-colors hover:bg-[#E6E6E6] sm:w-auto"
            >
              Start a partnership
            </SmartLink>
            <SmartLink
              href={mailto("Becoming a Dev Weekends mentor")}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl border border-[#3D3D3D] px-7 py-4 text-base font-semibold transition-colors hover:bg-white/10 sm:w-auto"
            >
              Become a mentor
            </SmartLink>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 sm:mt-0 sm:ml-2">
              <SmartLink href={LINKS.partners} className="inline-flex min-h-11 items-center text-[15px] text-[#C7C7C7] underline underline-offset-4">
                See our partners
              </SmartLink>
              <span className="text-[15px] text-[#A3A3A3]">{LINKS.email}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Resources() {
  return (
    <section id="resources" className="bg-[#F7F7F7]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <p className={eyebrow}>Resources</p>
        <h2 className={h2}>Learn with us, free.</h2>
        <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-[#5C5C5C]">
          Guides, courses and recordings from the community. Some live here, some on our other platforms.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <ResourceList title="Guides" items={resourceGuides} more={{ label: "All guides →", href: LINKS.guides }} />
          <ResourceList title="From the blog" items={resourcePosts} more={{ label: "All posts →", href: LINKS.blog }} />
          <div className="flex flex-col gap-3 sm:gap-5">
            <ResourceTile href={null} kicker="MindMaster · Invite only" title="Human skills" text="Courses coming soon on Buildment." dark />
            <ResourceTile href={LINKS.resources} kicker="Docs and courses ↗" title="Free learning hub" text="resources.devweekends.com: interview prep, sheets and curated learning." />
          </div>
          <div className="flex flex-col gap-3 sm:gap-5">
            <ResourceTile href={LINKS.youtube} kicker="YouTube ↗" title="300+ free videos" text="Sessions, talks and series, recorded." />
            <ResourceTile href={LINKS.github} kicker="GitHub ↗" title="Our open source code" text="Every Dev Weekends open source product, public." />
          </div>
        </div>
      </div>
    </section>
  )
}

function ResourceList({ title, items, more }: { title: string; items: { title: string; href: string }[]; more: { label: string; href: string } }) {
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-[16px] bg-white p-4 sm:gap-3 sm:rounded-[20px] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">{title}</p>
      {items.map((item) => (
        <SmartLink key={item.href} href={item.href} className="min-h-11 border-b border-[#E6E6E6] py-2.5 text-[13px] font-semibold leading-snug hover:text-[#404040] sm:py-3 sm:text-base">
          {item.title}
        </SmartLink>
      ))}
      <SmartLink href={more.href} className="mt-auto inline-flex min-h-11 items-center text-[13px] font-semibold sm:text-sm">
        {more.label}
      </SmartLink>
    </div>
  )
}

function ResourceTile({ href, kicker, title, text, dark }: { href: string | null; kicker: string; title: string; text: string; dark?: boolean }) {
  return (
    <SmartLink
      href={href}
      className={`flex min-w-0 flex-1 flex-col gap-1.5 rounded-[16px] p-4 transition duration-200 sm:gap-2 sm:rounded-[20px] sm:p-7 ${href ? "hover:shadow-[0_18px_36px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-0.5" : ""} ${dark ? "bg-[#0A0A0A] text-white" : "bg-white"}`}
    >
      <span className={`text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.14em] ${dark ? "text-[#A3A3A3]" : "text-[#5C5C5C]"}`}>{kicker}</span>
      <span className="break-words text-base font-semibold leading-snug tracking-[-0.02em] sm:text-xl">{title}</span>
      <span className={`break-words text-xs leading-[1.5] sm:text-sm sm:leading-[1.55] ${dark ? "text-[#C7C7C7]" : "text-[#5C5C5C]"}`}>{text}</span>
    </SmartLink>
  )
}

export function Voices() {
  return (
    <section id="voices" className="py-20">
      <VoicesRail />
    </section>
  )
}


