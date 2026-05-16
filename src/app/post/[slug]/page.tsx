import { Metadata } from "next";
import {
  getPostBySlug,
  getRelatedPosts,
  getRelatedPostsByTags,
  getAllPosts,
} from "../../../sanity/lib/sanity";
import BlogPostView from "../../components/blogPostView";
import { getCommentCounts, getCommentCountForPost } from "@/sanity/lib/comments";
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

export default async function PostRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const thisPostCommentCount = await getCommentCountForPost(slug);

  let relatedPosts = [];

  if (post.tags && post.tags.length > 0) {
    relatedPosts = await getRelatedPostsByTags(post.slug, post.tags, 3);
  }

  if (relatedPosts.length === 0 && post.category) {
    relatedPosts = await getRelatedPosts(post.category.slug, post.slug, 3);
  }

  return (
    <BlogPostView
      post={post}
      commentCount={thisPostCommentCount}
      relatedPosts={relatedPosts}
    />
  );
}
