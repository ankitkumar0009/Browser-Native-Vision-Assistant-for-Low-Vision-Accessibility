import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
    
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] disabled:opacity-50 disabled:pointer-events-none rounded-[var(--radius)] shadow-[0_8px_20px_rgba(15,23,42,0.08)]';
    
    const variants = {
      primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-110 hover:shadow-[0_12px_24px_rgba(79,70,229,0.25)]',
      secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-white/80 border border-white/30 backdrop-blur-md',
      destructive: 'bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:opacity-90',
      outline: 'border-2 border-[var(--primary)]/70 text-[var(--foreground)] bg-white/20 backdrop-blur-md hover:bg-[var(--secondary)]',
    };

    const sizes = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-14 px-6 text-lg',
      lg: 'h-16 px-8 text-xl',
      icon: 'h-14 w-14',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {icon && <span className={children ? 'mr-3' : ''}>{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
