import { ExternalLink } from "lucide-react";

import { Card, PageHero, Section, SectionHeading } from "@/components/site/page-kit";
import { withSocial } from "@/lib/seo";

export const metadata = withSocial({
  alternates: { canonical: "/presentation" },
  title: "Presentations",
  description:
    "Slides from Dev Weekends talks and sessions. Each deck opens in your browser, with presenter notes and keyboard controls.",
});

type Deck = {
  title: string;
  event: string;
  slides: number;
  summary: string;
  href: string;
};

const decks: Deck[] = [
  {
    title: "From Architecture to Production",
    event: "AWS Community Day",
    slides: 42,
    summary:
      "Designing scalable solutions on AWS, then shipping and running them: requirements, queues, compute choices, testing, safe deploys and observability.",
    href: "/presentation/from-architecture-to-production/",
  },
  {
    title: "From Architecture to Production, short version",
    event: "AWS Community Day",
    slides: 18,
    summary: "The shorter cut of the same talk, focused on the six gates between your laptop and your users.",
    href: "/presentation/aws-community-day/",
  },
  {
    title: "From Code to Production",
    event: "Dev Weekends session",
    slides: 18,
    summary: "Merge, build, deploy, observe and recover: what happens after your pull request is merged.",
    href: "/presentation/from-code-to-production/",
  },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]";

export default function PresentationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Presentations"
        title="Slides from our talks."
        intro="Every deck opens in your browser. Use the arrow keys to move, N for presenter notes, G for an overview and F for fullscreen."
      />

      <Section>
        <SectionHeading eyebrow="Decks" title="Open a deck." />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <li key={deck.href}>
              <Card tone="bordered" className="h-full gap-4">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">
                  {deck.event} · {deck.slides} slides
                </p>
                <h3 className="text-[21px] font-semibold leading-[1.25] tracking-[-0.01em]">{deck.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[#404040]">{deck.summary}</p>
                <a
                  href={deck.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D4D4D4] px-5 text-[15px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#F7F7F7] ${focusRing}`}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Open slides
                </a>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[17px] text-[#404040]">
          Giving a session with us? Start from the{" "}
          <a
            href="/brand#session-template"
            className={`font-semibold text-[#0A0A0A] underline underline-offset-4 hover:text-[#404040] ${focusRing}`}
          >
            session slide template
          </a>
          .
        </p>
      </Section>
    </>
  );
}
