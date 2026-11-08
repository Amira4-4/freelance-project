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
  Calendar,
  Sparkles
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

const COLORS = ['#2563EB', '#06B6D4', '#3B82F6', '#10B981', '#6366F1', '#0EA5E9'];

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
    setMessage('Engineer verified and activated successfully! Notification sent.');
    setSelectedEngineer(null);
    loadEngineers();
    setTimeout(() => setMessage(''), 4000);
  };

  const handleRejectConfirm = () => {
    if (!selectedEngineer) return;
    updateEngineerStatus(selectedEngineer.id, 'rejected', rejectReason);
    setMessage('Application rejected with feedback sent to the engineer.');
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
      <div className="py-8 sm:py-12 text-left bg-slate-50/60 dark:bg-slate-950/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-3 border border-cyan-500/30">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Executive SaaS Management Console</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                MahandesPro Platform Command Center
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                Review and approve new engineering credentials, verify licenses and resumes, and monitor marketplace growth metrics.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Core Services Operational</span>
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
              <span className="text-xs text-slate-400 block mb-1 font-medium">Pending Verifications</span>
              <p className="text-2xl font-black text-amber-500">{stats.pendingApprovals}</p>
              <span className="text-[11px] text-slate-400 mt-1 block">Requires accreditation check</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1 font-medium">Verified Engineers</span>
              <p className="text-2xl font-black text-blue-600 dark:text-cyan-400">{stats.activeEngineers}</p>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">Active & bidding</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1 font-medium">Platform Projects</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalProjects}</p>
              <span className="text-[11px] text-slate-400 mt-1 block">{stats.openProjects} open for tenders</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
              <span className="text-xs text-slate-400 block mb-1 font-medium">Enterprise Clients</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalClients}</p>
              <span className="text-[11px] text-slate-400 mt-1 block">Developers & owners</span>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-8 pb-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('verification')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'verification'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Engineer Review Queue ({stats.pendingApprovals} pending)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'analytics'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics & Growth</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Project Audit ({allProjects.length})</span>
            </button>
          </div>

          {/* Tab 1: Engineer Verification Workflow */}
          {activeTab === 'verification' && (
            <div>
              {/* Filter Pills and Search */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { key: 'pending', label: 'Pending Review', count: stats.pendingApprovals },
                    { key: 'approved', label: 'Approved', count: stats.activeEngineers },
                    { key: 'rejected', label: 'Declined', count: engineers.filter((e) => e.status === 'rejected').length },
                    { key: 'all', label: 'All Engineers', count: stats.totalEngineers },
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                        filter === f.key
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {f.label} ({f.count})
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, or specialty..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Master-Detail Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* List of Applications (5 Cols) */}
                <div className="lg:col-span-5 space-y-3">
                  {filteredEngineers.length === 0 ? (
                    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                      No applications match this filter criteria.
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
                              ? 'bg-blue-50/70 border-blue-500 dark:bg-blue-950/50 dark:border-cyan-400 shadow-md'
                              : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center shrink-0">
                                {eng.fullName.charAt(0)}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                  {eng.fullName}
                                </h4>
                                <p className="text-xs text-blue-600 dark:text-cyan-400 mt-0.5">
                                  {SPECIALTY_LABELS[eng.specialty] || eng.specialty}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                eng.status === 'pending'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300'
                                  : eng.status === 'approved'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                                  : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300'
                              }`}
                            >
                              {eng.status === 'pending' && 'Under Review'}
                              {eng.status === 'approved' && 'Verified'}
                              {eng.status === 'rejected' && 'Rejected'}
                            </span>
                          </div>

                          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                            <span>Experience: {eng.experience} yrs</span>
                            <span>Rate: ${eng.hourlyRate}/hr</span>
                            <span>{new Date(eng.createdAt).toLocaleDateString('en-US')}</span>
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
                              {selectedEngineer.status === 'pending' && 'New Application'}
                              {selectedEngineer.status === 'approved' && 'Verified Consultant'}
                              {selectedEngineer.status === 'rejected' && 'Rejected'}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-blue-600 dark:text-cyan-400 mt-1">
                            {SPECIALTY_LABELS[selectedEngineer.specialty] || selectedEngineer.specialty}
                          </p>
                        </div>

                        {selectedEngineer.status === 'pending' && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleApprove(selectedEngineer.id)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition"
                            >
                              <Check className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setRejectModalOpen(true)}
                              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition"
                            >
                              <X className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                          <span className="text-slate-400 block mb-0.5 font-medium">Phone</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {selectedEngineer.phone}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                          <span className="text-slate-400 block mb-0.5 font-medium">Email</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                            {selectedEngineer.email}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                          <span className="text-slate-400 block mb-0.5 font-medium">Hourly Rate</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            ${selectedEngineer.hourlyRate}/hr
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                          <span className="text-slate-400 block mb-0.5 font-medium">Experience</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {selectedEngineer.experience} Years
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                          <span className="text-slate-400 block mb-0.5 font-medium">Location</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {selectedEngineer.location || 'United States'}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                          <span className="text-slate-400 block mb-0.5 font-medium">Availability</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {selectedEngineer.availability === 'available' ? 'Available' : 'Busy'}
                          </span>
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Professional Bio & Statement:
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                          {selectedEngineer.bio}
                        </p>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          Engineering Skills & Software:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {(selectedEngineer.skills || []).map((s, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-slate-800 text-xs font-semibold text-blue-900 dark:text-blue-200 border border-blue-100 dark:border-slate-700"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certifications and CV */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {selectedEngineer.linkedin && (
                            <a
                              href={selectedEngineer.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-blue-600 hover:underline"
                            >
                              LinkedIn Profile
                            </a>
                          )}
                          {selectedEngineer.github && (
                            <a
                              href={selectedEngineer.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:underline"
                            >
                              GitHub Repository
                            </a>
                          )}
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
                              alert('No uploaded CV file attached.');
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 transition"
                        >
                          <Download className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                          <span>Download CV ({selectedEngineer.cvName || 'CV.pdf'})</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 text-slate-400 text-xs">
                      Select an engineer application from the left to inspect complete qualifications and CV credentials.
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
                      Platform Growth & Project Volume
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Monthly registration of verified engineers vs active client projects
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="h-72 w-full">
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
                        name="Engineers"
                        stroke="#2563EB"
                        fillOpacity={1}
                        fill="url(#colorEng)"
                      />
                      <Area
                        type="monotone"
                        dataKey="clients"
                        name="Clients"
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
                    Project Distribution by Engineering Discipline
                  </h3>
                  <div className="h-64 w-full">
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
                    Delivered Projects Per Month
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.growthData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                        <YAxis stroke="#94A3B8" fontSize={11} />
                        <Tooltip />
                        <Bar dataKey="projects" name="Completed Projects" fill="#2563EB" radius={[6, 6, 0, 0]} />
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
                Active Projects Audit Directory ({allProjects.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">Project Title</th>
                      <th className="pb-3 font-semibold">Discipline</th>
                      <th className="pb-3 font-semibold">Client Name</th>
                      <th className="pb-3 font-semibold">Budget</th>
                      <th className="pb-3 font-semibold">Bids</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {allProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
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
                          ${p.budget.toLocaleString()} USD
                        </td>
                        <td className="py-3.5 font-bold text-blue-600 dark:text-cyan-400">
                          {p.proposalsCount || 0}
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.status === 'open'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                            }`}
                          >
                            {p.status === 'open' ? 'Open' : 'In Progress'}
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
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl z-10 text-left animate-in fade-in duration-150 border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Decline Application Reason
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              This feedback will be communicated to the engineer so they can update their credentials and re-apply.
            </p>

            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Please provide a verified government engineering syndicate ID or detailed calculation sheet sample..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 mb-4"
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRejectConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm"
              >
                Confirm Decline
              </button>
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
