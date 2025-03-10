'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBookOpen, FiChevronDown } from 'react-icons/fi';
import DynamicHeroBackground from '../effects/DynamicHeroBackground';

interface AvatarProps {
  gender: string;
  id: number;
}

const EnhancedHeroSection: React.FC = () => {

  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  
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

  const scrollToFeatures = (): void => {
    document.getElementById('features-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  
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

  
  if (!isMounted) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 to-primary-500 dark:from-primary-900 dark:to-primary-700 text-white py-20 lg:py-28">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6 border border-white/10">
                  #1 Platform Persiapan SNBT di Indonesia
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Raih Impian PTN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-200 filter drop-shadow-sm">Bersama SNBTIn</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-lg">
                Platform belajar online yang dirancang khusus untuk membantu siswa SMA menghadapi SNBT dengan percaya diri dan hasil maksimal.
              </p>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-2xl">
                  <div className="relative w-full h-full bg-primary-400/10 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 z-10 rounded-xl" />
                    <Image
                      src="/image.png"
                      alt="Students studying with SNBTIn"
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

  
  return (
    <section className="relative overflow-hidden bg-blue-600 text-white py-20 lg:py-32">
      {/* Advanced Dynamic Background */}
      <DynamicHeroBackground intensity="medium" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left column: Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6 border border-white/10 shadow-lg">
                #1 Platform Persiapan SNBT di Indonesia
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Raih Impian PTN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-200 filter drop-shadow-sm">Bersama SNBTIn</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/90 max-w-lg">
              Platform belajar online yang dirancang khusus untuk membantu siswa SMA menghadapi SNBT dengan percaya diri dan hasil maksimal.
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
          >
            <motion.div 
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="relative w-full aspect-square max-w-lg mx-auto"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-2xl"
                whileHover={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
              >
                <div className="relative w-full h-full bg-primary-400/10 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 z-10 rounded-xl" />
                  <Image
                    src="/image.png"
                    alt="Students studying with SNBTIn"
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
              
              {/* Additional info cards */}
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
          <span className="text-sm mb-1">Scroll</span>
          <FiChevronDown size={20} />
        </button>
      </motion.div>
    </section>
  );
};

export default EnhancedHeroSection;