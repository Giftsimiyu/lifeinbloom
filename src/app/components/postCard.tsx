import Link from "next/link";

type PostCardProps= {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image?: string;
};

export default function PostCard({
  title,
  slug,
  excerpt,
  category,
  image,
}: PostCardProps) {
  // Trim excerpt to a readable length for cards
  const maxLength = 160;
  const excerptText = excerpt ?? "";
  const trimmedExcerpt =
    excerptText.length > maxLength
      ? excerptText.slice(0, maxLength).trimEnd() + "…"
      : excerptText;

  return (
    <article className="group card overflow-hidden rounded-2xl transition-shadow hover:shadow-lg p-6 md:p-10 bg-(--color-background-primary)">
      {/* Hero image */}
      {image && (
        <figure className="mb-10 overflow-hidden rounded-lg">
          <Link href={`/post/${slug}`} className="block">
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
            <Link href={`/post/${slug}`} className="group-hover:underline">
              {title}
            </Link>
          </h2>
        </header>

        <p className="font-body text-sm text-(--color-neutral-grey) leading-relaxed mb-4">
          {trimmedExcerpt}
        </p>

        <footer>
          <Link
            href={`/post/${slug}`}
            className="btn btn-secondary btn-sm"
            aria-label={`Read more about ${title}`}
          >
            Read more
          </Link>
        </footer>
      </div>
    </article>
  );
}
