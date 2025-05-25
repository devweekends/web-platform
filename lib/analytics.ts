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

export const event = ({ action, params }: { action: string; params: any }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
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