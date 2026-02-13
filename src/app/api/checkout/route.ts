import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Cart items required' }, { status: 400 })
    }

    // basic validation
    const sanitizedItems = items.map((it: any) => ({
      id: String(it.id || it.slug || ''),
      title: String(it.title || 'Untitled'),
      price: Number(it.price || 0),
      quantity: Number(it.quantity || 1),
    }))

    const total = sanitizedItems.reduce((s: number, it: any) => s + it.price * it.quantity, 0)

    // Create order in Sanity if write token is available
    let orderDoc: any = null
    try {
      orderDoc = await client.create({
        _type: 'order',
        items: sanitizedItems,
        customer: customer || null,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
      })
    } catch (err) {
      console.warn('Sanity order creation skipped or failed:', err)
    }

    // Send confirmation email via Resend if API key provided
    try {
      if (process.env.RESEND_API_KEY && customer?.email) {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        const from = process.env.RESEND_FROM_EMAIL || 'orders@lifeinbloom.example'
        const subject = 'Order received — Life in Bloom'
        const html = `<p>Hi ${customer?.name || 'Customer'},</p>
          <p>Thanks for your order. We received the following items:</p>
          <ul>${sanitizedItems.map((it: any) => `<li>${it.quantity} × ${it.title} — $${(it.price * it.quantity).toFixed(2)}</li>`).join('')}</ul>
          <p><strong>Total: $${total.toFixed(2)}</strong></p>
          <p>We'll notify you when your order ships.</p>`

        await resend.emails.send({
          from,
          to: customer.email,
          subject,
          html,
        })
      }
    } catch (err) {
      console.warn('Resend email failed:', err)
    }

    // Return success and order location
    return NextResponse.json({
      success: true,
      orderId: orderDoc?._id || null,
      redirect: '/cart/checkout-success',
    })
  } catch (err) {
    console.error('Checkout error', err)
    return NextResponse.json({ success: false, message: 'Failed to create checkout' }, { status: 500 })
  }
}
