'use client'

import React from 'react'
import { CartProvider, useCart } from '../components/cartContext'

function CartView() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart()

  async function checkout() {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const json = await res.json()
      if (json.url) {
        window.location.href = json.url
      } else {
        alert('Checkout not configured; see console for details')
        console.log(json)
      }
    } catch (err) {
      console.error('Checkout error', err)
      alert('Failed to start checkout')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-2xl mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.id} className="p-4 border rounded flex items-start justify-between">
                <div>
                  <p className="font-medium">{it.title}</p>
                  <p className="text-sm text-(--color-neutral-grey)">Price: ${it.price.toFixed(2)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <label className="text-sm">Qty</label>
                    <input type="number" min={1} value={it.quantity} onChange={(e) => updateQuantity(it.id, Number(e.target.value))} className="w-20 border rounded p-1" />
                    <button onClick={() => removeItem(it.id)} className="text-sm text-red-600">Remove</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(it.price * it.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <button onClick={() => clearCart()} className="px-4 py-2 rounded border">Clear</button>
            </div>
            <div className="text-right">
              <p className="text-sm">Total</p>
              <p className="font-display text-xl">${total.toFixed(2)}</p>
              <button onClick={checkout} className="mt-3 px-4 py-2 rounded bg-(--color-accent-olive) text-white">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartView />
    </CartProvider>
  )
}
