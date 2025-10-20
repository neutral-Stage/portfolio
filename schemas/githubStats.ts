import { defineType } from 'sanity'

export default defineType({
  name: 'githubStats',
  title: 'GitHub Statistics',
  type: 'document',
  fields: [
    {
      name: 'followers',
      title: 'Followers Count',
      type: 'number',
      validation: (Rule: any) => Rule.min(0)
    },
    {
      name: 'following',
      title: 'Following Count',
      type: 'number',
      validation: (Rule: any) => Rule.min(0)
    },
    {
      name: 'repositories',
      title: 'Public Repositories',
      type: 'number',
      validation: (Rule: any) => Rule.min(0)
    },
    {
      name: 'stars',
      title: 'Total Stars Received',
      type: 'number',
      validation: (Rule: any) => Rule.min(0)
    },
    {
      name: 'contributions',
      title: 'Total Contributions',
      type: 'number',
      validation: (Rule: any) => Rule.min(0)
    },
    {
      name: 'streak',
      title: 'Current Streak (Days)',
      type: 'number',
      validation: (Rule: any) => Rule.min(0)
    },
    {
      name: 'languages',
      title: 'Programming Languages',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'recentRepos',
      title: 'Recent Repositories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Repository Name',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2
            },
            {
              name: 'language',
              title: 'Primary Language',
              type: 'string'
            },
            {
              name: 'stars',
              title: 'Stars Count',
              type: 'number',
              validation: (Rule: any) => Rule.min(0)
            },
            {
              name: 'forks',
              title: 'Forks Count',
              type: 'number',
              validation: (Rule: any) => Rule.min(0)
            },
            {
              name: 'url',
              title: 'Repository URL',
              type: 'url',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'updated',
              title: 'Last Updated',
              type: 'string',
              description: 'e.g., "2 days ago", "1 week ago"'
            }
          ]
        }
      ]
    },
    {
      name: 'contributionsData',
      title: 'Contribution Activity',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'month',
              title: 'Month',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'count',
              title: 'Contribution Count',
              type: 'number',
              validation: (Rule: any) => Rule.min(0)
            }
          ]
        }
      ]
    },
    {
      name: 'profileUrl',
      title: 'GitHub Profile URL',
      type: 'url',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When these stats were last fetched',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'profileUrl',
      subtitle: 'followers',
      media: 'profileUrl'
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title: `GitHub Stats - ${subtitle} followers`,
        subtitle: title
      }
    }
  }
})
