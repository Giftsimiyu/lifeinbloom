import { defineType, defineField } from "sanity";

export const questionOfTheWeek = defineType({
  name: "questionOfTheWeek",
  title: "Question of the Week",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Question Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "answer",
      title: "Answer/Insight",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Mark as active to display on homepage",
      initialValue: true,
    }),
  ],
});
