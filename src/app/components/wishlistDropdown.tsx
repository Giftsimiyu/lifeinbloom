'use client'

import Link from 'next/link'
import { useWishlist } from './wishlistContext'
import { HiOutlineHeart } from 'react-icons/hi'

export default function WishlistDropdown() {
  const { items } = useWishlist()

  return (
    <Link
      href="/wishlist"
      className="flex items-center gap-3 py-3 px-4 rounded-b-xl hover:bg-[var(--color-background-secondary)] text-sm text-[var(--color-neutral-grey)] hover:text-[var(--color-accent-olive)] transition-colors"
    >
      <div className="relative">
        <HiOutlineHeart className="h-5 w-5" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-[var(--color-accent-terracotta)] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
            {items.length}
          </span>
        )}
      </div>
      <span>Wishlist</span>
    </Link>
  )
}