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
  Briefcase, 
  ShieldCheck, 
  ChevronDown,
  Sparkles,
  ArrowRight
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
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800'
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group text-left">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center">
                <span>Mahandes</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Pro</span>
              </div>
              <p className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 tracking-wider uppercase -mt-0.5">
                Engineering Network
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/')
                  ? 'text-brand-blue dark:text-cyan-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-cyan-400'
              }`}
            >
              Home
            </Link>
            <Link
              to="/engineers"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/engineers')
                  ? 'text-brand-blue dark:text-cyan-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-cyan-400'
              }`}
            >
              Explore Engineers
            </Link>
            <Link
              to="/projects"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/projects')
                  ? 'text-brand-blue dark:text-cyan-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-cyan-400'
              }`}
            >
              Browse Projects
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-cyan-400 transition-colors duration-200"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-cyan-400 transition-colors duration-200"
            >
              AI Features
            </a>
          </nav>

          {/* Actions & User State */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Notifications Dropdown (Authenticated) */}
            {isAuthenticated && (
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setNotifDropdownOpen((prev) => !prev)}
                  className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Panel */}
                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 text-left animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        Notifications & Alerts
                      </span>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs text-brand-blue dark:text-cyan-400 hover:underline font-semibold"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-80 overflow-y-auto mt-2">
                      {notifications.length === 0 ? (
                        <p className="py-6 text-center text-xs text-slate-400">No new notifications</p>
                      ) : (
                        notifications.slice(0, 6).map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => handleNotifClick(notif)}
                            className={`py-3 px-2 rounded-xl transition-colors cursor-pointer ${
                              notif.read
                                ? 'opacity-70 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                                : 'bg-cyan-50/50 dark:bg-cyan-950/30 hover:bg-cyan-50 dark:hover:bg-cyan-950/50'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {!notif.read && (
                                <span className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className="text-xs font-bold text-slate-900 dark:text-white">
                                  {notif.title}
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                                  {notif.message}
                                </p>
                                <span className="text-[10px] text-slate-400 mt-1 block">
                                  {new Date(notif.createdAt).toLocaleDateString('en-US', {
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
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-blue dark:hover:text-cyan-400 px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-700 px-5 py-2.5 rounded-xl shadow-sm shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Authenticated User Menu */}
            {isAuthenticated && (
              <div className="relative" ref={userRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    {(user?.fullName || user?.name || user?.username || 'U').charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
                    {user?.fullName || user?.name || user?.username}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 text-left animate-in fade-in duration-150">
                    <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {user?.fullName || user?.name || user?.username}
                      </p>
                      <p className="text-[11px] text-cyan-600 dark:text-cyan-400 capitalize mt-0.5 font-medium">
                        {role === 'client' && 'Client Account'}
                        {role === 'engineer' && 'Engineer Profile'}
                        {role === 'admin' && 'Administrator'}
                      </p>
                    </div>

                    <div className="py-1 text-xs">
                      {role === 'client' && (
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Briefcase className="w-4 h-4 text-brand-blue" />
                          <span>Client Dashboard</span>
                        </Link>
                      )}
                      {role === 'engineer' && (
                        <>
                          <Link
                            to={`/engineer/${user.id}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                          >
                            <User className="w-4 h-4 text-cyan-500" />
                            <span>My Profile</span>
                          </Link>
                          <Link
                            to="/projects"
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                          >
                            <Briefcase className="w-4 h-4 text-brand-blue" />
                            <span>Browse Projects</span>
                          </Link>
                        </>
                      )}
                      {role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <ShieldCheck className="w-4 h-4 text-brand-blue" />
                          <span>Admin Portal</span>
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
                        <span>Sign Out</span>
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
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 text-left">
          <Link
            to="/"
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            to="/engineers"
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Explore Engineers
          </Link>
          <Link
            to="/projects"
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Browse Projects
          </Link>
          <a
            href="#how-it-works"
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            How It Works
          </a>

          {!isAuthenticated ? (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-sm"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full text-center py-2.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 text-sm font-bold"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
