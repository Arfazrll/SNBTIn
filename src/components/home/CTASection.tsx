import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
      <div className="container mx-auto px-4">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Siap Untuk Memulai Perjalanan UTBK-mu?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            Bergabunglah dengan ribuan siswa lainnya dan mulai persiapkan masa depanmu sekarang!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/kelas-online" legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-primary-700 font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Daftar Sekarang
                <FiArrowRight className="ml-2" />
              </motion.a>
            </Link>
          </motion.div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white opacity-5"></div>
          <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-white opacity-5"></div>
          <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-white opacity-5"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;