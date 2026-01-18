'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, Trash2, Eye, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AdminAddTestimonialModal } from '@/components/admin-add-testimonial-modal';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  email: string;
  content: string;
  videoUrl?: string;
  imageUrl: string;
  type: 'text' | 'video';
  isApproved: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [viewTestimonial, setViewTestimonial] = useState<Testimonial | null>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: newStatus }),
      });

      if (res.ok) {
        setTestimonials(testimonials.map(t => 
          t._id === id ? { ...t, isApproved: newStatus } : t
        ));
      }
    } catch (error) {
      console.error('Failed to update status', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTestimonials(testimonials.filter(t => t._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete testimonial', error);
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
        <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
        <AdminAddTestimonialModal onSuccess={fetchTestimonials} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Community Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50">
                <tr>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Role & Type</th>
                  <th className="px-6 py-3">Content Preview</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t._id} className="border-b hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted shrink-0">
                          <Image
                            src={t.imageUrl}
                            alt={t.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-muted-foreground">{t.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{t.role}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {t.type === 'video' ? <PlayCircle className="w-3 h-3" /> : null}
                          <span className="capitalize">{t.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="line-clamp-2 max-w-[250px] text-muted-foreground italic">
                        "{t.content}"
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={t.isApproved ? "default" : "secondary"} className={t.isApproved ? "bg-green-500 hover:bg-green-600" : ""}>
                        {t.isApproved ? "Live" : "Pending"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-US', {
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
                          onClick={() => setViewTestimonial(t)}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {t.isApproved ? (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                            onClick={() => handleStatusChange(t._id, false)}
                            disabled={processingId === t._id}
                            title="Unpublish"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-green-500 hover:text-green-600 hover:bg-green-50"
                            onClick={() => handleStatusChange(t._id, true)}
                            disabled={processingId === t._id}
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(t._id)}
                          disabled={processingId === t._id}
                          title="Delete"
                        >
                          {processingId === t._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {testimonials.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No testimonials found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!viewTestimonial} onOpenChange={(open) => !open && setViewTestimonial(null)}>
        <DialogContent className="max-w-xl">
          {viewTestimonial && (
            <>
              <DialogHeader>
                <DialogTitle>Testimonial Details</DialogTitle>
                <DialogDescription>
                  Submitted on {new Date(viewTestimonial.createdAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={viewTestimonial.imageUrl}
                      alt={viewTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{viewTestimonial.name}</h3>
                    <p className="text-muted-foreground">{viewTestimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{viewTestimonial.email}</p>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg italic text-foreground/90">
                  "{viewTestimonial.content}"
                </div>

                {viewTestimonial.videoUrl && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Video URL</h4>
                    <a 
                      href={viewTestimonial.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-all text-sm"
                    >
                      {viewTestimonial.videoUrl}
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
