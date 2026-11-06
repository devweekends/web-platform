/**
 * Rules for reading the Fellowship survey's free-text answers. Shared by the
 * admin dashboard and scripts/build-fellowship-impact.mjs, so the private and
 * public numbers are always counted the same way.
 */

/**
 * True only for an explicit yes ("Yes", "yes, at a research lab", "Yeah just 3")
 * or a count of at least one ("1.0"). Everything else counts as no, including
 * "No, I haven't cracked any job yet", which a plain keyword match would count.
 *
 * @param {string | null | undefined} value
 * @returns {boolean}
 */
export function answeredYes(value) {
  if (typeof value !== "string") return false
  const answer = value.trim().toLowerCase()
  if (/^(yes|yeah|yep|yup)\b/.test(answer)) return true
  const count = Number(answer)
  return answer !== "" && Number.isFinite(count) && count >= 1
}
