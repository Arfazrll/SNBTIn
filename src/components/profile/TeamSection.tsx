// src/components/profile/TeamSection.tsx
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import TeamMemberCard from './TeamMemberCard';
import { teamMembers } from '../../utils/data';

// Import or define the TeamMember interface
interface SocialLinks {
  github: string;
  instagram: string;
  linkedin: string;
}

interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  nim: string;
  email: string;
  phone: string;
  about: string;
  address: string;
  image: string;
  social: SocialLinks;
  skills?: string[];
}

const TeamSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [roleFilter, setRoleFilter] = useState<string>('');

  // Filter team members
  const filteredMembers = teamMembers.filter((member: TeamMember) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter ? member.role === roleFilter : true;
    
    return matchesSearch && matchesRole;
  });

  // Get unique roles - using Array.from instead of spread operator with Set
  const roles: string[] = Array.from(new Set(teamMembers.map((member: TeamMember) => member.role)));

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
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-900 dark:text-white">
            Tim Pengembang SNBTIn
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-400">
            Kenali tim kami yang bekerja keras untuk membantu kamu mempersiapkan SNBT dengan sebaik-baiknya.
          </p>
        </motion.div>

        {/* Search and filter */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-secondary-400 dark:text-secondary-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau peran..."
                className="pl-10 pr-4 py-2 w-full rounded-lg bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500"
              />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 flex items-center justify-between w-full md:w-48"
              >
                <span>{roleFilter || 'Semua Peran'}</span>
                <FiChevronDown className={`transition-transform duration-200 ${filterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {filterOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setRoleFilter('');
                        setFilterOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-secondary-100 dark:hover:bg-secondary-700 ${!roleFilter ? 'bg-secondary-100 dark:bg-secondary-700 text-primary-600 dark:text-primary-400' : 'text-secondary-700 dark:text-secondary-300'}`}
                    >
                      Semua Peran
                    </button>
                    
                    {roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setRoleFilter(role);
                          setFilterOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left hover:bg-secondary-100 dark:hover:bg-secondary-700 ${roleFilter === role ? 'bg-secondary-100 dark:bg-secondary-700 text-primary-600 dark:text-primary-400' : 'text-secondary-700 dark:text-secondary-300'}`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Team members grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member: TeamMember) => (
              <motion.div key={member.id} variants={itemVariants}>
                <TeamMemberCard member={member} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                Tidak ada anggota tim yang ditemukan
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Silakan coba dengan kata kunci pencarian yang berbeda
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;