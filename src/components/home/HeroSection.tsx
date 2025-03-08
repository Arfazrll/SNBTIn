'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiBookOpen, FiChevronDown } from 'react-icons/fi';

interface AvatarProps {
  gender: string;
  id: number;
}

const HeroSection: React.FC = () => {
  // Add client-side only rendering state
  const [isMounted, setIsMounted] = useState(false);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  // State for button hover effect
  const [isHovered, setIsHovered] = useState(false);
  
  // Fix for white dot in corner
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body::before, body::after, #__next::before, #__next::after {
        display: none !important;
        content: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Client-side mounting effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation when in view
  useEffect(() => {
    if (inView && isMounted) {
      controls.start('visible');
    }
  }, [controls, inView, isMounted]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      transition: { 
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };

  const glowingVariants = {
    initial: { opacity: 0.7 },
    animate: { 
      opacity: [0.7, 1, 0.7],
      transition: { 
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };
  
  // Mouse move effect for image
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setMousePosition({ x, y });
  };

  const scrollToFeatures = (): void => {
    document.getElementById('features-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  // Bouncing arrow animation
  const bounceVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };

  // Generate deterministic particles with fixed positions to avoid hydration mismatch
  const generateParticles = () => {
    // Create a deterministic array of particles with fixed positions
    return Array(30).fill(0).map((_, i) => {
      // Use a deterministic pattern instead of Math.random()
      const xPos = ((i * 17) % 100).toFixed(2);
      const yPos = ((i * 23) % 100).toFixed(2);
      const opacity = (((i * 13) % 50) + 30) / 100;
      const scale = (((i * 7) % 50) + 50) / 100;
      
      // Generate deterministic animation values
      const yDelta = ((i % 10) - 5).toFixed(2);
      const xDelta = ((i % 10) - 5).toFixed(2);
      const duration = 10 + (i % 10);
      
      return { id: i, xPos, yPos, opacity, scale, yDelta, xDelta, duration };
    });
  };
  
  // Create particles once with deterministic values
  const particles = generateParticles();

  // If not mounted on client yet, render a minimal version without animations
  if (!isMounted) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 to-primary-500 dark:from-primary-900 dark:to-primary-700 text-white py-20 lg:py-28">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6 border border-white/10">
                  #1 Platform Persiapan UTBK di Indonesia
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Raih Impian PTN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-200 filter drop-shadow-sm">Bersama UTBK Prep</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-lg">
                Platform belajar online yang dirancang khusus untuk membantu siswa SMA menghadapi UTBK dengan percaya diri dan hasil maksimal.
              </p>
              
              {/* Basic non-animated UI for server render */}
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-2xl">
                  <div className="relative w-full h-full bg-primary-400/10 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 z-10 rounded-xl" />
                    <Image
                      src="/download (5).jpeg"
                      alt="Students studying with UTBK Prep"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full component with animations for client-side only
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 to-primary-500 dark:from-primary-900 dark:to-primary-700 text-white py-20 lg:py-28">
      {/* Enhanced background decorations */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary-400/20 blur-3xl"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary-400/20 blur-3xl"></div>
      
      {/* Deterministic particles with fixed positions */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div 
            key={particle.id}
            initial={{ 
              x: `${particle.xPos}%`, 
              y: `${particle.yPos}%`,
              opacity: particle.opacity,
              scale: particle.scale
            }}
            animate={{ 
              y: [null, `calc(${particle.yPos}% + ${particle.yDelta}%)`],
              x: [null, `calc(${particle.xPos}% + ${particle.xDelta}%)`]
            }}
            transition={{ 
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "mirror" as const
            }}
            className="absolute w-2 h-2 rounded-full bg-white/30"
          ></motion.div>
        ))}
      </div>
      
      {/* Improved grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left column: Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6 border border-white/10 shadow-glow animate-pulse-slow">
                #1 Platform Persiapan UTBK di Indonesia
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Raih Impian PTN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-200 filter drop-shadow-sm">Bersama UTBK Prep</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/90 max-w-lg">
              Platform belajar online yang dirancang khusus untuk membantu siswa SMA menghadapi UTBK dengan percaya diri dan hasil maksimal.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative overflow-hidden rounded-lg"
              >
                <Link href="/kelas-online" legacyBehavior>
                  <a className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-white to-gray-100 text-primary-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 z-10 relative">
                    Mulai Belajar
                    <FiArrowRight className="ml-2" />
                  </a>
                </Link>
                {/* Button shine effect */}
                <motion.div 
                  className="absolute top-0 -left-full w-full h-full bg-white/30 transform-gpu rotate-12 z-0"
                  animate={isHovered ? { left: '100%' } : { left: '-100%' }}
                  transition={{ duration: 0.7 }}
                />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={scrollToFeatures}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-transparent border-2 border-white/70 hover:bg-white/10 transition-all duration-300"
                >
                  <FiBookOpen className="mr-2" />
                  Pelajari Lebih Lanjut
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className="flex items-center space-x-4 pt-4"
            >
              <div className="flex -space-x-2 relative">
               {[
                 { gender: 'men', id: 15 },
                 { gender: 'women', id: 44 },
                 { gender: 'men', id: 32 },
                 { gender: 'women', id: 26 }
                ].map((avatar: AvatarProps, i: number) => (
                <motion.div 
                  key={i} 
                  className="w-10 h-10 rounded-full border-2 border-white bg-primary-300 overflow-hidden shadow-md relative z-10"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 + (i * 0.1), duration: 0.5 }}
                  whileHover={{ y: -5, zIndex: 20, scale: 1.1 }}
                >
                  <Image 
                    src={`https://randomuser.me/api/portraits/${avatar.gender}/${avatar.id}.jpg`} 
                    alt={`Student ${i}`} 
                    width={40} 
                    height={40}
                    className="object-cover"
                  />
                </motion.div>
              ))}
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.9, duration: 0.5 }}
              >
                <p className="text-sm font-medium">Bergabung bersama <span className="relative">
                  <span className="text-yellow-300 font-bold">10,000+ </span>
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300/70"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 2.2, duration: 0.5 }}
                  />
                </span> siswa</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star: number) => (
                    <motion.svg 
                      key={star} 
                      className="w-4 h-4 text-yellow-300 fill-current" 
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.2 + (star * 0.1), duration: 0.3 }}
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </motion.svg>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column: Image with tilt effect */}
          <motion.div
            variants={imageVariants}
            className="relative hidden lg:block"
            ref={imageRef}
            onMouseMove={handleMouseMove}
          >
            <motion.div 
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="relative w-full aspect-square max-w-lg mx-auto"
              style={{ 
                transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
                transition: "transform 0.1s ease-out"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-2xl"
                whileHover={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
              >
                <div className="relative w-full h-full bg-primary-400/10 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 z-10 rounded-xl" />
                  <Image
                    src="/download (5).jpeg"
                    alt="Students studying with UTBK Prep"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Enhanced decorative elements with improved interactions */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -left-10 top-1/4 p-4 bg-white rounded-lg shadow-xl border-l-4 border-primary-500"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "rgb(59, 130, 246)"
                }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FiBookOpen className="text-primary-600" size={20} />
                  </motion.div>
                  <div>
                    <p className="text-xs text-secondary-500">Latihan Soal</p>
                    <p className="text-secondary-900 font-semibold">10.000+ Soal</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -right-10 bottom-1/4 p-4 bg-white rounded-lg shadow-xl border-l-4 border-green-500"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "rgb(34, 197, 94)"
                }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="text-xs text-secondary-500">Tingkat Kelulusan</p>
                    <p className="text-secondary-900 font-semibold">85% Siswa</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Interactive notification element */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="absolute -bottom-5 left-1/4 p-3 bg-white rounded-lg shadow-xl border-l-4 border-yellow-500"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "rgb(234, 179, 8)"
                }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="text-xs text-secondary-500">Try-Out Baru</p>
                    <p className="text-secondary-900 font-semibold">SNBT Kemiripan 98%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        variants={bounceVariants}
        initial="initial"
        animate="animate"
      >
        <button 
          onClick={scrollToFeatures}
          className="flex flex-col items-center text-white/80 hover:text-white"
        >
          <FiChevronDown size={20} />
        </button>
      </motion.div>
      
      {/* Enhanced wave divider with animation */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <motion.path 
              fill="currentColor" 
              fillOpacity="1" 
              className="text-white dark:text-secondary-900"
              d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,96L48,90C96,84,192,72,288,72C384,72,480,84,576,88C672,92,768,88,864,80C960,72,1056,60,1152,60C1248,60,1344,72,1392,78L1440,84L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
            </motion.path>
          </svg>
        </motion.div>
      </div>
      
      {/* Enhanced animated elements for visual interest */}
      <motion.div 
        className="absolute top-20 right-20 w-20 h-20 rounded-full bg-yellow-300/10 blur-xl"
        variants={glowingVariants}
        initial="initial"
        animate="animate"
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-40 left-20 w-16 h-16 rounded-full bg-blue-300/10 blur-xl"
        variants={glowingVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      ></motion.div>
      
      {/* New decorative element */}
      <motion.div 
        className="absolute top-40 left-1/3 w-12 h-12 rounded-full bg-purple-300/10 blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
    </section>
  );
};

export default HeroSection;