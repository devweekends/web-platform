'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function SocialModal() {
  const [showModal, setShowModal] = useState(false)
  const pathname = usePathname()
  const STORAGE_KEY = 'dw-community-modal-dismissed-at'
  const SUPPRESS_MS = 2 * 24 * 60 * 60 * 1000 // 2 days

  useEffect(() => {
    if (pathname === '/mentorship') {
      return
    }
    const timer = setTimeout(() => {
      try {
        const last = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
        if (last) {
          const lastTs = parseInt(last, 10)
          if (!Number.isNaN(lastTs) && Date.now() - lastTs < SUPPRESS_MS) {
            setShowModal(false)
            return
          }
        }
      } catch {}
      setShowModal(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname, SUPPRESS_MS])

  const handleClose = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, Date.now().toString())
      }
    } catch {}
    setShowModal(false)
  }

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/devweekends/',
      icon: 'https://cdn.brandfetch.io/idJFz6sAsl/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
      color: 'hover:bg-[#0077B5]/10'
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/Cy7Rgkf4Up',
      icon: 'https://cdn.brandfetch.io/idM8Hlme1a/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
      color: 'hover:bg-[#5865F2]/10'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/devweekends/',
      icon: 'https://cdn.brandfetch.io/ido5G85nya/theme/light/id8qc6z_TX.svg?c=1dxbfHSJFAPEGdCLU4o5B',
      color: 'hover:bg-[#E4405F]/10'
    },
    {
      name: 'Linktree',
      url: 'https://linktr.ee/DevWeekends',
      icon: '/linktree.png',
      color: 'hover:bg-[#43E660]/10'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@devweekends',
      icon: 'https://cdn.brandfetch.io/idVfYwcuQz/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
      color: 'hover:bg-[#FF0000]/10'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/DevWeekends/',
      icon: 'https://cdn.brandfetch.io/idpKX136kp/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
      color: 'hover:bg-[#1877F2]/10'
    }
  ]

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300"
        onClick={handleClose}
      />
      <Card className="max-w-md w-full relative z-10 animate-modalIn mx-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleClose} 
          className="absolute top-4 right-4 hover:bg-muted"
        >
          <X className="w-4 h-4" />
        </Button>
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Join Our Community
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Follow us to stay updated with latest announcements and events
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 p-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${social.color} hover:scale-[1.02]`}
            >
              <div className="relative w-6 h-6 flex-shrink-0">
                <Image
                  src={social.icon}
                  alt={social.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-medium">{social.name}</span>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  )
} 