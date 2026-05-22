import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
export const revalidate = 60;
export const dynamicParams = true;
import PostCard from "@/app/components/postCard";
import { Metadata } from "next";
import { motion } from "framer-motion";
import RotatingFlower from "@/app/components/rotatingFlower";
import Floating3dLeaf from "@/app/components/floating3dLeaf";
import GlowingAccent from "@/app/components/glowingAccent";
import NewsletterForm from "@/app/components/newsletterForm";
import { getCommentCounts } from "@/sanity/lib/comments";

type Props = {
  params: {
    tag: string;
  };
};

const POSTS_BY_TAG_QUERY = groq`
  *[_type == "post" && $tag in tags[]]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    content,
    publishedAt,
    category->{
      title,
      "slug": slug.current
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
  const commentCounts = await getCommentCounts(posts.map((p: any) => p.slug));

  return (
    <main className="overflow-x-hidden">
      {/* Tag Hero Section */}
      <section className="relative bg-(--color-background-primary) py-16 md:py-24 overflow-hidden">
        {/* 3D Elements */}
        <RotatingFlower position="top-right" size={100} delay={0} />
        <Floating3dLeaf delay={0.5} scale={1} />
        <GlowingAccent position="bottom-left" size={200} color="olive" opacity={0.1} />
        
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest text-(--color-accent-olive) mb-4">
              Tagged with
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-(--color-accent-wilderness) mb-6">
              {tag}
            </h1>
            <p className="font-body text-lg text-(--color-neutral-grey)">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with <span className="font-semibold">"{tag}"</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="relative bg-(--color-background-secondary) py-24">
        <GlowingAccent position="bottom-right" size={250} color="terracotta" />
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          {posts.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-body text-lg text-(--color-neutral-grey) mb-6">
                No posts found for this tag yet.
              </p>
              <a href="/category" className="btn btn-primary">
                Explore Categories
              </a>
            </motion.div>
          ) : (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any, idx: number) => {
                const imageUrl = post.coverImage
                  ? require("@/sanity/lib/image").urlFor(post.coverImage).url()
                  : null;

                return (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <PostCard
                      title={post.title}
                      slug={post.slug}
                      excerpt={post.excerpt}
                      category={post.category?.title ?? "Life in Bloom"}
                      image={imageUrl}
                      content={post.content}
                      publishedAt={post.publishedAt}
                      commentCount={commentCounts[post.slug] ?? 0}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative bg-(--color-background-primary) py-20 border-t border-(--color-neutral-cream)">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-(--color-accent-wilderness) mb-4">
              Love these topics?
            </h2>
            <p className="font-body text-neutral-grey mb-8">
              Subscribe to get notified when we post new content on topics that interest you.
            </p>
            <NewsletterForm variant="full" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
