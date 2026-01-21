import { Metadata } from "next";
import CategoryLayout from "../../components/categoryLayout";
import { getPostsByCategory } from "../../../sanity/lib/sanity";

export const metadata: Metadata = {
  title: "In Bloom",
  description:
    "Life, growth, and real moments. We share personal stories of growth, inspiration, and embracing the journey of life in full bloom.",
};

export default async function InBloomCategory() {
  const posts = await getPostsByCategory("in-bloom");

  return (
    <CategoryLayout
      title="In Bloom"
      description="Life, growth, and real moments. We share personal stories of growth, inspiration, and embracing the journey of life in full bloom."
      posts={posts}
    />
  );
}
