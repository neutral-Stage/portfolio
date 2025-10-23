import { defineType } from "sanity";

export default defineType({
  name: "personalInfo",
  title: "Personal Information",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "title",
      title: "Professional Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "resume",
      title: "Resume/CV",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx",
      },
    },
    {
      name: "availability",
      title: "Availability Status",
      type: "object",
      fields: [
        {
          name: "status",
          title: "Status",
          type: "string",
          options: {
            list: [
              { title: "Available", value: "available" },
              { title: "Busy", value: "busy" },
              { title: "Unavailable", value: "unavailable" },
            ],
          },
          initialValue: "available",
        },
        {
          name: "message",
          title: "Availability Message",
          type: "text",
          rows: 2,
        },
        {
          name: "nextAvailable",
          title: "Next Available Date",
          type: "date",
        },
      ],
    },
    {
      name: "stats",
      title: "Personal Stats",
      type: "object",
      fields: [
        {
          name: "yearsExperience",
          title: "Years of Experience",
          type: "number",
          validation: (Rule: any) => Rule.min(0),
        },
        {
          name: "projectsCompleted",
          title: "Projects Completed",
          type: "number",
          validation: (Rule: any) => Rule.min(0),
        },
        {
          name: "happyClients",
          title: "Happy Clients",
          type: "number",
          validation: (Rule: any) => Rule.min(0),
        },
        {
          name: "countriesWorked",
          title: "Countries Worked With",
          type: "number",
          validation: (Rule: any) => Rule.min(0),
        },
      ],
    },
    {
      name: "heroContent",
      title: "Hero Section Content",
      type: "object",
      fields: [
        {
          name: "headline",
          title: "Main Headline",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 2,
        },
        {
          name: "ctaText",
          title: "Call to Action Text",
          type: "string",
          initialValue: "Get In Touch",
        },
        {
          name: "ctaLink",
          title: "Call to Action Link",
          type: "string",
          initialValue: "#contact",
        },
        {
          name: "backgroundVideo",
          title: "Background Video",
          type: "file",
          options: {
            accept: "video/*",
          },
        },
        {
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "featureTags",
          title: "Feature Tags",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                },
                {
                  name: "text",
                  title: "Text",
                  type: "string",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "color",
                  title: "Color",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "highlights",
      title: "Professional Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: "professionalStatus",
      title: "Professional Status",
      type: "object",
      fields: [
        {
          name: "available",
          title: "Available for Work",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "statusText",
          title: "Status Text",
          type: "string",
        },
        {
          name: "workTypes",
          title: "Work Types",
          type: "array",
          of: [
            {
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "resumeHighlights",
      title: "Resume Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: "resumeFormats",
      title: "Resume Formats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "format",
              title: "Format",
              type: "string",
              options: {
                list: [
                  { title: "PDF", value: "pdf" },
                  { title: "DOCX", value: "docx" },
                  { title: "TXT", value: "txt" },
                ],
              },
            },
            {
              name: "file",
              title: "File",
              type: "file",
              options: {
                accept: ".pdf,.doc,.docx,.txt",
              },
            },
            {
              name: "color",
              title: "Button Color",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "seo",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "profileImage",
    },
  },
});
