"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { calculateReadingTimeFromPortableText, formatReadingTime } from "@/lib/readingTime";

type PostCardProps= {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image?: string;
  content?: any;
  publishedAt?: string;
  commentCount?: number;
};

export default function PostCard({
  title,
  slug,
  excerpt,
  category,
  image,
  content,
  publishedAt,
  commentCount,
}: PostCardProps) {
  // Trim excerpt to a readable length for cards
  const maxLength = 160;
  const excerptText = excerpt ?? "";
  const trimmedExcerpt =
    excerptText.length > maxLength
      ? excerptText.slice(0, maxLength).trimEnd() + "…"
      : excerptText;

  return (
    <motion.article 
      className="group card overflow-hidden rounded-2xl transition-shadow hover:shadow-lg p-6 md:p-10 bg-(--color-background-primary)"
      style={{ perspective: '1200px' }}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero image */}
      {image && (
        <figure className="mb-10 overflow-hidden rounded-lg">
          <Link href={`/blog/${slug}`} className="block">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-72 md:h-80 w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </Link>
        </figure>
      )}

      <div className="pb-2">
        <header className="mb-3">
          <p className="mb-2 text-xs uppercase tracking-wide text-(--color-accent-olive)">
            {category}
          </p>

            <h2 className="font-display text-2xl md:text-2xl leading-snug text-(--color-accent-wilderness) mb-2">
            <Link href={`/blog/${slug}`} className="group-hover:underline">
              {title}
            </Link>
          </h2>
        </header>

        <p className="font-body text-sm text-(--color-neutral-grey) leading-relaxed mb-4">
          {trimmedExcerpt}
        </p>

        {/* Reading time, published date, and comment count */}
        <div className="flex flex-wrap gap-4 mb-4 text-xs text-(--color-neutral-grey)">
          {content && (
            <span className="flex items-center gap-1">
              ⏱️ {formatReadingTime(calculateReadingTimeFromPortableText(content))}
            </span>
          )}
          {publishedAt && (
            <span>
              {new Date(publishedAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                },
              )}
            </span>
          )}
          {commentCount !== undefined && (
            <span>
              💬 {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
            </span>
          )}
        </div>

        <footer>
          <Link
            href={`/blog/${slug}`}
            className="btn btn-secondary btn-sm"
            aria-label={`Read more about ${title}`}
          >
            Read more
          </Link>
        </footer>
      </div>
    </motion.article>
  );
}
