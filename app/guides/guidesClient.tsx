"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Guide } from "./page";
import {
  BookOpen,
  Rocket,
  Sparkles,
  GitBranch,
  Brain,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

/* ---------------- SWIPER ---------------- */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Rocket,
  Sparkles,
  GitBranch,
  Brain,
};

function iconFor(name?: string): LucideIcon {
  return (name && ICONS[name]) || BookOpen;
}

function GuideCard({ guide }: { guide: Guide }) {
  const Icon = iconFor(guide.icon);
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-7 transition hover:border-gray-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#22C55E]/10 text-[#16A34A]">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowUpRight className="h-5 w-5 text-gray-300 transition group-hover:text-gray-900" />
      </div>

      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-400">
        {guide.category}
      </p>

      <h3 className="mb-3 text-xl font-semibold leading-snug text-gray-900">
        {guide.title}
      </h3>

      {guide.description && (
        <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-gray-600">
          {guide.description}
        </p>
      )}

      <div className="mt-auto flex items-center gap-2 text-xs text-gray-400">
        {guide.readingTime && <span>{guide.readingTime}</span>}
        {guide.readingTime && guide.author && <span>•</span>}
        {guide.author && <span>{guide.author}</span>}
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
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  const featured = useMemo(
    () =>
      guides
        .filter((g) => g.featured)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    [guides]
  );

  const countFor = (category: string) =>
    guides.filter((g) => g.category === category).length;

  const visible = useMemo(
    () =>
      guides
        .filter((g) => g.category === activeCategory)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    [guides, activeCategory]
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* ================= HERO ================= */}
        <header className="mb-20 max-w-2xl">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-gray-400">
            Featured by Dev Weekends
          </p>

          <h1 className="mb-8 font-serif text-6xl leading-tight md:text-7xl">
            Guides
          </h1>

          <p className="text-lg text-gray-600">
            Practical, honest guides written by Dev Weekends and used across the
            community. Pick a path, take it slow, and let small wins add up.
          </p>
        </header>

        {/* ================= FEATURED ================= */}
        {featured.length > 0 && (
          <section className="mb-24">
            <h2 className="mb-10 text-sm uppercase tracking-widest text-gray-400">
              Featured
            </h2>

            <div className="group relative">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={featured.length > 2}
                navigation={{
                  nextEl: ".guides-next",
                  prevEl: ".guides-prev",
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="guides-swiper"
              >
                {featured.map((guide) => (
                  <SwiperSlide key={guide.slug} className="h-auto">
                    <div className="h-full pb-2">
                      <GuideCard guide={guide} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                aria-label="Previous"
                className="guides-prev absolute -left-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition group-hover:opacity-100 md:flex md:opacity-0"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                className="guides-next absolute -right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition group-hover:opacity-100 md:flex md:opacity-0"
              >
                ›
              </button>
            </div>
          </section>
        )}

        {/* ================= TABS ================= */}
        <div className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`pb-3 text-sm uppercase tracking-wide transition ${
                activeCategory === category
                  ? "border-b-2 border-black text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {category} ({countFor(category)})
            </button>
          ))}
        </div>

        {/* ================= GRID ================= */}
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-16 text-center">
            <p className="text-gray-500">
              No guides here yet. New {activeCategory} guides are on the way.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        )}
      </div>

      {/* ================= SWIPER FIX ================= */}
      <style jsx global>{`
        .guides-swiper {
          padding-bottom: 70px !important;
        }
        .guides-swiper .swiper-slide {
          height: auto;
        }
        .guides-swiper .swiper-pagination {
          bottom: 10px !important;
        }
        .guides-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          opacity: 0.4;
          background: #000;
        }
        .guides-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #22c55e;
        }
      `}</style>
    </div>
  );
}
