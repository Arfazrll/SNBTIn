// src/pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { FiBook, FiCheckSquare, FiAward, FiBriefcase, FiBarChart, FiSettings } from 'react-icons/fi';
import React, { useEffect, useState, ReactNode } from 'react';
import dynamic from 'next/dynamic';


// Components import
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

// Animation components import
import AnimatedWaveBackground from '../components/effects/AnimatedWaveBackground';
import ParticlesBackground from '../components/effects/ParticlesBackground';
import ThreeDModel from '../components/effects/ThreeDModel';
import FloatingElements from '../components/effects/FloatingElements';
import ParallaxHero from '../components/effects/ParallaxHero';

// Hooks and data
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { courses } from '../utils/data';

// Interface untuk stats
interface Stat {
  icon: React.ReactElement;
  number: string;
  label: string;
}


// Interface untuk ClientOnlyMotion
interface ClientOnlyMotionProps {
  children: ReactNode;
}

// Animation types for selector
type AnimationType = 'none' | 'waves' | 'particles' | '3d' | 'floating';

// Client-side only animation wrapper
const ClientOnlyMotion: React.FC<ClientOnlyMotionProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    // Return a placeholder with the same layout structure
    // but without animations to prevent hydration mismatch
    return <div className="opacity-0">{children}</div>;
  }
  
  return <>{children}</>;
};

