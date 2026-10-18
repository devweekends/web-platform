'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

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

export function SubmitImpactStoryModal() {
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
        <Button size="lg" className="font-semibold">Share Your Story</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>Share Your Dev Weekends Impact</DialogTitle>
          <DialogDescription>
            Tell us what you built, learned, or achieved. We review every submission before it appears publicly.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h3 className="text-xl font-medium">Story received</h3>
            <p className="text-muted-foreground">Thank you. Our team will review it before publishing.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="impact-name">Name *</Label>
                <Input id="impact-name" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="impact-role">Current role or outcome *</Label>
                <Input id="impact-role" required placeholder="Software Engineer at…" value={formData.role} onChange={(event) => setFormData({ ...formData, role: event.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="impact-program">Program *</Label>
                <select
                  id="impact-program"
                  required
                  value={formData.program}
                  onChange={(event) => setFormData({ ...formData, program: event.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="" disabled>Select a program</option>
                  {programs.map((program) => <option key={program.value} value={program.value}>{program.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="impact-cohort">Cohort or year</Label>
                <Input id="impact-cohort" placeholder="Fellowship 2026" value={formData.cohort} onChange={(event) => setFormData({ ...formData, cohort: event.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="impact-email">Email</Label>
                <Input id="impact-email" type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="impact-linkedin">LinkedIn</Label>
                <Input id="impact-linkedin" type="url" placeholder="https://linkedin.com/in/…" value={formData.linkedin} onChange={(event) => setFormData({ ...formData, linkedin: event.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="impact-sponsor">Sponsor or partner</Label>
                <Input id="impact-sponsor" placeholder="Optional" value={formData.sponsor} onChange={(event) => setFormData({ ...formData, sponsor: event.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="impact-before">Before Dev Weekends</Label>
                <Input id="impact-before" placeholder="Optional context" value={formData.before} onChange={(event) => setFormData({ ...formData, before: event.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="impact-content">Your story *</Label>
              <Textarea id="impact-content" required maxLength={5000} className="min-h-[120px]" placeholder="Share the impact Dev Weekends had on your work or career…" value={formData.content} onChange={(event) => setFormData({ ...formData, content: event.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="impact-video">Video URL</Label>
              <Input id="impact-video" type="url" placeholder="YouTube, Google Drive, or Loom link" value={formData.videoUrl} onChange={(event) => setFormData({ ...formData, videoUrl: event.target.value })} />
              <p className="text-xs text-muted-foreground">We support YouTube, Google Drive, and Loom share links.</p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm leading-relaxed">
              <input type="checkbox" required checked={formData.consentToPublish} onChange={(event) => setFormData({ ...formData, consentToPublish: event.target.checked })} className="mt-0.5 h-4 w-4" />
              <span>I confirm that Dev Weekends may review this story and, if approved, publish it on its website and community channels.</span>
            </label>

            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

            <DialogFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit for review
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
