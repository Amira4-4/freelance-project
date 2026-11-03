import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Compass, 
  Upload, 
  PlusCircle, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import Layout from '../components/Layout';
import { registerEngineer, fileToBase64, ENGINEERING_CATEGORIES } from '../services/storage';

const emptyProject = { title: '', description: '', link: '' };

export default function EngineerRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: 'civil',
    hourlyRate: '',
    experience: '',
    bio: '',
    skills: '',
    linkedin: '',
    github: '',
    location: 'القاهرة، مصر',
    cv: null,
    cvName: '',
  });
  const [projects, setProjects] = useState([{ ...emptyProject }]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const updateProject = (index, field, value) => {
    setProjects((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const addProject = () => {
    setProjects((prev) => [...prev, { ...emptyProject }]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      setProjects((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('حجم ملف السيرة الذاتية يجب أن لا يتجاوز 5 ميجابايت');
        return;
      }
      updateField('cv', file);
      updateField('cvName', file.name);
    }
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'الاسم الكامل مطلوب';
    if (!form.phone.trim()) return 'رقم الهاتف مطلوب';
    if (!/^01[0-9]{9}$/.test(form.phone.replace(/\s/g, ''))) {
      return 'رقم الهاتف غير صحيح (مثال: 01012345678)';
    }
    if (!form.email.trim()) return 'البريد الإلكتروني مطلوب';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'البريد الإلكتروني غير صحيح';
    }
    if (!form.password) return 'كلمة المرور مطلوبة';
    if (form.password.length < 6) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    if (form.password !== form.confirmPassword) return 'كلمتا المرور غير متطابقتين';
    if (!form.specialty) return 'التخصص الهندسي مطلوب';
    if (!form.hourlyRate || Number(form.hourlyRate) <= 0) return 'سعر الساعة الاستشارية مطلوب';
    if (!form.experience || Number(form.experience) < 0) return 'سنوات الخبرة مطلوبة';
    if (!form.bio.trim() || form.bio.trim().length < 40) {
      return 'النبذة التعريفية مطلوبة (40 حرفاً على الأقل للتعريف بخبراتك)';
    }
    if (!form.skills.trim()) return 'المهارات والبرامج الهندسية مطلوبة';
    if (!form.cv && !form.cvName) return 'يرجى إرفاق السيرة الذاتية (CV)';

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valErr = validate();
    if (valErr) {
      setError(valErr);
      return;
    }

    setLoading(true);
    try {
      let cvBase64 = null;
      if (form.cv && typeof form.cv !== 'string') {
        cvBase64 = await fileToBase64(form.cv);
      }

      registerEngineer({
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        specialty: form.specialty,
        hourlyRate: Number(form.hourlyRate),
        experience: Number(form.experience),
        bio: form.bio.trim(),
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
        linkedin: form.linkedin.trim() || 'https://linkedin.com',
        github: form.github.trim() || 'https://github.com',
        location: form.location.trim(),
        cv: cvBase64,
        cvName: form.cvName || 'Engineer_CV.pdf',
        projects: projects
          .filter((p) => p.title.trim())
          .map((p) => ({
            title: p.title.trim(),
            description: p.description.trim(),
            link: p.link.trim(),
            category: form.specialty,
            year: '2026',
          })),
      });

      navigate('/register/engineer/success');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-12 sm:py-20 flex items-center justify-center text-right">
        <div className="w-full max-w-3xl px-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-card">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan text-white flex items-center justify-center mx-auto mb-3 shadow-glow">
                <Compass className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                طلب انضمام كمهندس استشاري
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                سجل بياناتك ومؤهلاتك لاعتماد حسابك من الإدارة الهندسية والبدء باستقبال المشاريع
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-bold mb-6 flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal & Account Info */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 mb-4">
                  1. البيانات الشخصية والحساب
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      الاسم الكامل (كما بالبطاقة/النقابة) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="م. أحمد كمال عبد العزيز"
                      value={form.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      رقم الهاتف (واتساب متاح) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01012345678"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eng.ahmed@example.com"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      كلمة المرور *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      تأكيد كلمة المرور *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Engineering Professional Info */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 mb-4">
                  2. التخصص والخبرات المهنية
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      التخصص الهندسي الرئيسي *
                    </label>
                    <select
                      value={form.specialty}
                      onChange={(e) => updateField('specialty', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer font-medium"
                    >
                      {ENGINEERING_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      سعر الساعة الاستشارية (ج.م) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="مثال: 350"
                      value={form.hourlyRate}
                      onChange={(e) => updateField('hourlyRate', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      سنوات الخبرة العملية *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="مثال: 6"
                      value={form.experience}
                      onChange={(e) => updateField('experience', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    المهارات والبرامج الهندسية (مفصولة بفواصل) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: ETABS, SAP2000, AutoCAD, Revit Structure, حساب كميات"
                    value={form.skills}
                    onChange={(e) => updateField('skills', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    النبذة المهنية وخبرات المشاريع *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="تحدث عن كلياتك وتدريبك، المشاريع الكبرى التي أشرفت على تصميمها أو تنفيذها، واشتراطات الجودة التي تلتزم بها..."
                    value={form.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                {/* CV File Upload */}
                <div className="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-center">
                  <Upload className="w-8 h-8 text-brand-blue mx-auto mb-2" />
                  <label className="cursor-pointer block">
                    <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan hover:underline">
                      اضغط هنا لرفع السيرة الذاتية (PDF أو DOCX)
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {form.cvName ? `الملف المحدد: ${form.cvName}` : 'الحد الأقصى للحجم 5 ميجابايت'}
                  </span>
                </div>
              </div>

              {/* Portfolio Projects Section */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    3. نماذج من أعمالك ومشاريعك السابقة
                  </h3>
                  <button
                    type="button"
                    onClick={addProject}
                    className="text-xs font-bold text-brand-blue dark:text-brand-cyan hover:underline flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>إضافة مشروع آخر</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {projects.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 relative"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          مشروع #{idx + 1}
                        </span>
                        {projects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProject(idx)}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="عنوان المشروع (مثال: فيلا سكنية، محطة طاقة...)"
                          value={p.title}
                          onChange={(e) => updateProject(idx, 'title', e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
                        />
                        <input
                          type="url"
                          placeholder="رابط المشروع أو الرندر إن وجد"
                          value={p.link}
                          onChange={(e) => updateProject(idx, 'link', e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
                        />
                      </div>

                      <textarea
                        rows={2}
                        placeholder="نبذة مختصرة عن دورك في المشروع والمخرجات..."
                        value={p.description}
                        onChange={(e) => updateProject(idx, 'description', e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blueHover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-blue/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? 'جاري إرسال الطلب للاعتماد...' : 'إرسال طلب الانضمام للمراجعة الهندسية'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
