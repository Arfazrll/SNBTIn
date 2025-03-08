// src/pages/_app.js
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  // Google Analytics page view tracking dengan error handling
  useEffect(() => {
    const handleRouteChange = (url) => {
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
    <ThemeProvider attribute="class" defaultTheme="light">
      <Layout>
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;