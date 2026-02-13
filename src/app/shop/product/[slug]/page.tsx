import { Metadata } from "next";
import { getProductBySlug } from "@/sanity/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import GlowingAccent from "@/app/components/glowingAccent";
import NewsletterForm from "@/app/components/newsletterForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  const ogImage = product?.image || null;

  return {
    title: product?.title || "Product",
    description: product?.description || "Discover this product on Life in Bloom Shop",
    openGraph: {
      title: product?.title || "Product",
      description: product?.description || "",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-(--color-background-secondary) flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-(--color-accent-wilderness) mb-4">
            Product Not Found
          </h1>
          <p className="text-(--color-neutral-grey) mb-8">
            Sorry, we couldn't find this product.
          </p>
          <Link href="/shop" className="inline-block px-6 py-3 bg-(--color-accent-wilderness) text-white rounded hover:bg-(--color-accent-olive) transition-colors">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="bg-(--color-background-secondary)">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-8 py-4 text-sm">
        <Link href="/shop" className="text-(--color-accent-olive) hover:text-(--color-accent-wilderness)">
          Shop
        </Link>
        <span className="text-(--color-neutral-grey) mx-2">/</span>
        {product.category && (
          <>
            <Link href={`/shop?category=${product.category.slug}`} className="text-(--color-accent-olive) hover:text-(--color-accent-wilderness)">
              {product.category.title}
            </Link>
            <span className="text-(--color-neutral-grey) mx-2">/</span>
          </>
        )}
        <span className="text-(--color-accent-olive)">{product.title}</span>
      </nav>

      {/* Product Detail Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {product.image && (
                <div className="relative bg-gray-100 rounded-lg overflow-hidden h-96 md:h-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                  {discount > 0 && (
                    <div className="absolute top-4 right-4 bg-(--color-accent-terracotta) text-white px-4 py-2 rounded-full font-semibold">
                      -{discount}%
                    </div>
                  )}
                </div>
              )}

              {/* Gallery */}
              {product.gallery && product.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.gallery.map((image: any, idx: number) => (
                    <div key={idx} className="relative bg-gray-100 rounded-lg overflow-hidden h-24 cursor-pointer hover:opacity-80 transition-opacity">
                      <Image
                        src={image.url}
                        alt={image.alt || `Gallery image ${idx + 1}`}
                        className="w-full h-full object-cover"
                        width={150}
                        height={150}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Category */}
              {product.category && (
                <div className="inline-block">
                  <span className="text-xs font-medium uppercase tracking-widest text-(--color-accent-olive)">
                    {product.category.title}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl text-(--color-accent-wilderness)">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4 py-6 border-y border-(--color-neutral-cream)">
                <div className="font-display text-4xl text-(--color-accent-wilderness)">
                  ${product.price.toFixed(2)}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-xl text-(--color-neutral-grey) line-through">
                    ${product.originalPrice.toFixed(2)}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-lg text-(--color-neutral-grey) leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className={`p-4 rounded-lg ${product.stock > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                {product.stock > 0 ? (
                  <p className="text-green-700 font-semibold">✓ In Stock ({product.stock} available)</p>
                ) : (
                  <p className="text-red-700 font-semibold">Out of Stock</p>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-6">
                <button
                  disabled={product.stock === 0}
                  className={`w-full py-4 px-6 rounded font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    product.stock > 0
                      ? 'bg-(--color-accent-wilderness) hover:bg-(--color-accent-olive)'
                      : 'bg-(--color-neutral-grey)'
                  }`}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="w-full py-4 px-6 rounded font-semibold border-2 border-(--color-accent-olive) text-(--color-accent-olive) hover:bg-(--color-accent-olive) hover:text-white transition-colors">
                  Add to Wishlist
                </button>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="pt-6 border-t border-(--color-neutral-cream)">
                  <h4 className="font-semibold text-(--color-accent-wilderness) mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-(--color-neutral-cream) text-sm rounded-full text-(--color-neutral-grey)">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details Content */}
          {product.content && product.content.length > 0 && (
            <div className="mt-20 pt-12 border-t border-(--color-neutral-cream)">
              <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-8">
                Product Details
              </h2>
              <div className="max-w-3xl prose prose-lg text-(--color-neutral-grey)">
                <PortableText value={product.content} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative bg-(--color-background-primary) py-20 border-t border-(--color-neutral-cream)">
        <GlowingAccent position="bottom-right" size={250} color="terracotta" opacity={0.05} />
        <div className="max-w-3xl mx-auto px-8 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl text-(--color-accent-wilderness) mb-4">
            Love What We Do?
          </h2>
          <p className="text-neutral-grey mb-8">
            Subscribe to stay updated on new products and exclusive offers.
          </p>
          <NewsletterForm variant="full" />
        </div>
      </section>

      {/* Back to Shop */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-(--color-accent-wilderness) text-white rounded hover:bg-(--color-accent-olive) transition-colors"
        >
          ← Back to Shop
        </Link>
      </div>
    </main>
  );
}
