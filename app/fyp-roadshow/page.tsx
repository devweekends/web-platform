import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Compass, Users, Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "FYP Roadshow | Dev Weekends",
  description:
    "Practical guidance for final-year students choosing, planning, and building an FYP worth showing after graduation.",
}

const discordUrl = "https://discord.gg/Cy7Rgkf4Up"
const fypMentorshipFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeJTkpAM6aTPpS6QcCO2iuB4VmKx537T84KBGlquqePwuuTfg/viewform"

export default function FYPRoadshowPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b px-6 py-16 md:py-24 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--muted))_0,transparent_45%)]" />
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[3px] text-muted-foreground">
            Dev Weekends FYP Roadshow
          </p>
          <div>
            <h1 className="max-w-3xl text-[clamp(40px,7vw,76px)] font-bold leading-[0.96] tracking-[-0.055em]">
              Build an FYP worth showing after graduation.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Your final-year project can be more than a last-minute submission. Learn how to choose a problem, plan the work, and build something with real technical depth and real users.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={fypMentorshipFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-background transition-opacity hover:opacity-85"
              >
                Submit your FYP idea <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/guides/choosing-the-right-project"
                className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-xs font-semibold uppercase tracking-[1.5px] transition-colors hover:bg-foreground hover:text-background"
              >
                Read the project guide
              </Link>
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-xs font-semibold uppercase tracking-[1.5px] transition-colors hover:bg-foreground hover:text-background"
              >
                Get updates on Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[3px] text-muted-foreground">What the roadshow covers</p>
            <h2 className="text-[clamp(30px,4vw,48px)] font-bold tracking-tight">Practical direction before you commit months of work.</h2>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-3">
            {[
              {
                icon: Compass,
                title: "Choose a problem that matters",
                text: "Move beyond another generic project by finding a problem with clear users, meaningful depth, and a realistic scope.",
              },
              {
                icon: Wrench,
                title: "Plan how to build it",
                text: "Turn an idea into a focused execution plan: research, architecture, milestones, and the engineering work that will stretch you.",
              },
              {
                icon: Users,
                title: "Get feedback from builders",
                text: "The strongest submitted projects can be shortlisted for follow-up guidance from Dev Weekends mentors.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-background p-7 md:p-8">
                <Icon className="mb-7 h-6 w-6" />
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-16 text-background md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[3px] text-background/50">For final-year students</p>
            <h2 className="text-[clamp(30px,4vw,48px)] font-bold tracking-tight">Make your FYP something you are proud to explain.</h2>
          </div>
          <div>
            <ul className="space-y-4 text-sm leading-relaxed text-background/75">
              {[
                "Use the project-selection guide to test your idea before building.",
                "Submit your FYP idea or project for consideration.",
                "Strong submissions may be shortlisted for focused mentor guidance.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-background" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={fypMentorshipFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border border-background/30 px-6 py-3 text-xs font-semibold uppercase tracking-[1.5px] transition-colors hover:bg-background hover:text-foreground"
            >
              Submit your FYP idea <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
