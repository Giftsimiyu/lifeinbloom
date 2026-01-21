import { Metadata } from "next";
import CategoryLayout from "../../components/categoryLayout";
import { getPostsByCategory } from "../../../sanity/lib/sanity";

export const metadata: Metadata = {
  title: "Soft Living",
  description:
    "Embrace wellness, lifestyle, and growing gently with tips for a balanced, mindful life, and self-care routines, and inspiration for soft living.",
};

export default async function SoftLivingCategory() {
  const posts = await getPostsByCategory("soft-living");

  return (
    <CategoryLayout
      title="Soft Living"
      description="Embrace wellness, lifestyle, and growing gently with tips for a balanced, mindful life, and self-care routines, and inspiration for soft living."
      posts={posts}
    />
  );
}
