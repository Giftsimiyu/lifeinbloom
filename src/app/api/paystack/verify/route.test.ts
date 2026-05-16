// @ts-nocheck
/// <reference types="vitest" />
import { GET } from './route'
// vitest globals available automatically

// create simple objects instead of NextRequest

describe('paystack verify API', () => {
  beforeEach(() => {
    ;(fetch as any).mockReset()
  })

  it('requires reference param', async () => {
    const req = { url: 'http://localhost/api/paystack/verify' } as any
    const res = await GET(req)
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.message).toMatch(/reference query parameter required/)
  })

  it('fails when secret key missing', async () => {
    delete process.env.PAYSTACK_SECRET_KEY
    const req = { url: 'http://localhost/api/paystack/verify?reference=abc' } as any
    const res = await GET(req)
    const json = await res.json()
    expect(res.status).toBe(500)
    expect(json.message).toMatch(/not configured/)
  })

  it('forwards verification result', async () => {
    process.env.PAYSTACK_SECRET_KEY = 'sk_test_dummy'
    const fakeResult = { status: true, data: { status: 'success', reference: 'ref123' } }
    ;(fetch as any).mockResolvedValueOnce({ json: async () => fakeResult } as any)
    const req = { url: 'http://localhost/api/paystack/verify?reference=ref123' } as any
    const res = await GET(req)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data).toEqual(fakeResult)
  })
})