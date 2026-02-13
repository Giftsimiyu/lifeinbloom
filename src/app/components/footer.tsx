"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import NewsletterForm from "./newsletterForm";
import GlowingAccent from "./glowingAccent";

export default function Footer() {
  return (
    <footer className="relative bg-(--color-background-secondary) border-t border-(--color-neutral-cream) overflow-hidden">
      {/* Subtle 3D background effects */}
      <GlowingAccent position="bottom-left" size={200} opacity={0.05} color="olive" />
      <GlowingAccent position="top-right" size={180} opacity={0.04} color="terracotta" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 grid gap-8 md:grid-cols-2 z-10">
        {/* vertical divider (md+) */}
        <div
          className="hidden md:block absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-(--color-neutral-cream)"
          aria-hidden
        />
        {/* Left column */}
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Image
            src="/LIB-logo.jpg"
            alt="Life in Bloom Logo"
            width={150}
            height={56}
            className="mb-2 block"
          />

          <div className="flex flex-col mb-3">
            <p className="logo text-md">Life in Bloom</p>
            <p className="text-(--font-accent-olive) text-sm italic">
              Exploring the beauty in living
            </p>
          </div>

          {/* Social links with icons */}
          <div className="flex gap-4 items-center justify-center">
            <motion.a 
              href="/" 
              target="_blank" 
              aria-label="Instagram"
              whileHover={{ scale: 1.2, rotate: 12 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <FaInstagram className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors" />
            </motion.a>
            <motion.a 
              href="/" 
              target="_blank" 
              aria-label="Pinterest"
              whileHover={{ scale: 1.2, rotate: 12 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <FaPinterest className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors " />
            </motion.a>
            <motion.a 
              href="/" 
              target="_blank" 
              aria-label="Twitter"
              whileHover={{ scale: 1.2, rotate: 12 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <FaTwitter className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors " />
            </motion.a>
            <motion.a 
              href="/" 
              target="_blank" 
              aria-label="LinkedIn"
              whileHover={{ scale: 1.2, rotate: 12 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <FaLinkedin className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors " />
            </motion.a>
          </div>

          {/* Newsletter (optional) */}
          <motion.div 
            className="mt-6 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <NewsletterForm />
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h4 className="font-body text-sm uppercase tracking-wide text-(--color-accent-olive) mb-6">
            Explore
          </h4>

          <ul className="space-y-4 font-body text-sm text-(--color-neutral-grey)">
            <motion.li whileHover={{ x: 5 }}>
              <Link
                href="category/velvet-and-vine"
                className="hover:text-(--color-accent-terracotta) transition-colors"
              >
                Velvet &amp; Vine
              </Link>
            </motion.li>
            <motion.li whileHover={{ x: 5 }}>
              <Link
                href="category/blooming-home"
                className="hover:text-(--color-accent-terracotta) transition-colors"
              >
                The Blooming Home
              </Link>
            </motion.li>
            <motion.li whileHover={{ x: 5 }}>
              <Link
                href="category/soft-living"
                className="hover:text-(--color-accent-terracotta) transition-colors"
              >
                Soft Living
              </Link>
            </motion.li>
            <motion.li whileHover={{ x: 5 }}>
              <Link
                href="category/verses-and-vinyl"
                className="hover:text-(--color-accent-terracotta) transition-colors"
              >
                Verses &amp; Vinyl
              </Link>
            </motion.li>
            <motion.li whileHover={{ x: 5 }}>
              <Link
                href="category/in-bloom"
                className="hover:text-(--color-accent-terracotta) transition-colors"
              >
                In Bloom
              </Link>
            </motion.li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom note */}
      <div className="relative border-t border-(--color-neutral-cream) py-6 z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
          <p className="font-body text-xs text-(--color-neutral-grey) mb-3">
            © {new Date().getFullYear()} Life in Bloom. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 font-body text-xs">
            <Link
              href="/privacy"
              className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-(--color-neutral-cream)">|</span>
            <Link
              href="/terms"
              className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
