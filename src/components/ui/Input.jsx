import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    icon: Icon,
    iconPosition = 'start',
    className,
    id,
    disabled = false,
    ...props
  },
  ref
) {
  const inputId = id || props.name || Math.random().toString(36).slice(2, 8);

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-xl">
        {Icon && (
          <div
            className={clsx(
              'absolute inset-y-0 flex items-center pointer-events-none text-slate-400 dark:text-slate-500',
              iconPosition === 'start' ? 'left-3.5' : 'right-3.5'
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={twMerge(
            clsx(
              'w-full bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
              'border rounded-xl text-sm transition-all duration-200 outline-none shadow-sm',
              'focus:ring-2 focus:ring-cyan-500/30 focus:border-brand-blue dark:focus:border-cyan-400',
              error
                ? 'border-red-500 focus:ring-red-400/30 focus:border-red-500'
                : 'border-slate-200 dark:border-slate-700/80',
              disabled && 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800',
              Icon && iconPosition === 'start' ? 'pl-10 pr-3.5 py-2.5' : '',
              Icon && iconPosition === 'end' ? 'pr-10 pl-3.5 py-2.5' : '',
              !Icon ? 'px-3.5 py-2.5' : '',
              className
            )
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
          <span>{error}</span>
        </p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  {
    label,
    error,
    helperText,
    className,
    id,
    rows = 4,
    disabled = false,
    ...props
  },
  ref
) {
  const inputId = id || props.name || Math.random().toString(36).slice(2, 8);

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={twMerge(
          clsx(
            'w-full bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'border rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 outline-none resize-y shadow-sm',
            'focus:ring-2 focus:ring-cyan-500/30 focus:border-brand-blue dark:focus:border-cyan-400',
            error
              ? 'border-red-500 focus:ring-red-400/30 focus:border-red-500'
              : 'border-slate-200 dark:border-slate-700/80',
            disabled && 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800',
            className
          )
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
});

export const Select = forwardRef(function Select(
  {
    label,
    error,
    helperText,
    options = [],
    placeholder = 'Select...',
    className,
    id,
    disabled = false,
    children,
    ...props
  },
  ref
) {
  const inputId = id || props.name || Math.random().toString(36).slice(2, 8);

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        id={inputId}
        ref={ref}
        disabled={disabled}
        className={twMerge(
          clsx(
            'w-full bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100',
            'border rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 outline-none shadow-sm',
            'focus:ring-2 focus:ring-cyan-500/30 focus:border-brand-blue dark:focus:border-cyan-400',
            error
              ? 'border-red-500 focus:ring-red-400/30 focus:border-red-500'
              : 'border-slate-200 dark:border-slate-700/80',
            disabled && 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800',
            className
          )
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
        {children}
      </select>
      {error && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
});
