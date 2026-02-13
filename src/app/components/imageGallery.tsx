"use client";

import { useState, useEffect, useRef } from "react";
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentIndex === null) return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          nextImage();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevImage();
          break;
        case "Escape":
          e.preventDefault();
          closeLightbox();
          break;
        default:
          break;
      }
    };

    if (currentIndex !== null) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [currentIndex]);

  // Handle touch/swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
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
            aria-label={`Open gallery image ${index + 1}`}
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
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300 transition-colors z-10"
            aria-label="Close gallery"
          >
            ×
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 md:left-10 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Image Container */}
          <div
            className="relative w-[90vw] max-w-4xl aspect-4/5 md:aspect-3/2"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || ""}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 md:right-10 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 right-6 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
