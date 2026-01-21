import CategoryLayout from "@/app/components/categoryLayout";
import {
  getPaginatedPostsByCategory,
  getCategoryBySlug,
} from "@/sanity/lib/sanity";

const POSTS_PER_PAGE = 12; // keep in sync with sanity.ts

type CategoryPageProps = {
  params: { slug: string };
  searchParams?: { page?: string };
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const categorySlug = params.slug;
  const currentPage = Number(searchParams?.page ?? "1");

  const [{ posts, total }, category] = await Promise.all([
    getPaginatedPostsByCategory(categorySlug, currentPage, POSTS_PER_PAGE),
    getCategoryBySlug(categorySlug),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  return (
    <CategoryLayout
      title={category?.title ?? "Category"}
      description={category?.description ?? ""}
      slug={categorySlug}
      currentPage={currentPage}
      totalPages={totalPages}
      posts={posts}
    />
  );
}
