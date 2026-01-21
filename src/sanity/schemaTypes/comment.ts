import { defineType } from 'sanity'

export const comment = defineType({
  name: 'comment',
  type: 'document',
  title: 'Comment',
  fields: [
    {
      name: 'author',
      type: 'string',
      title: 'Author Name',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'email',
      type: 'string',
      title: 'Author Email',
      validation: (Rule) =>
        Rule.required().email(),
    },
    {
      name: 'content',
      type: 'text',
      title: 'Comment Content',
      validation: (Rule) =>
        Rule.required().min(1).max(1000),
    },
    {
      name: 'postSlug',
      type: 'string',
      title: 'Post Slug',
      description: 'The slug of the blog post this comment belongs to',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'timestamp',
      type: 'datetime',
      title: 'Submitted At',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'approved',
      type: 'boolean',
      title: 'Approved',
      description: 'Comments must be approved before they appear on the site',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'postSlug',
      description: 'content',
    },
    prepare(selection) {
      const { title, subtitle, description } = selection
      return {
        title,
        subtitle: `Post: ${subtitle}`,
        description: description?.substring(0, 50) + '...',
      }
    },
  },
})
