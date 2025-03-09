import Link from 'next/link';
import { useState, FormEvent, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiYoutube, FiTwitter, FiFacebook, FiChevronUp } from 'react-icons/fi';

const socialLinks = [
  { icon: FiInstagram, label: 'Instagram', href: '#' },
  { icon: FiYoutube, label: 'YouTube', href: '#' },
  { icon: FiTwitter, label: 'Twitter', href: '#' },
  { icon: FiFacebook, label: 'Facebook', href: '#' },
];

const navigationLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Kelas Online', href: '/kelas-online' },
  { label: 'Materi', href: '/materi' },
  { label: 'Forum Diskusi', href: '/forum-diskusi' },
  { label: 'Profil Developer', href: '/profil' },
];

const contactInfo = [
  { icon: FiMail, label: 'info@snbtin.id', href: 'mailto:info@snbtin.id' },
  { icon: FiPhone, label: '+62 812-3456-789', href: 'tel:+628123456789' },
  { icon: FiMapPin, label: 'Jl. Telekomunikasi No. 1, Bandung' },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  }, [email]);

  return (
    <footer className="bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 transition-colors duration-300">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white">SNBTIn</h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Platform e-learning untuk persiapan SNBT bagi siswa SMA yang ingin melanjutkan ke perguruan tinggi negeri.
            </p>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a key={label} href={href} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="text-secondary-400 hover:text-primary-500 transition-colors" aria-label={label}>
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Navigasi</h3>
            <ul className="space-y-2">
              {navigationLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Kontak</h3>
            <ul className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start">
                  <Icon className="text-primary-500 mt-1 mr-3" />
                  {href ? (
                    <a href={href} className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 transition-colors">
                      {label}
                    </a>
                  ) : (
                    <span className="text-secondary-600 dark:text-secondary-400">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {}
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={itemVariants}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white">
                Berlangganan
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Dapatkan tips dan informasi terbaru tentang persiapan SNBT.
              </p>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3 relative">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full px-4 py-2 rounded-lg 
                      bg-secondary-100 dark:bg-secondary-800 
                      focus:ring-2 focus:ring-primary-500 
                      text-secondary-900 dark:text-secondary-200
                      transition-colors
                    "
                    required
                  />
                  <button
                    type="submit"
                    className="
                      absolute right-1 top-1 bottom-1 px-4 
                      bg-primary-500 text-white rounded-md 
                      hover:bg-primary-600 transition-colors
                    "
                  >
                    Kirim
                  </button>
                </div>

                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-500"
                  >
                    Terima kasih telah berlangganan!
                  </motion.p>
                )}
              </form>
          </motion.div>

        </div>

        {}
        <div className="mt-16 pt-8 border-t border-secondary-200 dark:border-secondary-800 flex flex-col md:flex-row justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="
              w-10 h-10 flex items-center justify-center 
              rounded-full bg-secondary-100 dark:bg-secondary-800 
              hover:bg-secondary-200 dark:hover:bg-secondary-700 
              transition-colors
            "
            aria-label="Scroll to top"
            >
            <FiChevronUp className="text-secondary-600 dark:text-secondary-400" />
          </motion.button>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
