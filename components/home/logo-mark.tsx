import type { Org } from "./data"

const SIZES = {
  md: "h-7 max-w-[150px]",
  lg: "h-9 max-w-[190px]",
}
/** Seal-shaped marks need more height to carry the same visual weight as a wordmark */
const TALL = {
  md: "h-11 max-w-[120px]",
  lg: "h-14 max-w-[130px]",
}

/**
 * An organization's logo as a single-tone black mark, so every logo reads the
 * same on the white page, including logos that are white on transparent.
 * Icon-only marks show the organization's name next to them. Without a logo
 * file the name is shown as text.
 */
/** Logos that must fit four to a row on a phone shrink at small widths */
const COMPACT = "h-4 max-w-[60px] sm:h-6 sm:max-w-[110px] md:h-7"
const COMPACT_TALL = "h-8 max-w-[52px] sm:h-10 sm:max-w-[100px] md:h-11"

export function LogoMark({
  org,
  size = "md",
  muted = true,
  compact = false,
}: {
  org: Org
  size?: keyof typeof SIZES
  muted?: boolean
  compact?: boolean
}) {
  if (!org.logo) {
    return <span className={`font-semibold tracking-[-0.01em] ${compact ? "text-[10px] leading-tight sm:text-sm" : ""}`}>{org.name}</span>
  }
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={org.logo}
        alt={org.iconOnly ? "" : org.name}
        loading="lazy"
        decoding="async"
        className={`${compact ? (org.tall ? COMPACT_TALL : COMPACT) : (org.tall ? TALL : SIZES)[size]} w-auto object-contain brightness-0 transition duration-200 group-hover:scale-105 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${muted ? "opacity-60" : "opacity-90"}`}
      />
      {org.iconOnly && <span className={`font-semibold tracking-[-0.01em] ${compact ? "hidden md:inline" : ""}`}>{org.name}</span>}
    </span>
  )
}
