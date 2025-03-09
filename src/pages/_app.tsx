// src/pages/_app.tsx
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

// Memperluas tipe Window untuk menambahkan gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
  }
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const [domLoaded, setDomLoaded] = useState(false);

  // Ensure we only render animations on the client
  useEffect(() => {
    setDomLoaded(true);
    
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

  // Google Analytics page view tracking dengan error handling
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      try {
        // Periksa apakah gtag tersedia
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('config', 'G-XXXXXXXX', {
            page_path: url,
          });
        }
      } catch (error) {
        console.error('Analytics error:', error);
      }
    };

    // Event listener untuk route change
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Cleanup listener saat component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Layout>
        {domLoaded && (
          <AnimatePresence mode="wait" initial={true} onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo(0, 0);
            }
          }}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;