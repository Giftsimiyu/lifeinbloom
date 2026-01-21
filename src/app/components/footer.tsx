"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import NewsletterForm from "./newsletterForm";

export default function Footer() {
  return (
    <footer className="bg-(--color-background-secondary) border-t border-(--color-neutral-cream)">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 grid gap-8 md:grid-cols-2">
        {/* vertical divider (md+) */}
        <div
          className="hidden md:block absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-(--color-neutral-cream)"
          aria-hidden
        />
        {/* Left column */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/LIB-logo.jpg"
            alt="Life in Bloom Logo"
            width={150}
            height={56}
            className="mb-2 block"
          />

          <div className="flex flex-col mb-3">
            <p className="logo text-md">Life in Bloom</p>
            <p className="text-(--font-accent-olive) text-sm italic">
              Exploring the beauty in living
            </p>
          </div>

          {/* Social links with icons */}
          <div className="flex gap-4 items-center justify-center">
            <a href="/" target="_blank" aria-label="Instagram">
              <FaInstagram className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors" />
            </a>
            <a href="/" target="_blank" aria-label="Pinterest">
              <FaPinterest className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors " />
            </a>
            <a href="/" target="_blank" aria-label="Twitter">
              <FaTwitter className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors " />
            </a>
            <a href="/" target="_blank" aria-label="LinkedIn">
              <FaLinkedin className="text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors " />
            </a>
          </div>

          {/* Newsletter (optional) */}
          <div className="mt-6 w-full">
            <NewsletterForm />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col items-center text-center">
          <h4 className="font-body text-sm uppercase tracking-wide text-(--color-accent-olive) mb-6">
            Explore
          </h4>

          <ul className="space-y-4 font-body text-sm text-(--color-neutral-grey)">
            <li>
              <Link
                href="/velvet-and-vine"
                className="hover:text-(--color-accent-terracotta)"
              >
                Velvet &amp; Vine
              </Link>
            </li>
            <li>
              <Link
                href="/the-blooming-home"
                className="hover:text-(--color-accent-terracotta)"
              >
                The Blooming Home
              </Link>
            </li>
            <li>
              <Link
                href="/soft-living"
                className="hover:text-(--color-accent-terracotta)"
              >
                Soft Living
              </Link>
            </li>
            <li>
              <Link
                href="/in-bloom"
                className="hover:text-(--color-accent-terracotta)"
              >
                In Bloom
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div className="border-t border-(--color-neutral-cream) py-6">
        <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
          <p className="font-body text-xs text-(--color-neutral-grey)">
            © {new Date().getFullYear()} Life in Bloom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
