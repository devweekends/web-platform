import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { BrandLogo } from "@/components/home/brand-logo"
import { LINKS, qantaraPartners, qantaraStages } from "@/components/home/data"
import { LogoMark } from "@/components/home/logo-mark"
import { SmartLink } from "@/components/home/smart-link"
import { Card, Eyebrow, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit"
import { withSocial } from "@/lib/seo"

export const metadata = withSocial({
  alternates: { canonical: "/qantara" },
  title: "Qantara: The Palestinian AI Fellowship",
  description:
    "Qantara is a fully funded, six-month AI fellowship for engineers in Gaza, run with EmpactUs and partners. $0 cost, a $300 monthly stipend, a laptop if needed and a virtual career fair. Dev Weekends is proud to be a partner.",
})

const facts = [
  { value: "$0", label: "Cost to fellows, ever" },
  { value: "$300", label: "Monthly stipend" },
  { value: "6 months", label: "Of mentored learning and building" },
  { value: "Laptop", label: "Provided if a fellow does not have one" },
]

const whoCanApply = [
  "You live in Gaza, Palestine.",
  "You can hold a conversation in English.",
  "You are between 18 and 30.",
  "You are a student or an early-career engineer. Self-taught counts.",
  "You are willing to pay it forward one day.",
]

const months = [
  {
    label: "Months 1 to 3",
    title: "Guided learning",
    text: "Foundation, structure, then the frontier: from JavaScript, React and Node.js, through cloud and DevOps, to LLMs and AI agents.",
  },
  {
    label: "Months 4 to 6",
    title: "An AI project of your own",
    text: "Each fellow builds and deploys an individual AI project with a mentor, and keeps writing about what they learn.",
  },
  {
    label: "Month 6",
    title: "Ready for the world",
    text: "Interview preparation, a reviewed CV and LinkedIn profile, and applications, then a virtual career fair where employers meet the graduates.",
  },
]

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"

/** Link to EmpactUs. A plain anchor on purpose: it opens a new tab and keeps the referrer for EmpactUs. */
function EmpactUsLink({ href = LINKS.qantara, className, children }: { href?: string; className: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {children}
    </a>
  )
}

export default function QantaraPage() {
  return (
    <>
      <PageHero
        eyebrow="Coming soon"
        title="Qantara, the Palestinian AI Fellowship."
        intro={
          <>
            Talent isn&apos;t the missing piece. The bridge is. Qantara is a fully funded, six-month fellowship for engineers in
            Gaza, run by{" "}
            <EmpactUsLink href="https://empactus.org.uk" className={`font-semibold text-[#0A0A0A] underline underline-offset-4 ${focusRing}`}>
              EmpactUs
            </EmpactUsLink>{" "}
            with partners. We are excited about it, and proud to be one of them.
          </>
        }
        actions={
          <>
            <EmpactUsLink
              className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0A0A0A] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-[#262626] ${focusRing}`}
            >
              Read the full details on EmpactUs <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </EmpactUsLink>
            <SmartLink
              href="#how-it-works"
              className={`inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[#D4D4D4] px-7 py-4 text-base font-semibold text-[#0A0A0A] transition-colors hover:bg-[#F7F7F7] ${focusRing}`}
            >
              See how it works
            </SmartLink>
          </>
        }
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <ul className="grid grid-cols-2 gap-4 sm:gap-5">
            {facts.map((fact) => (
              <li key={fact.value} data-reveal className="rounded-[20px] border border-[#E6E6E6] p-6">
                <p className="text-[clamp(30px,4vw,48px)] font-semibold leading-none tracking-[-0.04em]">{fact.value}</p>
                <p className="mt-3 text-[15px] leading-[1.5] text-[#5C5C5C]">{fact.label}</p>
              </li>
            ))}
          </ul>
          <Image
            src="/qantara/qantara-mark.png"
            alt="Qantara logo"
            width={240}
            height={275}
            priority
            className="mx-auto h-auto w-40 sm:w-52 lg:w-60"
          />
        </div>
      </Section>

      <Section id="how-it-works" tone="gray">
        <SectionHeading
          eyebrow="How it works"
          title="Six months, from learning to a career."
          intro="Real mentors, real training and a path to a global career. This is how the six months are planned."
        />
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {months.map((month, index) => (
            <li key={month.label}>
              <Card tone="white" className="h-full gap-3">
                <span className="text-[13px] font-semibold tracking-[0.14em] text-[#5C5C5C]">0{index + 1}</span>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">{month.label}</p>
                <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em]">{month.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[#404040]">{month.text}</p>
              </Card>
            </li>
          ))}
        </ol>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {qantaraStages.map((stage) => (
            <li key={stage.name} className="rounded-xl border border-[#E6E6E6] bg-white px-5 py-4 text-[15px]">
              <span className="font-semibold">{stage.name}</span>
              <span className="text-[#5C5C5C]">: {stage.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Who can apply" title="Is this for you?" />
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {whoCanApply.map((rule) => (
            <li key={rule} className="rounded-xl bg-[#F7F7F7] px-6 py-5 text-[17px] leading-[1.5] text-[#262626]">
              {rule}
            </li>
          ))}
        </ul>
      </Section>

      <Panel>
        <Eyebrow onDark>Applications</Eyebrow>
        <h2 className="mt-3.5 max-w-[20ch] text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
          EmpactUs runs applications and answers questions.
        </h2>
        <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.6] text-[#C7C7C7]">
          Everything about the fellowship, including how to apply, is on the EmpactUs Qantara page. We are not a separate door:
          start there.
        </p>
        <div className="mt-8">
          <EmpactUsLink
            className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold text-[#0A0A0A] transition-colors hover:bg-[#E6E6E6] focus-visible:outline-white ${focusRing}`}
          >
            Go to the Qantara page on EmpactUs <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </EmpactUsLink>
        </div>
      </Panel>

      <Section>
        <SectionHeading
          eyebrow="Partners"
          title="Built by a bridge of partners."
          intro="Seven organizations stand behind Qantara. Each link goes to the partner's own site."
        />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <li data-reveal>
            <SmartLink
              href="/"
              aria-label="Dev Weekends"
              className={`group flex h-20 items-center justify-center rounded-xl border border-[#E6E6E6] px-4 transition duration-200 hover:border-[#0A0A0A] ${focusRing}`}
            >
              <BrandLogo height={44} />
            </SmartLink>
          </li>
          {qantaraPartners.map((partner) => (
            <li key={partner.name} data-reveal>
              <SmartLink
                href={partner.href}
                aria-label={partner.name}
                className={`group flex h-20 items-center justify-center rounded-xl border border-[#E6E6E6] px-4 transition duration-200 hover:border-[#0A0A0A] ${focusRing}`}
              >
                <LogoMark org={partner} muted={false} />
              </SmartLink>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.6] text-[#404040]">
          Dev Weekends is a free, international community of engineers. We are glad to put our mentors and our way of learning
          behind a program that helps talented engineers in Gaza open doors to the world. Questions about Qantara itself go to{" "}
          <EmpactUsLink href="https://empactus.org.uk" className={`font-semibold text-[#0A0A0A] underline underline-offset-4 ${focusRing}`}>
            EmpactUs
          </EmpactUsLink>
          .
        </p>
      </Section>
    </>
  )
}
