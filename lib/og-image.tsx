import { readFile } from 'fs/promises'
import path from 'path'
import { ImageResponse } from 'next/og'

import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_ALT = `${SITE_NAME}. ${SITE_TAGLINE}`

/**
 * Default share image: the real logo (wordmark with the seven week bars, white,
 * from public/brand) on black, with the tagline beside it.
 */
export async function renderDefaultOgImage() {
  const logo = await readFile(path.join(process.cwd(), 'public/brand/dw-logo-week-white.png'))
  const src = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 72,
          background: '#0A0A0A',
          color: '#FFFFFF',
          padding: '0 96px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={327} height={282} />
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          <span>Great engineers.</span>
          <span style={{ color: '#8A8A8A' }}>Greater impact.</span>
        </div>
      </div>
    ),
    OG_SIZE,
  )
}
