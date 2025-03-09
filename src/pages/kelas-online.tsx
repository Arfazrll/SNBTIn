import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants from framer-motion
import { FiSearch, FiFilter, FiChevronDown, FiBarChart, FiClock, FiBook } from 'react-icons/fi';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { courses } from '../utils/data';
import Image from 'next/image';

// Define TypeScript interfaces
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
  
  // Get unique categories and levels
  const categories: string[] = Array.from(new Set(courses.map(course => course.category)));
  const levels: string[] = Array.from(new Set(courses.map(course => course.level)));
  
  // Filter courses when search query or filters change
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
  
  // Clear all filters
  const clearFilters = (): void => {
    setSearchQuery('');
    setCategoryFilter('');
    setLevelFilter('');
  };
  
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <>
      <Head>
        <title>Kelas Online - UTBK Prep</title>
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
              Kelas Online UTBKIn
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Pelajari materi UTBK dari pengajar berpengalaman dengan metode pembelajaran yang interaktif.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-secondary-400 dark:text-secondary-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kelas..."
                  className="pl-10 pr-4 py-3 w-full rounded-lg bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 rounded-lg bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 flex items-center justify-center space-x-2 w-full md:w-auto"
              >
                <FiFilter />
                <span>Filter</span>
                <FiChevronDown className={`transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Expanded filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-300 dark:border-secondary-700 p-4 mb-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category filter */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Kategori
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Semua Kategori</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Level filter */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Tingkat
                    </label>
                    <select
                      value={levelFilter}
                      onChange={(e) => setLevelFilter(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Semua Tingkat</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Clear filters */}
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                    >
                      Hapus Filter
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Results count */}
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              Menampilkan {filteredCourses.length} dari {courses.length} kelas
            </div>
          </div>
          
          {/* Courses grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <Card hover className="h-full flex flex-col">
                    <div className="relative h-48 rounded-t-lg overflow-hidden -mx-5 -mt-5">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" size="sm">
                          {course.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex-grow">
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
                          {course.students.toLocaleString()} siswa
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400 mt-4 pt-4 border-t border-secondary-100 dark:border-secondary-700">
                      <div className="flex items-center">
                        <FiBarChart className="mr-1" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center">
                        <FiBook className="mr-1" />
                        <span>{course.lessons} pelajaran</span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                  Tidak ada kelas yang ditemukan
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Silakan coba dengan kata kunci pencarian atau filter yang berbeda
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Hapus Filter
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default KelasOnline;