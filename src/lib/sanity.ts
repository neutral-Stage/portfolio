import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "2390vy3a", // Replace with your Sanity project ID
  dataset: "production",
  useCdn: true, // Set to false if you want fresh data
  apiVersion: "2023-05-03", // Use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

// Optimized image URL helper for performance
export const getOptimizedImageUrl = (
  imageUrl: string,
  options: { width?: number; height?: number; quality?: number; format?: string } = {}
) => {
  if (!imageUrl) return "";

  const {
    width = 800,
    height,
    quality = 80,
    format = "webp",
  } = options;

  // Build optimized URL with parameters
  let optimizedUrl = imageUrl;
  const params: string[] = [];

  if (width) params.push(`w=${width}`);
  if (height) params.push(`h=${height}`);
  if (quality) params.push(`q=${quality}`);
  if (format) params.push(`fm=${format}`);
  params.push('fit=max'); // Maintain aspect ratio
  params.push('auto=format'); // Auto format selection

  // Add parameters to URL
  if (params.length > 0) {
    const separator = imageUrl.includes('?') ? '&' : '?';
    optimizedUrl = `${imageUrl}${separator}${params.join('&')}`;
  }

  return optimizedUrl;
};

// Helper function to get all projects
export async function getProjects() {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    longDescription,
    image,
    gallery,
    technologies,
    category,
    liveUrl,
    githubUrl,
    featured,
    startDate,
    endDate,
    status
  }`;

  return await client.fetch(query);
}

// Helper function to get featured projects
export async function getFeaturedProjects() {
  const query = `*[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    technologies,
    category,
    liveUrl,
    githubUrl
  }`;

  return await client.fetch(query);
}

// Helper function to get all experiences
export async function getExperiences() {
  const query = `*[_type == "experience"] | order(startDate desc) {
    _id,
    title,
    company,
    location,
    startDate,
    endDate,
    current,
    type,
    description,
    achievements,
    technologies,
    companyUrl,
    logo
  }`;

  return await client.fetch(query);
}

// Helper function to get all skills
export async function getSkills() {
  const query = `*[_type == "skill"] | order(category asc, level desc) {
    _id,
    name,
    level,
    category,
    icon,
    color,
    yearsOfExperience,
    description
  }`;

  return await client.fetch(query);
}

// Helper function to get personal information
export async function getPersonalInfo() {
  const query = `*[_type == "personalInfo"][0] {
    _id,
    name,
    title,
    bio,
    profileImage{
      "url": asset->url,
      "alt": altText
      },
    resume,
    contact,
    socialLinks,
    availability,
    stats,
    heroContent,
    highlights,
    professionalStatus,
    resumeHighlights,
    resumeFormats
  }`;

  return await client.fetch(query);
}

// Helper function to get blog posts
export async function getBlogPosts() {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    tags,
    category,
    publishedAt,
    featured,
    readingTime,
    seo
  }`;

  return await client.fetch(query);
}

// Helper function to get featured blog posts
export async function getFeaturedBlogPosts() {
  const query = `*[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    tags,
    category,
    publishedAt,
    readingTime
  }`;

  return await client.fetch(query);
}


// Helper function to get contact info
export async function getContactInfo() {
  const query = `*[_type == "contactInfo"][0] {
    _id,
    email,
    phone,
    location,
    socialLinks,
    availability,
    resumeDownload
  }`;

  return await client.fetch(query);
}

// Helper function to get site settings
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteDescription,
    siteUrl,
    ogImage,
    favicon,
    analytics,
    seo,
    socialLinks,
    navigation,
    footer,
    contact,
    contactBenefits,
    contactForm
  }`;

  return await client.fetch(query);
}
