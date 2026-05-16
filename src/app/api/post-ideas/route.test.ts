// @ts-nocheck
/// <reference types="vitest" />
import { POST } from './route'

// mock sanity client to avoid real network calls
vi.mock('@/sanity/lib/client', () => ({
  client: {
    create: vi.fn(async (doc: any) => ({ _id: 'idea123', ...doc })),
  },
}))

describe('post-ideas API', () => {
  it('rejects when required fields are missing', async () => {
    const req = { async json() { return { title: '', description: '' } } } as any
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.message).toMatch(/required/)
  })

  it('creates a suggestion when valid data is provided', async () => {
    const payload = { title: 'New topic', description: 'Write about plants', email: 'user@x.com' }
    const req = { async json() { return payload } } as any
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
  })
})