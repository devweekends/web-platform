"use client"

import { useEffect } from "react"

import { sendEvent } from "@/lib/analytics"

/**
 * Counts the clicks that turn a visitor into a lead, as Google Analytics events:
 *
 * - `join_community_click`: a link to one of the community groups (Discord,
 *   WhatsApp, LinkedIn or Facebook group), such as "Join the community".
 * - `apply_program_click`: an "Apply ..." button, or a program in an
 *   "Apply to a program" list (those are marked with `data-lead="apply_program"`
 *   because their text is the program's name).
 *
 * One listener on the document covers every page and every button, including
 * ones added later, so no button needs its own code. The groups and most
 * application forms live on other sites, so for those the click is the last
 * thing this site can see.
 */

function communityPlatform(url: URL): string | undefined {
  const host = url.hostname.replace(/^www\./, "")
  if (host === "discord.gg" || (host === "discord.com" && url.pathname.startsWith("/invite"))) return "discord"
  if (host === "chat.whatsapp.com" || (host === "whatsapp.com" && url.pathname.startsWith("/channel"))) return "whatsapp"
  if (host === "linkedin.com" && url.pathname.startsWith("/groups")) return "linkedin"
  if (host === "facebook.com" && url.pathname.startsWith("/groups")) return "facebook"
  return undefined
}

/** Where on the page the link sits: header, footer, or the id of its section */
function placementOf(link: HTMLAnchorElement): string {
  if (link.closest("header")) return "header"
  if (link.closest("footer")) return "footer"
  return link.closest("section[id], [role='dialog'], nav[aria-label]")?.id || "page"
}

export function LeadTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!link) return

      let url: URL
      try {
        url = new URL(link.href, window.location.href)
      } catch {
        return
      }

      const text = (link.innerText || link.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().slice(0, 80)
      const marked = link.closest<HTMLElement>("[data-lead]")
      const platform = communityPlatform(url)
      const isApply = marked?.dataset.lead === "apply_program" || /^apply\b/i.test(text)

      const name = platform ? "join_community_click" : isApply ? "apply_program_click" : undefined
      if (!name) return

      sendEvent(name, {
        link_text: text,
        link_url: url.href.slice(0, 100),
        link_domain: url.hostname,
        placement: placementOf(link),
        page_path: window.location.pathname,
        ...(platform ? { platform } : {}),
        ...(marked?.dataset.leadProgram ? { program: marked.dataset.leadProgram } : {}),
      })
    }

    // Capture phase: runs before a menu that closes on click removes the link from the page
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  return null
}
