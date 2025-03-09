import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiVideo, FiFileText, FiDownload, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { utbkMaterials } from '../utils/data';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

// Define TypeScript interfaces for your data structures
interface SubTopic {
  title: string;
  items: string[];
}

interface MaterialCategory {
  title: string;
  description: string;
  icon: string;
  color: string;
  subtopics: SubTopic[];
}

interface UTBKMaterials {
  [key: string]: MaterialCategory;
}

interface Material {
  id: number;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'document';
  size: string | null;
  duration: string | null;
  subject: string;
  thumbnail: string;
}

interface ExpandedTopics {
  [key: string]: boolean;
}

// Import BadgeVariant type from your Badge component or define it here
type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface TypeBadgeConfig {
  icon: React.ReactNode;
  color: BadgeVariant;
  label: string;
}

function Materi() {
  const [activeTab, setActiveTab] = useState('semua');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<ExpandedTopics>({});
  const [isClient, setIsClient] = useState(false);
  
  // Ensure utbkMaterials is properly typed
  const typedUtbkMaterials = utbkMaterials as UTBKMaterials;
  
  // Use useRef to store a reference to typedUtbkMaterials
  // useRef doesn't trigger dependency checks like useState or useMemo
  const utbkMaterialsRef = React.useRef(typedUtbkMaterials);
  
  // Set isClient to true after component is mounted
  useEffect(() => {
    setIsClient(true);
    // Log to make sure data is loaded
    console.log("snbtMaterials loaded:", Object.keys(utbkMaterialsRef.current).length);
  }, []);
  
  // Get material categories from utbkMaterials
  const materialCategories = isClient ? Object.keys(typedUtbkMaterials).map(key => ({
    id: key,
    name: typedUtbkMaterials[key].title
  })) : [];
  
  // Generate materials from utbkMaterials
  const generateMaterials = (): Material[] => {
    if (!isClient) return [];
    
    let result: Material[] = [];
    let id = 1;
    
    Object.keys(typedUtbkMaterials).forEach(key => {
      const category = typedUtbkMaterials[key];
      
      // Add material for each subtopic
      category.subtopics.forEach((subtopic: SubTopic) => {
        // Add PDF for subtopic
        result.push({
          id: id++,
          title: `${subtopic.title}`,
          description: `Materi dan panduan tentang ${subtopic.title} untuk persiapan SNBT`,
          type: "pdf",
          size: `${Math.floor(Math.random() * 8) + 1}.${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} MB`,
          duration: null,
          subject: category.title,
          thumbnail: `https://source.unsplash.com/random/800x500?${encodeURIComponent(category.title.toLowerCase())}`,
        });
        
        // Add video for some subtopics
        if (Math.random() > 0.6) {
          result.push({
            id: id++,
            title: `Tutorial ${subtopic.title}`,
            description: `Video pembelajaran interaktif tentang ${subtopic.title} untuk persiapan SNBT`,
            type: "video",
            size: null,
            duration: `${Math.floor(Math.random() * 30) + 10}:${Math.floor(Math.random() * 6)}${Math.floor(Math.random() * 10)}`,
            subject: category.title,
            thumbnail: `https://source.unsplash.com/random/800x500?${encodeURIComponent(category.title.toLowerCase())},video`,
          });
        }
      });
    });
    
    return result;
  };
  
  // Generate materials from utbkMaterials structure
  const allMaterials = isClient ? generateMaterials() : [];
  
  // Filter materials based on active tab
  const filteredMaterials = activeTab === 'semua' 
    ? allMaterials 
    : allMaterials.filter(material => {
        // Filter based on category matching active tab ID
        const categoryTitle = typedUtbkMaterials[activeTab]?.title;
        return material.subject === categoryTitle;
      });
  
  // Badge config for material types
  const typeBadgeConfig: Record<string, TypeBadgeConfig> = {
    pdf: { icon: <FiFileText />, color: 'danger', label: 'PDF' },
    video: { icon: <FiVideo />, color: 'primary', label: 'Video' },
    document: { icon: <FiBook />, color: 'info', label: 'Dokumen' },
  };
  
  // Toggle expanded section for material structure
  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };
  
  // Toggle expanded topic in section
  const toggleTopic = (sectionId: string, topicIndex: number) => {
    const key = `${sectionId}-${topicIndex}`;
    setExpandedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  // Render Material Structure
  const renderMateriStructure = () => {
    if (!isClient) {
      return <div className="text-center py-8">Loading...</div>;
    }
    
    // For tab "semua", show material structure
    if (activeTab === 'semua') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.keys(typedUtbkMaterials).map((key) => (
            <Card key={key} className="overflow-hidden">
              <div 
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  typedUtbkMaterials[key].color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' :
                  typedUtbkMaterials[key].color === 'red' ? 'bg-red-50 dark:bg-red-900/20' :
                  typedUtbkMaterials[key].color === 'green' ? 'bg-green-50 dark:bg-green-900/20' :
                  typedUtbkMaterials[key].color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20' :
                  typedUtbkMaterials[key].color === 'yellow' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                  typedUtbkMaterials[key].color === 'indigo' ? 'bg-indigo-50 dark:bg-indigo-900/20' :
                  typedUtbkMaterials[key].color === 'teal' ? 'bg-teal-50 dark:bg-teal-900/20' :
                  'bg-primary-50 dark:bg-primary-900/20'
                }`}
                onClick={() => toggleSection(key)}
              >
                <h3 className="text-lg font-semibold">{typedUtbkMaterials[key].title}</h3>
                {expandedSection === key ? <FiChevronDown /> : <FiChevronRight />}
              </div>
              
              {expandedSection === key && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4"
                >
                  <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                    {typedUtbkMaterials[key].description}
                  </p>
                  
                  <div className="space-y-3">
                    {typedUtbkMaterials[key].subtopics.map((subtopic, topicIndex) => {
                      const topicKey = `${key}-${topicIndex}`;
                      return (
                        <div key={topicIndex} className="border border-secondary-200 dark:border-secondary-700 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleTopic(key, topicIndex)}
                            className="w-full p-3 flex justify-between items-center bg-white dark:bg-secondary-800 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
                          >
                            <span className="font-medium text-secondary-900 dark:text-white">{subtopic.title}</span>
                            {expandedTopics[topicKey] ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                          </button>
                          
                          {expandedTopics[topicKey] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800/50 p-3"
                            >
                              <ul className="space-y-1 list-disc list-inside text-secondary-700 dark:text-secondary-300">
                                {subtopic.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>{item}</li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </Card>
          ))}
        </div>
      );
    }
    
    // Show specific material for tabs other than 'semua'
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <motion.div key={material.id} variants={itemVariants}>
              <Card hover className="h-full flex flex-col">
                <div className="relative h-48 rounded-t-lg overflow-hidden -mx-5 -mt-5">
                  {/* Using Next.js Image component for better performance */}
                  <Image
                    src={material.thumbnail}
                    alt={material.title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={500}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={typeBadgeConfig[material.type].color} size="sm" className="flex items-center">
                      {typeBadgeConfig[material.type].icon}
                      <span className="ml-1">{typeBadgeConfig[material.type].label}</span>
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-4 flex-grow">
                  <Badge variant="secondary" size="sm" className="mb-2">
                    {material.subject}
                  </Badge>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">
                    {material.title}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {material.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400 mt-4 pt-4 border-t border-secondary-100 dark:border-secondary-700">
                  {material.duration && (
                    <div className="flex items-center">
                      <FiVideo className="mr-1" />
                      <span>{material.duration}</span>
                    </div>
                  )}
                  
                  {material.size && (
                    <div className="flex items-center">
                      <FiFileText className="mr-1" />
                      <span>{material.size}</span>
                    </div>
                  )}
                  
                  <button className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                    <FiDownload className="mr-1" />
                    <span>Unduh</span>
                  </button>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
              Tidak ada materi yang ditemukan
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Silakan pilih kategori materi yang lain
            </p>
          </div>
        )}
      </motion.div>
    );
  };
  
  return (
    <>
      <Head>
        <title>Materi - SNBTIn</title>
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
              Materi Pembelajaran
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Akses berbagai materi pembelajaran untuk persiapan SNBT dalam bentuk video, PDF, dan dokumen.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Tabs navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-1 min-w-max border-b border-secondary-200 dark:border-secondary-700">
              <button
                onClick={() => setActiveTab('semua')}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'semua' 
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                    : 'border-transparent text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
                }`}
              >
                Semua Materi
              </button>
              
              {/* Tab using new data from utbkMaterials */}
              {isClient && materialCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                    activeTab === category.id 
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                      : 'border-transparent text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Render material according to active tab */}
          {renderMateriStructure()}
        </div>
      </section>
    </>
  );
}

// Use dynamic import with SSR disabled temporarily for debugging
export default dynamic(() => Promise.resolve(Materi), { ssr: false });