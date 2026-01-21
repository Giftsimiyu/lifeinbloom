import React from "react";
import Hero from "./components/hero";
import PostCard from "./components/postCard";
import QuestionOfTheWeek from "./components/questionOfTheWeek";
import { getQuestionOfTheWeek } from "../sanity/lib/sanity";
import Link from "next/link";

export default async function Home() {
  const question = await getQuestionOfTheWeek();

  return (
    <>
      <Hero />

      {/* Question of the Week Section */}
      {question && (
        <section className="bg-(--color-background-primary) py-20">
          <div className="max-w-3xl mx-auto px-8">
            <QuestionOfTheWeek question={question} />
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      <section className="bg-(--color-background-secondary) py-24">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-12">
            Latest Blooms
          </h2>

          <div className="grid gap-12 md:grid-cols-3">
            <PostCard
              title="Finding softness in a loud world"
              slug="finding-softness"
              excerpt="A reflection on slowing down, choosing gentleness, and living with intention."
              category="Soft Living"
              image="/placeholder.jpg"
            />

            <PostCard
              title="Building a sanctuary in a small space"
              slug="small-space-sanctuary"
              excerpt="How I turned a tiny room into a place that feels like home."
              category="The Blooming Home"
              image="/placeholder.jpg"
            />

            <PostCard
              title="Style as self-expression"
              slug="style-as-expression"
              excerpt="Dressing not to impress, but to feel like yourself."
              category="Velvet & Vine"
              image="/placeholder.jpg"
            />
          </div>

          {/* Browse Categories */}
          <div className="mt-16 pt-16 border-t border-(--color-neutral-light)">
            <h3 className="font-display text-2xl text-(--color-accent-wilderness) mb-8">
              Explore by Category
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "The Blooming Home", slug: "blooming-home" },
                { name: "In Bloom", slug: "in-bloom" },
                { name: "Soft Living", slug: "soft-living" },
                { name: "Velvet & Vine", slug: "velvet-and-vine" },
                { name: "Verses & Vinyl", slug: "verses-and-vinyl" },
              ].map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group p-6 rounded-lg bg-(--color-background-primary) border border-(--color-neutral-light) hover:border-(--color-accent-olive) transition-all"
                >
                  <h4 className="font-display text-lg text-(--color-accent-wilderness) group-hover:text-(--color-accent-olive) transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs uppercase tracking-wide text-(--color-neutral-grey) mt-2">
                    Explore →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
