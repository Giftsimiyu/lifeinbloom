'use client';

import { motion } from 'framer-motion';

interface ParallaxDepthProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

export default function ParallaxDepth({
  children,
  depth = 20,
  className = '',
}: ParallaxDepthProps) {
  return (
    <motion.div
      className={className}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      whileHover={{
        z: depth,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
