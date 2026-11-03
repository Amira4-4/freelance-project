import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, User, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { loginClient, loginEngineer, loginAdmin } from '../services/storage';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState('client'); // 'client' | 'engineer' | 'admin'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '', username: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (role === 'admin') {
        const admin = loginAdmin(form.username, form.password);
        login(admin, 'admin');
        navigate('/admin');
      } else if (role === 'engineer') {
        const engineer = loginEngineer(form.email, form.password);
        login(engineer, 'engineer');
        navigate(`/engineer/${engineer.id}`);
      } else {
        const client = loginClient(form.email, form.password);
        login(client, 'client');
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-12 sm:py-20 flex items-center justify-center">
        <div className="w-full max-w-md px-4 text-right">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-card">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan text-white flex items-center justify-center mx-auto mb-3 shadow-glow">
                <Building2 className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                تسجيل الدخول
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                ادخل إلى حسابك في منصة مهندسPro
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-1 mb-6 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setRole('client');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                  role === 'client'
                    ? 'bg-white dark:bg-slate-900 text-brand-blue dark:text-brand-cyan shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                عميل
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('engineer');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                  role === 'engineer'
                    ? 'bg-white dark:bg-slate-900 text-brand-blue dark:text-brand-cyan shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                مهندس
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('admin');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                  role === 'admin'
                    ? 'bg-white dark:bg-slate-900 text-brand-blue dark:text-brand-cyan shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                إدارة
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-bold mb-4 flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {role === 'admin' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    اسم المستخدم للإدارة
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="admin"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder={role === 'client' ? 'tarek.baz@elrawda.com' : 'ahmed.kamal@example.com'}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              {role === 'admin' && (
                <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 text-[11px] text-brand-blue dark:text-brand-cyan">
                  💡 بيانات حساب الإدارة التجريبي: admin / admin123
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-blue/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
              </button>
            </form>

            {role !== 'admin' && (
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
                ليس لديك حساب بعد؟{' '}
                <Link
                  to="/register"
                  className="font-bold text-brand-blue dark:text-brand-cyan hover:underline"
                >
                  إنشاء حساب جديد
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
