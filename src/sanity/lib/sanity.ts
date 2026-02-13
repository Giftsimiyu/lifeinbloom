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

export async function getLatestPosts(limit: number = 3) {
  return (client.fetch as any)(
    `*[_type == "post"] | order(publishedAt desc)[0...${limit - 1}]{
      title,
      excerpt,
      "slug": slug.current,
      publishedAt,
      "image": coverImage.asset->url,
      content,
      category->{
        title,
        "slug": slug.current
      }
    }`
  );
}

export async function getPopularPosts(limit: number = 3) {
  return (client.fetch as any)(
    `*[_type == "post"] | order(publishedAt desc)[0...${limit - 1}]{
      title,
      excerpt,
      "slug": slug.current,
      publishedAt,
      "image": coverImage.asset->url,
      content,
      category->{
        title,
        "slug": slug.current
      }
    }`
  );
}

const POSTS_PER_PAGE = 12;
export async function getPaginatedPostsByCategory(
  categorySlug: string, 
  page: number,
  limit: number = POSTS_PER_PAGE
) {
  const offset = (page - 1) * limit;
  const end = offset + limit - 1;

  const query = `
    {
      "posts": *[_type == "post" && category->slug.current == $categorySlug] 
        | order(publishedAt desc)[$offset...$end]{
          title,
          excerpt,
          "slug": slug.current,
          coverImage,
          content,
          publishedAt,
          category->{
            title,
            "slug": slug.current
          }
        },
      "total": count(*[_type == "post" && category->slug.current == $categorySlug])
    }
    `;

  const params = { categorySlug, offset, end } as any;

  // Try the provided slug first
  console.log(`[Category Query] Trying slug: "${categorySlug}"`);
  let result = await (client.fetch as any)(query, params);
  console.log(`[Category Query] "${categorySlug}" returned ${result?.total || 0} posts`);

  // If no results, try common alternatives
  if ((!result || result.total === 0) && typeof categorySlug === "string") {
    const alternatives = [];
    
    // Try add/remove leading "the-"
    if (categorySlug.startsWith("the-")) {
      alternatives.push(categorySlug.replace(/^the-/, ""));
    } else {
      alternatives.push(`the-${categorySlug}`);
    }
    
    // Try remove "and-" from compound slugs (e.g., "verses-and-vinyl" -> "verses-vinyl")
    if (categorySlug.includes("-and-")) {
      alternatives.push(categorySlug.replace(/-and-/g, "-"));
    }

    for (const altSlug of alternatives) {
      if (altSlug !== categorySlug) {
        console.log(`[Category Query] Trying alternative slug: "${altSlug}"`);
        const altParams = { categorySlug: altSlug, offset, end } as any;
        const altResult = await (client.fetch as any)(query, altParams);
        console.log(`[Category Query] "${altSlug}" returned ${altResult?.total || 0} posts`);
        if (altResult && altResult.total > 0) {
          return altResult;
        }
      }
    }
  }

  return result;
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
  const query = `
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
    `;

  const result = await client.fetch(query, { categorySlug });
  if (Array.isArray(result) && result.length === 0 && typeof categorySlug === "string") {
    const alternatives = [];
    
    // Try add/remove leading "the-"
    if (categorySlug.startsWith("the-")) {
      alternatives.push(categorySlug.replace(/^the-/, ""));
    } else {
      alternatives.push(`the-${categorySlug}`);
    }
    
    // Try remove "and-" from compound slugs
    if (categorySlug.includes("-and-")) {
      alternatives.push(categorySlug.replace(/-and-/g, "-"));
    }

    for (const altSlug of alternatives) {
      if (altSlug !== categorySlug) {
        const altResult = await client.fetch(query, { categorySlug: altSlug });
        if (Array.isArray(altResult) && altResult.length > 0) {
          return altResult;
        }
      }
    }
  }

  return result;
}

