'use client';

import PostIdeaForm from "@/app/components/postIdeaForm";
import { motion } from "framer-motion";

export default function SuggestPageClient() {
  return (
    <main className="min-h-screen bg-(--color-background-secondary) overflow-x-hidden">
      <section className="relative bg-(--color-background-primary) py-16 md:py-24 overflow-hidden">
        <div className="max-w-3xl mx-auto px-8 relative z-10 text-center">
          <motion.h1
            className="font-display text-4xl md:text-5xl text-(--color-accent-wilderness) mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Suggest a Post
          </motion.h1>
          <motion.p
            className="font-body text-lg text-(--color-neutral-grey) leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a topic you’d love to see? Send it in — your ideas help shape this space.
          </motion.p>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-2xl mx-auto px-8 relative z-10">
          <motion.div
            className="bg-(--color-background-primary) rounded-2xl p-8 md:p-12 border border-(--color-neutral-light) shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-display text-2xl text-(--color-accent-wilderness) mb-8">
              Your Idea
            </h2>
            <PostIdeaForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
