// src/components/home/FeaturesSection.tsx
import { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeatureCard from './FeatureCard';

// Define proper types for features data based on FeatureCard props
interface Feature {
  id: number;
  icon: 'book' | 'video' | 'target' | 'users' | 'activity' | 'award' | 'clock' | 'zap' | 'layers';
  title: string;
  description: string;
  colorClass: 'primary' | 'blue' | 'green' | 'purple' | 'red' | 'orange';
}

const FeaturesSection: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Animation when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Features data
  const features: Feature[] = [
    {
      id: 1,
      icon: 'book',
      title: 'Materi Lengkap',
      description: 'Materi pembelajaran yang komprehensif mencakup semua mata pelajaran UTBK.',
      colorClass: 'primary'
    },
    {
      id: 2,
      icon: 'video',
      title: 'Video Interaktif',
      description: 'Pembelajaran melalui video yang interaktif dan mudah dipahami.',
      colorClass: 'red'
    },
    {
      id: 3,
      icon: 'target',
      title: 'Latihan Soal',
      description: 'Ribuan latihan soal dengan pembahasan untuk meningkatkan kemampuanmu.',
      colorClass: 'green'
    },
    {
      id: 4,
      icon: 'users',
      title: 'Forum Diskusi',
      description: 'Diskusikan pertanyaan dan dapatkan jawaban dari pengajar dan sesama siswa.',
      colorClass: 'purple'
    },
    {
      id: 5,
      icon: 'activity',
      title: 'Analisis Kemampuan',
      description: 'Pantau perkembangan belajarmu dengan analisis performa yang detail.',
      colorClass: 'blue'
    },
    {
      id: 6,
      icon: 'award',
      title: 'Tryout Berkala',
      description: 'Simulasi UTBK secara berkala untuk mengukur kesiapanmu menghadapi ujian.',
      colorClass: 'orange'
    }
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features-section" className="py-20 bg-secondary-50 dark:bg-secondary-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-900 dark:text-white">
            Kenapa Memilih UTBK Prep?
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-400">
            Kami menyediakan semua kebutuhan belajarmu untuk persiapan UTBK yang lebih efektif dan menyenangkan.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div key={feature.id} variants={itemVariants}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                colorClass={feature.colorClass}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;