import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({
  children,
  variant = 'blue',
  size = 'md',
  dot = false,
  className,
  ...props
}) {
  const variants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/60',
    navy: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
    red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800/60',
    purple: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
  };

  const dotColors = {
    blue: 'bg-blue-500',
    cyan: 'bg-cyan-500',
    navy: 'bg-slate-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5 rounded-md font-medium',
    md: 'text-xs px-2.5 py-1 rounded-lg font-medium',
    lg: 'text-sm px-3 py-1.5 rounded-lg font-semibold',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 border leading-none',
          variants[variant],
          sizes[size],
          className
        )
      )}
      {...props}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      <span>{children}</span>
    </span>
  );
}

export function Avatar({
  src,
  name = 'User',
  size = 'md',
  status,
  className,
  ...props
}) {
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-14 h-14 text-lg font-bold',
    xl: 'w-20 h-20 text-2xl font-bold',
  };

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={clsx('relative inline-block shrink-0', className)} {...props}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={twMerge(
            clsx(
              'rounded-full object-cover border border-slate-200 dark:border-slate-700',
              sizes[size]
            )
          )}
        />
      ) : (
        <div
          className={twMerge(
            clsx(
              'rounded-full flex items-center justify-center bg-gradient-to-br from-brand-blue to-brand-navy text-white shadow-sm',
              sizes[size]
            )
          )}
        >
          {initials || '?'}
        </div>
      )}
      {status && (
        <span
          className={clsx(
            'absolute bottom-0 left-0 block rounded-full ring-2 ring-white dark:ring-slate-900',
            size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3',
            status === 'online' && 'bg-emerald-500',
            status === 'busy' && 'bg-amber-500',
            status === 'offline' && 'bg-slate-400'
          )}
        />
      )}
    </div>
  );
}

export function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-card transition-all duration-200',
          hover && 'hover:shadow-card-hover hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
