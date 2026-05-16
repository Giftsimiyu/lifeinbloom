// @ts-nocheck
/// <reference types="vitest" />
import { POST } from './route'
// vitest globals (describe/it/expect/vi/etc) are declared in src/types/vitest.d.ts

// use plain objects for requests in tests

// mock the Sanity client so orders creation/patching doesn't hit real API
vi.mock('@/sanity/lib/client', () => ({
  client: {
    create: vi.fn(async (doc: any) => ({ _id: 'order123', ...doc })),
    patch: vi.fn(() => ({ set: () => ({ commit: vi.fn() }) })),
  },
}))

describe('checkout API', () => {
  beforeEach(() => {
    ;(fetch as any).mockReset()
    process.env.PAYSTACK_SECRET_KEY = ''
    process.env.PAYSTACK_CURRENCY = 'KSH'
  })

  it('returns 400 when no items', async () => {
    const req = {
      async json() {
        return { items: [] }
      },
    } as any
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.message).toMatch(/Cart items required/)
  })

  it('creates a checkout without paystack when key missing', async () => {
    const items = [{ id: '1', title: 'Test', price: 10, quantity: 2 }]
    const req = {
      async json() {
        return { items }
      },
    } as any
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.url).toBe('/cart/checkout-success')
    expect(json.success).toBe(true)
  })

  it('initializes paystack when key set', async () => {
    process.env.PAYSTACK_SECRET_KEY = 'sk_test_dummy'
    ;(fetch as any).mockResolvedValueOnce({
      json: async () => ({ status: true, data: { authorization_url: 'https://paystack.test/checkout', reference: 'ref123' } }),
    } as any)

    const items = [{ id: '1', title: 'Test', price: 5, quantity: 1 }]
    const req = {
      async json() {
        return { items, customer: { email: 'a@b.com' } }
      },
    } as any
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.url).toBe('https://paystack.test/checkout')
    expect(json.success).toBe(true)
    // verify fetch called with proper amount (500 because *100)
    const lastCall = (fetch as any).mock.calls[0]
    const body = JSON.parse(lastCall[1].body as string)
    expect(body.amount).toBe(500)
    expect(body.currency).toBe('KSH')
  })
})