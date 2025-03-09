import { motion } from 'framer-motion';
import React, { ReactNode, MouseEvent } from 'react';

// Definisikan tipe untuk padding
type PaddingSize = 'none' | 'sm' | 'md' | 'lg';

// Interface untuk props Card
interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: PaddingSize;
  hover?: boolean;
  onClick?: ((event: MouseEvent<HTMLDivElement>) => void) | null;
  [key: string]: any; // Untuk properti tambahan
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick = null,
  ...props
}) => {
  // Define padding styles
  const paddingStyles: Record<PaddingSize, string> = {
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
      onClick={onClick || undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;