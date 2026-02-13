"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Card3d from "./card3d";

type Category = {
  title: string;
  description?: string;
  slug: string;
};

export default function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <div className="max-w-5xl mx-auto px-8 relative z-10">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8">
        <Link href="/home" className="text-(--color-accent-olive) hover:text-(--color-accent-wilderness)">
          Home
        </Link>
        <span className="text-(--color-neutral-grey) mx-2">/</span>
        <span className="text-(--color-accent-olive)">Categories</span>
      </nav>

      <header className="mb-12 text-center">
        <motion.h1
          className="font-display text-4xl md:text-5xl text-(--color-accent-wilderness)"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Categories
        </motion.h1>
        <motion.p
          className="mt-4 text-sm text-(--color-neutral-grey)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Wander through every corner of Life in Bloom.
        </motion.p>
      </header>

      {categories.length === 0 ? (
        <p className="text-center text-(--color-neutral-grey)">No categories yet.</p>
      ) : (
        <section className="grid gap-8 md:grid-cols-2">
          {categories.map((cat: Category, idx: number) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card3d>
                <Link
                  href={`/category/${cat.slug}`}
                  className="group p-6 rounded-2xl bg-(--color-background-primary) border border-(--color-neutral-light) hover:border-(--color-accent-olive) transition-all block h-full"
                >
                  <h2 className="font-display text-xl text-(--color-accent-wilderness) group-hover:text-(--color-accent-olive) mb-2">
                    {cat.title}
                  </h2>
                  {cat.description && (
                    <p className="text-sm text-(--color-neutral-grey) leading-relaxed">{cat.description}</p>
                  )}
                  <p className="mt-4 text-xs uppercase tracking-wide text-(--color-neutral-grey)">Explore →</p>
                </Link>
              </Card3d>
            </motion.div>
          ))}
        </section>
      )}
    </div>
  );
}
