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
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">المشروع غير موجود</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">قد يكون تم حذفه أو أن الرابط غير صحيح.</p>
          <Link
            to="/projects"
            className="px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold"
          >
            العودة للمشاريع
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
      setFeedback({ type: 'error', text: 'يرجى استكمال جميع بيانات العرض.' });
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

      setFeedback({ type: 'success', text: 'تم إرسال عرضك بنجاح لصاحب المشروع!' });
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
      setFeedback({ type: 'success', text: 'تم قبول العرض وتحويل المشروع إلى قيد التنفيذ!' });
      loadProjectData();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
    setTimeout(() => setFeedback({ type: '', text: '' }), 4000);
  };

  const handleRejectProposal = (propId) => {
    try {
      updateProposalStatus(propId, 'rejected');
      setFeedback({ type: 'info', text: 'تم رفض العرض.' });
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
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/projects"
              className="text-xs font-semibold text-brand-blue dark:text-brand-cyan hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              <span>العودة لكافة المشاريع</span>
            </Link>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                project.status === 'open'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
              }`}
            >
              {project.status === 'open' ? 'مفتوح لتلقي العروض' : 'المشروع قيد التنفيذ'}
            </span>
          </div>

          {feedback.text && (
            <div
              className={`p-4 rounded-xl text-xs font-bold mb-6 flex items-center gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedback.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Project Details (2 Cols) */}
            <div className="lg:col-span-2 space-y-6 text-right">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-brand-blue dark:bg-blue-950/60 dark:text-brand-cyan">
                    {SPECIALTY_LABELS[project.category] || project.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    تاريخ النشر:{' '}
                    {new Date(project.createdAt).toLocaleDateString('ar-EG', {
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
                    تفاصيل ومتطلبات المشروع:
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {project.description}
                  </div>
                </div>

                {/* Required Skills */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
                    المهارات والخبرات المطلوبة:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(project.requiredSkills || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proposals Management Section (Visible to Owner & Applied Engineers) */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    العروض المقدمة على المشروع ({proposals.length})
                  </h2>
                  <span className="text-xs text-slate-400">
                    {isOwner ? 'أنت صاحب هذا المشروع' : 'مقدمة من مهندسين معتمدين'}
                  </span>
                </div>

                {proposals.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">
                    لم يتم تقديم أي عروض حتى الآن. كن أول من يقدم عرضاً هندسياً!
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
                            <div className="w-10 h-10 rounded-full bg-brand-blue text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {prop.engineerName.charAt(0)}
                            </div>
                            <div>
                              <Link
                                to={`/engineer/${prop.engineerId}`}
                                className="text-sm font-bold text-slate-900 dark:text-white hover:text-brand-blue transition"
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
                            <span className="text-xs text-slate-400">العرض المالي</span>
                            <div className="text-base font-extrabold text-slate-900 dark:text-white">
                              {prop.proposedBudget.toLocaleString()}{' '}
                              <span className="text-xs font-normal text-slate-500">ج.م</span>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block">
                              مدة التنفيذ: {prop.deliveryDays} أيام
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
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>قبول العرض</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRejectProposal(prop.id)}
                              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>رفض</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStartChat(prop.engineerId, prop.engineerName)}
                              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>محادثة</span>
                            </button>
                          </div>
                        )}

                        {prop.status === 'accepted' && (
                          <div className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>تم قبول هذا العرض للبدء في المشروع!</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar: Budget, Client Info & CTAs */}
            <aside className="space-y-6 text-right">
              {/* Project Overview Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card">
                <span className="text-xs text-slate-400 block mb-1">الميزانية المرصودة</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                  {project.budget.toLocaleString()}{' '}
                  <span className="text-sm font-semibold text-slate-500">ج.م</span>
                </div>

                <div className="space-y-3 text-xs pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">المدة المتوقعة:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{project.duration}</span>
                  </div>
                  {project.deadline && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">الموعد النهائي:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{project.deadline}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">صاحب المشروع:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{project.clientName}</span>
                  </div>
                  {project.clientCity && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">المدينة / الدولة:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{project.clientCity}</span>
                    </div>
                  )}
                </div>

                {/* Submit Proposal CTA */}
                {isEngineer && project.status === 'open' && (
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {hasAlreadyApplied ? (
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-brand-blue dark:text-brand-cyan text-xs font-bold text-center">
                        ✓ لقد قمت بتقديم عرضك بالفعل
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white text-xs font-bold shadow-md shadow-brand-blue/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>قدّم عرضك الآن</span>
                      </button>
                    )}
                  </div>
                )}

                {!isAuthenticated && (
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-xs text-slate-500 mb-3">سجّل كمهندس لتقديم عرضك الفني والمالي</p>
                    <Link
                      to="/login"
                      className="block w-full py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold"
                    >
                      تسجيل الدخول لتقديم عرض
                    </Link>
                  </div>
                )}
              </div>

              {/* AI Recommended Engineers */}
              {matchingEngineers.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-brand-cyan" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      ترشيحات الذكاء الاصطناعي للمشروع
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {matchingEngineers.map(({ engineer, matchScore, reasons }) => (
                      <div
                        key={engineer.id}
                        className="p-3.5 rounded-xl bg-brand-bg dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300">
                            تطابق {matchScore}%
                          </span>
                          <Link
                            to={`/engineer/${engineer.id}`}
                            className="text-xs font-bold text-slate-900 dark:text-white hover:text-brand-blue"
                          >
                            {engineer.fullName}
                          </Link>
                        </div>
                        <ul className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 mb-2">
                          {reasons.slice(0, 2).map((r, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-brand-cyan shrink-0" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 dark:border-slate-700">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {engineer.hourlyRate} ج.م/ساعة
                          </span>
                          <Link
                            to={`/engineer/${engineer.id}`}
                            className="text-brand-blue dark:text-brand-cyan font-bold hover:underline"
                          >
                            عرض الملف ←
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
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-right animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                تقديم عرض هندسي على المشروع
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProposalSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    الميزانية المقترحة (ج.م) *
                  </label>
                  <input
                    type="number"
                    required
                    value={proposalForm.proposedBudget}
                    onChange={(e) =>
                      setProposalForm({ ...proposalForm, proposedBudget: e.target.value })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    مدة التسليم (أيام) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="مثال: 7"
                    value={proposalForm.deliveryDays}
                    onChange={(e) =>
                      setProposalForm({ ...proposalForm, deliveryDays: e.target.value })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  تفاصيل العرض الفني ورسالة التغطية (Cover Letter) *
                </label>
                <textarea
                  required
                  rows={5}
                  value={proposalForm.coverLetter}
                  onChange={(e) =>
                    setProposalForm({ ...proposalForm, coverLetter: e.target.value })
                  }
                  placeholder="وضح خبرتك في هذا النوع من المشاريع، خطوات التنفيذ، البرامج الهندسية التي ستستخدمها، وما تقدمه للعميل..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-md hover:bg-brand-blueHover transition disabled:opacity-50"
                >
                  {loading ? 'جاري الإرسال...' : 'تأكيد وإرسال العرض'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
