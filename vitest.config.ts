import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      // mirror TypeScript path mapping
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
})
