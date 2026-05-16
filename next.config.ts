import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Needed for Sanity CDN images and to avoid Next.js blocking IPv6/NAT64-resolved addresses.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    // When Next.js optimizes remote images, it enforces that the upstream resolves to a public IP.
    // Sanity's CDN can resolve to IPv6 NAT64 addresses (64:ff9b::/32), which Next.js treats as private.
    // Disabling optimization avoids the upstream-IP check while still allowing <Image> to work.
    unoptimized: true,
  },
};

export default nextConfig;
