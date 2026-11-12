'use client';

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        page_path?: string;
        page_location?: string;
        page_title?: string;
        [key: string]: any;
      }
    ) => void;
    /** Events sent before the analytics tag has loaded, kept until it has */
    __dwEvents?: [string, Record<string, unknown>][];
  }
}

// Initialize gtag
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

/**
 * Sends a named event to Google Analytics. The tag loads late on purpose (after
 * the page is idle), so an event that happens before then is kept in a short
 * queue, which the tag's start-up script in app/layout.tsx sends on.
 */
export function sendEvent(action: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  if (window.gtag) {
    window.gtag('event', action, params);
    return;
  }
  const queue = (window.__dwEvents = window.__dwEvents ?? []);
  if (queue.length < 50) queue.push([action, params]);
}

export const event = ({ action, params }: { action: string; params: any }) => {
  sendEvent(action, params);
};

// Custom event tracking functions
export const trackEvent = {
  // Session related events
  sessionView: (sessionName: string) => {
    event({
      action: 'view_session',
      params: {
        session_name: sessionName,
      },
    });
  },

  sessionRegister: (sessionName: string) => {
    event({
      action: 'register_session',
      params: {
        session_name: sessionName,
      },
    });
  },

  // Mentor related events
  mentorView: (mentorName: string) => {
    event({
      action: 'view_mentor',
      params: {
        mentor_name: mentorName,
      },
    });
  },

  mentorConnect: (mentorName: string) => {
    event({
      action: 'connect_mentor',
      params: {
        mentor_name: mentorName,
      },
    });
  },

  // Community related events
  joinCommunity: (platform: string) => {
    event({
      action: 'join_community',
      params: {
        platform: platform,
      },
    });
  },

  // Navigation events
  navigation: (from: string, to: string) => {
    event({
      action: 'navigation',
      params: {
        from: from,
        to: to,
      },
    });
  },
}; 