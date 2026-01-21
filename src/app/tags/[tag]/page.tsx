import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import PostCard from "@/app/components/postCard";
import { Metadata } from "next";

type Props = {
  params: {
    tag: string;
  };
};

const POSTS_BY_TAG_QUERY = groq`
  *[_type == "post" && $tag in tags[]->slug.current]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "image": coverImage.asset->url,
    categories[0]->{
      title
    }
  }
`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);

  return {
    title: `${decodedTag} • Life in Bloom`,
    description: `Posts tagged with "${decodedTag}" on Life in Bloom.`,
  };
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);

  const posts = await (client.fetch as any)(POSTS_BY_TAG_QUERY, { tag });

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="mb-12 text-center">
        <p className="text-sm uppercase tracking-widest text-neutral-grey mb-2">
          Tagged with
        </p>
        <h1 className="text-4xl md:text-5xl font-serif text-neutral-wilderness">
          {tag}
        </h1>
      </header>

      {/* Posts */}
      {posts.length === 0 ? (
        <p className="text-center text-neutral-grey">
          No posts found for this tag yet.
        </p>
      ) : (
        <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <PostCard
              key={post._id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              category={post.categories?.title ?? "Life in Bloom"}
              image={post.image}
            />
          ))}
        </section>
      )}
    </main>
  );
}
