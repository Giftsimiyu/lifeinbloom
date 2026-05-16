import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const reference = searchParams.get('reference')
  if (!reference) {
    return NextResponse.json({ success: false, message: 'reference query parameter required' }, { status: 400 })
  }
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ success: false, message: 'Paystack secret key not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    })
    const json = await res.json()
    return NextResponse.json({ success: true, data: json })
  } catch (err) {
    console.error('Paystack verify API error', err)
    return NextResponse.json({ success: false, message: 'verification failed' }, { status: 500 })
  }
}