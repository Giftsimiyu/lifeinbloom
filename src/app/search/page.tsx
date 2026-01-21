import { Metadata } from "next";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { searchPosts } from "@/sanity/lib/sanity";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for posts on Life in Bloom",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  let results: any[] = [];

  if (query.trim().length > 0) {
    results = await searchPosts(query);
  }

  return (
    <main className="min-h-screen bg-(--color-background-secondary)">
      {/* Search Header */}
      <section className="bg-(--color-background-primary) py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="font-display text-3xl md:text-4xl text-(--color-accent-wilderness) mb-4">
            Search Results
          </h1>
          <p className="font-body text-(--color-neutral-grey)">
            {query && (
              <>
                Results for: <span className="font-semibold">"{query}"</span>
              </>
            )}
            {!query && "Enter a search term to get started"}
          </p>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          {results.length > 0 ? (
            <>
              <p className="text-sm text-(--color-neutral-grey) mb-8">
                Found {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                {results.map((post) => {
                  const imageUrl = post.coverImage
                    ? urlFor(post.coverImage).url()
                    : null;

                  return (
                    <article
                      key={post.slug}
                      className="group card overflow-hidden rounded-2xl transition-shadow hover:shadow-lg p-6 md:p-10 bg-(--color-background-primary)"
                    >
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
                        {post.category && (
                          <p className="mb-2 text-xs uppercase tracking-wide text-(--color-accent-olive)">
                            {post.category.title}
                          </p>
                        )}

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

                        <p className="font-body text-sm text-(--color-neutral-grey) leading-relaxed mb-4">
                          {post.excerpt}
                        </p>

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
                      </div>
                    </article>
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
    </main>
  );
}
