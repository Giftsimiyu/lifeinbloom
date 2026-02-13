import { Metadata } from "next";
import CategoryLayout from "../../components/categoryLayout";
import { getPaginatedPostsByCategory, getSubcategoriesByCategory, getPaginatedPostsBySubcategory } from "../../../sanity/lib/sanity";

export const metadata: Metadata = {
  title: "Soft Living",
  description:
    "Embrace wellness, lifestyle, and growing gently with tips for a balanced, mindful life, and self-care routines, and inspiration for soft living.",
};

interface SearchParams {
  page?: string;
  subcategory?: string;
}

export default async function SoftLivingCategory({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const selectedSubcategory = params.subcategory || undefined;
  
  const subcategories = await getSubcategoriesByCategory("soft-living");
  
  const { posts, total } = selectedSubcategory
    ? await getPaginatedPostsBySubcategory(selectedSubcategory, "soft-living", currentPage)
    : await getPaginatedPostsByCategory("soft-living", currentPage);
  
  const totalPages = Math.ceil(total / 12);

  return (
    <CategoryLayout
      title="Soft Living"
      description="Embrace wellness, lifestyle, and growing gently with tips for a balanced, mindful life, and self-care routines, and inspiration for soft living."
      posts={posts}
      slug="soft-living"
      currentPage={currentPage}
      totalPages={totalPages}
      subcategories={subcategories}
      selectedSubcategory={selectedSubcategory}
    />
  );
}
