// src/components/home/TestimonialsSection.jsx
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '../../utils/data';

const TestimonialsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeDot, setActiveDot] = useState(0);

  // Animation when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-secondary-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-900 dark:text-white">
            Kisah Sukses Siswa Kami
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-400">
            Dengarkan langsung dari siswa yang berhasil masuk ke perguruan tinggi impian mereka dengan UTBK Prep.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <TestimonialCard
                avatar={testimonial.avatar}
                name={testimonial.name}
                university={testimonial.university}
                text={testimonial.text}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile dots pagination */}
        <div className="md:hidden flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                activeDot === index 
                  ? 'bg-primary-500' 
                  : 'bg-secondary-300 dark:bg-secondary-700'
              }`}
              onClick={() => setActiveDot(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;