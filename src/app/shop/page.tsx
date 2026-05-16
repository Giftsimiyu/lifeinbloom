import { Metadata } from "next";
import { getFeaturedProducts, getProductCategories, getAllProducts, getTotalProductCount, getProductsByCategory, getProductsByCategoryCount } from "@/sanity/lib/sanity";
import RotatingFlower from "@/app/components/rotatingFlower";
import Floating3dLeaf from "@/app/components/floating3dLeaf";
import GlowingAccent from "@/app/components/glowingAccent";
import Sparkle from "@/app/components/sparkle";
import NewsletterForm from "@/app/components/newsletterForm";
import { FeaturedProductsSection, CategoryFilter, ProductsGrid, HeroSection, NewsletterSection } from "@/app/components/shopClientComponents";

export const metadata: Metadata = {
  title: "Shop",
  description: "Discover curated products that celebrate intentional living and natural beauty from Life in Bloom.",
};

const PRODUCTS_PER_PAGE = 12;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page = "1", category } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

  // Fetch featured products
  const featuredProducts = await getFeaturedProducts(6);

  // Fetch product categories
  const productCategories = await getProductCategories();

  // Fetch products for current page
  let allProducts;
  let totalCount;
  if (category) {
    allProducts = await getProductsByCategory(category, PRODUCTS_PER_PAGE, offset);
    totalCount = await getProductsByCategoryCount(category);
  } else {
    allProducts = await getAllProducts(PRODUCTS_PER_PAGE, offset);
    totalCount = await getTotalProductCount();
  }
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  return (
    <main className="bg-(--color-background-secondary) overflow-x-visible">
      {/* Hero Section */}
      <section className="relative bg-(--color-background-primary) py-20 md:py-28 overflow-visible">
        {/* Decorative 3D elements */}
        <RotatingFlower position="top-right" delay={0} />
        <Floating3dLeaf delay={0} scale={1.2} />
        <Floating3dLeaf delay={1} scale={0.8} />
        <Sparkle position="top-left" delay={0.5} />
        <Sparkle position="bottom-right" delay={1.5} />
        <Sparkle position="center" delay={2} opacity={0.2} />

        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <HeroSection>
            <p className="text-xs md:text-sm tracking-widest uppercase font-medium" style={{ color: "var(--color-accent-olive)" }}>
              Curated for You
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ color: "var(--color-accent-wilderness)" }}>
              Life in Bloom Shop
            </h1>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--color-neutral-grey)" }}>
            A collection of thoughtfully selected digital tools and resources designed to help enhance your journey of intentional living and personal growth. Instant download after purchase.
            </p>
          </HeroSection>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts && featuredProducts.length > 0 && (
        <FeaturedProductsSection products={featuredProducts} />
      )}

      {/* Shop Section */}
      <section className="relative py-20 md:py-24">
        <GlowingAccent position="top-left" size={250} color="olive" opacity={0.05} />
        <Sparkle position="top-right" delay={0} size={30} />
        <Sparkle position="bottom-left" delay={1} size={40} />
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          {/* Categories Filter */}
          {productCategories && productCategories.length > 0 && (
            <CategoryFilter categories={productCategories} />
          )}

          {/* Products Grid */}
          <ProductsGrid 
            products={allProducts} 
            currentPage={currentPage} 
            totalPages={totalPages}
            category={category}
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <Sparkle position="top-left" delay={0.5} size={35} />
        <Sparkle position="bottom-right" delay={1.5} size={25} />
        <section className="relative bg-(--color-background-primary) py-20 border-t border-(--color-neutral-cream)">
        <GlowingAccent position="bottom-right" size={250} color="terracotta" opacity={0.05} />
        <div className="max-w-3xl mx-auto px-8 text-center relative z-10">
          <NewsletterSection>
            <h2 className="font-display text-3xl md:text-4xl text-(--color-accent-wilderness) mb-4">
              Never Miss New Arrivals
            </h2>
            <p className="text-neutral-grey mb-8">
              Subscribe to get notified when we add new products to the shop.
            </p>
            <NewsletterForm variant="full" />
          </NewsletterSection>
        </div>
      </section>
    </main>
  );
}
