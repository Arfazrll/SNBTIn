import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = (threshold = 0.2, triggerOnce = true) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce,
    threshold
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      if (!triggerOnce) {
        controls.start('hidden');
      }
    }
  }, [controls, inView, triggerOnce]);

  return { ref, controls, inView };
};