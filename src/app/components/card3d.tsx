'use client';

import { motion } from 'framer-motion';

interface Card3dProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card3d({ children, className = '' }: Card3dProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      style={{ perspective: '1000px' }}
      whileHover={{
        rotateX: 5,
        rotateY: -5,
        z: 20,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Shadow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-black/5 blur-2xl -z-10"
        whileHover={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      {children}
    </motion.div>
  );
}
