'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import "../styles.css";
import DSOCNavbar from "../components/DSOCNavbar";

export default function DSOCLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [userType, setUserType] = useState<'mentee' | 'mentor'>('mentee');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = userType === 'mentee' 
        ? '/api/dsoc/mentee/login' 
        : '/api/dsoc/mentor/login';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/dsoc/${userType}/dashboard`);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DSOCNavbar />
      <div className="pt-24 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link 
          href="/dsoc" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to DSOC
        </Link>

        <div className="neo-brutal-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[var(--dsoc-secondary)] border-4 border-[var(--dsoc-dark)] flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Log in to your DSOC account
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="flex mb-6">
            <button
              type="button"
              onClick={() => setUserType('mentee')}
              className={`flex-1 py-3 font-bold text-sm uppercase tracking-wider border-4 border-[var(--dsoc-dark)] transition-all ${
                userType === 'mentee'
                  ? 'bg-[var(--dsoc-primary)] text-white'
                  : 'bg-background hover:bg-muted'
              }`}
            >
              Mentee
            </button>
            <button
              type="button"
              onClick={() => setUserType('mentor')}
              className={`flex-1 py-3 font-bold text-sm uppercase tracking-wider border-4 border-l-0 border-[var(--dsoc-dark)] transition-all ${
                userType === 'mentor'
                  ? 'bg-[var(--dsoc-secondary)] text-white'
                  : 'bg-background hover:bg-muted'
              }`}
            >
              Mentor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-[var(--dsoc-pink)]/10 border-4 border-[var(--dsoc-pink)] text-[var(--dsoc-pink)]">
                {error}
              </div>
            )}

            <div>
              <label className="block font-bold text-sm mb-2">Username or Email</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="neo-brutal-input"
                placeholder="Enter your username or email"
              />
            </div>

            <div>
              <label className="block font-bold text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="neo-brutal-input pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`neo-brutal-btn w-full text-lg ${
                userType === 'mentee' ? 'neo-brutal-btn-primary' : 'neo-brutal-btn-secondary'
              }`}
            >
              {loading ? 'Logging in...' : `Login as ${userType === 'mentee' ? 'Mentee' : 'Mentor'}`}
            </button>

            <p className="text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link 
                href={userType === 'mentee' ? '/dsoc/register/mentee' : '/dsoc/register/mentor'} 
                className="font-bold text-foreground hover:text-[var(--dsoc-primary)]"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
