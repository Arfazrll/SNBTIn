import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiThumbsUp, FiEye, FiClock, FiTag, FiChevronRight, FiUsers, FiPlus } from 'react-icons/fi';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function ForumDiskusi() {
  const [activeTab, setActiveTab] = useState('terbaru');
  
  // Mock forum data
  const forumTopics = [
    {
      id: 1,
      title: "Cara efektif mempersiapkan TPS UTBK?",
      category: "TPS",
      author: "Ahmad Farhan",
      authorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
      replies: 24,
      views: 356,
      likes: 47,
      lastActivity: "3 jam yang lalu",
      isSolved: true,
      excerpt: "Saya ingin menanyakan tentang strategi belajar yang efektif untuk persiapan TPS UTBK. Bagaimana cara mengatur waktu belajar dan materi apa saja yang harus difokuskan?",
    },
    {
      id: 2,
      title: "Perbedaan antara SNBT dan UTBK?",
      category: "Umum",
      author: "Sinta Dewi",
      authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
      replies: 18,
      views: 289,
      likes: 32,
      lastActivity: "7 jam yang lalu",
      isSolved: false,
      excerpt: "Saya masih bingung tentang perbedaan antara SNBT dan UTBK. Apakah keduanya merupakan hal yang sama atau berbeda? Mohon penjelasannya.",
    },
    {
      id: 3,
      title: "Rumus matematika yang sering keluar di UTBK",
      category: "Matematika",
      author: "Budi Santoso",
      authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
      replies: 32,
      views: 512,
      likes: 78,
      lastActivity: "1 hari yang lalu",
      isSolved: true,
      excerpt: "Halo teman-teman, saya ingin tahu rumus-rumus matematika apa saja yang sering keluar dalam soal UTBK? Fokus pada materi apa yang perlu diprioritaskan?",
    },
    {
      id: 4,
      title: "Bagaimana caranya meningkatkan skor Reading Comprehension?",
      category: "Bahasa Inggris",
      author: "Dina Amelia",
      authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
      replies: 15,
      views: 234,
      likes: 29,
      lastActivity: "2 hari yang lalu",
      isSolved: false,
      excerpt: "Saya kesulitan dalam menjawab soal-soal reading comprehension bahasa Inggris. Ada tips atau trik untuk meningkatkan kemampuan dalam menjawab soal tersebut?",
    },
    {
      id: 5,
      title: "Jadwal UTBK 2023 dan persiapannya",
      category: "Umum",
      author: "Rudi Hermawan",
      authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
      replies: 27,
      views: 412,
      likes: 53,
      lastActivity: "3 hari yang lalu",
      isSolved: true,
      excerpt: "Kapan jadwal UTBK 2023 akan dimulai? Bagaimana tahapan persiapan yang optimal mulai dari sekarang hingga hari H ujian?",
    },
  ];
  
  // Filter topics based on active tab
  const filteredTopics = activeTab === 'terbaru' 
    ? [...forumTopics].sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity))
    : activeTab === 'populer'
      ? [...forumTopics].sort((a, b) => b.likes - a.likes)
      : activeTab === 'belum-terjawab'
        ? forumTopics.filter(topic => !topic.isSolved)
        : forumTopics;
  
  // Top categories
  const topCategories = [
    { name: "TPS", count: 128 },
    { name: "Matematika", count: 98 },
    { name: "Bahasa Indonesia", count: 74 },
    { name: "Bahasa Inggris", count: 67 },
    { name: "Umum", count: 156 },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <>
      <Head>
        <title>Forum Diskusi - UTBK Prep</title>
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
              Forum Diskusi
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Diskusikan pertanyaan seputar UTBK dan dapatkan jawaban dari pengajar dan sesama siswa.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Action bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex space-x-1 border-b border-secondary-200 dark:border-secondary-700">
                  <button
                    onClick={() => setActiveTab('terbaru')}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                      activeTab === 'terbaru' 
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                        : 'border-transparent text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
                    }`}
                  >
                    Terbaru
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('populer')}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                      activeTab === 'populer' 
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                        : 'border-transparent text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
                    }`}
                  >
                    Populer
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('belum-terjawab')}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                      activeTab === 'belum-terjawab' 
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                        : 'border-transparent text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
                    }`}
                  >
                    Belum Terjawab
                  </button>
                </div>
                
                <Button
                  icon={<FiPlus />}
                  iconPosition="left"
                >
                  Buat Topik Baru
                </Button>
              </div>
              
              {/* Topics list */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-4"
              >
                {filteredTopics.map((topic) => (
                  <motion.div
                    key={topic.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-700 shadow-sm hover:shadow transition-all duration-200"
                  >
                    <div className="p-5">
                      <div className="flex items-start">
                        <image
                          src={topic.authorImg}
                          alt={topic.author}
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <Badge variant={topic.category === "TPS" ? "primary" : topic.category === "Matematika" ? "info" : topic.category === "Bahasa Inggris" ? "success" : "secondary"} size="sm">
                              {topic.category}
                            </Badge>
                            
                            {topic.isSolved && (
                              <Badge variant="success" size="sm">Terjawab</Badge>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                            {topic.title}
                          </h3>
                          
                          <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4 line-clamp-2">
                            {topic.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-secondary-500 dark:text-secondary-400">
                            <span className="flex items-center">
                              <FiMessageSquare className="mr-1" /> {topic.replies} balasan
                            </span>
                            <span className="flex items-center">
                              <FiEye className="mr-1" /> {topic.views} dilihat
                            </span>
                            <span className="flex items-center">
                              <FiThumbsUp className="mr-1" /> {topic.likes} suka
                            </span>
                            <span className="flex items-center">
                              <FiClock className="mr-1" /> {topic.lastActivity}
                            </span>
                            <span>oleh <span className="text-primary-600 dark:text-primary-400">{topic.author}</span></span>
                          </div>
                        </div>
                        
                        <button className="ml-2 p-2 text-secondary-400 hover:text-primary-500 dark:text-secondary-500 dark:hover:text-primary-400">
                          <FiChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search */}
              <div className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-4 mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                  Cari Topik
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Kata kunci..."
                    className="w-full p-2 rounded-lg bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-secondary-900 dark:text-white"
                  />
                  <button className="absolute right-2 top-2 text-secondary-400 hover:text-primary-500 dark:text-secondary-500 dark:hover:text-primary-400">
                    <FiMessageSquare size={20} />
                  </button>
                </div>
              </div>
              
              {/* Categories */}
              <div className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-4 mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                  Kategori Populer
                </h3>
                <ul className="space-y-2">
                  {topCategories.map((category) => (
                    <li key={category.name}>
                      <a href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
                        <div className="flex items-center">
                          <FiTag className="mr-2 text-primary-500" />
                          <span className="text-secondary-700 dark:text-secondary-300">{category.name}</span>
                        </div>
                        <span className="text-xs bg-secondary-100 dark:bg-secondary-700 px-2 py-1 rounded-full text-secondary-600 dark:text-secondary-400">
                          {category.count}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Stats */}
              <div className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-4">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                  Statistik Forum
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                      <FiMessageSquare className="mr-2 text-primary-500" />
                      <span>Total Topik</span>
                    </div>
                    <span className="font-semibold text-secondary-900 dark:text-white">2,567</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                      <FiUsers className="mr-2 text-primary-500" />
                      <span>Anggota Aktif</span>
                    </div>
                    <span className="font-semibold text-secondary-900 dark:text-white">1,245</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                      <FiThumbsUp className="mr-2 text-primary-500" />
                      <span>Balasan</span>
                    </div>
                    <span className="font-semibold text-secondary-900 dark:text-white">18,493</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}