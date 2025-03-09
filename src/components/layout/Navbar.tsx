// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiBook, FiChevronDown } from 'react-icons/fi';
import DarkModeToggle from './DarkModeToggle';
import Image from 'next/image';

// Define User interface
interface User {
  name: string;
  email: string;
  avatar?: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();
  
  // Menu items
  const menuItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Kelas Online', path: '/kelas-online' },
    { name: 'Materi', path: '/materi' },
    { name: 'Forum Diskusi', path: '/forum-diskusi' },
    { name: 'Profil', path: '/profil' },
  ];

  // Check if user is logged in on component mount and listen for login/logout events
  useEffect(() => {
    const checkUserLogin = () => {
      // Check for user in localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData) as User;
          setUser(parsedUser);
          setIsLoggedIn(true);
        } catch (e) {
          console.error('Error parsing user data', e);
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    
    // Check on component mount
    checkUserLogin();
    
    // Listen for login/logout events
    window.addEventListener('userLogin', checkUserLogin);
    window.addEventListener('userLogout', checkUserLogin);
    
    return () => {
      window.removeEventListener('userLogin', checkUserLogin);
      window.removeEventListener('userLogout', checkUserLogin);
    };
  }, []);

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
      setShowProfileMenu(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Handle logout
  const handleLogout = () => {
    // Clear user data from storage
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    
    // Reset state
    setUser(null);
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    
    // Trigger a custom event to notify other components about logout
    const logoutEvent = new Event('userLogout');
    window.dispatchEvent(logoutEvent);
    
    // Redirect to home page
    router.push('/');
  };

  // Toggle profile dropdown menu
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass shadow-soft py-2' 
          : 'bg-white/90 dark:bg-secondary-900/90 backdrop-blur-sm py-4'
      }`}
    >
      {/* Div untuk menutupi titik putih di pojok kiri atas */}
      <div className="dot-fix"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-2xl font-bold text-gradient">
                  UTBK
                </span>
                <span className="text-2xl font-bold text-secondary-800 dark:text-white">
                  In
                </span>
              </motion.div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link key={item.path} href={item.path} legacyBehavior>
                <a className="nav-link">
                  <motion.span
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className={`${
                      router.pathname === item.path 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : ''
                    }`}
                  >
                    {item.name}
                  </motion.span>
                </a>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            
            {isLoggedIn && user ? (
              <div className="hidden md:block relative">
                <motion.div 
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={toggleProfileMenu}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                    {user.avatar ? (
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image 
                          src={user.avatar} 
                          alt={user.name} 
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-white text-sm font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-secondary-800 dark:text-white">
                      {user.name || 'User'}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate max-w-[120px]">
                      {user.email || ''}
                    </p>
                  </div>
                  <FiChevronDown className={`transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
                </motion.div>
                
                {/* Profile dropdown menu */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-lg shadow-soft py-1 z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href="/profil" legacyBehavior>
                        <a className="flex items-center space-x-2 px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700">
                          <FiUser size={16} />
                          <span>Profil Saya</span>
                        </a>
                      </Link>
                      <Link href="/pengaturan" legacyBehavior>
                        <a className="flex items-center space-x-2 px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700">
                          <FiSettings size={16} />
                          <span>Pengaturan</span>
                        </a>
                      </Link>
                      <Link href="/progress" legacyBehavior>
                        <a className="flex items-center space-x-2 px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700">
                          <FiBook size={16} />
                          <span>Progress Belajar</span>
                        </a>
                      </Link>
                      <div className="border-t border-secondary-200 dark:border-secondary-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-secondary-100 dark:hover:bg-secondary-700"
                      >
                        <FiLogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex btn-primary items-center space-x-2 rounded-full"
                onClick={() => router.push('/login')}
              >
                <FiUser className="text-white" />
                <span>Login</span>
              </motion.button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link href={item.path} legacyBehavior>
                      <a className={`block px-4 py-2 rounded-lg hover-lift hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors ${
                        router.pathname === item.path 
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' 
                          : 'text-secondary-700 dark:text-secondary-300'
                      }`}>
                        {item.name}
                      </a>
                    </Link>
                  </motion.div>
                ))}

                {isLoggedIn && user ? (
                  <>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: menuItems.length * 0.1, duration: 0.3 }}
                    >
                      <Link href="/profil" legacyBehavior>
                        <a className="flex items-center px-4 py-2 rounded-lg hover-lift hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors text-secondary-700 dark:text-secondary-300">
                          <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate max-w-[200px]">
                              {user.email}
                            </p>
                          </div>
                        </a>
                      </Link>
                    </motion.div>
                    
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: (menuItems.length + 1) * 0.1, duration: 0.3 }}
                    >
                      <Link href="/pengaturan" legacyBehavior>
                        <a className="flex items-center px-4 py-2 rounded-lg hover-lift hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors text-secondary-700 dark:text-secondary-300">
                          <FiSettings className="mr-3" size={18} />
                          <span>Pengaturan</span>
                        </a>
                      </Link>
                    </motion.div>
                    
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: (menuItems.length + 2) * 0.1, duration: 0.3 }}
                    >
                      <Link href="/progress" legacyBehavior>
                        <a className="flex items-center px-4 py-2 rounded-lg hover-lift hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors text-secondary-700 dark:text-secondary-300">
                          <FiBook className="mr-3" size={18} />
                          <span>Progress Belajar</span>
                        </a>
                      </Link>
                    </motion.div>
                    
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: (menuItems.length + 3) * 0.1, duration: 0.3 }}
                      className="px-4 pt-2"
                    >
                      <button 
                        onClick={handleLogout}
                        className="btn-outline-danger w-full py-2 rounded-lg flex items-center justify-center"
                      >
                        <FiLogOut className="mr-2" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: menuItems.length * 0.1, duration: 0.3 }}
                    className="px-4 pt-2"
                  >
                    <button 
                      onClick={() => router.push('/login')}
                      className="btn-primary w-full py-2 rounded-lg flex items-center justify-center"
                    >
                      <FiUser className="mr-2" />
                      <span>Login</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;