import { Metadata } from "next";
import CategoryLayout from "../../components/categoryLayout";
import { getPostsByCategory } from "../../../sanity/lib/sanity";

export const metadata: Metadata = {
  title: "The Blooming Home",
  description:
    "Discover curated home decor ideas, DIY projects, and styling tips to create a cozy, beautiful, and peaceful living space.",
};

export default async function BloomingHomeCategory() {
  const posts = await getPostsByCategory("blooming-home");

  return (
    <CategoryLayout
      title="The Blooming Home"
      description="Discover curated home decor ideas, DIY projects, and styling tips to create a cozy, beautiful, and peaceful living space."
      posts={posts}
    />
  );
}
