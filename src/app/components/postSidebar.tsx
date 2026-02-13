'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import NewsletterForm from "./newsletterForm";
import TagsDisplay from "./tagsDisplay";
import SocialShare from "./socialShare";

type PostSidebarProps = {
  postSlug: string;
  postTitle: string;
  postExcerpt: string;
  postTags?: string[];
  postContent?: any;
  relatedPosts?: Array<{
    title: string;
    slug: string;
    excerpt: string;
    coverImage?: any;
  }>;
  author?: {
    _id: string;
    name: string;
    bio?: string;
    image?: {
      asset: {
        _ref: string;
      };
    };
  };
};

export default function PostSidebar({
  postSlug,
  postTitle,
  postExcerpt,
  postTags = [],
  relatedPosts = [],
  author,
}: PostSidebarProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.aside
      className="space-y-10 sticky top-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* About Me Section */}
      {author && (
        <motion.div
          variants={itemVariants}
          className="text-center bg-(--color-background-secondary) rounded-2xl p-8 border border-(--color-neutral-cream)"
        >
          <div className="flex justify-center mb-6">
            {author.image ? (
              <img
                src={urlFor(author.image).width(128).height(128).url()}
                alt={author.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-(--color-accent-olive) shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-(--color-neutral-cream) border-4 border-(--color-accent-olive) flex items-center justify-center shadow-lg">
                <span className="text-4xl text-(--color-neutral-grey) font-bold">
                  {author.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-3">
            About the Author
          </h3>
          <p className="text-sm font-semibold text-(--color-accent-olive) mb-3">
            {author.name}
          </p>
          {author.bio && (
            Array.isArray(author.bio) ? (
              <div className="prose prose-sm max-w-none mb-6 line-clamp-3 text-(--color-neutral-grey)">
                <PortableText value={author.bio} />
              </div>
            ) : (
              <div className="prose prose-sm max-w-none mb-6 line-clamp-3 text-(--color-neutral-grey)">
                <p>{author.bio}</p>
              </div>
            )
          )}
          <Link
            href="/about/the-author"
            className="inline-block text-sm font-semibold text-(--color-accent-olive) hover:text-(--color-accent-wilderness) transition-colors border-b border-(--color-accent-olive) hover:border-(--color-accent-wilderness)"
          >
            Learn more about the author →
          </Link>
        </motion.div>
      )}

      {/* Newsletter Section */}
      <motion.div
        variants={itemVariants}
        className="bg-(--color-background-secondary) rounded-2xl p-6 border border-(--color-neutral-cream)"
      >
        <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-3">
          Stay in the Bloom
        </h3>
        <p className="text-sm text-(--color-neutral-grey) mb-4">
          Get our latest posts delivered to your inbox.
        </p>
        <NewsletterForm variant="sidebar" />
      </motion.div>

      {/* Share Buttons */}
      <motion.div
        variants={itemVariants}
        className="bg-(--color-background-secondary) rounded-2xl p-6 border border-(--color-neutral-cream)"
      >
        <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-4">
          Share This
        </h3>
        <SocialShare
          title={postTitle}
          slug={postSlug}
          excerpt={postExcerpt}
        />
      </motion.div>

      {/* Tags */}
      {postTags && postTags.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-(--color-background-secondary) rounded-2xl p-6 border border-(--color-neutral-cream)"
        >
          <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-4">
            Topics
          </h3>
          <TagsDisplay tags={postTags} />
        </motion.div>
      )}

      
      
    </motion.aside>
  );
}
