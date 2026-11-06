import Link from "next/link"

/**
 * Blocks shared by the Fellowship year pages (/fellowship and /fellowship/2025).
 * Same look as page-kit: fixed hex colors, rounded shapes, no accent colors.
 */

const years = [
  { year: "2026", href: "/fellowship" },
  { year: "2025", href: "/fellowship/2025" },
]

/** Switch between Fellowship years. The newest year lives at /fellowship. */
export function FellowshipYearNav({ current }: { current: string }) {
  return (
    <nav aria-label="Fellowship years" className="inline-flex rounded-xl border border-[#D4D4D4] bg-white p-1">
      {years.map(({ year, href }) => {
        const active = year === current
        return (
          <Link
            key={year}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-lg px-5 text-[15px] font-semibold transition-colors ${
              active ? "bg-[#0A0A0A] text-white" : "text-[#404040] hover:bg-[#F7F7F7]"
            }`}
          >
            Fellowship {year}
          </Link>
        )
      })}
    </nav>
  )
}

/** Grid of outcome counts, such as internships and jobs. */
export function OutcomeGrid({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-5">
      {items.map((item) => (
        <div key={item.label} className="rounded-[16px] border border-[#E6E6E6] bg-white p-5 sm:rounded-[20px] sm:p-6">
          <dd className="text-[clamp(28px,4vw,40px)] font-semibold leading-none tracking-[-0.04em]">{item.value}</dd>
          <dt className="mt-3 text-sm leading-snug text-[#5C5C5C]">{item.label}</dt>
        </div>
      ))}
    </dl>
  )
}

/** Plain link styled like the page-kit secondary button, for static files that next/link should not route. */
export function FileButton({ href, children, onDark }: { href: string; children: string; onDark?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-[52px] items-center justify-center rounded-xl px-7 py-4 text-base font-semibold transition-colors ${
        onDark ? "border border-[#3D3D3D] text-white hover:bg-white/10" : "border border-[#D4D4D4] text-[#0A0A0A] hover:bg-[#F7F7F7]"
      }`}
    >
      {children}
    </a>
  )
}
