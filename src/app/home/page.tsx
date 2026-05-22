export const dynamic = "force-dynamic";

import React from "react";
import PostCard from "../components/postCard";
import QuestionOfTheWeek from "../components/questionOfTheWeek";
import Card3d from "../components/card3d";
import RotatingFlower from "../components/rotatingFlower";
import Floating3dLeaf from "../components/floating3dLeaf";
import Polaroids from "../components/polaroids";
import {
  getQuestionOfTheWeek,
  getLatestPosts,
  getPopularPosts,
} from "@/sanity/lib/sanity";
import { getCommentCounts } from "@/sanity/lib/comments";
import Link from "next/link";
import { motion } from "framer-motion";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category?: {
    title?: string;
  };
  image?: string;
  content?: any;
  publishedAt?: string;
};

export default async function Home() {
  const [questionData, latestData, popularData] = await Promise.all([
    getQuestionOfTheWeek(),
    getLatestPosts(6),
    getPopularPosts(10),
  ]) as [any, Post[], Post[]];

  const allPosts = [...(latestData ?? []), ...(popularData ?? [])];
  const slugs = allPosts.map((p) => p.slug);

  const commentCounts: Record<string, number> = await getCommentCounts(slugs);

  // Latest posts counts
  const latestCommentCounts: Record<string, number> = {};
  (latestData ?? []).forEach((post) => {
    latestCommentCounts[post.slug] = commentCounts[post.slug] ?? 0;
  });

  // Sort popular by engagement
  const sortedPopular = [...(popularData ?? [])]
    .sort((a, b) => {
      const countA = commentCounts[a.slug] ?? 0;
      const countB = commentCounts[b.slug] ?? 0;
      return countB - countA;
    })
    .slice(0, 3);

  const popularCommentCounts: Record<string, number> = {};
  sortedPopular.forEach((post) => {
    popularCommentCounts[post.slug] = commentCounts[post.slug] ?? 0;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-(--color-background-primary) py-20 md:py-28 lg:py-32 overflow-hidden">
        <RotatingFlower position="top-right" delay={0} />
        <RotatingFlower position="bottom-left" size={80} delay={3} />
        <Floating3dLeaf delay={0} scale={1.2} />
        <Floating3dLeaf delay={1} scale={0.8} />
        <Floating3dLeaf delay={2} scale={1} />

        <div className="max-w-3xl mx-auto px-8 relative z-10">
          <div className="space-y-6 text-center">
            <p className="text-xs md:text-sm tracking-widest uppercase font-medium mb-4"
              style={{ color: "var(--color-accent-olive)" }}>
              Welcome to
            </p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight"
              style={{ color: "var(--color-accent-wilderness)" }}>
              Life in Bloom
            </h1>

            <p className="text-base md:text-lg leading-relaxed"
              style={{ color: "var(--color-neutral-grey)" }}>
              A cozy corner of the internet that explores the beauty of living.
            </p>
          </div>
        </div>

        <div className="w-full mt-10 relative z-10">
          <div className="max-w-screen-xl mx-auto px-4">
            <Polaroids />
          </div>
        </div>
      </section>

      {/* Question of the Week */}
      {questionData && (
        <section className="bg-(--color-background-secondary) py-16 md:py-20">
          <div className="w-full px-4 md:px-8">
            <QuestionOfTheWeek question={questionData} />
          </div>
        </section>
      )}

      {/* Most Loved */}
      {sortedPopular.length > 0 && (
        <section className="bg-(--color-background-primary) py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="font-display text-3xl md:text-4xl mb-3"
              style={{ color: "var(--color-accent-wilderness)" }}>
              Most Loved
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {sortedPopular.map((post, idx) => (
                <Card3d key={post.slug}>
                  <PostCard
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    category={post.category?.title ?? "Life in Bloom"}
                    image={post.image}
                    content={post.content}
                    publishedAt={post.publishedAt}
                    commentCount={popularCommentCounts[post.slug] ?? 0}
                  />
                </Card3d>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="bg-(--color-background-secondary) py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="font-display text-3xl md:text-4xl mb-3"
            style={{ color: "var(--color-accent-wilderness)" }}>
            Latest Blooms
          </h2>

          {latestData?.length > 0 ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {latestData.map((post, idx) => (
                  <Card3d key={post.slug}>
                    <PostCard
                      title={post.title}
                      slug={post.slug}
                      excerpt={post.excerpt}
                      category={post.category?.title ?? "Life in Bloom"}
                      image={post.image}
                      content={post.content}
                      publishedAt={post.publishedAt}
                      commentCount={latestCommentCounts[post.slug] ?? 0}
                    />
                  </Card3d>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link href="/blog" className="btn btn-primary">
                  View more
                </Link>
              </div>
            </>
          ) : (
            <p>No posts yet — check back soon 🌸</p>
          )}
        </div>
      </section>
    </>
  );
}
