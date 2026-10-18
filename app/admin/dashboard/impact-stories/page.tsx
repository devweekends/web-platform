'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Eye, Loader2, Pencil, Star, Trash2, XCircle } from 'lucide-react'
import { AdminAddImpactStoryModal } from '@/components/admin-add-impact-story-modal'
import { AdminEditImpactStoryModal, EditableImpactStory } from '@/components/admin-edit-impact-story-modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Visibility = 'internal' | 'public' | 'featured'
interface ImpactStory extends EditableImpactStory {
  cta?: string; isApproved: boolean; createdAt: string;
}

const label = (value: string) => value.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
const PAGE_SIZE = 10

export default function ImpactStoriesPage() {
  const [stories, setStories] = useState<ImpactStory[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [selected, setSelected] = useState<ImpactStory | null>(null)
  const [editing, setEditing] = useState<ImpactStory | null>(null)
  const [page, setPage] = useState(1)

  const loadStories = async () => {
    try {
      const response = await fetch('/api/admin/impact-stories')
      if (response.ok) setStories(await response.json())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadStories() }, [])

  const pageCount = Math.max(1, Math.ceil(stories.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const paginatedStories = stories.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const visibleRangeStart = stories.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const visibleRangeEnd = Math.min(currentPage * PAGE_SIZE, stories.length)

  const update = async (id: string, updateData: Partial<ImpactStory>) => {
    setProcessingId(id)
    try {
      const response = await fetch(`/api/admin/impact-stories/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updateData) })
      if (response.ok) {
        const story = await response.json()
        setStories((current) => current.map((item) => item._id === id ? story : item))
        if (selected?._id === id) setSelected(story)
      }
    } finally {
      setProcessingId(null)
    }
  }

  const remove = async (id: string) => {
    if (!window.confirm('Delete this impact story? This cannot be undone.')) return
    setProcessingId(id)
    try {
      const response = await fetch(`/api/admin/impact-stories/${id}`, { method: 'DELETE' })
      if (response.ok) setStories((current) => current.filter((item) => item._id !== id))
    } finally {
      setProcessingId(null)
    }
  }

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-3xl font-bold tracking-tight">Impact Stories</h2><p className="mt-1 text-muted-foreground">Stored in the separate impact database.</p></div><AdminAddImpactStoryModal onSuccess={loadStories} /></div>
      <Card><CardHeader><CardTitle>Submissions and published stories</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-muted/50 text-xs uppercase"><tr><th className="px-4 py-3">Person</th><th className="px-4 py-3">Program</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Date</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody>{paginatedStories.map((story) => <tr key={story._id} className="border-b"><td className="px-4 py-3"><div className="font-medium">{story.name}</div><div className="text-xs text-muted-foreground">{story.role}</div></td><td className="px-4 py-3"><Badge variant="secondary">{label(story.program)}</Badge>{story.cohort && <div className="mt-1 text-xs text-muted-foreground">{story.cohort}</div>}</td><td className="px-4 py-3"><div className="flex flex-wrap gap-1"><Badge variant={story.isApproved ? 'default' : 'secondary'} className={story.isApproved ? 'bg-green-600' : ''}>{story.isApproved ? 'Approved' : 'Pending'}</Badge><Badge variant="outline">{story.visibility}</Badge></div></td><td className="px-4 py-3 text-muted-foreground">{new Date(story.createdAt).toLocaleDateString()}</td><td className="px-4 py-3"><div className="flex justify-end gap-1"><Button size="icon" variant="ghost" onClick={() => setSelected(story)} title="View"><Eye className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={() => setEditing(story)} title="Edit"><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost" disabled={processingId === story._id} onClick={() => update(story._id, story.isApproved ? { isApproved: false } : { isApproved: true, visibility: story.visibility === 'internal' ? 'public' : story.visibility })} title={story.isApproved ? 'Unapprove' : 'Approve and publish'}>{story.isApproved ? <XCircle className="h-4 w-4 text-orange-500" /> : <CheckCircle className="h-4 w-4 text-green-600" />}</Button><Button size="icon" variant="ghost" disabled={processingId === story._id} onClick={() => update(story._id, { visibility: story.visibility === 'featured' ? 'public' : 'featured' })} title="Toggle featured"><Star className={`h-4 w-4 ${story.visibility === 'featured' ? 'fill-amber-400 text-amber-400' : ''}`} /></Button><Button size="icon" variant="ghost" disabled={processingId === story._id} onClick={() => remove(story._id)} title="Delete"><Trash2 className="h-4 w-4 text-red-600" /></Button></div></td></tr>)}{stories.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No impact stories yet.</td></tr>}</tbody></table></div>{stories.length > 0 && <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-sm text-muted-foreground"><span>Showing {visibleRangeStart}–{visibleRangeEnd} of {stories.length}</span><div className="flex items-center gap-2"><Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</Button><span>Page {currentPage} of {pageCount}</span><Button size="sm" variant="outline" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>Next</Button></div></div>}</CardContent></Card>
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">{selected && <><DialogHeader><DialogTitle>{selected.name}</DialogTitle><DialogDescription>{label(selected.program)} · {selected.role}</DialogDescription></DialogHeader><div className="space-y-4"><p className="whitespace-pre-wrap leading-relaxed">{selected.content}</p>{selected.sponsor && <p><span className="font-semibold">Sponsor/partner:</span> {selected.sponsor}</p>}{selected.email && <p><span className="font-semibold">Email:</span> {selected.email}</p>}{selected.linkedin && <a className="block text-primary underline" href={selected.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn profile</a>}<p className="text-sm text-muted-foreground">Consent to publish: {selected.consentToPublish ? 'Yes' : 'No'}</p></div></>}</DialogContent></Dialog>
      <AdminEditImpactStoryModal story={editing} open={!!editing} onOpenChange={(open) => !open && setEditing(null)} onSuccess={(story) => { const updated = story as ImpactStory; setStories((current) => current.map((item) => item._id === updated._id ? updated : item)); if (selected?._id === updated._id) setSelected(updated) }} />
    </div>
  )
}
