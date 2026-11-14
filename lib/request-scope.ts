import { getCloudflareContext } from '@opennextjs/cloudflare'

/**
 * An object unique to the request being served, on Cloudflare Workers.
 *
 * A Worker may not use a socket opened while serving a different request: the
 * second request hangs and is cancelled. So a database connection opened in
 * one request must not be reused by the next. The database helpers compare
 * this key with the one their connection was opened under.
 *
 * Returns undefined outside Workers (next dev, next build, scripts), where one
 * connection can be shared by every request as before.
 */
export function currentRequestKey(): object | undefined {
  try {
    return getCloudflareContext().ctx as object
  } catch {
    return undefined
  }
}
