'use client';

import { Metadata } from "next";
import ContactForm from "@/app/components/contactForm";
import { motion } from "framer-motion";
import GlowingAccent from "@/app/components/glowingAccent";
import RotatingFlower from "@/app/components/rotatingFlower";
import Floating3dLeaf from "@/app/components/floating3dLeaf";
import {
  FaEnvelope,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";



export default function ContactPage() {
  return (
    <main className="min-h-screen bg-(--color-background-secondary)">
      {/* Hero Section */}
      <section className="relative bg-(--color-background-primary) py-16 md:py-24 overflow-hidden">
        {/* 3D Elements */}
        <RotatingFlower position="top-right" size={100} delay={0} />
        <Floating3dLeaf delay={0.5} scale={1.1} />
        <Floating3dLeaf delay={2} scale={0.8} />

        <div className="max-w-3xl mx-auto px-8 relative z-10">
          <motion.h1 
            className="font-display text-4xl md:text-5xl text-(--color-accent-wilderness) mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="font-body text-lg text-(--color-neutral-grey) leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a question, collaboration idea, or just want to say hello? We'd
            love to hear from you. Reach out using the form below or connect
            with us on social media.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 relative">
        <GlowingAccent position="bottom-left" size={280} color="terracotta" />
        <div className="max-w-2xl mx-auto px-8 relative z-10">
          <motion.div 
            className="bg-(--color-background-primary) rounded-2xl p-8 md:p-12 border border-(--color-neutral-light) shadow-sm"
            style={{ perspective: '1200px' }}
            whileHover={{
              rotateX: 3,
              rotateY: -3,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-display text-2xl text-(--color-accent-wilderness) mb-8">
              Send us a message
            </h2>

            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-(--color-background-primary) py-20 relative">
        <GlowingAccent position="top-right" size={250} color="sage" />
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <h2 className="font-display text-2xl text-(--color-accent-wilderness) mb-12 text-center">
            Other ways to reach us
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Email */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-(--color-accent-olive)/10 mb-4"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <svg
                  className="w-6 h-6 text-(--color-accent-olive)"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m10 9 5 3.5M2 6l10 7 10-7" />
                </svg>
              </motion.div>
              <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-2">
                Email
              </h3>
              <p className="font-body text-(--color-neutral-grey)">
                hello@lifeinbloom.com
              </p>
            </motion.div>

            {/* Social Media */}

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-6">
                Follow Us
              </h3>

              <div className="space-y-6">
                <p className="font-body text-(--color-neutral-grey) text-sm">
                  @lifeinbloomblog
                </p>

                <div className="flex gap-4 items-center justify-center">
                  <motion.a 
                    href="/" 
                    target="_blank" 
                    aria-label="Email"
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <FaEnvelope className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors" />
                  </motion.a>
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
              </div>
            </motion.div>

            {/*<div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-(--color-accent-olive)/10 mb-4">
                <svg
                  className="w-6 h-6 text-(--color-accent-olive)"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </div>
              <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-2">
                Follow Us
              </h3>
              <div className="space-y-2">
                <p className="font-body text-(--color-neutral-grey) text-sm">
                  @lifeinbloomblog
                </p>
                <p className="font-body text-xs text-(--color-neutral-grey)">
                  Instagram • Pinterest • Twitter
                </p>
              </div>
            </div>*/}
          </div>
        </div>
      </section>
    </main>
  );
}
