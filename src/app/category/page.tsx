import Link from "next/link";
import { getAllCategories } from "@/sanity/lib/sanity";
import RotatingFlower from "@/app/components/rotatingFlower";
import Floating3dLeaf from "@/app/components/floating3dLeaf";
import CategoriesSection from "@/app/components/CategoriesSection";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="relative bg-(--color-background-secondary) py-24">
      {/* Decorative 3D elements */}
      <RotatingFlower position="top-right" size={120} delay={0} />
      <RotatingFlower position="bottom-left" size={90} delay={2} />
      <Floating3dLeaf delay={0.5} scale={1.1} />
      <Floating3dLeaf delay={2.5} scale={0.8} />

      <CategoriesSection categories={categories} />
    </main>
  );
}
