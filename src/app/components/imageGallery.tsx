"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryImage = {
  _key?: string;
  url: string;
  alt?: string;
};

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
  };

  const nextImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-8">
        {images.map((img, index) => (
          <button
            key={img._key || index}
            onClick={() => openLightbox(index)}
            className="relative aspect-square overflow-hidden rounded-xl group"
          >
            <Image
              src={img.url}
              alt={img.alt || "Gallery image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {currentIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ×
          </button>

          {/* Prev */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-10 text-white text-4xl"
          >
            ‹
          </button>

          {/* Image */}
          <div className="relative w-[90vw] max-w-4xl aspect-4/5 md:aspect-3/2">
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || ""}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-10 text-white text-4xl"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
