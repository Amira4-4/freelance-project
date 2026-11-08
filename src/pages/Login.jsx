import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
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
      <div className="py-12 sm:py-20 flex items-center justify-center bg-slate-50/60 dark:bg-slate-950/40 min-h-[calc(100vh-140px)]">
        <div className="w-full max-w-md px-4 text-left">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-card">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Sign In to MahandesPro
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Access your specialized engineering workspace
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
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('engineer');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                  role === 'engineer'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Engineer
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('admin');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                  role === 'admin'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 text-xs font-bold mb-4 flex items-center gap-2 border border-red-200 dark:border-red-900">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {role === 'admin' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Admin Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="admin"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder={role === 'client' ? 'sarah.jenkins@buildtech.com' : 'marcus.vance@structuralpro.io'}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {role === 'admin' && (
                <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-[11px] text-cyan-800 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60">
                  💡 Demo Admin Credentials: <strong>admin</strong> / <strong>admin123</strong>
                </div>
              )}

              {role !== 'admin' && (
                <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-slate-800 text-[11px] text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-slate-700">
                  💡 Demo Password for all accounts: <strong>password123</strong>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            {role !== 'admin' && (
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
                Don't have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                >
                  Create an account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
