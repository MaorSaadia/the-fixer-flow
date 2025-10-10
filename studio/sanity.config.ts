import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import post from './schemaTypes/post'
import blockContent from './schemaTypes/blockContent'
import author from './schemaTypes/author'
import category from './schemaTypes/category'
import product from './schemaTypes/product'

export default defineConfig({
  name: 'default',
  title: 'the-fixer-flow',

  projectId: 'azv8uhjd',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [post, blockContent, author, category, product],
  },
})
