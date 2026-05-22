export const revalidate = 60;
export const dynamicParams = true;

import { Metadata } from "next";
import CategoryLayout from "@/app/components/categoryLayout";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type SubcategoryPageProps = {
  params: Promise<{ slug: string }>;
};

async function getPostsBySubcategorySlug(subcategorySlug: string) {
  try {
    const query = `
      *[_type == "post" && subcategory->slug.current == $slug] | order(publishedAt desc){
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
    `;
    
    const posts = await client.fetch(query, { slug: subcategorySlug });
    return posts || [];
  } catch (error) {
    console.error(`Error fetching posts for subcategory "${subcategorySlug}":`, error);
    return [];
  }
}

async function getSubcategoryData(slug: string) {
  try {
    const query = `
      *[_type == "subcategory" && slug.current == $slug][0]{
        title,
        "slug": slug.current
      }
    `;
    
    const subcategory = await client.fetch(query, { slug });
    return subcategory || {
      title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      slug: slug,
    };
  } catch (error) {
    console.error(`Error fetching subcategory data for "${slug}":`, error);
    return {
      title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      slug: slug,
    };
  }
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const subcategoryData = await getSubcategoryData(slug);
  
  return {
    title: subcategoryData.title,
    description: `Explore posts in the ${subcategoryData.title} subcategory`,
  };
}

export default async function SubcategoryPage({
  params,
}: SubcategoryPageProps) {
  const { slug } = await params;
  const [posts, subcategoryData] = await Promise.all([
    getPostsBySubcategorySlug(slug),
    getSubcategoryData(slug),
  ]);

  return (
    <CategoryLayout
      title={subcategoryData?.title || "Subcategory"}
      description={`Explore posts in the ${subcategoryData?.title} subcategory`}
      slug={slug}
      currentPage={1}
      totalPages={1}
      posts={posts}
      subcategories={[]}
      selectedSubcategory={undefined}
      isSubcategory={true}
    />
  );
}
