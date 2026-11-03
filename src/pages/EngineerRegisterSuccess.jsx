import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ShieldCheck, ArrowLeft, Home as HomeIcon } from 'lucide-react';
import Layout from '../components/Layout';

export default function EngineerRegisterSuccess() {
  return (
    <Layout>
      <div className="py-16 sm:py-24 flex items-center justify-center text-center">
        <div className="w-full max-w-lg px-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-card">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
              تم استلام طلبك بنجاح!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
              شكراً لانضمامك إلى نخبة مهندسي MahandesPro. يقوم فريق التدقيق الهندسي حالياً بمراجعة السيرة الذاتية والمؤهلات المسجلة وسنخطرك فور تفعيل الحساب.
            </p>

            {/* Steps Timeline */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-8 text-right space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    1. استلام طلب التسجيل
                  </h4>
                  <p className="text-[11px] text-slate-500">تم حفظ بياناتك وسيرتك الذاتية بأمان.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    2. التدقيق ومراجعة الاعتماد
                  </h4>
                  <p className="text-[11px] text-slate-500">جاري فحص التخصص ونماذج المخططات الهندسية.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    3. تفعيل الحساب والبدء في العمل
                  </h4>
                  <p className="text-[11px] text-slate-500">استقبال دعوات المشاريع وتقديم العروض للعملاء.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                to="/login"
                className="w-full sm:flex-1 py-3 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white text-xs font-bold shadow-md shadow-brand-blue/20 transition"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/"
                className="w-full sm:flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
