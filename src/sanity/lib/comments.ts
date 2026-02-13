import { client } from "./client";

/**
 * Get comment counts for multiple post slugs
 */
export async function getCommentCounts(slugs: string[]): Promise<Record<string, number>> {
  if (!slugs || slugs.length === 0) return {};

  const counts = await Promise.all(
    slugs.map(slug =>
      client.fetch(
        `count(*[_type == "comment" && postSlug == $slug && approved == true])`,
        { slug }
      )
    )
  );

  const result: Record<string, number> = {};
  slugs.forEach((slug, idx) => {
    result[slug] = counts[idx] || 0;
  });
  return result;
}

/**
 * Get comment count for a single post slug
 */
export async function getCommentCountForPost(slug: string): Promise<number> {
  return client.fetch(
    `count(*[_type == "comment" && postSlug == $slug && approved == true])`,
    { slug }
  );
}
