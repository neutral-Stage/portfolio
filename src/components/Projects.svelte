<script lang="ts">
  import { onMount } from "svelte";
  import {
    ExternalLink,
    Github,
    Eye,
    Code,
    Palette,
    Database,
    Sparkles,
    Star,
    Zap,
  } from "lucide-svelte";

  let projectsRef: HTMLElement;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectsRef) {
      observer.observe(projectsRef);
    }

    return () => observer.disconnect();
  });

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with real-time inventory, secure payments, and admin dashboard. Features include product management, order tracking, and customer analytics.",
      image: "/projects/ecommerce.jpg",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma"],
      category: "Full-Stack",
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/username/ecommerce",
      featured: true,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management with real-time updates, team collaboration, and project tracking. Built for productivity and seamless workflow.",
      image: "/projects/taskmanager.jpg",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      category: "Web App",
      liveUrl: "https://taskmanager-demo.com",
      githubUrl: "https://github.com/username/taskmanager",
      featured: true,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Weather Dashboard",
      description:
        "Responsive weather application with location-based forecasts, interactive maps, and detailed analytics. Real-time data visualization.",
      image: "/projects/weather.jpg",
      technologies: ["Svelte", "OpenWeather API", "Chart.js", "PWA"],
      category: "Frontend",
      liveUrl: "https://weather-demo.com",
      githubUrl: "https://github.com/username/weather",
      featured: false,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "AI Chat Application",
      description:
        "Intelligent chat powered by OpenAI GPT with conversation history, file uploads, and voice interactions. Natural language processing at its best.",
      image: "/projects/aichat.jpg",
      technologies: ["React", "OpenAI API", "WebSocket", "Node.js", "Redis"],
      category: "AI/ML",
      liveUrl: "https://aichat-demo.com",
      githubUrl: "https://github.com/username/aichat",
      featured: true,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Portfolio Website",
      description:
        "Modern, responsive portfolio with smooth animations, dark mode, and CMS integration. Showcasing creativity and technical excellence.",
      image: "/projects/portfolio.jpg",
      technologies: ["Astro", "Svelte", "Tailwind CSS", "Sanity CMS"],
      category: "Frontend",
      liveUrl: "https://portfolio-demo.com",
      githubUrl: "https://github.com/username/portfolio",
      featured: false,
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      title: "Social Media Analytics",
      description:
        "Comprehensive analytics dashboard with data visualization and automated reporting. Transform data into actionable insights.",
      image: "/projects/analytics.jpg",
      technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
      category: "Data Visualization",
      liveUrl: "https://analytics-demo.com",
      githubUrl: "https://github.com/username/analytics",
      featured: false,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const categories = [
    { name: "All", icon: Sparkles },
    { name: "Full-Stack", icon: Code },
    { name: "Frontend", icon: Palette },
    { name: "Web App", icon: Database },
    { name: "AI/ML", icon: Zap },
    { name: "Data Visualization", icon: Database },
  ];
  let selectedCategory = "All";

  $: filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Full-Stack":
        return Code;
      case "Frontend":
        return Palette;
      case "Web App":
        return Database;
      case "AI/ML":
        return Zap;
      case "Data Visualization":
        return Database;
      default:
        return Code;
    }
  };
</script>

