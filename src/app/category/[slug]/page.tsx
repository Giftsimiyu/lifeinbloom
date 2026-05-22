export const revalidate = 60;
export const dynamicParams = true;

import CategoryLayout from "@/app/components/categoryLayout";
import {
  getPaginatedPostsByCategory,
  getCategoryBySlug,
  getSubcategoriesByCategory,
  getPaginatedPostsBySubcategory,
} from "@/sanity/lib/sanity";
import { getCommentCounts } from "@/sanity/lib/comments";

const POSTS_PER_PAGE = 12; // keep in sync with sanity.ts

type CategoryPageProps = {
  params: { slug: string };
  searchParams?: { page?: string; subcategory?: string };
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const categorySlug = params.slug;
  const currentPage = Number(searchParams?.page ?? "1");
  const selectedSubcategory = searchParams?.subcategory;

  const [subcategories, category] = await Promise.all([
    getSubcategoriesByCategory(categorySlug),
    getCategoryBySlug(categorySlug),
  ]);

  let { posts, total } = await (selectedSubcategory
    ? getPaginatedPostsBySubcategory(selectedSubcategory, categorySlug, currentPage, POSTS_PER_PAGE)
    : getPaginatedPostsByCategory(categorySlug, currentPage, POSTS_PER_PAGE));

  // Fetch comment counts for posts
  const commentCounts = await getCommentCounts(posts.map((p: any) => p.slug));
  posts = posts.map((post: any) => ({
    ...post,
    commentCount: commentCounts[post.slug] ?? 0
  }));

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  return (
    <CategoryLayout
      title={category?.title ?? "Category"}
      description={category?.description ?? ""}
      slug={categorySlug}
      currentPage={currentPage}
      totalPages={totalPages}
      posts={posts}
      subcategories={subcategories}
      selectedSubcategory={selectedSubcategory}
    />
  );
}
