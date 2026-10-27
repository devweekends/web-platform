import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";

import { Card, Eyebrow, PageHero, Panel, Section, SectionHeading } from "@/components/site/page-kit";

export const metadata = {
  alternates: { canonical: "/brand" },
  title: "Brand Kit & Speaker Resources",
  description:
    "Download Dev Weekends logos and the official session slide template. Designed for speakers, mentors, and community partners.",
};

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
  "Keep clear space around the logo equal to the height of the wordmark.",
  "Do not stretch, recolor, or add effects to the logo.",
  "Use the dark badge version when the background is busy or photographic.",
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
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      <Section>
        <SectionHeading eyebrow="Usage" title="Usage guidelines." />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
            href="mailto:devweekends@gmail.com"
            className={`font-semibold text-[#0A0A0A] underline underline-offset-4 hover:text-[#404040] ${focusRing}`}
          >
            devweekends@gmail.com
          </a>
          .
        </p>
      </Section>
    </>
  );
}
