import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";

import { BrandLogo } from "@/components/home/brand-logo";
import { Card, Eyebrow, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit";
import { withSocial } from "@/lib/seo";

export const metadata = withSocial({
  alternates: { canonical: "/brand" },
  title: "Brand Kit & Speaker Resources",
  description:
    "Download Dev Weekends logos and the official session slide template. Designed for speakers, mentors, and community partners.",
});

type Logo = {
  name: string;
  description: string;
  file: string;
  download: string;
  /** JPG files are square with plenty of white space, so they are zoomed to fill the tile */
  kind: "jpg" | "png";
  tile: string;
};

const logos: Logo[] = [
  {
    name: "Logo with the week, black",
    description: "The wordmark with the seven week bars. The main logo for light surfaces.",
    file: "/brand/dw-logo-week-black.png",
    download: "dev-weekends-logo-black.png",
    kind: "png",
    tile: "bg-[#F7F7F7]",
  },
  {
    name: "Logo with the week, white",
    description: "The same logo in white. For dark surfaces and photos.",
    file: "/brand/dw-logo-week-white.png",
    download: "dev-weekends-logo-white.png",
    kind: "png",
    tile: "bg-[#0A0A0A]",
  },
  {
    name: "Logo on dark badge",
    description: "White wordmark on a black circle. Works on light or dark backgrounds.",
    file: "/brand/dw-logo-white.jpg",
    download: "dev-weekends-logo-white.jpg",
    kind: "jpg",
    tile: "bg-white",
  },
  {
    name: "Black wordmark",
    description: "Black wordmark on white. For light surfaces.",
    file: "/brand/dw-logo-black.jpg",
    download: "dev-weekends-logo-black.jpg",
    kind: "jpg",
    tile: "bg-white",
  },
  {
    name: "Black wordmark, transparent",
    description: "Black wordmark with no background. For light surfaces.",
    file: "/brand/dw-wordmark-black.png",
    download: "dev-weekends-wordmark-black.png",
    kind: "png",
    tile: "bg-[#F7F7F7]",
  },
  {
    name: "White wordmark, transparent",
    description: "White wordmark with no background. For dark surfaces.",
    file: "/brand/dw-wordmark-white.png",
    download: "dev-weekends-wordmark-white.png",
    kind: "png",
    tile: "bg-[#0A0A0A]",
  },
];

const guidelines = [
  "Keep the seven bars under the wordmark. The last two are the weekend, and they stay taller.",
  "The tagline, Great engineers. Greater impact., goes next to the logo, never inside it.",
  "Keep clear space around the logo equal to the height of the wordmark.",
  "Do not stretch, recolor, or add effects to the logo.",
  "Use the dark badge version when the background is busy or photographic.",
];

const badges = [
  { name: "In partnership with, light", file: "/brand/dw-badge-partnership-light.svg", tile: "bg-[#F7F7F7]" },
  { name: "In partnership with, dark", file: "/brand/dw-badge-partnership-dark.svg", tile: "bg-[#F7F7F7]" },
  { name: "Community partner of, light", file: "/brand/dw-badge-community-partner-light.svg", tile: "bg-[#F7F7F7]" },
  { name: "Community partner of, dark", file: "/brand/dw-badge-community-partner-dark.svg", tile: "bg-[#F7F7F7]" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]";
const outlineBtn = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D4D4D4] px-5 text-[15px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#F7F7F7] ${focusRing}`;

export default function BrandKitPage() {
  return (
    <>
      <PageHero
        eyebrow="Brand kit"
        title="Brand kit and speaker resources."
        intro="Logos for posts and decks, plus the official slide template for community sessions. Made for speakers, mentors and partners."
      />

      <Section>
        <SectionHeading
          eyebrow="Logos"
          title="Download the logo."
          intro="Pick the version that fits your background."
        />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {logos.map((logo) => (
            <li key={logo.file}>
              <Card tone="bordered" className="h-full overflow-hidden !p-0">
                <div className={`relative flex h-52 items-center justify-center overflow-hidden ${logo.tile}`}>
                  {logo.kind === "jpg" ? (
                    <Image
                      src={logo.file}
                      alt={logo.name}
                      fill
                      sizes="(min-width: 1024px) 285px, (min-width: 640px) 50vw, 100vw"
                      className="scale-[1.6] object-contain"
                    />
                  ) : (
                    <Image src={logo.file} alt={logo.name} width={246} height={180} className="h-28 w-auto" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-4 border-t border-[#E6E6E6] p-6">
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.01em]">{logo.name}</h3>
                    <p className="mt-1.5 text-sm leading-[1.6] text-[#5C5C5C]">{logo.description}</p>
                  </div>
                  <a href={logo.file} download={logo.download} className={`${outlineBtn} mt-auto`}>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download
                  </a>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Panel>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow onDark>Session slide template</Eyebrow>
            <h2 className="mt-3.5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Session Template v2.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.6] text-[#C7C7C7]">
              The official deck speakers use for community sessions. Preview it in a browser, then duplicate it into Google
              Slides, Keynote, or PowerPoint.
            </p>
            <ul className="mt-6 max-w-[46ch] divide-y divide-[#262626] border-y border-[#262626] text-[15px] text-[#C7C7C7]">
              <li className="py-3">9 pre-built slide layouts</li>
              <li className="py-3">Inter and Anton typography baked in</li>
              <li className="py-3">Self-contained HTML. Edit text directly, no build step</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/brand/session-template.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold text-[#0A0A0A] transition-colors hover:bg-[#E6E6E6] ${focusRing} focus-visible:outline-white`}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Preview in browser
              </a>
              <a
                href="/brand/session-template.html"
                download="devweekends-session-template.html"
                className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#3D3D3D] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 ${focusRing} focus-visible:outline-white`}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download HTML
              </a>
            </div>
          </div>

          <div className="flex aspect-video flex-col items-center justify-center rounded-[20px] border border-[#262626] bg-[#161616] p-8 text-center">
            <Image src="/brand/dw-wordmark-white.png" alt="Dev Weekends" width={246} height={180} className="h-24 w-auto" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#A3A3A3]">
              16:9 dark deck. Cover, agenda, two-column, full-bleed and Q&amp;A slides.
            </p>
          </div>
        </div>
      </Panel>

      <Section id="partners" tone="gray">
        <SectionHeading
          eyebrow="For partner communities"
          title="Show that you work with us."
          intro="Running an event, a program or a campus chapter with Dev Weekends? Use these on posters, slides and your website."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card tone="white" className="gap-6">
            <Eyebrow>Co-branded lockup</Eyebrow>
            <div className="flex flex-wrap items-center justify-center gap-6 rounded-[16px] border border-[#E6E6E6] px-6 py-10 sm:gap-8">
              <BrandLogo height={64} />
              <span aria-hidden="true" className="text-[32px] font-light text-[#8A8A8A]">
                ×
              </span>
              <span className="flex h-[76px] min-w-[150px] items-center justify-center rounded-xl border-2 border-dashed border-[#D4D4D4] px-5 text-[15px] font-semibold text-[#8A8A8A]">
                Your logo
              </span>
            </div>
            <ul className="space-y-2 text-[15px] leading-[1.6] text-[#404040]">
              <li>Put both logos at the same height, with a thin × between them.</li>
              <li>Use our black logo on light backgrounds and the white one on dark backgrounds.</li>
              <li>Keep the seven bars under our wordmark; do not crop or recolor them.</li>
            </ul>
          </Card>

          <Card tone="white" className="gap-4">
            <Eyebrow>Describe us in one line</Eyebrow>
            <p className="text-[19px] font-semibold leading-[1.45] tracking-[-0.01em]">
              Dev Weekends is a free, international community where engineers learn, build and grow together.
            </p>
            <p className="text-[15px] leading-[1.6] text-[#5C5C5C]">
              Tagline, if you have room: Great engineers. Greater impact.
            </p>
            <p className="mt-auto text-[15px] leading-[1.6] text-[#404040]">
              Send your draft to{" "}
              <a
                href="mailto:info@devweekends.com?subject=Co-branded%20material%20for%20review"
                className={`font-semibold text-[#0A0A0A] underline underline-offset-4 hover:text-[#404040] ${focusRing}`}
              >
                info@devweekends.com
              </a>{" "}
              before it goes public.
            </p>
          </Card>
        </div>

        <h3 className="mt-12 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Partner badges</h3>
        <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {badges.map((badge) => (
            <li key={badge.file}>
              <Card tone="white" className="h-full gap-4 p-5">
                <div className="flex items-center justify-center rounded-[14px] bg-[#F7F7F7] p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={badge.file} alt={`${badge.name} badge`} width={560} height={168} loading="lazy" decoding="async" className="h-auto w-full max-w-[360px]" />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold">{badge.name}</span>
                  <a href={badge.file} download className={outlineBtn}>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    SVG
                  </a>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Usage" title="Usage guidelines." />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guidelines.map((rule, index) => (
            <li key={rule}>
              <Card tone="gray" className="h-full">
                <span className="text-[13px] font-semibold tracking-[0.14em] text-[#5C5C5C]">0{index + 1}</span>
                <p className="mt-3 text-[17px] leading-[1.6] text-[#262626]">{rule}</p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[17px] text-[#404040]">
          Questions about brand usage? Write to{" "}
          <a
            href="mailto:info@devweekends.com"
            className={`font-semibold text-[#0A0A0A] underline underline-offset-4 hover:text-[#404040] ${focusRing}`}
          >
            info@devweekends.com
          </a>
          .
        </p>
      </Section>
    </>
  );
}
