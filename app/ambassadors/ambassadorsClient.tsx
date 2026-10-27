'use client';

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button, PageHero, Section } from "@/components/site/page-kit"

interface Ambassador {
  _id: string;
  name: string;
  university: string;
  bio: string;
  image: string;
  linkedin: string;
  github?: string;
  leetcode?: string;
}

const linkClass =
  "inline-flex min-h-11 items-center rounded-xl border border-[#D4D4D4] px-4 text-[14px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#F7F7F7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"

function SocialLink({ href, label, name }: { href: string; label: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
      aria-label={`${label} profile of ${name}`}
    >
      {label}
    </a>
  )
}

function AmbassadorCard({ ambassador }: { ambassador: Ambassador }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E6E6E6] bg-white transition duration-200 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F7F7]">
        <Image
          src={ambassador.image || '/placeholder-ambassador.jpg'}
          alt={ambassador.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
          className="object-cover object-top"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-ambassador.jpg';
          }}
          unoptimized={!ambassador.image?.startsWith('http')}
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#0A0A0A]">
          {ambassador.name}
        </h3>
        <p className="mt-1 text-[14px] font-medium text-[#5C5C5C]">{ambassador.university}</p>
        {ambassador.bio && (
          <p className="mt-4 line-clamp-3 text-[15px] leading-[1.65] text-[#404040]">{ambassador.bio}</p>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {ambassador.linkedin && <SocialLink href={ambassador.linkedin} label="LinkedIn" name={ambassador.name} />}
          {ambassador.github && <SocialLink href={ambassador.github} label="GitHub" name={ambassador.name} />}
          {ambassador.leetcode && <SocialLink href={ambassador.leetcode} label="LeetCode" name={ambassador.name} />}
        </div>
      </div>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#E6E6E6] bg-white" aria-hidden="true">
      <div className="aspect-[4/3] w-full bg-[#F7F7F7] motion-safe:animate-pulse" />
      <div className="space-y-3 p-7">
        <div className="h-6 w-2/3 rounded-md bg-[#F2F2F2] motion-safe:animate-pulse" />
        <div className="h-4 w-1/2 rounded-md bg-[#F2F2F2] motion-safe:animate-pulse" />
        <div className="h-4 w-full rounded-md bg-[#F2F2F2] motion-safe:animate-pulse" />
      </div>
    </div>
  )
}

export default function AmbassadorsClient() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAmbassadors();
  }, []);

  const fetchAmbassadors = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ambassadors', { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('Failed to fetch ambassadors');
      const data = await response.json();
      setAmbassadors(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('We could not load the ambassadors right now.');
      console.error('Error fetching ambassadors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white text-[#0A0A0A]">
      <PageHero
        eyebrow="Our network"
        title="Our ambassadors"
        intro="Meet the people who represent and grow the Dev Weekends community around the world."
        actions={<Button href="/ambassador-program">Become an ambassador</Button>}
      />

      <Section>
        {loading ? (
          <div role="status" aria-busy="true">
            <span className="sr-only">Loading ambassadors</span>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ) : error ? (
          <div role="alert" className="mx-auto max-w-[520px] rounded-[20px] border border-[#E6E6E6] bg-[#F7F7F7] p-8 text-center">
            <p className="text-[17px] font-medium text-[#0A0A0A]">{error}</p>
            <button
              type="button"
              onClick={fetchAmbassadors}
              className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#0A0A0A] px-7 text-base font-semibold text-white transition-colors hover:bg-[#262626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
            >
              Try again
            </button>
          </div>
        ) : ambassadors.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-[#D4D4D4] px-6 py-16 text-center">
            <p className="text-[#5C5C5C]">No ambassadors to show yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ambassadors.map((ambassador) => (
              <AmbassadorCard key={ambassador._id} ambassador={ambassador} />
            ))}
          </div>
        )}
      </Section>
    </main>
  )
}
