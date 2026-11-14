import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { collectFromOlostep } from '@/lib/linkedin-feed';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * Daily cron (the Worker's scheduled handler, see worker.ts and wrangler.jsonc):
 * discovers new public #DevWeekends LinkedIn posts through Olostep. The handler
 * sends `Authorization: Bearer $CRON_SECRET`.
 * Each search costs Olostep credits; FEED_COLLECT_QUERIES sets how many run.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.OLOSTEP_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OLOSTEP_API_KEY is not set' }, { status: 500 });
  }

  try {
    const result = await collectFromOlostep(apiKey, Number(process.env.FEED_COLLECT_QUERIES) || 5);
    if (result.added > 0 || result.enriched > 0) revalidatePath('/feed');
    console.log('LinkedIn feed collection:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('LinkedIn feed collection failed:', error);
    return NextResponse.json({ error: 'Collection failed' }, { status: 500 });
  }
}
