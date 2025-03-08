import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Define proper TypeScript interfaces
interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  [key: string]: any; // For any other props
}

// Define loading spinner as a separate component
const LoadingSpinner: React.FC = () => (
  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon = null,
  iconPosition = 'right',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  ...props
}) => {
  // Define variant styles based on type
  const variantStyles: Record<string, string> = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-secondary-200 hover:bg-secondary-300 text-secondary-800 dark:bg-secondary-700 dark:hover:bg-secondary-600 dark:text-white',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20',
    ghost: 'bg-transparent hover:bg-secondary-100 text-secondary-700 dark:hover:bg-secondary-800 dark:text-secondary-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  // Define size styles
  const sizeStyles: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  // Combined classes
  const buttonClasses = `
    inline-flex items-center justify-center 
    rounded-lg font-medium transition-all duration-200
    ${variantStyles[variant]} 
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  // Animation variants
  const buttonAnimations = !disabled && !isLoading ? {
    whileHover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    whileTap: { 
      scale: 0.98 
    }
  } : {};

  // Render content with icon
  const renderContent = () => (
    <>
      {isLoading && <LoadingSpinner />}
      {icon && iconPosition === 'left' && !isLoading && <span className="mr-2">{icon}</span>}
      <span className="relative">
        {children}
        {variant === 'primary' && !disabled && !isLoading && (
          <span className="absolute left-0 bottom-0 w-full h-full bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        )}
      </span>
      {icon && iconPosition === 'right' && !isLoading && <span className="ml-2">{icon}</span>}
    </>
  );

  // If href is provided, render button as a Next.js Link
  if (href) {
    // Use a simpler approach for links to avoid issues
    return (
      <Link href={href} passHref>
        <motion.a
          className={`group ${buttonClasses}`}
          {...buttonAnimations}
          onClick={onClick}
          {...props}
        >
          {renderContent()}
        </motion.a>
      </Link>
    );
  }

  // Otherwise, render as button
  return (
    <motion.button
      className={`group ${buttonClasses}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...buttonAnimations}
      {...props}
    >
      {renderContent()}
    </motion.button>
  );
};

export default Button;