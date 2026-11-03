import { Link } from 'react-router-dom';
import { Building2, Compass, Briefcase, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';

export default function RoleSelection() {
  return (
    <Layout>
      <div className="py-12 sm:py-20 flex items-center justify-center">
        <div className="w-full max-w-xl px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan text-white flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
            انضم إلى منصة مهندسPro
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10">
            حدد نوع حسابك لبدء التجربة الهندسية المتكاملة
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right">
            {/* Engineer Option Card */}
            <Link
              to="/register/engineer"
              className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-card hover:shadow-card-hover hover:border-brand-blue/50 dark:hover:border-brand-blue/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-brand-blue dark:text-brand-cyan flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">
                  أنا مهندس / استشاري
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  سجل كمهندس معتمد، ابنِ معرض أعمالك الهندسية، واستقبل طلبات المشاريع والعروض المجزية.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-brand-blue dark:text-brand-cyan">
                <span>التسجيل كمهندس</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Client Option Card */}
            <Link
              to="/register/client"
              className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-card hover:shadow-card-hover hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  أنا صاحب مشروع / عميل
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  ابحث عن نخبة الاستشاريين والمعماريين، انشر مشاريعك الهندسية واستلم عروض تنفيذ متقنة.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>التسجيل كعميل</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <p className="mt-10 text-xs text-slate-500">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="font-bold text-brand-blue dark:text-brand-cyan hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
