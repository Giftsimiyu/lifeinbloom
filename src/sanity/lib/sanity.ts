import { client } from './client';

export async function getPostBySlug(slug: string) {
  return (client.fetch as any)(
    `
    *[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      "slug": slug.current,
      _updatedAt,
      coverImage,
      seo,
      content,
      publishedAt,
      tags,
      category->{
        title,
        "slug": slug.current
      },
      author->{
        _id,
        name,
        bio,
        image
      },
      gallery[]{
      _key,
      "url": asset->url,
      alt
      }
    }
    `,
    { slug }
  )
}

const POSTS_PER_PAGE = 12;
export async function getPaginatedPostsByCategory(
  categorySlug: string, 
  page: number,
  limit: number = POSTS_PER_PAGE
) {
  const offset = (page - 1) * limit;
  const end = offset + limit - 1;

  return (client.fetch as any)(
    `
    {
      "posts": *[_type == "post" && category->slug.current == $categorySlug] 
        | order(publishedAt desc)[$offset...$end]{
          title,
          excerpt,
          "slug": slug.current,
          coverImage,
          publishedAt,
          category->{
            title,
            "slug": slug.current
          }
        },
      "total": count(*[_type == "post" && category->slug.current == $categorySlug])
    }
    `,
    {
      categorySlug,
      offset,
      end: offset + limit - 1,
    }
  );
} 

export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post"]{
      slug,
      _updatedAt
    }
  `);
}

export async function getCategoryBySlug(slug: string) {
  return (client.fetch as any)(
    `
    *[_type == "category" && slug.current == $slug][0]{
      title,
      description,
      "slug": slug.current
    }
    `,
    { slug }
  );
}

export async function getPostsByCategory(categorySlug: string) {
  return client.fetch(
    `
    *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc){
      title,
      excerpt,
      "slug": slug.current,
      coverImage,
      publishedAt,
      category->{
        title,
        "slug": slug.current
      }
    }
    `,
    { categorySlug }
  )
}

export async function getRelatedPosts(categorySlug: string, currentSlug: string, limit: number = 3) {
  return client.fetch(
    `
    *[_type == "post" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(publishedAt desc)[0..${limit - 1}]{
      title,
      excerpt,
      "slug": slug.current,
      coverImage,
      publishedAt,
      category->{
        title,
        "slug": slug.current
      }
    }
    `,
    { categorySlug, currentSlug }
  )
}

export async function getQuestionOfTheWeek() {
  return client.fetch(
    `
    *[_type == "questionOfTheWeek" && isActive == true] | order(publishedAt desc)[0]{
      title,
      description,
      answer,
      publishedAt
    }
    `
  )
}

export async function searchPosts(query: string) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  return (client.fetch as any)(
    `
    *[_type == "post" && (
      title match $query ||
      excerpt match $query ||
      content match $query
    )] | order(publishedAt desc){
      title,
      excerpt,
      "slug": slug.current,
      coverImage,
      publishedAt,
      category->{
        title,
        "slug": slug.current
      }
    }
    `,
    { query: `${query}*` }
  )
}

