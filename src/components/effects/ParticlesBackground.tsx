'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Define interfaces for our types
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const ParticlesBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  // Generate a deterministic set of particles to avoid hydration mismatch
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Get container dimensions
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
    
    // Create particles with fixed positions initially
    const particleCount = 50; // Adjust based on performance
    const newParticles: Particle[] = Array(particleCount).fill(0).map((_, i) => {
      const size = Math.floor(((i * 13) % 3) + 2); // 2-4px size
      return {
        id: i,
        x: ((i * 17) % 100) * rect.width / 100,
        y: ((i * 23) % 100) * rect.height / 100,
        size: size,
        color: `rgba(255, 255, 255, ${0.3 + ((i * 7) % 7) / 10})`,
        vx: ((i % 10) - 5) * 0.1,
        vy: ((i % 10) - 5) * 0.1
      };
    });
    
    setParticles(newParticles);
    
    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      const newRect = container.getBoundingClientRect();
      setDimensions({ width: newRect.width, height: newRect.height });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Mouse movement effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };
    
    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  // Animation frame for particle movement
  useEffect(() => {
    if (particles.length === 0) return;
    
    let animationFrameId: number;
    
    const animateParticles = () => {
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          // Calculate distance to mouse for interactive effect
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Move away from mouse if close
          let vx = particle.vx;
          let vy = particle.vy;
          
          if (distance < 100) {
            const force = (100 - distance) / 500;
            vx -= dx * force;
            vy -= dy * force;
          }
          
          // Update position
          let x = particle.x + vx;
          let y = particle.y + vy;
          
          // Bounce off edges
          if (x < 0 || x > dimensions.width) {
            vx = -vx;
            x = Math.max(0, Math.min(x, dimensions.width));
          }
          
          if (y < 0 || y > dimensions.height) {
            vy = -vy;
            y = Math.max(0, Math.min(y, dimensions.height));
          }
          
          // Apply some friction to prevent infinite speed
          vx *= 0.99;
          vy *= 0.99;
          
          return { ...particle, x, y, vx, vy };
        });
      });
      
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions, mousePosition, particles.length]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
          initial={false}
          animate={{
            x: 0,
            y: 0
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;