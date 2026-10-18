'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export type EditableImpactStory = {
  _id: string
  name: string
  role: string
  organization?: string
  email?: string
  linkedin?: string
  program: string
  cohort?: string
  sponsor?: string
  before?: string
  content: string
  videoUrl?: string
  visibility: 'internal' | 'public' | 'featured'
  consentToPublish: boolean
}

const programs = [
  ['fellowship', 'Fellowship'], ['open-source', 'Open Source'], ['turing', 'Turing'], ['alumni', 'Alumni'],
  ['dsoc', 'DSOC'], ['mentorship', 'Mentorship'], ['community', 'Community'], ['other', 'Other'],
]

const formFromStory = (story: EditableImpactStory) => ({
  name: story.name,
  role: story.role,
  organization: story.organization || '',
  email: story.email || '',
  linkedin: story.linkedin || '',
  program: story.program,
  cohort: story.cohort || '',
  sponsor: story.sponsor || '',
  before: story.before || '',
  content: story.content,
  videoUrl: story.videoUrl || '',
  visibility: story.visibility,
  consentToPublish: story.consentToPublish,
})

export function AdminEditImpactStoryModal({
  story,
  open,
  onOpenChange,
  onSuccess,
}: {
  story: EditableImpactStory | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (story: EditableImpactStory) => void
}) {
  const [formData, setFormData] = useState(() => story ? formFromStory(story) : null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setFormData(story ? formFromStory(story) : null)
    setError(null)
  }, [story, open])

  if (!story || !formData) return null

  const update = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) => setFormData({ ...formData, [key]: value })

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/impact-stories/${story._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to update impact story')
      onSuccess(data)
      onOpenChange(false)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to update impact story')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>Edit impact story</DialogTitle>
          <DialogDescription>Changes are saved to the separate impact database.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="edit-impact-name">Name *</Label><Input id="edit-impact-name" required value={formData.name} onChange={(event) => update('name', event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="edit-impact-role">Role or outcome *</Label><Input id="edit-impact-role" required value={formData.role} onChange={(event) => update('role', event.target.value)} /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="edit-impact-organization">Organisation</Label><Input id="edit-impact-organization" value={formData.organization} onChange={(event) => update('organization', event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="edit-impact-program">Program *</Label><select id="edit-impact-program" value={formData.program} onChange={(event) => update('program', event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">{programs.map(([value, name]) => <option key={value} value={value}>{name}</option>)}</select></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="edit-impact-email">Email</Label><Input id="edit-impact-email" type="email" value={formData.email} onChange={(event) => update('email', event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="edit-impact-linkedin">LinkedIn</Label><Input id="edit-impact-linkedin" type="url" value={formData.linkedin} onChange={(event) => update('linkedin', event.target.value)} /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="edit-impact-cohort">Cohort or year</Label><Input id="edit-impact-cohort" value={formData.cohort} onChange={(event) => update('cohort', event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="edit-impact-sponsor">Sponsor or partner</Label><Input id="edit-impact-sponsor" value={formData.sponsor} onChange={(event) => update('sponsor', event.target.value)} /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="edit-impact-before">Before Dev Weekends</Label><Input id="edit-impact-before" value={formData.before} onChange={(event) => update('before', event.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="edit-impact-video">Video URL</Label><Input id="edit-impact-video" type="url" placeholder="YouTube, Google Drive, or Loom link" value={formData.videoUrl} onChange={(event) => update('videoUrl', event.target.value)} /><p className="text-xs text-muted-foreground">We support YouTube, Google Drive, and Loom share links.</p></div>
          <div className="space-y-2"><Label htmlFor="edit-impact-content">Story *</Label><Textarea id="edit-impact-content" required maxLength={5000} className="min-h-[120px]" value={formData.content} onChange={(event) => update('content', event.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="edit-impact-visibility">Visibility</Label><select id="edit-impact-visibility" value={formData.visibility} onChange={(event) => update('visibility', event.target.value as EditableImpactStory['visibility'])} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="internal">Internal only</option><option value="public">Public</option><option value="featured">Featured</option></select></div>
          <label className="flex items-start gap-3 rounded-md border p-3 text-sm"><input type="checkbox" checked={formData.consentToPublish} onChange={(event) => update('consentToPublish', event.target.checked)} className="mt-0.5 h-4 w-4" /><span>Publication consent has been confirmed.</span></label>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <DialogFooter><Button type="submit" disabled={loading} className="w-full">{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save changes</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
