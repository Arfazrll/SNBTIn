// src/components/home/CTASection.jsx (or .tsx)
'use client'; // Tambahkan jika menggunakan App Router

import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
      <div className="container mx-auto px-4">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Untuk Memulai Perjalanan UTBK-mu?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan siswa lainnya dan mulai persiapkan masa depanmu sekarang!
          </p>
          
          <div>
            <Link href="/kelas-online" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-primary-700 font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-300">
              Daftar Sekarang
              <span className="ml-2">→</span>
            </Link>
          </div>
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