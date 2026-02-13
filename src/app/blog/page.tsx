import { Metadata } from "next";
import Card3d from "@/app/components/card3d";
import PostCard from "@/app/components/postCard";
import { getLatestPosts } from "@/sanity/lib/sanity";
import { getCommentCounts } from "@/sanity/lib/comments";

export const metadata: Metadata = {
  title: "Blog",
  description: "All blog posts",
};

export default async function BlogPage() {
  const posts = await getLatestPosts(12);
  const commentCounts = await getCommentCounts(posts.map((p: any) => p.slug));

  return (
    <main className="relative bg-(--color-background-secondary) py-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-3xl md:text-4xl text-(--color-accent-wilderness)">Blog</h1>
          <p className="mt-3 text-sm text-(--color-neutral-grey)">All posts from Life in Bloom</p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Card3d key={post.slug}>
                <PostCard
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  category={post.category?.title ?? "Life in Bloom"}
                  image={post.image}
                  content={post.content}
                  publishedAt={post.publishedAt}
                  commentCount={commentCounts[post.slug] ?? 0}
                />
              </Card3d>
            ))}
          </div>
        ) : (
          <p className="text-(--color-neutral-grey)">No posts yet.</p>
        )}
      </div>
    </main>
  );
}
