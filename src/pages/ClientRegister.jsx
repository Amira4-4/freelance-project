import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, User, Phone, Mail, Lock, MapPin, Briefcase, AlertCircle, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import { registerClient } from '../services/storage';
import { useAuth } from '../context/AuthContext';

export default function ClientRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    city: 'القاهرة',
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'الاسم الكامل أو اسم المسؤول مطلوب';
    if (!form.phone.trim()) return 'رقم الهاتف مطلوب';
    if (!/^01[0-9]{9}$/.test(form.phone.replace(/\s/g, ''))) {
      return 'رقم الهاتف غير صحيح (مثال: 01012345678)';
    }
    if (!form.email.trim()) return 'البريد الإلكتروني مطلوب';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'صيغة البريد الإلكتروني غير صحيحة';
    }
    if (!form.password) return 'كلمة المرور مطلوبة';
    if (form.password.length < 6) return 'كلمة المرور يجب أن لا تقل عن 6 أحرف';
    if (form.password !== form.confirmPassword) return 'كلمتا المرور غير متطابقتين';
    if (!form.company.trim()) return 'اسم الشركة أو المنشأة مطلوب';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valErr = validate();
    if (valErr) {
      setError(valErr);
      return;
    }

    setLoading(true);
    try {
      const client = registerClient({
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        company: form.company.trim(),
        city: form.city.trim(),
      });

      login(client, 'client');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-12 sm:py-20 flex items-center justify-center">
        <div className="w-full max-w-lg px-4 text-right">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-card">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto mb-3 shadow-glow">
                <Briefcase className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                إنشاء حساب عميل / شركة
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                انشر مشاريعك الهندسية وتواصل مع أفضل الاستشاريين
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-bold mb-4 flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  الاسم الكامل أو اسم المسؤول *
                </label>
                <input
                  type="text"
                  required
                  placeholder="م. طارق الباز"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    اسم الشركة / المؤسسة *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="شركة الروضة للتطوير العقاري"
                    value={form.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    المدينة / الدولة *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="القاهرة، مصر"
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01012345678"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tarek@example.com"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    كلمة المرور *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    تأكيد كلمة المرور *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
              >
                {loading ? 'جاري التسجيل...' : 'إنشاء حساب عميل والبدء'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="font-bold text-brand-blue dark:text-brand-cyan hover:underline">
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
