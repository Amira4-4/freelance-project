import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Bell, 
  User, 
  LogOut, 
  PlusCircle, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  Check, 
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../services/storage';

export default function Navbar() {
  const { user, role, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNotifDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Track scroll for sticky backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (user?.id || role === 'admin') {
      const list = getNotifications(user?.id || 'admin');
      setNotifications(list);
    }
  }, [user, role, notifDropdownOpen]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNotifClick = (notif) => {
    markNotificationRead(notif.id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead(user?.id || 'admin');
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-brand-navyDark/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800'
          : 'bg-white/80 dark:bg-brand-navyDark/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-brand-navy dark:text-white tracking-tight flex items-center">
                <span>مهندس</span>
                <span className="text-brand-blue dark:text-brand-cyan">Pro</span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase -mt-1">
                منصة المهندسين المحترفين
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/')
                  ? 'text-brand-blue dark:text-brand-cyan'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-cyan'
              }`}
            >
              الرئيسية
            </Link>
            <Link
              to="/engineers"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/engineers')
                  ? 'text-brand-blue dark:text-brand-cyan'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-cyan'
              }`}
            >
              استكشف المهندسين
            </Link>
            <Link
              to="/projects"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/projects')
                  ? 'text-brand-blue dark:text-brand-cyan'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-cyan'
              }`}
            >
              تصفح المشاريع
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-cyan transition-colors duration-200"
            >
              كيف تعمل المنصة
            </a>
            <a
              href="#features"
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-cyan transition-colors duration-200"
            >
              المميزات
            </a>
          </nav>

          {/* Actions & User State */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="تبديل الوضع الليلي والنهاري"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-brand-navy" />}
            </button>

            {/* Notifications Dropdown (Authenticated) */}
            {isAuthenticated && (
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setNotifDropdownOpen((prev) => !prev)}
                  className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                  aria-label="الإشعارات"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Panel */}
                {notifDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 text-right animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        الإشعارات والتنبيهات
                      </span>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs text-brand-blue dark:text-brand-cyan hover:underline font-medium"
                        >
                          تحديد الكل كمقروء
                        </button>
                      )}
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-80 overflow-y-auto mt-2">
                      {notifications.length === 0 ? (
                        <p className="py-6 text-center text-xs text-slate-400">لا توجد إشعارات حالياً</p>
                      ) : (
                        notifications.slice(0, 6).map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => handleNotifClick(notif)}
                            className={`py-3 px-2 rounded-xl transition-colors cursor-pointer ${
                              notif.read
                                ? 'opacity-70 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                                : 'bg-blue-50/60 dark:bg-blue-950/30 hover:bg-blue-50 dark:hover:bg-blue-950/50'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {!notif.read && (
                                <span className="w-2 h-2 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className="text-xs font-bold text-slate-900 dark:text-white">
                                  {notif.title}
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                                  {notif.message}
                                </p>
                                <span className="text-[10px] text-slate-400 mt-1 block">
                                  {new Date(notif.createdAt).toLocaleDateString('ar-EG', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Guest Action Buttons */}
            {!isAuthenticated && (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-blue dark:hover:text-brand-cyan px-3 py-2 transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blueHover px-4.5 py-2.5 rounded-xl shadow-sm shadow-brand-blue/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  انضم إلينا الآن
                </Link>
              </div>
            )}

            {/* Authenticated User Menu */}
            {isAuthenticated && (
              <div className="relative" ref={userRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
                    {user?.fullName || user?.name || user?.username}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-brand-navy text-white text-xs font-bold flex items-center justify-center">
                    {(user?.fullName || user?.name || user?.username || 'U').charAt(0)}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 text-right animate-in fade-in duration-150">
                    <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {user?.fullName || user?.name || user?.username}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {role === 'client' && 'حساب عميل'}
                        {role === 'engineer' && 'حساب مهندس'}
                        {role === 'admin' && 'لوحة الإدارة'}
                      </p>
                    </div>

                    <div className="py-1 text-xs">
                      {role === 'client' && (
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Briefcase className="w-4 h-4 text-brand-blue" />
                          <span>لوحة تحكم العميل</span>
                        </Link>
                      )}
                      {role === 'engineer' && (
                        <>
                          <Link
                            to={`/engineer/${user.id}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                          >
                            <User className="w-4 h-4 text-brand-blue" />
                            <span>ملفي الشخصي</span>
                          </Link>
                          <Link
                            to="/projects"
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                          >
                            <Briefcase className="w-4 h-4 text-emerald-500" />
                            <span>المشاريع المتاحة</span>
                          </Link>
                        </>
                      )}
                      {role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <ShieldCheck className="w-4 h-4 text-brand-blue" />
                          <span>لوحة الإدارة</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>تسجيل الخروج</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 text-right">
          <Link
            to="/"
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            الرئيسية
          </Link>
          <Link
            to="/engineers"
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            استكشف المهندسين
          </Link>
          <Link
            to="/projects"
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            تصفح المشاريع
          </Link>
          <a
            href="#how-it-works"
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            كيف تعمل المنصة
          </a>

          {!isAuthenticated ? (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-white"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-2.5 rounded-xl bg-brand-blue text-white text-sm font-bold shadow-sm"
              >
                إنشاء حساب جديد
              </Link>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full text-center py-2.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 text-sm font-bold"
              >
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
