import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteFooter } from "@/components/site-footer"
import Script from 'next/script'
import { Analytics } from "@/components/analytics"
import { LeadTracker } from "@/components/lead-tracker"
import { SiteHeader } from "@/components/site-header"
import { EmailChooser } from "@/components/email-chooser"
import { dwosiThemeScript } from "@/app/dwosi/theme"
import { SITE_URL, jsonLdString, siteJsonLd } from "@/lib/seo"

const inter = Inter({ subsets: ["latin"], display: "swap" })

// Without an id the tag would request gtag.js?id=undefined on every page view
const gaId = process.env.NEXT_PUBLIC_GA_ID

// Cloudflare Web Analytics site token for devweekends.com. It is public (it ships
// in the page) and only counts on the live site, so previews and local runs stay out.
// SITE_ENV is set to "production" only by `npm run deploy` (see package.json and wrangler.jsonc).
const cfBeaconToken = process.env.SITE_ENV === "production" ? "5206235d2175433195c5d83df73ba4fc" : undefined

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dev Weekends | Great engineers. Greater impact.",
    template: "%s | Dev Weekends"
  },
  description: "Great engineers. Greater impact. Dev Weekends is a free community of engineers with programs, mentorship, open source and partnerships that open doors to the world.",
  keywords: ["software engineering", "tech community", "coding bootcamp", "mentorship", "tech events", "developer community", "programming", "software development", "tech learning", "career development"],
  authors: [{ name: "Dev Weekends Team" }],
  creator: "Dev Weekends",
  publisher: "Dev Weekends",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: '16x16 32x32' },
      { url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicons/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Dev Weekends | Great engineers. Greater impact.",
    description: "Great engineers. Greater impact. Dev Weekends is a free community of engineers with programs, mentorship, open source and partnerships that open doors to the world.",
    siteName: "Dev Weekends",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Weekends | Great engineers. Greater impact.",
    description: "Great engineers. Greater impact. Dev Weekends is a free community of engineers with programs, mentorship, open source and partnerships that open doors to the world.",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicons/favicon.ico" sizes="16x16 32x32" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Dev Weekends: news, guides and blog" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLMs Full" />
        <link
          rel="alternate"
          type="application/json"
          href="/.well-known/agent-skills/index.json"
          title="Agent Skills Index"
        />
        <link rel="service-desc" type="application/openapi+json" href="/openapi.json" />
        <link rel="service-doc" type="text/html" href="/api-docs" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(siteJsonLd) }}
        />
        {/* DWOSI pages keep their own theme; apply a saved choice before paint */}
        <script dangerouslySetInnerHTML={{ __html: dwosiThemeScript }} />
        {gaId && (
          <>
            {/* Analytics waits until the page has loaded and the browser is idle, so
                its 150 KB script never competes with the page's own code on a phone */}
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                  // Events that happened before this tag loaded (see sendEvent in lib/analytics.ts)
                  (window.__dwEvents || []).forEach(function (e) { gtag('event', e[0], e[1]); });
                  window.__dwEvents = [];
                `,
              }}
            />
          </>
        )}
        {/* Real-visitor page views and Core Web Vitals, by page, country and device. No cookies. */}
        {cfBeaconToken && (
          <Script
            strategy="afterInteractive"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cfBeaconToken })}
          />
        )}
      </head>
      <body className={inter.className}>
        {/* The site is white with black panels. Light is forced so a visitor's dark mode does not change it. */}
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <Analytics />
              <LeadTracker />
              {children}
            </main>
            <SiteFooter />
          </div>
          <EmailChooser />
        </ThemeProvider>
      </body>
    </html>
  )
}

