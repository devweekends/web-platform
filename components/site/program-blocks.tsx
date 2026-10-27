import type { ReactNode } from "react"
import { Check } from "lucide-react"

/**
 * Small blocks shared by the fellowship, mentorship and FYP pages.
 * Same look as page-kit: fixed hex colors, rounded shapes, no accent colors.
 */

/** Row of big numbers, always one row. */
export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-4 gap-2 sm:gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="min-w-0 rounded-[16px] bg-[#F7F7F7] p-3 sm:rounded-[20px] sm:p-6">
          <dd className="text-[clamp(20px,5.4vw,48px)] font-semibold leading-none tracking-[-0.04em]">{stat.value}</dd>
          <dt className="mt-2 text-[11px] leading-snug text-[#5C5C5C] sm:mt-3 sm:text-sm">{stat.label}</dt>
        </div>
      ))}
    </dl>
  )
}

/** Small rounded tag, for topics and status. */
export function Chip({ children, onDark }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={`inline-flex min-h-9 items-center rounded-full border px-4 text-sm font-medium ${
        onDark ? "border-[#3D3D3D] text-[#C7C7C7]" : "border-[#D4D4D4] bg-white text-[#404040]"
      }`}
    >
      {children}
    </span>
  )
}

/** Short checklist. Keep it to a handful of items. */
export function CheckList({ items, onDark }: { items: string[]; onDark?: boolean }) {
  return (
    <ul className={`space-y-2.5 text-[15px] leading-[1.55] ${onDark ? "text-[#C7C7C7]" : "text-[#404040]"}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className={`mt-1 h-4 w-4 shrink-0 ${onDark ? "text-white" : "text-[#0A0A0A]"}`} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Title, optional small label and body text, for use inside a Card. */
export function CardText({ label, title, children }: { label?: string; title: string; children?: ReactNode }) {
  return (
    <>
      {label && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">{label}</p>}
      <h3 className={`${label ? "mt-3" : ""} text-[22px] font-semibold leading-tight tracking-[-0.02em]`}>{title}</h3>
      {children}
    </>
  )
}

/** Three short steps on a dark panel (card #161616, hairline #262626). */
export function DarkSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="rounded-[20px] border border-[#262626] bg-[#161616] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">Step {index + 1}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#C7C7C7]">{step.text}</p>
        </li>
      ))}
    </ol>
  )
}
