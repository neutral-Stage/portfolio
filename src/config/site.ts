// Site Configuration
export const siteConfig = {
  // Basic Information
  name: "Your Name",
  title: "Full-Stack Developer & UI/UX Designer",
  description: "Professional portfolio showcasing projects, skills, and achievements",
  url: "https://yourportfolio.com",
  
  // Contact Information
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  
  // Social Links
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    twitter: "https://twitter.com/yourusername",
    instagram: "https://instagram.com/yourusername",
    dribbble: "https://dribbble.com/yourusername"
  },
  
  // Sanity CMS Configuration
  sanity: {
    projectId: "2390vy3a", // Replace with your Sanity project ID
    dataset: "production",
    apiVersion: "2023-05-03"
  },
  
  // SEO Configuration
  seo: {
    defaultTitle: "Your Name - Portfolio",
    titleTemplate: "%s | Your Name",
    description: "Professional portfolio showcasing projects, skills, and achievements",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://yourportfolio.com",
      siteName: "Your Name - Portfolio",
      images: [
        {
          url: "https://yourportfolio.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Your Name - Portfolio"
        }
      ]
    },
    twitter: {
      handle: "@yourusername",
      site: "@yourusername",
      cardType: "summary_large_image"
    }
  },
  
  // Navigation
  navigation: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ],
  
  // Skills Categories
  skillCategories: [
    "Frontend Development",
    "UI/UX Design", 
    "Backend Development",
    "DevOps & Cloud",
    "Mobile Development",
    "Tools & Others"
  ],
  
  // Project Categories
  projectCategories: [
    "All",
    "Full-Stack",
    "Frontend", 
    "Web App",
    "AI/ML",
    "Data Visualization"
  ],
  
  // Blog Categories
  blogCategories: [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "DevOps",
    "Career",
    "Tutorial",
    "Personal"
  ]
}
