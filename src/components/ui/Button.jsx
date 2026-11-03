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
    'inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-brand-blue text-white hover:bg-brand-blueHover focus:ring-brand-blue/40 shadow-sm shadow-brand-blue/20 hover:shadow-glow',
    secondary:
      'bg-brand-navy text-white hover:bg-brand-navyLight focus:ring-brand-navy/40 dark:bg-slate-800 dark:hover:bg-slate-700',
    accent:
      'bg-brand-cyan text-brand-navy font-semibold hover:bg-brand-cyanHover hover:text-white focus:ring-brand-cyan/40 shadow-sm shadow-brand-cyan/20',
    outline:
      'border border-slate-300 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 focus:ring-brand-blue/30',
    ghost:
      'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:ring-slate-300',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/40 shadow-sm shadow-red-500/20',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500/40 shadow-sm shadow-emerald-500/20',
  };

  const sizes = {
    xs: 'text-xs px-2.5 py-1.5 gap-1.5 rounded-lg',
    sm: 'text-sm px-3.5 py-2 gap-2 rounded-lg',
    md: 'text-sm px-4.5 py-2.5 gap-2.5 rounded-xl font-semibold',
    lg: 'text-base px-6 py-3 gap-3 rounded-xl font-semibold',
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
          <Loader2 className="w-4 h-4 animate-spin" />
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
