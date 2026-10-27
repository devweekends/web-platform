export type VideoProvider = 'YouTube' | 'Google Drive' | 'Loom';

export interface VideoEmbed {
  provider: VideoProvider;
  embedUrl: string;
  thumbnailUrl?: string;
}

function isSafeId(value: string | null) {
  return Boolean(value && /^[A-Za-z0-9_-]+$/.test(value));
}

/**
 * Converts the supported share URLs into trusted embed URLs. Keeping this in
 * one place also prevents user-provided URLs from being used directly in an iframe.
 */
export function getVideoEmbed(value?: string): VideoEmbed | null {
  if (!value?.trim()) return null;

  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }

  if (url.protocol !== 'https:') return null;

  const hostname = url.hostname.toLowerCase().replace(/^www\./, '');

  if (hostname === 'youtu.be') {
    const id = url.pathname.split('/').filter(Boolean)[0] ?? null;
    return isSafeId(id)
      ? {
          provider: 'YouTube',
          embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`,
          thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        }
      : null;
  }

  if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
    const segments = url.pathname.split('/').filter(Boolean);
    const id = url.searchParams.get('v')
      ?? (['embed', 'shorts', 'live'].includes(segments[0]) ? segments[1] : null);

    return isSafeId(id)
      ? {
          provider: 'YouTube',
          embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`,
          thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        }
      : null;
  }

  if (hostname === 'drive.google.com') {
    const fileMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
    const id = fileMatch?.[1] ?? url.searchParams.get('id');
    return isSafeId(id)
      ? {
          provider: 'Google Drive',
          embedUrl: `https://drive.google.com/file/d/${id}/preview`,
          thumbnailUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
        }
      : null;
  }

  if (hostname === 'loom.com') {
    const loomMatch = url.pathname.match(/\/(?:share|embed)\/([A-Za-z0-9_-]+)/);
    const id = loomMatch?.[1] ?? null;
    return isSafeId(id)
      ? {
          provider: 'Loom',
          embedUrl: `https://www.loom.com/embed/${id}?autoplay=1`,
        }
      : null;
  }

  return null;
}
