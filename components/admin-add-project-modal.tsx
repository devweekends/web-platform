'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload, Plus } from "lucide-react"
import Image from "next/image"

export function AdminAddProjectModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    demoUrl: '',
    videoDemoUrl: '',
    githubUrl: '',
    submitterName: 'Admin', // Default for admin adds
    submitterEmail: 'admin@devweekends.com'
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = ''

      // Upload image first if exists
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (!uploadRes.ok) throw new Error('Image upload failed')
        const uploadData = await uploadRes.json()
        imageUrl = uploadData.url
      } else {
        throw new Error('Image is required')
      }

      // Submit project data (Admin POST is auto-approved)
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          imageUrl
        })
      })

      if (!res.ok) throw new Error('Submission failed')

      setOpen(false)
      setFormData({
        title: '',
        description: '',
        demoUrl: '',
        videoDemoUrl: '',
        githubUrl: '',
        submitterName: 'Admin',
        submitterEmail: 'admin@devweekends.com'
      })
      setImageFile(null)
      setImagePreview(null)
      onSuccess()

    } catch (error) {
      console.error(error)
      alert('Failed to add project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Manually add a project. It will be automatically approved.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-proj-title">Project Title *</Label>
            <Input
              id="admin-proj-title"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-proj-desc">Description *</Label>
            <Textarea
              id="admin-proj-desc"
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Project Image *</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="admin-proj-image-upload"
                required
              />
              <Label
                htmlFor="admin-proj-image-upload"
                className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </Label>
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-proj-video">Video Demo URL</Label>
            <Input
              id="admin-proj-video"
              type="url"
              placeholder="https://loom.com/..."
              value={formData.videoDemoUrl}
              onChange={(e) => setFormData({...formData, videoDemoUrl: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="admin-proj-demo">Demo URL</Label>
              <Input
                id="admin-proj-demo"
                type="url"
                placeholder="https://..."
                value={formData.demoUrl}
                onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-proj-github">GitHub URL</Label>
              <Input
                id="admin-proj-github"
                type="url"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="admin-proj-name">Submitter Name</Label>
              <Input
                id="admin-proj-name"
                required
                value={formData.submitterName}
                onChange={(e) => setFormData({...formData, submitterName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-proj-email">Submitter Email</Label>
              <Input
                id="admin-proj-email"
                type="email"
                required
                value={formData.submitterEmail}
                onChange={(e) => setFormData({...formData, submitterEmail: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add & Publish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
