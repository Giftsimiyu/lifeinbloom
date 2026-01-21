import { getAllPosts } from "@/sanity/lib/sanity";

export default async function sitemap() {
  const posts = await getAllPosts()

    const postUrls = posts.map((post: any) => ({url: `https://lifeinbloom.com/blog/${post.slug.current}`, lastModified: new Date( post._updatedAt)
}))


  return [
    {
      url: 'https://lifeinbloom.com',
      lastModified: new Date(),
    },
    {
      url: 'https://lifeinbloom.com/category/velvet-and-vine',
      lastModified: new Date(),
    },
    {
      url: 'https://lifeinbloom.com/category/soft-living',
      lastModified: new Date(),
    },
    {
      url: 'https://lifeinbloom.com/category/the-blooming-home',
      lastModified: new Date(),
    },
    {
      url: 'https://lifeinbloom.com/category/in-bloom',
      lastModified: new Date(),
    },
    ...postUrls,
  ]
}