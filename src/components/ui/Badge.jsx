// src/components/ui/Badge.jsx
const Badge = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
  }) => {
    // Define variant styles
    const variantStyles = {
      primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
      secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-700 dark:text-secondary-300',
      success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    };
  
    // Define size styles
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-base',
    };
  
    // Combined classes
    const badgeClasses = `
      inline-flex items-center justify-center 
      rounded-full font-medium
      ${variantStyles[variant]} 
      ${sizeStyles[size]}
      ${className}
    `;
  
    return (
      <span className={badgeClasses} {...props}>
        {children}
      </span>
    );
  };
  
  export default Badge;
  