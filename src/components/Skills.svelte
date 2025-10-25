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
  import WordsPullUp from "./WordsPullUp.svelte";

  export let data: any[] = [];

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

  // Helper function to get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return Code;
      case "design":
        return Palette;
      case "backend":
        return Database;
      case "devops":
        return Cloud;
      case "mobile":
        return Smartphone;
      case "tools":
        return Globe;
      default:
        return Code;
    }
  };

  // Helper function to get color gradient based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "from-purple-500 to-pink-500";
      case "design":
        return "from-pink-500 to-rose-500";
      case "backend":
        return "from-blue-500 to-cyan-500";
      case "devops":
        return "from-cyan-500 to-blue-500";
      case "mobile":
        return "from-orange-500 to-yellow-500";
      case "tools":
        return "from-green-500 to-emerald-500";
      default:
        return "from-purple-500 to-pink-500";
    }
  };

  // Helper function to format category title
  const formatCategoryTitle = (category: string) => {
    switch (category) {
      case "frontend":
        return "Frontend Development";
      case "design":
        return "UI/UX Design";
      case "backend":
        return "Backend Development";
      case "devops":
        return "DevOps & Cloud";
      case "mobile":
        return "Mobile Development";
      case "tools":
        return "Tools & Others";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  // Group skills by category
  $: skillCategories = Array.from(new Set(data.map(skill => skill.category)))
    .map(category => ({
      title: formatCategoryTitle(category),
      icon: getCategoryIcon(category),
      color: getCategoryColor(category),
      skills: data.filter(skill => skill.category === category)
        .map(skill => ({
          name: skill.name,
          level: skill.level,
          description: skill.description,
          yearsOfExperience: skill.yearsOfExperience
        }))
    }));
</script>

<section
  id="skills"
  bind:this={skillsRef}
  class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  <!-- Background -->
  <div class="absolute inset-0 bg-slate-900/50"></div>
  <div
    class="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"
    style="animation-delay: 1s;"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20 scroll-fade-up">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-6 hover-border-glow"
      >
        <Sparkles size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >Skills & Expertise</span
        >
      </div>
      <WordsPullUp
        text="What I Bring to the Table"
        className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
        staggerDelay={0.1}
        animationDuration={1.1}
      />
      <WordsPullUp
        text="A comprehensive toolkit of modern technologies and frameworks"
        className="text-xl text-gray-400 max-w-3xl mx-auto"
        staggerDelay={0.05}
        animationDuration={0.8}
      />
    </div>

    <!-- Category Tabs -->
    <div
      class="flex flex-wrap justify-center gap-3 mb-16 scroll-fade-up scroll-fade-up-delay-200"
    >
      {#each skillCategories as category, index}
        <button
          on:click={() => (selectedCategory = index)}
          class="group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover-scale-glow hover-border-glow"
          class:text-white={selectedCategory === index}
          class:text-gray-400={selectedCategory !== index}
        >
          {#if selectedCategory === index}
            <div class="absolute inset-0 glass-strong rounded-xl"></div>
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
          {/if}
        </button>
      {/each}
    </div>

    <!-- Skills Display -->
    <div class="max-w-5xl mx-auto">
      {#each skillCategories as category, catIndex}
        {#if selectedCategory === catIndex}
          <div class="scroll-fade-up">
            <!-- Category Header Card -->
            <div
              class="card-glow glass-strong p-8 rounded-3xl mb-8 hover-border-glow"
            >
              <div class="flex items-center gap-6 mb-2">
                <div
                  class="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center hover-border-glow"
                >
                  <svelte:component
                    this={category.icon}
                    size={32}
                    class="text-purple-400"
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
                  class="card-3d card-shine glass p-6 rounded-2xl group hover-scale-glow transition-all duration-300 scroll-fade-up scroll-fade-up-delay-{skillIndex *
                    100} hover-border-glow"
                >
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h4 class="text-lg font-bold text-white mb-1">
                        {skill.name}
                      </h4>
                      <p class="text-sm text-gray-400">Proficiency Level</p>
                      {#if skill.yearsOfExperience}
                        <p class="text-xs text-gray-500 mt-1">
                          {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} experience
                        </p>
                      {/if}
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
                          stroke="rgb(168, 85, 247)"
                          stroke-width="6"
                          stroke-linecap="round"
                          stroke-dasharray="175.93"
                          stroke-dashoffset={175.93 -
                            (175.93 * (isVisible ? skill.level : 0)) / 100}
                          class="transition-all duration-1000 ease-out"
                          style="transition-delay: {skillIndex * 100}ms;"
                        />
                      </svg>
                      <!-- Percentage Text -->
                      <div
                        class="absolute inset-0 flex items-center justify-center"
                      >
                        <span class="text-sm font-black text-purple-400"
                          >{skill.level}%</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Skill Description -->
                  {#if skill.description}
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed">
                      {skill.description}
                    </p>
                  {/if}

                  <!-- Progress Bar (Alternative View) -->
                  <div class="space-y-2">
                    <div
                      class="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden"
                    >
                      <div
                        class="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out"
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
    <div class="mt-24 text-center scroll-fade-up scroll-fade-up-delay-400">
      <h3 class="text-3xl font-black text-white mb-4">
        <span class="text-purple-400">Additional Technologies</span>
      </h3>
      <WordsPullUp
        text="And many more tools in my arsenal"
        className="text-gray-400 mb-12"
        staggerDelay={0.03}
        animationDuration={0.6}
      />

      <div class="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
        {#each ["Tailwind CSS", "Styled Components", "GraphQL", "Redis", "Elasticsearch", "Jest", "Cypress", "Storybook", "Webpack", "Babel", "ESLint", "Prettier", "Sass", "WebGL", "Three.js", "D3.js", "Chart.js", "Socket.io", "Express.js", "FastAPI", "Prisma", "TypeORM", "JWT", "OAuth", "Stripe", "Firebase", "Supabase", "Vercel", "Netlify", "Heroku", "DigitalOcean"] as tech, index}
          <span
            class="group relative glass-light px-5 py-2.5 rounded-full text-sm font-semibold text-gray-300 hover:text-white hover-scale-glow transition-all duration-300 cursor-default scroll-fade-up scroll-fade-up-delay-{index *
              30} overflow-hidden hover-border-glow"
          >
            <span class="relative z-10">{tech}</span>
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
