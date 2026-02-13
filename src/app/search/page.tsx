import { Metadata } from "next";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { searchPosts } from "@/sanity/lib/sanity";
import { getCommentCounts } from "@/sanity/lib/comments";
import RotatingFlower from "@/app/components/rotatingFlower";
import Floating3dLeaf from "@/app/components/floating3dLeaf";
import Card3d from "@/app/components/card3d";
import GlowingAccent from "@/app/components/glowingAccent";
import NewsletterForm from "@/app/components/newsletterForm";
import SearchContent from "@/app/components/searchContent";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for posts on Life in Bloom",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";
  let results: any[] = [];

  if (query.trim().length > 0) {
    results = await searchPosts(query);
    // Fetch comment counts for search results
    const commentCounts = await getCommentCounts(results.map((p: any) => p.slug));
    // Attach comment counts to results
    results = results.map((post: any) => ({
      ...post,
      commentCount: commentCounts[post.slug] ?? 0
    }));
  }

  return (
    <main className="min-h-screen bg-(--color-background-secondary)">
      {/* 3D Elements */}
      <RotatingFlower position="top-right" size={100} delay={0} />
      <Floating3dLeaf delay={0.5} scale={1} />

      <SearchContent query={query} results={results} />
    </main>
  );
}
