"use client"

import { useEffect, useMemo, useState } from "react"

import { Button, Card, PageHero, Section } from "@/components/site/page-kit"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type JobDoc = {
  _id: string
  title: string
  company: string
  location?: string
  workplaceType?: string
  employmentType?: string
  audience?: string
  description: string
  requirements?: string
  applyUrl?: string
  applyEmail?: string
  deadline?: string
  tags?: string[]
  createdAt?: string
}

type Audience = "all" | "Students" | "Professionals" | "Both"
type Workplace = "all" | "Remote" | "Hybrid" | "Onsite"
type Employment = "all" | "Internship" | "Full-time" | "Part-time" | "Contract"

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"

const fieldClass = `h-12 rounded-xl border-[#D4D4D4] bg-white px-4 text-base text-[#0A0A0A] ${focusRing}`
const triggerClass = `${fieldClass} w-full sm:w-[190px]`

const primaryButton = `inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[#0A0A0A] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`
const secondaryButton = `inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-[#D4D4D4] px-5 text-[15px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#F7F7F7] disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`

function Tag({ children, solid }: { children: string; solid?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[13px] font-semibold ${
        solid ? "bg-[#0A0A0A] text-white" : "border border-[#D4D4D4] text-[#404040]"
      }`}
    >
      {children}
    </span>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="font-semibold text-[#0A0A0A]">{label}:</dt>
      <dd>{value}</dd>
    </div>
  )
}

function formatDeadline(deadline?: string) {
  return deadline ? new Date(deadline).toLocaleDateString() : "Not specified"
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [audience, setAudience] = useState<Audience>("all")
  const [workplace, setWorkplace] = useState<Workplace>("all")
  const [employment, setEmployment] = useState<Employment>("all")
  const [applyOpen, setApplyOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobDoc | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [detailsJob, setDetailsJob] = useState<JobDoc | null>(null)

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase()
    return jobs.filter((j) => {
      if (audience !== "all" && (j.audience || "Both") !== audience) return false
      if (workplace !== "all" && (j.workplaceType || "Remote") !== workplace) return false
      if (employment !== "all" && (j.employmentType || "Full-time") !== employment) return false
      if (!q) return true
      return (
        j.title?.toLowerCase().includes(q) ||
        j.company?.toLowerCase().includes(q) ||
        (j.location || "").toLowerCase().includes(q) ||
        (j.tags || []).join(" ").toLowerCase().includes(q)
      )
    })
  }, [jobs, search, audience, workplace, employment])

  const openApply = (job: JobDoc) => {
    setSelectedJob(job)
    setApplyOpen(true)
  }

  const openDetails = (job: JobDoc) => {
    setDetailsJob(job)
    setDetailsOpen(true)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard blocked; the value stays visible in the field.
    }
  }

  const applyUrl = selectedJob?.applyUrl?.trim()
  const applyEmail = selectedJob?.applyEmail?.trim()

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Careers"
        intro="Hand-picked opportunities for students and professionals across Dev Weekends and Dev Weekends partner companies."
        actions={<Button href="/links" variant="secondary">Share a Job</Button>}
      />

      <Section tone="gray">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Input
            aria-label="Search jobs"
            placeholder="Search jobs (title, company, tags...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${fieldClass} sm:max-w-md sm:flex-1`}
          />
          <Select value={audience} onValueChange={(v) => setAudience(v as Audience)}>
            <SelectTrigger aria-label="Audience" className={triggerClass}>
              <SelectValue placeholder="Audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Students">Students</SelectItem>
              <SelectItem value="Professionals">Professionals</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
            </SelectContent>
          </Select>
          <Select value={workplace} onValueChange={(v) => setWorkplace(v as Workplace)}>
            <SelectTrigger aria-label="Workplace" className={triggerClass}>
              <SelectValue placeholder="Workplace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Workplaces</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Onsite">Onsite</SelectItem>
            </SelectContent>
          </Select>
          <Select value={employment} onValueChange={(v) => setEmployment(v as Employment)}>
            <SelectTrigger aria-label="Employment" className={triggerClass}>
              <SelectValue placeholder="Employment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employment</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-10">
          {loading ? (
            <p className="text-[17px] text-[#5C5C5C]" role="status">
              Loading jobs...
            </p>
          ) : filteredJobs.length === 0 ? (
            <Card tone="white" className="items-center px-6 py-14 text-center">
              <p className="text-[20px] font-semibold tracking-[-0.02em]">No jobs right now</p>
              <p className="mt-2 text-[17px] text-[#5C5C5C]">Check back soon. We post opportunities regularly.</p>
            </Card>
          ) : (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <li key={job._id}>
                  <Card tone="white" className="h-full">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {job.workplaceType ? <Tag solid>{job.workplaceType}</Tag> : null}
                      {job.employmentType ? <Tag solid>{job.employmentType}</Tag> : null}
                      {job.audience ? <Tag>{job.audience}</Tag> : null}
                    </div>
                    <h2 className="line-clamp-2 text-[22px] font-semibold leading-[1.2] tracking-[-0.03em]">{job.title}</h2>
                    <dl className="mt-4 space-y-1 text-[15px] leading-[1.5] text-[#404040]">
                      <Fact label="Company" value={job.company} />
                      <Fact label="Location" value={job.location || "Not specified"} />
                      <Fact label="Deadline" value={formatDeadline(job.deadline)} />
                    </dl>
                    <p className="mt-4 line-clamp-4 flex-1 text-[15px] leading-[1.6] text-[#404040]">{job.description}</p>
                    {Array.isArray(job.tags) && job.tags.length > 0 ? (
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                        {job.tags.slice(0, 6).map((t, idx) => (
                          <li key={`${job._id}-${idx}`}>
                            <Tag>{t}</Tag>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                      <button type="button" className={secondaryButton} onClick={() => openDetails(job)}>
                        Read more
                      </button>
                      <button type="button" className={primaryButton} onClick={() => openApply(job)}>
                        Apply
                      </button>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <Dialog
        open={detailsOpen}
        onOpenChange={(open) => {
          setDetailsOpen(open)
          if (!open) setDetailsJob(null)
        }}
      >
        <DialogContent className="grid-rows-[auto,1fr] max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-2xl overflow-hidden rounded-[20px] border-[#E6E6E6] bg-white p-5 sm:w-full sm:rounded-[20px] sm:p-7">
          <DialogHeader>
            <DialogTitle className="text-[22px] font-semibold tracking-[-0.03em]">Job Details</DialogTitle>
            <DialogDescription className="text-[15px] text-[#5C5C5C]">
              {detailsJob ? `${detailsJob.title} @ ${detailsJob.company}` : "Job details"}
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 space-y-5 overflow-y-auto pr-1 text-[15px] leading-[1.6] text-[#404040]">
            <dl className="space-y-1">
              <Fact label="Company" value={detailsJob?.company || ""} />
              <Fact label="Location" value={detailsJob?.location || "Not specified"} />
              <Fact label="Deadline" value={formatDeadline(detailsJob?.deadline)} />
            </dl>

            <div className="space-y-2">
              <h3 className="font-semibold text-[#0A0A0A]">Description</h3>
              <p className="whitespace-pre-wrap">{detailsJob?.description || ""}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-[#0A0A0A]">Requirements</h3>
              <p className="whitespace-pre-wrap">
                {detailsJob?.requirements?.trim() ? detailsJob.requirements : "Not provided"}
              </p>
            </div>

            {Array.isArray(detailsJob?.tags) && detailsJob.tags.length > 0 ? (
              <div className="space-y-2">
                <h3 className="font-semibold text-[#0A0A0A]">Tags</h3>
                <ul className="flex flex-wrap gap-2">
                  {detailsJob.tags.map((t, idx) => (
                    <li key={`details-${detailsJob._id}-${idx}`}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <button type="button" className={secondaryButton} onClick={() => setDetailsOpen(false)}>
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={applyOpen}
        onOpenChange={(open) => {
          setApplyOpen(open)
          if (!open) setSelectedJob(null)
        }}
      >
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-lg rounded-[20px] border-[#E6E6E6] bg-white p-5 sm:w-full sm:rounded-[20px] sm:p-7">
          <DialogHeader>
            <DialogTitle className="text-[22px] font-semibold tracking-[-0.03em]">Apply Details</DialogTitle>
            <DialogDescription className="text-[15px] text-[#5C5C5C]">
              {selectedJob ? `${selectedJob.title} @ ${selectedJob.company}` : "Job apply details"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="apply-url" className="text-[15px] font-semibold">
                Apply URL
              </label>
              <div className="flex items-center gap-2">
                <Input id="apply-url" readOnly value={applyUrl || "Not provided"} className={fieldClass} />
                <button
                  type="button"
                  className={`${secondaryButton} !w-auto shrink-0`}
                  onClick={() => copyToClipboard(applyUrl || "")}
                  disabled={!applyUrl}
                >
                  Copy
                </button>
              </div>
              {applyUrl ? (
                <p className="text-[14px] text-[#5C5C5C]">
                  You can also open it in a new tab:{" "}
                  <a
                    className={`underline underline-offset-4 ${focusRing}`}
                    href={applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open link
                  </a>
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="apply-email" className="text-[15px] font-semibold">
                Apply Email
              </label>
              <div className="flex items-center gap-2">
                <Input id="apply-email" readOnly value={applyEmail || "Not provided"} className={fieldClass} />
                <button
                  type="button"
                  className={`${secondaryButton} !w-auto shrink-0`}
                  onClick={() => copyToClipboard(applyEmail || "")}
                  disabled={!applyEmail}
                >
                  Copy
                </button>
              </div>
              {applyEmail ? (
                <p className="text-[14px] text-[#5C5C5C]">
                  You can email directly:{" "}
                  <a className={`underline underline-offset-4 ${focusRing}`} href={`mailto:${applyEmail}`}>
                    Open email
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
