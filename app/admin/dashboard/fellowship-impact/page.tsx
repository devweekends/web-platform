'use client'

import { useEffect, useMemo, useState } from 'react'
import { Eye, Loader2, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type SurveyResponse = {
  _id: string
  participant: { name: string; email: string; phone?: string }
  fellowship: { program?: string; clanName?: string; mentorName?: string }
  activity: { projectsDeveloped?: number; projectDetails?: string; openSourceWork?: string; freelanceWork?: string; remotePlatform?: string; leetcodeSolved?: number; mindsetTalksCompleted?: number; articlesRead?: number; dinnerEngineerTalksCompleted?: number; spiritualTalksCompleted?: number; thoughtQuestionPagesWritten?: number; dsaRecordedSessionsWatched?: number; engineeringSessionsAttended?: number; preferredLearningFormat?: string }
  outcomes: { interviewsCleared?: string; internshipCracked?: string; jobCracked?: string }
  ratings: { program: Record<string, string | undefined>; mentor: Record<string, string | undefined> }
  feedback: { postFellowshipSupport?: string; upcomingPrograms?: string; fellowshipHelp?: string; mentorExperience?: string; fellowshipExperience?: string; changeAndKeep?: string; additionalComments?: string }
  source: { form: string; submittedAt?: string }
}

const isPositive = (value?: string) => Boolean(value && /\byes\b|\btrue\b|\bselected\b|\bcracked\b/i.test(value))
const sum = (responses: SurveyResponse[], field: keyof SurveyResponse['activity']) => responses.reduce((total, response) => total + (Number(response.activity[field]) || 0), 0)
const PAGE_SIZE = 25

const categories = [
  { value: 'all', label: 'All Fellowship Impact', source: undefined },
  { value: 'data-engineering', label: 'Data Engineering Responses', source: 'fellowship-2026-data-engineering-clan' },
  { value: 'full-stack-ai', label: 'Full-Stack AI Engineering Impact', source: 'fellowship-2026-stats' },
] as const

type ImpactCategory = (typeof categories)[number]['value']

function DetailSection({ title, entries }: { title: string; entries: [string, string | number | undefined][] }) {
  const populated = entries.filter(([, value]) => value !== undefined && value !== '')
  if (populated.length === 0) return null
  return <section className="space-y-2"><h3 className="font-semibold">{title}</h3><dl className="grid gap-2 text-sm">{populated.map(([label, value]) => <div key={label} className="rounded-md bg-muted/50 p-3"><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt><dd className="mt-1 whitespace-pre-wrap">{value}</dd></div>)}</dl></section>
}

export default function FellowshipImpactPage() {
  const [responses, setResponses] = useState<SurveyResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ImpactCategory>('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<SurveyResponse | null>(null)

  useEffect(() => {
    fetch('/api/admin/fellowship-impact')
      .then(async (response) => response.ok ? response.json() : Promise.reject())
      .then(setResponses)
      .catch(() => setResponses([]))
      .finally(() => setLoading(false))
  }, [])

  const categoryResponses = useMemo(() => {
    const activeCategory = categories.find((item) => item.value === category)
    return activeCategory?.source
      ? responses.filter((response) => response.source.form === activeCategory.source)
      : responses
  }, [category, responses])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return categoryResponses
    return categoryResponses.filter((response) => [response.participant.name, response.participant.email, response.fellowship.clanName, response.fellowship.mentorName, response.fellowship.program].some((value) => value?.toLowerCase().includes(term)))
  }, [categoryResponses, query])

  const metrics = useMemo(() => ({
    projects: sum(categoryResponses, 'projectsDeveloped'),
    internships: categoryResponses.filter((response) => isPositive(response.outcomes.internshipCracked)).length,
    jobs: categoryResponses.filter((response) => isPositive(response.outcomes.jobCracked)).length,
    interviews: categoryResponses.filter((response) => isPositive(response.outcomes.interviewsCleared)).length,
  }), [categoryResponses])

  useEffect(() => { setPage(1) }, [category, query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const paginatedResponses = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const visibleRangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const visibleRangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length)

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>

  return <div className="space-y-6">
    <div><h2 className="text-3xl font-bold tracking-tight">Fellowship Impact</h2><p className="mt-1 text-muted-foreground">Private survey outcomes and feedback from Fellowship participants.</p></div>
    <div className="flex flex-wrap gap-2">
      {categories.map((item) => <Button key={item.value} size="sm" variant={category === item.value ? 'default' : 'outline'} onClick={() => setCategory(item.value)}>{item.label} <Badge variant="secondary" className="ml-2">{item.source ? responses.filter((response) => response.source.form === item.source).length : responses.length}</Badge></Button>)}
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {[["Responses", categoryResponses.length], ["Projects built", metrics.projects], ["Interviews cleared", metrics.interviews], ["Internships", metrics.internships], ["Jobs", metrics.jobs]].map(([title, value]) => <Card key={String(title)}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{value}</p></CardContent></Card>)}
    </div>
    <Card><CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between"><CardTitle>{categories.find((item) => item.value === category)?.label}</CardTitle><div className="relative w-full sm:w-80"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, clan, mentor…" className="pl-9" /></div></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-muted/50 text-xs uppercase"><tr><th className="px-4 py-3">Participant</th><th className="px-4 py-3">Clan & mentor</th><th className="px-4 py-3">Outcomes</th><th className="px-4 py-3">Projects</th><th className="px-4 py-3 text-right">Details</th></tr></thead><tbody>{paginatedResponses.map((response) => <tr key={response._id} className="border-b"><td className="px-4 py-3"><div className="font-medium">{response.participant.name}</div><div className="text-xs text-muted-foreground">{response.participant.email}</div></td><td className="px-4 py-3"><div>{response.fellowship.clanName || '—'}</div><div className="text-xs text-muted-foreground">{response.fellowship.mentorName || 'No mentor recorded'}</div></td><td className="px-4 py-3"><div className="flex flex-wrap gap-1">{isPositive(response.outcomes.interviewsCleared) && <Badge variant="secondary">Interview</Badge>}{isPositive(response.outcomes.internshipCracked) && <Badge variant="secondary">Internship</Badge>}{isPositive(response.outcomes.jobCracked) && <Badge variant="secondary">Job</Badge>}{!isPositive(response.outcomes.interviewsCleared) && !isPositive(response.outcomes.internshipCracked) && !isPositive(response.outcomes.jobCracked) && <span className="text-muted-foreground">—</span>}</div></td><td className="px-4 py-3">{response.activity.projectsDeveloped ?? '—'}</td><td className="px-4 py-3 text-right"><Button size="icon" variant="ghost" title="View full impact" onClick={() => setSelected(response)}><Eye className="h-4 w-4" /></Button></td></tr>)}{filtered.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No Fellowship impact records found.</td></tr>}</tbody></table></div>{filtered.length > 0 && <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-sm text-muted-foreground"><span>Showing {visibleRangeStart}–{visibleRangeEnd} of {filtered.length}</span><div className="flex items-center gap-2"><Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</Button><span>Page {currentPage} of {pageCount}</span><Button size="sm" variant="outline" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>Next</Button></div></div>}</CardContent></Card>
    <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">{selected && <><DialogHeader><DialogTitle>{selected.participant.name}</DialogTitle><DialogDescription>{selected.fellowship.clanName || 'Fellowship participant'} · {selected.fellowship.mentorName || 'Mentor not recorded'}</DialogDescription></DialogHeader><div className="space-y-6"><DetailSection title="Outcomes" entries={[["Interviews cleared", selected.outcomes.interviewsCleared], ["Internship cracked", selected.outcomes.internshipCracked], ["Job cracked", selected.outcomes.jobCracked]]} /><DetailSection title="Learning and activity" entries={[["Projects developed", selected.activity.projectsDeveloped], ["Project details", selected.activity.projectDetails], ["Open-source work", selected.activity.openSourceWork], ["Freelance work", selected.activity.freelanceWork], ["Remote platform", selected.activity.remotePlatform], ["LeetCode solved", selected.activity.leetcodeSolved], ["DSA sessions watched", selected.activity.dsaRecordedSessionsWatched], ["Engineering sessions attended", selected.activity.engineeringSessionsAttended]]} /><DetailSection title="Programme ratings" entries={Object.entries(selected.ratings.program)} /><DetailSection title="Mentor ratings" entries={Object.entries(selected.ratings.mentor)} /><DetailSection title="Feedback" entries={[["How the Fellowship helped", selected.feedback.fellowshipHelp], ["Mentor experience", selected.feedback.mentorExperience], ["Fellowship experience", selected.feedback.fellowshipExperience], ["Support requested", selected.feedback.postFellowshipSupport], ["What to change and keep", selected.feedback.changeAndKeep], ["Additional comments", selected.feedback.additionalComments]]} /></div></>}</DialogContent></Dialog>
  </div>
}
