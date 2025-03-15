import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiArrowRight
} from 'react-icons/fi';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';

export type BadgeVariant = 'primary' | 'info' | 'success' | 'secondary' | 'warning';

interface SocialLinks {
  github: string;
  instagram: string;
  linkedin: string;
}

interface TeamMember {
  id?: string | number;
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

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        transition={{ duration: 0.3 }}
        className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 shadow-sm transition-all duration-300 cursor-pointer"
        onClick={() => setIsDetailsOpen(true)}
      >
        {/* Image Section */}
        <div className="relative h-64 bg-primary-100 dark:bg-primary-900/20">
          <Image src={member.image} alt={member.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-white/90">{member.role}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 flex-grow">
          <Badge variant="secondary" size="sm" className="mb-3">NIM: {member.nim}</Badge>
          <p className="text-secondary-600 dark:text-secondary-400 text-sm line-clamp-3 mb-4">{member.about}</p>
          <div className="space-y-1.5 text-secondary-500 dark:text-secondary-400">
            <p className="flex items-center text-sm"><FiMail className="mr-2" /> {member.email}</p>
            <p className="flex items-center text-sm"><FiPhone className="mr-2" /> {member.phone}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-4 pb-4">
          <button
            onClick={(e) => { e.stopPropagation(); setIsDetailsOpen(true); }}
            className="w-full py-2 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors flex items-center justify-center"
          >
            <span>Lihat Detail</span>
            <FiArrowRight className="ml-1" />
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title="Detail Profil" size="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
            <Image src={member.image} alt={member.name} fill className="object-cover" />
          </div>
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">{member.name}</h2>
              <p className="text-primary-600 dark:text-primary-400 text-lg">{member.role}</p>
              <Badge variant="secondary" size="md">NIM: {member.nim}</Badge>
              <p className="text-secondary-700 dark:text-secondary-300 mt-4">{member.about}</p>
            </div>
            <ContactInfo member={member} />
            <SocialLinks member={member} />
            <Skills member={member} />
          </div>
        </div>
      </Modal>
    </>
  );
};

const ContactInfo = ({ member }: { member: TeamMember }) => (
  <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
    <h3 className="text-lg font-semibold mb-3 text-secondary-900 dark:text-white">Kontak</h3>
    <div className="space-y-3 text-secondary-700 dark:text-secondary-300">
      <p className="flex items-center"><FiMail className="mr-3 text-primary-500" /> <a href={`mailto:${member.email}`} className="hover:text-primary-600">{member.email}</a></p>
      <p className="flex items-center"><FiPhone className="mr-3 text-primary-500" /> <a href={`tel:${member.phone}`} className="hover:text-primary-600">{member.phone}</a></p>
      <p className="flex items-center"><FiMapPin className="mr-3 text-primary-500" /> {member.address}</p>
    </div>
  </div>
);

const SocialLinks = ({ member }: { member: TeamMember }) => (
  <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
    <h3 className="text-lg font-semibold mb-3 text-secondary-900 dark:text-white">Media Sosial</h3>
    <div className="flex space-x-3">
      {Object.entries(member.social).map(([platform, url]) => (
        <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/20 transition-colors">
          {platform === 'github' && <FiGithub size={20} />}
          {platform === 'instagram' && <FiInstagram size={20} />}
          {platform === 'linkedin' && <FiLinkedin size={20} />}
        </a>
      ))}
    </div>
  </div>
);

const Skills = ({ member }: { member: TeamMember }) => (
  <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
    <h3 className="text-lg font-semibold mb-2 text-secondary-900 dark:text-white">Keahlian</h3>
    <div className="flex flex-wrap gap-2">
      {member.skills?.map((skill, index) => <Badge key={index} variant={getBadgeVariant(index)}>{skill}</Badge>) || <p>Keahlian tidak tersedia</p>}
    </div>
  </div>
);

const getBadgeVariant = (index: number): BadgeVariant => ["primary", "info", "success", "secondary", "warning"][index % 5] as BadgeVariant;

export default TeamMemberCard;
