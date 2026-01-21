import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

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
    category?: {
      title: string;
      slug: string;
    };
  }>;
};

export default function CategoryLayout({
  title,
  description,
  slug,
  currentPage,
  totalPages,
  posts,
}: CategoryLayoutProps) {
  return (
    <main>
      {/* Category Hero Section */}
      <section className="bg-(--color-background-primary) py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="font-display text-4xl md:text-5xl text-(--color-accent-wilderness) mb-6">
            {title}
          </h1>
          <p className="font-body text-lg text-(--color-neutral-grey) leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-(--color-background-secondary) py-24">
        <div className="max-w-6xl mx-auto px-8">
          {posts && posts.length > 0 ? (
            <>
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-16">
                {posts.map((post) => {
                  const imageUrl = post.coverImage
                    ? urlFor(post.coverImage).url()
                    : null;

                  return (
                    <article
                      key={post.slug}
                      className="group card overflow-hidden rounded-2xl transition-shadow hover:shadow-lg p-6 md:p-10 bg-(--color-background-primary)"
                    >
                      {/* Post Image */}
                      {imageUrl && (
                        <figure className="mb-10 overflow-hidden rounded-lg">
                          <Link href={`/blog/${post.slug}`} className="block">
                            <img
                              src={imageUrl}
                              alt={post.title}
                              loading="lazy"
                              className="h-56 md:h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </Link>
                        </figure>
                      )}

                      <div className="pb-2">
                        {/* Category Badge */}
                        {post.category && (
                          <p className="mb-2 text-xs uppercase tracking-wide text-(--color-accent-olive)">
                            {post.category.title}
                          </p>
                        )}

                        {/* Title */}
                        <header className="mb-3">
                          <h2 className="font-display text-2xl leading-snug text-(--color-accent-wilderness) mb-2">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="group-hover:underline"
                            >
                              {post.title}
                            </Link>
                          </h2>
                        </header>

                        {/* Excerpt */}
                        <p className="font-body text-sm text-(--color-neutral-grey) leading-relaxed mb-4">
                          {post.excerpt}
                        </p>

                        {/* Date */}
                        {post.publishedAt && (
                          <p className="text-xs text-(--color-neutral-grey) mb-4">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </p>
                        )}

                        {/* CTA */}
                        <footer>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="btn btn-secondary btn-sm"
                            aria-label={`Read more about ${post.title}`}
                          >
                            Read more
                          </Link>
                        </footer>
                      </div>
                    </article>
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
                        ? `/category/${slug}?page=${currentPage - 1}`
                        : "#"
                    }
                    aria-disabled={currentPage <= 1}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      currentPage <= 1
                        ? "border-(--color-neutral-cream) text-(--color-neutral-ash) cursor-not-allowed opacity-60"
                        : "border-(--color-accent-olive) text-(--color-accent-olive) hover:bg-(--color-accent-olive) hover:text-(--color-background-primary) transition-colors"
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
                        ? `/category/${slug}?page=${currentPage + 1}`
                        : "#"
                    }
                    aria-disabled={currentPage >= totalPages}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      currentPage >= totalPages
                        ? "border-(--color-neutral-cream) text-(--color-neutral-ash) cursor-not-allowed opacity-60"
                        : "border-(--color-accent-olive) text-(--color-accent-olive) hover:bg-(--color-accent-olive) hover:text-(--color-background-primary) transition-colors"
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
                No posts found in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
