'use client';

import { motion } from 'framer-motion';

interface SparkleProps {
  size?: number;
  opacity?: number;
  delay?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export default function Sparkle({
  size = 50,
  opacity = 0.3,
  delay = 0,
  position = 'top-right',
}: SparkleProps) {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${positionClasses[position]}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [opacity, opacity * 1.5, opacity],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
      >
        {/* Sparkle shape */}
        <path
          d="M25 5 L27 15 L37 15 L29 21 L33 31 L25 25 L17 31 L21 21 L13 15 L23 15 Z"
          fill="currentColor"
          className="text-yellow-300"
        />
      </svg>
    </motion.div>
  );
}