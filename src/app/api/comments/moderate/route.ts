import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

const ADMIN_HEADER = 'x-admin-secret'

export async function POST(req: NextRequest) {
  try {
    const adminSecret = req.headers.get(ADMIN_HEADER)
    if (!adminSecret || adminSecret !== process.env.ADMIN_API_SECRET) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { action, commentId } = body
    if (!action || !commentId) {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 })
    }

    if (action === 'approve') {
      const updated = await client.patch(commentId).set({ approved: true }).commit()
      return NextResponse.json({ success: true, updated }, { status: 200 })
    }

    if (action === 'reject') {
      // Mark as rejected to preserve record
      const updated = await client.patch(commentId).set({ approved: false, rejected: true }).commit()
      return NextResponse.json({ success: true, updated }, { status: 200 })
    }

    return NextResponse.json({ success: false, message: 'Unknown action' }, { status: 400 })
  } catch (err) {
    console.error('Moderation error:', err)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
