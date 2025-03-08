// src/pages/index.jsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiBook, FiCheckSquare, FiAward, FiBriefcase, FiBarChart } from 'react-icons/fi';
import { useEffect, useState } from 'react';

// Components import
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

// Hooks and data
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { courses } from '../utils/data';

// Client-side only animation wrapper
const ClientOnlyMotion = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  
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
  
  return (
    <>
      <Head>
        <title>UTBK Prep - Platform E-Learning Persiapan UTBK</title>
        <meta name="description" content="Persiapkan UTBK dengan materi berkualitas, latihan soal, dan bimbingan dari pengajar expert" />
      </Head>

      <ClientOnlyMotion>
        <HeroSection />
      </ClientOnlyMotion>
      
      {/* Stats Section */}
      <ClientOnlyMotion>
        <motion.section 
          ref={statsRef}
          initial="hidden"
          animate={statsControls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="py-16 bg-white dark:bg-secondary-900"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <FiBook size={24} />, number: "10,000+", label: "Soal Latihan" },
                { icon: <FiCheckSquare size={24} />, number: "85%", label: "Tingkat Kelulusan" },
                { icon: <FiAward size={24} />, number: "50+", label: "Pengajar Expert" },
                { icon: <FiBriefcase size={24} />, number: "12,000+", label: "Siswa Aktif" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className="mb-3 w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-secondary-900 dark:text-white mb-1">{stat.number}</h3>
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
      
      {/* Featured Courses Section */}
      <ClientOnlyMotion>
        <motion.section
          ref={coursesRef}
          initial="hidden"
          animate={coursesControls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }} 
          className="py-20 bg-white dark:bg-secondary-900"
          id="courses-section"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
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
                  className="card-hover"
                >
                  <Card hover>
                    <div className="relative h-48 rounded-t-lg overflow-hidden -mx-5 -mt-5">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill={true}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-white dark:bg-secondary-800 text-primary-600 dark:text-primary-400 text-xs font-medium rounded">
                          {course.category}
                        </span>
                      </div>
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
              <Link href="/kelas-online">
                <Button primary size="lg" icon={<FiBook />}>
                  Lihat Semua Kelas
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </ClientOnlyMotion>
      
      <ClientOnlyMotion>
        <TestimonialsSection />
      </ClientOnlyMotion>
      
      <ClientOnlyMotion>
        <CTASection />
      </ClientOnlyMotion>
    </>
  );
}