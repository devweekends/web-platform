import type { Metadata } from "next"
import Link from "next/link"

// MindMaster is invite only for now and its content is moving to Buildment.
// The previous public page (talks, books and recommendations) is intentionally
// not shown. Admins still manage the content from the dashboard.
export const metadata: Metadata = {
  title: "MindMaster",
  description: "MindMaster is invite only. Course content is coming soon on Buildment.",
  robots: { index: false, follow: true },
}

export default function MindMasterPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-[60vh] max-w-[720px] flex-col justify-center px-6 py-24">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">MindMaster</p>
        <h1 className="mt-4 text-[clamp(40px,6vw,64px)] font-semibold leading-[1.02] tracking-[-0.045em]">MindMaster is invite only.</h1>
        <p className="mt-6 text-[19px] leading-[1.65] text-[#404040]">
          It is our program for the human side of engineering: growth mindset, communication, adaptability, teamwork, personal
          development and purpose. It runs with invited groups for now, and the course content is coming soon on Buildment.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://discord.gg/Cy7Rgkf4Up"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center rounded-xl bg-[#0A0A0A] px-7 py-4 text-base font-semibold text-white"
          >
            Join the community
          </a>
          <Link
            href="/#get-involved"
            className="inline-flex min-h-[52px] items-center rounded-xl border border-[#D4D4D4] px-7 py-4 text-base font-medium"
          >
            See our programs
          </Link>
        </div>
      </div>
    </section>
  )
}
