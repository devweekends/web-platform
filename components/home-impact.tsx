import { ArrowUpRight, Info } from "lucide-react"

import { SmartLink } from "@/components/home/smart-link"
import { Card, Eyebrow, Panel, Section, SectionHeading } from "@/components/site/page-kit"

/**
 * Impact block for /team. Two parts:
 * 1. "What our members went on to do": the outcomes that prove the value.
 * 2. "Value added to the economy": what those outcomes are worth in dollars.
 *
 * Every number lives in the arrays below, each with an `info` note that
 * shows on the (i) icon or under the number, so readers can see where it
 * comes from. Used only by app/team/page.tsx. Keep in sync with
 * app/dwosi/data.ts.
 */

type Stat = {
  value: string
  label: string
  info: string
  detail?: string
  href?: string
  cta?: string
}

const outcomes: Stat[] = [
  {
    value: "9",
    label: "Google Summer of Code 2026 selections",
    detail:
      "Up from 2 in 2025. This year's class is at Apache, NumFOCUS, EMBL-EBI, FLARE, BRL-CAD, FOSSASIA, Drupal, InVesalius and C2SI, plus 5 more in ESoC, SSoC and GSSoC.",
    href: "/blog/gsoc",
    cta: "Meet the 2026 class",
    info: "9 fellows selected for GSoC 2026 and 2 in 2025, counted from their public GSoC project pages. Earlier alumni went to Chromium, FOSSology and Python.",
  },
  {
    value: "1 + 1",
    label: "LFX Mentorship at the Linux Foundation",
    detail:
      "1 mentee this year: Talha Amjad at CNCF, building topology-aware GPU scheduling in Volcano. And 1 mentor before him: Yash Israni, who went from contributor to the other side of the table.",
    href: "/blog/lfx-mentorship-2026-talha-amjad",
    cta: "Read Talha's story",
    info: "Talha Amjad, mentee in LFX Mentorship 2026 Term 3, one of 59 CNCF projects accepted. Yash Israni, selected as an LFX mentor in the previous cohort.",
  },
  {
    value: "100+",
    label: "Remote placements",
    detail:
      "Engineers now working for Silicon Valley and billion-dollar companies, and for international teams through Upwork, Toptal, Turing, Arc and direct hires.",
    info: "Fellows and community members who reported an international remote role or contract to us after mentorship, mock interviews or referrals.",
  },
  {
    value: "20+",
    label: "Engineers at Turing and Scale AI",
    detail:
      "Vetted by Turing and matched with top AI labs for full-time remote work. Others joined Scale AI as competitive programmers, writing and solving hard algorithmic challenges used to train and test the world's top LLMs.",
    info: "20+ members passed Turing's vetting and worked full-time remote engagements of 3 to 4 months. Members at Scale AI worked on coding and reasoning problems for frontier AI labs.",
  },
  {
    value: "50+",
    label: "Top-rated freelancers",
    detail: "Members who built a profile, landed their first client and earned top-rated status on global freelance platforms.",
    info: "Members holding Top Rated or equivalent status on Upwork and similar platforms. 23 fellows started freelancing in the last cohort alone.",
  },
  {
    value: "5",
    label: "Startups born on weekends",
    detail: "Founded by members and mentored by our team, from first idea at a Tech Grind to real products with real users.",
    info: "Companies founded by members through the X Team builder community and 2-Day Startup weekends, with ongoing mentorship from the core team.",
  },
]

// Money our members earned because of the skills and referrals they picked
// up here. Every line is a conservative estimate from reported numbers.
const economy: Stat[] = [
  {
    value: "$1M+",
    label: "Earned on Upwork",
    info: "20 freelancers averaging about $50,000 in lifetime earnings each, with several past $100,000, $200,000 and $300,000.",
  },
  {
    value: "$250K+",
    label: "Earned at Turing and Scale AI",
    info: "20+ engineers on full-time Turing engagements of 3 to 4 months each, plus members paid by Scale AI for competitive programming challenges used to train and test top LLMs.",
  },
  {
    value: "$20K+",
    label: "Open source stipends",
    info: "11 Google Summer of Code stipends (9 in 2026, 2 in 2025) at about $1,500 each, plus the LFX Mentorship stipend.",
  },
  {
    value: "$1.3M+",
    label: "Remote salaries, every year",
    info: "50+ members in remote jobs paying $20,000 to $90,000 a year. The median is about $20,000, and 10 of them earn $50,000 to $90,000. This one recurs annually.",
  },
]

