'use client'

import React from 'react'
import { WishlistProvider, useWishlist } from '../components/wishlistContext'
import Link from 'next/link'
import Image from 'next/image'
import { HiOutlineX } from 'react-icons/hi'

function WishlistView() {
  const { items, removeItem, clearWishlist } = useWishlist()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 overflow-x-hidden">
      <h1 className="font-display text-3xl mb-6 text-[var(--color-accent-wilderness)]">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💝</div>
          <h2 className="font-display text-2xl text-[var(--color-accent-wilderness)] mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-[var(--color-neutral-grey)] mb-8">
            Start adding items you love to your wishlist!
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-[var(--color-accent-wilderness)] text-white rounded-lg hover:bg-[var(--color-accent-olive)] transition-colors font-medium"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-[var(--color-neutral-grey)]">{items.length} item{items.length !== 1 ? 's' : ''} in your wishlist</p>
            <button
              onClick={() => clearWishlist()}
              className="px-4 py-2 rounded border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
            >
              Clear Wishlist
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-[var(--color-neutral-cream)] overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square relative">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--color-accent-wilderness)] mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-lg font-bold text-[var(--color-accent-wilderness)] mb-4">
                    KSH{item.price.toFixed(2)}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/shop/product/${item.slug}`}
                      className="flex-1 text-center py-2 px-4 bg-[var(--color-accent-wilderness)] text-white rounded-lg hover:bg-[var(--color-accent-olive)] transition-colors font-medium"
                    >
                      View Product
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove from wishlist"
                    >
                      <HiOutlineX className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function WishlistPage() {
  return <WishlistView />
}