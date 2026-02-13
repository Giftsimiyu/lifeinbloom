import { Metadata } from "next";
import CategoryLayout from "../../components/categoryLayout";
import { getPaginatedPostsByCategory, getSubcategoriesByCategory, getPaginatedPostsBySubcategory } from "../../../sanity/lib/sanity";

export const metadata: Metadata = {
  title: "Velvet & Vine",
  description:
    "Fashion, beauty, and accessories that reflect your unique style. From timeless pieces to curated collections, discover your aesthetic.",
};

interface SearchParams {
  page?: string;
  subcategory?: string;
}

export default async function VelvetAndVineCategory({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const selectedSubcategory = params.subcategory || undefined;
  
  const subcategories = await getSubcategoriesByCategory("velvet-and-vine");
  
  const { posts, total } = selectedSubcategory
    ? await getPaginatedPostsBySubcategory(selectedSubcategory, "velvet-and-vine", currentPage)
    : await getPaginatedPostsByCategory("velvet-and-vine", currentPage);
  
  const totalPages = Math.ceil(total / 12);

  return (
    <CategoryLayout
      title="Velvet & Vine"
      description="Fashion, beauty, and accessories that reflect your unique style. From timeless pieces to curated collections, discover your aesthetic."
      posts={posts}
      slug="velvet-and-vine"
      currentPage={currentPage}
      totalPages={totalPages}
      subcategories={subcategories}
      selectedSubcategory={selectedSubcategory}
    />
  );
}
