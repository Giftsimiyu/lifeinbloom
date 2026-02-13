'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Floating3dLeafProps {
  delay?: number;
  duration?: number;
  scale?: number;
  opacity?: number;
}

export default function Floating3dLeaf({
  delay = 0,
  duration = 6,
  scale = 1,
  opacity = 0.15,
}: Floating3dLeafProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ 
        y: 0, 
        x: 0, 
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
      }}
      animate={{ 
        y: [0, -100, -200],
        x: [0, 50, -30],
        rotateZ: [0, 360],
        rotateX: [0, 180],
        rotateY: [0, 360],
      }}
      transition={{ 
        duration, 
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        className="opacity-20"
        style={{ transform: `scale(${scale})` }}
      >
        <path
          d="M20 2C20 2 30 8 32 18C34 28 24 36 20 38C16 36 6 28 8 18C10 8 20 2 20 2Z"
          fill="currentColor"
          style={{ color: 'var(--color-accent-olive)' }}
        />
        <path
          d="M20 10C20 10 24 14 24 18C24 22 20 26 20 26C20 26 16 22 16 18C16 14 20 10 20 10Z"
          fill="currentColor"
          style={{ color: 'var(--color-accent-sage)' }}
        />
      </svg>
    </motion.div>
  );
}
