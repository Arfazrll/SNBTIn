// src/components/layout/Footer.tsx
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiYoutube, FiTwitter, FiFacebook, FiChevronUp } from 'react-icons/fi';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 transition-colors duration-300">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">UTBK Prep</h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Platform e-learning untuk persiapan UTBK bagi siswa SMA yang ingin melanjutkan ke perguruan tinggi negeri.
            </p>
            <div className="flex space-x-4 pt-4">
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-secondary-400 hover:text-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-secondary-400 hover:text-primary-500 transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-secondary-400 hover:text-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-secondary-400 hover:text-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Beranda
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/kelas-online" legacyBehavior>
                  <a className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Kelas Online
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/materi" legacyBehavior>
                  <a className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Materi
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/forum-diskusi" legacyBehavior>
                  <a className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Forum Diskusi
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profil" legacyBehavior>
                  <a className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Profil
                  </a>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMail className="text-primary-500 mt-1 mr-3" />
                <a href="mailto:info@utbkprep.id" className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  info@utbkprep.id
                </a>
              </li>
              <li className="flex items-start">
                <FiPhone className="text-primary-500 mt-1 mr-3" />
                <a href="tel:+628123456789" className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  +62 812-3456-789
                </a>
              </li>
              <li className="flex items-start">
                <FiMapPin className="text-primary-500 mt-1 mr-3" />
                <span className="text-secondary-600 dark:text-secondary-400">
                  Jl. Bandung bubat no 28
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">Berlangganan</h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Dapatkan tips dan informasi terbaru tentang persiapan UTBK.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-4 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                >
                  Kirim
                </button>
              </div>
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-green-500"
                >
                  Terima kasih telah berlangganan!
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-secondary-200 dark:border-secondary-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-600 dark:text-secondary-400 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} UTBK Prep. Hak Cipta Dilindungi.
          </p>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 items-center">
            <Link href="/syarat-ketentuan" legacyBehavior>
              <a className="text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                Syarat & Ketentuan
              </a>
            </Link>
            <Link href="/kebijakan-privasi" legacyBehavior>
              <a className="text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                Kebijakan Privasi
              </a>
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
              aria-label="Scroll to top"
            >
              <FiChevronUp className="text-secondary-600 dark:text-secondary-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;