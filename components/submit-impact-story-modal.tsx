'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const programs = [
  { value: 'fellowship', label: 'Fellowship' },
  { value: 'open-source', label: 'Open Source' },
  { value: 'turing', label: 'Turing' },
  { value: 'alumni', label: 'Alumni' },
  { value: 'dsoc', label: 'DSOC' },
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'community', label: 'Community' },
  { value: 'other', label: 'Other' },
]

const emptyForm = {
  name: '',
  role: '',
  email: '',
  linkedin: '',
  program: '',
  cohort: '',
  sponsor: '',
  before: '',
  content: '',
  videoUrl: '',
  consentToPublish: false,
}

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]'
const field = `min-h-11 w-full rounded-xl border border-[#D4D4D4] bg-white px-3.5 py-2.5 text-[15px] text-[#0A0A0A] placeholder:text-[#8A8A8A] ${focusRing}`
const label = 'text-sm font-semibold text-[#0A0A0A]'

const triggerStyles = {
  primary: 'bg-[#0A0A0A] text-white hover:bg-[#262626]',
  onDark: 'bg-white text-[#0A0A0A] hover:bg-[#E6E6E6]',
}

export function SubmitImpactStoryModal({ variant = 'primary' }: { variant?: keyof typeof triggerStyles }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState(emptyForm)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/impact-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      setSuccess(true)
      window.setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setFormData(emptyForm)
      }, 2500)
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to submit your story.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`inline-flex min-h-[52px] items-center justify-center rounded-xl px-7 py-4 text-base font-semibold transition-colors ${triggerStyles[variant]} ${focusRing}`}
        >
          Share your story
        </button>
      </DialogTrigger>
      <DialogContent className="block max-h-[90vh] space-y-5 overflow-y-auto rounded-[24px] border-[#E6E6E6] bg-white p-6 text-[#0A0A0A] sm:max-w-[620px] sm:rounded-[24px] sm:p-8">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="pr-6 text-[26px] font-semibold leading-tight tracking-[-0.03em] text-[#0A0A0A]">
            Share your Dev Weekends impact
          </DialogTitle>
          <DialogDescription className="text-[15px] leading-[1.6] text-[#5C5C5C]">
            Tell us what you built, learned, or achieved. We review every submission before it appears publicly.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
            <CheckCircle2 className="h-14 w-14 text-[#0A0A0A]" aria-hidden="true" />
            <h3 className="text-xl font-semibold tracking-[-0.02em]">Story received</h3>
            <p className="text-[15px] text-[#5C5C5C]">Thank you. Our team will review it before publishing.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="impact-name" className={label}>Name *</label>
                <input id="impact-name" required className={field} value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
              </div>
              <div className="space-y-2">
                <label htmlFor="impact-role" className={label}>Current role or outcome *</label>
                <input id="impact-role" required placeholder="Software Engineer at…" className={field} value={formData.role} onChange={(event) => setFormData({ ...formData, role: event.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="impact-program" className={label}>Program *</label>
                <select
                  id="impact-program"
                  required
                  value={formData.program}
                  onChange={(event) => setFormData({ ...formData, program: event.target.value })}
                  className={field}
                >
                  <option value="" disabled>Select a program</option>
                  {programs.map((program) => <option key={program.value} value={program.value}>{program.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="impact-cohort" className={label}>Cohort or year</label>
                <input id="impact-cohort" placeholder="Fellowship 2026" className={field} value={formData.cohort} onChange={(event) => setFormData({ ...formData, cohort: event.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="impact-email" className={label}>Email</label>
                <input id="impact-email" type="email" className={field} value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
              </div>
              <div className="space-y-2">
                <label htmlFor="impact-linkedin" className={label}>LinkedIn</label>
                <input id="impact-linkedin" type="url" placeholder="https://linkedin.com/in/…" className={field} value={formData.linkedin} onChange={(event) => setFormData({ ...formData, linkedin: event.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="impact-sponsor" className={label}>Sponsor or partner</label>
                <input id="impact-sponsor" placeholder="Optional" className={field} value={formData.sponsor} onChange={(event) => setFormData({ ...formData, sponsor: event.target.value })} />
              </div>
              <div className="space-y-2">
                <label htmlFor="impact-before" className={label}>Before Dev Weekends</label>
                <input id="impact-before" placeholder="Optional context" className={field} value={formData.before} onChange={(event) => setFormData({ ...formData, before: event.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="impact-content" className={label}>Your story *</label>
              <textarea id="impact-content" required maxLength={5000} className={`${field} min-h-[140px] resize-y leading-[1.6]`} placeholder="Share the impact Dev Weekends had on your work or career…" value={formData.content} onChange={(event) => setFormData({ ...formData, content: event.target.value })} />
            </div>

            <div className="space-y-2">
              <label htmlFor="impact-video" className={label}>Video URL</label>
              <input id="impact-video" type="url" placeholder="YouTube, Google Drive, or Loom link" className={field} value={formData.videoUrl} onChange={(event) => setFormData({ ...formData, videoUrl: event.target.value })} />
              <p className="text-[13px] text-[#5C5C5C]">We support YouTube, Google Drive, and Loom share links.</p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#D4D4D4] p-4 text-sm leading-[1.6] text-[#404040]">
              <input type="checkbox" required checked={formData.consentToPublish} onChange={(event) => setFormData({ ...formData, consentToPublish: event.target.checked })} className={`mt-1 h-4 w-4 accent-[#0A0A0A] ${focusRing}`} />
              <span>I confirm that Dev Weekends may review this story and, if approved, publish it on its website and community channels.</span>
            </label>

            {error && <p role="alert" className="rounded-xl border border-[#0A0A0A] px-4 py-3 text-sm font-semibold text-[#0A0A0A]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#0A0A0A] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              Submit for review
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
