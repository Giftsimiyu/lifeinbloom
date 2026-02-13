import { NextResponse } from 'next/server'
import { getAnnouncements } from '@/sanity/lib/sanity'

export async function GET() {
  try {
    const announcements = await getAnnouncements()
    return NextResponse.json({ success: true, announcements }, { status: 200 })
  } catch (err) {
    console.error('Failed to fetch announcements:', err)
    return NextResponse.json({ success: false, message: 'Failed to fetch' }, { status: 500 })
  }
}
