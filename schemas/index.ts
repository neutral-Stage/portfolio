import { project } from './project'
import { experience } from './experience'
import { skill } from './skill'
import { blogPost }  from './blogPost'
import personalInfo  from './personalInfo'
import seo from './seo'
import siteSettings from './siteSettings'
import githubStats from './githubStats'
import remoteWorkInfo from './remoteWorkInfo'

export const schemaTypes = [
  // Singleton schemas (one instance each)
  siteSettings,
  personalInfo,
  githubStats,
  remoteWorkInfo,
  
  // Content schemas
  project,
  experience,
  skill,
  blogPost,
  
  // SEO schema
  seo,
]
