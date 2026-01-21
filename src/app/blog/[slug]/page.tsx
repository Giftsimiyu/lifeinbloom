import { Metadata } from "next";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllPosts,
} from "../../../sanity/lib/sanity";
import BlogPostView from "../../components/blogPostView";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

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
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  let relatedPosts = [];
  if (post.category) {
    relatedPosts = await getRelatedPosts(post.category.slug, params.slug, 3);
  }

  return <BlogPostView post={post} relatedPosts={relatedPosts} />;
}
