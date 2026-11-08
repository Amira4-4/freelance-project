import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export const Button = forwardRef(function Button(
  {
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    icon: Icon,
    iconPosition = 'start',
    type = 'button',
    ...props
  },
  ref
) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 select-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-brand-blue hover:bg-brand-blueHover text-white focus:ring-brand-blue/40 shadow-sm shadow-blue-500/25 hover:shadow-glow-blue',
    gradient:
      'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-700 text-white focus:ring-cyan-400/40 shadow-md shadow-cyan-500/20 hover:shadow-glow-cyan',
    cyan:
      'bg-cyan-500 hover:bg-cyan-600 text-white focus:ring-cyan-400/40 shadow-sm shadow-cyan-500/20',
    secondary:
      'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900/40 dark:bg-slate-800 dark:hover:bg-slate-700',
    outline:
      'border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-blue-50/50 hover:border-blue-300 dark:hover:bg-slate-800 focus:ring-brand-blue/30 shadow-sm',
    ghost:
      'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-blue-50/60 dark:hover:bg-slate-800/60 focus:ring-slate-300',
    white:
      'bg-white text-brand-blue hover:bg-blue-50 focus:ring-white/40 shadow-md font-bold',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/40 shadow-sm shadow-red-500/20',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500/40 shadow-sm shadow-emerald-500/20',
  };

  const sizes = {
    xs: 'text-xs px-2.5 py-1.5 gap-1.5 rounded-lg',
    sm: 'text-xs px-3.5 py-2 gap-2 rounded-xl font-medium',
    md: 'text-sm px-4.5 py-2.5 gap-2 rounded-xl font-semibold',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-2xl font-bold',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'start' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'end' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
});
