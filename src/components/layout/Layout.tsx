import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-300">
      {/* Fix untuk titik putih */}
      <div className="dot-fix"></div>

      {/* Background animation with CSS only */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary-500/10 dark:bg-primary-600/10 rounded-full filter blur-5xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-500/10 dark:bg-blue-600/10 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-1/4 h-1/4 bg-purple-500/10 dark:bg-purple-600/10 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={router.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-grow"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;