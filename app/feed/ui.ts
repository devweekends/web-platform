/**
 * Design tokens for the /feed page, so every control, card and label shares one
 * type scale, spacing scale, radius and state treatment.
 *
 * - Type (Inter): label 13/medium, body 15/24, title 17/semibold, stat 28/semibold
 * - Spacing: 4 / 8 / 16 / 24 / 32 / 48px
 * - Radius: cards 16px (rounded-2xl), controls and buttons 12px (rounded-xl), tags full
 * - Accent: LinkedIn blue, only for the primary action and links; everything else neutral
 */

export const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"

/** Press feedback: transform only, short strong ease-out */
const press = "transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"

export const text = {
  label: "text-[13px] font-medium leading-5 text-[#5C5C5C]",
  body: "text-[15px] leading-6 text-[#404040] text-pretty",
  title: "text-[17px] font-semibold leading-6 tracking-[-0.01em] text-[#0A0A0A]",
  stat: "text-[28px] font-semibold leading-none tracking-[-0.03em] tabular-nums text-[#0A0A0A]",
}

export const card = "rounded-2xl border border-[#E6E6E6] bg-white"

const buttonBase = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-semibold ${press} ${focus}`

export const button = {
  /** The one primary action: LinkedIn blue */
  primary: `${buttonBase} bg-[#0A66C2] text-white can-hover:bg-[#004182] disabled:opacity-60`,
  secondary: `${buttonBase} border border-[#D4D4D4] bg-white text-[#0A0A0A] can-hover:bg-[#F7F7F7]`,
}

export const field = `h-11 w-full rounded-xl border border-[#D4D4D4] bg-white px-4 text-[15px] text-[#0A0A0A] placeholder:text-[#8C8C8C] ${focus}`
