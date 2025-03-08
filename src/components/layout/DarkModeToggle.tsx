// src/components/layout/DarkModeToggle.jsx
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10"></div>; // Placeholder to prevent layout shift
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const variants = {
    light: { rotate: 0 },
    dark: { rotate: 180 }
  };

  return (
    <motion.button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative w-10 h-10 rounded-full flex items-center justify-center bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors duration-200"
      onClick={toggleTheme}
      animate={theme === 'dark' ? 'dark' : 'light'}
      variants={variants}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <div className="absolute">
        <motion.div
          initial={false}
          animate={{ opacity: theme === 'dark' ? 0 : 1, scale: theme === 'dark' ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <FiSun className="text-yellow-500" size={20} />
        </motion.div>
      </div>
      <div className="absolute">
        <motion.div
          initial={false}
          animate={{ opacity: theme === 'dark' ? 1 : 0, scale: theme === 'dark' ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <FiMoon className="text-sky-300" size={20} />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default DarkModeToggle;