import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Code2, 
  Download, 
  CheckCircle2, 
  Briefcase, 
  Clock, 
  Star, 
  PlusCircle, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  X,
  MessageSquare,
  Bookmark,
  Calendar,
  Check
} from 'lucide-react';
import Layout from '../components/Layout';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import { 
  getEngineerById, 
  getReviewsForEngineer, 
  addReview, 
  addEngineerProject, 
  deleteEngineerProject, 
  updateEngineer, 
  SPECIALTY_LABELS,
  aiEnhanceProfile,
  isFavoriteEngineer,
  toggleFavoriteEngineer,
  startOrGetConversation
} from '../services/storage';

export default function EngineerProfile() {
  const { id } = useParams();
  const { user, role, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [engineer, setEngineer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Review form
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewMsg, setReviewMsg] = useState({ type: '', text: '' });

  // Add project modal
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: '',
    skills: '',
    link: '',
    year: '2026',
  });

  // AI Assistant tips modal/drawer
  const [aiTipsOpen, setAiTipsOpen] = useState(false);
  const [aiTips, setAiTips] = useState(null);

  const loadData = () => {
    const eng = getEngineerById(id);
    setEngineer(eng);
    if (eng) {
      setReviews(getReviewsForEngineer(id));
      setIsFavorite(isFavoriteEngineer(id));
      if (!newProject.category) {
        setNewProject((prev) => ({ ...prev, category: eng.specialty }));
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (!engineer) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Engineer Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">This profile may be pending verification or has been removed.</p>
          <Link to="/engineers" className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm">
            Explore All Engineers
          </Link>
        </div>
      </Layout>
    );
  }

  const isOwnProfile = role === 'engineer' && user?.id === engineer.id;
  const isClient = role === 'client';

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    let score = 20; // base registered
    if (engineer.bio && engineer.bio.length > 50) score += 20;
    if (engineer.skills && engineer.skills.length >= 3) score += 20;
    if (engineer.projects && engineer.projects.length >= 1) score += 20;
    if (engineer.certifications && engineer.certifications.length >= 1) score += 10;
    if (engineer.cv || engineer.cvName) score += 10;
    return Math.min(100, score);
  };

  const completionPercent = calculateCompletion();

  const handleToggleAvailability = () => {
    const nextStatus = engineer.availability === 'available' ? 'busy' : 'available';
    updateEngineer(engineer.id, { availability: nextStatus });
    loadData();
  };

  const handleFavoriteClick = () => {
    const res = toggleFavoriteEngineer(engineer.id);
    setIsFavorite(res);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isClient) return;

    const alreadyReviewed = reviews.some((r) => r.clientId === user.id);
    if (alreadyReviewed) {
      setReviewMsg({ type: 'error', text: 'You have already submitted a review for this engineer.' });
      return;
    }

    addReview(id, user.id, rating, comment.trim());
    setComment('');
    setReviewMsg({ type: 'success', text: 'Thank you! Your rating and review have been published.' });
    loadData();
    setTimeout(() => setReviewMsg({ type: '', text: '' }), 4000);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) return;

    addEngineerProject(engineer.id, {
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      category: newProject.category || engineer.specialty,
      skills: newProject.skills ? newProject.skills.split(',').map((s) => s.trim()) : [],
      link: newProject.link.trim(),
      year: newProject.year || '2026',
    });

    setProjectModalOpen(false);
    setNewProject({ title: '', description: '', category: engineer.specialty, skills: '', link: '', year: '2026' });
    loadData();
  };

  const handleDeleteProject = (projId) => {
    if (window.confirm('Are you sure you want to remove this project from your portfolio?')) {
      deleteEngineerProject(engineer.id, projId);
      loadData();
    }
  };

  const handleOpenAiAssistant = () => {
    const tips = aiEnhanceProfile(engineer.bio, engineer.specialty, engineer.skills);
    setAiTips(tips);
    setAiTipsOpen(true);
  };

  const handleApplyAiBio = () => {
    if (aiTips?.enhancedBio) {
      updateEngineer(engineer.id, { bio: aiTips.enhancedBio });
      loadData();
      setAiTipsOpen(false);
    }
  };

  const handleStartChat = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const conv = startOrGetConversation(user.id, user.fullName || user.name, engineer.id, engineer.fullName);
    navigate(`/dashboard?tab=chat&convId=${conv.id}`);
  };

  return (
    <Layout>
      <div className="pb-16 text-left bg-slate-50/60 dark:bg-slate-950/40 min-h-screen">
        {/* Cover Image Banner */}
        <div className="relative h-48 sm:h-72 w-full bg-slate-800 overflow-hidden">
          <img
            src={engineer.coverImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1600&q=80'}
            alt="Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Profile Card Header Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Avatar */}
                <div className="relative -mt-16 sm:-mt-20">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl bg-slate-200">
                    <img
                      src={engineer.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                      alt={engineer.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`absolute bottom-2 right-2 w-4 h-4 rounded-full ring-2 ring-white dark:ring-slate-900 ${
                      engineer.availability === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    title={engineer.availability === 'available' ? 'Available for new projects' : 'Currently busy'}
                  />
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {engineer.fullName}
                    </h1>
                    {engineer.status === 'approved' && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-cyan-400" title="Officially Verified Consultant" />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-blue-600 dark:text-cyan-400 mt-1">
                    {SPECIALTY_LABELS[engineer.specialty] || engineer.specialty}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {engineer.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{engineer.location}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{engineer.experience} Years Experience</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <StarRating rating={engineer.rating} size="sm" />
                      <span>({engineer.reviewCount || 0} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 font-medium">Hourly Consultation Rate</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    ${engineer.hourlyRate}{' '}
                    <span className="text-xs font-normal text-slate-500">/hr</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isOwnProfile ? (
                    <>
                      <button
                        type="button"
                        onClick={handleToggleAvailability}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                          engineer.availability === 'available'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60'
                        }`}
                      >
                        {engineer.availability === 'available' ? 'Mark Busy' : 'Mark Available'}
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenAiAssistant}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold shadow-sm flex items-center gap-1 transition"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Profile Architect</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleFavoriteClick}
                        className={`p-2.5 rounded-xl border transition ${
                          isFavorite
                            ? 'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/40 dark:border-red-900'
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700'
                        }`}
                        title="Save to bookmarks"
                      >
                        <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                      </button>
                      <button
                        type="button"
                        onClick={handleStartChat}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition hover:scale-[1.02]"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Contact & Hire</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Completion Indicator (Visible for owner) */}
            {isOwnProfile && completionPercent < 100 && (
              <div className="mt-5 p-4 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="w-full sm:flex-1">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-slate-800 dark:text-slate-200">
                    <span>Profile Completion Score</span>
                    <span>{completionPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${completionPercent}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-blue-700 dark:text-cyan-300 font-semibold">
                  Complete your portfolio and credentials to rank higher in client search results!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Column (2 Cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio Section */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  Professional Bio & Engineering Overview
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {engineer.bio}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  Engineering Competencies & Software Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(engineer.skills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-blue-50/70 dark:bg-slate-800 text-blue-900 dark:text-blue-200 text-xs font-bold border border-blue-100 dark:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio Projects Section */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Portfolio & Featured Deliverables ({engineer.projects?.length || 0})
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Verified blueprints, calculation sheets, and completed models
                    </p>
                  </div>
                  {isOwnProfile && (
                    <button
                      type="button"
                      onClick={() => setProjectModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                  )}
                </div>

                {(engineer.projects || []).length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">
                    No portfolio projects added yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {engineer.projects.map((proj, idx) => (
                      <div
                        key={proj.id || idx}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {proj.title}
                            </h4>
                            {isOwnProfile && (
                              <button
                                type="button"
                                onClick={() => handleDeleteProject(proj.id || proj.title)}
                                className="text-slate-400 hover:text-red-500 p-1 transition"
                                title="Delete project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                            {proj.description}
                          </p>

                          {proj.skills && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {proj.skills.map((s, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium border border-slate-200/60 dark:border-slate-600"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 dark:text-cyan-400 font-bold flex items-center gap-1 hover:underline self-start pt-2 border-t border-slate-200/60 dark:border-slate-700 w-full"
                          >
                            <span>View External Project</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reviews & Ratings Section */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Client Reviews & Testimonials ({reviews.length})
                  </h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{engineer.rating} out of 5.0</span>
                  </div>
                </div>

                {reviews.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">
                    No client reviews submitted yet.
                  </p>
                ) : (
                  <div className="space-y-4 mb-8">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {rev.clientName || 'Verified Client'}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(rev.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <StarRating rating={rev.rating} size="sm" showValue={false} />
                        {rev.comment && (
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                            {rev.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Review Form for Clients */}
                {isClient && (
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Leave a Verified Review
                    </h4>

                    {reviewMsg.text && (
                      <div
                        className={`p-3 rounded-xl text-xs font-bold mb-4 ${
                          reviewMsg.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-300'
                        }`}
                      >
                        {reviewMsg.text}
                      </div>
                    )}

                    <form onSubmit={handleReviewSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Star Rating:
                        </label>
                        <StarRating rating={rating} size="lg" interactive onChange={setRating} />
                      </div>

                      <textarea
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience regarding punctuality, technical precision, CAD compliance, and communication..."
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold transition shadow-sm"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Column: Certifications & Contact Information */}
            <aside className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  Contact Information & Credentials
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                    <Phone className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Phone Number</span>
                      <a href={`tel:${engineer.phone}`} className="font-bold text-slate-800 dark:text-slate-200 hover:underline">
                        {engineer.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-slate-400 block font-medium">Email Address</span>
                      <a href={`mailto:${engineer.email}`} className="font-bold text-slate-800 dark:text-slate-200 hover:underline truncate block">
                        {engineer.email}
                      </a>
                    </div>
                  </div>

                  {engineer.linkedin && (
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                      <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                      <div className="overflow-hidden">
                        <span className="text-[10px] text-slate-400 block font-medium">LinkedIn Profile</span>
                        <a href={engineer.linkedin} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 dark:text-slate-200 hover:underline truncate block">
                          linkedin.com/in/{engineer.fullName.toLowerCase().replace(/\s+/g, '')}
                        </a>
                      </div>
                    </div>
                  )}

                  {engineer.github && (
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                      <Code2 className="w-4 h-4 text-slate-800 dark:text-white shrink-0" />
                      <div className="overflow-hidden">
                        <span className="text-[10px] text-slate-400 block font-medium">Technical Portfolio</span>
                        <a href={engineer.github} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 dark:text-slate-200 hover:underline truncate block">
                          github.com/{engineer.fullName.toLowerCase().replace(/\s+/g, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* CV Download button */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      if (engineer.cv) {
                        const link = document.createElement('a');
                        link.href = engineer.cv;
                        link.download = engineer.cvName || `${engineer.fullName}_CV.pdf`;
                        link.click();
                      } else {
                        alert('Consultant CV is available upon direct client request.');
                      }
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <span>Download Engineering Resume (CV)</span>
                  </button>
                </div>
              </div>

              {/* Certifications Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-cyan-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Accreditations & Licenses
                  </h4>
                </div>

                <div className="space-y-2 text-xs">
                  {(engineer.certifications || [
                    'National Engineers Syndicate Member',
                    'Certified Professional Engineering License'
                  ]).map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setProjectModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left animate-in fade-in duration-150 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Add Project to Portfolio
              </h3>
              <button type="button" onClick={() => setProjectModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Structural Design of 14-Story High-Rise Tower"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description & Deliverables *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail your exact engineering contribution, calculation sheets, software used, and deliverables..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Skills & Tools Used (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ETABS, SAFE, Revit, Bill of Quantities"
                  value={newProject.skills}
                  onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Project URL or Portfolio Link (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newProject.link}
                  onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold shadow-md transition"
                >
                  Save Project
                </button>
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Profile Assistant Modal */}
      {aiTipsOpen && aiTips && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setAiTipsOpen(false)} />
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left animate-in fade-in duration-150 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  AI Profile Optimization Assistant
                </h3>
              </div>
              <button type="button" onClick={() => setAiTipsOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  AI-Optimized Professional Bio:
                </span>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 leading-relaxed border border-slate-200 dark:border-slate-700">
                  {aiTips.enhancedBio}
                </div>
                <button
                  type="button"
                  onClick={handleApplyAiBio}
                  className="mt-2 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply this bio to my profile</span>
                </button>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Actionable Tips to Maximize Proposal Acceptance:
                </span>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {aiTips.profileTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
