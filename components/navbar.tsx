"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    // { href: "/", label: "Home" },
    // { href: "/mentors", label: "Mentors" },
    // { href: "/community", label: "Community" },
    // { href: "/resources", label: "Resources" },
    { href: "/fellowship", label: "Fellowship" },
    { href: "/about", label: "About" },
    { href: "/sessions", label: "Sessions" },
    // { href: "/ambassadors", label: "Ambassadors" },
    { href: "/mentorship", label: "Network" },
    // { href: "/mindmaster", label: "MindMaster" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className=" sm:inline-block text-xl font-semibold">
                Dev Weekends
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {routes.map((route) => (
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
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button asChild className="hidden md:inline-flex">
              <Link
                href="https://linktr.ee/DevWeekends"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Community
              </Link>
            </Button>

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
              {routes.map((route) => (
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
              ))}
              <Button className="w-full mt-2">Join Community</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
