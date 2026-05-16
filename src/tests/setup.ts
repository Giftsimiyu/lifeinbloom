import '@testing-library/jest-dom'
import { vi } from 'vitest'

// simple fetch mock using vitest

declare global {
  var fetch: ReturnType<typeof vi.fn>
}

global.fetch = vi.fn() as any;
