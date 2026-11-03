import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Building2, 
  PlusCircle, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  X, 
  ExternalLink, 
  Bookmark, 
  AlertCircle,
  Search,
  Eye,
  Layers
} from 'lucide-react';
import Layout from '../components/Layout';
import EngineerCard from '../components/EngineerCard';
import { useAuth } from '../context/AuthContext';
import { 
  getProjects, 
  createProject, 
  getFavoriteEngineers, 
  getConversations, 
  getMessages, 
  sendMessage, 
  ENGINEERING_CATEGORIES, 
  SPECIALTY_LABELS,
  aiEnhanceProjectDescription
} from '../services/storage';

export default function ClientDashboard() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'projects';
  const initialConvId = searchParams.get('convId') || null;

  const [activeTab, setActiveTab] = useState(initialTab); // 'projects' | 'favorites' | 'chat'
  const [projects, setProjects] = useState([]);
  const [favoriteEngineers, setFavoriteEngineers] = useState([]);
  
  // Post project modal state
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'civil',
    description: '',
    requiredSkills: '',
    budget: '',
    duration: '',
    deadline: '',
  });
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Chat state
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    if (role !== 'client' && role !== 'admin') {
      navigate('/login');
      return;
    }
    loadData();
  }, [role, navigate]);

  const loadData = () => {
    const allProjects = getProjects();
    const myProjects = allProjects.filter((p) => p.clientId === user?.id || role === 'admin');
    setProjects(myProjects);

    const favs = getFavoriteEngineers();
    setFavoriteEngineers(favs);

    if (user?.id) {
      const convs = getConversations(user.id);
      setConversations(convs);
      if (initialConvId) {
        const found = convs.find((c) => c.id === initialConvId);
        if (found) {
          setSelectedConv(found);
          setChatMessages(getMessages(found.id));
        }
      } else if (convs.length > 0 && !selectedConv) {
        setSelectedConv(convs[0]);
        setChatMessages(getMessages(convs[0].id));
      }
    }
  };

  const handleSelectConv = (conv) => {
    setSelectedConv(conv);
    setChatMessages(getMessages(conv.id));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConv) return;

    sendMessage(selectedConv.id, user.id, messageInput.trim());
    setMessageInput('');
    setChatMessages(getMessages(selectedConv.id));
    setConversations(getConversations(user.id));
  };

  const handleAiAssistantSuggest = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      const suggestion = aiEnhanceProjectDescription(form.title, form.description, form.category);
      setForm((prev) => ({
        ...prev,
        title: prev.title || suggestion.suggestedTitle,
        description: suggestion.refinedDescription,
        requiredSkills: suggestion.recommendedSkills.join(', '),
        duration: suggestion.suggestedDuration,
      }));
      setIsAiLoading(false);
    }, 600);
  };

  const handlePostProject = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.budget) {
      setFeedback({ type: 'error', text: 'يرجى استكمال الحقول الإلزامية للمشروع.' });
      return;
    }

    try {
      const created = createProject(
        {
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category,
          requiredSkills: form.requiredSkills
            ? form.requiredSkills.split(',').map((s) => s.trim())
            : [],
          budget: Number(form.budget),
          duration: form.duration || '10 أيام',
          deadline: form.deadline,
        },
        user.id,
        user.fullName || user.name,
        user.city || 'القاهرة'
      );

      setFeedback({ type: 'success', text: 'تم نشر مشروعك بنجاح! سيبدأ المهندسون بتقديم عروضهم.' });
      setPostModalOpen(false);
      setForm({
        title: '',
        category: 'civil',
        description: '',
        requiredSkills: '',
        budget: '',
        duration: '',
        deadline: '',
      });
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
    setTimeout(() => setFeedback({ type: '', text: '' }), 4000);
  };

  const totalProposalsReceived = projects.reduce((sum, p) => sum + (p.proposalsCount || 0), 0);
  const activeProjectsCount = projects.filter((p) => p.status === 'open' || p.status === 'in_progress').length;

  return (
    <Layout>
      <div className="py-8 sm:py-12 text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-brand-navy to-slate-900 rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-brand-cyan text-xs font-bold mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>لوحة تحكم العميل المعتمد</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                أهلاً بك، {user?.fullName || user?.name || 'العميل العزيز'} 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-xl leading-relaxed">
                {user?.company ? `${user.company} — ` : ''}تابع حالة مشاريعك المنشورة، قارن عروض الاستشاريين، وتواصل مباشرة في محادثات آمنة وموثقة.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setPostModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-brand-cyan hover:bg-brand-cyanHover text-brand-navy font-black text-xs sm:text-sm shadow-cyan-glow flex items-center gap-2 transition hover:scale-105 shrink-0"
            >
              <PlusCircle className="w-5 h-5" />
              <span>نشر مشروع هندسي جديد</span>
            </button>
          </div>

          {/* Feedback alerts */}
          {feedback.text && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold mb-6 flex items-center gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1">المشاريع المنشورة</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{projects.length}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1">المشاريع الجارية والمفتوحة</span>
              <p className="text-2xl font-black text-brand-blue dark:text-brand-cyan">{activeProjectsCount}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1">إجمالي العروض المستلمة</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{totalProposalsReceived}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1">المهندسون المحفوظون</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{favoriteEngineers.length}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'projects'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>مشاريعي المنشورة ({projects.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('favorites')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'favorites'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>المهندسون المحفوظون ({favoriteEngineers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'chat'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>المحادثات والرسائل ({conversations.length})</span>
            </button>
          </div>

          {/* Tab 1: My Posted Projects */}
          {activeTab === 'projects' && (
            <div>
              {projects.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-brand-blue flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    لم تنشر أي مشروع هندسي بعد
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                    انشر مشروعك الآن لتصل إلى نخبة المهندسين والاستشاريين المعتمدين فوراً.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPostModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-md shadow-brand-blue/20"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>نشر أول مشروع الآن</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-brand-blue dark:bg-blue-950/60 dark:text-brand-cyan">
                            {SPECIALTY_LABELS[proj.category] || proj.category}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              proj.status === 'open'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                            }`}
                          >
                            {proj.status === 'open' ? 'مفتوح لتلقي العروض' : 'قيد التنفيذ'}
                          </span>
                          <span className="text-xs text-slate-400">
                            تاريخ النشر: {new Date(proj.createdAt).toLocaleDateString('ar-EG')}
                          </span>
                        </div>

                        <Link
                          to={`/project/${proj.id}`}
                          className="text-base font-bold text-slate-900 dark:text-white hover:text-brand-blue transition block mb-1"
                        >
                          {proj.title}
                        </Link>

                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 max-w-2xl leading-relaxed">
                          {proj.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 block">الميزانية</span>
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            {proj.budget.toLocaleString()} ج.م
                          </span>
                          <span className="text-xs text-brand-blue dark:text-brand-cyan font-bold block">
                            {proj.proposalsCount || 0} عروض مقدمة
                          </span>
                        </div>

                        <Link
                          to={`/project/${proj.id}`}
                          className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                        >
                          <Eye className="w-4 h-4" />
                          <span>عرض ومقارنة العروض</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Saved / Favorite Engineers */}
          {activeTab === 'favorites' && (
            <div>
              {favoriteEngineers.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                  <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    لم تحفظ أي مهندسين في المفضلة بعد
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    استكشف المهندسين واضغط على علامة المفضلة للرجوع إليهم لاحقاً بسهولة.
                  </p>
                  <Link
                    to="/engineers"
                    className="px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold"
                  >
                    استكشف المهندسين الآن
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favoriteEngineers.map((engineer) => (
                    <EngineerCard key={engineer.id} engineer={engineer} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Real-Time Messaging & Chat */}
          {activeTab === 'chat' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-3 h-[600px]">
              {/* Conversations List */}
              <div className="border-l border-slate-200 dark:border-slate-800 overflow-y-auto p-4 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white px-2 mb-3">
                  المحادثات المفتوحة ({conversations.length})
                </h3>

                {conversations.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-12">
                    لا توجد محادثات نشطة حالياً. يمكنك بدء محادثة من صفحة تفاصيل أي مهندس أو عرض.
                  </p>
                ) : (
                  conversations.map((conv) => {
                    const isSelected = selectedConv?.id === conv.id;
                    return (
                      <div
                        key={conv.id}
                        onClick={() => handleSelectConv(conv)}
                        className={`p-3 rounded-2xl cursor-pointer transition ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/60 border border-brand-blue/30'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {conv.engineerName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(conv.lastMessageTime).toLocaleTimeString('ar-EG', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Chat Thread */}
              <div className="lg:col-span-2 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-slate-950/40">
                {selectedConv ? (
                  <>
                    {/* Header */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {selectedConv.engineerName}
                        </h4>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>متصل الآن للمناقشة الهندسية</span>
                        </span>
                      </div>
                      <Link
                        to={`/engineer/${selectedConv.engineerId}`}
                        className="text-xs text-brand-blue dark:text-brand-cyan font-bold hover:underline"
                      >
                        عرض الملف الشخصي
                      </Link>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {chatMessages.map((msg) => {
                        const isMe = msg.senderId === user?.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}
                          >
                            <div
                              className={`max-w-md rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                                isMe
                                  ? 'bg-brand-blue text-white rounded-br-none'
                                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200/80 dark:border-slate-700 rounded-bl-none shadow-sm'
                              }`}
                            >
                              <p>{msg.text}</p>
                              <span
                                className={`text-[9px] block mt-1 ${
                                  isMe ? 'text-blue-200' : 'text-slate-400'
                                }`}
                              >
                                {new Date(msg.timestamp).toLocaleTimeString('ar-EG', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chat Input */}
                    <form
                      onSubmit={handleSendMessage}
                      className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="اكتب رسالتك للمهندس..."
                        className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                      <button
                        type="submit"
                        className="p-2.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blueHover shadow-sm"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                    اختر محادثة لعرض الرسائل
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post a Project Modal */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setPostModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-right animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  نشر مشروع هندسي جديد
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  أدخل مواصفات المخططات والميزانية المرصودة لجذب أمهر الاستشاريين
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPostModalOpen(false)}
                className="p-1 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Assistant Banner inside modal */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-brand-cyan shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    مساعد المشاريع الذكي MahandesPro AI
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    يمكن للمساعد صياغة متطلبات المشروع، اقتراح المهارات والمخرجات تلقائياً.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAiAssistantSuggest}
                disabled={isAiLoading}
                className="px-3.5 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-sm hover:bg-brand-blueHover transition shrink-0"
              >
                {isAiLoading ? 'جاري التحليل...' : 'توليد المتطلبات بالذكاء الاصطناعي'}
              </button>
            </div>

            <form onSubmit={handlePostProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  عنوان المشروع الهندسي *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: إعداد تصميم إنشائي ونوتة حسابية لفيلا سكنية دورين"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    التخصص الهندسي المطلوب *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
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
                    الميزانية المرصودة (ج.م) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="مثال: 15000"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  وصف المشروع والمخرجات المطلوبة *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="حدد مساحة المبنى، نوع المخططات (معمارية، إنشائية، MEP)، اشتراطات الكود، والصيغ المطلوبة (DWG, PDF)..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    المهارات والبرامج الهندسية المطلوبة (مفصولة بفاصلة)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: ETABS, AutoCAD, كود البناء"
                    value={form.requiredSkills}
                    onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    المدة المتوقعة للتسليم
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: 10 إلى 14 يوماً"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white text-xs font-bold shadow-md shadow-brand-blue/20 transition"
                >
                  نشر المشروع الآن وتلقي العروض
                </button>
                <button
                  type="button"
                  onClick={() => setPostModalOpen(false)}
                  className="px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
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
