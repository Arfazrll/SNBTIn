// src/components/ui/Alert.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { FiInfo, FiCheckCircle, FiAlertTriangle, FiAlertOctagon, FiX } from 'react-icons/fi';
import { IconType } from 'react-icons';

// Definisikan interface untuk props Alert
interface AlertProps {
  children: ReactNode;
  title?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  [key: string]: any; // Untuk properti tambahan yang tidak terdefinisi
}

// Definisikan interface untuk konfigurasi varian
interface VariantConfig {
  icon: IconType;
  styles: string;
  iconClass: string;
}

// Definisikan interface untuk objek variantConfig
interface VariantConfigMap {
  [key: string]: VariantConfig;
}

const Alert: React.FC<AlertProps> = ({
  children,
  title,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Define variant styles and icons
  const variantConfig: VariantConfigMap = {
    info: {
      icon: FiInfo,
      styles: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      iconClass: 'text-blue-500 dark:text-blue-400',
    },
    success: {
      icon: FiCheckCircle,
      styles: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      iconClass: 'text-green-500 dark:text-green-400',
    },
    warning: {
      icon: FiAlertTriangle,
      styles: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      iconClass: 'text-yellow-500 dark:text-yellow-400',
    },
    error: {
      icon: FiAlertOctagon,
      styles: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      iconClass: 'text-red-500 dark:text-red-400',
    },
  };

  const { icon: IconComponent, styles, iconClass } = variantConfig[variant] || variantConfig.info;

  const handleDismiss = (): void => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  // Animation variants
  const alertVariants = {
    hidden: { opacity: 0, y: -10, height: 0, marginBottom: 0 },
    visible: { opacity: 1, y: 0, height: 'auto', marginBottom: '1rem' },
    exit: { opacity: 0, y: -10, height: 0, marginBottom: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={alertVariants}
          transition={{ duration: 0.2 }}
          className={`
            rounded-lg p-4 mb-4
            ${styles} 
            ${className}
          `}
          {...props}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <IconComponent className={`h-5 w-5 ${iconClass}`} />
            </div>
            <div className="ml-3 flex-grow">
              {title && <h3 className="text-sm font-medium">{title}</h3>}
              <div className={`text-sm ${title ? 'mt-2' : ''}`}>{children}</div>
            </div>
            {dismissible && (
              <div className="ml-auto pl-3">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600 dark:focus:ring-offset-blue-900 dark:focus:ring-blue-500"
                >
                  <span className="sr-only">Dismiss</span>
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;