"use client"

import { useState, type FormEvent } from "react"

import { LinkedInLogo } from "./linkedin-logo"
import { button, card, field, text } from "./ui"

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done" | "error"; message: string }

export function SubmitPostForm() {
  const [url, setUrl] = useState("")
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus({ kind: "sending" })
    try {
      const response = await fetch("/api/feed/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await response.json()
      if (!response.ok) {
        setStatus({ kind: "error", message: data.error ?? "Unable to submit your post right now." })
        return
      }
      setStatus({ kind: "done", message: data.message })
      setUrl("")
    } catch {
      setStatus({ kind: "error", message: "Unable to submit your post right now. Please try again." })
    }
  }

  return (
    <form id="share" onSubmit={submit} className={`${card} scroll-mt-24 p-6`}>
      <div className="flex items-center gap-2">
        <LinkedInLogo className="h-6 w-6" />
        <label htmlFor="feed-post-url" className={text.title}>
          Share your post
        </label>
      </div>
      <p className={`mt-2 ${text.body}`}>
        Posted about your Dev Weekends journey with #DevWeekends? Paste the link and it appears here after a quick
        review.
      </p>
      <input
        id="feed-post-url"
        type="url"
        required
        inputMode="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://www.linkedin.com/posts/..."
        aria-describedby="feed-post-status"
        className={`mt-4 ${field}`}
      />
      <button type="submit" disabled={status.kind === "sending"} className={`mt-3 w-full ${button.primary}`}>
        {status.kind === "sending" ? "Submitting…" : "Submit for review"}
      </button>
      <p
        id="feed-post-status"
        aria-live="polite"
        className={`mt-2 min-h-6 text-[13px] leading-5 ${status.kind === "error" ? "text-[#B91C1C]" : "text-[#404040]"}`}
      >
        {status.kind === "done" || status.kind === "error" ? status.message : ""}
      </p>
    </form>
  )
}
