import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET() {
  try {
    const comments = await client.fetch(`
      *[_type == "comment" && (approved != true || !defined(approved))] | order(timestamp desc) {
        _id, author, email, content, postSlug, timestamp
      }
    `)

    return NextResponse.json({ success: true, comments }, { status: 200 })
  } catch (err) {
    console.error('Error fetching unapproved comments:', err)
    return NextResponse.json({ success: false, message: 'Failed to fetch' }, { status: 500 })
  }
}
