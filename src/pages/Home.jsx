import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  ArrowRight, 
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
  FileCheck2,
  Clock,
  Layers,
  ChevronRight
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
  const [activeTab, setActiveTab] = useState('clients');

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
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Glow ambient background elements combining Cyan & Blue */}
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-400/15 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading and Search */}
            <div className="lg:col-span-7">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/80 dark:border-cyan-800/60 text-xs font-bold text-cyan-800 dark:text-cyan-300 mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>Premier Engineering Talent & Consulting Network</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
                Connect your project with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">
                  certified engineers
                </span>{' '}
                & consultants
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
                Empower your development with top-tier structural, architectural, MEP, and interior consultants. Deliver code-compliant blueprints, calculations, and 3D modeling on time.
              </p>

              {/* Live Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative max-w-xl bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-xl shadow-cyan-500/5 border border-slate-200 dark:border-slate-800 flex items-center gap-2 mb-6"
              >
                <div className="flex-1 flex items-center pl-3">
                  <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by specialty, skill, or keyword (e.g. Structural, Revit, HVAC, BIM)..."
                    className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  Search
                </button>
              </form>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Popular:</span>
                {['Structural Design', 'Villa Blueprints', 'Interior 3D', 'MEP HVAC', 'Solar PV', 'Revit BIM'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => navigate(`/engineers?q=${encodeURIComponent(tag)}`)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 text-slate-600 dark:text-slate-300 hover:text-brand-blue transition-colors shadow-xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/engineers"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blueHover px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore Engineers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/register/engineer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-800/80 hover:bg-blue-50/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3.5 rounded-xl shadow-xs transition-all"
                >
                  <span>Join as an Engineer</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual & Floating Badge Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card Container */}
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 p-3">
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"
                    alt="Engineer reviewing architectural blueprints"
                    className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent rounded-2xl flex items-end p-6">
                    <div className="text-white text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-cyan-300">Verified Syndicate Accreditation</span>
                      </div>
                      <p className="text-base font-bold">Rigorous technical review of all deliverables</p>
                      <p className="text-xs text-slate-300">Adhering strictly to international building codes</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stat Card 1: Completed Projects */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 flex items-center justify-center shrink-0 shadow-sm">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Completed Projects</span>
                    <p className="text-base font-black text-slate-900 dark:text-white">
                      +{stats.completedProjects + 160} Projects
                    </p>
                  </div>
                </div>

                {/* Floating Stat Card 2: Rating */}
                <div className="absolute -top-6 -right-4 sm:-right-6 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0 shadow-sm">
                    <Star className="w-6 h-6 fill-amber-400" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Client Rating</span>
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
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400">
                +{stats.totalEngineers * 45}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Registered Consultants</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-blue-400">
                +{stats.totalProjects * 35}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Engineering Projects</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                98.8%
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">On-Time Milestones</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                100%
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Code Compliance Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ENGINEERING SPECIALIZATIONS ===================== */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                Specialized Disciplines
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
                Explore Engineering Disciplines
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-2 md:mt-0 leading-relaxed">
              Find licensed specialists across every major technical sector, ready to take your project from feasibility to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENGINEERING_CATEGORIES.map((cat) => {
              const IconComp = categoryIcons[cat.icon] || Building2;
              return (
                <Link
                  key={cat.id}
                  to={`/engineers?specialty=${cat.id}`}
                  className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400/80 dark:hover:border-cyan-500 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {cat.nameEn}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
                    <span>+{cat.count} Consultants</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== FEATURED ENGINEERS ===================== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                Vetted Excellence
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
                Featured Engineering Consultants
              </h2>
            </div>
            <Link
              to="/engineers"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue dark:text-cyan-400 hover:underline mt-4 sm:mt-0"
            >
              <span>View all consultants</span>
              <ArrowRight className="w-4 h-4" />
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
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Streamlined & Transparent
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
              How MahandesPro Works
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              A transparent, milestone-driven workflow ensuring high-quality engineering deliverables with escrow protection.
            </p>

            {/* Role Switcher Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mt-8 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab('clients')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'clients'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                For Clients & Businesses
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('engineers')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'engineers'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                For Engineers & Studios
              </button>
            </div>
          </div>

          {/* Workflow Steps Grid */}
          {activeTab === 'clients' ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left">
              {[
                { step: '01', title: 'Post Your Project', desc: 'Specify drawings scope, codes, deadline, and target budget.' },
                { step: '02', title: 'AI Match & Proposals', desc: 'AI highlights top consultants while engineers pitch custom proposals.' },
                { step: '03', title: 'Review Portfolios', desc: 'Compare verified calculation notes, past projects, and ratings.' },
                { step: '04', title: 'Escrow Milestone', desc: 'Fund secure milestones; funds are only released upon your sign-off.' },
                { step: '05', title: 'Stamped Deliverables', desc: 'Receive signed blueprints, calculation sheets, and 3D files.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 relative shadow-sm"
                >
                  <span className="text-3xl font-black text-cyan-500/25 block mb-2 font-mono">
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left">
              {[
                { step: '01', title: 'Register Profile', desc: 'Upload your engineering license, CV, and core disciplines.' },
                { step: '02', title: 'Syndicate Audit', desc: 'Our technical board verifies your professional registration.' },
                { step: '03', title: 'Build Portfolio', desc: 'Showcase 3D renders, BIM models, and past stamped projects.' },
                { step: '04', title: 'Submit Proposals', desc: 'Bid on high-budget commercial and residential tenders.' },
                { step: '05', title: 'Get Paid Reliably', desc: 'Deliver deliverables and withdraw funds straight to your account.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 relative shadow-sm"
                >
                  <span className="text-3xl font-black text-blue-500/25 block mb-2 font-mono">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                Live Opportunities
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
                Latest Engineering Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue dark:text-cyan-400 hover:underline mt-4 sm:mt-0"
            >
              <span>Browse all projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 font-bold">
                      {SPECIALTY_LABELS[proj.category] || proj.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{proj.duration}</span>
                    </span>
                  </div>

                  <Link
                    to={`/project/${proj.id}`}
                    className="text-base font-bold text-slate-900 dark:text-white hover:text-brand-blue dark:hover:text-cyan-400 transition-colors line-clamp-2 mb-2"
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
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Target Budget</span>
                    <p className="text-base font-black text-slate-900 dark:text-white">
                      ${proj.budget.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to={`/project/${proj.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-3.5 py-2 rounded-xl hover:bg-cyan-500 hover:text-white transition-all"
                  >
                    <span>Details & Bid</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== AI POWERED ASSISTANT SPOTLIGHT ===================== */}
      <section id="features" className="py-14 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden text-left border-y border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold mb-4 border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MahandesPro AI Engine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
                Intelligent Matching Algorithm Finds Your Ideal Consultant in Seconds
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Input your blueprints or project brief, and our AI assistant automatically classifies the engineering discipline, drafts comprehensive deliverable scopes, cross-checks fair market pricing, and recommends consultants with 95%+ historical match scores.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                to="/register/client"
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm shadow-md shadow-cyan-500/25 transition-all hover:scale-105"
              >
                Try AI Project Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-slate-800/60 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Client & Studio Stories
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
              Trusted by Leading Developers & Engineers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <StarRating rating={5} size="sm" showValue={false} />
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-4 italic">
                  "As a real estate development firm, finding certified structural consultants who reliably meet strict deadlines was a challenge. MahandesPro connected us with top consultants who saved us over 12% in steel rebar tonnage."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  TB
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Tarek El-Baz</h5>
                  <span className="text-[10px] text-slate-400">CEO, El-Rawda Real Estate Development</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <StarRating rating={5} size="sm" showValue={false} />
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-4 italic">
                  "We designed a complete specialized clinical hub with the mechanical HVAC and fire protection engineer hired through this platform. The communication was seamless and calculations complied strictly with healthcare codes."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-xs">
                  MA
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Dr. Mona Abdel-Salam</h5>
                  <span className="text-[10px] text-slate-400">Founder, Elite Medical Hubs</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <StarRating rating={5} size="sm" showValue={false} />
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-4 italic">
                  "As an independent architectural consultant, MahandesPro gave my studio access to high-value international projects and clients who value quality. The milestone escrow gives complete peace of mind."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                  SE
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Eng. Sarah El-Shennawy</h5>
                  <span className="text-[10px] text-slate-400">Principal Architect, Facade Studio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CALL TO ACTION ===================== */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-blue-900 to-cyan-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-cyan-500/20">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">
                Ready to Engineer Your Next Landmark?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                Join thousands of builders, developers, and certified engineering consultants on MahandesPro to bring complex visions into reality.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/register/client"
                  className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-sm font-black shadow-md shadow-cyan-400/20 transition-all hover:scale-105"
                >
                  Post a Project for Free
                </Link>
                <Link
                  to="/register/engineer"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-bold transition-all"
                >
                  Join as a Consultant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
