import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { FiSearch, FiFilter, FiChevronDown, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { courses } from '../utils/data';

interface Course {
  id: string | number;
  title: string;
  instructor: string;
  category: string;
  level: string;
  rating: number;
  students: number;
  lessons: number;
  duration: string;
  image: string;
}

const KelasOnline: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    setIsClient(true);
    
    // Checking if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  // Handle login button click
  const handleLoginClick = () => {
    router.push('/login');
  };

  // Filter courses based on search and filters
  useEffect(() => {
    const filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter ? course.category === categoryFilter : true;
      const matchesLevel = levelFilter ? course.level === levelFilter : true;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
    
    setFilteredCourses(filtered);
  }, [searchQuery, categoryFilter, levelFilter]);
  
  // Show login page if user is not logged in
  if (!isClient) {
    return null; // Prevent hydration errors by not rendering anything on server
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="text-center mb-8">
          <FiUser size={64} className="mx-auto text-secondary-400" />
          <h2 className="mt-4 text-2xl font-semibold text-secondary-800 dark:text-white">Anda belum login</h2>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">Silakan login untuk melihat profil Anda</p>
          <button
            onClick={handleLoginClick}
            className="mt-6 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }
  
  // Main component when user is logged in
  return (
    <>
      <Head>
        <title>Kelas Online - SNBTIn</title>
      </Head>
      <section className="py-12 bg-primary-50 dark:bg-[#1F2D4C]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-900 dark:text-white">
              Kelas Online SNBTIn
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Pelajari materi SNBT dari pengajar berpengalaman dengan metode pembelajaran yang interaktif.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Search and filter section */}
      <section className="py-8 bg-white dark:bg-secondary-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            {/* Search input */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Cari kelas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-200 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-900 text-secondary-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            {/* Filter buttons */}
            <div className="w-full md:w-auto flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-secondary-200 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-900 text-secondary-800 dark:text-white hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
              >
                <FiFilter className="mr-2" />
                Filter
                <FiChevronDown className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Filter options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg"
            >
              {/* Category filter */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Kategori
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-2 border border-secondary-200 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Semua Kategori</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                  <option value="Penalaran Umum">Penalaran Umum</option>
                </select>
              </div>
              
              {/* Level filter */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Level
                </label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full p-2 border border-secondary-200 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Semua Level</option>
                  <option value="Pemula">Pemula</option>
                  <option value="Menengah">Menengah</option>
                  <option value="Lanjutan">Lanjutan</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Course listing */}
      <section className="py-12 bg-secondary-50 dark:bg-secondary-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-secondary-900 dark:text-white">
            {filteredCourses.length} Kelas Tersedia
          </h2>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image 
                      src={course.image} 
                      alt={course.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <Badge color="primary">{course.category}</Badge>
                      <Badge color="secondary">{course.level}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-secondary-900 dark:text-white">
                      {course.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      {course.instructor}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                        <span>{course.lessons} pelajaran</span>
                        <span className="mx-2">•</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-secondary-700 dark:text-secondary-300">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary-600 dark:text-secondary-400 text-lg">
                Tidak ada kelas yang sesuai dengan filter yang dipilih.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('');
                  setLevelFilter('');
                }}
                className="mt-4 px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default KelasOnline;