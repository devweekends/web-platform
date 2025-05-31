import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, TreePalm, Youtube } from "lucide-react"

export default function Footer() {
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
            <div className="flex flex-wrap gap-3 mt-3">
              <Link
                href="https://linktr.ee/DevWeekends"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Linktree"
              >
                <TreePalm size={18} />
              </Link>
              <Link
                href="https://www.instagram.com/devweekends"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="https://github.com/devweekends"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/dev-weekends/"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </Link>
              <Link
                href="https://www.youtube.com/@devweekends"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </Link>
              <Link
                href="https://facebook.com/groups/devweekends"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </Link>
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
                {/* <li>
                  <Link href="/ambassadors" className="text-muted-foreground hover:text-primary transition-colors">
                    Ambassadors
                  </Link>
                </li> */}
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

