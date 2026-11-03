import { Link } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Sparkles,
  ArrowUpLeft,
  CheckCircle2
} from 'lucide-react';
import { ENGINEERING_CATEGORIES } from '../services/storage';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300 border-t border-slate-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-slate-800/80 mb-12">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-brand-cyan flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">مهندسون معتمدون 100%</h4>
              <p className="text-xs text-slate-400 mt-0.5">مراجعة دقيقة لشهادات النقابة والخبرة</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">ضمان حقوق التعاقد</h4>
              <p className="text-xs text-slate-400 mt-0.5">حماية كاملة لدفعات المشاريع ومراحل التسليم</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">ترشيح ذكي عبر AI</h4>
              <p className="text-xs text-slate-400 mt-0.5">مطابقة فورية للمشروع مع أكفأ استشاري</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-white shadow-glow">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight">
                مهندس<span className="text-brand-cyan">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              المنصة الهندسية الأولى في مصر والوطن العربي لربط المطورين العقاريين، أصحاب المشاريع والشركات بأفضل نخبة من المهندسين الاستشاريين والمعماريين المعتمدين.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>القرية الذكية، الجيزة، جمهورية مصر العربية</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                <span dir="ltr">+20 2 3535 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>support@mahandespro.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/engineers" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                  <span>استكشف المهندسين</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                  <span>تصفح المشاريع المفتوحة</span>
                </Link>
              </li>
              <li>
                <Link to="/register/client" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                  <span>انشر مشروعك مجاناً</span>
                </Link>
              </li>
              <li>
                <Link to="/register/engineer" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                  <span>انضم كمهندس محترف</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                  <span>تسجيل الدخول</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">التخصصات الهندسية</h4>
            <ul className="space-y-2.5 text-xs">
              {ENGINEERING_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/engineers?specialty=${cat.id}`}
                    className="hover:text-brand-cyan transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">+{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">الأمان والموثوقية</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>شهادات نقابية موثقة</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>اتفاقيات عدم إفشاء (NDA)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>مدفوعات آمنة ومجردة</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>دعم فني استشاري 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} مهندسPro. جميع الحقوق محفوظة لشركة مهندسPro للحلول الهندسية والتقنية.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">سياسة الخصوصية</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">شروط الاستخدام</a>
            <a href="#support" className="hover:text-slate-300 transition-colors">مركز المساعدة</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
