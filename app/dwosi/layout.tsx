import type { ReactNode } from "react"
import { Geist_Mono } from "next/font/google"

import { DwosiFooter } from "./components/dwosi-footer"
import { DwosiHeader } from "./components/dwosi-header"
import "./dwosi.css"

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export default function DwosiLayout({ children }: { children: ReactNode }) {
  return (
    <div data-dwosi className={`${geistMono.variable} flex min-h-screen flex-col bg-background text-foreground`}>
      <DwosiHeader />
      <div className="flex-1">{children}</div>
      <DwosiFooter />
    </div>
  )
}
