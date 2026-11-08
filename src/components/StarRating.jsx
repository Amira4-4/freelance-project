import { Star } from 'lucide-react';
import { clsx } from 'clsx';

export default function StarRating({
  rating = 0,
  size = 'md',
  showValue = true,
  interactive = false,
  onChange,
}) {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-bold',
    xl: 'text-lg font-bold',
  };

  return (
    <div className="inline-flex items-center gap-1.5 select-none">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.round(rating);
          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(star)}
              className={clsx(
                'transition-all duration-150',
                interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
              )}
            >
              <Star
                className={clsx(
                  sizes[size],
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-100 text-slate-300 dark:fill-slate-800 dark:text-slate-700'
                )}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className={clsx('font-bold text-slate-700 dark:text-slate-300', textSizes[size])}>
          {rating > 0 ? rating.toFixed(1) : 'New'}
        </span>
      )}
    </div>
  );
}
