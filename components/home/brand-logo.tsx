/**
 * The Dev Weekends logo: the wordmark with the week under it. Seven bars, Monday
 * to Sunday; the five weekdays are shorter and lighter than the weekend, but
 * never far below it, because the community runs all week. One component so the
 * header, footer and any other placement stay identical.
 */
export function BrandLogo({ tone = "dark", height }: { tone?: "dark" | "light"; height: number }) {
  const src = tone === "dark" ? "/brand/dw-wordmark-black.png" : "/brand/dw-wordmark-white.png"
  const ink = tone === "dark" ? "bg-[#0A0A0A]" : "bg-white"
  const width = Math.round((height * 246) / 180)
  const weekend = Math.max(5, Math.round(height / 8))
  const weekday = Math.round(weekend * 0.58)
  const gap = Math.max(2, Math.round(height / 20))

  return (
    <span className="inline-flex flex-col" style={{ width, gap }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Dev Weekends" width={width} height={height} style={{ height, width }} />
      <span aria-hidden="true" className="flex items-end justify-between" style={{ height: weekend }}>
        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
          <span
            key={day}
            className={`block rounded-[1px] ${ink} ${day < 5 ? "opacity-[0.32]" : ""}`}
            style={{ width: Math.round(width / 10), height: day < 5 ? weekday : weekend }}
          />
        ))}
      </span>
    </span>
  )
}
