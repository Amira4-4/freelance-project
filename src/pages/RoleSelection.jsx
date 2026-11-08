import { Link } from 'react-router-dom';
import { Building2, Compass, Briefcase, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

export default function RoleSelection() {
  return (
    <Layout>
      <div className="py-12 sm:py-20 flex items-center justify-center bg-slate-50/60 dark:bg-slate-950/40 min-h-[calc(100vh-140px)]">
        <div className="w-full max-w-xl px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-blue-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            Join MahandesPro
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10">
            Select your account profile to initiate your verified engineering journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {/* Engineer Option Card */}
            <Link
              to="/register/engineer"
              className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-card hover:shadow-card-hover hover:border-blue-500/50 dark:hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  I am an Engineer / Consultant
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Register as a verified engineering consultant, showcase CAD/BIM blueprints, and bid on high-value tenders.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-cyan-400">
                <span>Join as Engineer</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Client Option Card */}
            <Link
              to="/register/client"
              className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-card hover:shadow-card-hover hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">
                  I am a Client / Developer
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Hire top licensed architects and engineers, post project scopes, and receive certified deliverables.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
                <span>Join as Client</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <p className="mt-10 text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-600 dark:text-cyan-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
