import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';
import React from 'react';

// Define interface for component props
interface TestimonialCardProps {
  avatar: string;
  name: string;
  university: string;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatar, name, university, text }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-sm border border-secondary-100 dark:border-secondary-700 transition-all duration-300 h-full flex flex-col"
    >
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FiStar className="w-5 h-5 text-yellow-400 fill-current" />
          </motion.div>
        ))}
      </div>
      
      <p className="text-secondary-700 dark:text-secondary-300 mb-6 italic flex-grow">
        &ldquo;{text}&rdquo;
      </p>
      
      <div className="flex items-center mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary-100 dark:border-primary-800">
          <Image
            src={avatar}
            alt={name}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-secondary-900 dark:text-white">{name}</h4>
          <p className="text-sm text-primary-600 dark:text-primary-400">{university}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;