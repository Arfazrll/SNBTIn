'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeDModel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Check for low-performance devices
    const isLowPerformance = !window.matchMedia('(min-width: 768px)').matches || 
                              navigator.hardwareConcurrency <= 4;
    
    if (isLowPerformance) {
      // Provide a simpler alternative for low-performance devices
      return;
    }
    
    // Initialize scene
    const initialize = () => {
      if (!containerRef.current) return;
      
      // Create renderer
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 30;
      cameraRef.current = camera;
      
      // Create education-themed 3D objects
      createObjects(scene);
      
      // Ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      // Directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
      
      // Start animation loop
      animate();
      
      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Update camera
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        
        // Update renderer
        rendererRef.current.setSize(width, height);
      };
      
      window.addEventListener('resize', handleResize);
      
      setIsInitialized(true);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        if (rendererRef.current && containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
        }
      };
    };
    
    // Create education-themed 3D objects
    const createObjects = (scene: THREE.Scene) => {
      // Create a group of floating books
      const booksGroup = new THREE.Group();
      scene.add(booksGroup);
      
      // Book geometry
      const bookGeometry = new THREE.BoxGeometry(4, 0.5, 3);
      
      // Create multiple books with different colors
      const bookColors = [
        0x3b82f6, // Blue
        0x60a5fa, // Lighter blue
        0x1d4ed8, // Dark blue
        0x4f46e5, // Indigo
        0x8b5cf6  // Purple
      ];
      
      // Create 10 random books
      for (let i = 0; i < 10; i++) {
        const material = new THREE.MeshPhongMaterial({
          color: bookColors[i % bookColors.length],
          shininess: 60,
          specular: 0x444444
        });
        
        const book = new THREE.Mesh(bookGeometry, material);
        
        // Position randomly but with some spatial reasoning
        book.position.x = (Math.random() - 0.5) * 30;
        book.position.y = (Math.random() - 0.5) * 30;
        book.position.z = (Math.random() - 0.5) * 10;
        
        // Rotate randomly
        book.rotation.x = Math.random() * Math.PI;
        book.rotation.y = Math.random() * Math.PI;
        book.rotation.z = Math.random() * Math.PI;
        
        booksGroup.add(book);
      }
      
      // Create a floating education icon (like a graduation cap)
      const capGroup = new THREE.Group();
      scene.add(capGroup);
      
      // Base of the cap
      const baseGeometry = new THREE.BoxGeometry(5, 0.5, 5);
      const baseMaterial = new THREE.MeshPhongMaterial({
        color: 0x2563eb,
        shininess: 60
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      capGroup.add(base);
      
      // Top of the cap
      const topGeometry = new THREE.ConeGeometry(2, 2, 4);
      const topMaterial = new THREE.MeshPhongMaterial({
        color: 0x1e40af,
        shininess: 60
      });
      const top = new THREE.Mesh(topGeometry, topMaterial);
      top.position.y = 1.25;
      capGroup.add(top);
      
      // Tassel
      const tasselGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
      const tasselMaterial = new THREE.MeshPhongMaterial({
        color: 0xfcd34d,
        shininess: 60
      });
      const tassel = new THREE.Mesh(tasselGeometry, tasselMaterial);
      tassel.position.set(2, 0.5, 0);
      tassel.rotation.z = Math.PI / 4;
      capGroup.add(tassel);
      
      // Position the cap
      capGroup.position.set(0, 5, -5);
      
      // Create a mathematical symbol (like Pi)
      const piGroup = new THREE.Group();
      scene.add(piGroup);
      
      // Create a toroid for Pi symbol
      const torusGeometry = new THREE.TorusGeometry(3, 0.5, 16, 100);
      const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0xf59e0b,
        shininess: 60
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      piGroup.add(torus);
      
      // Position the Pi symbol
      piGroup.position.set(-10, -8, -2);
      
      // Add stars/particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 200;
      
      // Create arrays for positions, colors, and sizes
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      
      // Set random positions, colors, and sizes
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Positions
        positions[i3] = (Math.random() - 0.5) * 100;
        positions[i3 + 1] = (Math.random() - 0.5) * 100;
        positions[i3 + 2] = (Math.random() - 0.5) * 100;
        
        // Colors
        colors[i3] = Math.random() * 0.5 + 0.5; // More blue
        colors[i3 + 1] = Math.random() * 0.5 + 0.5; // More green
        colors[i3 + 2] = Math.random() * 0.3 + 0.7; // Mostly white
        
        // Sizes
        sizes[i] = Math.random() * 2;
      }
      
      // Set attributes
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Create material
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });
      
      // Create points
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
    };
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      // Rotate all objects in scene
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Group) {
          object.rotation.x += 0.002;
          object.rotation.y += 0.003;
        }
      });
      
      // Move camera position slightly based on mouse
      const handleMouseMove = (event: MouseEvent) => {
        if (!cameraRef.current) return;
        
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = (event.clientY / window.innerHeight) * 2 - 1;
        
        cameraRef.current.position.x = mouseX * 3;
        cameraRef.current.position.y = -mouseY * 3;
        cameraRef.current.lookAt(0, 0, 0);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      // Render the scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Request next frame
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    initialize();
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ opacity: isInitialized ? 0.6 : 0 }}
    />
  );
};

export default ThreeDModel;