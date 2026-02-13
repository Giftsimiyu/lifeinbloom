'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewsletterForm from './newsletterForm';

export default function NewsletterPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show prompt after user scrolls past initial content
    const handleScroll = () => {
      if (hasShown) return;

      const scrollPosition = window.scrollY;
      const threshold = window.innerHeight * 1.5; // Show after scrolling 1.5x viewport height

      if (scrollPosition > threshold && Math.random() < 0.3) {
        // 30% chance to show on each scroll trigger
        setIsVisible(true);
        setHasShown(true);

        // Auto-hide after 10 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 10000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const prompts = [
    {
      title: "Love what you're reading?",
      message: "Get fresh content delivered to your inbox every week. Join our growing community.",
    },
    {
      title: "Feeling inspired?",
      message: "Don't miss out on our latest posts. Subscribe to our newsletter for exclusive insights.",
    },
    {
      title: "Want more bloom?",
      message: "Stay connected with curated posts and tips on soft living, wellness, and beauty.",
    },
    {
      title: "Found a favorite?",
      message: "Get personalized recommendations from Life in Bloom straight to your email.",
    },
    {
      title: "Ready to grow?",
      message: "Join us on this journey. Subscribe to stay updated with our newest content.",
    },
  ];

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 max-w-sm z-50"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-(--color-background-primary) rounded-2xl shadow-2xl border border-(--color-neutral-cream) p-6 md:p-8">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-display text-xl text-(--color-accent-wilderness) mb-2">
                {randomPrompt.title}
              </h3>
              <p className="font-body text-sm text-(--color-neutral-grey) mb-6">
                {randomPrompt.message}
              </p>

              {/* Newsletter Form */}
              <NewsletterForm variant="inline" placeholder="Your email" />
            </motion.div>

            {/* Decorative element */}
            <motion.div
              className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-(--color-accent-olive) opacity-10 blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
              aria-hidden
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
