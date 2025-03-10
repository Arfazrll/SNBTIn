// components/effects/AnimatedWaveBackground.tsx
import React, { useEffect } from 'react';

const AnimatedWaveBackground: React.FC = () => {
  useEffect(() => {
    // Membuat canvas untuk animasi
    const canvas = document.getElementById('wave-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fungsi untuk resize canvas sesuai ukuran window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Parameter animasi
    const waves = [
      { y: 0.3, length: 0.5, amplitude: 20, speed: 0.02, color: 'rgba(74, 144, 226, 0.3)' },
      { y: 0.4, length: 0.7, amplitude: 25, speed: 0.01, color: 'rgba(30, 87, 153, 0.2)' },
      { y: 0.5, length: 0.9, amplitude: 30, speed: 0.015, color: 'rgba(10, 61, 98, 0.1)' }
    ];

    let animationFrameId: number;
    let time = 0;

    // Fungsi animasi
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Menggambar setiap gelombang
      waves.forEach(wave => {
        ctx.fillStyle = wave.color;
        ctx.beginPath();
        
        ctx.moveTo(0, canvas.height);
        
        // Menggambar gelombang
        for (let x = 0; x < canvas.width; x++) {
          const dx = x / canvas.width;
          const angle = (dx * wave.length + time * wave.speed) * Math.PI * 2;
          const y = Math.sin(angle) * wave.amplitude;
          ctx.lineTo(x, canvas.height * wave.y + y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      });

      time += 1000;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup pada unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      id="wave-canvas" 
      className="absolute top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedWaveBackground;