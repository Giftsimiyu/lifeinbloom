Image Optimization Guidelines
=============================

Purpose
-------
Ensure images are served responsively and efficiently to improve performance and Core Web Vitals.

Recommendations
---------------
- Use Next.js `Image` component (`next/image`) for responsive images, automatic srcset, and built-in optimization.
- Prefer Sanity's image URLs with transformations (use `@sanity/image-url`) when possible.
- Provide meaningful `alt` text for accessibility.
- Avoid importing large raster images directly into components; prefer optimized delivery via `next/image` or CDN.
- Use modern formats (AVIF/WebP) when supported.
- Set explicit `width` and `height` or use `fill` to reserve layout space and avoid CLS.

Audit
-----
Run `npm run image:audit` to search the codebase for any plain `<img` tags to convert to `next/image`.

Conversion example
------------------
Replace:

```tsx
<img src="/uploads/photo.jpg" alt="..." />
```

With:

```tsx
import Image from 'next/image'

<Image src="/uploads/photo.jpg" alt="..." width={1200} height={800} />
```

Notes
-----
- If you need external image hosts, add them to `next.config.js` under `images.domains`.
- For CMS images (Sanity), use `next-sanity` helpers and prefer image-builder transformations.
