'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "framer-motion";
import Card3d from "./card3d";
import RotatingFlower from "./rotatingFlower";
import Floating3dLeaf from "./floating3dLeaf";
import GlowingAccent from "./glowingAccent";
import NewsletterForm from "./newsletterForm";
import PostCard from "./postCard";

type CategoryLayoutProps = {
  title: string;
  description: string;
  slug: string;
  currentPage: number;
  totalPages: number;
  posts: Array<{
    title: string;
    slug: string;
    excerpt: string;
    content?: any;
    coverImage?: {
      asset: {
        _ref: string;
      };
      crop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
      hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
      };
    };
    publishedAt?: string;
    commentCount?: number;
    category?: {
      title: string;
      slug: string;
    };
  }>;
  subcategories?: Array<{
    title: string;
    slug: string;
  }>;
  selectedSubcategory?: string;
  isSubcategory?: boolean;
};

export default function CategoryLayout({
  title,
  description,
  slug,
  currentPage,
  totalPages,
  posts,
  subcategories = [],
  selectedSubcategory,
  isSubcategory = false,
}: CategoryLayoutProps) {
  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    }
  }, []);
  return (
    <main className="overflow-x-hidden">
      {/* Category Hero Section */}
      <section className="relative bg-(--color-background-primary) py-16 md:py-24 overflow-hidden">
        {/* 3D Elements */}
        <RotatingFlower position="top-left" size={100} delay={0.5} />
        <Floating3dLeaf delay={0} scale={1} />
        <Floating3dLeaf delay={1.5} scale={0.9} />
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <motion.h1 
            className="font-display text-4xl md:text-5xl text-(--color-accent-wilderness) mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="font-body text-lg text-(--color-neutral-grey) leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Subcategory Filter */}
      {subcategories && subcategories.length > 0 && (
        <section className="relative bg-(--color-background-secondary) py-8 border-b border-(--color-neutral-cream)">
          <div className="max-w-6xl mx-auto px-8">
            <motion.div 
              className="flex flex-wrap gap-3 items-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-(--color-neutral-grey)">Filter by:</span>
              <Link
                href={{ pathname: `/category/${slug}` }}
                onClick={scrollToTop}
                aria-current={!selectedSubcategory ? "page" : undefined}
                className={`px-4 py-2 rounded-full text-sm font-body transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-olive) focus-visible:ring-offset-2 ${
                  !selectedSubcategory
                    ? "bg-(--color-accent-olive) text-(--color-background-primary)"
                    : "border border-(--color-accent-olive) text-(--color-accent-olive) hover:bg-(--color-accent-olive) hover:text-(--color-background-primary)"
                }`}
              >
                All
              </Link>
              {subcategories.map((subcat) => (
                <Link
                  key={subcat.slug}
                  href={{
                    pathname: `/category/${slug}`,
                    query: { subcategory: subcat.slug },
                  }}
                  onClick={scrollToTop}
                  aria-current={selectedSubcategory === subcat.slug ? "page" : undefined}
                  className={`px-4 py-2 rounded-full text-sm font-body transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-olive) focus-visible:ring-offset-2 ${
                    selectedSubcategory === subcat.slug
                      ? "bg-(--color-accent-olive) text-(--color-background-primary)"
                      : "border border-(--color-accent-olive) text-(--color-accent-olive) hover:bg-(--color-accent-olive) hover:text-(--color-background-primary)"
                  }`}
                >
                  {subcat.title}
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="relative bg-(--color-background-secondary) py-24">
        <GlowingAccent position="bottom-right" size={250} color="terracotta" />
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedSubcategory ?? 'all'}-${currentPage}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.36 }}
              layout
            >
              {posts && posts.length > 0 ? (
                <>
                  <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-16">
                    {posts.map((post, idx) => {
                  const imageUrl = post.coverImage
                    ? urlFor(post.coverImage).url()
                    : null;

                  return (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <PostCard
                        title={post.title}
                        slug={post.slug}
                        excerpt={post.excerpt}
                        category={post.category?.title ?? "Life in Bloom"}
                        image={imageUrl}
                        content={post.content}
                        publishedAt={post.publishedAt}
                        commentCount={post.commentCount}
                      />
                    </motion.div>
                  );
                })}
              </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="flex items-center justify-center gap-4 mt-4">
                  {/* Previous */}
                  <Link
                    href={
                      currentPage > 1
                        ? {
                            pathname: `/category/${slug}`,
                            query: selectedSubcategory
                              ? { page: currentPage - 1, subcategory: selectedSubcategory }
                              : { page: currentPage - 1 },
                          }
                        : "#"
                    }
                    onClick={scrollToTop}
                    aria-disabled={currentPage <= 1}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      currentPage <= 1
                        ? "border-(--color-neutral-cream) text-(--color-neutral-ash) cursor-not-allowed opacity-60"
                        : "border-(--color-accent-olive) text-(--color-accent-olive) hover:bg-(--color-accent-olive) hover:text-(--color-background-primary) transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-olive) focus-visible:ring-offset-2"
                    }`}
                  >
                    Previous
                  </Link>

                  <span className="text-sm text-(--color-neutral-grey)">
                    Page {currentPage} of {totalPages}
                  </span>

                  {/* Next */}
                  <Link
                    href={
                      currentPage < totalPages
                        ? {
                            pathname: `/category/${slug}`,
                            query: selectedSubcategory
                              ? { page: currentPage + 1, subcategory: selectedSubcategory }
                              : { page: currentPage + 1 },
                          }
                        : "#"
                    }
                    onClick={scrollToTop}
                    aria-disabled={currentPage >= totalPages}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      currentPage >= totalPages
                        ? "border-(--color-neutral-cream) text-(--color-neutral-ash) cursor-not-allowed opacity-60"
                        : "border-(--color-accent-olive) text-(--color-accent-olive) hover:bg-(--color-accent-olive) hover:text-(--color-background-primary) transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-olive) focus-visible:ring-offset-2"
                    }`}
                  >
                    Next
                  </Link>
                    </nav>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="font-body text-lg text-(--color-neutral-grey)">
                    {isSubcategory 
                      ? "No posts found in this subcategory yet. Check back soon!"
                      : "No posts found in this category yet. Check back soon!"
                    }
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative bg-(--color-background-primary) py-20 border-t border-(--color-neutral-cream)">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-(--color-accent-wilderness) mb-4">
              Stay in the Bloom
            </h2>
            <p className="font-body text-neutral-grey mb-8">
              Get our latest posts, tips, and inspiration delivered straight to your inbox.
            </p>
            <NewsletterForm variant="full" />
          </motion.div>
        </div>
      </section>    </main>
  );
}