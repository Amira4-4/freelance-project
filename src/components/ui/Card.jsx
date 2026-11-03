import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export default Card;
