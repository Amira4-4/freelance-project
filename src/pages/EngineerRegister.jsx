import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Compass, 
  Upload, 
  PlusCircle, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import Layout from '../components/Layout';
import { registerEngineer, fileToBase64, ENGINEERING_CATEGORIES } from '../services/storage';

const emptyProject = { title: '', description: '', link: '' };

export default function EngineerRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: 'civil',
    hourlyRate: '',
    experience: '',
    bio: '',
    skills: '',
    linkedin: '',
    github: '',
    location: 'Chicago, IL',
    cv: null,
    cvName: '',
  });
  const [projects, setProjects] = useState([{ ...emptyProject }]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const updateProject = (index, field, value) => {
    setProjects((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const addProject = () => {
    setProjects((prev) => [...prev, { ...emptyProject }]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      setProjects((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Resume file size must not exceed 5MB.');
        return;
      }
      updateField('cv', file);
      updateField('cvName', file.name);
    }
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'Full name is required.';
    if (!form.phone.trim()) return 'Phone number is required.';
    if (form.phone.replace(/[^0-9]/g, '').length < 7) {
      return 'Please enter a valid phone number (at least 7 digits).';
    }
    if (!form.email.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Please enter a valid email address.';
    }
    if (!form.password) return 'Password is required.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    if (!form.specialty) return 'Engineering specialty is required.';
    if (!form.hourlyRate || Number(form.hourlyRate) <= 0) return 'Hourly consultation rate is required.';
    if (!form.experience || Number(form.experience) < 0) return 'Years of experience is required.';
    if (!form.bio.trim() || form.bio.trim().length < 30) {
      return 'Professional bio is required (at least 30 characters).';
    }
    if (!form.skills.trim()) return 'Engineering skills and software expertise are required.';
    if (!form.cv && !form.cvName) return 'Please attach your engineering resume or portfolio (CV).';

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valErr = validate();
    if (valErr) {
      setError(valErr);
      return;
    }

    setLoading(true);
    try {
      let cvBase64 = null;
      if (form.cv && typeof form.cv !== 'string') {
        cvBase64 = await fileToBase64(form.cv);
      }

      registerEngineer({
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        specialty: form.specialty,
        hourlyRate: Number(form.hourlyRate),
        experience: Number(form.experience),
        bio: form.bio.trim(),
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
        linkedin: form.linkedin.trim() || 'https://linkedin.com',
        github: form.github.trim() || 'https://github.com',
        location: form.location.trim(),
        cv: cvBase64,
        cvName: form.cvName || 'Engineer_CV.pdf',
        projects: projects
          .filter((p) => p.title.trim())
          .map((p) => ({
            title: p.title.trim(),
            description: p.description.trim(),
            link: p.link.trim(),
            category: form.specialty,
            year: '2026',
          })),
      });

      navigate('/register/engineer/success');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-12 sm:py-20 flex items-center justify-center text-left bg-slate-50/60 dark:bg-slate-950/40 min-h-[calc(100vh-140px)]">
        <div className="w-full max-w-3xl px-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-card">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Apply as Engineering Consultant
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Submit credentials and portfolio for verified accreditation and access to project tenders
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 text-xs font-bold mb-6 flex items-center gap-2 border border-red-200 dark:border-red-900">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal & Account Info */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 mb-4">
                  1. Identity & Credentials
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Legal Name (as on professional license) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eng. Marcus Vance, P.E."
                      value={form.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 789-0123"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@structuralpro.io"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Engineering Professional Info */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 mb-4">
                  2. Discipline & Professional Competencies
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Primary Engineering Discipline *
                    </label>
                    <select
                      value={form.specialty}
                      onChange={(e) => updateField('specialty', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                    >
                      {ENGINEERING_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Hourly Consultation Rate ($ USD) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 85"
                      value={form.hourlyRate}
                      onChange={(e) => updateField('hourlyRate', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Years of Experience *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 8"
                      value={form.experience}
                      onChange={(e) => updateField('experience', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Skills & Engineering Software (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ETABS, SAP2000, AutoCAD, Revit Structure, Bill of Quantities"
                    value={form.skills}
                    onChange={(e) => updateField('skills', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Professional Bio & Track Record *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Summarize your university degree, accredited licenses, major landmark projects supervised, and quality standards you adhere to..."
                    value={form.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* CV File Upload */}
                <div className="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-center">
                  <Upload className="w-8 h-8 text-blue-600 dark:text-cyan-400 mx-auto mb-2" />
                  <label className="cursor-pointer block">
                    <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline">
                      Click to upload Resume / CV (PDF or DOCX)
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {form.cvName ? `Attached File: ${form.cvName}` : 'Maximum file size: 5MB'}
                  </span>
                </div>
              </div>

              {/* Portfolio Projects Section */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    3. Prior Project Deliverables & Showcase
                  </h3>
                  <button
                    type="button"
                    onClick={addProject}
                    className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Another Project</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {projects.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 relative"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Project #{idx + 1}
                        </span>
                        {projects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProject(idx)}
                            className="text-slate-400 hover:text-red-500 p-1 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Project title (e.g. Residential Villa, Highway Overpass...)"
                          value={p.title}
                          onChange={(e) => updateProject(idx, 'title', e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="url"
                          placeholder="Project URL or Render link if available"
                          value={p.link}
                          onChange={(e) => updateProject(idx, 'link', e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Brief description of your role, calculation tools, and deliverables..."
                        value={p.description}
                        onChange={(e) => updateProject(idx, 'description', e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? 'Submitting Application...' : 'Submit Accreditation Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
