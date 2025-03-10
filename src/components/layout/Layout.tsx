  'use client'; // Keep this if using App Router

  import { useEffect, ReactNode, useState } from 'react';
  import { useRouter } from 'next/router'; // For Pages Router
  // import { usePathname } from 'next/navigation'; // Uncomment for App Router

  interface LayoutProps {
    children: ReactNode;
  }

  const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    // const pathname = usePathname(); // Uncomment for App Router
    const [mounted, setMounted] = useState(false);
    
    // Handle client-side mounting
    useEffect(() => {
      setMounted(true);
      
      // Fix for white dot issue
      const style = document.createElement('style');
      style.textContent = `
        body::before, body::after, #__next::before, #__next::after {
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
        {NavbarComponent && <NavbarComponent />}
        <main className="flex-grow relative">
          {children}
        </main>
        {FooterComponent && <FooterComponent />}
      </div>
    );
  };

  export default Layout;