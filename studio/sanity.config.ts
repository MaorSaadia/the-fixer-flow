import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import post from './schemaTypes/post'
import blockContent from './schemaTypes/blockContent'

export default defineConfig({
  name: 'default',
  title: 'the-fixer-flow',

  projectId: 'azv8uhjd',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [post, blockContent],
  },
})
