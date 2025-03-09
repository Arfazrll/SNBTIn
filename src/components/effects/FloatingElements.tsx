'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBook, FiCheckSquare, FiAward, FiBriefcase, 
  FiBarChart, FiSettings, FiStar, FiTarget
} from 'react-icons/fi';

interface FloatingElementProps {
  count?: number;
  icons?: boolean;
}

interface Element {
  id: number;
  x: string;
  y: string;
  size: string;
  opacity: number;
  duration: number;
  delay: number;
  icon?: React.ReactNode;
  rotation: number;
}

const icons = [
  <FiBook key="book" />,
  <FiCheckSquare key="check" />,
  <FiAward key="award" />,
  <FiBriefcase key="briefcase" />,
  <FiBarChart key="chart" />,
  <FiSettings key="settings" />,
  <FiStar key="star" />,
  <FiTarget key="target" />
];

const FloatingElements: React.FC<FloatingElementProps> = ({ 
  count = 10, 
  icons: showIcons = false 
}) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  // Generate deterministic elements
  useEffect(() => {
    setIsMounted(true);
    
    const newElements: Element[] = [];
    
    for (let i = 0; i < count; i++) {
      // Deterministic values based on index to avoid hydration mismatches
      const xPos = `${(i * 17) % 80 + 10}%`;
      const yPos = `${(i * 23) % 80 + 10}%`;
      const size = `${((i * 11) % 20) + 20}px`;
      const opacity = (((i * 13) % 5) + 3) / 10; // 0.3 to 0.7
      const duration = ((i % 5) + 3) * 2; // 6s to 14s
      const delay = i * 0.2;
      const rotation = ((i * 17) % 360);
      
      newElements.push({
        id: i,
        x: xPos,
        y: yPos,
        size: size,
        opacity: opacity,
        duration: duration,
        delay: delay,
        icon: showIcons ? icons[i % icons.length] : undefined,
        rotation: rotation
      });
    }
    
    setElements(newElements);
  }, [count, showIcons]);
  
  if (!isMounted) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${showIcons ? 'text-white' : 'bg-white dark:bg-blue-400'} rounded-full flex items-center justify-center`}
          style={{
            left: element.x,
            top: element.y,
            width: element.size,
            height: element.size,
            opacity: element.opacity,
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1, 0.8, 1],
            y: [0, -30, 0],
            rotate: [0, element.rotation]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {element.icon && (
            <div className="text-lg">{element.icon}</div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;