export async function getRelatedPosts(categorySlug: string, currentSlug: string, limit: number = 3) {
  return client.fetch(
    `
    *[_type == "post" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(publishedAt desc)[0..${limit - 1}]{
      title,
      excerpt,
      "slug": slug.current,
      coverImage,
      content,
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

export async function getRelatedPostsByTags(currentSlug: string, tags: string[] = [], limit: number = 3) {
  // If no tags, fall back to empty results
  if (!tags || tags.length === 0) {
    return [];
  }

  return (client.fetch as any)(
    `
    *[_type == "post" && slug.current != $currentSlug && count(tags[@ in $tags]) > 0] | order(publishedAt desc)[0..${limit - 1}] {
      title,
      excerpt,
      "slug": slug.current,
      coverImage,
      content,
      publishedAt,
      tags,
      category->{
        title,
        "slug": slug.current
      }
    }
    `,
    { currentSlug, tags }
  );
}

export async function getAllCategories() {
  return (client.fetch as any)(
    `
    *[_type == "category"] | order(title asc){
      title,
      description,
      "slug": slug.current
    }
    `
  );
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
      content,
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

export async function getSubcategoriesByCategory(categorySlug: string) {
  const query = `
    *[_type == "subcategory" && category->slug.current == $categorySlug] | order(title asc){
      title,
      "slug": slug.current,
      category->{
        title,
        "slug": slug.current
      }
    }
    `;
  
  console.log(`[Subcategory Query] Fetching subcategories for category slug: "${categorySlug}"`);
  let result = await (client.fetch as any)(query, { categorySlug });
  console.log(`[Subcategory Query] Found ${result?.length || 0} subcategories for "${categorySlug}"`);

  // If no results, try common alternatives
  if ((!result || result.length === 0) && typeof categorySlug === "string") {
    const alternatives = [];
    
    // Try add/remove leading "the-"
    if (categorySlug.startsWith("the-")) {
      alternatives.push(categorySlug.replace(/^the-/, ""));
    } else {
      alternatives.push(`the-${categorySlug}`);
    }
    
    // Try remove "and-" from compound slugs
    if (categorySlug.includes("-and-")) {
      alternatives.push(categorySlug.replace(/-and-/g, "-"));
    }

    for (const altSlug of alternatives) {
      if (altSlug !== categorySlug) {
        console.log(`[Subcategory Query] Trying alternative slug: "${altSlug}"`);
        const altResult = await (client.fetch as any)(query, { categorySlug: altSlug });
        console.log(`[Subcategory Query] Found ${altResult?.length || 0} subcategories for "${altSlug}"`);
        if (altResult && altResult.length > 0) {
          return altResult;
        }
      }
    }
  }

  return result;
}

export async function getPostsBySubcategory(subcategorySlug: string, categorySlug: string) {
  return (client.fetch as any)(
    `
    *[_type == "post" && subcategory->slug.current == $subcategorySlug && category->slug.current == $categorySlug] 
    | order(publishedAt desc){
      title,
      excerpt,
      "slug": slug.current,
      coverImage,
      publishedAt,
      category->{
        title,
        "slug": slug.current
      },
      subcategory->{
        title,
        "slug": slug.current
      }
    }
    `,
    { subcategorySlug, categorySlug }
  );
}

export async function getPaginatedPostsBySubcategory(
  subcategorySlug: string,
  categorySlug: string,
  page: number,
  limit: number = 12
) {
  const offset = (page - 1) * limit;

  return (client.fetch as any)(
    `
    {
      "posts": *[_type == "post" && subcategory->slug.current == $subcategorySlug && category->slug.current == $categorySlug] 
        | order(publishedAt desc)[$offset...$end]{
          title,
          excerpt,
          "slug": slug.current,
          coverImage,
          content,
          publishedAt,
          category->{
            title,
            "slug": slug.current
          },
          subcategory->{
            title,
            "slug": slug.current
          }
        },
      "total": count(*[_type == "post" && subcategory->slug.current == $subcategorySlug && category->slug.current == $categorySlug])
    }
    `,
    {
      subcategorySlug,
      categorySlug,
      offset,
      end: offset + limit - 1,
    }
  );
}

// ===== SHOP QUERIES =====

export async function getFeaturedProducts(limit: number = 6) {
  return (client.fetch as any)(
    `*[_type == "product" && featured == true] | order(publishedAt desc)[0...${limit - 1}]{
      title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      price,
      originalPrice,
      category->{
        title,
        "slug": slug.current
      }
    }`
  );
}

export async function getAllProducts(limit: number = 24, offset: number = 0) {
  return (client.fetch as any)(
    `*[_type == "product"] | order(publishedAt desc)[${offset}...${offset + limit - 1}]{
      title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      price,
      originalPrice,
      stock,
      category->{
        title,
        "slug": slug.current
      }
    }`
  );
}

export async function getTotalProductCount() {
  return (client.fetch as any)(
    `count(*[_type == "product"])`
  );
}

export async function getProductsByCategory(categorySlug: string, limit: number = 24, offset: number = 0) {
  return (client.fetch as any)(
    `*[_type == "product" && category->slug.current == $categorySlug] | order(publishedAt desc)[${offset}...${offset + limit - 1}]{
      title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      price,
      originalPrice,
      stock,
      category->{
        title,
        "slug": slug.current
      }
    }`,
    { categorySlug }
  );
}

export async function getProductsByCategoryCount(categorySlug: string) {
  return (client.fetch as any)(
    `count(*[_type == "product" && category->slug.current == $categorySlug])`,
    { categorySlug }
  );
}

export async function getProductBySlug(slug: string) {
  return (client.fetch as any)(
    `*[_type == "product" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      description,
      content,
      "image": image.asset->url,
      gallery[]{
        "url": asset->url,
        alt
      },
      price,
      originalPrice,
      stock,
      category->{
        title,
        "slug": slug.current
      },
      tags
    }`,
    { slug }
  );
}

export async function getProductCategories() {
  return (client.fetch as any)(
    `*[_type == "productCategory"] | order(title asc){
      title,
      "slug": slug.current,
      description,
      "image": image.asset->url
    }`
  );
}

export async function getAnnouncements() {
  return client.fetch(
    `
    *[_type == "announcement" && isActive == true && (!defined(startAt) || startAt <= now()) && (!defined(endAt) || endAt >= now())] | order(startAt desc){
      message,
      url
    }
    `
  )
}

export async function searchProducts(query: string) {
  return (client.fetch as any)(
    `*[_type == "product" && (title match $query || description match $query || tags[] match $query)] | order(publishedAt desc){
      title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      price,
      originalPrice,
      category->{
        title,
        "slug": slug.current
      }
    }`,
    { query: `*${query}*` }
  );
}
