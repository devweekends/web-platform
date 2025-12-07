'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Rocket, ArrowLeft, CheckCircle } from "lucide-react";
import "../../styles.css";
import DSOCNavbar from "../../components/DSOCNavbar";

export default function MenteeRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    university: '',
    degree: '',
    graduationYear: '',
    github: '',
    linkedin: '',
    bio: '',
    skills: '',
    discordUsername: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/dsoc/mentee/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
          graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : undefined
        })
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="neo-brutal-card p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[var(--dsoc-success)] border-4 border-[var(--dsoc-dark)] flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-black mb-4">Registration Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Your account has been created. You can now log in and start applying to projects!
          </p>
          <Link href="/dsoc/login" className="neo-brutal-btn neo-brutal-btn-primary w-full">
            Login to Your Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DSOCNavbar />
      <div className="pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Link 
            href="/dsoc" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to DSOC
          </Link>

          <div className="neo-brutal-card p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[var(--dsoc-primary)] border-4 border-[var(--dsoc-dark)] flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-black">Join DSOC as a Mentee</h1>
              <p className="text-muted-foreground mt-2">
                Start your open source journey with expert mentorship
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-[var(--dsoc-pink)]/10 border-4 border-[var(--dsoc-pink)] text-[var(--dsoc-pink)]">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="neo-brutal-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block font-bold text-sm mb-2">Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="neo-brutal-input"
                    placeholder="johndoe"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-sm mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="neo-brutal-input"
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm mb-2">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="neo-brutal-input pr-12"
                      placeholder="Min. 8 characters"
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
                <div>
                  <label className="block font-bold text-sm mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="neo-brutal-input"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div className="border-t-4 border-[var(--dsoc-dark)] dark:border-[var(--dsoc-light)] pt-6">
                <h3 className="font-bold mb-4">Education (Optional)</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block font-bold text-sm mb-2">University</label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="neo-brutal-input"
                      placeholder="Your university"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-sm mb-2">Graduation Year</label>
                    <select
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="neo-brutal-input"
                    >
                      <option value="">Select Year</option>
                      {[2024, 2025, 2026, 2027, 2028, 2029].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t-4 border-[var(--dsoc-dark)] dark:border-[var(--dsoc-light)] pt-6">
                <h3 className="font-bold mb-4">Profile Links (Optional)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-sm mb-2">GitHub</label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      className="neo-brutal-input"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-sm mb-2">LinkedIn</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="neo-brutal-input"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block font-bold text-sm mb-2">Discord Username</label>
                  <input
                    type="text"
                    name="discordUsername"
                    value={formData.discordUsername}
                    onChange={handleChange}
                    className="neo-brutal-input"
                    placeholder="username#1234"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-sm mb-2">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="neo-brutal-input"
                  placeholder="React, Python, Docker (comma separated)"
                />
              </div>

              <div>
                <label className="block font-bold text-sm mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="neo-brutal-input resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="neo-brutal-btn neo-brutal-btn-primary w-full text-lg"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="text-center text-muted-foreground">
                Already have an account?{' '}
                <Link href="/dsoc/login" className="font-bold text-foreground hover:text-[var(--dsoc-primary)]">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
