<script lang="ts">
  import { onMount } from "svelte";
  import ExternalLink from "lucide-svelte/icons/external-link";
  import Github from "lucide-svelte/icons/github";
  import Eye from "lucide-svelte/icons/eye";
  import Code from "lucide-svelte/icons/code";
  import Palette from "lucide-svelte/icons/palette";
  import Database from "lucide-svelte/icons/database";
  import Sparkles from "lucide-svelte/icons/sparkles";
  import Star from "lucide-svelte/icons/star";
  import Zap from "lucide-svelte/icons/zap";
  import WordsPullUp from "./WordsPullUp.svelte";

  export let data: any[] = [];

  let projectsRef: HTMLElement;
  let isVisible = false;
  let selectedCategory = "All";

  onMount(() => {
    // Single unified observer for all scroll animations
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the stagger delay from CSS custom property or default to 0
            const staggerDelay = getComputedStyle(entry.target).getPropertyValue('--stagger-delay') || '0ms';
            const delay = Math.max(0, parseInt(staggerDelay) || 0);

            // Apply animation with appropriate delay
            if (delay > 0) {
              setTimeout(() => {
                entry.target.classList.add('visible');
              }, delay);
            } else {
              // No delay, animate immediately
              entry.target.classList.add('visible');
            }

            // Stop observing this element once it's animated
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px 50px 0px'
      }
    );

    if (projectsRef) {
      // Set main section as visible for tracking
      isVisible = true;

      // Observe ALL elements with scroll animation classes
      const animatedElements = projectsRef.querySelectorAll('.scroll-fade-up, .project-card');

      animatedElements.forEach((element) => {
        scrollObserver.observe(element);
      });
    }

    return () => {
      scrollObserver.disconnect();
    };
  });

  // Helper function to get gradient based on index
  const getGradient = (index: number) => {
    const gradients = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-cyan-500 to-blue-500",
      "from-pink-500 to-rose-500",
      "from-orange-500 to-yellow-500",
      "from-green-500 to-emerald-500",
    ];
    return gradients[index % gradients.length];
  };

  // Process projects data with comprehensive fallbacks
  $: processedProjects = (() => {
    if (!Array.isArray(data) || data.length === 0) {
      // Default fallback projects
      return [
        {
          title: "E-Commerce Platform",
          description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.",
          category: "full-stack",
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
          liveUrl: "https://example-ecommerce.com",
          githubUrl: "https://github.com/yourusername/ecommerce-platform",
          featured: true,
          gradient: getGradient(0),
        },
        {
          title: "Task Management App",
          description: "Modern task management application with real-time collaboration, drag-and-drop functionality, and team workspaces. Built with Next.js and Supabase.",
          category: "web-app",
          technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Framer Motion"],
          liveUrl: "https://example-tasks.com",
          githubUrl: "https://github.com/yourusername/task-manager",
          featured: false,
          gradient: getGradient(1),
        },
        {
          title: "Weather Dashboard",
          description: "Beautiful weather dashboard with location-based forecasts, interactive maps, and historical data visualization using Chart.js and weather APIs.",
          category: "frontend",
          technologies: ["React", "Chart.js", "OpenWeather API", "CSS Modules"],
          liveUrl: "https://example-weather.com",
          githubUrl: "https://github.com/yourusername/weather-dashboard",
          featured: false,
          gradient: getGradient(2),
        },
        {
          title: "Portfolio Website",
          description: "Responsive portfolio website showcasing projects, skills, and experience. Features smooth animations, dark mode, and contact forms.",
          category: "frontend",
          technologies: ["Astro", "Svelte", "Tailwind CSS", "Framer Motion"],
          liveUrl: "https://yourportfolio.com",
          githubUrl: "https://github.com/yourusername/portfolio",
          featured: true,
          gradient: getGradient(3),
        },
        {
          title: "API Rate Limiter",
          description: "Scalable API rate limiting service built with Redis and Node.js. Includes analytics dashboard and configurable rules per endpoint.",
          category: "backend",
          technologies: ["Node.js", "Redis", "Express", "Docker", "MongoDB"],
          githubUrl: "https://github.com/yourusername/api-rate-limiter",
          featured: false,
          gradient: getGradient(4),
        },
        {
          title: "Chat Application",
          description: "Real-time chat application with WebSocket support, file sharing, and group conversations. Built with Socket.io and React.",
          category: "full-stack",
          technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Express"],
          liveUrl: "https://example-chat.com",
          githubUrl: "https://github.com/yourusername/chat-app",
          featured: false,
          gradient: getGradient(5),
        }
      ];
    }

    // Process actual data from Sanity
    return data.map((project, index) => ({
      ...project,
      title: project.title || "Untitled Project",
      description: project.description || "No description available",
      category: project.category || "web-app",
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured || false,
      gradient: getGradient(index),
    }));
  })();

  // Get unique categories from projects
  $: categories = [
    { name: "All", icon: Sparkles },
    ...Array.from(new Set(processedProjects.map(p => p.category)))
      .map(category => {
        let icon = Code;
        switch (category) {
          case "full-stack":
            icon = Code;
            break;
          case "frontend":
            icon = Palette;
            break;
          case "web-app":
            icon = Database;
            break;
          case "ai-ml":
            icon = Zap;
            break;
          case "data-viz":
            icon = Database;
            break;
          case "backend":
            icon = Database;
            break;
          case "mobile":
            icon = Zap;
            break;
        }
        return {
          name: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          icon,
          originalValue: category
        };
      })
  ];

  $: filteredProjects =
    selectedCategory === "All"
      ? processedProjects
      : processedProjects.filter((project) => {
          const category = categories.find(c => c.name === selectedCategory);
          return category && 'originalValue' in category ? category.originalValue === project.category : false;
        });

  const getCategoryIcon = (category: string) => {
    const found = categories.find(c => c.name === category);
    return found ? found.icon : Code;
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
    <div class="text-center mb-16 scroll-fade-up" style="--stagger-delay: 0ms">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-4 hover-border-glow"
      >
        <Star size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >Portfolio</span
        >
      </div>
      <WordsPullUp
        text="Featured Projects"
        className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4"
        staggerDelay={0.1}
        animationDuration={0.9}
      />
      <WordsPullUp
        text="A showcase of my recent work that demonstrates creativity and technical excellence"
        className="text-xl text-gray-400 max-w-3xl mx-auto"
        staggerDelay={0.05}
        animationDuration={0.8}
      />
    </div>

    <!-- Category Filter -->
    <div
      class="flex flex-wrap justify-center gap-3 mb-12 scroll-fade-up"
      style="--stagger-delay: 200ms"
    >
      {#each categories as category}
        <button
          on:click={() => (selectedCategory = category.name)}
          class="category-filter-btn group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover-scale-glow hover-border-glow"
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
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {#each filteredProjects as project, index}
        <div
          class="project-card card-3d card-glow glass rounded-2xl group"
          style="--stagger-delay: {150 + (index * 50)}ms"
        >
          <!-- Project Image/Icon Area -->
          <div class="project-image relative h-56 bg-slate-800 overflow-hidden">
            {#if project.image}
              <img
                src={project.image}
                alt={project.title}
                class="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            {:else}
              <div
                class="absolute inset-0 flex items-center justify-center opacity-40"
              >
                <svelte:component
                  this={getCategoryIcon(project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()))}
                  size={80}
                  class="text-purple-400"
                />
              </div>
            {/if}

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
              {#if project.liveUrl}
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
              {/if}
              {#if project.githubUrl}
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
              {/if}
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
                  this={getCategoryIcon(project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()))}
                  size={14}
                />
                {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              <div class="flex gap-2">
                {#if project.liveUrl}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-purple-400 transition-colors"
                    title="View Live"
                  >
                    <Eye size={16} />
                  </a>
                {/if}
                {#if project.githubUrl}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-purple-400 transition-colors"
                    title="View Code"
                  >
                    <Github size={16} />
                  </a>
                {/if}
              </div>
            </div>

            <!-- Title -->
            <h3
              class="project-title text-xl font-black text-white transition-all duration-300"
            >
              {project.title}
            </h3>

            <!-- Description -->
            <p class="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 pt-2">
              {#each Array.isArray(project.technologies) ? project.technologies : [] as tech}
                <span
                  class="tech-tag group relative glass-light px-3 py-1 rounded-lg text-xs font-semibold text-gray-300 hover:text-white hover-scale-glow transition-all duration-300 overflow-hidden hover-border-glow"
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
    <div class="text-center scroll-fade-up" style="--stagger-delay: 800ms">
      <div class="glass-light p-8 rounded-3xl inline-block hover-border-glow">
        <WordsPullUp
          text="Want to see more? Check out my GitHub for additional projects and contributions!"
          className="text-gray-300 mb-6 text-lg max-w-md"
          staggerDelay={0.03}
          animationDuration={0.6}
        />
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient hover:scale-105 transition-all duration-300 btn-glow"
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

  /* Component-specific title animations */
  .project-title {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .project-card:hover .project-title {
    color: rgb(168, 85, 247);
    text-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  }

  /* Enhanced glass morphism for project cards */
  .project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius: inherit;
  }

  .project-card:hover::before {
    opacity: 1;
  }
</style>