<section
  id="projects"
  bind:this={projectsRef}
  class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  <!-- Background Elements -->
  <div class="absolute inset-0 bg-slate-950/50"></div>
  <div
    class="absolute top-1/2 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20 scroll-fade-up">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-6 hover-border-glow"
      >
        <Star size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >Portfolio</span
        >
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
        <span class="text-purple-400"> Featured Projects </span>
      </h2>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        A showcase of my recent work that demonstrates creativity and technical
        excellence
      </p>
    </div>

    <!-- Category Filter -->
    <div
      class="flex flex-wrap justify-center gap-3 mb-16 scroll-fade-up scroll-fade-up-delay-200"
    >
      {#each categories as category}
        <button
          on:click={() => (selectedCategory = category.name)}
          class="group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover-scale-glow hover-border-glow"
          class:text-white={selectedCategory === category.name}
          class:text-gray-400={selectedCategory !== category.name}
        >
          {#if selectedCategory === category.name}
            <div class="absolute inset-0 glass-strong rounded-xl"></div>
          {/if}
          <span
            class="relative z-10 flex items-center gap-2 transition-colors"
            class:text-white={selectedCategory !== category.name}
          >
            <svelte:component
              this={category.icon}
              size={18}
              class="group-hover:scale-110 transition-transform"
            />
            {category.name}
          </span>
          {#if selectedCategory !== category.name}
            <div
              class="absolute inset-0 glass-light opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"
            ></div>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Projects Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {#each filteredProjects as project, index}
        <div
          class="card-3d card-glow glass rounded-2xl overflow-hidden group scroll-fade-up scroll-fade-up-delay-{index *
            100}"
        >
          <!-- Project Image/Icon Area -->
          <div class="relative h-56 bg-slate-800 overflow-hidden">
            <div
              class="absolute inset-0 flex items-center justify-center opacity-40"
            >
              <svelte:component
                this={getCategoryIcon(project.category)}
                size={80}
                class="text-purple-400"
              />
            </div>

            <!-- Pattern Overlay -->
            <div
              class="absolute inset-0 opacity-10"
              style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 20px 20px;"
            ></div>

            <!-- Featured Badge -->
            {#if project.featured}
              <div class="absolute top-4 right-4">
                <div
                  class="glass px-4 py-2 rounded-full inline-flex items-center gap-2 hover-border-glow"
                >
                  <Star size={14} class="text-yellow-400 fill-yellow-400" />
                  <span class="text-xs font-bold text-white">Featured</span>
                </div>
              </div>
            {/if}

            <!-- Hover Overlay with Actions -->
            <div
              class="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 rounded-xl glass-strong flex items-center justify-center hover-scale-glow transition-transform duration-300 group/link hover-border-glow"
              >
                <ExternalLink
                  size={20}
                  class="text-white group-hover/link:scale-110 transition-transform"
                />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 rounded-xl glass-strong flex items-center justify-center hover-scale-glow transition-transform duration-300 group/link hover-border-glow"
              >
                <Github
                  size={20}
                  class="text-white group-hover/link:scale-110 transition-transform"
                />
              </a>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6 space-y-4">
            <!-- Category Tag -->
            <div class="flex items-center justify-between">
              <span
                class="inline-flex items-center gap-2 text-purple-400 text-sm font-semibold"
              >
                <svelte:component
                  this={getCategoryIcon(project.category)}
                  size={14}
                />
                {project.category}
              </span>
              <div class="flex gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-purple-400 transition-colors"
                  title="View Live"
                >
                  <Eye size={16} />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-purple-400 transition-colors"
                  title="View Code"
                >
                  <Github size={16} />
                </a>
              </div>
            </div>

            <!-- Title -->
            <h3
              class="text-xl font-black text-white group-hover:text-purple-400 transition-all duration-300"
            >
              {project.title}
            </h3>

            <!-- Description -->
            <p class="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 pt-2">
              {#each project.technologies as tech}
                <span
                  class="group relative glass-light px-3 py-1 rounded-lg text-xs font-semibold text-gray-300 hover:text-white hover-scale-glow transition-all duration-300 overflow-hidden hover-border-glow"
                >
                  <span class="relative z-10">{tech}</span>
                </span>
              {/each}
            </div>
          </div>

          <!-- Bottom Border Line -->
          <div class="h-1 bg-purple-500/30"></div>
        </div>
      {/each}
    </div>

    <!-- View More Section -->
    <div class="text-center scroll-fade-up scroll-fade-up-delay-600">
      <div class="glass-light p-8 rounded-3xl inline-block hover-border-glow">
        <p class="text-gray-300 mb-6 text-lg max-w-md">
          Want to see more? Check out my GitHub for additional projects and
          contributions!
        </p>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white glass-strong hover-scale-glow transition-all duration-300 btn-border-glow"
        >
          <Github size={24} />
          Explore More on GitHub
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
