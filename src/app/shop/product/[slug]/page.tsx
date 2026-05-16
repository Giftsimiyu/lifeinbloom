'use client';

import { useState, useEffect } from "react";
import { getProductBySlug, getProductsByCategory } from "@/sanity/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import GlowingAccent from "@/app/components/glowingAccent";
import NewsletterForm from "@/app/components/newsletterForm";
import ProductImageGallery from "@/app/components/productImageGallery";
import { useCart } from "@/app/components/cartContext";
import { useWishlist } from "@/app/components/wishlistContext";
import { HiOutlineShare, HiOutlineCheck } from "react-icons/hi";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>("");
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug).then((productData) => {
        setProduct(productData);
        setLoading(false);
        
        // Fetch similar products based on category
        if (productData?.category?.slug) {
          getProductsByCategory(productData.category.slug, 4).then((products) => {
            // Filter out the current product
            const filteredProducts = products.filter((p: any) => p.slug !== slug);
            setSimilarProducts(filteredProducts);
          });
        }
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--color-background-secondary)] flex items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent-wilderness)]"></div>
          <p className="mt-4 text-[var(--color-neutral-grey)]">Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[var(--color-background-secondary)] flex items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <h1 className="font-display text-3xl text-[var(--color-accent-wilderness)] mb-4">
            Product Not Found
          </h1>
          <p className="text-[var(--color-neutral-grey)] mb-8">
            Sorry, we couldn't find this product.
          </p>
          <Link href="/shop" className="inline-block px-6 py-3 bg-[var(--color-accent-wilderness)] text-white rounded hover:bg-[var(--color-accent-olive)] transition-colors">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Calculate bundle pricing
  const displayPrice = product.isBundle && product.bundlePrice ? product.bundlePrice : product.price;
  const displayOriginalPrice = product.isBundle && product.bundlePrice ? product.price : product.originalPrice;
  const bundleSavings = product.isBundle && product.bundleItems
    ? product.bundleItems.reduce((sum: number, item: { price: number }) => sum + item.price, 0) - displayPrice
    : 0;

  const handleAddToCart = async () => {
    setAddingToCart(true);
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
      slug: product.slug,
    });
    
    setAddingToCart(false);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = product.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.slug)) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist({
        id: product.slug,
        title: product.title,
        price: product.price,
        image: product.image,
        slug: product.slug,
      });
    }
  };

  return (
    <main className="bg-[var(--color-background-secondary)] overflow-x-visible">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-8 py-6 text-sm border-b border-[var(--color-neutral-cream)]">
        <div className="flex items-center space-x-2">
          <Link href="/shop" className="text-[var(--color-accent-olive)] hover:text-[var(--color-accent-wilderness)] transition-colors">
            Shop
          </Link>
          <span className="text-[var(--color-neutral-grey)]">/</span>
          {product.category && (
            <>
              <Link href={`/shop?category=${product.category.slug}`} className="text-[var(--color-accent-olive)] hover:text-[var(--color-accent-wilderness)] transition-colors">
                {product.category.title}
              </Link>
              <span className="text-[var(--color-neutral-grey)]">/</span>
            </>
          )}
          <span className="text-[var(--color-accent-wilderness)] font-medium">{product.title}</span>
        </div>
      </nav>

      {/* Product Detail Section */}
      <section className="py-16 md:py-24 relative">
        <GlowingAccent position="top-left" size={300} color="olive" opacity={0.03} />
        <GlowingAccent position="bottom-right" size={250} color="terracotta" opacity={0.03} />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-stretch">
            {/* Product Images */}
            <div className="w-full lg:w-1/2 flex-shrink-0 h-full">
              <ProductImageGallery
                mainImage={product.image}
                galleryImages={product.gallery || []}
                title={product.title}
                discount={discount}
                className="h-full"
                mainImageClassName="h-4/5"
              />
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-8 lg:pt-8 min-h-[600px] max-h-[720px] overflow-y-auto pr-2  border border-[var(--color-neutral-cream)] rounded-2xl shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Category Badge */}
              {product.category && (
                <div className="inline-block">
                  <span className="inline-flex items-center px-4 py-2 bg-[var(--color-accent-olive)]/10 text-[var(--color-accent-olive)] text-xs font-semibold uppercase tracking-wider rounded-full">
                    {product.category.title}
                  </span>
                </div>
              )}

              {/* Digital Badge */}
              {product.isDigital && (
                <div className="inline-block ml-4">
                  <span className="inline-flex items-center px-4 py-2 bg-blue-500/10 text-blue-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                    Digital Product
                  </span>
                </div>
              )}

              {/* Bundle Badge */}
              {product.isBundle && (
                <div className="inline-block ml-4">
                  <span className="inline-flex items-center px-4 py-2 bg-purple-500/10 text-purple-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                    Product Bundle
                  </span>
                </div>
              )}

              {/* Title */}
              <div className="flex items-start justify-between">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--color-accent-wilderness)] leading-tight mb-4 flex-1">
                  {product.title}
                </h1>
                <button
                  onClick={handleShare}
                  className="p-3 ml-4 text-[var(--color-neutral-grey)] hover:text-[var(--color-accent-olive)] transition-colors border border-[var(--color-neutral-cream)] rounded-lg hover:bg-[var(--color-background-secondary)]"
                  title="Share this product"
                >
                  {shareSuccess ? (
                    <HiOutlineCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <HiOutlineShare className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Price Section */}
              <div className="flex items-baseline gap-6 py-8 border-y border-[var(--color-neutral-cream)]">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl text-[var(--color-accent-wilderness)]">
                    KSH{displayPrice.toFixed(2)}
                  </span>
                  {displayOriginalPrice && displayOriginalPrice > displayPrice && (
                    <span className="text-2xl text-[var(--color-neutral-grey)] line-through">
                      KSH{displayOriginalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {bundleSavings > 0 && (
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Save KSH{bundleSavings.toFixed(2)}
                  </span>
                )}
                {discount > 0 && !product.isBundle && (
                  <span className="text-sm font-medium text-[var(--color-accent-terracotta)] bg-[var(--color-accent-terracotta)]/10 px-3 py-1 rounded-full">
                    Save KSH{((product.originalPrice || 0) - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-xl text-[var(--color-neutral-grey)] leading-relaxed">
                  {product.bundleDescription || product.description}
                </p>
              </div>

              {/* Bundle Items */}
              {product.isBundle && product.bundleItems && product.bundleItems.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--color-accent-wilderness)]">What's Included in This Bundle:</h3>
                  <div className="grid gap-3">
                    {product.bundleItems.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-[var(--color-background-secondary)] rounded-lg border border-[var(--color-neutral-cream)]">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[var(--color-accent-wilderness)]">{item.title}</h4>
                          <p className="text-sm text-[var(--color-neutral-grey)] line-clamp-1">{item.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-display text-lg text-[var(--color-accent-wilderness)]">
                            KSH{item.price.toFixed(2)}
                          </span>
                          {item.isDigital && (
                            <div className="text-xs text-blue-600 mt-1">Digital</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-purple-800">Bundle Total Value:</span>
                      <span className="font-display text-xl text-purple-800">
                        KSH{product.bundleItems.reduce((sum: number, item: { price: number }) => sum + item.price, 0).toFixed(2)}
                      </span>
                    </div>
                    {bundleSavings > 0 && (
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-purple-600">Your Savings:</span>
                        <span className="text-sm font-medium text-green-600">
                          -KSH{bundleSavings.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-4 pt-8">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full py-5 px-8 rounded-xl font-bold text-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 bg-[var(--color-accent-wilderness)] hover:bg-[var(--color-accent-olive)] shadow-lg hover:shadow-xl"
                >
                  {addingToCart ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding...
                    </div>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`w-full py-4 px-8 rounded-xl font-semibold border-2 transition-all duration-300 hover:scale-105 ${
                    isInWishlist(product.slug)
                      ? 'border-red-500 text-red-500 bg-red-50 hover:bg-red-100'
                      : 'border-[var(--color-accent-olive)] text-[var(--color-accent-olive)] hover:bg-[var(--color-accent-olive)] hover:text-white'
                  }`}
                >
                  {isInWishlist(product.slug) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="pt-8 border-t border-[var(--color-neutral-cream)]">
                  <h4 className="font-semibold text-[var(--color-accent-wilderness)] mb-4 text-lg">Tags</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.tags.map((tag: string) => (
                      <span key={tag} className="px-4 py-2 bg-[var(--color-neutral-cream)] text-sm rounded-full text-[var(--color-neutral-grey)] hover:bg-[var(--color-accent-olive)] hover:text-white transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.content && product.content.length > 0 && (
                <div className="pt-8 border-t border-[var(--color-neutral-cream)]">
                  <h3 className="font-semibold text-[var(--color-accent-wilderness)] mb-4 text-lg">Product Details</h3>
                  <div className="prose prose-xl prose-headings:text-[var(--color-accent-wilderness)] prose-p:text-[var(--color-neutral-grey)] prose-strong:text-[var(--color-accent-wilderness)] prose-a:text-[var(--color-accent-olive)] hover:prose-a:text-[var(--color-accent-wilderness)]">
                    <PortableText value={product.content} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* You May Also Like Section */}
          {similarProducts.length > 0 && (
            <div className="mt-40 pt-16 border-t border-[var(--color-neutral-cream)]">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl text-[var(--color-accent-wilderness)] mb-4">
                  You May Also Like
                </h2>
                <div className="w-24 h-1 bg-[var(--color-accent-olive)] mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {similarProducts.map((similarProduct) => (
                  <Link
                    key={similarProduct.slug}
                    href={`/shop/product/${similarProduct.slug}`}
                    className="group bg-[var(--color-background-primary)] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-[var(--color-neutral-cream)] flex flex-col h-full overflow-hidden"
                  >
                    <div className="relative overflow-hidden h-56 md:h-64 lg:h-56">
                      <Image
                        src={urlFor(similarProduct.image).width(400).height(400).url()}
                        alt={similarProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {similarProduct.originalPrice && similarProduct.originalPrice > similarProduct.price && (
                        <div className="absolute top-3 left-3 bg-[var(--color-accent-terracotta)] text-white text-xs font-bold px-2 py-1 rounded-full">
                          Save KSH{(similarProduct.originalPrice - similarProduct.price).toFixed(2)}
                        </div>
                      )}
                      {similarProduct.isDigital && (
                        <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Digital
                        </div>
                      )}
                      {similarProduct.isBundle && (
                        <div className={`absolute ${similarProduct.isDigital ? 'top-12' : 'top-3'} right-3 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full`}>
                          Bundle
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-[var(--color-accent-wilderness)] mb-2 line-clamp-2 group-hover:text-[var(--color-accent-olive)] transition-colors">
                        {similarProduct.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-display text-lg text-[var(--color-accent-wilderness)]">
                          KSH{similarProduct.price.toFixed(2)}
                        </span>
                        {similarProduct.originalPrice && similarProduct.originalPrice > similarProduct.price && (
                          <span className="text-sm text-[var(--color-neutral-grey)] line-through">
                            KSH{similarProduct.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-neutral-grey)] line-clamp-3 flex-1">
                        {similarProduct.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative bg-[var(--color-background-primary)] py-24 border-t border-[var(--color-neutral-cream)]">
        <GlowingAccent position="top-left" size={300} color="wilderness" opacity={0.05} />
        <GlowingAccent position="bottom-right" size={250} color="terracotta" opacity={0.05} />
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <div className="space-y-6">
            <h2 className="font-display text-4xl md:text-5xl text-[var(--color-accent-wilderness)]">
              Love What We Do?
            </h2>
            <p className="text-xl text-[var(--color-neutral-grey)] max-w-2xl mx-auto leading-relaxed">
              Subscribe to stay updated on new products and exclusive offers.
            </p>
            <div className="mt-10">
              <NewsletterForm variant="full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
