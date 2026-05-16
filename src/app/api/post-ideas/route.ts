import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export const POST = async (req: Request) => {
  try {
    const data = await req.json()
    const { title, description, name, email } = data
    if (!title || !description) {
      return NextResponse.json({ success: false, message: 'Title and description are required' }, { status: 400 })
    }

    const doc = {
      _type: 'postIdea',
      title,
      description,
      name: name || '',
      email: email || '',
      submittedAt: new Date().toISOString(),
    }

    await client.create(doc)
    return NextResponse.json({ success: true, message: 'Thank you for your suggestion!' }, { status: 200 })
  } catch (err) {
    console.error('Failed to save post idea', err)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
