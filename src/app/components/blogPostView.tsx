import { PortableText } from "next-sanity";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import AuthorCard from "./authorCard";
import CommentsSection from "./commentsSection";
import TagsDisplay from "./tagsDisplay";
import ImageGallery from "./imageGallery";
import NewsletterPrompt from "./newsletterPrompt";
import PostSidebar from "./postSidebar";
import TableOfContentsDropdown from "./tableOfContentsDropdown";
import { calculateReadingTimeFromPortableText, formatReadingTime } from "@/lib/readingTime";

type GalleryImage = {
  _key?: string;
  url: string;
  alt?: string;
};

type BlogPostViewProps = {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    coverImage?: any;
    content?: any;
    publishedAt?: string;
    tags?: string[];
    category?: {
      title: string;
      slug: string;
    };
    seo?: {
      title?: string;
      description?: string;
    };
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
    gallery?: GalleryImage[];
  };
  relatedPosts?: Array<{
    title: string;
    slug: string;
    excerpt: string;
    coverImage?: any;
    content?: any;
    publishedAt?: string;
    commentCount?: number;
    category?: {
      title: string;
      slug: string;
    };
  }>;
};

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <figure className="my-12">
          <img
            src={urlFor(value).url()}
            alt={value.alt || "Post image"}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-sm text-(--color-neutral-grey) text-center mt-4">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children, value }: any) => {
      const headingId = `heading-${value._key || Math.random().toString(36).substr(2, 9)}`;
      return (
        <h1 data-heading-id={headingId} className="font-display text-4xl md:text-5xl text-(--color-accent-wilderness) mb-6 leading-tight">
          {children}
        </h1>
      );
    },
    h2: ({ children, value }: any) => {
      const headingId = `heading-${value._key || Math.random().toString(36).substr(2, 9)}`;
      return (
        <h2 data-heading-id={headingId} className="font-display text-3xl text-(--color-accent-wilderness) mt-12 mb-6">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }: any) => {
      const headingId = `heading-${value._key || Math.random().toString(36).substr(2, 9)}`;
      return (
        <h3 data-heading-id={headingId} className="font-display text-2xl text-(--color-accent-olive) mt-8 mb-4">
          {children}
        </h3>
      );
    },
    h4: ({ children, value }: any) => {
      const headingId = `heading-${value._key || Math.random().toString(36).substr(2, 9)}`;
      return (
        <h4 data-heading-id={headingId} className="font-display text-xl text-(--color-accent-wilderness) mt-6 mb-3">
          {children}
        </h4>
      );
    },
    normal: ({ children }: any) => (
      <p className="font-body text-base leading-relaxed text-(--color-neutral-dark) mb-6">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-(--color-accent-wilderness)">
        {children}
      </strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 my-6 text-(--color-neutral-dark)">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 my-6 text-(--color-neutral-dark)">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
    number: ({ children }: any) => <li className="ml-4">{children}</li>,
  },
};

