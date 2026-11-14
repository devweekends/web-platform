// The Cloudflare Worker entry. It wraps the Next.js app built by OpenNext
// (.open-next/worker.js, made by `opennextjs-cloudflare build`) and adds what
// Vercel used to do outside the app: the apex redirect and the daily cron.

// @ts-ignore: generated at build time
import { default as handler } from "./.open-next/worker.js";

type Env = { CRON_SECRET?: string; [key: string]: unknown };
// The two Workers runtime types used here (the full set clashes with the DOM types)
type ExecutionContext = { waitUntil(promise: Promise<unknown>): void; passThroughOnException(): void };
type ScheduledController = { scheduledTime: number; cron: string };

const CANONICAL_HOST = "www.devweekends.com";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    // devweekends.com is only an alias: send it to www permanently, keeping path and query
    if (url.hostname === "devweekends.com") {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 308);
    }
    return handler.fetch(request, env, ctx);
  },

  // Daily at 04:00 UTC (wrangler.jsonc): the LinkedIn feed collection route
  async scheduled(_event: ScheduledController, env: Env, ctx: ExecutionContext) {
    const request = new Request(`https://${CANONICAL_HOST}/api/cron/linkedin-feed`, {
      headers: { authorization: `Bearer ${env.CRON_SECRET ?? ""}` },
    });
    const response = await handler.fetch(request, env, ctx);
    console.log("Cron /api/cron/linkedin-feed:", response.status, await response.text());
  },
};

// Durable Objects used by the Next.js cache (open-next.config.ts)
// @ts-ignore: generated at build time
export { DOQueueHandler, DOShardedTagCache } from "./.open-next/worker.js";
