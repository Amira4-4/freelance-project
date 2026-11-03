import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  SlidersHorizontal, 
  Users, 
  Star, 
  CheckCircle2, 
  Clock, 
  ArrowUpDown,
  Building2,
  X
} from 'lucide-react';
import Layout from '../components/Layout';
import EngineerCard from '../components/EngineerCard';
import { 
  getEngineers, 
  ENGINEERING_CATEGORIES, 
  SPECIALTY_LABELS 
} from '../services/storage';

export default function ExploreEngineers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialSpecialty = searchParams.get('specialty') || 'all';

  const [engineers, setEngineers] = useState([]);
  const [search, setSearch] = useState(initialQuery);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [minRating, setMinRating] = useState('all'); // 'all', '4.5', '4.0'
  const [experienceLevel, setExperienceLevel] = useState('all'); // 'all', 'junior', 'mid', 'senior'
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'price-asc', 'price-desc', 'experience'
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    setEngineers(getEngineers('approved'));
  }, []);

  // Sync state if URL query params change
  useEffect(() => {
    if (searchParams.get('q')) setSearch(searchParams.get('q'));
    if (searchParams.get('specialty')) setSelectedSpecialty(searchParams.get('specialty'));
  }, [searchParams]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedSpecialty('all');
    setMinRating('all');
    setExperienceLevel('all');
    setAvailabilityOnly(false);
    setSortBy('rating');
    setCurrentPage(1);
    setSearchParams({});
  };

  const filteredEngineers = useMemo(() => {
    return engineers
      .filter((eng) => {
        // Search term matching
        const q = search.toLowerCase().trim();
        const matchesSearch =
          !q ||
          eng.fullName.toLowerCase().includes(q) ||
          (SPECIALTY_LABELS[eng.specialty] || '').toLowerCase().includes(q) ||
          (eng.skills || []).some((s) => s.toLowerCase().includes(q)) ||
          (eng.bio || '').toLowerCase().includes(q);

        // Specialty filter
        const matchesSpecialty =
          selectedSpecialty === 'all' || eng.specialty === selectedSpecialty;

        // Rating filter
        const matchesRating =
          minRating === 'all' || eng.rating >= parseFloat(minRating);

        // Experience filter
        let matchesExp = true;
        if (experienceLevel === 'junior') matchesExp = eng.experience <= 3;
        else if (experienceLevel === 'mid') matchesExp = eng.experience >= 4 && eng.experience <= 7;
        else if (experienceLevel === 'senior') matchesExp = eng.experience >= 8;

        // Availability filter
        const matchesAvailability = !availabilityOnly || eng.availability === 'available';

        return (
          matchesSearch &&
          matchesSpecialty &&
          matchesRating &&
          matchesExp &&
          matchesAvailability
        );
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'experience') return (b.experience || 0) - (a.experience || 0);
        if (sortBy === 'price-asc') return (a.hourlyRate || 0) - (b.hourlyRate || 0);
        if (sortBy === 'price-desc') return (b.hourlyRate || 0) - (a.hourlyRate || 0);
        return 0;
      });
  }, [engineers, search, selectedSpecialty, minRating, experienceLevel, availabilityOnly, sortBy]);

  const totalPages = Math.ceil(filteredEngineers.length / itemsPerPage);
  const paginatedEngineers = filteredEngineers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-right mb-8">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              استكشف نخبة المهندسين والاستشاريين
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              تصفح وتواصل مع مهندسين معتمدين في شتى التخصصات الهندسية، وقارن بين سابقة أعمالهم وتقييمات العملاء.
            </p>
          </div>

          {/* Search & Mobile Filter Toggle Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 sm:p-4 border border-slate-200/90 dark:border-slate-800 shadow-sm mb-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full text-right">
              <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ابحث بالاسم، المهارة، أو نوع المشروع..."
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pr-11 pl-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              {/* Sort selector */}
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs">
                <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-slate-700 dark:text-slate-200 outline-none cursor-pointer font-medium"
                >
                  <option value="rating">الأعلى تقييماً</option>
                  <option value="experience">الأكثر خبرة</option>
                  <option value="price-asc">الأقل سعراً للساعة</option>
                  <option value="price-desc">الأعلى سعراً للساعة</option>
                </select>
              </div>

              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-blue text-white text-xs font-semibold"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>الفلاتر</span>
              </button>
            </div>
          </div>

          {/* Main Layout: Sidebar Filters + Engineers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm sticky top-28 text-right space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-blue" />
                  <span>تصفية النتائج</span>
                </span>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-slate-500 hover:text-brand-blue dark:hover:text-brand-cyan flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة ضبط</span>
                </button>
              </div>

              {/* Specialization Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                  التخصص الهندسي
                </label>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSpecialty('all');
                      setCurrentPage(1);
                    }}
                    className={`w-full text-right text-xs px-3 py-2 rounded-xl transition font-medium flex items-center justify-between ${
                      selectedSpecialty === 'all'
                        ? 'bg-brand-blue text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>كل التخصصات</span>
                    <span className="text-[10px] opacity-80">{engineers.length}</span>
                  </button>
                  {ENGINEERING_CATEGORIES.map((cat) => {
                    const isSelected = selectedSpecialty === cat.id;
                    const count = engineers.filter((e) => e.specialty === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedSpecialty(cat.id);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-right text-xs px-3 py-2 rounded-xl transition font-medium flex items-center justify-between ${
                          isSelected
                            ? 'bg-brand-blue text-white font-bold'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] opacity-80">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience Level Filter */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                  سنوات الخبرة
                </label>
                <div className="space-y-1 text-xs">
                  {[
                    { key: 'all', label: 'الكل' },
                    { key: 'junior', label: '1 - 3 سنوات' },
                    { key: 'mid', label: '4 - 7 سنوات (محترف)' },
                    { key: 'senior', label: '8+ سنوات (استشاري وخبير)' },
                  ].map((exp) => (
                    <label
                      key={exp.key}
                      className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    >
                      <input
                        type="radio"
                        name="expLevel"
                        value={exp.key}
                        checked={experienceLevel === exp.key}
                        onChange={(e) => {
                          setExperienceLevel(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="text-brand-blue focus:ring-brand-blue/30"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{exp.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                  التقييم الأدنى
                </label>
                <div className="space-y-1 text-xs">
                  {[
                    { key: 'all', label: 'الكل' },
                    { key: '4.5', label: '4.5 نجوم وأعلى' },
                    { key: '4.0', label: '4.0 نجوم وأعلى' },
                  ].map((r) => (
                    <label
                      key={r.key}
                      className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    >
                      <input
                        type="radio"
                        name="minRating"
                        value={r.key}
                        checked={minRating === r.key}
                        onChange={(e) => {
                          setMinRating(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="text-brand-blue focus:ring-brand-blue/30"
                      />
                      <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <span>{r.label}</span>
                        {r.key !== 'all' && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter Toggle */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    متاح للعمل فوراً فقط
                  </span>
                  <input
                    type="checkbox"
                    checked={availabilityOnly}
                    onChange={(e) => {
                      setAvailabilityOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue/30 cursor-pointer"
                  />
                </label>
              </div>
            </aside>

            {/* Main Engineers Grid & Results */}
            <main className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4 text-xs text-slate-500 dark:text-slate-400 px-1">
                <span>تم العثور على {filteredEngineers.length} مهندس معتمد</span>
                {selectedSpecialty !== 'all' && (
                  <span className="font-semibold text-brand-blue dark:text-brand-cyan">
                    تخصص: {SPECIALTY_LABELS[selectedSpecialty]}
                  </span>
                )}
              </div>

              {filteredEngineers.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-brand-blue flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    لم نجد أي مهندسين يطابقون هذه الفلاتر
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                    جرب البحث بكلمات عامة أو إعادة تعيين خيارات التصفية لعرض جميع المهندسين المتاحين.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>إعادة ضبط الفلاتر</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedEngineers.map((engineer) => (
                      <EngineerCard key={engineer.id} engineer={engineer} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        السابق
                      </button>
                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        return (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                              currentPage === pageNum
                                ? 'bg-brand-blue text-white shadow-sm'
                                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        التالي
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white dark:bg-slate-900 h-full p-6 shadow-2xl z-10 overflow-y-auto text-right">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <span className="font-bold text-base text-slate-900 dark:text-white">الفلاتر</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Specialization */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                التخصص الهندسي
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
              >
                <option value="all">كل التخصصات</option>
                {ENGINEERING_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                الخبرة
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
              >
                <option value="all">الكل</option>
                <option value="junior">1 - 3 سنوات</option>
                <option value="mid">4 - 7 سنوات</option>
                <option value="senior">8+ سنوات</option>
              </select>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>متاح للعمل فوراً</span>
                <input
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(e) => setAvailabilityOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-blue"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-sm"
            >
              تطبيق الفلاتر ({filteredEngineers.length} مهندس)
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
