// Blog Post Types
export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any[]; // Sanity block content
  featuredImage?: {
    url: string;
    alt?: string;
  };
  tags?: string[];
  category: string;
  publishedAt: string;
  featured: boolean;
  readingTime?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

// Project Types
export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  longDescription?: string;
  image?: {
    url: string;
    alt?: string;
  };
  gallery?: Array<{
    url: string;
    alt?: string;
  }>;
  technologies: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  startDate?: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'on-hold';
}

// Experience Types
export interface Experience {
  _id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
  logo?: {
    url: string;
    alt?: string;
  };
}

// Skill Types
export interface Skill {
  _id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'devops' | 'mobile' | 'tools';
  icon?: string;
  color?: string;
  yearsOfExperience?: number;
  description?: string;
}

// Personal Info Types
export interface PersonalInfo {
  _id: string;
  name: string;
  title: string;
  bio: string;
  profileImage?: {
    url: string;
    alt?: string;
  };
  resume?: {
    url: string;
  };
  contact: {
    email: string;
    phone?: string;
    location: string;
    website?: string;
  };
  socialLinks: Array<{
    platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'dribbble' | 'behance' | 'medium' | 'devto';
    url: string;
    username?: string;
  }>;
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    message?: string;
  };
  stats: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
}
