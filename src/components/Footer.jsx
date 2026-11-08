import { Link } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { ENGINEERING_CATEGORIES } from '../services/storage';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12 transition-colors text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-slate-800/80 mb-12">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-cyan-500/10">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Vetted Consultants</h4>
              <p className="text-xs text-slate-400 mt-0.5">Verified engineering licenses & certified credentials</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-blue-500/10">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-brand-blue flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Guaranteed Milestones</h4>
              <p className="text-xs text-slate-400 mt-0.5">Secure payments held in escrow until approval</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-cyan-500/10">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">AI-Driven Matching</h4>
              <p className="text-xs text-slate-400 mt-0.5">Instant match between project scope and top talent</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                Mahandes<span className="text-cyan-400">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier engineering marketplace connecting real estate developers, commercial contractors, and enterprise clients with accredited engineering consultants and specialists worldwide.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Smart Village, Giza, Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+20 2 3535 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>contact@mahandespro.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/engineers" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Explore Engineers</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Browse Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/register/client" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Post a Project</span>
                </Link>
              </li>
              <li>
                <Link to="/register/engineer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Join as an Engineer</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Client & Engineer Sign In</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Specialties</h4>
            <ul className="space-y-2.5 text-xs">
              {ENGINEERING_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/engineers?specialty=${cat.id}`}
                    className="hover:text-cyan-400 transition-colors flex items-center justify-between"
                  >
                    <span>{cat.nameEn || cat.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">+{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Assurance</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Syndicate Licenses</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Standard NDA Protection</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Milestone-Based Escrow</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>24/7 Technical Mediation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MahandesPro Engineering Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#support" className="hover:text-cyan-400 transition-colors">Support Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
