"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import GlowingAccent from "@/app/components/glowingAccent";
import NewsletterForm from "@/app/components/newsletterForm";
import PostCard from "@/app/components/postCard";

type SearchContentProps = {
  query: string;
  results: any[];
};

export default function SearchContent({ query, results }: SearchContentProps) {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-8 py-4 text-sm">
        <Link href="/home" className="text-(--color-accent-olive) hover:text-(--color-accent-wilderness)">
          Home
        </Link>
        <span className="text-(--color-neutral-grey) mx-2">/</span>
        <span className="text-(--color-accent-olive)">Search</span>
      </nav>

      {/* Search Header */}
      <section className="relative bg-(--color-background-primary) py-16 md:py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <motion.h1
            className="font-display text-3xl md:text-4xl text-(--color-accent-wilderness) mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Search Results
          </motion.h1>
          <motion.p
            className="font-body text-(--color-neutral-grey)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {query && (
              <>
                Results for: <span className="font-semibold">"{query}"</span>
              </>
            )}
            {!query && "Enter a search term to get started"}
          </motion.p>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 relative">
        <GlowingAccent position="bottom-right" size={300} color="terracotta" />
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          {results.length > 0 ? (
            <>
              <p className="text-sm text-(--color-neutral-grey) mb-8">
                Found {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                {results.map((post, idx) => {
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
            </>
          ) : query ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-(--color-accent-wilderness) mb-4">
                No results found
              </p>
              <p className="font-body text-(--color-neutral-grey) mb-8">
                We couldn't find any posts matching "{query}". Try different
                keywords or explore our categories.
              </p>
              <Link href="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-body text-(--color-neutral-grey) mb-8">
                Use the search bar to find posts by title, content, or keywords.
              </p>
              <Link href="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          )}
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
              Stay Updated
            </h2>
            <p className="font-body text-neutral-grey mb-8">
              Never miss a post. Subscribe to get the latest content delivered to your inbox.
            </p>
            <NewsletterForm variant="full" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
