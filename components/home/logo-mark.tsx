import Image from "next/image"

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
/**
 * Pixel size of each logo file, from public/logos/manifest.json. Given to the
 * browser as width and height so it keeps the right space before the file
 * loads and the row does not shift. Add a line here with every new logo.
 */
const LOGO_SIZES: Record<string, [number, number]> = {
  "/logos/apache-software-foundation.svg": [1000, 525],
  "/logos/calo.svg": [169, 96],
  "/logos/cncf.svg": [399, 76],
  "/logos/cyberiad-labs.svg": [76, 76],
  "/logos/empactus.png": [357, 108],
  "/logos/google-summer-of-code.svg": [205, 26],
  "/logos/hoopo.svg": [1292, 288],
  "/logos/isource-professionals.png": [181, 108],
  "/logos/linux-foundation.svg": [500, 500],
  "/logos/max.png": [217, 168],
  "/logos/microsoft.svg": [338, 72],
  "/logos/microtechx.png": [730, 108],
  "/logos/nectar-social.svg": [66, 16],
  "/logos/olostep.svg": [341, 102],
  "/logos/ruhcare.png": [197, 108],
  "/logos/salla.png": [168, 168],
  "/logos/scale-ai.svg": [2177, 700],
  "/logos/the-collectv.png": [415, 108],
  "/logos/toptal.png": [380, 108],
  "/logos/turing.svg": [796, 125],
  "/logos/upwork.svg": [120, 60],
}

/** Tallest size in px each variant is shown at, matching the classes above and below */
const SHOWN_HEIGHT = { md: 28, lg: 36 }
const SHOWN_HEIGHT_TALL = { md: 44, lg: 56 }

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
  const [width, height] = LOGO_SIZES[org.logo] ?? []
  const alt = org.iconOnly ? "" : org.name
  const className = `${compact ? (org.tall ? COMPACT_TALL : COMPACT) : (org.tall ? TALL : SIZES)[size]} w-auto object-contain brightness-0 transition duration-200 group-hover:scale-105 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${muted ? "opacity-60" : "opacity-90"}`
  // A PNG goes through the image optimizer, asked for at the size it is shown,
  // so each screen gets a file that fits it. SVG scales by itself.
  const shownHeight = compact ? (org.tall ? 44 : 28) : (org.tall ? SHOWN_HEIGHT_TALL : SHOWN_HEIGHT)[size]
  const optimized = org.logo.endsWith(".png") && width && height
  return (
    <span className="inline-flex items-center gap-2.5">
      {optimized ? (
        <Image src={org.logo} alt={alt} width={Math.round((shownHeight * width) / height)} height={shownHeight} className={className} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={org.logo} alt={alt} width={width} height={height} loading="lazy" decoding="async" className={className} />
      )}
      {org.iconOnly && <span className={`font-semibold tracking-[-0.01em] ${compact ? "hidden md:inline" : ""}`}>{org.name}</span>}
    </span>
  )
}
