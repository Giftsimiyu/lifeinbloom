import Link from "next/link";

interface TagsDisplayProps {
  tags?: string[];
}

export default function TagsDisplay({ tags }: TagsDisplayProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-(--color-accent-olive)/10 text-(--color-accent-olive) hover:bg-(--color-accent-olive)/20 transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
