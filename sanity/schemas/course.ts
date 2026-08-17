import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Curso',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'eyebrow', title: 'Eyebrow (texto superior)', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline (título de vendas)', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text' }),
    defineField({ name: 'shortDescription', title: 'Descrição curta (card de listagem)', type: 'text', rows: 3 }),
    defineField({ name: 'audience', title: 'Público-alvo', type: 'text' }),
    defineField({
      name: 'modules',
      title: 'Módulos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Título do módulo' },
            { name: 'description', type: 'text', title: 'Descrição' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Perguntas frequentes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Pergunta' },
            { name: 'answer', type: 'text', title: 'Resposta' },
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
    defineField({ name: 'price', title: 'Preço / investimento', type: 'string' }),
    defineField({ name: 'bonus', title: 'Bônus', type: 'text' }),
    defineField({ name: 'order', title: 'Ordem de exibição', type: 'number' }),
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
  ],
  preview: {
    select: { title: 'title', subtitle: 'headline' },
  },
  orderings: [{ title: 'Ordem', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
