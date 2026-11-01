/**
 * Types and labels for the /feed LinkedIn wall that both the server and the
 * browser use. Server-only logic (Olostep, database) lives in linkedin-feed.ts.
 */

export const FEED_TOPICS: Record<string, string> = {
  fellowship: 'Fellowship',
  engineering: 'Engineering',
  'open-source': 'Open Source',
  coding: 'Coding & DSA',
  web: 'Web Development',
  ai: 'AI & Data',
  community: 'Community',
}

/** Handles of the official Dev Weekends LinkedIn page */
export const OFFICIAL_HANDLES = new Set(['devweekends', 'dev-weekends'])

/** LinkedIn's official embed for a public post. LinkedIn allows framing it on any site. */
export function linkedInEmbedUrl(activityId: string) {
  return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`
}

/** A post as sent to the browser: plain, serializable fields only */
export interface FeedPost {
  id: string
  url: string
  author: string
  handle: string
  title: string
  excerpt: string
  topic: string
  tags: string[]
  /** ISO date, or null when the activity ID gave no usable date */
  postedAt: string | null
}
