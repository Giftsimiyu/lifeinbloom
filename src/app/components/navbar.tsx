"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <header className="bg-(--color-background-secondary) border-b border-(--color-neutral-cream)">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo on the left */}
        <Link href="/" aria-label="Home" className="flex items-center gap-3">
          <Image
            src="/LIB-logo.jpg"
            alt="Life in Bloom logo"
            width={100}
            height={100}
            priority
            className="block w-16 h-16 md:w-20 md:h-20"
          />
          <div className="hidden md:flex flex-col">
            <p className="logo text-md">Life in Bloom</p>
            <p className="text-(--font-accent-olive) text-xs italic">
              Exploring the beauty in living
            </p>
          </div>
        </Link>

        {/* Right navigation: About, Contact, Search */}
        <nav
          className={`flex items-center transition-all duration-300 ${searchOpen ? "w-full md:w-3/4" : ""}`}
        >
          {!searchOpen && (
            <>
              <div className="relative group">
                <Link
                  href="/about"
                  className="font-body text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  About
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 rounded-xl border border-(--color-neutral-cream) bg-(--color-background-primary) shadow-lg opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-40">
                  <Link
                    href="/about"
                    className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                  >
                    The Blog
                  </Link>
                  <Link
                    href="/about/the-author"
                    className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                  >
                    The Author
                  </Link>
                </div>
              </div>

              <Link
                href="/contact"
                className="font-body text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors ml-6 md:ml-8"
              >
                Contact
              </Link>
            </>
          )}

          {/* Search Bar */}
          <div
            className={`relative ml-auto transition-all duration-300 ${searchOpen ? "w-full md:pr-4" : ""}`}
          >
            {searchOpen ? (
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-(--color-background-primary) border-2 border-(--color-accent-olive) rounded-full font-body text-sm placeholder-opacity-60 focus:outline-none focus:border-(--color-accent-wilderness) transition-all duration-200 shadow-sm"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-3 p-2 text-(--color-accent-olive) hover:text-(--color-accent-wilderness) transition-colors"
                    aria-label="Search"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute -right-10 p-2 text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                    aria-label="Close search"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Category Navigation Bar */}
      <nav
        aria-label="Category navigation"
        className="border-t border-(--color-neutral-cream) bg-(--color-background-primary) py-4"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {/* Velvet & Vine */}
          <div className="relative group">
            <Link
              href="/category/velvet-and-vine"
              className="btn btn-tertiary btn-sm"
            >
              Velvet & Vine
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 rounded-xl border border-(--color-neutral-cream) bg-(--color-background-primary) shadow-lg opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-40">
              <div className="p-4 space-y-2">
                <Link
                  href="/velvet-and-vine/the-style-edit"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  The Style Edit
                </Link>
                <Link
                  href="/velvet-and-vine/glow-and-grow"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  Glow & Grow
                </Link>
                <Link
                  href="/velvet-and-vine/the-wardrobe"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  The Wardrobe
                </Link>
              </div>
            </div>
          </div>

          {/* The Blooming Home */}
          <div className="relative group">
            <Link
              href="/category/blooming-home"
              className="btn btn-tertiary btn-sm"
            >
              The Blooming Home
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 rounded-xl border border-(--color-neutral-cream) bg-(--color-background-primary) shadow-lg opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-40">
              <div className="p-4 space-y-2">
                <Link
                  href="/blooming-home/interior-inspiration"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  Interior Inspiration
                </Link>
                <Link
                  href="/blooming-home/small-spaces"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  Small Spaces
                </Link>
                <Link
                  href="/blooming-home/sanctuary"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  Sanctuary
                </Link>
              </div>
            </div>
          </div>

          {/* Soft Living */}
          <div className="relative group">
            <Link
              href="/category/soft-living"
              className="btn btn-tertiary btn-sm"
            >
              Soft Living
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 rounded-xl border border-(--color-neutral-cream) bg-(--color-background-primary) shadow-lg opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-40">
              <div className="p-4 space-y-2">
                <Link
                  href="/soft-living/nourish"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  Nourish
                </Link>
                <Link
                  href="/soft-living/connections"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  Connections
                </Link>
                <Link
                  href="/soft-living/self-care"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  Self Care
                </Link>
              </div>
            </div>
          </div>

          {/* Verses & Vinyl */}
          <div className="relative group">
            <Link
              href="/category/verses-and-vinyl"
              className="btn btn-tertiary btn-sm"
            >
              Verses & Vinyl
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 rounded-xl border border-(--color-neutral-cream) bg-(--color-background-primary) shadow-lg opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-40">
              <div className="p-4 space-y-2">
                <Link
                  href="/verses-and-vinyl/the-library"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  The Library
                </Link>
                <Link
                  href="/verses-and-vinyl/music"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  Music
                </Link>
              </div>
            </div>
          </div>

          {/* In Bloom */}
          <div className="relative group">
            <Link href="/category/in-bloom" className="btn btn-tertiary btn-sm">
              In Bloom
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 rounded-xl border border-(--color-neutral-cream) bg-(--color-background-primary) shadow-lg opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-40">
              <div className="p-4 space-y-2">
                <Link
                  href="/in-bloom/personal-stories"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  Personal Stories
                </Link>
                <Link
                  href="/in-bloom/user-submissions"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  User Submissions
                </Link>
                <Link
                  href="/in-bloom/QOW"
                  className="block py-2 px-3 rounded hover:bg-(--color-background-secondary) text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors"
                >
                  Question of the Week
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
