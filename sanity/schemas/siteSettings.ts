import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefone', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
    defineField({ name: 'address', title: 'Endereço', type: 'string' }),
    defineField({
      name: 'officeHours',
      title: 'Horário de atendimento',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'hero',
      title: 'Hero (seção inicial)',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'heading', type: 'string', title: 'Título' }),
        defineField({ name: 'subheading', type: 'text', title: 'Subtítulo' }),
        defineField({
          name: 'highlights',
          title: 'Destaques',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', type: 'string', title: 'Valor' },
              { name: 'label', type: 'string', title: 'Rótulo' },
            ],
          }],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'Seção Sobre / Método',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Título' }),
        defineField({ name: 'body', type: 'text', title: 'Texto' }),
        defineField({ name: 'photo', type: 'string', title: 'Foto (URL)' }),
        defineField({
          name: 'features',
          title: 'Pilares (itens)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Título' },
              { name: 'description', type: 'text', title: 'Descrição' },
            ],
          }],
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Barra de números',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', type: 'string', title: 'Valor' },
          { name: 'label', type: 'string', title: 'Rótulo' },
        ],
      }],
    }),
    defineField({
      name: 'process',
      title: 'Método (etapas)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'step', type: 'string', title: 'Número da etapa' },
          { name: 'title', type: 'string', title: 'Título' },
          { name: 'description', type: 'text', title: 'Descrição' },
        ],
      }],
    }),
    defineField({
      name: 'awards',
      title: 'Formação & Credenciais',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Título' },
          { name: 'organization', type: 'string', title: 'Instituição' },
          { name: 'year', type: 'string', title: 'Ano' },
          { name: 'logo', type: 'image', title: 'Logo / selo' },
        ],
        preview: { select: { title: 'title', subtitle: 'organization' } },
      }],
    }),
    defineField({
      name: 'secondCta',
      title: 'Seção CTA final',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Título' }),
        defineField({ name: 'body', type: 'text', title: 'Texto' }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Rodapé',
      type: 'object',
      fields: [
        defineField({ name: 'disclaimer', type: 'text', title: 'Texto de disclaimer' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Meta Title' }),
        defineField({ name: 'description', type: 'text', title: 'Meta Description' }),
        defineField({ name: 'ogImage', type: 'image', title: 'OG Image padrão (1200×630)' }),
      ],
    }),
  ],
})
