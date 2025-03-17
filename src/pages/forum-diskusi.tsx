import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { FiMessageSquare, FiThumbsUp, FiEye, FiClock, FiTag, FiChevronRight, FiUsers, FiPlus, FiUser } from 'react-icons/fi';
=======
import { FiMessageSquare, FiThumbsUp, FiEye, FiClock, FiTag, FiChevronRight, FiUsers, FiPlus, FiMessageCircle } from 'react-icons/fi';
>>>>>>> Stashed changes
=======
import { FiMessageSquare, FiThumbsUp, FiEye, FiClock, FiTag, FiChevronRight, FiUsers, FiPlus, FiMessageCircle } from 'react-icons/fi';
>>>>>>> Stashed changes
=======
import { FiMessageSquare, FiThumbsUp, FiEye, FiClock, FiTag, FiChevronRight, FiUsers, FiPlus, FiMessageCircle } from 'react-icons/fi';
>>>>>>> Stashed changes
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/router'; 
import dynamic from 'next/dynamic';

// Import LiveChat dengan dynamic import untuk menghindari SSR
const LiveChat = dynamic(() => import('../components/ui/LiveChat'), { 
  ssr: false,
  loading: () => null
});

interface ForumTopic {
  id: number;
  title: string;
  category: string;
  author: string;
  authorImg: string;
  replies: number;
  views: number;
  likes: number;
  lastActivity: string;
  isSolved: boolean;
  excerpt: string;
}

interface Category {
  name: string;
  count: number;
}

