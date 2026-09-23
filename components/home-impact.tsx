import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Info } from "lucide-react";

/**
 * Homepage impact block. Three parts:
 * 1. "What our members went on to do": the outcomes that prove the value.
 * 2. "Value added to the economy": what those outcomes are worth in dollars.
 * 3. "One of the best engineering communities in Pakistan": scale numbers
 *    plus what an AI assistant says when a student asks where to go.
 *
 * Every number lives in the arrays below, each with an `info` note that
 * shows on the (i) icon so readers can see where it comes from.
 */

type Stat = {
  value: string;
  label: string;
  info: string;
  detail?: string;
  href?: string;
  cta?: string;
};

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
    detail:
      "Members who built a profile, landed their first client and earned top-rated status on global freelance platforms.",
    info: "Members holding Top Rated or equivalent status on Upwork and similar platforms. 23 fellows started freelancing in the last cohort alone.",
  },
  {
    value: "5",
    label: "Startups born on weekends",
    detail:
      "Founded by members and mentored by our team, from first idea at a Tech Grind to real products with real users.",
    info: "Companies founded by members through the X Team builder community and 2-Day Startup weekends, with ongoing mentorship from the core team.",
  },
];

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
];

const scale: Stat[] = [
  {
    value: "30K+",
    label: "Community members",
    info: "Across Discord, WhatsApp, LinkedIn, YouTube, Instagram and Facebook, deduplicated where we can.",
  },
  {
    value: "60+",
    label: "Active channels",
    info: "60+ WhatsApp groups for placement, MERN, competitive programming and mock interviews, plus a 2,800+ member Discord.",
  },
  {
    value: "6",
    label: "Specialized communities",
    info: "Fellowship, Mentorship, DSoC (our summer of code), Open Source Prep, MindMaster, and X Team for builders and founders.",
  },
  {
    value: "30+",
    label: "Countries reached",
    info: "Fellowship 2026 selected fellows from 30 countries. 179 of the 1,072 fellows are outside Pakistan.",
  },
  {
    value: "222",
    label: "Universities",
    info: "Universities represented in the Fellowship 2026 cohort, with campuses merged.",
  },
  {
    value: "3,000+",
    label: "Fellowship applicants",
    info: "Applications received for Fellowship 2026. 1,072 were selected, about 36 percent.",
  },
  {
    value: "1,000+",
    label: "Engineers trained",
    info: "Fellows who completed a full cohort, across all cohorts since 2018.",
  },
  {
    value: "100%",
    label: "Free, forever",
    info: "No fees, no paid tiers. Mentors volunteer 10 to 15 hours a week.",
  },
];

// Verbatim answers from AI assistants, captured on the date shown.
// Only add an entry here when you have the exact text and a screenshot.
const aiMentions = [
  {
    source: "ChatGPT",
    date: "23 September 2026",
    prompt:
      "I am a CS student in Pakistan with no network. Which communities offer free mentorship to help me get into Google Summer of Code, LFX, or remote jobs?",
    quote:
      "My first choice for your specific situation would be Dev Weekends. There is unusually strong evidence behind that recommendation: public accounts from 2026 participants report 7 GSoC selections from the Dev Weekends community in 2026, versus 2 in 2025, and describe its mentorship as free and structured.",
    // Drop a screenshot at public/images/ai-chatgpt-dev-weekends.png and
    // set `image` to "/images/ai-chatgpt-dev-weekends.png" to show it.
    image: "",
    imageAlt:
      "Screenshot of ChatGPT recommending Dev Weekends as its first choice for a CS student in Pakistan",
  },
];

function InfoTip({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <span className="relative inline-flex group/tip">
      <button
        type="button"
        aria-label="How this number is counted"
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
          dark
            ? "border-background/30 text-background/60 hover:text-background hover:border-background"
            : "border-foreground/25 text-foreground/50 hover:text-foreground hover:border-foreground"
        }`}
      >
        <Info className="h-3 w-3" />
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none absolute right-0 top-full z-20 mt-2 w-64 p-3 text-xs leading-relaxed normal-case tracking-normal font-normal text-left opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 ${
          dark
            ? "bg-background text-foreground"
            : "bg-foreground text-background"
        }`}
      >
        {text}
      </span>
    </span>
  );
}

