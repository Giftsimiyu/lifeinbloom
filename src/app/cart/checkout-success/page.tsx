// server component: verify reference with Paystack and check for digital products
import React from 'react'
import { client } from '@/sanity/lib/client'

interface CheckoutSuccessProps {
  searchParams?: { reference?: string }
}

async function verifyReference(ref: string) {
  if (!process.env.PAYSTACK_SECRET_KEY) return null
  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    })
    const json = await res.json()
    return json
  } catch (err) {
    console.error('Paystack verify error', err)
    return null
  }
}

async function getOrderByReference(ref: string) {
  try {
    const order = await client.fetch(`*[_type == "order" && paystackReference == $ref][0]{items, customer}`, { ref })
    return order
  } catch (err) {
    console.error('Error fetching order', err)
    return null
  }
}

async function checkIfDigitalOrder(order: any) {
  if (!order?.items) return false

  for (const item of order.items) {
    try {
      const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{isDigital}`, { slug: item.id })
      if (!product?.isDigital) {
        return false
      }
    } catch (err) {
      return false
    }
  }
  return true
}

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessProps) {
  const reference = searchParams?.reference
  let verification: any = null
  let order: any = null
  let isDigitalOrder = false

  if (reference) {
    verification = await verifyReference(reference)
    if (verification?.data?.status === 'success') {
      order = await getOrderByReference(reference)
      if (order) {
        isDigitalOrder = await checkIfDigitalOrder(order)
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="font-display text-3xl mb-4">
        {isDigitalOrder ? 'Your downloads are ready!' : 'Thank you — your order is received'}
      </h1>
      <p className="text-(--color-neutral-grey)">
        {isDigitalOrder
          ? 'Your payment has been processed successfully. Check your email for download links to your digital products.'
          : 'We\'ve received your order and will send confirmation to your email.'
        }
      </p>
      {reference && (
        <p className="mt-4 text-sm text-(--color-neutral-grey)">Payment reference: <strong>{reference}</strong></p>
      )}
      {verification && (
        <p className="mt-2 text-sm text-(--color-neutral-grey)">Status: <strong>{verification.data?.status}</strong></p>
      )}
      {isDigitalOrder && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            📧 <strong>Check your email!</strong> Your download links have been sent to {order?.customer?.email || 'your email address'}.
          </p>
        </div>
      )}
      <p className="mt-6"><a href="/" className="text-(--color-accent-olive)">Continue browsing</a></p>
    </div>
  )
}
