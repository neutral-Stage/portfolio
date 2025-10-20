import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'portfolio-cms',
  title: 'Portfolio CMS',
  projectId: '2390vy3a', // Replace with your Sanity project ID
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton documents
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Personal Information')
              .id('personalInfo')
              .child(S.document().schemaType('personalInfo').documentId('personalInfo')),
            S.listItem()
              .title('GitHub Statistics')
              .id('githubStats')
              .child(S.document().schemaType('githubStats').documentId('githubStats')),
            S.listItem()
              .title('Remote Work Info')
              .id('remoteWorkInfo')
              .child(S.document().schemaType('remoteWorkInfo').documentId('remoteWorkInfo')),
            
            // Divider
            S.divider(),
            
            // Regular documents
            ...S.documentTypeListItems().filter(
              (listItem) => !['siteSettings', 'personalInfo', 'githubStats', 'remoteWorkInfo'].includes(listItem.getId()!)
            ),
          ])
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})
