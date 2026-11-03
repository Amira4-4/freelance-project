import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export default Avatar;
