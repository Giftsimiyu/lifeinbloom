import { Metadata } from "next";
import {
  getPostBySlug,
  getRelatedPosts,
  getRelatedPostsByTags,
  getAllPosts,
} from "../../../sanity/lib/sanity";
import { getCommentCounts } from "@/sanity/lib/comments";
import BlogPostView from "../../components/blogPostView";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : null;

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  let relatedPosts = [];

  // Try to get related posts by tags first (more intelligent matching)
  if (post.tags && post.tags.length > 0) {
    relatedPosts = await getRelatedPostsByTags(post.slug, post.tags, 3);
  }

  // Fall back to category-based related posts if no tag matches
  if (relatedPosts.length === 0 && post.category) {
    relatedPosts = await getRelatedPosts(post.category.slug, post.slug, 3);
  }

  // Fetch comment counts for related posts
  if (relatedPosts.length > 0) {
    const commentCounts = await getCommentCounts(relatedPosts.map((p: any) => p.slug));
    relatedPosts = relatedPosts.map((post: any) => ({
      ...post,
      commentCount: commentCounts[post.slug] ?? 0
    }));
  }

  return <BlogPostView post={post} relatedPosts={relatedPosts} />;
}
