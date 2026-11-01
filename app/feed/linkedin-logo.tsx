/** LinkedIn's "in" mark, in LinkedIn blue unless a class overrides the fill */
export function LinkedInLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M7.1 9.3H4.6V19h2.5V9.3ZM5.85 5a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9ZM19.4 13.6c0-2.6-1.4-4.5-3.9-4.5-1.3 0-2.2.7-2.6 1.4V9.3h-2.4V19H13v-5.1c0-1.3.5-2.4 1.9-2.4 1.3 0 1.9 1 1.9 2.4V19h2.6v-5.4Z"
      />
    </svg>
  )
}
