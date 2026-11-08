import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Clock, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Send, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  X, 
  MessageSquare, 
  AlertCircle 
} from 'lucide-react';
import Layout from '../components/Layout';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import { 
  getProjectById, 
  getProposalsForProject, 
  submitProposal, 
  updateProposalStatus, 
  SPECIALTY_LABELS, 
  aiMatchEngineers,
  startOrGetConversation
} from '../services/storage';

export default function ProjectDetails() {
  const { id } = useParams();
  const { user, role, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [matchingEngineers, setMatchingEngineers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  // Proposal form state
  const [proposalForm, setProposalForm] = useState({
    proposedBudget: '',
    deliveryDays: '',
    coverLetter: '',
  });

  const loadProjectData = () => {
    const proj = getProjectById(id);
    setProject(proj);
    if (proj) {
      setProposals(getProposalsForProject(id));
      const matched = aiMatchEngineers(proj).slice(0, 3);
      setMatchingEngineers(matched);
      if (!proposalForm.proposedBudget) {
        setProposalForm((prev) => ({
          ...prev,
          proposedBudget: proj.budget,
        }));
      }
    }
  };

  useEffect(() => {
    loadProjectData();
  }, [id]);

  if (!project) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Project Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">This project may have been deleted or the link is invalid.</p>
          <Link
            to="/projects"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
          >
            Back to All Projects
          </Link>
        </div>
      </Layout>
    );
  }

  const isOwner = role === 'client' && user?.id === project.clientId;
  const isEngineer = role === 'engineer';
  const hasAlreadyApplied = isEngineer && proposals.some((p) => p.engineerId === user?.id);

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    if (!proposalForm.proposedBudget || !proposalForm.deliveryDays || !proposalForm.coverLetter) {
      setFeedback({ type: 'error', text: 'Please fill in all proposal fields.' });
      return;
    }

    setLoading(true);
    try {
      submitProposal({
        projectId: project.id,
        engineerId: user.id,
        engineerName: user.fullName || user.name,
        engineerSpecialty: user.specialty,
        engineerRating: user.rating || 5.0,
        engineerAvatar: user.avatar,
        proposedBudget: Number(proposalForm.proposedBudget),
        deliveryDays: Number(proposalForm.deliveryDays),
        coverLetter: proposalForm.coverLetter.trim(),
      });

      setFeedback({ type: 'success', text: 'Your proposal was submitted successfully to the project owner!' });
      setIsModalOpen(false);
      loadProjectData();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback({ type: '', text: '' }), 4000);
    }
  };

  const handleAcceptProposal = (propId) => {
    try {
      updateProposalStatus(propId, 'accepted');
      setFeedback({ type: 'success', text: 'Proposal accepted! Project is now in progress.' });
      loadProjectData();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
    setTimeout(() => setFeedback({ type: '', text: '' }), 4000);
  };

  const handleRejectProposal = (propId) => {
    try {
      updateProposalStatus(propId, 'rejected');
      setFeedback({ type: 'info', text: 'Proposal has been rejected.' });
      loadProjectData();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
    setTimeout(() => setFeedback({ type: '', text: '' }), 4000);
  };

  const handleStartChat = (engId, engName) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const conv = startOrGetConversation(user.id, user.fullName || user.name, engId, engName);
    navigate(`/dashboard?tab=chat&convId=${conv.id}`);
  };

  return (
    <Layout>
      <div className="py-8 sm:py-12 bg-slate-50/60 dark:bg-slate-950/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/projects"
              className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all projects</span>
            </Link>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                project.status === 'open'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900/60'
              }`}
            >
              {project.status === 'open' ? 'Open for Proposals' : 'In Progress'}
            </span>
          </div>

          {feedback.text && (
            <div
              className={`p-4 rounded-xl text-xs font-bold mb-6 flex items-center gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedback.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Project Details (2 Cols) */}
            <div className="lg:col-span-2 space-y-6 text-left">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60">
                    {SPECIALTY_LABELS[project.category] || project.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    Posted on:{' '}
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                  {project.title}
                </h1>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Project Specifications & Scope:
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {project.description}
                  </div>
                </div>

                {/* Required Skills */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
                    Required Skills & Engineering Competencies:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(project.requiredSkills || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-blue-50/70 dark:bg-slate-800 text-blue-800 dark:text-blue-200 text-xs font-semibold border border-blue-100 dark:border-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proposals Management Section */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Submitted Proposals ({proposals.length})
                  </h2>
                  <span className="text-xs text-slate-400 font-medium">
                    {isOwner ? 'You are the owner of this project' : 'Submitted by verified engineers'}
                  </span>
                </div>

                {proposals.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">
                    No proposals submitted yet. Be the first certified engineer to submit an offer!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {proposals.map((prop) => (
                      <div
                        key={prop.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          prop.status === 'accepted'
                            ? 'bg-emerald-50/50 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800'
                            : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
                              {prop.engineerName ? prop.engineerName.charAt(0) : 'E'}
                            </div>
                            <div>
                              <Link
                                to={`/engineer/${prop.engineerId}`}
                                className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition"
                              >
                                {prop.engineerName}
                              </Link>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                {SPECIALTY_LABELS[prop.engineerSpecialty] || prop.engineerSpecialty}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <StarRating rating={prop.engineerRating} size="sm" />
                              </div>
                            </div>
                          </div>

                          <div className="text-left sm:text-right">
                            <span className="text-xs text-slate-400 block font-medium">Bid Amount</span>
                            <div className="text-base font-extrabold text-slate-900 dark:text-white">
                              ${prop.proposedBudget.toLocaleString()}{' '}
                              <span className="text-xs font-normal text-slate-500">USD</span>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block">
                              Duration: {prop.deliveryDays} days
                            </span>
                          </div>
                        </div>

                        {/* Proposal Cover Letter */}
                        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {prop.coverLetter}
                        </div>

                        {/* Owner Actions */}
                        {isOwner && prop.status === 'pending' && (
                          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3 justify-end">
                            <button
                              type="button"
                              onClick={() => handleAcceptProposal(prop.id)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept Offer</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRejectProposal(prop.id)}
                              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Decline</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStartChat(prop.engineerId, prop.engineerName)}
                              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Chat</span>
                            </button>
                          </div>
                        )}

                        {prop.status === 'accepted' && (
                          <div className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>This proposal has been accepted! Project is currently in progress.</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar: Budget, Client Info & CTAs */}
            <aside className="space-y-6 text-left">
              {/* Project Overview Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card">
                <span className="text-xs text-slate-400 block mb-1 font-medium">Estimated Project Budget</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                  ${project.budget.toLocaleString()}{' '}
                  <span className="text-sm font-semibold text-slate-500">USD</span>
                </div>

                <div className="space-y-3 text-xs pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Estimated Duration:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{project.duration}</span>
                  </div>
                  {project.deadline && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Deadline:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{project.deadline}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Client:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{project.clientName}</span>
                  </div>
                  {project.clientCity && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Location:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{project.clientCity}</span>
                    </div>
                  )}
                </div>

                {/* Submit Proposal CTA */}
                {isEngineer && project.status === 'open' && (
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {hasAlreadyApplied ? (
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 text-xs font-bold text-center border border-blue-200 dark:border-blue-900/60">
                        ✓ You have already submitted a proposal
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit a Proposal</span>
                      </button>
                    )}
                  </div>
                )}

                {!isAuthenticated && (
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-xs text-slate-500 mb-3">Sign in as an engineer to submit technical and financial proposals.</p>
                    <Link
                      to="/login"
                      className="block w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition"
                    >
                      Sign In to Submit Proposal
                    </Link>
                  </div>
                )}
              </div>

              {/* AI Recommended Engineers */}
              {matchingEngineers.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      AI Matched Engineers
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {matchingEngineers.map(({ engineer, matchScore, reasons }) => (
                      <div
                        key={engineer.id}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Link
                            to={`/engineer/${engineer.id}`}
                            className="text-xs font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400"
                          >
                            {engineer.fullName}
                          </Link>
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300">
                            {matchScore}% Match
                          </span>
                        </div>
                        <ul className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 mb-2">
                          {reasons.slice(0, 2).map((r, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 dark:border-slate-700">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            ${engineer.hourlyRate}/hr
                          </span>
                          <Link
                            to={`/engineer/${engineer.id}`}
                            className="text-blue-600 dark:text-cyan-400 font-bold hover:underline"
                          >
                            View Profile →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* Submit Proposal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left animate-in fade-in duration-150 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Submit Engineering Proposal
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Offer your rate, timeline, and work methodology</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProposalSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Proposed Budget ($ USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={proposalForm.proposedBudget}
                    onChange={(e) =>
                      setProposalForm({ ...proposalForm, proposedBudget: e.target.value })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Delivery Time (Days) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 7"
                    value={proposalForm.deliveryDays}
                    onChange={(e) =>
                      setProposalForm({ ...proposalForm, deliveryDays: e.target.value })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Proposal Cover Letter & Methodology *
                </label>
                <textarea
                  required
                  rows={5}
                  value={proposalForm.coverLetter}
                  onChange={(e) =>
                    setProposalForm({ ...proposalForm, coverLetter: e.target.value })
                  }
                  placeholder="Outline your engineering background, project execution plan, CAD/BIM tools to be used, and deliverables for the client..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Confirm & Submit Proposal'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
