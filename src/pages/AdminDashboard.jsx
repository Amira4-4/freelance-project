import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Check, 
  X, 
  AlertCircle,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Eye,
  Trash2,
  Lock,
  Unlock,
  Building2,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { 
  getEngineers, 
  updateEngineerStatus, 
  getPlatformStats, 
  getAdminAnalyticsData, 
  getProjects, 
  SPECIALTY_LABELS 
} from '../services/storage';

const COLORS = ['#2563EB', '#06B6D4', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

export default function AdminDashboard() {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('verification'); // 'verification' | 'analytics' | 'projects'
  const [engineers, setEngineers] = useState([]);
  const [filter, setFilter] = useState('pending'); // 'pending', 'approved', 'rejected', 'all'
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const stats = getPlatformStats();
  const analytics = getAdminAnalyticsData();
  const allProjects = getProjects();

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/login');
      return;
    }
    loadEngineers();
  }, [role, navigate, filter]);

  const loadEngineers = () => {
    if (filter === 'all') {
      setEngineers(getEngineers());
    } else {
      setEngineers(getEngineers(filter));
    }
  };

  const handleApprove = (id) => {
    updateEngineerStatus(id, 'approved');
    setMessage('تم اعتماد وتفعيل حساب المهندس بنجاح! تم إرسال إشعار للمهندس.');
    setSelectedEngineer(null);
    loadEngineers();
    setTimeout(() => setMessage(''), 4000);
  };

  const handleRejectConfirm = () => {
    if (!selectedEngineer) return;
    updateEngineerStatus(selectedEngineer.id, 'rejected', rejectReason);
    setMessage('تم رفض الطلب وتدوين الأسباب للمهندس.');
    setRejectModalOpen(false);
    setRejectReason('');
    setSelectedEngineer(null);
    loadEngineers();
    setTimeout(() => setMessage(''), 4000);
  };

  const filteredEngineers = engineers.filter((e) =>
    e.fullName.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase()) ||
    (SPECIALTY_LABELS[e.specialty] || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="py-8 sm:py-12 text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-brand-navy to-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-brand-cyan text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>لوحة القيادة الإدارية والتحكم SaaS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                مركز إدارة منصة مهندسPro
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                مراجعة واعتماد طلبات المهندسين الجدد، فحص السير الذاتية والشهادات النقابية، ومراقبة نمو المشاريع والإحصائيات.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                النظام متصل وآمن
              </span>
            </div>
          </div>

          {message && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* KPI Statistics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1">طلبات الاعتماد المعلقة</span>
              <p className="text-2xl font-black text-amber-500">{stats.pendingApprovals}</p>
              <span className="text-[11px] text-slate-400 mt-1 block">تتطلب تدقيق الشهادات</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1">إجمالي المهندسين المعتمدين</span>
              <p className="text-2xl font-black text-brand-blue dark:text-brand-cyan">{stats.activeEngineers}</p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">نشطون وجاهزون للعمل</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1">المشاريع المطروحة</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalProjects}</p>
              <span className="text-[11px] text-slate-400 mt-1 block">{stats.openProjects} مشروع مفتوح حالياً</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1">العملاء المسجلون</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalClients}</p>
              <span className="text-[11px] text-slate-400 mt-1 block">شركات ومطورون أفراد</span>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-8 pb-1">
            <button
              type="button"
              onClick={() => setActiveTab('verification')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'verification'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>مراجعة طلبات المهندسين ({stats.pendingApprovals} معلق)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>الرسوم البيانية والتحليلات</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>مراقبة المشاريع ({allProjects.length})</span>
            </button>
          </div>

          {/* Tab 1: Engineer Verification Workflow */}
          {activeTab === 'verification' && (
            <div>
              {/* Filter Pills and Search */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { key: 'pending', label: 'قيد المراجعة', count: stats.pendingApprovals },
                    { key: 'approved', label: 'المقبولون', count: stats.activeEngineers },
                    { key: 'rejected', label: 'المرفوضون', count: engineers.filter((e) => e.status === 'rejected').length },
                    { key: 'all', label: 'الكل', count: stats.totalEngineers },
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                        filter === f.key
                          ? 'bg-brand-blue text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {f.label} ({f.count})
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ابحث بالاسم أو البريد..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Master-Detail Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* List of Applications (5 Cols) */}
                <div className="lg:col-span-5 space-y-3">
                  {filteredEngineers.length === 0 ? (
                    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                      لا توجد طلبات مطابقة لهذا الفلتر.
                    </div>
                  ) : (
                    filteredEngineers.map((eng) => {
                      const isSelected = selectedEngineer?.id === eng.id;
                      return (
                        <div
                          key={eng.id}
                          onClick={() => setSelectedEngineer(eng)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-50/70 border-brand-blue dark:bg-blue-950/50 dark:border-brand-blue shadow-md'
                              : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-navy text-white font-bold flex items-center justify-center shrink-0">
                                {eng.fullName.charAt(0)}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                  {eng.fullName}
                                </h4>
                                <p className="text-xs text-brand-blue dark:text-brand-cyan mt-0.5">
                                  {SPECIALTY_LABELS[eng.specialty] || eng.specialty}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                eng.status === 'pending'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : eng.status === 'approved'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-red-50 text-red-700 border border-red-200'
                              }`}
                            >
                              {eng.status === 'pending' && 'قيد المراجعة'}
                              {eng.status === 'approved' && 'مقبول'}
                              {eng.status === 'rejected' && 'مرفوض'}
                            </span>
                          </div>

                          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                            <span>خبرة: {eng.experience} سنوات</span>
                            <span>السعر: {eng.hourlyRate} ج.م/س</span>
                            <span>{new Date(eng.createdAt).toLocaleDateString('ar-EG')}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Details View (7 Cols) */}
                <div className="lg:col-span-7">
                  {selectedEngineer ? (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                              {selectedEngineer.fullName}
                            </h2>
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                selectedEngineer.status === 'pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : selectedEngineer.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {selectedEngineer.status === 'pending' && 'طلب جديد'}
                              {selectedEngineer.status === 'approved' && 'معتمد'}
                              {selectedEngineer.status === 'rejected' && 'مرفوض'}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-brand-blue dark:text-brand-cyan mt-1">
                            {SPECIALTY_LABELS[selectedEngineer.specialty] || selectedEngineer.specialty}
                          </p>
                        </div>

                        {selectedEngineer.status === 'pending' && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleApprove(selectedEngineer.id)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                            >
                              <Check className="w-4 h-4" />
                              <span>قبول المهندس</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setRejectModalOpen(true)}
                              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                            >
                              <X className="w-4 h-4" />
                              <span>رفض الطلب</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                          <span className="text-slate-400 block mb-0.5">الهاتف</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200" dir="ltr">
                            {selectedEngineer.phone}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                          <span className="text-slate-400 block mb-0.5">البريد الإلكتروني</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                            {selectedEngineer.email}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                          <span className="text-slate-400 block mb-0.5">سعر الساعة</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {selectedEngineer.hourlyRate} ج.م/ساعة
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                          <span className="text-slate-400 block mb-0.5">الخبرة</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {selectedEngineer.experience} سنوات
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                          <span className="text-slate-400 block mb-0.5">المدينة</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {selectedEngineer.location || 'مصر'}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                          <span className="text-slate-400 block mb-0.5">حالة التفرغ</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {selectedEngineer.availability === 'available' ? 'متاح للعمل' : 'مشغول'}
                          </span>
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          النبذة وخبرات المتقدم:
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                          {selectedEngineer.bio}
                        </p>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          المهارات والبرامج:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {(selectedEngineer.skills || []).map((s, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certifications and CV */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <a
                            href={selectedEngineer.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-blue-600 hover:underline"
                          >
                            LinkedIn
                          </a>
                          <a
                            href={selectedEngineer.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:underline"
                          >
                            GitHub
                          </a>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (selectedEngineer.cv) {
                              const link = document.createElement('a');
                              link.href = selectedEngineer.cv;
                              link.download = selectedEngineer.cvName || 'Engineer_CV.pdf';
                              link.click();
                            } else {
                              alert('السيرة الذاتية غير مرفوعة بصيغة ملف مباشر.');
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5 text-brand-blue" />
                          <span>تحميل السيرة الذاتية ({selectedEngineer.cvName || 'CV.pdf'})</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 text-slate-400 text-xs">
                      اختر طلباً من القائمة لعرض كامل تفاصيل المتقدم ومراجعة السيرة الذاتية.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: SaaS Charts & Analytics (Recharts) */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Row 1: Growth Area Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      معدل نمو المنصة والمشاريع الهندسية
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      تزايد تسجيل المهندسين والعملاء شهرياً
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="h-72 w-full dir-ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.growthData}>
                      <defs>
                        <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorClient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                      <YAxis stroke="#94A3B8" fontSize={11} />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="engineers"
                        name="المهندسون"
                        stroke="#2563EB"
                        fillOpacity={1}
                        fill="url(#colorEng)"
                      />
                      <Area
                        type="monotone"
                        dataKey="clients"
                        name="العملاء"
                        stroke="#06B6D4"
                        fillOpacity={1}
                        fill="url(#colorClient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Row 2: Pie and Bar Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Specialization Distribution */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    توزيع المشاريع حسب التخصص الهندسي
                  </h3>
                  <div className="h-64 w-full dir-ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analytics.categoryDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {analytics.categoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Monthly Activity Bar Chart */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    المشاريع المنفذة شهرياً
                  </h3>
                  <div className="h-64 w-full dir-ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.growthData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                        <YAxis stroke="#94A3B8" fontSize={11} />
                        <Tooltip />
                        <Bar dataKey="projects" name="المشاريع المنفذة" fill="#2563EB" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Project Monitoring */}
          {activeTab === 'projects' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-card">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">
                مراقبة المشاريع المطروحة على المنصة ({allProjects.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">عنوان المشروع</th>
                      <th className="pb-3 font-semibold">التخصص</th>
                      <th className="pb-3 font-semibold">صاحب المشروع</th>
                      <th className="pb-3 font-semibold">الميزانية</th>
                      <th className="pb-3 font-semibold">العروض</th>
                      <th className="pb-3 font-semibold">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {allProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                          {p.title}
                        </td>
                        <td className="py-3.5 text-slate-500">
                          {SPECIALTY_LABELS[p.category] || p.category}
                        </td>
                        <td className="py-3.5 text-slate-700 dark:text-slate-300">
                          {p.clientName}
                        </td>
                        <td className="py-3.5 font-extrabold text-slate-900 dark:text-white">
                          {p.budget.toLocaleString()} ج.م
                        </td>
                        <td className="py-3.5 font-bold text-brand-blue">
                          {p.proposalsCount || 0}
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.status === 'open'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {p.status === 'open' ? 'مفتوح' : 'قيد التنفيذ'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reject Reason Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setRejectModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl z-10 text-right animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              توضيح سبب رفض طلب التسجيل
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              سيتم إرسال هذا السبب إلى المهندس لتصحيح بياناته وإعادة التقديم.
            </p>

            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="مثال: يرجى إرفاق كارنيه نقابة المهندسين الساري أو استكمال بيانات المشاريع السابقة..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 mb-4"
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRejectConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                تأكيد الرفض
              </button>
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
