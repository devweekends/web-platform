import Image from "next/image"
import { Github } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { DWOSI_LINKS, type DwosiProject } from "../data"
import { BrowserFrame } from "./browser-frame"
import { TextLink } from "./cta"

export function IconTile({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "dw-shadow-sm flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-background",
        className
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
    </span>
  )
}

function DsocBadge() {
  return (
    <Badge variant="outline" className="dw-label shrink-0 rounded-full px-2 font-normal text-muted-foreground">
      DSOC 2026
    </Badge>
  )
}

const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, "")

function ProjectLinks({ project }: { project: DwosiProject }) {
  if (!project.websiteUrl && !project.repositoryUrl) {
    return (
      <p className="dw-body text-muted-foreground">
        In development. <TextLink href={DWOSI_LINKS.discord}>Ask about it on Discord</TextLink>
      </p>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {project.websiteUrl && <TextLink href={project.websiteUrl}>Visit {hostname(project.websiteUrl)}</TextLink>}
      {project.repositoryUrl && (
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dw-hit inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 can-hover:underline"
        >
          <Github className="h-3.5 w-3.5" aria-hidden="true" />
          Source code
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

export function FlagshipCard({ project }: { project: DwosiProject }) {
  const Icon = project.icon

  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl shadow-none">
      <div className="h-56 overflow-hidden border-b bg-muted px-6 pt-6">
        <BrowserFrame url={project.websiteUrl ? hostname(project.websiteUrl) : undefined}>
          {project.screenshot ? (
            <Image
              src={project.screenshot}
              alt={`Screenshot of the ${project.name} website`}
              fill
              sizes="(min-width: 1024px) 340px, (min-width: 768px) 45vw, 90vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              <span className="dw-label">Preview coming soon</span>
            </div>
          )}
        </BrowserFrame>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="dw-heading">{project.name}</h3>
            <p className="dw-label text-muted-foreground">{project.category}</p>
          </div>
          {project.dsoc && <DsocBadge />}
        </div>
        <p className="dw-body mt-4 flex-1 text-muted-foreground">{project.description}</p>
        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
      </div>
    </Card>
  )
}

export function ProjectCard({ project }: { project: DwosiProject }) {
  return (
    <Card className="flex flex-col rounded-2xl p-6 shadow-none">
      <div className="flex items-start justify-between gap-4">
        <IconTile icon={project.icon} />
        {project.dsoc && <DsocBadge />}
      </div>
      <h3 className="dw-heading mt-4">{project.name}</h3>
      <p className="dw-label text-muted-foreground">{project.category}</p>
      <p className="dw-body mt-4 flex-1 text-muted-foreground">{project.description}</p>
      <div className="mt-6">
        <ProjectLinks project={project} />
      </div>
    </Card>
  )
}
