import {defineType, defineField} from 'sanity'

export const subcategory = defineType({
    name: 'subcategory',
    title: 'Subcategory',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Subcategory Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {source: 'title',},
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'category',
            title: 'Parent Category',
            type: 'reference',
            to: [{type: 'category'}],
            validation: (Rule) => Rule.required(),
        }),
    ],
})
