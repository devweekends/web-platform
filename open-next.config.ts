// OpenNext for Cloudflare: how the site's Next.js cache runs on Workers.
// See https://opennext.js.org/cloudflare/caching
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import doShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";

export default defineCloudflareConfig({
  // Built pages are stored in R2, with a short copy in each data center's cache
  // so a popular page is not read from R2 on every visit. Short-lived, so a
  // revalidatePath() shows up within a minute.
  incrementalCache: withRegionalCache(r2IncrementalCache, { mode: "short-lived" }),
  // Pages past their revalidate time are rebuilt in the background
  queue: doQueue,
  // revalidatePath() from the cron and the admin routes
  tagCache: doShardedTagCache({ baseShardSize: 4 }),
  // Cached pages are answered without starting Next.js (no PPR on this site)
  enableCacheInterception: true,
});
