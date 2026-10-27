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
export function LogoMark({ org, size = "md", muted = true }: { org: Org; size?: keyof typeof SIZES; muted?: boolean }) {
  if (!org.logo) {
    return <span className="font-semibold tracking-[-0.01em]">{org.name}</span>
  }
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={org.logo}
        alt={org.iconOnly ? "" : org.name}
        loading="lazy"
        decoding="async"
        className={`${(org.tall ? TALL : SIZES)[size]} w-auto object-contain brightness-0 ${muted ? "opacity-60" : "opacity-90"}`}
      />
      {org.iconOnly && <span className="font-semibold tracking-[-0.01em]">{org.name}</span>}
    </span>
  )
}