export default function HomeImpact() {
  return (
    <>
      {/* Outcomes */}
      <section id="impact" className="py-12 md:py-16 px-6 lg:px-12 bg-background">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12 reveal">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-4">
              Proof, not promises
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight mb-5">
              What our members went on to do
            </h2>
            <p className="text-base text-muted-foreground max-w-[560px] mx-auto">
              Most of them started as confused students with no network and no
              resume worth reading. Here is where the weekends took them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border">
            {outcomes.map((item) => (
              <div
                key={item.label}
                className="group relative bg-background p-7 md:p-8 flex flex-col gap-3 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-4xl md:text-5xl font-bold tracking-tight">
                    {item.value}
                  </div>
                  <InfoTip text={item.info} />
                </div>
                <div className="text-lg font-semibold leading-snug">
                  {item.label}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.detail}
                </p>
                {item.href && (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm font-medium mt-2"
                  >
                    {item.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economic value */}
      <section id="economy" className="py-12 md:py-16 px-6 lg:px-12 bg-muted/20">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-4">
                Value added to the economy
              </p>
              <div className="flex items-start gap-3">
                <h2 className="text-[clamp(40px,7vw,80px)] font-bold tracking-tight leading-none">
                  $2.5M+
                </h2>
                <InfoTip text="Sum of the four lines on the right, rounded down. Remote salaries are counted for one year only, so the true figure grows every year." />
              </div>
              <p className="text-lg font-semibold mt-3 mb-4">
                earned by our members and brought home to Pakistan
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-[460px]">
                Free mentorship is not charity when it turns into income. This
                is what the placements, stipends and freelance contracts on this
                page add up to, using conservative numbers our members reported
                back to us.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-border border">
              {economy.map((e) => (
                <div key={e.label} className="bg-background p-6 md:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-3xl md:text-4xl font-bold tracking-tight">
                      {e.value}
                    </div>
                    <InfoTip text={e.info} />
                  </div>
                  <div className="text-sm font-semibold mt-2">{e.label}</div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {e.info}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* For companies: local market placements */}
          <div className="mt-10 border bg-background p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4">
              <p className="text-[11px] font-semibold tracking-[3px] uppercase text-muted-foreground mb-3">
                Value added for companies
              </p>
              <div className="flex items-start gap-3">
                <div className="text-4xl md:text-5xl font-bold tracking-tight">
                  300+
                </div>
                <InfoTip text="Members hired by Pakistani software houses, startups and product companies after training here, counted from what they reported back to us." />
              </div>
              <div className="text-sm font-semibold mt-1">
                Placements in the local market
              </div>
            </div>
            <div className="md:col-span-8">
              <p className="text-muted-foreground leading-relaxed">
                Engineers who trained here now build for companies across Pakistan.
                They arrive with shipped projects, reviewed code and interview
                practice already behind them, so teams spend less time on hiring
                and ramp-up and more time building.
              </p>
              <Link
                href="/blog/fellowship-2026-by-the-numbers"
                className="inline-flex items-center gap-1 text-sm font-medium mt-4 group"
              >
                Read the fellowship report
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scale + AI mentions */}
      <section id="scale" className="py-12 md:py-16 px-6 lg:px-12 bg-foreground text-background">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-[11px] font-semibold tracking-[3px] uppercase text-background/60">
                Why people call us one of the best
              </p>
              <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight">
                One of the best software engineering communities in Pakistan
              </h2>
              <p className="text-background/70 md:text-lg leading-relaxed">
                Not because we say so. Because of who shows up, and where they
                end up. More than 3,000 students applied to a single fellowship
                cohort this year, from 222 universities across 30 countries,
                and every session, review and mock interview is still free.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-[1px] bg-background/15 border border-background/15">
                {scale.map((s) => (
                  <div key={s.label} className="bg-foreground p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-2xl md:text-3xl font-bold tracking-tighter">
                        {s.value}
                      </div>
                      <InfoTip text={s.info} dark />
                    </div>
                    <div className="text-xs md:text-sm text-background/60 mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <p className="text-[11px] font-semibold tracking-[3px] uppercase text-background/60">
                Ask an AI assistant
              </p>
              {aiMentions.map((m) => (
                <figure
                  key={m.source}
                  className="border border-background/15 bg-background/[0.04]"
                >
                  <div className="p-6 md:p-8">
                    <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
                      <span className="text-lg font-semibold">{m.source}</span>
                      <span className="text-xs text-background/50">{m.date}</span>
                    </figcaption>
                    <p className="text-xs text-background/50 mb-4">
                      We asked: &ldquo;{m.prompt}&rdquo;
                    </p>
                    <blockquote className="text-base md:text-lg leading-relaxed text-background/85">
                      &ldquo;{m.quote}&rdquo;
                    </blockquote>
                  </div>
                  {m.image && (
                    <div className="relative aspect-[800/127] border-t border-background/15 bg-white">
                      <Image
                        src={m.image}
                        alt={m.imageAlt}
                        fill
                        className="object-contain"
                        sizes="(min-width: 1024px) 640px, 100vw"
                      />
                    </div>
                  )}
                </figure>
              ))}
              <p className="text-xs text-background/45">
                Quoted word for word from the assistant named, on the date
                shown. Answers change over time, so ask it yourself.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
