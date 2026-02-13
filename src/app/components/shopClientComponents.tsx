'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "./productCard";
import Card3d from "./card3d";

interface FeaturedProductsProps {
  products: any[];
}

export function FeaturedProductsSection({ products }: FeaturedProductsProps) {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: "var(--color-accent-wilderness)" }}>
            Featured Collections
          </h2>
          <p className="text-base" style={{ color: "var(--color-neutral-grey)" }}>
            Our handpicked selections for you
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any, idx: number) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
            >
              <Card3d>
                <ProductCard
                  title={product.title}
                  slug={product.slug}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  category={product.category}
                />
              </Card3d>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CategoryFilterProps {
  categories: any[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <h3 className="font-display text-lg mb-6" style={{ color: "var(--color-accent-wilderness)" }}>
        Browse by Category
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat: any) => (
          <Link key={cat.slug} href={`/shop?category=${cat.slug}`}>
            <motion.div
              className="p-6 rounded-lg bg-white hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ y: -2 }}
            >
              <h4 className="font-display text-(--color-accent-wilderness) hover:text-(--color-accent-olive) transition-colors">
                {cat.title}
              </h4>
              {cat.description && (
                <p className="text-sm text-(--color-neutral-grey) mt-2">{cat.description}</p>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

interface ProductsGridProps {
  products: any[];
  currentPage: number;
  totalPages: number;
  category?: string;
}

export function ProductsGrid({ products, currentPage, totalPages, category }: ProductsGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--color-accent-wilderness)" }}>
          All Products
        </h2>
        <p className="text-sm text-(--color-neutral-grey) mt-2">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {products && products.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {products.map((product: any, idx: number) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <ProductCard
                  title={product.title}
                  slug={product.slug}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  category={product.category}
                />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-4 mt-12">
              {currentPage > 1 && (
                <Link
                  href={`/shop?page=${currentPage - 1}${category ? `&category=${category}` : ""}`}
                  className="px-4 py-2 rounded border border-(--color-accent-olive) text-(--color-accent-olive) hover:bg-(--color-accent-olive) hover:text-white transition-colors"
                >
                  Previous
                </Link>
              )}

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Link
                      key={pageNum}
                      href={`/shop?page=${pageNum}${category ? `&category=${category}` : ""}`}
                      className={`px-3 py-2 rounded transition-colors ${
                        pageNum === currentPage
                          ? "bg-(--color-accent-olive) text-white"
                          : "border border-(--color-neutral-cream) hover:bg-(--color-neutral-cream)"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>

              {currentPage < totalPages && (
                <Link
                  href={`/shop?page=${currentPage + 1}${category ? `&category=${category}` : ""}`}
                  className="px-4 py-2 rounded border border-(--color-accent-olive) text-(--color-accent-olive) hover:bg-(--color-accent-olive) hover:text-white transition-colors"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="font-display text-2xl text-(--color-accent-wilderness) mb-4">
            No products found
          </p>
          <p className="text-(--color-neutral-grey) mb-8">
            Check back soon for new items or explore other categories.
          </p>
          <Link href="/shop" className="inline-block px-6 py-3 bg-(--color-accent-wilderness) text-white rounded hover:bg-(--color-accent-olive) transition-colors">
            View All Products
          </Link>
        </div>
      )}
    </motion.div>
  );
}

interface HeroSectionProps {
  children: React.ReactNode;
}

export function HeroSection({ children }: HeroSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="space-y-6 text-center"
    >
      {children}
    </motion.div>
  );
}

interface NewsletterSectionProps {
  children: React.ReactNode;
}

export function NewsletterSection({ children }: NewsletterSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
