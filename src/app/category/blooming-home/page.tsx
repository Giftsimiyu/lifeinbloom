import { Metadata } from "next";
import CategoryLayout from "../../components/categoryLayout";
import { getPaginatedPostsByCategory, getSubcategoriesByCategory, getPaginatedPostsBySubcategory } from "../../../sanity/lib/sanity";

export const metadata: Metadata = {
  title: "The Blooming Home",
  description:
    "Discover curated home decor ideas, DIY projects, and styling tips to create a cozy, beautiful, and peaceful living space.",
};

interface SearchParams {
  page?: string;
  subcategory?: string;
}

export default async function BloomingHomeCategory({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {

  const params = await searchParams; 
  const currentPage = parseInt(params.page || "1", 10);
  const selectedSubcategory = params.subcategory || undefined;
  
  const subcategories = await getSubcategoriesByCategory("blooming-home");
  console.log("Blooming Home subcategories:", subcategories);
  
  const { posts, total } = selectedSubcategory
    ? await getPaginatedPostsBySubcategory(selectedSubcategory, "blooming-home", currentPage)
    : await getPaginatedPostsByCategory("blooming-home", currentPage);
  
  const totalPages = Math.ceil(total / 12);

  return (
    <CategoryLayout
      title="The Blooming Home"
      description="Discover curated home decor ideas, DIY projects, and styling tips to create a cozy, beautiful, and peaceful living space."
      posts={posts}
      slug="blooming-home"
      currentPage={currentPage}
      totalPages={totalPages}
      subcategories={subcategories}
      selectedSubcategory={selectedSubcategory}
    />
  );
}
