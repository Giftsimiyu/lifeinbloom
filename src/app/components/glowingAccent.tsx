'use client';

import { motion } from 'framer-motion';

interface GlowingAccentProps {
  size?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  opacity?: number;
  color?: 'olive' | 'terracotta' | 'sage';
}

const colorMap = {
  olive: 'var(--color-accent-olive)',
  terracotta: 'var(--color-accent-terracotta)',
  sage: 'var(--color-accent-sage)',
};

export default function GlowingAccent({
  size = 200,
  position = 'top-right',
  opacity = 0.05,
  color = 'olive',
}: GlowingAccentProps) {
  const positionClasses = {
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${positionClasses[position]} rounded-full blur-3xl`}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [opacity, opacity * 1.5, opacity],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        width: size,
        height: size,
        backgroundColor: colorMap[color],
        filter: 'blur(60px)',
      }}
    />
  );
}
