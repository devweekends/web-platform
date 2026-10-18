'use client'

import { useState } from 'react'
import { Loader2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const emptyForm = {
  name: '', role: '', program: 'fellowship', cohort: '', sponsor: '', linkedin: '', content: '', videoUrl: '', visibility: 'public',
}

export function AdminAddImpactStoryModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState(emptyForm)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/admin/impact-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to save impact story')
      setOpen(false)
      setFormData(emptyForm)
      onSuccess()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save impact story')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" />Add Impact Story</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>Add an impact story</DialogTitle>
          <DialogDescription>Admin-created entries are approved immediately. Choose whether they remain internal, public, or featured.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="impact-admin-name">Name *</Label><Input id="impact-admin-name" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} /></div>
            <div className="space-y-2"><Label htmlFor="impact-admin-role">Role or outcome *</Label><Input id="impact-admin-role" required value={formData.role} onChange={(event) => setFormData({ ...formData, role: event.target.value })} /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="impact-admin-program">Program *</Label>
              <select id="impact-admin-program" value={formData.program} onChange={(event) => setFormData({ ...formData, program: event.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="fellowship">Fellowship</option><option value="open-source">Open Source</option><option value="turing">Turing</option><option value="alumni">Alumni</option><option value="dsoc">DSOC</option><option value="mentorship">Mentorship</option><option value="community">Community</option><option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="impact-admin-visibility">Visibility</Label>
              <select id="impact-admin-visibility" value={formData.visibility} onChange={(event) => setFormData({ ...formData, visibility: event.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="internal">Internal only</option><option value="public">Public</option><option value="featured">Featured</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="impact-admin-cohort">Cohort or year</Label><Input id="impact-admin-cohort" value={formData.cohort} onChange={(event) => setFormData({ ...formData, cohort: event.target.value })} /></div>
            <div className="space-y-2"><Label htmlFor="impact-admin-sponsor">Sponsor or partner</Label><Input id="impact-admin-sponsor" value={formData.sponsor} onChange={(event) => setFormData({ ...formData, sponsor: event.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="impact-admin-linkedin">LinkedIn</Label><Input id="impact-admin-linkedin" type="url" value={formData.linkedin} onChange={(event) => setFormData({ ...formData, linkedin: event.target.value })} /></div>
          <div className="space-y-2">
            <Label htmlFor="impact-admin-video">Video URL</Label>
            <Input id="impact-admin-video" type="url" placeholder="YouTube, Google Drive, or Loom link" value={formData.videoUrl} onChange={(event) => setFormData({ ...formData, videoUrl: event.target.value })} />
            <p className="text-xs text-muted-foreground">We support YouTube, Google Drive, and Loom share links.</p>
          </div>
          <div className="space-y-2"><Label htmlFor="impact-admin-content">Story *</Label><Textarea id="impact-admin-content" required maxLength={5000} className="min-h-[120px]" value={formData.content} onChange={(event) => setFormData({ ...formData, content: event.target.value })} /></div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <DialogFooter><Button type="submit" disabled={loading} className="w-full">{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save impact story</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
