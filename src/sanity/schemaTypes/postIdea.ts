import { defineType } from 'sanity'

export const postIdea = defineType({
  name: 'postIdea',
  title: 'Post Idea / Suggestion',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us more about your idea or request',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Your Name (optional)',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email Address (optional)',
      type: 'string',
      validation: (Rule) => Rule.email(),
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'submittedAt',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : '',
      }
    },
  },
})