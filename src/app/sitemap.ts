import { getAllPosts } from "@/sanity/lib/sanity";

export default async function sitemap() {
  const posts = await getAllPosts()
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lifeinbloomblog.com';

    const postUrls = posts.map((post: any) => ({url: `${BASE_URL}/blog/${post.slug.current}`, lastModified: new Date( post._updatedAt)
}))


  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/category/velvet-and-vine`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/category/soft-living`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/category/the-blooming-home`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/category/in-bloom`,
      lastModified: new Date(),
    },
    ...postUrls,
  ]
}