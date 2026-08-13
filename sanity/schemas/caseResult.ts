import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseResult',
  title: 'Atuação em destaque',
  type: 'document',
  fields: [
    defineField({ name: 'highlight', title: 'Destaque', type: 'string', description: 'Ex.: "Negociação coletiva" ou "Contratos de TI"' }),
    defineField({ name: 'label', title: 'Área / contexto', type: 'string', description: 'Ex.: "Sindinfor/MG"' }),
    defineField({ name: 'description', title: 'Descrição', type: 'text', rows: 2 }),
    defineField({ name: 'order', title: 'Ordem de exibição', type: 'number' }),
  ],
  preview: {
    select: { title: 'highlight', subtitle: 'label' },
  },
  orderings: [{ title: 'Ordem', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
