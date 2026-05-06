'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Save,
  Plus,
  Trash2
} from "lucide-react";
import "../../../../dsoc/styles.css";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    organization: '',
    repositoryUrl: '',
    websiteUrl: '',
    difficulty: 'intermediate',
    duration: '3 months',
    technologies: '',
    tags: '',
    maxMentees: 3,
    applicationDeadline: '',
    startDate: '',
    endDate: '',
    requirements: [''],
    learningOutcomes: [''],
    season: '2025'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field: 'requirements' | 'learningOutcomes', index: number, value: string) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addArrayItem = (field: 'requirements' | 'learningOutcomes') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field: 'requirements' | 'learningOutcomes', index: number) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/dsoc/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean),
          tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
          requirements: formData.requirements.filter(Boolean),
          learningOutcomes: formData.learningOutcomes.filter(Boolean),
          status: 'draft'
        })
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/dsoc');
      } else {
        setError(data.error || 'Failed to create project');
      }
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/admin/dsoc"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to DSOC Admin
          </Link>

          <div className="neo-brutal-card p-8">
            <h1 className="text-3xl font-black mb-6">Create New Project</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-[var(--dsoc-pink)]/10 border-4 border-[var(--dsoc-pink)] text-[var(--dsoc-pink)]">
                  {error}
                </div>
              )}

              {/* Basic Info */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg border-b-2 border-[var(--dsoc-dark)] pb-2">Basic Information</h2>
                
                <div>
                  <label className="block font-bold text-sm mb-2">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="neo-brutal-input"
                    placeholder="e.g., Build a Real-time Chat Application"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm mb-2">Organization *</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="neo-brutal-input"
                    placeholder="e.g., Dev Weekends"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm mb-2">Short Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="neo-brutal-input resize-none"
                    placeholder="Brief description (shown in project cards)"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm mb-2">Long Description</label>
                  <textarea
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleChange}
                    rows={6}
                    className="neo-brutal-input resize-none"
                    placeholder="Detailed description (shown on project page)"
                  />
                </div>
              </div>

              {/* Links */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg border-b-2 border-[var(--dsoc-dark)] pb-2">Links</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-sm mb-2">Repository URL *</label>
                    <input
                      type="url"
                      name="repositoryUrl"
                      value={formData.repositoryUrl}
                      onChange={handleChange}
                      required
                      className="neo-brutal-input"
                      placeholder="https://github.com/org/repo"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-sm mb-2">Website URL</label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      className="neo-brutal-input"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg border-b-2 border-[var(--dsoc-dark)] pb-2">Project Details</h2>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-sm mb-2">Difficulty *</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="neo-brutal-input"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-sm mb-2">Duration *</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="neo-brutal-input"
                    >
                      <option value="1 month">1 month</option>
                      <option value="6 weeks">6 weeks</option>
                      <option value="2 months">2 months</option>
                      <option value="3 months">3 months</option>
                      <option value="4 months">4 months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-sm mb-2">Max Mentees *</label>
                    <input
                      type="number"
                      name="maxMentees"
                      value={formData.maxMentees}
                      onChange={handleChange}
                      min={1}
                      max={10}
                      className="neo-brutal-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-sm mb-2">Technologies *</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    required
                    className="neo-brutal-input"
                    placeholder="React, Node.js, MongoDB (comma separated)"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm mb-2">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="neo-brutal-input"
                    placeholder="web, fullstack, api (comma separated)"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg border-b-2 border-[var(--dsoc-dark)] pb-2">Timeline</h2>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-sm mb-2">Application Deadline *</label>
                    <input
                      type="date"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleChange}
                      required
                      className="neo-brutal-input"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-sm mb-2">Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="neo-brutal-input"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-sm mb-2">End Date *</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      className="neo-brutal-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-sm mb-2">Season *</label>
                  <input
                    type="text"
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    required
                    className="neo-brutal-input"
                    placeholder="e.g., 2025, Summer 2025"
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg border-b-2 border-[var(--dsoc-dark)] pb-2">Requirements</h2>
                
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                      className="neo-brutal-input flex-1"
                      placeholder="e.g., Basic knowledge of JavaScript"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('requirements', index)}
                        className="p-3 bg-[var(--dsoc-pink)] text-white border-4 border-[var(--dsoc-dark)]"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('requirements')}
                  className="neo-brutal-btn neo-brutal-btn-secondary py-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Requirement
                </button>
              </div>

              {/* Learning Outcomes */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg border-b-2 border-[var(--dsoc-dark)] pb-2">Learning Outcomes</h2>
                
                {formData.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={outcome}
                      onChange={(e) => handleArrayChange('learningOutcomes', index, e.target.value)}
                      className="neo-brutal-input flex-1"
                      placeholder="e.g., Understanding of microservices architecture"
                    />
                    {formData.learningOutcomes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('learningOutcomes', index)}
                        className="p-3 bg-[var(--dsoc-pink)] text-white border-4 border-[var(--dsoc-dark)]"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('learningOutcomes')}
                  className="neo-brutal-btn neo-brutal-btn-secondary py-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Learning Outcome
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="neo-brutal-btn neo-brutal-btn-primary w-full text-lg"
              >
                <Save className="w-5 h-5 mr-2" />
                {loading ? 'Creating Project...' : 'Create Project'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
