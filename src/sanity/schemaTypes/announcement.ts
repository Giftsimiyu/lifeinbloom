import { defineType } from 'sanity'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    { name: 'message', title: 'Message', type: 'string' },
    { name: 'url', title: 'URL', type: 'url', description: 'Optional link for the announcement' },
    { name: 'isActive', title: 'Is Active', type: 'boolean', initialValue: true },
    { name: 'startAt', title: 'Start At', type: 'datetime' },
    { name: 'endAt', title: 'End At', type: 'datetime' },
  ],
})
