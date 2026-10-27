'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle2, Loader2, Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const emptyForm = {
  title: '',
  description: '',
  demoUrl: '',
  videoDemoUrl: '',
  githubUrl: '',
  submitterName: '',
  submitterEmail: '',
}

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]'
const field = `min-h-11 w-full rounded-xl border border-[#D4D4D4] bg-white px-3.5 py-2.5 text-[15px] text-[#0A0A0A] placeholder:text-[#8A8A8A] ${focusRing}`
const label = 'text-sm font-semibold text-[#0A0A0A]'

const triggerStyles = {
  primary: 'bg-[#0A0A0A] text-white hover:bg-[#262626]',
  onDark: 'bg-white text-[#0A0A0A] hover:bg-[#E6E6E6]',
}

/**
 * Submit-a-project dialog for the projects page, in the new look. Same form,
 * same upload and API calls as the older SubmitProjectModal, which the DSOC
 * pages still use.
 */
export function SubmitProjectDialog({ variant = 'primary' }: { variant?: keyof typeof triggerStyles }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'submitting'>('idle')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState(emptyForm)

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
    setError(null)

    try {
      let imageUrl = ''

      // Upload the image first
      if (imageFile) {
        setStatus('uploading')
        const upload = new FormData()
        upload.append('file', imageFile)

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: upload,
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, imageUrl }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }

      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setFormData(emptyForm)
        setImageFile(null)
        setImagePreview(null)
        setStatus('idle')
      }, 2000)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('idle')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`inline-flex min-h-[52px] items-center justify-center rounded-xl px-7 py-4 text-base font-semibold transition-colors ${triggerStyles[variant]} ${focusRing}`}
        >
          Submit your project
        </button>
      </DialogTrigger>
      <DialogContent className="block max-h-[90vh] space-y-5 overflow-y-auto rounded-[24px] border-[#E6E6E6] bg-white p-6 text-[#0A0A0A] sm:max-w-[560px] sm:rounded-[24px] sm:p-8">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="pr-6 text-[26px] font-semibold leading-tight tracking-[-0.03em] text-[#0A0A0A]">
            Submit a project
          </DialogTitle>
          <DialogDescription className="text-[15px] leading-[1.6] text-[#5C5C5C]">
            Share your project with the community. It will be reviewed before publishing.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
            <CheckCircle2 className="h-14 w-14 text-[#0A0A0A]" aria-hidden="true" />
            <h3 className="text-xl font-semibold tracking-[-0.02em]">Submission received</h3>
            <p className="text-[15px] text-[#5C5C5C]">Your project has been submitted for review.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="project-title" className={label}>Project title *</label>
              <input id="project-title" required className={field} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>

            <div className="space-y-2">
              <label htmlFor="project-description" className={label}>Description *</label>
              <textarea id="project-description" required className={`${field} min-h-[120px] resize-y leading-[1.6]`} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>

            <div className="space-y-2">
              <p className={label}>Project image *</p>
              <div className="flex items-center gap-4">
                <input type="file" accept="image/*" onChange={handleImageChange} className="sr-only peer" id="project-image" required />
                <label
                  htmlFor="project-image"
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-[#D4D4D4] px-4 text-[15px] font-semibold hover:bg-[#F7F7F7] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0A0A0A]"
                >
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  Upload image
                </label>
                {imagePreview && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-[#E6E6E6]">
                    <Image src={imagePreview} alt="Preview of the selected project image" fill unoptimized className="object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="project-video" className={label}>Video demo URL (Loom, YouTube, etc.)</label>
              <input id="project-video" type="url" placeholder="https://loom.com/..." className={field} value={formData.videoDemoUrl} onChange={(e) => setFormData({ ...formData, videoDemoUrl: e.target.value })} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="project-demo" className={label}>Demo URL</label>
                <input id="project-demo" type="url" placeholder="https://..." className={field} value={formData.demoUrl} onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label htmlFor="project-github" className={label}>GitHub URL</label>
                <input id="project-github" type="url" placeholder="https://github.com/..." className={field} value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="project-name" className={label}>Your name *</label>
                <input id="project-name" required className={field} value={formData.submitterName} onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label htmlFor="project-email" className={label}>Email *</label>
                <input id="project-email" type="email" required className={field} value={formData.submitterEmail} onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })} />
              </div>
            </div>

            {error && <p role="alert" className="rounded-xl border border-[#0A0A0A] px-4 py-3 text-sm font-semibold text-[#0A0A0A]">{error}</p>}

            <button
              type="submit"
              disabled={status !== 'idle'}
              className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#0A0A0A] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
            >
              {status !== 'idle' && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              {status === 'uploading' ? 'Uploading image...' : status === 'submitting' ? 'Submitting project...' : 'Submit project'}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
