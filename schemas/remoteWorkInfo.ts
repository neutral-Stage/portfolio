import { defineType } from 'sanity'

export default defineType({
  name: 'remoteWorkInfo',
  title: 'Remote Work Information',
  type: 'document',
  fields: [
    {
      name: 'timezones',
      title: 'Available Timezones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'zone',
              title: 'Timezone',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              description: 'e.g., "PST (UTC-8)", "EST (UTC-5)"'
            },
            {
              name: 'time',
              title: 'Available Hours',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              description: 'e.g., "9:00 AM - 5:00 PM"'
            }
          ]
        }
      ]
    },
    {
      name: 'remoteSkills',
      title: 'Remote Work Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Skill Title',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'level',
              title: 'Proficiency Level',
              type: 'number',
              validation: (Rule: any) => Rule.min(0).max(100),
              description: 'Percentage (0-100)'
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., "Video", "MessageCircle")'
            }
          ]
        }
      ]
    },
    {
      name: 'tools',
      title: 'Remote Collaboration Tools',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tools you use for remote work'
    },
    {
      name: 'stats',
      title: 'Remote Work Statistics',
      type: 'object',
      fields: [
        {
          name: 'yearsRemote',
          title: 'Years Working Remotely',
          type: 'number',
          validation: (Rule: any) => Rule.min(0)
        },
        {
          name: 'remoteTeams',
          title: 'Remote Teams Worked With',
          type: 'number',
          validation: (Rule: any) => Rule.min(0)
        },
        {
          name: 'timeZonesWorked',
          title: 'Time Zones Worked Across',
          type: 'number',
          validation: (Rule: any) => Rule.min(0)
        },
        {
          name: 'productivity',
          title: 'Productivity Level',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(100),
          description: 'Percentage (0-100)'
        }
      ]
    },
    {
      name: 'availability',
      title: 'Current Availability',
      type: 'object',
      fields: [
        {
          name: 'status',
          title: 'Availability Status',
          type: 'string',
          options: {
            list: [
              { title: 'Available', value: 'available' },
              { title: 'Busy', value: 'busy' },
              { title: 'Unavailable', value: 'unavailable' }
            ]
          },
          initialValue: 'available'
        },
        {
          name: 'message',
          title: 'Availability Message',
          type: 'text',
          rows: 2
        },
        {
          name: 'nextAvailable',
          title: 'Next Available Date',
          type: 'date'
        },
        {
          name: 'responseTime',
          title: 'Typical Response Time',
          type: 'string',
          description: 'e.g., "Within 24 hours", "Same day"'
        }
      ]
    },
    {
      name: 'workSetup',
      title: 'Work Setup',
      type: 'object',
      fields: [
        {
          name: 'internetSpeed',
          title: 'Internet Speed',
          type: 'string',
          description: 'e.g., "100 Mbps", "Fiber"'
        },
        {
          name: 'backupInternet',
          title: 'Backup Internet',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'workspace',
          title: 'Workspace Type',
          type: 'string',
          options: {
            list: [
              { title: 'Home Office', value: 'home-office' },
              { title: 'Co-working Space', value: 'coworking' },
              { title: 'Coffee Shop', value: 'coffee-shop' },
              { title: 'Hybrid', value: 'hybrid' }
            ]
          }
        },
        {
          name: 'equipment',
          title: 'Equipment',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Professional equipment you have'
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'availability.status',
      subtitle: 'stats.yearsRemote'
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title: `Remote Work - ${title}`,
        subtitle: `${subtitle} years experience`
      }
    }
  }
})
