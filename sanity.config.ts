import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'direitodenegocios',
  title: 'Direito de Negócios',
  projectId: 'h0l4pk97',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
