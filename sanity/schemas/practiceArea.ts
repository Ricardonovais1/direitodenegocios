import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'practiceArea',
  title: 'Área de atuação',
  type: 'document',
  fields: [
    defineField({ name: 'number', title: 'Display Number', type: 'string', description: 'e.g. "01"' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', description: 'Shown on homepage card' }),
    defineField({
      name: 'fullContent',
      title: 'Full Page Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text for the individual practice area page',
    }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Meta Title' }),
        defineField({ name: 'description', type: 'text', title: 'Meta Description' }),
        defineField({ name: 'ogImage', type: 'image', title: 'OG Image' }),
      ],
    }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'number' },
  },
  orderings: [{ title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
