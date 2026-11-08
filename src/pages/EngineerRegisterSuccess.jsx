import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, Home as HomeIcon } from 'lucide-react';
import Layout from '../components/Layout';

export default function EngineerRegisterSuccess() {
  return (
    <Layout>
      <div className="py-16 sm:py-24 flex items-center justify-center text-center bg-slate-50/60 dark:bg-slate-950/40 min-h-[calc(100vh-140px)]">
        <div className="w-full max-w-lg px-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-card">
            <div className="w-16 h-16 rounded-3xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-md shadow-cyan-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
              Application Received Successfully!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
              Thank you for applying to join MahandesPro's verified consultant network. Our engineering review committee is currently auditing your license, credentials, and resume. You will receive an email once your account is verified.
            </p>

            {/* Steps Timeline */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-8 text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    1. Application Submission
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Your profile, credentials, and portfolio deliverables have been recorded.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    2. Credential Verification
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Verifying syndicate registration, calculation sheets, and CAD samples.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    3. Account Activation & Tenders
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive project invitation matches and submit competitive engineering bids.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                to="/login"
                className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
              >
                Sign In
              </Link>
              <Link
                to="/"
                className="w-full sm:flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
