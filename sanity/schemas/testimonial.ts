import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Depoimento',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome', type: 'string' }),
    defineField({ name: 'role', title: 'Cargo', type: 'string', description: 'Ex.: CEO, Gente e Gestão' }),
    defineField({ name: 'company', title: 'Empresa', type: 'string' }),
    defineField({ name: 'location', title: 'Localização', type: 'string' }),
    defineField({ name: 'quote', title: 'Depoimento', type: 'text', rows: 5 }),
    defineField({ name: 'photo', title: 'URL da foto', type: 'string', description: 'Caminho ou URL da foto do depoente (ex.: /images/camila-guimaraes.webp)' }),
    defineField({ name: 'order', title: 'Ordem de exibição', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'company' },
  },
  orderings: [{ title: 'Ordem', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
