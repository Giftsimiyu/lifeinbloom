import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface Author {
  _id: string;
  name: string;
  bio?: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
}

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const imageUrl = author.image ? urlFor(author.image).url() : null;

  return (
    <div className="bg-(--color-background-primary) border-t border-b border-(--color-neutral-light) py-12 my-12">
      <div className="max-w-3xl mx-auto">
        <h3 className="font-display text-xl text-(--color-accent-wilderness) mb-6">
          About the Author
        </h3>

        <div className="flex gap-6 md:gap-8">
          {/* Author Image */}
          {imageUrl && (
            <figure className="shrink-0">
              <img
                src={imageUrl}
                alt={author.name}
                loading="lazy"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-(--color-accent-olive)"
              />
            </figure>
          )}

          {/* Author Info */}
          <div className="flex-1">
            <h4 className="font-display text-lg text-(--color-accent-wilderness) mb-2">
              {author.name}
            </h4>

            {author.bio && (
              <p className="font-body text-(--color-neutral-grey) text-sm leading-relaxed mb-4">
                {author.bio}
              </p>
            )}

            <Link
              href={`/about/the-author`}
              className="inline-block text-sm font-medium text-(--color-accent-olive) hover:text-(--color-accent-wilderness) transition-colors"
            >
              Read Full Biography →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
