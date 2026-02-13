import { Metadata } from "next";
import CategoryLayout from "../../components/categoryLayout";
import { getPaginatedPostsByCategory, getSubcategoriesByCategory, getPaginatedPostsBySubcategory } from "../../../sanity/lib/sanity";

export const metadata: Metadata = {
  title: "In Bloom",
  description:
    "Life, growth, and real moments. We share personal stories of growth, inspiration, and embracing the journey of life in full bloom.",
};

interface SearchParams {
  page?: string;
  subcategory?: string;
}

export default async function InBloomCategory({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const selectedSubcategory = params.subcategory || undefined;
  
  const subcategories = await getSubcategoriesByCategory("in-bloom");
  
  const { posts, total } = selectedSubcategory
    ? await getPaginatedPostsBySubcategory(selectedSubcategory, "in-bloom", currentPage)
    : await getPaginatedPostsByCategory("in-bloom", currentPage);
  
  const totalPages = Math.ceil(total / 12);

  return (
    <CategoryLayout
      title="In Bloom"
      description="Life, growth, and real moments. We share personal stories of growth, inspiration, and embracing the journey of life in full bloom."
      posts={posts}
      slug="in-bloom"
      currentPage={currentPage}
      totalPages={totalPages}
      subcategories={subcategories}
      selectedSubcategory={selectedSubcategory}
    />
  );
}
