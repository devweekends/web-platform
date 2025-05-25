import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Script from 'next/script'
import { Analytics } from "@/components/analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://devweekends.com'),
  title: {
    default: "Dev Weekends - Your Gateway to becoming a better Software Engineer",
    template: "%s | Dev Weekends"
  },
  description: "Join a thriving community of students and tech enthusiasts learning, building, and growing together through weekend events and bootcamps. Learn from industry experts and enhance your skills in various tech domains.",
  keywords: ["software engineering", "tech community", "coding bootcamp", "mentorship", "tech events", "developer community", "programming", "software development", "tech learning", "career development"],
  authors: [{ name: "Dev Weekends Team" }],
  creator: "Dev Weekends",
  publisher: "Dev Weekends",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devweekends.com",
    title: "Dev Weekends - Your Gateway to becoming a better Software Engineer",
    description: "Join a thriving community of students and tech enthusiasts learning, building, and growing together through weekend events and bootcamps.",
    siteName: "Dev Weekends",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dev Weekends Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Weekends - Your Gateway to becoming a better Software Engineer",
    description: "Join a thriving community of students and tech enthusiasts learning, building, and growing together through weekend events and bootcamps.",
    images: ["/og-image.jpg"],
    creator: "@devweekends",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Analytics />
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