export default function Home() {
  const { ref: statsRef, controls: statsControls } = useScrollAnimation();
  const { ref: coursesRef, controls: coursesControls } = useScrollAnimation();
  
  // State untuk animasi background
  const [activeAnimation, setActiveAnimation] = useState<AnimationType>('particles');
  // State untuk menampilkan kontrol animasi
  const [showControls, setShowControls] = useState<boolean>(false);

  // Effect untuk menentukan animasi default berdasarkan performa perangkat
  useEffect(() => {
    // Deteksi perangkat dengan performa rendah
    const isLowPerformanceDevice = window.navigator.hardwareConcurrency <= 2;
    
    // Set animasi default berdasarkan performa
    if (isLowPerformanceDevice) {
      setActiveAnimation('none');
    } else {
      // Default animasi untuk perangkat dengan performa baik
      setActiveAnimation('particles');
    }
    
    // Cek parameter URL untuk animation control
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showAnimationControls') === 'true') {
      setShowControls(true);
    }
  }, []);
  
  // Define variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const floatVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    }
  };
  
  // Stats data
  const statsData: Stat[] = [
    { icon: <FiBook size={24} />, number: "10,000+", label: "Soal Latihan" },
    { icon: <FiCheckSquare size={24} />, number: "85%", label: "Tingkat Kelulusan" },
    { icon: <FiAward size={24} />, number: "50+", label: "Pengajar Expert" },
    { icon: <FiBriefcase size={24} />, number: "12,000+", label: "Siswa Aktif" }
  ];
  
  return (
    <>
      <Head>
        <title>UTBK Prep - Platform E-Learning Persiapan UTBK</title>
        <meta name="description" content="Persiapkan UTBK dengan materi berkualitas, latihan soal, dan bimbingan dari pengajar expert" />
      </Head>

      {/* Animation Controls - hanya tampil jika showControls = true */}
      {showControls && (
        <div className="fixed top-24 right-4 z-50 bg-white/10 backdrop-blur-sm p-2 rounded-lg shadow-lg">
          <div className="text-xs text-white mb-2 font-medium">Background Animation</div>
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => setActiveAnimation('waves')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${activeAnimation === 'waves' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              Wave Effect
            </button>
            <button 
              onClick={() => setActiveAnimation('particles')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${activeAnimation === 'particles' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              Interactive Particles
            </button>
            <button 
              onClick={() => setActiveAnimation('3d')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${activeAnimation === '3d' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              3D Elements
            </button>
            <button 
              onClick={() => setActiveAnimation('floating')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${activeAnimation === 'floating' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              Floating Icons
            </button>
            <button 
              onClick={() => setActiveAnimation('none')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${activeAnimation === 'none' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              None
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Background Animations */}
      <ClientOnlyMotion>
        <AnimatePresence mode="wait">
          {activeAnimation === 'waves' && <AnimatedWaveBackground key="waves" />}
          {activeAnimation === 'particles' && <ParticlesBackground key="particles" />}
          {activeAnimation === '3d' && <ThreeDModel key="3d" />}
          {activeAnimation === 'floating' && <FloatingElements key="floating" count={15} icons={true} />}
        </AnimatePresence>
      </ClientOnlyMotion>

      {/* Enhanced Hero Section with Parallax */}
      <ClientOnlyMotion>
        {activeAnimation !== 'none' ? (
          <div className="relative">
            <HeroSection />
            <motion.div 
              className="absolute bottom-10 right-10 z-10 hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <FiSettings className="text-blue-500 text-xl animate-spin-slow" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <HeroSection />
        )}
      </ClientOnlyMotion>
      
      {/* Stats Section with Enhanced Animation */}
      <ClientOnlyMotion>
        <motion.section 
          ref={statsRef}
          initial="hidden"
          animate={statsControls}
          variants={containerVariants}
          className="py-16 bg-white dark:bg-secondary-900 relative overflow-hidden"
        >
          {activeAnimation === 'floating' && <FloatingElements count={8} icons={false} />}
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={floatVariants}
                  className="flex flex-col items-center text-center p-4 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-xl shadow-soft hover-lift"
                  whileHover={{ 
                    y: -5, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  <motion.div 
                    className="mb-3 w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold text-secondary-900 dark:text-white mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-secondary-600 dark:text-secondary-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </ClientOnlyMotion>
      
      <ClientOnlyMotion>
        <FeaturesSection />
      </ClientOnlyMotion>
      
      {/* Featured Courses Section with Enhanced Cards */}
      <ClientOnlyMotion>
        <motion.section
          ref={coursesRef}
          initial="hidden"
          animate={coursesControls}
          variants={containerVariants}
          className="py-20 bg-white dark:bg-secondary-900 relative"
          id="courses-section"
        >
          {activeAnimation === 'waves' && <div className="absolute inset-0 opacity-10"><AnimatedWaveBackground /></div>}
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-4 text-secondary-900 dark:text-white"
              >
                Kelas Unggulan Kami
              </motion.h2>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
                }}
                className="text-lg text-secondary-600 dark:text-secondary-400"
              >
                Pilih kelas yang sesuai dengan kebutuhan belajarmu dan raih impian masuk perguruan tinggi negeri.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  className="card-hover"
                >
                  <Card hover>
                    <div className="relative h-48 rounded-t-lg overflow-hidden -mx-5 -mt-5 group">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill={true}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm text-primary-600 dark:text-primary-400 text-xs font-medium rounded-md shadow-sm">
                          {course.category}
                        </span>
                      </div>
                      
                      <motion.div 
                        className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Link href={`/kelas-online/${course.id}`}>
                          <Button primary fullWidth size="sm">
                            Lihat Detail
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        {course.instructor}
                      </p>
                      
                      <div className="flex items-center mt-2 mb-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star} 
                              className={`w-4 h-4 ${star <= Math.floor(course.rating) ? 'text-yellow-400' : 'text-secondary-300'} fill-current`} 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-secondary-500 dark:text-secondary-400 ml-1">
                          ({course.rating})
                        </span>
                        <span className="text-xs text-secondary-500 dark:text-secondary-400 ml-4">
                          {course.students.toString()} siswa
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400 mt-4 pt-4 border-t border-secondary-100 dark:border-secondary-700">
                        <div className="flex items-center">
                          <FiBarChart className="mr-1" />
                          <span>{course.level}</span>
                        </div>
                        <div>{course.lessons} pelajaran</div>
                        <div>{course.duration}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/kelas-online">
                  <Button primary size="lg" icon={<FiBook />}>
                    Lihat Semua Kelas
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </ClientOnlyMotion>
      
      <ClientOnlyMotion>
        <TestimonialsSection />
      </ClientOnlyMotion>
      
      <ClientOnlyMotion>
        <div className="relative">
          {activeAnimation === 'particles' && (
            <div className="absolute inset-0 opacity-30">
              <ParticlesBackground />
            </div>
          )}
          <CTASection />
        </div>
      </ClientOnlyMotion>

      {/* Add custom animations styles */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .hover-lift {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}