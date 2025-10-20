<script lang="ts">
  import { onMount } from "svelte";
  import {
    Code,
    Palette,
    Database,
    Cloud,
    Smartphone,
    Globe,
    Sparkles,
  } from "lucide-svelte";

  let skillsRef: HTMLElement;
  let isVisible = false;
  let selectedCategory = 0;

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

    if (skillsRef) {
      observer.observe(skillsRef);
    }

    return () => observer.disconnect();
  });

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "JavaScript/TypeScript", level: 95 },
        { name: "React/Next.js", level: 90 },
        { name: "Svelte/SvelteKit", level: 85 },
        { name: "Vue.js", level: 80 },
        { name: "HTML5/CSS3", level: 95 },
      ],
    },
    {
      title: "UI/UX Design",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      skills: [
        { name: "Figma", level: 90 },
        { name: "Adobe XD", level: 85 },
        { name: "Sketch", level: 80 },
        { name: "Prototyping", level: 88 },
        { name: "User Research", level: 75 },
      ],
    },
    {
      title: "Backend Development",
      icon: Database,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python/Django", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "REST APIs", level: 92 },
      ],
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      color: "from-cyan-500 to-blue-500",
      skills: [
        { name: "AWS", level: 80 },
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 70 },
        { name: "CI/CD", level: 88 },
        { name: "Linux", level: 82 },
      ],
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      color: "from-orange-500 to-yellow-500",
      skills: [
        { name: "React Native", level: 85 },
        { name: "Flutter", level: 75 },
        { name: "iOS Development", level: 70 },
        { name: "Android Development", level: 70 },
        { name: "PWA", level: 90 },
      ],
    },
    {
      title: "Tools & Others",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Git/GitHub", level: 95 },
        { name: "Webpack/Vite", level: 85 },
        { name: "Testing (Jest)", level: 80 },
        { name: "Agile/Scrum", level: 88 },
        { name: "Project Management", level: 82 },
      ],
    },
  ];
</script>

<section
  id="skills"
  bind:this={skillsRef}
  class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  <!-- Background -->
  <div
    class="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent"
  ></div>
  <div
    class="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"
    style="animation-delay: 1s;"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20 animate-scale-in">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-6"
      >
        <Sparkles size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >Skills & Expertise</span
        >
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
        <span class="gradient-text"> What I Bring to the Table </span>
      </h2>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        A comprehensive toolkit of modern technologies and frameworks
      </p>
    </div>

    <!-- Category Tabs -->
    <div
      class="flex flex-wrap justify-center gap-3 mb-16 animate-slide-up delay-200"
    >
      {#each skillCategories as category, index}
        <button
          on:click={() => (selectedCategory = index)}
          class="group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          class:text-white={selectedCategory === index}
          class:text-gray-400={selectedCategory !== index}
        >
          {#if selectedCategory === index}
            <div class="absolute inset-0 glass-strong rounded-xl"></div>
            <div
              class="absolute inset-0 bg-gradient-to-r {category.color} opacity-20 rounded-xl"
            ></div>
          {/if}
          <span
            class="relative z-10 flex items-center gap-2 transition-colors"
            class:text-white={selectedCategory !== index}
          >
            <svelte:component
              this={category.icon}
              size={18}
              class="group-hover:scale-110 transition-transform"
            />
            {category.title}
          </span>
          {#if selectedCategory !== index}
            <div
              class="absolute inset-0 glass-light opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"
            ></div>
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"
            ></div>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Skills Display -->
    <div class="max-w-5xl mx-auto">
      {#each skillCategories as category, catIndex}
        {#if selectedCategory === catIndex}
          <div class="animate-scale-in">
            <!-- Category Header Card -->
            <div class="card-glow glass-strong p-8 rounded-3xl mb-8">
              <div class="flex items-center gap-6 mb-2">
                <div
                  class="w-16 h-16 rounded-2xl bg-gradient-to-br {category.color} flex items-center justify-center"
                >
                  <svelte:component
                    this={category.icon}
                    size={32}
                    class="text-white"
                  />
                </div>
                <div>
                  <h3 class="text-3xl font-black text-white mb-1">
                    {category.title}
                  </h3>
                  <p class="text-gray-400">
                    Expert level proficiency in these technologies
                  </p>
                </div>
              </div>
            </div>

            <!-- Skills Grid -->
            <div class="grid md:grid-cols-2 gap-6">
              {#each category.skills as skill, skillIndex}
                <div
                  class="card-3d card-shine glass p-6 rounded-2xl group hover:scale-[1.02] transition-all duration-300 animate-slide-up delay-{skillIndex *
                    100}"
                >
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h4 class="text-lg font-bold text-white mb-1">
                        {skill.name}
                      </h4>
                      <p class="text-sm text-gray-400">Proficiency Level</p>
                    </div>
                    <div class="relative w-16 h-16">
                      <!-- Circular Progress -->
                      <svg
                        class="transform -rotate-90 w-16 h-16"
                        viewBox="0 0 64 64"
                      >
                        <!-- Background Circle -->
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.1)"
                          stroke-width="6"
                        />
                        <!-- Progress Circle -->
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="url(#gradient-{catIndex}-{skillIndex})"
                          stroke-width="6"
                          stroke-linecap="round"
                          stroke-dasharray="175.93"
                          stroke-dashoffset={175.93 -
                            (175.93 * (isVisible ? skill.level : 0)) / 100}
                          class="transition-all duration-1000 ease-out"
                          style="transition-delay: {skillIndex * 100}ms;"
                        />
                        <defs>
                          <linearGradient
                            id="gradient-{catIndex}-{skillIndex}"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              class="text-purple-500"
                              stop-color="currentColor"
                            />
                            <stop
                              offset="100%"
                              class="text-pink-500"
                              stop-color="currentColor"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                      <!-- Percentage Text -->
                      <div
                        class="absolute inset-0 flex items-center justify-center"
                      >
                        <span class="text-sm font-black gradient-text"
                          >{skill.level}%</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Progress Bar (Alternative View) -->
                  <div class="space-y-2">
                    <div
                      class="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden"
                    >
                      <div
                        class="h-full bg-gradient-to-r {category.color} rounded-full transition-all duration-1000 ease-out"
                        style="width: {isVisible
                          ? skill.level
                          : 0}%; transition-delay: {skillIndex * 100}ms;"
                      ></div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    </div>

    <!-- Additional Technologies Cloud -->
    <div class="mt-24 text-center animate-slide-up delay-400">
      <h3 class="text-3xl font-black text-white mb-4">
        <span class="gradient-text">Additional Technologies</span>
      </h3>
      <p class="text-gray-400 mb-12">And many more tools in my arsenal</p>

      <div class="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
        {#each ["Tailwind CSS", "Styled Components", "GraphQL", "Redis", "Elasticsearch", "Jest", "Cypress", "Storybook", "Webpack", "Babel", "ESLint", "Prettier", "Sass", "WebGL", "Three.js", "D3.js", "Chart.js", "Socket.io", "Express.js", "FastAPI", "Prisma", "TypeORM", "JWT", "OAuth", "Stripe", "Firebase", "Supabase", "Vercel", "Netlify", "Heroku", "DigitalOcean"] as tech, index}
          <span
            class="group relative glass-light px-5 py-2.5 rounded-full text-sm font-semibold text-gray-300 hover:text-white hover:scale-110 transition-all duration-300 cursor-default animate-bounce-in delay-{index *
              30} overflow-hidden"
          >
            <span class="relative z-10">{tech}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </span>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* Smooth transitions for category changes */
  section {
    will-change: transform;
  }
</style>
