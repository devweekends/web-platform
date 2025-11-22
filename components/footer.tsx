import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const socialLinks = [
    {
      name: 'Linktree',
      url: 'https://linktr.ee/DevWeekends',
      icon: '/linktree.png'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/devweekends',
      icon: 'https://cdn.brandfetch.io/ido5G85nya/theme/light/id8qc6z_TX.svg?c=1dxbfHSJFAPEGdCLU4o5B'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/devweekends/',
      icon: 'https://cdn.brandfetch.io/idJFz6sAsl/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@devweekends',
      icon: 'https://cdn.brandfetch.io/idVfYwcuQz/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/groups/devweekends',
      icon: 'https://cdn.brandfetch.io/idpKX136kp/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B'
    },
    {
      name: 'Discord',
      url: 'https://discord.com/invite/c7Sn3yhvSh',
      icon: 'https://cdn.brandfetch.io/idM8Hlme1a/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B'
    }
  ]

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t">
      <div className="container sm:px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand and Social */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">DW</span>
              <span className="text-lg font-semibold">Dev Weekends</span>
            </Link>
            <p className="mt-2 text-xs text-muted-foreground">
              A community focused on mentorship to make you better Software Engineer
            </p>
            <div className="flex  flex-wrap gap-4 mt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="relative w-5 h-5 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    fill
                    className="object-contain hover:scale-110 transition-all duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex gap-12 md:gap-16">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Community</h3>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link href="/fellowship" className="text-muted-foreground hover:text-primary transition-colors">
                    Fellowship
                  </Link>
                </li>
                <li>
                  <Link href="/sessions" className="text-muted-foreground hover:text-primary transition-colors">
                    Sessions
                  </Link>
                </li>
                <li>
                  <Link href="/mentors" className="text-muted-foreground hover:text-primary transition-colors">
                    Mentors
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Information</h3>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <hr className="my-4 opacity-50" />
        <div className="text-center text-xs text-muted-foreground/70">
          <p>&copy; {new Date().getFullYear()} Dev Weekends. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

