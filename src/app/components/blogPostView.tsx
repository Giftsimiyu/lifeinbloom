import { PortableText } from "next-sanity";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import {
  calculateReadingTimeFromPortableText,
  formatReadingTime,
} from "@/lib/readingTime";
import AuthorCard from "./authorCard";
import CommentsSection from "./commentsSection";
import TagsDisplay from "./tagsDisplay";
import SocialShare from "./socialShare";
import TableOfContents from "./tableOfContents";
import ImageGallery from "./imageGallery";

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
    publishedAt?: string;
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
    h2: ({ children }: any) => (
      <h2 className="font-display text-3xl text-(--color-accent-wilderness) mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-display text-2xl text-(--color-accent-olive) mt-8 mb-4">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="font-body text-base leading-relaxed text-(--color-neutral-dark) mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-(--color-accent-olive) pl-6 py-4 my-8 italic text-(--color-neutral-grey)">
        {children}
      </blockquote>
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
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-(--color-accent-olive) hover:text-(--color-accent-wilderness) transition-colors"
      >
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
      {/* Blog Post Header */}
      <article className="max-w-3xl mx-auto px-8 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 text-(--color-neutral-grey)">
          <Link href="/" className="hover:text-(--color-accent-olive)">
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
          {post.content && (
            <span>
              {formatReadingTime(
                calculateReadingTimeFromPortableText(post.content),
              )}
            </span>
          )}
          {post.excerpt && (
            <p className="text-(--color-neutral-dark) italic md:ml-auto">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8">
            <TagsDisplay tags={post.tags} />
          </div>
        )}

        {/* Social Share */}
        <div className="mb-12 pb-12 border-b border-(--color-neutral-light)">
          <SocialShare
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        </div>

        {/* Featured Image */}
        {imageUrl && (
          <figure className="mb-12 -mx-8 md:mx-0 md:rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-96 md:h-128 object-cover"
              loading="lazy"
            />
          </figure>
        )}

        {/* Image Gallery (top-level gallery field) */}
        {post.gallery && post.gallery.length > 0 && (
          <div className="mb-16">
            <ImageGallery images={post.gallery} />
          </div>
        )}

        {/* Post Content with Table of Contents Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-3 prose prose-lg max-w-none">
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

          {/* Table of Contents Sidebar */}
          {post.content && (
            <div className="hidden lg:block">
              <TableOfContents content={post.content} />
            </div>
          )}
        </div>

        {/* Author Card */}
        {post.author && (
          <div className="mt-16">
            <AuthorCard author={post.author} />
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-16">
          <CommentsSection postSlug={post.slug} />
        </div>
      </article>

      {/* Related Posts Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-(--color-background-secondary) py-20">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-12">
              More from {post.category?.title}
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

                      {relatedPost.publishedAt && (
                        <p className="text-xs text-(--color-neutral-grey) mb-4">
                          {new Date(relatedPost.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      )}

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
    </main>
  );
}