export default function ForumDiskusi() {
  const [activeTab, setActiveTab] = useState<'terbaru' | 'populer' | 'belum-terjawab'>('terbaru');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('Umum');
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>([]);
  const [currentUser, setCurrentUser] = useState({
    id: 999, // Gunakan ID pengguna yang sebenarnya
    name: 'Pengguna Aktif',
    image: ''
  });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======

  // Set isMounted setelah komponen di-mount untuk menghindari error hydration
  useEffect(() => {
    setIsMounted(true);
    
    // Initialize forum topics with predefined data
    const initialTopics: ForumTopic[] = [
      {
        id: 1,
        title: "Cara efektif mempersiapkan TPS SNBT?",
        category: "TPS",
        author: "Ahmad Farhan",
        authorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
        replies: 24,
        views: 356,
        likes: 47,
        lastActivity: "3 jam yang lalu",
        isSolved: true,
        excerpt: "Saya ingin menanyakan tentang strategi belajar yang efektif untuk persiapan TPS SNBT. Bagaimana cara mengatur waktu belajar dan materi apa saja yang harus difokuskan?",
      },
      {
        id: 2,
        title: "Bagaimana cara menyelesaikan soal limit fungsi trigonometri ini?",
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
        title: "Rumus matematika yang sering keluar di SNBT",
        category: "Matematika",
        author: "Budi Santoso",
        authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
        replies: 32,
        views: 512,
        likes: 78,
        lastActivity: "1 hari yang lalu",
        isSolved: true,
        excerpt: "Halo teman-teman, saya ingin tahu rumus-rumus matematika apa saja yang sering keluar dalam soal SNBT? Fokus pada materi apa yang perlu diprioritaskan?",
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
        title: "Jadwal SNBT 2023 dan persiapannya",
        category: "Umum",
        author: "Rudi Hermawan",
        authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
        replies: 27,
        views: 412,
        likes: 53,
        lastActivity: "3 hari yang lalu",
        isSolved: true,
        excerpt: "Kapan jadwal SNBT 2023 akan dimulai? Bagaimana tahapan persiapan yang optimal mulai dari sekarang hingga hari H ujian?",
      },
    ];
    
    setForumTopics(initialTopics);
    
    // Fetch random user untuk gambar profil
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setCurrentUser(prev => ({
            ...prev,
            image: data.results[0]?.picture?.thumbnail || '',
            name: `${data.results[0]?.name?.first || ''} ${data.results[0]?.name?.last || 'Pengguna'}`
          }));
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    
    fetchProfileImage();
  }, []);
  
  // Function to handle creating a new topic
  const handleCreateTopic = () => {
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return;
    
    const newTopic: ForumTopic = {
      id: forumTopics.length + 1,
      title: newTopicTitle,
      category: newTopicCategory,
      author: currentUser.name,
      authorImg: currentUser.image || "",
      replies: 0,
      views: 1,
      likes: 0,
      lastActivity: "Baru saja",
      isSolved: false,
      excerpt: newTopicContent.length > 150 ? newTopicContent.substring(0, 147) + "..." : newTopicContent,
    };
    
    // Add new topic to the top of the list
    setForumTopics([newTopic, ...forumTopics]);
    
    // Reset form fields and close modal
    setNewTopicTitle('');
    setNewTopicContent('');
    setNewTopicCategory('Umum');
    setIsTopicModalOpen(false);
  };
>>>>>>> Stashed changes

  // Set isMounted setelah komponen di-mount untuk menghindari error hydration
  useEffect(() => {
    setIsMounted(true);
    
    // Initialize forum topics with predefined data
    const initialTopics: ForumTopic[] = [
      {
        id: 1,
        title: "Cara efektif mempersiapkan TPS SNBT?",
        category: "TPS",
        author: "Ahmad Farhan",
        authorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
        replies: 24,
        views: 356,
        likes: 47,
        lastActivity: "3 jam yang lalu",
        isSolved: true,
        excerpt: "Saya ingin menanyakan tentang strategi belajar yang efektif untuk persiapan TPS SNBT. Bagaimana cara mengatur waktu belajar dan materi apa saja yang harus difokuskan?",
      },
      {
        id: 2,
        title: "Bagaimana cara menyelesaikan soal limit fungsi trigonometri ini?",
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
        title: "Rumus matematika yang sering keluar di SNBT",
        category: "Matematika",
        author: "Budi Santoso",
        authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
        replies: 32,
        views: 512,
        likes: 78,
        lastActivity: "1 hari yang lalu",
        isSolved: true,
        excerpt: "Halo teman-teman, saya ingin tahu rumus-rumus matematika apa saja yang sering keluar dalam soal SNBT? Fokus pada materi apa yang perlu diprioritaskan?",
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
        title: "Jadwal SNBT 2023 dan persiapannya",
        category: "Umum",
        author: "Rudi Hermawan",
        authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
        replies: 27,
        views: 412,
        likes: 53,
        lastActivity: "3 hari yang lalu",
        isSolved: true,
        excerpt: "Kapan jadwal SNBT 2023 akan dimulai? Bagaimana tahapan persiapan yang optimal mulai dari sekarang hingga hari H ujian?",
      },
    ];
    
    setForumTopics(initialTopics);
    
    // Fetch random user untuk gambar profil
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setCurrentUser(prev => ({
            ...prev,
            image: data.results[0]?.picture?.thumbnail || '',
            name: `${data.results[0]?.name?.first || ''} ${data.results[0]?.name?.last || 'Pengguna'}`
          }));
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    
    fetchProfileImage();
  }, []);
  
  // Function to handle creating a new topic
  const handleCreateTopic = () => {
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return;
    
    const newTopic: ForumTopic = {
      id: forumTopics.length + 1,
      title: newTopicTitle,
      category: newTopicCategory,
      author: currentUser.name,
      authorImg: currentUser.image || "",
      replies: 0,
      views: 1,
      likes: 0,
      lastActivity: "Baru saja",
      isSolved: false,
      excerpt: newTopicContent.length > 150 ? newTopicContent.substring(0, 147) + "..." : newTopicContent,
    };
    
    // Add new topic to the top of the list
    setForumTopics([newTopic, ...forumTopics]);
    
    // Reset form fields and close modal
    setNewTopicTitle('');
    setNewTopicContent('');
    setNewTopicCategory('Umum');
    setIsTopicModalOpen(false);
  };
>>>>>>> Stashed changes

  // Set isMounted setelah komponen di-mount untuk menghindari error hydration
  useEffect(() => {
    setIsMounted(true);
    
    // Initialize forum topics with predefined data
    const initialTopics: ForumTopic[] = [
      {
        id: 1,
        title: "Cara efektif mempersiapkan TPS SNBT?",
        category: "TPS",
        author: "Ahmad Farhan",
        authorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
        replies: 24,
        views: 356,
        likes: 47,
        lastActivity: "3 jam yang lalu",
        isSolved: true,
        excerpt: "Saya ingin menanyakan tentang strategi belajar yang efektif untuk persiapan TPS SNBT. Bagaimana cara mengatur waktu belajar dan materi apa saja yang harus difokuskan?",
      },
      {
        id: 2,
        title: "Bagaimana cara menyelesaikan soal limit fungsi trigonometri ini?",
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
        title: "Rumus matematika yang sering keluar di SNBT",
        category: "Matematika",
        author: "Budi Santoso",
        authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
        replies: 32,
        views: 512,
        likes: 78,
        lastActivity: "1 hari yang lalu",
        isSolved: true,
        excerpt: "Halo teman-teman, saya ingin tahu rumus-rumus matematika apa saja yang sering keluar dalam soal SNBT? Fokus pada materi apa yang perlu diprioritaskan?",
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
        title: "Jadwal SNBT 2023 dan persiapannya",
        category: "Umum",
        author: "Rudi Hermawan",
        authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
        replies: 27,
        views: 412,
        likes: 53,
        lastActivity: "3 hari yang lalu",
        isSolved: true,
        excerpt: "Kapan jadwal SNBT 2023 akan dimulai? Bagaimana tahapan persiapan yang optimal mulai dari sekarang hingga hari H ujian?",
      },
    ];
    
    setForumTopics(initialTopics);
    
    // Fetch random user untuk gambar profil
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setCurrentUser(prev => ({
            ...prev,
            image: data.results[0]?.picture?.thumbnail || '',
            name: `${data.results[0]?.name?.first || ''} ${data.results[0]?.name?.last || 'Pengguna'}`
          }));
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    
    fetchProfileImage();
  }, []);
  
  // Function to handle creating a new topic
  const handleCreateTopic = () => {
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return;
    
    const newTopic: ForumTopic = {
      id: forumTopics.length + 1,
      title: newTopicTitle,
      category: newTopicCategory,
      author: currentUser.name,
      authorImg: currentUser.image || "",
      replies: 0,
      views: 1,
      likes: 0,
      lastActivity: "Baru saja",
      isSolved: false,
      excerpt: newTopicContent.length > 150 ? newTopicContent.substring(0, 147) + "..." : newTopicContent,
    };
    
    // Add new topic to the top of the list
    setForumTopics([newTopic, ...forumTopics]);
    
    // Reset form fields and close modal
    setNewTopicTitle('');
    setNewTopicContent('');
    setNewTopicCategory('Umum');
    setIsTopicModalOpen(false);
  };
>>>>>>> Stashed changes

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleForumClick = (id: number) => {
    router.push(`/forum-diskusi-detail?id=${id}`);
  };
<<<<<<< Updated upstream

    useEffect(() => {
      setIsClient(true);
      
      // Memeriksa apakah user sudah login
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
=======
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  
  const openTopicModal = () => {
    setIsTopicModalOpen(true);
  };
  
  const closeTopicModal = () => {
    setIsTopicModalOpen(false);
  };
  

  
  // Fungsi helper untuk perbandingan tanggal (untuk menghindari operasi aritmatika pada Date)
  const compareDates = (dateStringA: string, dateStringB: string): number => {
    // Implementasi sederhana - dalam kasus nyata, Anda mungkin perlu parser yang lebih kompleks
    // Untuk demo, kita akan mengembalikan nilai -1, 0, atau 1
    if (dateStringA < dateStringB) return -1;
    if (dateStringA > dateStringB) return 1;
    return 0;
  };

  // Filter topics based on active tab
  const filteredTopics = activeTab === 'terbaru' 
    ? [...forumTopics].sort((a, b) => -compareDates(a.lastActivity, b.lastActivity))
    : activeTab === 'populer'
      ? [...forumTopics].sort((a, b) => b.likes - a.likes)
      : activeTab === 'belum-terjawab'
        ? forumTopics.filter(topic => !topic.isSolved)
        : forumTopics;
  
  // Top categories
  const topCategories: Category[] = [
    { name: "TPS", count: 128 },
    { name: "Matematika", count: 98 },
    { name: "Bahasa Indonesia", count: 74 },
    { name: "Bahasa Inggris", count: 67 },
    { name: "Umum", count: 156 },
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
        <title>Forum Diskusi - SNBTIn</title>
      </Head>
      
      <section className="py-12 bg-primary-50 dark:bg-[#1F2D4C]" >
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
              Diskusikan pertanyaan seputar SNBT dan dapatkan jawaban dari pengajar dan sesama siswa.
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
                
                <div className="flex space-x-2">
                  {/* Live Chat Button */}
                  {isMounted && (
                    <button 
                      onClick={toggleChat}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <FiMessageCircle className="mr-2" />
                      {isChatOpen ? 'Tutup Live Chat' : 'Live Chat'}
                    </button>
                  )}
                  
                  <Button
                    icon={<FiPlus />}
                    iconPosition="left"
                    onClick={openTopicModal}
                  >
                    Buat Topik Baru
                  </Button>
                </div>
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
                        <div className="w-10 h-10 relative rounded-full mr-4 overflow-hidden">
                          <Image
                            src={topic.authorImg}
                            alt={topic.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
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
                        
                        <button className="ml-2 p-2 text-secondary-400 hover:text-primary-500 dark:text-secondary-500 dark:hover:text-primary-400"  onClick={() => handleForumClick(topic.id)} >
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
      
      {/* Live Chat Component */}
      {/* Create New Topic Modal */}
      {isTopicModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">Buat Topik Baru</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="topicTitle" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Judul Topik
                </label>
                <input
                  id="topicTitle"
                  type="text"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="Tuliskan judul topik yang ingin dibahas..."
                  className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="topicCategory" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Kategori
                </label>
                <select
                  id="topicCategory"
                  value={newTopicCategory}
                  onChange={(e) => setNewTopicCategory(e.target.value)}
                  className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Umum">Umum</option>
                  <option value="TPS">TPS</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="topicContent" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Konten
                </label>
                <textarea
                  id="topicContent"
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                  placeholder="Jelaskan pertanyaan atau topik yang ingin didiskusikan..."
                  rows={6}
                  className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-y"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closeTopicModal}
                className="px-4 py-2 border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
              >
                Batal
              </button>
              
              <button
                onClick={handleCreateTopic}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                disabled={!newTopicTitle.trim() || !newTopicContent.trim()}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Live Chat Component */}
      {isMounted && isChatOpen && (
        <LiveChat
          topicId={1}
          userId={currentUser.id}
          userName={currentUser.name}
          userImage={currentUser.image}
          isMinimized={!isChatOpen}
          onToggleMinimize={toggleChat}
        />
      )}
    </>
  );
}