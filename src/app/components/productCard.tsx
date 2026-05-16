'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  slug: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  isDigital?: boolean;
  isBundle?: boolean;
  bundleItems?: any[];
  bundlePrice?: number;
  bundleDescription?: string;
  category?: {
    title: string;
    slug: string;
  };
}

export default function ProductCard({
  title,
  slug,
  description,
  image,
  price,
  originalPrice,
  isDigital,
  isBundle,
  bundleItems,
  bundlePrice,
  bundleDescription,
  category,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Calculate bundle pricing
  const displayPrice = isBundle && bundlePrice ? bundlePrice : price;
  const displayOriginalPrice = isBundle && bundlePrice ? price : originalPrice;
  const bundleSavings = isBundle && bundleItems
    ? bundleItems.reduce((sum, item) => sum + item.price, 0) - displayPrice
    : 0;

  return (
    <Link href={`/shop/product/${slug}`}>
      <motion.div
        className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 h-64">
          {image && (
            <Image
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={400}
              height={256}
            />
          )}
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className={`absolute ${(isDigital || isBundle) ? 'top-20' : 'top-4'} right-4 bg-(--color-accent-terracotta) text-white px-3 py-1 rounded-full text-sm font-semibold`}>
              -{discount}%
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 left-4 bg-(--color-accent-olive) text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
              {category.title}
            </div>
          )}

          {/* Digital Badge */}
          {isDigital && (
            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
              Digital
            </div>
          )}

          {/* Bundle Badge */}
          {isBundle && (
            <div className={`absolute ${isDigital ? 'top-12' : 'top-4'} right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider`}>
              Bundle
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-5 flex-grow flex flex-col">
          {/* Title */}
          <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-2 line-clamp-2 group-hover:text-(--color-accent-olive) transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-(--color-neutral-grey) mb-4 line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Price Section */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-display text-2xl text-(--color-accent-wilderness)">
              KSH{displayPrice.toFixed(2)}
            </span>
            {displayOriginalPrice && displayOriginalPrice > displayPrice && (
              <span className="text-sm text-(--color-neutral-grey) line-through">
                KSH{displayOriginalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Bundle Savings */}
          {isBundle && bundleSavings > 0 && (
            <div className="mb-4">
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                Save KSH{bundleSavings.toFixed(2)}
              </span>
            </div>
          )}

          {/* CTA Button */}
          <button className="w-full bg-(--color-accent-wilderness) hover:bg-(--color-accent-olive) text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
            View Product
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
