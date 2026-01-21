import { Metadata } from "next";
import CategoryLayout from "../../components/categoryLayout";
import { getPostsByCategory } from "../../../sanity/lib/sanity";

export const metadata: Metadata = {
  title: "Verses & Vinyl",
  description:
    "A harmonious blend of music and literature. Explore curated playlists, song recommendations, and literature pieces to inspire your soul.",
};

export default async function VersesAndVinylCategory() {
  const posts = await getPostsByCategory("verses-and-vinyl");
  return (
    <CategoryLayout
      title="Verses & Vinyl"
      description="A harmonious blend of music and literature. Explore curated playlists, song recommendations, and literature pieces to inspire your soul."
      posts={posts}
    />
  );
}
