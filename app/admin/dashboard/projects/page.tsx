'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminAddProjectModal } from '@/components/admin-add-project-modal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, CheckCircle, XCircle, Trash2, ExternalLink, Eye, Github, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  videoDemoUrl?: string;
  githubUrl?: string;
  submitterName: string;
  submitterEmail: string;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [viewProject, setViewProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: newStatus }),
      });

      if (res.ok) {
        setProjects(projects.map(p => 
          p._id === id ? { ...p, isApproved: newStatus } : p
        ));
      }
    } catch (error) {
      console.error('Failed to update status', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete project', error);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Community Projects</h2>
        <AdminAddProjectModal onSuccess={fetchProjects} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50">
                <tr>
                  <th className="px-6 py-3">Project</th>
                  <th className="px-6 py-3">Submitter</th>
                  <th className="px-6 py-3">Links</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id} className="border-b hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-muted shrink-0">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="max-w-[200px]">
                          <div className="font-medium truncate" title={project.title}>{project.title}</div>
                          <div className="text-xs text-muted-foreground truncate" title={project.description}>
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{project.submitterName}</div>
                      <div className="text-xs text-muted-foreground">{project.submitterEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {project.demoUrl && (
                          <Link href={project.demoUrl} target="_blank" className="text-blue-500 hover:underline">
                            Demo
                          </Link>
                        )}
                        {project.githubUrl && (
                          <Link href={project.githubUrl} target="_blank" className="text-blue-500 hover:underline">
                            Code
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={project.isApproved ? "default" : "secondary"} className={project.isApproved ? "bg-green-500 hover:bg-green-600" : ""}>
                        {project.isApproved ? "Live" : "Pending"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover:bg-muted"
                          onClick={() => setViewProject(project)}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {project.isApproved ? (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                            onClick={() => handleStatusChange(project._id, false)}
                            disabled={processingId === project._id}
                            title="Unpublish"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-green-500 hover:text-green-600 hover:bg-green-50"
                            onClick={() => handleStatusChange(project._id, true)}
                            disabled={processingId === project._id}
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(project._id)}
                          disabled={processingId === project._id}
                          title="Delete"
                        >
                          {processingId === project._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No project submissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!viewProject} onOpenChange={(open) => !open && setViewProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewProject && (
            <>
              <DialogHeader>
                <DialogTitle>{viewProject.title}</DialogTitle>
                <DialogDescription>
                  Submitted on {new Date(viewProject.createdAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={viewProject.imageUrl}
                    alt={viewProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {viewProject.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm">Submitter</h3>
                    <p className="text-sm">{viewProject.submitterName}</p>
                    <p className="text-sm text-muted-foreground">{viewProject.submitterEmail}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm">Status</h3>
                    <Badge variant={viewProject.isApproved ? "default" : "secondary"}>
                      {viewProject.isApproved ? "Live" : "Pending Review"}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {viewProject.demoUrl && (
                    <Button asChild className="flex-1">
                      <Link href={viewProject.demoUrl} target="_blank">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Demo
                      </Link>
                    </Button>
                  )}
                  {viewProject.videoDemoUrl && (
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={viewProject.videoDemoUrl} target="_blank">
                        <Video className="w-4 h-4 mr-2" />
                        Watch Video
                      </Link>
                    </Button>
                  )}
                  {viewProject.githubUrl && (
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={viewProject.githubUrl} target="_blank">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
