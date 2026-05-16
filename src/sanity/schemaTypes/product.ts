import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Brief product description",
    }),
    defineField({
      name: "content",
      title: "Full Product Details",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed product information, care instructions, etc.",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Product Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
      description: "Additional product images",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      description: "Price in KSH",
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price (for sale items)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isDigital",
      title: "Digital Product",
      type: "boolean",
      description: "Check if this is a digital product (no shipping required)",
    }),
    defineField({
      name: "downloadLink",
      title: "Download Link",
      type: "url",
      description: "URL for digital product download (required for digital products)",
      hidden: ({ parent }) => !parent?.isDigital,
      validation: (Rule) => Rule.custom((value, context) => {
        if ((context.parent as any)?.isDigital && !value) {
          return 'Download link is required for digital products'
        }
        return true
      }),
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "Display on shop homepage",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "isBundle",
      title: "Product Bundle",
      type: "boolean",
      description: "Check if this is a bundle/collection of multiple products",
    }),
    defineField({
      name: "bundleItems",
      title: "Bundle Items",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
      description: "Products included in this bundle",
      hidden: ({ parent }) => !parent?.isBundle,
      validation: (Rule) => Rule.custom((value, context) => {
        if ((context.parent as any)?.isBundle && (!value || value.length === 0)) {
          return 'Bundle items are required for product bundles'
        }
        return true
      }),
    }),
    defineField({
      name: "bundlePrice",
      title: "Bundle Price",
      type: "number",
      description: "Special price for the bundle (optional - leave empty to calculate from individual items)",
      hidden: ({ parent }) => !parent?.isBundle,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "bundleDescription",
      title: "Bundle Description",
      type: "text",
      rows: 3,
      description: "Special description for the bundle offer",
      hidden: ({ parent }) => !parent?.isBundle,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
});
