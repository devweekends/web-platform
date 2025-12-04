"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { href: "/about", label: "About" },
    { href: "/mindmaster", label: "MindMaster" },
    { href: "https://resources.devweekends.com", label: "Resources", external: true },
  ];

  const applyOptions = [
    { href: "/fellowship", label: "Fellowship" },
    { href: "/mentorship", label: "Mentorship" },
    { href: "/ambassador-program", label: "Ambassadorship" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/our-story" className="flex items-center space-x-2">
              <span className="sm:inline-block text-xl font-black tracking-tight">
                Dev Weekends
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {routes.map((route) =>
              route.external ? (
                <a
                  key={route.href}
                  href={route.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {route.label}
                </a>
              ) : (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(route.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {route.label}
                </Link>
              )
            )}
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            
            {/* Join Community Button */}
            <a
              href="https://discord.gg/Cy7Rgkf4Up"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 text-xs font-semibold uppercase tracking-[1px] hover:bg-foreground hover:text-background transition-all"
            >
              Join Community
            </a>
            
            {/* Apply Now Dropdown */}
            <div className="relative hidden md:block">
              <Button 
                onClick={() => setIsApplyOpen(!isApplyOpen)}
                className="uppercase tracking-[1px] text-xs font-semibold flex items-center gap-1"
              >
                Apply Now
                <ChevronDown className={`w-3 h-3 transition-transform ${isApplyOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isApplyOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsApplyOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border shadow-lg z-50">
                    {applyOptions.map((option) => (
                      <Link
                        key={option.href}
                        href={option.href}
                        className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        onClick={() => setIsApplyOpen(false)}
                      >
                        {option.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4 transform transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-4">
              {routes.map((route) =>
                route.external ? (
                  <a
                    key={route.href}
                    href={route.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.label}
                  </a>
                ) : (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(route.href)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.label}
                  </Link>
                )
              )}
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-semibold uppercase tracking-[2px] text-muted-foreground mb-3">Apply</p>
                {applyOptions.map((option) => (
                  <Link
                    key={option.href}
                    href={option.href}
                    className="block py-2 text-sm font-medium text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
