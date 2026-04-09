'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type JobDoc = {
  _id: string;
  title: string;
  company: string;
  location?: string;
  workplaceType?: string;
  employmentType?: string;
  audience?: string;
  description: string;
  requirements?: string;
  applyUrl?: string;
  applyEmail?: string;
  deadline?: string;
  tags?: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type JobFormData = {
  title: string;
  company: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'Onsite';
  employmentType: 'Internship' | 'Full-time' | 'Part-time' | 'Contract';
  audience: 'Students' | 'Professionals' | 'Both';
  description: string;
  requirements: string;
  applyUrl: string;
  applyEmail: string;
  deadline: string; // YYYY-MM-DD
  tags: string; // comma-separated
  isActive: boolean;
};

const defaultForm: JobFormData = {
  title: '',
  company: '',
  location: '',
  workplaceType: 'Remote',
  employmentType: 'Full-time',
  audience: 'Both',
  description: '',
  requirements: '',
  applyUrl: '',
  applyEmail: '',
  deadline: '',
  tags: '',
  isActive: true,
};

function toDateInputValue(d?: string) {
  if (!d) return '';
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

export default function JobsAdminPage() {
  const [jobs, setJobs] = useState<JobDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<JobFormData>(defaultForm);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const fetchJobs = async () => {
    try {
      setError('');
      setLoading(true);
      const res = await fetch('/api/admin/jobs', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to fetch jobs');
      setJobs(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      if (statusFilter === 'active' && !j.isActive) return false;
      if (statusFilter === 'inactive' && j.isActive) return false;
      if (!q) return true;
      return (
        j.title?.toLowerCase().includes(q) ||
        j.company?.toLowerCase().includes(q) ||
        (j.location || '').toLowerCase().includes(q)
      );
    });
  }, [jobs, search, statusFilter]);

  const resetForm = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setError('');
  };

  const openCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (job: JobDoc) => {
    setEditingId(job._id);
    setFormData({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      workplaceType: (job.workplaceType as any) || 'Remote',
      employmentType: (job.employmentType as any) || 'Full-time',
      audience: (job.audience as any) || 'Both',
      description: job.description || '',
      requirements: job.requirements || '',
      applyUrl: job.applyUrl || '',
      applyEmail: job.applyEmail || '',
      deadline: toDateInputValue(job.deadline),
      tags: Array.isArray(job.tags) ? job.tags.join(', ') : '',
      isActive: !!job.isActive,
    });
    setError('');
    setDialogOpen(true);
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.company.trim()) return 'Company is required';
    if (!formData.description.trim()) return 'Description is required';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validateForm();
    if (msg) {
      setError(msg);
      return;
    }

    try {
      setError('');
      const payload = {
        ...formData,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : undefined,
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const url = editingId ? `/api/admin/jobs?id=${editingId}` : '/api/admin/jobs';
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || (editingId ? 'Failed to update job' : 'Failed to create job'));

      setDialogOpen(false);
      resetForm();
      await fetchJobs();
    } catch (e: any) {
      setError(e?.message || 'Failed to save job');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job?')) return;
    try {
      setError('');
      const res = await fetch(`/api/admin/jobs?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to delete job');
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (e: any) {
      setError(e?.message || 'Failed to delete job');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-lg">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-muted-foreground mt-2">Create, edit, and delete careers listings.</p>
        </div>

        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl w-[calc(100vw-1.5rem)] sm:w-full max-h-[90vh] overflow-hidden p-4 sm:p-6 grid-rows-[auto,1fr]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Job' : 'Create Job'}</DialogTitle>
              <DialogDescription>Fill in the job details. Apply URL/Email are optional.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
              <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workplaceType">Workplace</Label>
                    <Select
                      value={formData.workplaceType}
                      onValueChange={(v) =>
                        setFormData({ ...formData, workplaceType: v as JobFormData['workplaceType'] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Onsite">Onsite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employmentType">Employment</Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(v) =>
                        setFormData({ ...formData, employmentType: v as JobFormData['employmentType'] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="audience">Audience</Label>
                    <Select
                      value={formData.audience}
                      onValueChange={(v) => setFormData({ ...formData, audience: v as JobFormData['audience'] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Students">Students</SelectItem>
                        <SelectItem value="Professionals">Professionals</SelectItem>
                        <SelectItem value="Both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (optional)</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Lahore, PK"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline (optional)</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (optional)</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applyUrl">Apply URL (optional)</Label>
                    <Input
                      id="applyUrl"
                      value={formData.applyUrl}
                      onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applyEmail">Apply Email (optional)</Label>
                    <Input
                      id="applyEmail"
                      value={formData.applyEmail}
                      onChange={(e) => setFormData({ ...formData, applyEmail: e.target.value })}
                      placeholder="jobs@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="react, remote, internship"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex items-center gap-3 border rounded-md px-3 py-2">
                      <input
                        id="isActive"
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      <Label htmlFor="isActive" className="cursor-pointer">
                        Active (visible on /careers)
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t pt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingId ? 'Update Job' : 'Create Job'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-6">
        <Input
          placeholder="Search by title, company, location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-md"
        />
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Button variant="outline" onClick={fetchJobs}>
          Refresh
        </Button>
      </div>

      {error && !dialogOpen && (
        <div className="mb-6 p-4 text-red-600 bg-red-50 border border-red-200 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-10 text-center text-muted-foreground">No jobs found.</CardContent>
          </Card>
        ) : (
          filteredJobs.map((job) => (
            <Card key={job._id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="text-base line-clamp-2">{job.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{job.company}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(job)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(job._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={job.isActive ? 'default' : 'secondary'}>{job.isActive ? 'Active' : 'Inactive'}</Badge>
                  {job.workplaceType ? <Badge variant="secondary">{job.workplaceType}</Badge> : null}
                  {job.employmentType ? <Badge variant="secondary">{job.employmentType}</Badge> : null}
                  {job.audience ? <Badge variant="secondary">{job.audience}</Badge> : null}
                </div>
                {(job.location || job.deadline) && (
                  <div className="text-sm text-muted-foreground">
                    {job.location ? <div>Location: {job.location}</div> : null}
                    {job.deadline ? <div>Deadline: {new Date(job.deadline).toLocaleDateString()}</div> : null}
                  </div>
                )}
                <p className="text-sm line-clamp-3">{job.description}</p>
                {Array.isArray(job.tags) && job.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {job.tags.slice(0, 6).map((t, idx) => (
                      <Badge key={`${job._id}-${idx}`} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}