function InfoTip({ text, onDark = false, align = "right" }: { text: string; onDark?: boolean; align?: "left" | "right" }) {
  const button = onDark
    ? "border-[#3D3D3D] text-[#A3A3A3] hover:border-white hover:text-white focus-visible:outline-white"
    : "border-[#D4D4D4] text-[#5C5C5C] hover:border-[#0A0A0A] hover:text-[#0A0A0A] focus-visible:outline-[#0A0A0A]"
  const tip = onDark ? "bg-white text-[#0A0A0A]" : "bg-[#0A0A0A] text-white"
  return (
    <span className="group/tip inline-flex shrink-0">
      <button
        type="button"
        aria-label="How this number is counted"
        className={`relative inline-flex h-6 w-6 items-center justify-center rounded-full border transition-colors before:absolute before:-inset-2.5 before:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${button}`}
      >
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none absolute top-full z-20 mt-1 w-[min(16rem,calc(100vw-3rem))] rounded-xl p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal opacity-0 shadow-lg transition-opacity group-focus-within/tip:opacity-100 group-hover/tip:opacity-100 ${
          align === "right" ? "right-3" : "left-3"
        } ${tip}`}
      >
        {text}
      </span>
    </span>
  )
}

const lift = "relative motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)]"

export default function HomeImpact() {
  return (
    <>
      {/* Outcomes. Other pages link to /team#impact, so keep this id. */}
      <Section id="impact">
        <SectionHeading
          eyebrow="Proof, not promises"
          title="What our members went on to do"
          intro="Most of them started as confused students with no network and no resume worth reading. Here is where the weekends took them."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item) => (
            <Card key={item.label} tone="bordered" className={`gap-3 ${lift}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="text-[44px] font-semibold leading-none tracking-[-0.04em]">{item.value}</div>
                <InfoTip text={item.info} />
              </div>
              <h3 className="text-lg font-semibold leading-snug">{item.label}</h3>
              <p className="flex-1 text-[15px] leading-[1.65] text-[#404040]">{item.detail}</p>
              {item.href && (
                <SmartLink
                  href={item.href}
                  className="mt-2 inline-flex min-h-11 items-center gap-1 self-start text-[15px] font-semibold underline-offset-4 hover:underline"
                >
                  {item.cta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </SmartLink>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* Economic value: the first of two black panels on the page */}
      <Panel>
        <div id="economy" className="grid scroll-mt-24 grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow onDark>Value added to the economy</Eyebrow>
            <p className="mt-4 text-[clamp(56px,8vw,96px)] font-semibold leading-none tracking-[-0.045em]">$2.5M+</p>
            <h2 className="mt-4 text-[clamp(24px,2.6vw,32px)] font-semibold leading-tight tracking-[-0.03em]">
              earned by our members
            </h2>
            <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.65] text-[#C7C7C7]">
              Free mentorship is not charity when it turns into income. This is what the placements, stipends and freelance
              contracts on this page add up to, using conservative numbers our members reported back to us.
            </p>
            <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-[#A3A3A3]">
              Sum of the four lines on the right, rounded down. Remote salaries are counted for one year only, so the true figure
              grows every year.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {economy.map((e) => (
              <div key={e.label} className="rounded-[20px] bg-[#161616] p-6">
                <div className="text-[36px] font-semibold leading-none tracking-[-0.04em]">{e.value}</div>
                <h3 className="mt-3 text-base font-semibold">{e.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">{e.info}</p>
              </div>
            ))}
            <div className="relative rounded-[20px] bg-[#161616] p-6 sm:col-span-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Eyebrow onDark>Value added for companies</Eyebrow>
                  <div className="mt-3 text-[36px] font-semibold leading-none tracking-[-0.04em]">300+</div>
                  <h3 className="mt-3 text-base font-semibold">Placements in the local market</h3>
                </div>
                <InfoTip
                  onDark
                  text="Members hired by Pakistani software houses, startups and product companies after training here, counted from what they reported back to us."
                />
              </div>
              <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[#C7C7C7]">
                Engineers who trained here now build for companies across Pakistan. They arrive with shipped projects, reviewed
                code and interview practice already behind them, so teams spend less time on hiring and ramp-up and more time
                building.
              </p>
              <SmartLink
                href="/blog/fellowship-2026-by-the-numbers"
                className="mt-2 inline-flex min-h-11 items-center gap-1 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
              >
                Read the fellowship report
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </SmartLink>
            </div>
          </div>
        </div>
      </Panel>

    </>
  )
}
