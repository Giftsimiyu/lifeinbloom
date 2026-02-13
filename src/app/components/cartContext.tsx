'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  image?: string
  slug?: string
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart')
      if (raw) setItems(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch (e) {}
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id)
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p))
      }
      return [...prev, item]
    })
  }

  const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id))

  const updateQuantity = (id: string, qty: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default CartProvider
