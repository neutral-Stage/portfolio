# Professional Portfolio Website

A modern, responsive portfolio website built with Astro.js, Svelte, and Sanity CMS. Features smooth animations, mobile-first design, SEO optimization, and a powerful content management system.

## 🚀 Features

- **Modern Tech Stack**: Built with Astro.js, Svelte, and Tailwind CSS
- **Smooth Animations**: Custom CSS animations and transitions
- **Mobile-First Design**: Fully responsive across all devices
- **CMS Integration**: Sanity CMS for easy content management
- **SEO Optimized**: Meta tags, structured data, and sitemap generation
- **Performance Optimized**: Fast loading times and optimized assets
- **Dark Theme**: Beautiful dark theme with gradient accents
- **Contact Form**: Interactive contact form with validation
- **Project Showcase**: Dynamic project gallery with filtering
- **Skills Visualization**: Animated skill bars and categories
- **Experience Timeline**: Professional experience with achievements
- **Blog Integration**: Ready for blog posts and articles

## 🛠️ Tech Stack

### Frontend

- **Astro.js** - Static site generator with view transitions
- **Svelte** - Component framework for interactive elements
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Svelte** - Beautiful icons
- **Framer Motion** - Advanced animations

### Backend & CMS

- **Sanity CMS** - Headless content management system
- **Sanity Client** - JavaScript client for data fetching

### Development Tools

- **TypeScript** - Type-safe development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vite** - Fast build tool

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Sanity CMS**

   ```bash
   npm install -g @sanity/cli
   sanity init
   ```

4. **Configure environment variables**
   Create a `.env` file in the root directory:

   ```env
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   PUBLIC_SITE_URL=https://yourportfolio.com
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🎨 Customization

### Personal Information

Update your personal information in the Sanity CMS or modify the components directly:

- **Hero Section**: Update name, title, and description in `src/components/Hero.svelte`
- **About Section**: Modify bio and stats in `src/components/About.svelte`
- **Contact Information**: Update contact details in `src/components/Contact.svelte`

### Styling

- **Colors**: Modify the color scheme in `src/styles/global.css`
- **Fonts**: Add custom fonts in the layout file
- **Animations**: Customize animations in component files

### Content Management

Use Sanity Studio to manage:

- Projects and portfolio items
- Work experience and education
- Skills and technologies
- Blog posts and articles
- Personal information

## 📱 Responsive Design

The website is built with a mobile-first approach and includes:

- Responsive navigation with hamburger menu
- Flexible grid layouts
- Touch-friendly interactions
- Optimized images and assets

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Configure your domain and SSL

## 📊 Performance Optimization

The website includes several performance optimizations:

- **Image Optimization**: Automatic image optimization with Astro
- **Code Splitting**: Automatic code splitting for faster loading
- **Lazy Loading**: Images and components load as needed
- **Minification**: CSS and JavaScript are minified in production
- **Caching**: Proper cache headers for static assets

## 🔍 SEO Features

- **Meta Tags**: Comprehensive meta tags for social sharing
- **Structured Data**: JSON-LD structured data for search engines
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Open Graph**: Social media sharing optimization
- **Schema Markup**: Rich snippets for better search results

## 📝 Content Management

### Adding Projects

1. Go to Sanity Studio (`/admin`)
2. Create a new project document
3. Fill in all required fields
4. Upload images and set featured status
5. Publish the project

### Managing Skills

1. Navigate to Skills in Sanity Studio
2. Add new skills with proficiency levels
3. Organize by categories
4. Set custom colors and icons

### Writing Blog Posts

1. Create a new blog post in Sanity Studio
2. Write content using the rich text editor
3. Add featured images and tags
4. Set SEO meta information
5. Publish when ready

## 🎯 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Advanced animations with GSAP
- [ ] Email integration for contact form
- [ ] Analytics integration
- [ ] Progressive Web App features
- [ ] Advanced filtering for projects
- [ ] Comments system for blog posts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Astro.js](https://astro.build/) - The web framework
- [Svelte](https://svelte.dev/) - The component framework
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework
- [Sanity](https://www.sanity.io/) - The headless CMS
- [Lucide](https://lucide.dev/) - The icon library

## 📞 Support

If you have any questions or need help with the setup, feel free to reach out:

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

---

Built with ❤️ using modern web technologies
