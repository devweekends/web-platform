'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Code2,
  Users,
  Rocket,
  MessageCircle,
  Zap,
  Star,
  ChevronDown,
  Menu,
  X,
  LogIn,
  Home,
  LogOut
} from "lucide-react";
import { HeadlineBar } from "@/components/headline-bar";

const DISCORD_URL = "https://discord.com/invite/Cy7Rgkf4Up";

const navLink =
  "inline-flex min-h-11 items-center gap-1.5 rounded-[10px] px-3 text-[15px] font-medium text-[#404040] transition-colors hover:text-black";
const dropdownPanel =
  "absolute left-0 top-full z-50 mt-2 w-[290px] rounded-[18px] border border-[#E6E6E6] bg-white p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]";
const dropdownItem =
  "flex min-h-11 w-full items-start gap-3 rounded-[10px] p-3 text-left transition-colors hover:bg-[#F7F7F7]";
const mobileLink =
  "flex min-h-12 w-full items-center gap-3 border-b border-[#E6E6E6] text-left";
const primaryButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-[#0A0A0A] px-[18px] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#262626]";

function ItemText({ title, hint }: { title: string; hint: string }) {
  return (
    <span>
      <span className="block text-[15px] font-semibold text-[#0A0A0A]">{title}</span>
      <span className="mt-0.5 block text-[13px] text-[#5C5C5C]">{hint}</span>
    </span>
  );
}

function ItemIcon({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] bg-[#F7F7F7] text-[#0A0A0A]">
      {children}
    </span>
  );
}

export default function DSOCNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [sessionRole, setSessionRole] = useState<'mentee' | 'mentor' | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setExploreOpen(false);
      }
      if (joinRef.current && !joinRef.current.contains(event.target as Node)) {
        setJoinOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExploreOpen(false);
        setJoinOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const [menteeRes, mentorRes] = await Promise.all([
        fetch('/api/dsoc/mentee/me', { credentials: 'include' }),
        fetch('/api/dsoc/mentor/me', { credentials: 'include' })
      ]);
      const [menteeData, mentorData] = await Promise.all([
        menteeRes.json(),
        mentorRes.json()
      ]);

      if (menteeData?.success) {
        setSessionRole('mentee');
      } else if (mentorData?.success) {
        setSessionRole('mentor');
      } else {
        setSessionRole(null);
      }
    } catch (error) {
      console.error('Error checking DSOC session:', error);
      setSessionRole(null);
    } finally {
      setSessionChecked(true);
    }
  };

  const handleLogout = async () => {
    try {
      const endpoint = sessionRole === 'mentor'
        ? '/api/dsoc/mentor/logout'
        : '/api/dsoc/mentee/logout';

      await fetch(endpoint, { method: 'POST' });
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setSessionRole(null);
      setSessionChecked(true);
      router.push('/dsoc/login');
    }
  };

  const dashboardPath = sessionRole === 'mentor'
    ? '/dsoc/mentor/dashboard'
    : '/dsoc/mentee/dashboard';

  return (
    <div className="sticky top-0 z-50 w-full">
      <HeadlineBar />
      <header className="border-b border-[#E6E6E6] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
          {/* Logo */}
          <Link href="/dsoc" className="flex min-h-11 items-center gap-3" aria-label="DSOC home">
            <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#0A0A0A] text-white">
              <Code2 className="h-5 w-5" />
            </span>
            <span className="text-xl font-semibold tracking-[-0.03em] text-[#0A0A0A]">DSOC</span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="DSOC" className="hidden items-center gap-2 lg:flex">
            {/* Explore Dropdown */}
            <div ref={exploreRef} className="relative">
              <button
                type="button"
                aria-expanded={exploreOpen}
                aria-haspopup="true"
                aria-controls="dsoc-explore-menu"
                onClick={() => { setExploreOpen(!exploreOpen); setJoinOpen(false); }}
                className={navLink}
              >
                Explore
                <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${exploreOpen ? 'rotate-180' : ''}`} />
              </button>
              {exploreOpen && (
                <div id="dsoc-explore-menu" className={dropdownPanel}>
                  <Link href="/dsoc/projects" className={dropdownItem} onClick={() => setExploreOpen(false)}>
                    <ItemIcon><Code2 className="h-4 w-4" /></ItemIcon>
                    <ItemText title="Projects" hint="Browse open source projects" />
                  </Link>
                  <Link href="/dsoc/projects?difficulty=beginner" className={dropdownItem} onClick={() => setExploreOpen(false)}>
                    <ItemIcon><Star className="h-4 w-4" /></ItemIcon>
                    <ItemText title="Beginner Friendly" hint="Perfect for first-timers" />
                  </Link>
                  <Link href="/dsoc/projects?status=open" className={dropdownItem} onClick={() => setExploreOpen(false)}>
                    <ItemIcon><Zap className="h-4 w-4" /></ItemIcon>
                    <ItemText title="Open Now" hint="Accepting applications" />
                  </Link>
                  <div className="my-2 border-t border-[#E6E6E6]" />
                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={dropdownItem}>
                    <ItemIcon><MessageCircle className="h-4 w-4" /></ItemIcon>
                    <ItemText title="Community" hint="Join our Discord" />
                  </a>
                </div>
              )}
            </div>

            <Link href="/dsoc/projects" className={navLink}>
              Projects
            </Link>

            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={navLink}>
              Community
            </a>

            {/* Join Dropdown */}
            <div ref={joinRef} className="relative">
              <button
                type="button"
                aria-expanded={joinOpen}
                aria-haspopup="true"
                aria-controls="dsoc-join-menu"
                onClick={() => { setJoinOpen(!joinOpen); setExploreOpen(false); }}
                className={navLink}
              >
                Join
                <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${joinOpen ? 'rotate-180' : ''}`} />
              </button>
              {joinOpen && (
                <div id="dsoc-join-menu" className={dropdownPanel}>
                  {sessionChecked && sessionRole ? (
                    <>
                      <Link href={dashboardPath} className={dropdownItem} onClick={() => setJoinOpen(false)}>
                        <ItemIcon><Code2 className="h-4 w-4" /></ItemIcon>
                        <ItemText title="Dashboard" hint="View your DSOC workspace" />
                      </Link>
                      <div className="my-2 border-t border-[#E6E6E6]" />
                      <button
                        type="button"
                        onClick={() => { setJoinOpen(false); handleLogout(); }}
                        className={dropdownItem}
                      >
                        <ItemIcon><LogOut className="h-4 w-4" /></ItemIcon>
                        <ItemText title="Logout" hint="Sign out of DSOC" />
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/dsoc/register/mentee" className={dropdownItem} onClick={() => setJoinOpen(false)}>
                        <ItemIcon><Rocket className="h-4 w-4" /></ItemIcon>
                        <ItemText title="Apply as Mentee" hint="Start your journey" />
                      </Link>
                      <Link href="/dsoc/register/mentor" className={dropdownItem} onClick={() => setJoinOpen(false)}>
                        <ItemIcon><Users className="h-4 w-4" /></ItemIcon>
                        <ItemText title="Become a Mentor" hint="Guide the next generation" />
                      </Link>
                      <div className="my-2 border-t border-[#E6E6E6]" />
                      <Link href="/dsoc/login" className={dropdownItem} onClick={() => setJoinOpen(false)}>
                        <ItemIcon><LogIn className="h-4 w-4" /></ItemIcon>
                        <ItemText title="Login" hint="Already registered?" />
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Account actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/team"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-[#404040] transition-colors hover:bg-[#F7F7F7] hover:text-black"
              title="Dev Weekends"
              aria-label="Dev Weekends"
            >
              <Home aria-hidden="true" className="h-5 w-5" />
            </Link>
            {sessionChecked && sessionRole ? (
              <>
                <Link href={dashboardPath} className={navLink}>
                  <Code2 aria-hidden="true" className="h-4 w-4" />
                  Dashboard
                </Link>
                <button type="button" onClick={handleLogout} className={navLink}>
                  <LogOut aria-hidden="true" className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : sessionChecked ? (
              <>
                <Link href="/dsoc/login" className={navLink}>
                  <LogIn aria-hidden="true" className="h-4 w-4" />
                  Login
                </Link>
                <Link href="/dsoc/register/mentee" className={primaryButton}>
                  Apply Now
                </Link>
              </>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#E6E6E6] text-[#0A0A0A] lg:hidden"
          >
            {isOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-[#E6E6E6] bg-white lg:hidden">
            <nav aria-label="DSOC mobile" className="flex flex-col px-6 py-2 text-[17px] font-medium">
              <Link href="/team" className={mobileLink} onClick={() => setIsOpen(false)}>
                <Home aria-hidden="true" className="h-5 w-5" /> Dev Weekends
              </Link>
              <Link href="/dsoc/projects" className={mobileLink} onClick={() => setIsOpen(false)}>
                <Code2 aria-hidden="true" className="h-5 w-5" /> Projects
              </Link>
              <Link href="/dsoc/projects?difficulty=beginner" className={mobileLink} onClick={() => setIsOpen(false)}>
                <Star aria-hidden="true" className="h-5 w-5" /> Beginner Friendly
              </Link>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={mobileLink}>
                <MessageCircle aria-hidden="true" className="h-5 w-5" /> Community
              </a>
              {sessionChecked && sessionRole ? (
                <>
                  <Link href={dashboardPath} className={mobileLink} onClick={() => setIsOpen(false)}>
                    <Code2 aria-hidden="true" className="h-5 w-5" /> Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    className={mobileLink}
                  >
                    <LogOut aria-hidden="true" className="h-5 w-5" /> Logout
                  </button>
                </>
              ) : sessionChecked ? (
                <>
                  <Link href="/dsoc/register/mentee" className={mobileLink} onClick={() => setIsOpen(false)}>
                    <Rocket aria-hidden="true" className="h-5 w-5" /> Apply as Mentee
                  </Link>
                  <Link href="/dsoc/register/mentor" className={mobileLink} onClick={() => setIsOpen(false)}>
                    <Users aria-hidden="true" className="h-5 w-5" /> Become a Mentor
                  </Link>
                  <Link href="/dsoc/login" className={mobileLink} onClick={() => setIsOpen(false)}>
                    <LogIn aria-hidden="true" className="h-5 w-5" /> Login
                  </Link>
                </>
              ) : null}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
