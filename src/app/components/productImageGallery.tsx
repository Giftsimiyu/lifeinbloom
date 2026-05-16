'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HiOutlineCheck } from 'react-icons/hi';

interface ProductImageGalleryProps {
  mainImage: string;
  galleryImages: Array<{ url: string; alt?: string }>;
  title: string;
  discount: number;
  className?: string;
  mainImageClassName?: string;
}

export default function ProductImageGallery({
  mainImage,
  galleryImages,
  title,
  discount,
  className,
  mainImageClassName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  const allImages = [mainImage, ...galleryImages.map(img => img.url)];

  return (
    <div className={`space-y-6 ${className ?? ''}`}>
      {/* Main Image */}
      <div
        className={`relative bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer ${
          mainImageClassName ?? 'h-96 md:h-[500px]'
        }`}
      >
        <Image
          src={selectedImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={600}
          height={600}
        />
        {discount > 0 && (
          <div className="absolute top-6 right-6 bg-[var(--color-accent-terracotta)] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
            -{discount}% OFF
          </div>
        )}
      </div>

      {/* Gallery Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.map((imageUrl, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(imageUrl)}
              className={`relative bg-white rounded-lg overflow-hidden h-20 md:h-24 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedImage === imageUrl
                  ? 'ring-2 ring-[var(--color-accent-olive)] shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <Image
                src={imageUrl}
                alt={galleryImages[idx - 1]?.alt || `${title} - Image ${idx + 1}`}
                className="w-full h-full object-cover"
                width={150}
                height={150}
              />
              {selectedImage === imageUrl && (
                <div className="absolute inset-0 bg-[var(--color-accent-olive)]/20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[var(--color-accent-olive)] rounded-full flex items-center justify-center">
                    <HiOutlineCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}