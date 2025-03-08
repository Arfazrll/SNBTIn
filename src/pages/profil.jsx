// src/pages/profil.js
import Head from 'next/head';
import { motion } from 'framer-motion';
import TeamSection from '../components/profile/TeamSection';

export default function Profil() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Head>
        <title>Profil Tim - UTBK Prep</title>
      </Head>
      
      <section className="py-12 bg-primary-50 dark:bg-primary-900/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-900 dark:text-white">
              Profil Tim UTBK Prep
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Kenali tim kami yang berkomitmen untuk membantu siswa Indonesia mencapai impian kuliah mereka.
            </p>
          </motion.div>
        </div>
      </section>
      
      <TeamSection />
      
      <section className="py-16 bg-primary-50 dark:bg-primary-900/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
                Tentang UTBK Prep
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                Kami adalah tim yang berdedikasi untuk membantu siswa Indonesia mempersiapkan diri menghadapi UTBK dengan materi berkualitas.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants} className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">
                  Visi Kami
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Menjadi platform e-learning terdepan yang membantu siswa Indonesia mencapai impian mereka untuk berkuliah di perguruan tinggi negeri terbaik.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">
                  Misi Kami
                </h3>
                <ul className="list-disc pl-5 text-secondary-600 dark:text-secondary-400 space-y-2">
                  <li>Menyediakan materi pembelajaran UTBK yang komprehensif dan mudah dipahami.</li>
                  <li>Mengembangkan metode belajar yang interaktif dan menyenangkan.</li>
                  <li>Membangun komunitas belajar yang supportif antar siswa SMA seluruh Indonesia.</li>
                  <li>Memberikan akses pendidikan berkualitas dengan harga terjangkau.</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}