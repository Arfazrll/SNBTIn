import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick = null,
  ...props
}) => {
  // Define padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };

  // Combined classes
  const cardClasses = `
    bg-white dark:bg-secondary-800 
    rounded-xl border border-secondary-200 dark:border-secondary-700
    ${hover ? 'hover:shadow-md' : 'shadow-sm'} 
    transition-all duration-200
    ${paddingStyles[padding]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <motion.div
      className={cardClasses}
      whileHover={hover ? { y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
