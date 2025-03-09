'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FiBook, FiCheckSquare, FiAward, FiTarget, FiStar, FiBarChart } from 'react-icons/fi';

interface DynamicHeroBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

const DynamicHeroBackground: React.FC<DynamicHeroBackgroundProps> = ({ 
  intensity = 'medium' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const waveMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [lowPerformance, setLowPerformance] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  
  // Particles settings based on intensity
  const getParticleCount = useCallback(() => {
    if (lowPerformance) return 20;
    
    switch(intensity) {
      case 'low': return 30;
      case 'high': return 80;
      default: return 50;
    }
  }, [lowPerformance, intensity]);
  
  // Cleanup Three.js scene - wrapped in useCallback
  const cleanupThreeScene = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (rendererRef.current && threeContainerRef.current) {
      threeContainerRef.current.removeChild(rendererRef.current.domElement);
      rendererRef.current.dispose();
    }
  }, []);
  
  // Initialize Three.js scene - wrapped in useCallback
  const initThreeScene = useCallback(() => {
    if (!threeContainerRef.current) return;
    
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    threeContainerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      dimensions.width / dimensions.height, 
      0.1, 
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;
    
    // Create wave mesh
    const geometry = new THREE.PlaneGeometry(100, 60, 20, 20);
    
    // Create gradient material
    const uniforms = {
      colorTop: { value: new THREE.Color('#1e40af') },  // Darker blue
      colorBottom: { value: new THREE.Color('#3b82f6') },  // Lighter blue
      time: { value: 0 }
    };
    
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          vUv = uv;
          
          // Create wave effect
          vec3 pos = position;
          float waveX = sin(pos.x * 0.05 + time * 0.5) * 2.0;
          float waveY = sin(pos.y * 0.05 + time * 0.5) * 2.0;
          pos.z += waveX + waveY;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorTop;
        uniform vec3 colorBottom;
        varying vec2 vUv;
        
        void main() {
          gl_FragColor = vec4(mix(colorBottom, colorTop, vUv.y), 0.9);
        }
      `,
      wireframe: false,
      transparent: true
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.2;
    mesh.position.y = -5;
    scene.add(mesh);
    waveMeshRef.current = mesh;
    
    // Animation loop
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !waveMeshRef.current) return;
      
      // Update uniforms
      (waveMeshRef.current.material as THREE.ShaderMaterial).uniforms.time.value += 0.01;
      
      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Recursive call
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
  }, [dimensions.width, dimensions.height]);
  
  // Handle window resize - wrapped in useCallback
  const handleResize = useCallback(() => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    setDimensions({ width, height });
    
    if (cameraRef.current) {
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    }
    
    if (rendererRef.current) {
      rendererRef.current.setSize(width, height);
    }
  }, []);
  
  // Initialize when component mounts
  useEffect(() => {
    setIsMounted(true);
    
    // Check for low performance devices
    if (typeof window !== 'undefined') {
      // Using Boolean() to ensure isLowPerf is always boolean type
      const isLowPerf = Boolean(
        !window.matchMedia('(min-device-width: 768px)').matches || 
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
      );
      setLowPerformance(isLowPerf);
      
      if (containerRef.current) {
        const { clientWidth: width, clientHeight: height } = containerRef.current;
        setDimensions({ width, height });
      }
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        cleanupThreeScene();
      };
    }
  }, [handleResize, cleanupThreeScene]);
  
  // Initialize Three.js scene when dimensions change
  useEffect(() => {
    if (isMounted && dimensions.width > 0 && dimensions.height > 0 && !lowPerformance) {
      cleanupThreeScene();
      initThreeScene();
    }
  }, [dimensions, isMounted, lowPerformance, cleanupThreeScene, initThreeScene]);
  
  // Generate floating education-related icons
  const generateFloatingIcons = useCallback(() => {
    const icons = [
      { icon: <FiBook size={20} />, delay: 0 },
      { icon: <FiCheckSquare size={20} />, delay: 0.4 },
      { icon: <FiAward size={20} />, delay: 0.8 },
      { icon: <FiTarget size={20} />, delay: 1.2 },
      { icon: <FiStar size={20} />, delay: 1.6 },
      { icon: <FiBarChart size={20} />, delay: 2.0 }
    ];
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {icons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-white/40 dark:text-white/20"
            initial={{ 
              x: `${(index * 15) % 100}%`, 
              y: `${(index * 20) % 100}%`,
              opacity: 0
            }}
            animate={{ 
              y: [`${(index * 20) % 100}%`, `${((index * 20) % 100) - 10}%`, `${(index * 20) % 100}%`],
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 8 + index % 4,
              delay: item.delay,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
    );
  }, []);
  
  // Generate animated particles
  const generateParticles = useCallback(() => {
    const particleCount = getParticleCount();
    
    // Changed the way we create particles to avoid random numbers
    // that might be re-created differently on each render
    const particles = Array.from({ length: particleCount }).map((_, i) => {
      // Use deterministic values based on index
      const seed = i * 13;
      return {
        id: i,
        size: (seed % 4) + 2,
        x: (seed % 100),
        y: ((seed * 1.7) % 100),
        duration: (seed % 10) + 15,
        delay: (seed % 5)
      };
    });
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, ((particle.id * 17) % 100) - 50, 0],
              y: [0, ((particle.id * 19) % 100) - 50, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        ))}
      </div>
    );
  }, [getParticleCount]);
  
  // Generate gradient overlay
  const generateGradientOverlay = useCallback(() => (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-700/40 to-blue-500/60 pointer-events-none" />
  ), []);
  
  // Generate subtle wave overlay
  const generateWaveOverlay = useCallback(() => (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full h-auto"
      >
        <motion.path
          fill="rgba(255, 255, 255, 0.05)"
          initial={{
            d: "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          }}
          animate={{
            d: [
              "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,181.3C96,203,192,245,288,234.7C384,224,480,160,576,138.7C672,117,768,139,864,160C960,181,1056,203,1152,192C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <motion.path
          fill="rgba(255, 255, 255, 0.08)"
          initial={{
            d: "M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,144C672,117,768,75,864,80C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          }}
          animate={{
            d: [
              "M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,144C672,117,768,75,864,80C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,96C672,96,768,128,864,160C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,144C672,117,768,75,864,80C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </svg>
    </div>
  ), []);
  
  // Generate radial gradient spots
  const generateRadialGradients = useCallback(() => (
    <>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      </div>
    </>
  ), []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* 3D Wave Background (only on medium+ devices) */}
      {!lowPerformance && (
        <div 
          ref={threeContainerRef} 
          className="absolute inset-0 pointer-events-none"
        />
      )}
      
      {/* Gradient overlay */}
      {generateGradientOverlay()}
      
      {/* Wave overlay */}
      {generateWaveOverlay()}
      
      {/* Floating icons */}
      {generateFloatingIcons()}
      
      {/* Particles */}
      {generateParticles()}
      
      {/* Radial gradients */}
      {generateRadialGradients()}
      
      {/* Animated Mesh Grid (low performance version) */}
      {lowPerformance && (
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      )}
    </div>
  );
};

export default DynamicHeroBackground;