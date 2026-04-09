'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export function SubmitProjectModal() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'submitting'>('idle')
  const [success, setSuccess] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    demoUrl: '',
    videoDemoUrl: '',
    githubUrl: '',
    submitterName: '',
    submitterEmail: ''
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
    
    try {
      let imageUrl = ''

      // Upload image first if exists
      if (imageFile) {
        setStatus('uploading')
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

      // Submit project data
      setStatus('submitting')
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          imageUrl
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }

      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setFormData({
            title: '',
            description: '',
            demoUrl: '',
            videoDemoUrl: '',
            githubUrl: '',
            submitterName: '',
            submitterEmail: ''
        })
        setImageFile(null)
        setImagePreview(null)
        setStatus('idle')
      }, 2000)

    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'Something went wrong')
      setStatus('idle')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="font-semibold">
          Submit Your Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Project</DialogTitle>
          <DialogDescription>
            Share your project with the community. It will be reviewed before publishing.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-medium">Submission Received!</h3>
            <p className="text-center text-muted-foreground">
              Your project has been submitted for review.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
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
                  id="image-upload"
                  required
                />
                <Label
                  htmlFor="image-upload"
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
              <Label htmlFor="videoDemoUrl">Video Demo URL (Loom, YouTube, etc.)</Label>
              <Input
                id="videoDemoUrl"
                type="url"
                placeholder="https://loom.com/..."
                value={formData.videoDemoUrl}
                onChange={(e) => setFormData({...formData, videoDemoUrl: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  type="url"
                  placeholder="https://..."
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.submitterName}
                  onChange={(e) => setFormData({...formData, submitterName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.submitterEmail}
                  onChange={(e) => setFormData({...formData, submitterEmail: e.target.value})}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={status !== 'idle'} className="w-full">
                {status !== 'idle' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {status === 'uploading' ? 'Uploading Image...' : status === 'submitting' ? 'Submitting Project...' : 'Submit Project'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
