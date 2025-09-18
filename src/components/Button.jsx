function Button({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyle =
    'rounded-lg border text-sm font-medium font-inherit cursor-pointer transition-colors duration-200';

  const styles = {
    default:
      'bg-[var(--surface-contrast)] text-[var(--text)] border-transparent hover:border-[var(--accent)]',
    primary:
      'bg-[var(--accent)] text-white border-transparent hover:bg-[var(--accent-hover)]',
    secondary:
      'bg-[var(--surface-contrast)] text-[var(--text)] border-[var(--surface)] hover:bg-[var(--surface-hover)]',
    outline:
      'bg-transparent text-[var(--accent)] border-[var(--accent)] hover:bg-[var(--surface)]',
    ghost:
      'bg-transparent text-[var(--subtext)] border-transparent hover:text-[var(--accent)]',

    icon: 'p-2 rounded-lg border border-transparent bg-transparent hover:bg-[var(--surface-hover)]',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <button
      className={`${baseStyle} ${styles[variant]} ${
        variant === 'icon' ? '' : sizes[size]
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
