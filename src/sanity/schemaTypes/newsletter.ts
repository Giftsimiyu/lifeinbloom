import { defineType } from 'sanity'

export const newsletter = defineType({
  name: 'newsletter',
  type: 'document',
  title: 'Newsletter Subscriber',
  fields: [
    {
      name: 'email',
      type: 'string',
      title: 'Email Address',
      validation: (Rule) =>
        Rule.required()
          .email(),
    },
    {
      name: 'subscribedAt',
      type: 'datetime',
      title: 'Subscribed At',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'confirmed',
      type: 'boolean',
      title: 'Confirmed',
      description: 'Whether the subscriber confirmed their email (double opt-in)',
      initialValue: false,
    },
    {
      name: 'confirmationToken',
      type: 'string',
      title: 'Confirmation Token',
      description: 'Token for confirming subscription',
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subscribedAt',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Pending confirmation',
      }
    },
  },
})
