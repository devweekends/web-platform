"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Guide } from "./page";
import { formatDate } from "@/components/content/format-date";
import { Eyebrow, PageHero, Section } from "@/components/site/page-kit";

const cardHover =
  "transition duration-200 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]";

function metaFor(guide: Guide) {
  return [guide.readingTime, formatDate(guide.date)].filter(Boolean).join(" · ");
}

function GuideCard({ guide }: { guide: Guide }) {
  const meta = metaFor(guide);
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={`group flex h-full flex-col rounded-[20px] border border-[#E6E6E6] bg-white p-7 ${cardHover} ${focusRing}`}
    >
      <Eyebrow>{guide.category}</Eyebrow>
      <h2 className="mt-4 text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#0A0A0A]">
        {guide.title}
      </h2>
      {guide.description && (
        <p className="mt-3 line-clamp-3 text-[15px] leading-[1.65] text-[#5C5C5C]">{guide.description}</p>
      )}
      <div className="mt-auto pt-6">
        {meta && <p className="mb-3 text-[13px] text-[#8A8A8A]">{meta}</p>}
        <span className="inline-flex min-h-11 items-center text-[15px] font-semibold text-[#0A0A0A]">
          Read guide
          <span aria-hidden="true" className="ml-2 transition-transform motion-safe:group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

function FeaturedGuide({ guide }: { guide: Guide }) {
  const meta = metaFor(guide);
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={`group block rounded-[28px] bg-[#F7F7F7] p-8 md:p-12 ${cardHover} ${focusRing}`}
    >
      <Eyebrow>Featured guide</Eyebrow>
      <h2 className="mt-4 max-w-[24ch] text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#0A0A0A]">
        {guide.title}
      </h2>
      {guide.description && (
        <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.65] text-[#404040]">{guide.description}</p>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="inline-flex min-h-[52px] items-center rounded-xl bg-[#0A0A0A] px-7 text-base font-semibold text-white transition-colors group-hover:bg-[#262626]">
          Read the guide
        </span>
        {meta && <span className="text-[14px] text-[#5C5C5C]">{meta}</span>}
      </div>
    </Link>
  );
}

export default function GuidesClient({
  guides,
  categories,
}: {
  guides: Guide[];
  categories: string[];
}) {
  const ALL = "All";
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const tabs = [ALL, ...categories];

  const sorted = useMemo(
    () => [...guides].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    [guides]
  );

  const featured = useMemo(() => sorted.find((g) => g.featured), [sorted]);

  const countFor = (category: string) =>
    category === ALL
      ? guides.length
      : guides.filter((g) => g.category === category).length;

  const showFeatured = activeCategory === ALL && Boolean(featured);

  const visible = useMemo(
    () =>
      sorted.filter(
        (g) =>
          (activeCategory === ALL || g.category === activeCategory) &&
          !(showFeatured && g.slug === featured?.slug)
      ),
    [sorted, activeCategory, showFeatured, featured]
  );

  return (
    <main className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="By Dev Weekends"
        title="Guides"
        intro="Practical, honest guides written by Dev Weekends and used across the community. Pick a path, take it slow, and let small wins add up."
      />

      <Section className="space-y-10">
        {showFeatured && featured && <FeaturedGuide guide={featured} />}

        <div role="group" aria-label="Filter guides by category" className="flex flex-wrap gap-2">
          {tabs.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(category)}
                className={`min-h-11 rounded-full border px-5 text-[14px] font-semibold transition-colors ${focusRing} ${
                  active
                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                    : "border-[#D4D4D4] bg-white text-[#404040] hover:bg-[#F7F7F7]"
                }`}
              >
                {category} ({countFor(category)})
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          showFeatured ? null : (
            <div className="rounded-[20px] border border-dashed border-[#D4D4D4] px-6 py-16 text-center">
              <p className="text-[#5C5C5C]">
                No guides here yet. New {activeCategory === ALL ? "" : `${activeCategory} `}guides are on the way.
              </p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