export default function BlogPostView({
  post,
  relatedPosts = [],
}: BlogPostViewProps) {
  const imageUrl = post.coverImage ? urlFor(post.coverImage).url() : null;

  return (
    <main>
      {/* Blog Post Header - Full Width */}
      <section className="bg-(--color-background-primary)">
        <div className="max-w-6xl mx-auto px-8 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 text-(--color-neutral-grey)">
            <Link href="/home" className="hover:text-(--color-accent-olive)">
              Home
            </Link>
            <span>/</span>
            {post.category && (
              <>
                <Link
                  href={`/category/${post.category.slug}`}
                  className="hover:text-(--color-accent-olive)"
                >
                  {post.category.title}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-(--color-accent-olive)">{post.title}</span>
          </nav>

          {/* Category Badge */}
          {post.category && (
            <p className="text-xs uppercase tracking-widest text-(--color-accent-olive) mb-4">
              {post.category.title}
            </p>
          )}

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl text-(--color-accent-wilderness) mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm text-(--color-neutral-grey) mb-12 pb-8 border-b border-(--color-neutral-light)">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            
            {post.author && (
              <span>
                by <strong>{post.author.name}</strong>
              </span>
            )}
            
            {post.content && (
              <span>
                ⏱️ {formatReadingTime(calculateReadingTimeFromPortableText(post.content))}
              </span>
            )}

          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <TagsDisplay tags={post.tags} />
            </div>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {imageUrl && (
        <figure className="mb-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-96 md:h-128 object-cover"
            loading="lazy"
          />
        </figure>
      )}

      {/* Main Content Section with Sidebar */}
      <article className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto px-8 py-16">
        {/* Left Content Area - 2 columns */}
        <div className="lg:col-span-2">
          {/* Image Gallery (top-level gallery field) */}
          {post.gallery && post.gallery.length > 0 && (
            <div className="mb-16">
              <ImageGallery images={post.gallery} />
            </div>
          )}

          {/* Table of Contents Dropdown */}
          {post.content && (
            <TableOfContentsDropdown content={post.content} />
          )}

          {/* Post Content */}
          <div className="prose prose-lg max-w-none mb-16">
            {post.content ? (
              <PortableText
                value={post.content}
                components={portableTextComponents}
              />
            ) : (
              <p className="text-(--color-neutral-grey) italic">
                No content available for this post.
              </p>
            )}
          </div>

         
        </div>

        {/* Right Sidebar - 1 column */}
        <aside className="hidden lg:block">
          <PostSidebar
            postSlug={post.slug}
            postTitle={post.title}
            postExcerpt={post.excerpt}
            postTags={post.tags}
            relatedPosts={relatedPosts}
            author={post.author}
          />
        </aside>
      </article>

      {/* Related Posts Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-(--color-background-secondary) py-20">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-12">
              You might also like
            </h2>

            <div className="grid gap-12 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => {
                const relatedImageUrl = relatedPost.coverImage
                  ? urlFor(relatedPost.coverImage).url()
                  : null;

                return (
                  <article
                    key={relatedPost.slug}
                    className="group card overflow-hidden rounded-2xl transition-shadow hover:shadow-lg p-6 md:p-10 bg-(--color-background-primary)"
                  >
                    {relatedImageUrl && (
                      <figure className="mb-10 overflow-hidden rounded-lg">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="block"
                        >
                          <img
                            src={relatedImageUrl}
                            alt={relatedPost.title}
                            loading="lazy"
                            className="h-56 md:h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </Link>
                      </figure>
                    )}

                    <div className="pb-2">
                      {relatedPost.category && (
                        <p className="mb-2 text-xs uppercase tracking-wide text-(--color-accent-olive)">
                          {relatedPost.category.title}
                        </p>
                      )}

                      <header className="mb-3">
                        <h3 className="font-display text-xl leading-snug text-(--color-accent-wilderness) mb-2">
                          <Link
                            href={`/blog/${relatedPost.slug}`}
                            className="group-hover:underline"
                          >
                            {relatedPost.title}
                          </Link>
                        </h3>
                      </header>

                      <p className="font-body text-sm text-(--color-neutral-grey) leading-relaxed mb-4">
                        {relatedPost.excerpt}
                      </p>

                      {/* Reading time, published date, and comment count */}
                      <div className="flex flex-wrap gap-4 mb-4 text-xs text-(--color-neutral-grey)">
                        {relatedPost.content && (
                          <span className="flex items-center gap-1">
                            ⏱️ {formatReadingTime(calculateReadingTimeFromPortableText(relatedPost.content))}
                          </span>
                        )}
                        {relatedPost.publishedAt && (
                          <span>
                            {new Date(relatedPost.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        )}
                        {relatedPost.commentCount !== undefined && (
                          <span>
                            💬 {relatedPost.commentCount} {relatedPost.commentCount === 1 ? 'comment' : 'comments'}
                          </span>
                        )}
                      </div>

                      <footer>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="btn btn-secondary btn-sm"
                          aria-label={`Read more about ${relatedPost.title}`}
                        >
                          Read more
                        </Link>
                      </footer>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section className="bg-(--color-background-primary) py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-12">
            Reader Comments
          </h2>
          <CommentsSection postSlug={post.slug} />
        </div>
      </section>

      {/* Newsletter Subscription Prompt on Scroll */}
      <NewsletterPrompt />
    </main>
  );
}
