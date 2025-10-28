import { project } from './project'
import { experience } from './experience'
import { skill } from './skill'
import { blogPost }  from './blogPost'
import personalInfo  from './personalInfo'
import seo from './seo'
import siteSettings from './siteSettings'

export const schemaTypes = [
  // Singleton schemas (one instance each)
  siteSettings,
  personalInfo,
  
  // Content schemas
  project,
  experience,
  skill,
  blogPost,
  
  // SEO schema
  seo,
]
