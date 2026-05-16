This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Environment Variables

The checkout API uses several environment variables for optional features:

```text
# site URL used to build Paystack callback and other redirects
NEXT_PUBLIC_SITE_URL=https://lifeinbloomblog.com

# Paystack integration (optional for digital shop payments)
PAYSTACK_SECRET_KEY=sk_test_xxx
# (public key can be used client-side if needed)
PAYSTACK_PUBLIC_KEY=pk_test_xxx
# currency code sent to Paystack; defaults to NGN
PAYSTACK_CURRENCY=KSH
# configure webhook endpoint in Paystack dashboard:
# https://yourdomain.com/api/paystack/webhook

# Resend email support (used to send order confirmation)
RESEND_API_KEY=
RESEND_FROM_EMAIL=orders@yourdomain.com
```

Be sure to set these values in your development `.env.local` and in whatever deployment platform you use.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
