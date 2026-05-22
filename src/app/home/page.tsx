'use client';

export const revalidate = 60;

import React, { useEffect, useState } from "react";
import PostCard from "../components/postCard";
import QuestionOfTheWeek from "../components/questionOfTheWeek";
import Card3d from "../components/card3d";
import RotatingFlower from "../components/rotatingFlower";
import Floating3dLeaf from "../components/floating3dLeaf";
import Polaroids from "../components/polaroids";
import { getQuestionOfTheWeek, getLatestPosts, getPopularPosts } from "@/sanity/lib/sanity";
import { getCommentCounts } from "@/sanity/lib/comments"; 
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [question, setQuestion] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestCommentCounts, setLatestCommentCounts] = useState<Record<string, number>>({});
  const [popularPosts, setPopularPosts] = useState([]);
  const [popularCommentCounts, setPopularCommentCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionData, latestData, popularData] = await Promise.all([
          getQuestionOfTheWeek(),
          getLatestPosts(6),
          getPopularPosts(10), // Fetch more to sort by engagement
        ]);
        console.log('Question:', questionData);
        console.log('Popular posts fetched:', popularData, 'Count:', popularData?.length);
        console.log('Latest posts fetched:', latestData, 'Count:', latestData?.length);
        setQuestion(questionData);
        setLatestPosts(latestData || []);
        
        // Fetch comment counts for both latest and popular posts
        const allPosts = [...(latestData || []), ...(popularData || [])];
        const slugs = allPosts.map((p: any) => p.slug);
        const commentCounts = await getCommentCounts(slugs);
        
        // Split counts between latest and popular
        const latest = latestData || [];
        const latestSlugs = latest.map((p: any) => p.slug);
        const latestCounts: Record<string, number> = {};
        latestSlugs.forEach((slug: string) => {
          latestCounts[slug] = commentCounts[slug] ?? 0;
        });
        setLatestCommentCounts(latestCounts);
        
        // Sort popular posts by comment count (engagement = "Most Loved")
        const popular = popularData || [];
        const sortedPopular = popular.sort((a: any, b: any) => {
          const countA = commentCounts[a.slug] ?? 0;
          const countB = commentCounts[b.slug] ?? 0;
          return countB - countA; // Highest comment count first
        }).slice(0, 3); // Take top 3 most commented
        
        const popularSlugs = sortedPopular.map((p: any) => p.slug);
        const popularCounts: Record<string, number> = {};
        popularSlugs.forEach((slug: string) => {
          popularCounts[slug] = commentCounts[slug] ?? 0;
        });
        setPopularCommentCounts(popularCounts);
        setPopularPosts(sortedPopular);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      

      {/* Hero Section - Enhanced with 3D */}
      <section className="relative bg-(--color-background-primary) py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Decorative 3D elements */}
        <RotatingFlower position="top-right" delay={0} />
        <RotatingFlower position="bottom-left" size={80} delay={3} />
        <Floating3dLeaf delay={0} scale={1.2} />
        <Floating3dLeaf delay={1} scale={0.8} />
        <Floating3dLeaf delay={2} scale={1} />
        
        <div className="max-w-3xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xs md:text-sm tracking-widest uppercase font-medium mb-4"
                style={{ color: "var(--color-accent-olive)" }}
              >
                Welcome to
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <h1
                className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight"
                style={{ color: "var(--color-accent-wilderness)" }}
              >
                Life in Bloom
              </h1>
            </div>

            <div className="max-w-xl mx-auto space-y-4">
              <p
                className="text-base md:text-lg leading-relaxed "
                style={{ color: "var(--color-neutral-grey)" }}
              >
                A cozy corner of the internet that explores the beauty of living.
              </p>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "var(--color-neutral-grey)" }}
              >
                Discover stories about intentional living, personal growth, and finding beauty in everyday moments.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="w-full mt-10 relative z-10">
          <div className="max-w-screen-xl mx-auto px-4">
            <Polaroids />
          </div>
        </div>
      </section>

      {/* Question of the Week Section - Highlighted */}
      {question && (
        <section className="bg-(--color-background-secondary) py-16 md:py-20">
          <div className="w-full px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <QuestionOfTheWeek question={question} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Popular Posts Section - New */}
      {popularPosts && popularPosts.length > 0 && (
        <section className="bg-(--color-background-primary) py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 
                className="font-display text-3xl md:text-4xl mb-3" 
                style={{ color: "var(--color-accent-wilderness)" }}
              >
                Most Loved
              </h2>
              <p 
                className="text-base" 
                style={{ color: "var(--color-neutral-grey)" }}
              >
                Readers' favorite discoveries
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {popularPosts.map((post: any, idx: number) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                >
                  <Card3d>
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      <section className="bg-(--color-background-secondary) py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 
              className="font-display text-3xl md:text-4xl mb-3" 
              style={{ color: "var(--color-accent-wilderness)" }}
            >
              Latest Blooms
            </h2>
            <p 
              className="text-base" 
              style={{ color: "var(--color-neutral-grey)" }}
            >
              Fresh stories, newly published
            </p>
          </motion.div>

          {latestPosts && latestPosts.length > 0 ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post: any, idx: number) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 + idx * 0.08 }}
                  >
                    <Card3d>
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
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/blog" className="btn btn-primary">
                  View more
                </Link>
              </div>
            </>
          ) : (
            <p className="text-(--color-neutral-grey)">
              No posts yet — check back soon 🌸
            </p>
          )}
        </div>
      </section>

      
      

      
    </>
  );
}
