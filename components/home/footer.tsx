import { SmartLink } from "./smart-link"
import { LINKS, footerColumns } from "./data"

export function HomeFooter() {
  return (
    <footer className="px-6 pb-6">
      <div className="mx-auto max-w-[1392px] rounded-[28px] bg-[#0A0A0A] text-white">
        <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-20">
          <div className="flex flex-wrap items-end justify-between gap-8 border-b border-[#262626] pb-14">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/dw-wordmark-white.png" alt="Dev Weekends" width={82} height={60} className="mb-8 h-[60px] w-auto" />
              <p className="text-[clamp(40px,4.6vw,64px)] font-semibold leading-[1.02] tracking-[-0.045em]">
                Built in Pakistan.
                <br />
                <span className="text-[#8A8A8A]">Gone global.</span>
              </p>
              <p className="mt-4 text-base text-[#A3A3A3]">A free, nonprofit community of engineers since 2018.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <SmartLink
                href={LINKS.discord}
                className="inline-flex min-h-12 items-center rounded-xl bg-white px-[22px] py-3.5 text-[15px] font-semibold text-[#0A0A0A]"
              >
                Join the community
              </SmartLink>
              <SmartLink
                href="#get-involved"
                className="inline-flex min-h-12 items-center rounded-xl border border-[#3D3D3D] px-[22px] py-3.5 text-[15px] font-medium"
              >
                Apply to a program
              </SmartLink>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8 py-12">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col text-[15px]">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">{column.title}</p>
                {column.links.map((link) => (
                  <SmartLink key={link.label} href={link.href} className="inline-flex min-h-11 items-center text-[#C7C7C7] hover:text-white">
                    {link.label}
                  </SmartLink>
                ))}
              </div>
            ))}
          </nav>

          <p className="border-t border-[#262626] pt-6 text-[13px] text-[#8A8A8A]">
            © {new Date().getFullYear()} Dev Weekends. Always free. Always together.
          </p>
        </div>
      </div>
    </footer>
  )
}
