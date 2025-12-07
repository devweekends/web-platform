'use client';

import Link from "next/link";
import { Rocket, Users, ArrowLeft } from "lucide-react";
import "../styles.css";
import DSOCNavbar from "../components/DSOCNavbar";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <DSOCNavbar />
      <div className="pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <Link 
            href="/dsoc" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to DSOC
          </Link>

          <div className="neo-brutal-card p-8 text-center">
            <h1 className="text-3xl font-black mb-2">Join DSOC</h1>
            <p className="text-muted-foreground mb-8">
              Choose how you want to participate in Dev Weekends Summer of Code
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/dsoc/register/mentee" className="neo-brutal-card p-6 hover:border-[var(--dsoc-primary)] transition-colors group">
                <div className="w-16 h-16 bg-[var(--dsoc-primary)] border-4 border-[var(--dsoc-dark)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-black mb-2">Mentee</h2>
                <p className="text-sm text-muted-foreground">
                  Apply to work on open source projects with expert guidance
                </p>
              </Link>

              <Link href="/dsoc/register/mentor" className="neo-brutal-card p-6 hover:border-[var(--dsoc-secondary)] transition-colors group">
                <div className="w-16 h-16 bg-[var(--dsoc-secondary)] border-4 border-[var(--dsoc-dark)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-black mb-2">Mentor</h2>
                <p className="text-sm text-muted-foreground">
                  Guide mentees and help them grow as developers
                </p>
              </Link>
            </div>

            <p className="text-muted-foreground mt-8">
              Already have an account?{' '}
              <Link href="/dsoc/login" className="font-bold text-foreground hover:text-[var(--dsoc-primary)]">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
