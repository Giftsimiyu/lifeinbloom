import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Cart items required' }, { status: 400 })
    }

    // basic validation and bundle expansion
    let expandedItems: any[] = []

    for (const item of items) {
      const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{
        title,
        price,
        isBundle,
        bundleItems[]->{
          title,
          "slug": slug.current,
          price,
          isDigital,
          downloadLink
        },
        bundlePrice,
        isDigital,
        downloadLink
      }`, { slug: item.id || item.slug })

      if (product?.isBundle && product.bundleItems) {
        // Expand bundle into individual items
        const bundlePrice = product.bundlePrice || product.price
        const itemCount = product.bundleItems.length
        const pricePerItem = bundlePrice / itemCount

        product.bundleItems.forEach((bundleItem: any) => {
          expandedItems.push({
            id: bundleItem.slug,
            title: `${bundleItem.title} (from ${product.title} bundle)`,
            price: pricePerItem,
            quantity: Number(item.quantity || 1),
            isDigital: bundleItem.isDigital,
            downloadLink: bundleItem.downloadLink,
          })
        })
      } else {
        // Regular product
        expandedItems.push({
          id: String(item.id || item.slug || ''),
          title: String(item.title || product?.title || 'Untitled'),
          price: Number(item.price || product?.price || 0),
          quantity: Number(item.quantity || 1),
          isDigital: product?.isDigital,
          downloadLink: product?.downloadLink,
        })
      }
    }

    const total = expandedItems.reduce((s: number, it: any) => s + it.price * it.quantity, 0)

    // Create order in Sanity if write token is available
    let orderDoc: any = null
    try {
      orderDoc = await client.create({
        _type: 'order',
        items: expandedItems,
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

        // Check if all items are digital products
        let allDigital = true
        const digitalProducts: any[] = []

        for (const item of expandedItems) {
          if (!item.isDigital) {
            allDigital = false
          } else {
            digitalProducts.push(item)
          }
        }

        const subject = allDigital ? 'Your digital download is ready — Life in Bloom' : 'Order received — Life in Bloom'

        let html = `<p>Hi ${customer?.name || 'Customer'},</p>`

        if (allDigital) {
          html += `<p>Thank you for your purchase! Your digital products are ready for download:</p>
          <ul>${digitalProducts.map((it: any) => `<li><strong>${it.title}</strong> — <a href="${it.downloadLink}">Download Now</a></li>`).join('')}</ul>
          <p><strong>Total: KSH${total.toFixed(2)}</strong></p>
          <p>These download links will remain active for your account. If you have any issues, please contact our support.</p>`
        } else {
          html += `<p>Thanks for your order. We received the following items:</p>
          <ul>${expandedItems.map((it: any) => `<li>${it.quantity} × ${it.title} — KSH${(it.price * it.quantity).toFixed(2)}</li>`).join('')}</ul>
          <p><strong>Total: KSH${total.toFixed(2)}</strong></p>
          <p>We'll notify you when your order ships.</p>`
        }

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

    // initialize Paystack transaction if key provided
    let paystackUrl: string | null = null
    if (process.env.PAYSTACK_SECRET_KEY) {
      try {
        const initRes = await fetch('https://api.paystack.co/transaction/initialize', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(total * 100), // paystack expects smallest currency unit (e.g. kobo for NGN)
            currency: process.env.PAYSTACK_CURRENCY || 'NGN',
            email: customer?.email || 'no-reply@lifeinbloom.example',
            metadata: { orderId: orderDoc?._id },
            callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/cart/checkout-success`,
          }),
        })
        const initJson = await initRes.json()
        if (initJson.status && initJson.data && initJson.data.authorization_url) {
          paystackUrl = initJson.data.authorization_url
          // store reference on the order document
          if (orderDoc?._id) {
            await client.patch(orderDoc._id).set({
              paystackReference: initJson.data.reference,
            }).commit()
          }
        } else {
          console.warn('Paystack initialization failed', initJson)
        }
      } catch (err) {
        console.error('Paystack API error', err)
      }
    }

    // Return success and order location (url may be Paystack or success page)
    return NextResponse.json({
      success: true,
      orderId: orderDoc?._id || null,
      url: paystackUrl || '/cart/checkout-success',
    })
  } catch (err) {
    console.error('Checkout error', err)
    return NextResponse.json({ success: false, message: 'Failed to create checkout' }, { status: 500 })
  }
}
