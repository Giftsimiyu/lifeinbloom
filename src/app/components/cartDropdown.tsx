'use client'

import Link from 'next/link'
import { useCart } from './cartContext'
import { HiOutlineShoppingBag } from 'react-icons/hi'

export default function CartDropdown() {
  const { items, total } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link
      href="/cart"
      className="flex items-center justify-between gap-3 py-3 px-4 hover:bg-[var(--color-background-secondary)] text-sm text-[var(--color-neutral-grey)] hover:text-[var(--color-accent-olive)] transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <HiOutlineShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[var(--color-accent-terracotta)] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </div>
        <span>Shopping Cart</span>
      </div>
      {itemCount > 0 && (
        <span className="text-[var(--color-accent-wilderness)] font-medium">
          KSH{total.toFixed(2)}
        </span>
      )}
    </Link>
  )
}