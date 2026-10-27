/**
 * Order for video stories wherever they are shown: LFX first, then Google
 * Summer of Code (and the other summers of code), then senior engineers, then
 * everyone else. Inside each group YouTube videos come first. Stable, so
 * stories keep their incoming order within a group.
 */
export function storyRank(role = "", url = ""): number {
  const r = role.toLowerCase()
  const group = /lfx/.test(r)
    ? 0
    : /gsoc|summer of code|esoc/.test(r)
      ? 1
      : /senior|sr\.|lead|engineer|programmer/.test(r)
        ? 2
        : 3
  const youtube = /youtube\.com|youtu\.be/.test(url) ? 0 : 1
  return group * 2 + youtube
}

export function byStoryRank<T extends { role: string; url?: string | null }>(stories: T[]): T[] {
  return [...stories].sort((a, b) => storyRank(a.role, a.url ?? "") - storyRank(b.role, b.url ?? ""))
}
