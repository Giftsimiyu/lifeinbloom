import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import crypto from 'crypto'

// disable Next.js body parser so we can compute signature on raw body
export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-paystack-signature') || ''
    const bodyText = await req.text()

    const secret = process.env.PAYSTACK_SECRET_KEY || ''
    const hash = crypto.createHmac('sha512', secret).update(bodyText).digest('hex')

    if (hash !== signature) {
      console.warn('Paystack webhook signature mismatch')
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 })
    }

    const payload = JSON.parse(bodyText)
    // only handle successful charges
    if (payload.event === 'charge.success') {
      const orderId = payload.data?.metadata?.orderId
      if (orderId) {
        try {
          // Update order status
          await client.patch(orderId).set({
            status: 'paid',
            paystackData: payload.data,
          }).commit()

          // Fetch the order with items to check for digital products
          const order = await client.fetch(`*[_id == $orderId][0]{items, customer}`, { orderId })
          if (order && order.items) {
            let allDigital = true
            const digitalProducts: any[] = []

            for (const item of order.items) {
              if (!item.isDigital) {
                allDigital = false
                break
              } else {
                digitalProducts.push(item)
              }
            }

            // Send download email for digital products
            if (allDigital && order.customer?.email && process.env.RESEND_API_KEY) {
              const { Resend } = await import('resend')
              const resend = new Resend(process.env.RESEND_API_KEY)
              const from = process.env.RESEND_FROM_EMAIL || 'downloads@lifeinbloom.example'
              const subject = 'Your digital downloads are ready — Life in Bloom'
              const html = `<p>Hi ${order.customer?.name || 'Customer'},</p>
                <p>Thank you for your purchase! Your payment has been processed successfully. Here are your digital product downloads:</p>
                <ul>${digitalProducts.map((it: any) => `<li><strong>${it.title}</strong> — <a href="${it.downloadLink}">Download Now</a></li>`).join('')}</ul>
                <p>These download links will remain active for your account. If you have any issues accessing your downloads, please contact our support.</p>
                <p>Thank you for choosing Life in Bloom!</p>`

              await resend.emails.send({
                from,
                to: order.customer.email,
                subject,
                html,
              })
            }
          }
        } catch (err) {
          console.error('Failed to update order status after webhook', err)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error processing Paystack webhook', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}