import { defineType } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'level',
      title: 'Proficiency Level',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(100)
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend Development', value: 'frontend' },
          { title: 'Backend Development', value: 'backend' },
          { title: 'UI/UX Design', value: 'design' },
          { title: 'DevOps & Cloud', value: 'devops' },
          { title: 'Mobile Development', value: 'mobile' },
          { title: 'Tools & Others', value: 'tools' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from Lucide icons'
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code for the skill'
    },
    {
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      level: 'level'
    },
    prepare(selection) {
      const { title, subtitle, level } = selection
      return {
        title: title,
        subtitle: `${subtitle} - ${level}%`
      }
    }
  }
})
