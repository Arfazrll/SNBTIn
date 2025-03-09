import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiEdit2, FiSave } from 'react-icons/fi';
import Image from 'next/image';

// Interface untuk data pengguna
interface User {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  birthdate?: string;
  address?: string;
  school?: string;
  joinDate?: string;
  lastActive?: string;
  completedCourses?: number;
  activeCourses?: number;
  points?: number;
  level?: string;
}

const UserProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    // Ambil data pengguna dari localStorage
    const fetchUserData = () => {
      setIsLoading(true);
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser) as User;
          
          // Menambahkan data dummy jika beberapa field tidak ada
          const enhancedUser = {
            ...parsedUser,
            phone: parsedUser.phone || '+62 812-3456-7890',
            birthdate: parsedUser.birthdate || '1998-04-15',
            address: parsedUser.address || 'Jl. Sudirman No. 123, Jakarta',
            school: parsedUser.school || 'SMA Negeri 1 Jakarta',
            joinDate: parsedUser.joinDate || '2022-09-10',
            lastActive: parsedUser.lastActive || new Date().toISOString().split('T')[0],
            completedCourses: parsedUser.completedCourses || 12,
            activeCourses: parsedUser.activeCourses || 3,
            points: parsedUser.points || 2450,
            level: parsedUser.level || 'Gold'
          };
          
          setUser(enhancedUser);
          setEditedUser(enhancedUser);
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
      
      setIsLoading(false);
    };
    
    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    if (isEditing && editedUser) {
      // Simpan perubahan
      localStorage.setItem('user', JSON.stringify(editedUser));
      setUser(editedUser);
      
      // Trigger event untuk memberitahu komponen lain (seperti Navbar)
      const updateEvent = new Event('userLogin');
      window.dispatchEvent(updateEvent);
    }
    
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [name]: value
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="animate-pulse text-primary-600 dark:text-primary-400">
          <p className="text-xl font-semibold">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="text-center mb-8">
          <FiUser size={64} className="mx-auto text-secondary-400" />
          <h2 className="mt-4 text-2xl font-semibold text-secondary-800 dark:text-white">Anda belum login</h2>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">Silakan login untuk melihat profil Anda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-secondary-800 shadow-soft rounded-xl overflow-hidden">
          {/* Header profil */}
          <div className="relative h-48 bg-gradient-to-r from-primary-600 to-blue-500">
            <div className="absolute -bottom-16 left-8 flex items-end">
              <div className="h-32 w-32 rounded-full border-4 border-white dark:border-secondary-800 bg-white dark:bg-secondary-700 overflow-hidden">
                {user.avatar ? (
                  <div className="relative h-full w-full">
                    <Image 
                      src={user.avatar} 
                      alt={user.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-full w-full bg-primary-500 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-4 ml-4">
                <h1 className="text-white text-2xl font-bold">{user.name}</h1>
                <p className="text-blue-100">{user.level} Member</p>
              </div>
            </div>
            <button 
              onClick={handleEditToggle}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
            >
              {isEditing ? <FiSave size={20} /> : <FiEdit2 size={20} />}
            </button>
          </div>

          {/* Navigasi tab */}
          <div className="mt-20 px-8 border-b border-secondary-200 dark:border-secondary-700">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('personal')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'personal'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
                }`}
              >
                Data Pribadi
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'academic'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
                }`}
              >
                Data Akademik
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'progress'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
                }`}
              >
                Progress Belajar
              </button>
            </nav>
          </div>

          {/* Konten tab */}
          <div className="p-8">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-secondary-800 dark:text-white">Data Pribadi</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                      Nama Lengkap
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedUser?.name || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm bg-white dark:bg-secondary-700 text-secondary-800 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiUser className="text-secondary-400 mr-2" />
                        <span className="text-secondary-800 dark:text-white">{user.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedUser?.email || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm bg-white dark:bg-secondary-700 text-secondary-800 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiMail className="text-secondary-400 mr-2" />
                        <span className="text-secondary-800 dark:text-white">{user.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                      Nomor Telepon
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editedUser?.phone || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm bg-white dark:bg-secondary-700 text-secondary-800 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiPhone className="text-secondary-400 mr-2" />
                        <span className="text-secondary-800 dark:text-white">{user.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                      Tanggal Lahir
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="birthdate"
                        value={editedUser?.birthdate || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm bg-white dark:bg-secondary-700 text-secondary-800 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiCalendar className="text-secondary-400 mr-2" />
                        <span className="text-secondary-800 dark:text-white">{user.birthdate}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                      Alamat
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={editedUser?.address || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm bg-white dark:bg-secondary-700 text-secondary-800 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiMapPin className="text-secondary-400 mr-2" />
                        <span className="text-secondary-800 dark:text-white">{user.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-secondary-800 dark:text-white">Data Akademik</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                      Asal Sekolah
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="school"
                        value={editedUser?.school || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm bg-white dark:bg-secondary-700 text-secondary-800 dark:text-white"
                      />
                    ) : (
                      <span className="text-secondary-800 dark:text-white">{user.school}</span>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                      Bergabung Sejak
                    </label>
                    <span className="text-secondary-800 dark:text-white">{user.joinDate}</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                      Terakhir Aktif
                    </label>
                    <span className="text-secondary-800 dark:text-white">{user.lastActive}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-secondary-800 dark:text-white">Progress Belajar</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-secondary-700 shadow-sm rounded-lg p-6 border border-secondary-200 dark:border-secondary-600">
                    <h3 className="text-secondary-500 dark:text-secondary-400 font-medium mb-1">Kelas Selesai</h3>
                    <p className="text-3xl font-bold text-secondary-800 dark:text-white">{user.completedCourses}</p>
                  </div>
                  
                  <div className="bg-white dark:bg-secondary-700 shadow-sm rounded-lg p-6 border border-secondary-200 dark:border-secondary-600">
                    <h3 className="text-secondary-500 dark:text-secondary-400 font-medium mb-1">Kelas Aktif</h3>
                    <p className="text-3xl font-bold text-secondary-800 dark:text-white">{user.activeCourses}</p>
                  </div>
                  
                  <div className="bg-white dark:bg-secondary-700 shadow-sm rounded-lg p-6 border border-secondary-200 dark:border-secondary-600">
                    <h3 className="text-secondary-500 dark:text-secondary-400 font-medium mb-1">Poin XP</h3>
                    <p className="text-3xl font-bold text-secondary-800 dark:text-white">{user.points}</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-secondary-700 shadow-sm rounded-lg p-6 border border-secondary-200 dark:border-secondary-600">
                  <h3 className="text-lg font-medium text-secondary-800 dark:text-white mb-4">Aktivitas Belajar Terakhir</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-secondary-800 dark:text-white">Menyelesaikan Latihan Soal SNBT Matematika</p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400">3 hari yang lalu</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-secondary-800 dark:text-white">Menonton Video Pembahasan Fisika Dasar</p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400">5 hari yang lalu</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.776-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-secondary-800 dark:text-white">Mengikuti Try Out SNBT Kemampuan Penalaran Umum</p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400">1 minggu yang lalu</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;