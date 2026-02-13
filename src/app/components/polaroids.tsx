"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type PolaroidProps = {
  src: string;
  alt: string;
  label: string;
  slug?: string;
  rotation?: number;
  delay?: number;
};

function Polaroid({ src, alt, label, slug, rotation = 0, delay = 0 }: PolaroidProps) {
  return (
    <Link href={slug ? `/category/${slug}` : "#"}>
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: rotation - 5 }}
        animate={{ opacity: 1, y: 0, rotate: rotation }}
        transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
        whileHover={{ scale: 1.15, y: -10 }}
        className="w-40 md:w-48 shadow-lg hover:shadow-2xl rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          backgroundColor: "var(--color-neutral-ivory)",
          border: "1px solid var(--color-neutral-cream)",
        }}
      >
        <div className="relative h-40 md:h-48 w-full">
          <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 150px, 200px" />
        </div>
        <div className="px-3 pb-3 pt-2">
          <p className="text-[11px] tracking-[0.16em] uppercase" style={{ color: "var(--color-neutral-grey)" }}>
            {label}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Polaroids() {
  const polaroids = [
    {
      src: "/velvet-1.jpg",
      alt: "Curated wardrobe with neutral outfits hanging",
      label: "Velvet & Vine",
      slug: "velvet-and-vine",
      rotation: 4,
      delay: 0.3,
    },
    {
      src: "/home.jpg",
      alt: "Sunlight on a styled corner of a living room with plants",
      label: "The Blooming Home",
      slug: "blooming-home",
      rotation: -2,
      delay: 0.45,
    },
    {
      src: "/soft-2.jpg",
      alt: "A girl sitting in a field watching as the sun sets in the horizon",
      label: "Soft Living",
      slug: "soft-living",
      rotation: 3,
      delay: 0.15,
    },
    
    
    {
      src: "/vinyl-2.jpg",
      alt: "A cozy reading nook with a cup of tea and open book",
      label: "Verses & Vinyl",
      slug: "verses-and-vinyl",
      rotation: -3,
      delay: 0.6,
    },
    {
      src: "/in-bloom.jpg",
      alt: "A girl seated at window journalling with the sunrise outside",
      label: "In Bloom",
      slug: "in-bloom",
      rotation: 2,
      delay: 0.75,
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.div
          className="hidden md:flex gap-6 md:gap-8 justify-center overflow-x-auto pb-4 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {polaroids.map((polaroid, index) => (
            <div key={index} className="flex-shrink-0">
              <Polaroid {...polaroid} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
