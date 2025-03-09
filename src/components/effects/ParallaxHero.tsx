'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';

interface ParallaxHeroProps {
  height?: string;
  children?: React.ReactNode;
}

const ParallaxHero: React.FC<ParallaxHeroProps> = ({ 
  height = "100vh",
  children 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState<Array<{
    id: number;
    size: number;
    x: string;
    y: string;
    opacity: number;
    depth: number;
    speed: number;
  }>>([]);
  
  // Buat bintang dengan nilai deterministik untuk menghindari hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    
    const count = 100;
    const depth = 3;
    
    const newStars = Array.from({ length: count }).map((_, i) => {
      // Gunakan nilai deterministik berdasarkan indeks, bukan Math.random()
      const sizeValue = ((i * 13) % 3) + 1;
      const xPos = `${(i * 17) % 100}%`;
      const yPos = `${(i * 23) % 100}%`;
      const opacityValue = 0.3 + ((i * 7) % 7) / 10;
      const depthValue = (i % depth) + 1;
      const speedValue = depthValue * 30;
      
      return {
        id: i,
        size: sizeValue,
        x: xPos,
        y: yPos,
        opacity: opacityValue,
        depth: depthValue,
        speed: speedValue
      };
    });
    
    setStars(newStars);
  }, []);
  
  if (!isMounted) {
    return (
      <div 
        ref={containerRef}
        className="relative overflow-hidden bg-blue-700" 
        style={{ height }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-600" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          {children}
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden" 
      style={{ height }}
    >
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-600"
        style={{ 
          opacity: 1,
          // Menggunakan nilai statis dulu, kita akan update saat scroll dengan JS
          // alih-alih menggunakan useTransform yang menyebabkan error hooks
        }}
      />
      
      {/* Star field */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: star.x,
              top: star.y,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`
            }}
            // Gunakan animate untuk transformasi tanpa useTransform
            initial={{ y: 0 }}
            animate={{ y: [0, star.speed, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
        ))}
      </div>
      
      {/* Parallax layers - gunakan gambar placeholder */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-1"
        style={{ opacity: 0.4 }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      >
        <div className="w-full h-full bg-blue-800/30"></div>
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 w-full h-full z-2"
        style={{ opacity: 0.6 }}
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
      >
        <div className="w-full h-full bg-blue-700/20"></div>
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 w-full h-full z-3"
        style={{ opacity: 0.3 }}
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "mirror" }}
      >
        {/* Clouds effect */}
        <div className="absolute w-full bottom-0 h-32">
          <svg viewBox="0 0 1440 320" className="w-full h-full">
            <path fill="rgba(255, 255, 255, 0.1)" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,245.3C672,267,768,277,864,266.7C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </motion.div>
      
      {/* Foreground gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-transparent to-transparent z-4" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        {children}
      </div>
      
      {/* Script untuk handle scroll animation tanpa useTransform */}
      {isMounted && (
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('scroll', function() {
              const container = document.getElementById('${containerRef.current?.id || 'parallax-container'}');
              if (!container) return;
              
              const rect = container.getBoundingClientRect();
              const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
              
              // Update opacity based on scroll
              const bgGradient = container.querySelector('.bg-gradient-to-b');
              if (bgGradient) {
                bgGradient.style.opacity = 1 - (scrollProgress * 0.4);
              }
            });
          `
        }} />
      )}
    </div>
  );
};

export default ParallaxHero;