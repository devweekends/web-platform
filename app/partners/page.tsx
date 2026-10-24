import type { Metadata } from "next"
import { ArrowRight, BookOpen, Globe2, Handshake, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Partners | Dev Weekends",
  description: "The organisations and communities helping Dev Weekends create access to meaningful learning opportunities.",
}

const cyberiadRegistrationUrl =
  "https://cyberiadlabs.com/partner/ums1e7vdj3w8lm080hzlcr7xujrc0lyh5mvdot"

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b px-6 py-16 md:py-24 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[3px] text-muted-foreground">
              Dev Weekends Partners
            </p>
            <h1 className="max-w-3xl text-[clamp(40px,6vw,68px)] font-bold leading-[0.98] tracking-[-0.055em]">
              More access.{" "}
              <span className="relative inline-block">
                More opportunity.
                <span className="absolute -bottom-1 left-0 -z-10 h-2 w-full bg-yellow-300" />
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We work with organisations, communities, and educators that help our members learn deeply, build meaningful work, and access opportunities beyond the classroom.
            </p>
            <a
              href="mailto:info@devweekends.com?subject=Partnership%20with%20Dev%20Weekends"
              className="mt-9 inline-flex items-center gap-2 bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-background transition-opacity hover:opacity-85"
            >
              Partner with Dev Weekends <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <aside className="border border-border bg-background p-7 shadow-sm sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[3px] text-muted-foreground">
              How we collaborate
            </p>
            <div className="mt-7 space-y-6">
              {[
                {
                  icon: BookOpen,
                  title: "Learning opportunities",
                  text: "Courses, workshops, and practical programmes for committed learners.",
                },
                {
                  icon: Users,
                  title: "Community pathways",
                  text: "Clear routes from learning to projects, mentorship, and careers.",
                },
                {
                  icon: Handshake,
                  title: "Shared impact",
                  text: "Partnerships that make high-quality opportunities more accessible.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <h2 className="text-sm font-semibold">{title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[3px] text-muted-foreground">
              Featured collaboration
            </p>
            <h2 className="text-[clamp(30px,4vw,48px)] font-bold tracking-tight">
              Learning AI with Cyberiad Labs.
            </h2>
          </div>

          <article className="grid border border-border bg-background lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex min-h-64 flex-col justify-between border-b border-border bg-muted/20 p-7 md:p-9 lg:border-b-0 lg:border-r">
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-sm font-bold">
                  CL
                </span>
                <p className="mt-7 text-[11px] font-semibold uppercase tracking-[3px] text-muted-foreground">
                  Education partner
                </p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight">Cyberiad Labs</h3>
              </div>
              <a
                href="https://cyberiadlabs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] underline decoration-foreground/40 underline-offset-4 hover:text-muted-foreground"
              >
                Visit Cyberiad Labs <Globe2 className="h-4 w-4" />
              </a>
            </div>

            <div className="p-7 md:p-9">
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Cyberiad Labs is offering the Dev Weekends community a practical introduction to AI and large language models. The course helps learners understand how the tools work, get more reliable results, and apply them thoughtfully in real projects.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-border py-6 sm:grid-cols-4">
                {[
                  ["4 weeks", "Course duration"],
                  ["16 sessions", "Live learning"],
                  ["50 places", "Community cohort"],
                  ["Free", "For learners"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-lg font-bold tracking-tight">{value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <p className="text-sm text-muted-foreground">
                  Starts <span className="font-semibold text-foreground">2 November 2026</span>
                </p>
                <a
                  href={cyberiadRegistrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-background transition-opacity hover:opacity-85"
                >
                  Register through Dev Weekends <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-muted/20 px-6 py-16 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[3px] text-muted-foreground">
              Build with us
            </p>
            <h2 className="text-[clamp(30px,4vw,48px)] font-bold tracking-tight">
              Bring a meaningful opportunity to the community.
            </h2>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-3">
            {[
              {
                title: "For learning organisations",
                text: "Offer high-quality courses, resources, or certifications to learners who are ready to do the work.",
              },
              {
                title: "For universities and communities",
                text: "Create focused pathways for students and early-career engineers to grow together.",
              },
              {
                title: "For employers and teams",
                text: "Support practical programmes, mentorship, projects, or career opportunities with long-term value.",
              },
            ].map(({ title, text }) => (
              <article key={title} className="bg-background p-7 md:p-8">
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-16 text-background md:py-20 lg:px-12">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[3px] text-background/50">
              Start a partnership
            </p>
            <h2 className="max-w-2xl text-[clamp(28px,4vw,44px)] font-bold tracking-tight">
              Let&apos;s create access to work that changes careers.
            </h2>
          </div>
          <a
            href="mailto:info@devweekends.com?subject=Partnership%20with%20Dev%20Weekends"
            className="inline-flex shrink-0 items-center gap-2 border border-background/30 px-6 py-3 text-xs font-semibold uppercase tracking-[1.5px] transition-colors hover:bg-background hover:text-foreground"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  )
}
