'use client';

import { motion } from 'framer-motion';

interface RotatingFlowerProps {
  size?: number;
  opacity?: number;
  delay?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export default function RotatingFlower({
  size = 120,
  opacity = 0.1,
  delay = 0,
  position = 'top-right',
}: RotatingFlowerProps) {
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
      animate={{ rotate: 360 }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
      style={{
        perspective: '1200px',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        className="opacity-10"
      >
        {/* Petals */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 60 60)`}>
            <ellipse
              cx="60"
              cy="25"
              rx="15"
              ry="20"
              fill="currentColor"
              style={{ color: 'var(--color-accent-terracotta)' }}
            />
          </g>
        ))}
        {/* Center circle */}
        <circle
          cx="60"
          cy="60"
          r="12"
          fill="currentColor"
          style={{ color: 'var(--color-accent-olive)' }}
        />
      </svg>
    </motion.div>
  );
}
