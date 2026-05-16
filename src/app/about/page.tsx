'use client';

import { category } from "@/sanity/schemaTypes/category";
import Link from "next/link";
import { motion } from "framer-motion";
import RotatingFlower from "@/app/components/rotatingFlower";
import Floating3dLeaf from "@/app/components/floating3dLeaf";
import GlowingAccent from "@/app/components/glowingAccent";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-(--color-background-secondary) overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-(--color-background-primary) py-20 md:py-32 overflow-hidden">
        {/* 3D Decorative elements */}
        <RotatingFlower position="top-right" size={100} delay={0} />
        <RotatingFlower position="bottom-left" size={80} delay={2} />
        <Floating3dLeaf delay={0} scale={1.2} />
        <Floating3dLeaf delay={1.5} scale={0.9} />
        
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <motion.h1 
            className="font-display text-5xl md:text-6xl text-(--color-accent-wilderness) mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            About Life in Bloom
          </motion.h1>
          <motion.p 
            className="font-body text-xl text-(--color-neutral-grey) leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="mb-4">Life in Bloom is where everyday life is allowed to be enough. Here, we talk about style that feels personal, homes that feel lived in, and the quiet work of becoming happy in a world that constantly asks for more.</p>

            <p>This blog was created as a space to connect with different people around the world, inspire you to live a happier and meaningful life on your own terms, offload those heavy thoughts that constantly pull you down. It is as much for you as it is for me. I hope you find something here that makes you feel a little less alone, a little more inspired, and a little more ready to bloom in your own way.</p>
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 relative">
        <GlowingAccent position="top-right" size={250} color="olive" />
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-6">
                Our Mission
              </h2>
              <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed mb-4">
                Life in Bloom exists to create a sanctuary where you can slow
                down, breathe, and reconnect with what truly matters. We believe
                that beauty isn't just in the extraordinary—it's woven into the
                simple and quiet moments, and the intentional choices we
                make every day.
              </p>
              <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed">
                Through thoughtful writing and curated inspiration, we explore
                soft living, sustainable style, home as a refuge, and the gentle
                growth that comes from being kind to yourself.
              </p>
            </motion.div>
            <motion.div 
              className="bg-linear-to-br from-(--color-accent-olive)/10 to-(--color-accent-terracotta)/10 rounded-2xl p-12 flex items-center justify-center min-h-96"
              style={{ perspective: '1000px' }}
              whileHover={{
                rotateX: 5,
                rotateY: -5,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🌿</div>
                <p className="font-display text-2xl text-(--color-accent-olive)">
                  Growing Gently
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="bg-(--color-background-primary) py-24">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-12 text-center">
            What We Explore
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🏡",
                title: "The Blooming Home",
                description:
                  "Interior design, DIY projects, and creating spaces that feel like sanctuaries.",
              },
              {
                icon: "✨",
                title: "Velvet & Vine",
                description:
                  "Fashion, beauty, and personal style as a form of self-expression.",
              },
              {
                icon: "🌸",
                title: "Soft Living",
                description:
                  "Wellness, self-care rituals, and embracing a gentler approach to life.",
              },
              {
                icon: "🌱",
                title: "In Bloom",
                description:
                  "Personal stories, reflections, and the beautiful journey of growth.",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="p-8 bg-(--color-background-secondary) rounded-2xl border border-(--color-neutral-light) hover:border-(--color-accent-olive) transition-all"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-display text-xl text-(--color-accent-wilderness) mb-3">
                  {category.title}
                </h3>
                <p className="font-body text-(--color-neutral-grey)">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-12 text-center">
            Our Values
          </h2>
          <div className="space-y-8">
            {[
              {
                value: "Intentionality",
                description:
                  "We believe in making conscious choices that align with our values and bring us joy.",
              },
              {
                value: "Authenticity",
                description:
                  "Real life isn't always perfect, and we celebrate the beauty in the messy, genuine moments.",
              },
              {
                value: "Wellness",
                description:
                  "Mental, emotional, and physical wellbeing are interconnected and deserve attention.",
              },
              {
                value: "Community",
                description:
                  "You are not alone on this journey. Let's grow and bloom together.",
              },
              {
                value: "Sustainability",
                description:
                  "Small, mindful choices matter. We're committed to living gently with ourselves and our planet.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-6 pb-8 border-b border-(--color-neutral-light) last:border-0"
              >
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-(--color-accent-olive)/10">
                    <svg
                      className="h-6 w-6 text-(--color-accent-olive)"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-2">
                    {item.value}
                  </h3>
                  <p className="font-body text-(--color-neutral-grey)">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-(--color-background-secondary)">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-6">
            Ready to Explore?
          </h2>
          <p className="font-body text-lg text-(--color-neutral-grey) mb-8 leading-relaxed">
            Dive into our latest posts, explore a category that speaks to you,
            or sign up for our newsletter to receive gentle reminders to slow
            down.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/home" className="btn btn-primary">
              Back to Home
            </Link>
            <Link href="/category" className="btn btn-secondary">
              Explore Categories
            </Link>
            <Link href="/contact" className="btn btn-tertiary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
