import { Metadata } from "next";
import CategoryLayout from "../../components/categoryLayout";
import { getPostsByCategory } from "../../../sanity/lib/sanity";

export const metadata: Metadata = {
  title: "Velvet & Vine",
  description:
    "Fashion, beauty, and accessories that reflect your unique style. From timeless pieces to curated collections, discover your aesthetic.",
};

export default async function VelvetAndVineCategory() {
  const posts = await getPostsByCategory("velvet-and-vine");

  return (
    <CategoryLayout
      title="Velvet & Vine"
      description="Fashion, beauty, and accessories that reflect your unique style. From timeless pieces to curated collections, discover your aesthetic."
      posts={posts}
    />
  );
}
