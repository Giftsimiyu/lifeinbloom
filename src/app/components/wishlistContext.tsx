'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type WishlistItem = {
  id: string
  title: string
  price: number
  image?: string
  slug?: string
}

type WishlistContextValue = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('wishlist')
      if (raw) setItems(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(items))
    } catch (e) {}
  }, [items])

  const addItem = (item: WishlistItem) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id)
      if (!found) {
        return [...prev, item]
      }
      return prev
    })
  }

  const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id))

  const isInWishlist = (id: string) => items.some((item) => item.id === id)

  const clearWishlist = () => setItems([])

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}

export default WishlistProvider