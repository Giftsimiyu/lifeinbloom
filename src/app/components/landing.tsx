"use client";

import { motion } from "framer-motion";
import Link from "next/link";



export default function Landing() {
  

  return (
    <section className="relative bg-hero-paper min-h-screen flex flex-col justify-center overflow-hidden py-16 md:py-24">
      {/* Top-left botanical vine */}
      <motion.div
        className="absolute top-0 left-0 opacity-40 hidden md:block z-0"
        style={{ color: "var(--color-accent-olive)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 30C50 60 80 100 120 140C150 170 180 200 220 220"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="60" cy="70" r="2.5" fill="currentColor" />
          <circle cx="100" cy="130" r="2" fill="currentColor" />
          <circle cx="150" cy="180" r="2.5" fill="currentColor" />
          <path
            d="M70 85C85 105 105 130 130 155"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M110 125C130 150 155 185 180 210"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Top-right botanical vine */}
      <motion.div
        className="absolute top-0 right-0 opacity-40 hidden md:block z-0"
        style={{ color: "var(--color-accent-wilderness)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M190 30C170 60 140 100 100 140C70 170 40 200 0 220"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="160" cy="70" r="2.5" fill="currentColor" />
          <circle cx="120" cy="130" r="2" fill="currentColor" />
          <circle cx="70" cy="180" r="2.5" fill="currentColor" />
          <path
            d="M150 85C135 105 115 130 90 155"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M110 125C90 150 65 185 40 210"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col justify-center items-center px-6 md:px-8 pt-16 md:pt-24 text-center">
        {/* Personal greeting */}
        <motion.p
          className="text-sm tracking-wide mb-4 italic"
          style={{ color: "var(--color-accent-olive)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome to, 
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="logo text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-2xl"
          style={{ color: "var(--color-accent-wilderness)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Life in Bloom
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
          style={{ color: "var(--color-neutral-grey)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          A journal of <span className="italic">soft living, intentional spaces,</span> and the <span className="italic">small, beautiful moments</span> that make life feel like it&rsquo;s finally blooming.
        </motion.p>

        {/* Warm invitation */}
        <motion.p
          className="text-sm mb-6"
          style={{ color: "var(--color-accent-peaches)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Pull up a chair, pour something warm, and read along. 🌷
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link href="/home" className="btn btn-primary">
            Explore
          </Link>
          <Link
            href="/about"
            className="btn btn-secondary"
            style={{
              color: "var(--color-accent-olive)",
              borderColor: "var(--color-accent-olive)",
            }}
          >
            About this space
          </Link>
        </motion.div>
      </div>

</section>
  );  
}
