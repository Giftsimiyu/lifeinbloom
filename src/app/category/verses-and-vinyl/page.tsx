import { Metadata } from "next";
import CategoryLayout from "../../components/categoryLayout";
import { getPaginatedPostsByCategory, getSubcategoriesByCategory, getPaginatedPostsBySubcategory } from "../../../sanity/lib/sanity";

export const metadata: Metadata = {
  title: "Verses & Vinyl",
  description:
    "A harmonious blend of music and literature. Explore curated playlists, song recommendations, and literature pieces to inspire your soul.",
};

interface SearchParams {
  page?: string;
  subcategory?: string;
}

export default async function VersesAndVinylCategory({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const selectedSubcategory = params.subcategory || undefined;
  
  const subcategories = await getSubcategoriesByCategory("books-and-music");
  
  const { posts, total } = selectedSubcategory
    ? await getPaginatedPostsBySubcategory(selectedSubcategory, "books-and-music", currentPage)
    : await getPaginatedPostsByCategory("books-and-music", currentPage);
  
  const totalPages = Math.ceil(total / 12);
  return (
    <CategoryLayout
      title="Verses & Vinyl"
      description="A harmonious blend of music and literature. Explore curated playlists, song recommendations, and literature pieces to inspire your soul."
      posts={posts}
      slug="verses-and-vinyl"
      currentPage={currentPage}
      totalPages={totalPages}
      subcategories={subcategories}
      selectedSubcategory={selectedSubcategory}
    />
  );
}
