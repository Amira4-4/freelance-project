import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({
  children,
  variant = 'cyan',
  size = 'md',
  dot = false,
  className,
  ...props
}) {
  const variants = {
    cyan: 'bg-cyan-50 text-cyan-800 border-cyan-200/80 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/60',
    blue: 'bg-blue-50 text-blue-800 border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
    sky: 'bg-sky-50 text-sky-800 border-sky-200/80 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800/60',
    navy: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
    amber: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
    red: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800/60',
  };

  const dotColors = {
    cyan: 'bg-cyan-500',
    blue: 'bg-blue-500',
    sky: 'bg-sky-500',
    navy: 'bg-slate-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md font-medium',
    md: 'text-xs px-2.5 py-1 rounded-lg font-semibold',
    lg: 'text-sm px-3 py-1.5 rounded-xl font-bold',
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
