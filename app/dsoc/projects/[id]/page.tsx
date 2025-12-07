'use client';

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { 
  ArrowLeft,
  Clock, 
  Users, 
  Calendar,
  Github,
  ExternalLink,
  Linkedin,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Target,
  Code2,
  MessageCircle
} from "lucide-react";
import "../../styles.css";
import DSOCNavbar from "../../components/DSOCNavbar";

interface Mentor {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  company?: string;
  jobTitle?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  organization: string;
  repositoryUrl: string;
  websiteUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  technologies: string[];
  tags: string[];
  mentors: Mentor[];
  selectedMentees: { _id: string; name: string; picture?: string; university?: string }[];
  maxMentees: number;
  status: string;
  applicationDeadline: string;
  startDate: string;
  endDate: string;
  requirements: string[];
  learningOutcomes: string[];
  milestones: { title: string; description: string; dueDate: string; completed: boolean }[];
  discordChannelId?: string;
  season: string;
}

// Sample projects for fallback when API is unavailable
const SAMPLE_PROJECTS: Record<string, Project> = {
  'codeforge-sample': {
    _id: 'codeforge-sample',
    title: 'CodeForge - Collaborative Code Editor',
    description: 'Build a real-time collaborative code editor with syntax highlighting, multi-cursor support, live preview, and integrated terminal.',
    longDescription: `CodeForge is an ambitious project to create a fully-featured collaborative code editor similar to VS Code Live Share or Replit. 

You'll learn to build complex real-time systems, work with Monaco Editor (the same editor that powers VS Code), implement operational transformation for conflict-free collaborative editing, and deploy containerized code execution environments.

This project covers the full stack: from building a sleek React frontend with Next.js to architecting scalable backend services with NestJS, implementing WebSocket-based real-time collaboration, and setting up secure Docker-based code execution.`,
    organization: 'Dev Weekends',
    repositoryUrl: 'https://github.com/devweekends/codeforge',
    websiteUrl: 'https://codeforge.devweekends.org',
    difficulty: 'advanced',
    duration: '10-12 weeks',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Supabase', 'Monaco Editor', 'Socket.io', 'Docker', 'Redis', 'TypeScript', 'Tailwind CSS'],
    tags: ['full-stack', 'real-time', 'developer-tools', 'collaboration'],
    mentors: [
      {
        _id: 'mentor-1',
        name: 'Alex Chen',
        email: 'alex@devweekends.org',
        company: 'GitHub',
        jobTitle: 'Senior Software Engineer',
        bio: 'Full-stack developer with 8+ years of experience building developer tools.',
        linkedin: 'https://linkedin.com/in/alexchen',
        github: 'https://github.com/alexchen'
      },
      {
        _id: 'mentor-2',
        name: 'Sarah Williams',
        email: 'sarah@devweekends.org',
        company: 'Vercel',
        jobTitle: 'Staff Engineer',
        bio: 'Passionate about building performant web applications and mentoring developers.',
        linkedin: 'https://linkedin.com/in/sarahwilliams',
        github: 'https://github.com/sarahwilliams'
      }
    ],
    selectedMentees: [],
    maxMentees: 3,
    status: 'open',
    applicationDeadline: '2026-03-31',
    startDate: '2026-04-15',
    endDate: '2026-07-15',
    requirements: [
      'Strong JavaScript/TypeScript fundamentals',
      'Experience with React or Next.js',
      'Basic understanding of WebSockets',
      'Familiarity with Git and GitHub',
      'Ability to commit 15-20 hours per week'
    ],
    learningOutcomes: [
      'Build production-ready real-time collaborative applications',
      'Master advanced React patterns and state management',
      'Implement secure code execution in containerized environments',
      'Design and build scalable WebSocket-based systems',
      'Work with Monaco Editor API for code editing features'
    ],
    milestones: [
      { title: 'Project Setup', description: 'Set up development environment, understand codebase', dueDate: '2026-04-22', completed: false },
      { title: 'Core Editor', description: 'Implement Monaco Editor with basic features', dueDate: '2026-05-06', completed: false },
      { title: 'Real-time Collaboration', description: 'Add multi-cursor and collaborative editing', dueDate: '2026-05-27', completed: false },
      { title: 'Code Execution', description: 'Implement Docker-based code runner', dueDate: '2026-06-17', completed: false },
      { title: 'Polish & Deploy', description: 'Final testing, documentation, and deployment', dueDate: '2026-07-15', completed: false }
    ],
    season: 'DSOC 2026'
  },
  'timemaster-sample': {
    _id: 'timemaster-sample',
    title: 'TimeMaster - Smart Productivity Suite',
    description: 'Create an intelligent productivity application combining goal setting, time tracking, smart scheduling, and analytics.',
    longDescription: `TimeMaster is a comprehensive productivity suite that helps users manage their time effectively. 

You'll build features like a Pomodoro timer, calendar integration, habit tracking, focus mode, and AI-powered productivity insights. The project uses modern full-stack technologies and provides hands-on experience with data visualization, user authentication, and notification systems.

This is a great project for intermediate developers looking to level up their skills while building something genuinely useful.`,
    organization: 'Dev Weekends',
    repositoryUrl: 'https://github.com/devweekends/timemaster',
    websiteUrl: 'https://timemaster.devweekends.org',
    difficulty: 'intermediate',
    duration: '8-10 weeks',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Supabase', 'Chart.js', 'React Query', 'Zustand', 'TypeScript', 'Tailwind CSS'],
    tags: ['full-stack', 'productivity', 'time-management', 'analytics'],
    mentors: [
      {
        _id: 'mentor-3',
        name: 'David Park',
        email: 'david@devweekends.org',
        company: 'Linear',
        jobTitle: 'Frontend Lead',
        bio: 'Frontend specialist with a passion for great UX and clean code.',
        linkedin: 'https://linkedin.com/in/davidpark',
        github: 'https://github.com/davidpark'
      }
    ],
    selectedMentees: [],
    maxMentees: 4,
    status: 'open',
    applicationDeadline: '2026-03-31',
    startDate: '2026-04-15',
    endDate: '2026-06-30',
    requirements: [
      'JavaScript/TypeScript basics',
      'Some experience with React',
      'Understanding of REST APIs',
      'Familiarity with databases',
      'Ability to commit 10-15 hours per week'
    ],
    learningOutcomes: [
      'Build full-stack applications from scratch',
      'Implement user authentication and authorization',
      'Create beautiful data visualizations',
      'Work with state management libraries',
      'Deploy applications to production'
    ],
    milestones: [
      { title: 'Project Setup', description: 'Environment setup and basic project structure', dueDate: '2026-04-22', completed: false },
      { title: 'Core Features', description: 'Timer, task management, and basic tracking', dueDate: '2026-05-13', completed: false },
      { title: 'Analytics Dashboard', description: 'Implement charts and productivity insights', dueDate: '2026-06-03', completed: false },
      { title: 'Polish & Deploy', description: 'Testing, documentation, and deployment', dueDate: '2026-06-30', completed: false }
    ],
    season: 'DSOC 2026'
  }
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProject();
  }, [resolvedParams.id]);

  const fetchProject = async () => {
    // Check for sample project first
    if (SAMPLE_PROJECTS[resolvedParams.id]) {
      setProject(SAMPLE_PROJECTS[resolvedParams.id]);
      setLoading(false);
      return;
    }
    
    try {
      const res = await fetch(`/api/dsoc/projects/${resolvedParams.id}`);
      const data = await res.json();
      
      if (data.success) {
        setProject(data.data);
      } else {
        setError(data.error || 'Project not found');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-[var(--dsoc-success)]';
      case 'intermediate': return 'bg-[var(--dsoc-accent)]';
      case 'advanced': return 'bg-[var(--dsoc-pink)]';
      default: return 'bg-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-[var(--dsoc-success)]';
      case 'in-progress': return 'bg-[var(--dsoc-accent)]';
      case 'completed': return 'bg-[var(--dsoc-purple)]';
      default: return 'bg-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDeadlinePassed = project ? new Date() > new Date(project.applicationDeadline) : false;
  const spotsRemaining = project ? project.maxMentees - (project.selectedMentees?.length || 0) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DSOCNavbar />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-[var(--dsoc-primary)] border-t-transparent animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading project...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <DSOCNavbar />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-[var(--dsoc-pink)] mb-4" />
            <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
            <Link href="/dsoc/projects" className="neo-brutal-btn neo-brutal-btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DSOCNavbar />
      {/* Header */}
      <section className={`pt-24 pb-12 ${getDifficultyColor(project.difficulty)}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/dsoc/projects" 
            className="inline-flex items-center gap-2 text-[var(--dsoc-dark)] font-bold mb-6 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="neo-brutal-badge bg-white text-[var(--dsoc-dark)]">
                  {project.organization}
                </span>
                <span className={`neo-brutal-badge ${getStatusColor(project.status)} text-[var(--dsoc-dark)]`}>
                  {project.status}
                </span>
                <span className="neo-brutal-badge bg-[var(--dsoc-secondary)] text-white">
                  {project.difficulty}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--dsoc-dark)] mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-[var(--dsoc-dark)] opacity-80 max-w-3xl">
                {project.description}
              </p>
            </div>
            
            <div className="flex gap-3">
              <a 
                href={project.repositoryUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="neo-brutal-btn bg-[var(--dsoc-dark)] text-white"
              >
                <Github className="w-5 h-5 mr-2" />
                Repository
              </a>
              {project.websiteUrl && (
                <a 
                  href={project.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="neo-brutal-btn bg-white text-[var(--dsoc-dark)]"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Technologies */}
              <div className="neo-brutal-card p-6">
                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-[var(--dsoc-primary)]" />
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="neo-brutal-badge bg-[var(--dsoc-secondary)] text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Long Description */}
              {project.longDescription && (
                <div className="neo-brutal-card p-6">
                  <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-[var(--dsoc-primary)]" />
                    About This Project
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">{project.longDescription}</p>
                  </div>
                </div>
              )}

              {/* Requirements */}
              {project.requirements && project.requirements.length > 0 && (
                <div className="neo-brutal-card p-6">
                  <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-[var(--dsoc-success)]" />
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {project.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[var(--dsoc-success)] border-2 border-[var(--dsoc-dark)] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-[var(--dsoc-dark)]" />
                        </div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learning Outcomes */}
              {project.learningOutcomes && project.learningOutcomes.length > 0 && (
                <div className="neo-brutal-card p-6">
                  <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-[var(--dsoc-purple)]" />
                    What You&apos;ll Learn
                  </h2>
                  <ul className="space-y-3">
                    {project.learningOutcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[var(--dsoc-purple)] border-2 border-[var(--dsoc-dark)] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">{i + 1}</span>
                        </div>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Milestones */}
              {project.milestones && project.milestones.length > 0 && (
                <div className="neo-brutal-card p-6">
                  <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-[var(--dsoc-accent)]" />
                    Project Milestones
                  </h2>
                  <div className="space-y-4">
                    {project.milestones.map((milestone, i) => (
                      <div 
                        key={i} 
                        className={`p-4 border-4 border-[var(--dsoc-dark)] dark:border-[var(--dsoc-light)] ${
                          milestone.completed ? 'bg-[var(--dsoc-success)]/20' : 'bg-background'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold flex items-center gap-2">
                              {milestone.completed && (
                                <CheckCircle className="w-5 h-5 text-[var(--dsoc-success)]" />
                              )}
                              {milestone.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1">{milestone.description}</p>
                          </div>
                          {milestone.dueDate && (
                            <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
                              {formatDate(milestone.dueDate)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mentors */}
              <div className="neo-brutal-card p-6">
                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-[var(--dsoc-secondary)]" />
                  Mentors
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.mentors.map((mentor) => (
                    <div key={mentor._id} className="p-4 border-4 border-[var(--dsoc-dark)] dark:border-[var(--dsoc-light)] bg-background">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-[var(--dsoc-primary)] border-4 border-[var(--dsoc-dark)] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                          {mentor.picture ? (
                            <img src={mentor.picture} alt={mentor.name} className="w-full h-full object-cover" />
                          ) : (
                            mentor.name.charAt(0)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg">{mentor.name}</h3>
                          {mentor.jobTitle && (
                            <p className="text-sm text-muted-foreground">
                              {mentor.jobTitle}
                              {mentor.company && ` @ ${mentor.company}`}
                            </p>
                          )}
                          {mentor.bio && (
                            <p className="text-sm mt-2 line-clamp-2">{mentor.bio}</p>
                          )}
                          <div className="flex gap-2 mt-3">
                            {mentor.github && (
                              <a 
                                href={mentor.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-[var(--dsoc-dark)] dark:bg-[var(--dsoc-light)] flex items-center justify-center hover:opacity-70 transition-opacity"
                              >
                                <Github className="w-4 h-4 text-white dark:text-[var(--dsoc-dark)]" />
                              </a>
                            )}
                            {mentor.linkedin && (
                              <a 
                                href={mentor.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-[var(--dsoc-secondary)] flex items-center justify-center hover:opacity-70 transition-opacity"
                              >
                                <Linkedin className="w-4 h-4 text-white" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <div className="neo-brutal-card p-6 sticky top-24">
                <h2 className="text-xl font-black mb-4">Apply to This Project</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-bold flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {project.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Spots Available</span>
                    <span className="font-bold flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {spotsRemaining} / {project.maxMentees}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deadline</span>
                    <span className={`font-bold ${isDeadlinePassed ? 'text-[var(--dsoc-pink)]' : ''}`}>
                      {formatDate(project.applicationDeadline)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-bold">{formatDate(project.startDate)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-bold">{formatDate(project.endDate)}</span>
                  </div>
                </div>

                {project.status === 'open' && !isDeadlinePassed && spotsRemaining > 0 ? (
                  <Link 
                    href={`/dsoc/apply/${project._id}`}
                    className="neo-brutal-btn neo-brutal-btn-primary w-full"
                  >
                    Apply Now
                  </Link>
                ) : (
                  <button 
                    disabled 
                    className="neo-brutal-btn bg-gray-300 text-gray-600 w-full cursor-not-allowed"
                  >
                    {isDeadlinePassed ? 'Deadline Passed' : 
                     spotsRemaining <= 0 ? 'No Spots Available' : 
                     'Applications Closed'}
                  </button>
                )}

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By applying, you agree to commit {project.duration} to this project
                </p>
              </div>

              {/* Discord Card */}
              <div className="neo-brutal-card p-6 bg-[var(--dsoc-purple)]">
                <div className="text-white">
                  <MessageCircle className="w-8 h-8 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Have Questions?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Join our Discord to chat with mentors and other mentees
                  </p>
                  <a 
                    href="https://discord.com/invite/32mYcRmy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="neo-brutal-btn bg-white text-[var(--dsoc-purple)] w-full"
                  >
                    Join Discord
                  </a>
                </div>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="neo-brutal-card p-6">
                  <h3 className="font-bold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="neo-brutal-badge bg-gray-200 dark:bg-gray-700 text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
