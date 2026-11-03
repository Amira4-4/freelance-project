import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  ArrowLeft, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Compass, 
  Wrench, 
  Zap, 
  Home as HomeIcon, 
  Code2, 
  Leaf, 
  Check, 
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Clock,
  Layers
} from 'lucide-react';
import Layout from '../components/Layout';
import EngineerCard from '../components/EngineerCard';
import StarRating from '../components/StarRating';
import { 
  getEngineers, 
  getProjects, 
  getPlatformStats, 
  ENGINEERING_CATEGORIES, 
  SPECIALTY_LABELS 
} from '../services/storage';

const categoryIcons = {
  Building2: Building2,
  Compass: Compass,
  Wrench: Wrench,
  Zap: Zap,
  Home: HomeIcon,
  ShieldCheck: ShieldCheck,
  Code2: Code2,
  Leaf: Leaf,
};

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('clients'); // 'clients' | 'engineers'

  const stats = getPlatformStats();
  const featuredEngineers = getEngineers('approved').slice(0, 4);
  const latestProjects = getProjects('open').slice(0, 3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/engineers?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/engineers');
    }
  };

  return (
    <Layout>
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left/Main Column: Heading and Search */}
            <div className="lg:col-span-7 text-right">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-xs font-semibold text-brand-blue dark:text-brand-cyan mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                <span>المنصة الهندسية المتكاملة رقم #1 للربط والتوظيف</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.2] mb-6">
                اربط مشروعك بأكفأ{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-600 to-brand-cyan">
                  المهندسين والاستشاريين
                </span>{' '}
                المعتمدين
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
                منصة هندسية احترافية توفر لك نخبة من المهندسين المدنيين، المعماريين، مصممي الديكور، ومستشاري الـ MEP لإنجاز التصاميم والمخططات التنفيذية بدقة وجودة لا تقبل المساومة.
              </p>

              {/* Live Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative max-w-xl bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-xl shadow-brand-navy/5 border border-slate-200 dark:border-slate-800 flex items-center gap-2 mb-6"
              >
                <div className="flex-1 flex items-center pr-3">
                  <Search className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث بالتخصص (مثال: تصميم إنشائي، ديكور، HVAC، Revit)..."
                    className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-brand-blueHover text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-brand-blue/30 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  ابحث الآن
                </button>
              </form>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
                <span className="font-semibold text-slate-700 dark:text-slate-300">شائع:</span>
                {['تصميم إنشائي', 'مخططات فلل', 'ديكور 3D', 'حساب كميات', 'طاقة شمسية'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => navigate(`/engineers?q=${encodeURIComponent(tag)}`)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/engineers"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blueHover px-6 py-3.5 rounded-xl shadow-lg shadow-brand-blue/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>استكشف المهندسين</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  to="/register/engineer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3.5 rounded-xl transition-all"
                >
                  <span>انضم كمهندس محترف</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual & Interactive Badge Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card Container */}
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 p-3">
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"
                    alt="مهندس معماري يعمل على المخططات"
                    className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent rounded-2xl flex items-end p-6">
                    <div className="text-white text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                        <span className="text-xs font-semibold text-brand-cyan">اعتماد نقابي موثق</span>
                      </div>
                      <p className="text-base font-bold">مراجعة هندسية دقيقة لكافة المخططات</p>
                      <p className="text-xs text-slate-300">وفقاً للكود المصري والعربي المعتمد</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stat Card 1: Fast Matching */}
                <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 animate-bounce-slow">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400">مشاريع مكتملة</span>
                    <p className="text-base font-black text-slate-900 dark:text-white">
                      +{stats.completedProjects + 120} مشروع
                    </p>
                  </div>
                </div>

                {/* Floating Stat Card 2: Rating */}
                <div className="absolute -top-6 -left-4 sm:-left-6 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 fill-amber-400" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400">متوسط رضا العملاء</span>
                    <p className="text-base font-black text-slate-900 dark:text-white">
                      {stats.avgRating} / 5.0 ⭐
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Live Stats Bar */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-brand-cyan">
                +{stats.totalEngineers * 30}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">مهندس استشاري مسجل</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                +{stats.totalProjects * 25}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">مشروع هندسي منفذ</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                98.7%
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">نسبة الالتزام بالمواعيد</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="text-2xl sm:text-3xl font-black text-brand-navy dark:text-slate-200">
                100%
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">ضمان اعتماد المخططات</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ENGINEERING SPECIALIZATIONS ===================== */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-right">
            <div>
              <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
                التخصصات والمجالات
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                تصفح كافة التخصصات الهندسية
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-2 md:mt-0">
              اختر التخصص المطلوب وتواصل فوراً مع أفضل المهندسين المتخصصين والمكاتب الاستشارية.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENGINEERING_CATEGORIES.map((cat) => {
              const IconComp = categoryIcons[cat.icon] || Building2;
              return (
                <Link
                  key={cat.id}
                  to={`/engineers?specialty=${cat.id}`}
                  className="group relative p-6 rounded-2xl bg-brand-bg dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 shadow-sm hover:shadow-card-hover transition-all duration-300 text-right flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-brand-blue dark:text-brand-cyan flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {cat.nameEn}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-brand-blue dark:text-brand-cyan">
                    <span>+{cat.count} مهندس مسجل</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== FEATURED ENGINEERS ===================== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 text-right">
            <div>
              <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
                نخبة المنصة
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                مهندسون استشاريون مميزون
              </h2>
            </div>
            <Link
              to="/engineers"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue dark:text-brand-cyan hover:underline mt-4 sm:mt-0"
            >
              <span>عرض جميع المهندسين</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEngineers.map((engineer) => (
              <EngineerCard key={engineer.id} engineer={engineer} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
              بكل بساطة واحترافية
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              كيف تعمل منصة مهندسPro؟
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              خطوات واضحة ومنظمة تضمن تنفيذ عملك الهندسي بأعلى درجات الأمان وحماية الحقوق.
            </p>

            {/* Role Switcher Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mt-8 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab('clients')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'clients'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                أنا عميل (أبحث عن مهندس)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('engineers')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'engineers'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                أنا مهندس (أبحث عن مشاريع)
              </button>
            </div>
          </div>

          {/* Workflow Steps Grid */}
          {activeTab === 'clients' ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-right">
              {[
                { step: '01', title: 'أنشئ حسابك', desc: 'تسجيل سريع ومجاني كعميل أو شركة تطوير عقاري.' },
                { step: '02', title: 'انشر مشروعك', desc: 'حدد التخصص المطلوب، الميزانية، وتفاصيل المخططات.' },
                { step: '03', title: 'استقبل العروض', desc: 'يقدم المهندسون المعتمدون عروضهم مع سابقة أعمالهم.' },
                { step: '04', title: 'اختر المهندس', desc: 'قارن العروض والتقييمات وابدأ المحادثة المباشرة.' },
                { step: '05', title: 'استلم المخرجات', desc: 'مراجعة المخططات والنوت الحسابية واعتماد التسليم.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-brand-bg dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 relative"
                >
                  <span className="text-3xl font-black text-brand-blue/20 dark:text-brand-cyan/20 block mb-2 font-mono">
                    {item.step}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-right">
              {[
                { step: '01', title: 'سجل كمهندس', desc: 'ارفع شهاداتك وسيرتك الذاتية وتخصصك الهندسي.' },
                { step: '02', title: 'اعتماد الإدارة', desc: 'يتم فحص المؤهلات والاعتماد النقابي لضمان الموثوقية.' },
                { step: '03', title: 'ابنِ معرض أعمالك', desc: 'أضف صور المخططات والتصاميم ثلاثية الأبعاد والمشاريع السابقة.' },
                { step: '04', title: 'قدّم عروضك', desc: 'تصفح المشاريع المفتوحة وتواصل مع أصحاب الأعمال.' },
                { step: '05', title: 'نفذ واقبض أرباحك', desc: 'سلّم مخرجاتك واحصل على تقييمات ممتازة ومردود مالي مجزي.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-brand-bg dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 relative"
                >
                  <span className="text-3xl font-black text-emerald-500/20 block mb-2 font-mono">
                    {item.step}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================== LATEST PROJECTS ===================== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 text-right">
            <div>
              <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
                فرص عمل مفتوحة
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                أحدث المشاريع الهندسية المنشورة
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue dark:text-brand-cyan hover:underline mt-4 sm:mt-0"
            >
              <span>تصفح جميع المشاريع</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between text-right"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-brand-blue dark:bg-blue-950/60 dark:text-brand-cyan font-semibold">
                      {SPECIALTY_LABELS[proj.category] || proj.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{proj.duration}</span>
                    </span>
                  </div>

                  <Link
                    to={`/project/${proj.id}`}
                    className="text-base font-bold text-slate-900 dark:text-white hover:text-brand-blue dark:hover:text-brand-cyan transition-colors line-clamp-2 mb-2"
                  >
                    {proj.title}
                  </Link>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(proj.requiredSkills || []).slice(0, 3).map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400">الميزانية المقدرة</span>
                    <p className="text-base font-black text-slate-900 dark:text-white">
                      {proj.budget.toLocaleString()} ج.م
                    </p>
                  </div>
                  <Link
                    to={`/project/${proj.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue dark:text-brand-cyan bg-blue-50 dark:bg-blue-950/60 px-3.5 py-2 rounded-xl hover:bg-brand-blue hover:text-white transition-all"
                  >
                    <span>تفاصيل المشروع</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== AI POWERED ASSISTANT FEATURE BANNER ===================== */}
      <section className="py-12 bg-gradient-to-r from-brand-navy to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-brand-cyan text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>نظام الذكاء الاصطناعي الذكي MahandesPro AI</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
                خوارزمية مطابقة ذكية ترشح لك المهندس المثالي في ثوانٍ
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                ادخل تفاصيل مشروعك أو فكرتك، ويقوم مساعد الذكاء الاصطناعي بتحليل المخططات، اقتراح التخصص المناسب، مراجعة الأسعار التقديرية، وترشيح المهندسين ذوي الخبرة المتطابقة بنسبة 95% وأكثر.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <Link
                to="/register/client"
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-brand-cyan hover:bg-brand-cyanHover text-brand-navy font-extrabold text-sm shadow-cyan-glow transition-all hover:scale-105"
              >
                جرب مساعد المشاريع الذكي
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
              قصص نجاح
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              ماذا يقول عملاؤنا ومهندسونا؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-bg dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <StarRating rating={5} size="sm" showValue={false} />
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-4 italic">
                  "كشركة تطوير عقاري، كنا نعاني في إيجاد مهندسين إنشائيين يلتزمون بالمواعيد ويقدمون نوت حسابية معتمدة دون أخطاء. منصة مهندسPro وفرت لنا استشاريين متميزين وفروا علينا ملايين في تكلفة التسليح."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-bold flex items-center justify-center text-xs">
                  م.ط
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">م. طارق الباز</h5>
                  <span className="text-[10px] text-slate-400">الرئيس التنفيذي، شركة الروضة للتطوير</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-bg dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <StarRating rating={5} size="sm" showValue={false} />
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-4 italic">
                  "صممت مجمع عيادات كامل مع مهندس التكييف ومكافحة الحريق المسجل هنا. التواصل كان سريعاً والمخططات متوافقة تماماً مع اشتراطات الدفاع المدني. خدمة تستحق 10 نجوم."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  د.م
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">د. منى عبد السلام</h5>
                  <span className="text-[10px] text-slate-400">مؤسس مجموعة عيادات النخبة</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-bg dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <StarRating rating={5} size="sm" showValue={false} />
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-4 italic">
                  "كمهندسة معمارية مستقلة، المنصة منحتني وصولاً لعملاء جادين يبحثون عن تصاميم راقية وليس مجرد أسعار رخيصة. نظام حماية المدفوعات والتقييمات أعطاني راحة بال تامة."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-xs">
                  م.س
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">م. سارة الشناوي</h5>
                  <span className="text-[10px] text-slate-400">مهندسة معمارية ومصممة واجهات</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CALL TO ACTION ===================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-brand-navy via-brand-navyLight to-brand-blue text-white p-8 sm:p-14 overflow-hidden text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-black mb-4">
                هل أنت مستعد لبدء مشروعك الهندسي القادم؟
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                انضم الآن إلى آلاف المطورين والمهندسين على منصة MahandesPro وحوّل أفكارك الهندسية إلى مشاريع واقعية مشيدة بأعلى مقاييس الجودة.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/register/client"
                  className="px-6 py-3.5 rounded-xl bg-brand-cyan hover:bg-brand-cyanHover text-brand-navy text-sm font-extrabold shadow-cyan-glow transition-all hover:scale-105"
                >
                  انشر مشروعك الآن مجاناً
                </Link>
                <Link
                  to="/register/engineer"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-bold transition-all"
                >
                  سجل كمهندس استشاري
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
