import { useEffect } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export function Modal({ isOpen, onClose, title, description, children, size = 'md' }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={clsx(
          'relative w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 z-10 transition-all text-left animate-in fade-in zoom-in-95 duration-200',
          sizes[size]
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {title && (
          <div className="mb-5 pr-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
            )}
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 'md', className }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  return (
    <div className={clsx('flex items-center justify-center p-4', className)}>
      <div
        className={clsx(
          'border-3 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin',
          sizes[size]
        )}
      />
    </div>
  );
}

export function Skeleton({ className }) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl',
        className
      )}
    />
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40',
        className
      )}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 flex items-center justify-center mb-4 shadow-sm">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function StatsCard({
  title,
  value,
  change,
  changeType = 'increase',
  icon: Icon,
  variant = 'blue',
  subtitle,
}) {
  const iconVariants = {
    blue: 'bg-blue-50 text-brand-blue dark:bg-blue-950/80 dark:text-cyan-400',
    cyan: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/80 dark:text-cyan-300',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/80 dark:text-amber-400',
  };

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </p>
        {(change || subtitle) && (
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            {change && (
              <span
                className={clsx(
                  'font-semibold',
                  changeType === 'increase' ? 'text-emerald-600' : 'text-red-500'
                )}
              >
                {change}
              </span>
            )}
            {subtitle && (
              <span className="text-slate-400 dark:text-slate-500">{subtitle}</span>
            )}
          </div>
        )}
      </div>
      {Icon && (
        <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm', iconVariants[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
