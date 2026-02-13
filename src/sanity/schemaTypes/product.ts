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
      description: "Price in USD",
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
      name: "stock",
      title: "Stock Count",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      description: "Number of items available",
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
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
});
