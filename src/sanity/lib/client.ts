import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: "2024-06-01",
  useCdn: false, // Set to false when using write token
  token: process.env.SANITY_API_TOKEN, // Required for write operations
})
