import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'attorney',
  title: 'Perfil / Equipe',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } }),
    defineField({ name: 'title', title: 'Title / Role', type: 'string', description: 'e.g. "Managing Partner"' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'specialties', title: 'Practice Areas', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'barMemberships', title: 'Bar Memberships', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'education', title: 'Education', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Direct Phone', type: 'string' }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'description', type: 'text', title: 'Meta Description' }),
      ],
    }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
  orderings: [{ title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
