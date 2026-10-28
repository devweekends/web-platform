"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post, ReadKind } from "./page";
import { formatDate } from "@/components/content/format-date";
import { Eyebrow, PageHero, Section } from "@/components/site/page-kit";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]";

const TABS: { key: ReadKind; label: string; empty: string }[] = [
  { key: "news", label: "News", empty: "No news yet." },
  { key: "guides", label: "Guides", empty: "No guides yet." },
  { key: "blog", label: "Blog", empty: "No blog posts yet." },
];

const meta = (item: Post) => [formatDate(item.date), item.readingTime].filter(Boolean).join(" · ");

function Thumb({ item, className, priority, sizes }: { item: Post; className: string; priority?: boolean; sizes: string }) {
  const contain = item.imageFit === "contain";
  return (
    <div className={`relative overflow-hidden ${contain ? "bg-[#0A0A0A]" : "bg-[#F7F7F7]"} ${className}`}>
      {item.image && (
        <Image
          src={item.image}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className={`${contain ? "object-contain p-3" : "object-cover"} ${
            item.imagePosition === "top" ? "object-top" : item.imagePosition === "bottom" ? "object-bottom" : "object-center"
          } transition-transform duration-500 motion-safe:group-hover:scale-[1.03]`}
        />
      )}
    </div>
  );
}

/** The lead item of a tab: big image, title and a clear call to read */
function Featured({ item }: { item: Post }) {
  return (
    <Link
      href={item.href}
      className={`group grid overflow-hidden rounded-[28px] bg-[#0A0A0A] text-white md:grid-cols-[1.1fr_1fr] ${focusRing}`}
    >
      <Thumb item={item} priority className="aspect-[16/10] md:aspect-auto md:min-h-[380px]" sizes="(max-width: 768px) 100vw, 640px" />
      <div className="flex flex-col justify-center p-7 md:p-12">
        <Eyebrow onDark>{["Featured", meta(item)].filter(Boolean).join(" · ")}</Eyebrow>
        <h2 className="mt-4 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.1] tracking-[-0.035em]">{item.title}</h2>
        {item.description && <p className="mt-4 line-clamp-4 text-[16px] leading-[1.65] text-[#C7C7C7]">{item.description}</p>}
        <span className="mt-8 inline-flex min-h-[52px] w-fit items-center rounded-xl bg-white px-7 text-base font-semibold text-[#0A0A0A] transition-colors group-hover:bg-[#E6E6E6]">
          {item.kind === "guides" ? "Read the guide" : "Read the post"}
        </span>
      </div>
    </Link>
  );
}

/** One row of the list: date, title and summary, thumbnail on the right */
function Row({ item }: { item: Post }) {
  return (
    <li className="border-b border-[#E6E6E6] last:border-b-0">
      <Link href={item.href} className={`group flex items-start gap-5 py-7 sm:gap-8 ${focusRing}`}>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#5C5C5C]">{meta(item)}</p>
          <h3 className="mt-2 text-[20px] font-semibold leading-[1.25] tracking-[-0.02em] underline-offset-4 group-hover:underline sm:text-[24px]">
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-2 line-clamp-2 max-w-[62ch] text-[15px] leading-[1.6] text-[#5C5C5C]">{item.description}</p>
          )}
        </div>
        <Thumb item={item} className="aspect-[4/3] w-[104px] shrink-0 rounded-[14px] sm:w-[220px] sm:rounded-[18px]" sizes="220px" />
      </Link>
    </li>
  );
}

export default function BlogClient({ items }: { items: Post[] }) {
  const [active, setActive] = useState<ReadKind>("news");

  // Open the tab named in the address (/blog#guides) and keep the address in step
  useEffect(() => {
    const fromHash = window.location.hash.slice(1) as ReadKind;
    if (TABS.some((t) => t.key === fromHash)) setActive(fromHash);
  }, []);
  const choose = (key: ReadKind) => {
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  const byKind = useMemo(() => {
    const sorted = [...items].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return Object.fromEntries(TABS.map((t) => [t.key, sorted.filter((i) => i.kind === t.key)])) as Record<ReadKind, Post[]>;
  }, [items]);

  const list = byKind[active];
  const featured = list.find((i) => i.featured) ?? list[0];
  const rest = list.filter((i) => i !== featured);
  const tab = TABS.find((t) => t.key === active)!;

  return (
    <main className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Read with us"
        title="News, guides and stories."
        intro="Fellowship updates, open source results, practical career guides and notes from the community."
      />

      <Section className="space-y-10">
        <div role="tablist" aria-label="What to read" className="flex w-full gap-1 rounded-2xl bg-[#F2F2F2] p-1 sm:w-fit">
          {TABS.map((t) => {
            const selected = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                id={`tab-${t.key}`}
                aria-selected={selected}
                aria-controls="read-panel"
                onClick={() => choose(t.key)}
                className={`min-h-11 flex-1 rounded-xl px-5 text-[15px] font-semibold transition-colors sm:flex-none ${focusRing} ${
                  selected ? "bg-white text-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "text-[#5C5C5C] hover:text-[#0A0A0A]"
                }`}
              >
                {t.label}
                <span className={`ml-2 text-[13px] ${selected ? "text-[#5C5C5C]" : "text-[#8A8A8A]"}`}>{byKind[t.key].length}</span>
              </button>
            );
          })}
        </div>

        <div id="read-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="space-y-10">
          {featured ? (
            <>
              <Featured key={`f-${featured.href}`} item={featured} />
              {rest.length > 0 && (
                <ul className="border-t border-[#0A0A0A]">
                  {rest.map((item) => (
                    <Row key={item.href} item={item} />
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div className="rounded-[20px] border border-dashed border-[#D4D4D4] px-6 py-16 text-center text-[#5C5C5C]">{tab.empty}</div>
          )}
        </div>
      </Section>
    </main>
  );
}
