import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Briefcase, 
  Filter, 
  RotateCcw, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  PlusCircle, 
  DollarSign, 
  Layers,
  ArrowUpDown
} from 'lucide-react';
import Layout from '../components/Layout';
import { 
  getProjects, 
  ENGINEERING_CATEGORIES, 
  SPECIALTY_LABELS 
} from '../services/storage';

export default function BrowseProjects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [statusFilter, setStatusFilter] = useState('open'); // 'open', 'all'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'budget-desc', 'budget-asc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('all');
    setStatusFilter('open');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const filteredProjects = useMemo(() => {
    return projects
      .filter((proj) => {
        const q = search.toLowerCase().trim();
        const matchesSearch =
          !q ||
          proj.title.toLowerCase().includes(q) ||
          proj.description.toLowerCase().includes(q) ||
          (proj.requiredSkills || []).some((s) => s.toLowerCase().includes(q));

        const matchesCat = selectedCategory === 'all' || proj.category === selectedCategory;
        const matchesStatus = statusFilter === 'all' || proj.status === statusFilter;

        return matchesSearch && matchesCat && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === 'budget-desc') return (b.budget || 0) - (a.budget || 0);
        if (sortBy === 'budget-asc') return (a.budget || 0) - (b.budget || 0);
        return 0;
      });
  }, [projects, search, selectedCategory, statusFilter, sortBy]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 text-right">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                المشاريع والفرص الهندسية المفتوحة
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                تصفح المشاريع الهندسية المطروحة من العملاء والشركات، وقدّم عروضك الهندسية المتخصصة.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-blue/20 transition-all self-start sm:self-center shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>نشر مشروع هندسي جديد</span>
            </Link>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-sm mb-8 flex flex-col md:flex-row items-center gap-3 text-right">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ابحث في عنوان المشروع، المتطلبات، أو المهارات المطلوبة..."
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pr-11 pl-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-200 outline-none font-medium cursor-pointer"
              >
                <option value="all">كل التخصصات الهندسية</option>
                {ENGINEERING_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-200 outline-none font-medium cursor-pointer"
              >
                <option value="open">المشاريع المفتوحة للعروض فقط</option>
                <option value="all">جميع الحالات</option>
              </select>

              {/* Sort */}
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-slate-700 dark:text-slate-200 outline-none cursor-pointer font-medium"
                >
                  <option value="newest">الأحدث نشرًا</option>
                  <option value="budget-desc">الميزانية: من الأعلى للأقل</option>
                  <option value="budget-asc">الميزانية: من الأقل للأعلى</option>
                </select>
              </div>

              {(search || selectedCategory !== 'all' || statusFilter !== 'open') && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-xl text-slate-500 hover:text-brand-blue dark:hover:text-brand-cyan hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="إعادة ضبط الفلاتر"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Results Counter */}
          <div className="text-right text-xs text-slate-500 dark:text-slate-400 mb-4 px-1">
            <span>تم العثور على {filteredProjects.length} مشروع</span>
          </div>

          {/* Projects List */}
          {filteredProjects.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-brand-blue flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                لا توجد مشاريع تطابق خيارات البحث الحالية
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                يمكنك نشر مشروعك الآن أو إعادة ضبط الفلاتر للاطلاع على كل الفرص.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card hover:shadow-card-hover hover:border-brand-blue/30 dark:hover:border-brand-blue/40 transition-all text-right"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Project Information */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-brand-blue dark:bg-blue-950/60 dark:text-brand-cyan border border-blue-200/60 dark:border-blue-900/60">
                          {SPECIALTY_LABELS[proj.category] || proj.category}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            proj.status === 'open'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}
                        >
                          {proj.status === 'open' ? 'مفتوح لتقديم العروض' : 'قيد التنفيذ'}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 mr-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>مدة التسليم: {proj.duration}</span>
                        </span>
                        {proj.clientCity && (
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{proj.clientCity}</span>
                          </span>
                        )}
                      </div>

                      <Link
                        to={`/project/${proj.id}`}
                        className="text-lg font-bold text-slate-900 dark:text-white hover:text-brand-blue dark:hover:text-brand-cyan transition-colors block mb-2"
                      >
                        {proj.title}
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                        {proj.description}
                      </p>

                      {/* Required skills */}
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-xs font-semibold text-slate-400 ml-1">المهارات:</span>
                        {(proj.requiredSkills || []).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and CTA Column */}
                    <div className="lg:border-r lg:border-slate-100 lg:dark:border-slate-800/80 lg:pr-6 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">الميزانية المقترحة</span>
                        <div className="text-xl font-black text-slate-900 dark:text-white">
                          {proj.budget.toLocaleString()}{' '}
                          <span className="text-xs font-normal text-slate-500">ج.م</span>
                        </div>
                        <span className="text-[11px] text-brand-blue dark:text-brand-cyan font-semibold block mt-0.5">
                          {proj.proposalsCount || 0} عروض مقدمة
                        </span>
                      </div>

                      <Link
                        to={`/project/${proj.id}`}
                        className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>تقديم عرض / تفاصيل</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    السابق
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx + 1}
                      type="button"
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold ${
                        currentPage === idx + 1
                          ? 'bg-brand-blue text-white shadow-sm'
                          : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    التالي
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
