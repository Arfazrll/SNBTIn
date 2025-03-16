'use client'; // Keep this if using App Router

import { useEffect, ReactNode, useState, useRef } from 'react';
import { useRouter } from 'next/router'; // For Pages Router
// import { usePathname } from 'next/navigation'; // Uncomment for App Router

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  // const pathname = usePathname(); // Uncomment for App Router
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  
  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    
    // Fix for white dot issue
    const style = document.createElement('style');
    style.textContent = `
      body::before, body::after, #_next::before, #_next::after {
        display: none !important;
        content: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [router.pathname]); // or [pathname] for App Router

  // Add scroll detection for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine scroll direction and toggle navbar visibility
      if (currentScrollY < 50) {
        // Always show navbar at the top of the page
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide navbar
        setNavbarVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show navbar
        setNavbarVisible(true);
      }
      
      // Update last scroll position
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Create animated stars
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.querySelector('.stars-container');
      if (!starsContainer) return;
      
      const numberOfStars = 150;
      
      // Clear existing stars
      while (starsContainer.firstChild) {
        starsContainer.removeChild(starsContainer.firstChild);
      }
      
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('stars');
        
        // Randomly make some stars larger
        if (Math.random() > 0.8) {
          star.classList.add('large');
        }
        
        // Random position
        const posX = Math.floor(Math.random() * window.innerWidth);
        const posY = Math.floor(Math.random() * window.innerHeight);
        
        star.style.left = '${posX}px';
        star.style.top = '${posY}px';
        
        // Random animation delay
        star.style.animationDelay = '${Math.random() * 4}s';
        
        starsContainer.appendChild(star);
      }
    };
    
    if (mounted) {
      createStars();
      window.addEventListener('resize', createStars);
    }
    
    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, [mounted]);

  // Import Navbar and Footer dynamically to avoid hydration issues
  const [NavbarComponent, setNavbarComponent] = useState<React.ComponentType | null>(null);
  const [FooterComponent, setFooterComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadComponents = async () => {
      try {
        // Dynamic imports
        const NavbarModule = await import('./Navbar');
        const FooterModule = await import('./Footer');
        
        setNavbarComponent(() => NavbarModule.default);
        setFooterComponent(() => FooterModule.default);
      } catch (error) {
        console.error('Error loading components:', error);
      }
    };
    
    loadComponents();
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-secondary-900"></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-300 overflow-x-hidden">
      {/* Background Elements */}
      <div className="stars-container">
        {/* Stars will be added via JavaScript */}
      </div>
      
      <div className="nebula-container">
        <div className="nebula nebula1"></div>
        <div className="nebula nebula2"></div>
        <div className="nebula nebula3"></div>
        
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>
      
      {/* Header with visibility based on scroll direction */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          navbarVisible ? 'translate-y-0' : '-translate-y-full'
        } ${scrolled ? 'scrolled' : ''}`}
      >
        {NavbarComponent && <NavbarComponent />}
        {/* Navbar separator */}
        <div className="navbar-separator"></div>
      </header>
      
      <main className="flex-grow relative pt-16"> {/* Add padding-top to prevent content from being hidden under navbar */}
        {children}
      </main>
      
      {FooterComponent && <FooterComponent />}
    </div>
  );
};

export default Layout;