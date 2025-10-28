<script lang="ts">
  import { onMount } from "svelte";
  import User from "lucide-svelte/icons/user";
  import Award from "lucide-svelte/icons/award";
  import CheckCircle from "lucide-svelte/icons/check-circle";
  import Users from "lucide-svelte/icons/users";
  import Zap from "lucide-svelte/icons/zap";
  import Target from "lucide-svelte/icons/target";
  import Rocket from "lucide-svelte/icons/rocket";
  import Star from "lucide-svelte/icons/star";
  import Mail from "lucide-svelte/icons/mail";
  import Code from "lucide-svelte/icons/code";
  import Briefcase from "lucide-svelte/icons/briefcase";
  import WordsPullUp from "./WordsPullUp.svelte";

  export let data: any = {};

  let aboutRef: HTMLElement;
  let isVisible = false;
  let activeCard = -1;

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

    if (aboutRef) {
      observer.observe(aboutRef);
    }

    return () => observer.disconnect();
  });

  // Helper function to get icon from string name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Rocket":
        return Rocket;
      case "Award":
        return Award;
      case "Code":
        return Code;
      case "Users":
        return Users;
      case "CheckCircle":
        return CheckCircle;
      case "Briefcase":
        return Briefcase;
      case "Star":
        return Star;
      case "Target":
        return Target;
      case "Zap":
        return Zap;
      default:
        return Rocket;
    }
  };

  // Helper function to get gradient based on index
  const getGradient = (index: number) => {
    const gradients = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-orange-500 to-yellow-500",
      "from-pink-500 to-rose-500",
    ];
    return gradients[index % gradients.length];
  };

  // Process stats from data - handle both object and array formats for backward compatibility
  $: stats = (() => {
    if (!data || (!data.stats && !data.yearsExperience)) {
      // Default fallback stats
      return [
        {
          icon: Rocket,
          label: "Years Experience",
          value: "3+",
          color: getGradient(0),
        },
        {
          icon: Code,
          label: "Projects Completed",
          value: "50+",
          color: getGradient(1),
        },
        {
          icon: Users,
          label: "Happy Clients",
          value: "25+",
          color: getGradient(2),
        },
        {
          icon: Target,
          label: "Countries",
          value: "10+",
          color: getGradient(3),
        }
      ];
    }

    // Handle object format from Sanity (new format)
    if (data.stats && typeof data.stats === 'object' && !Array.isArray(data.stats)) {
      const statsObj = data.stats;
      return [
        {
          icon: Rocket,
          label: "Years Experience",
          value: statsObj.yearsExperience ? `${statsObj.yearsExperience}+` : "3+",
          color: getGradient(0),
        },
        {
          icon: Code,
          label: "Projects Completed",
          value: statsObj.projectsCompleted ? `${statsObj.projectsCompleted}+` : "50+",
          color: getGradient(1),
        },
        {
          icon: Users,
          label: "Happy Clients",
          value: statsObj.happyClients ? `${statsObj.happyClients}+` : "25+",
          color: getGradient(2),
        },
        {
          icon: Target,
          label: "Countries",
          value: statsObj.countriesWorked ? `${statsObj.countriesWorked}+` : "10+",
          color: getGradient(3),
        }
      ];
    }

    // Handle array format (legacy format)
    if (Array.isArray(data.stats)) {
      return data.stats.map((stat, index) => ({
        icon: getIcon(stat.icon) || Rocket,
        label: stat.label || "Stat",
        value: stat.value || "0",
        color: getGradient(index),
      }));
    }

    return [];
  })();

  // Process highlights from data
  $: highlights = (() => {
    if (!data || !data.highlights || !Array.isArray(data.highlights) || data.highlights.length === 0) {
      // Default fallback highlights
      return [
        {
          icon: CheckCircle,
          title: "Full-Stack Development",
          description: "Expert in both frontend and backend technologies, delivering complete solutions from conception to deployment.",
        },
        {
          icon: Rocket,
          title: "Modern Technologies",
          description: "Proficient in React, Node.js, TypeScript, and cloud platforms like AWS and Vercel.",
        },
        {
          icon: Users,
          title: "Team Collaboration",
          description: "Experienced in agile development, code reviews, and cross-functional team coordination.",
        }
      ];
    }

    return data.highlights.map((highlight, index) => ({
      icon: getIcon(highlight.icon) || CheckCircle,
      title: highlight.title || "Highlight",
      description: highlight.description || "No description available",
    }));
  })();

  // Professional status from data
  $: professionalStatus = (() => {
    if (!data || !data.professionalStatus) {
      return {
        status: "available",
        message: "Open to opportunities",
        types: ["Freelance", "Contract", "Full-Time"]
      };
    }

    const status = data.professionalStatus;
    return {
      status: status.available !== false ? "available" : "busy",
      message: status.statusText || data.availability?.message || "Open to opportunities",
      types: Array.isArray(status.workTypes) ? status.workTypes : ["Freelance", "Contract", "Full-Time"]
    };
  })();

  // Personal information with comprehensive fallbacks
  $: personalInfo = (() => {
    if (!data) {
      return {
        name: "Your Name",
        title: "Full Stack Developer",
        profileImage: null,
        ctaMessage: "Let's discuss how I can contribute to your next project",
        bio: []
      };
    }

    return {
      name: data.name || "Your Name",
      title: data.title || "Full Stack Developer",
      profileImage: data.profileImage || null,
      ctaMessage: data.ctaMessage || "Let's discuss how I can contribute to your next project",
      bio: data.bio || [],
      ...data
    };
  })();

  // Bio content with fallbacks
  $: bioContent = (() => {
    if (Array.isArray(personalInfo.bio) && personalInfo.bio.length > 0) {
      return personalInfo.bio.map(block => {
        if (block._type === 'block' && Array.isArray(block.children)) {
          return block.children.map(child => child.text || '').join('');
        }
        return '';
      }).filter(text => text.trim() !== '');
    }

    // Default bio content
    return [
      "A seasoned full-stack developer with 3+ years of professional experience in designing, developing, and deploying scalable web applications. Specialized in delivering high-quality solutions that drive business growth and enhance user engagement.",
      "My expertise spans modern JavaScript frameworks, cloud infrastructure, and full-stack development. I've successfully led projects from conception to deployment, collaborating with cross-functional teams to deliver solutions that exceed client expectations.",
      "Committed to staying current with industry trends and best practices, I bring a strategic approach to problem-solving and a track record of delivering projects on time and within budget."
    ];
  })();
</script>

<section
  id="about"
  bind:this={aboutRef}
  class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  <!-- Background Elements -->
  <div class="absolute inset-0 bg-slate-950/50"></div>
  <div
    class="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
    style="animation: float 10s ease-in-out infinite;"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20 scroll-fade-up">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-6 hover-border-glow"
      >
        <User size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >About Me</span
        >
      </div>
      <WordsPullUp
        text="Professional Background"
        className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
        staggerDelay={0.1}
        animationDuration={0.8}
      />
      <WordsPullUp
        text="Delivering enterprise-grade solutions with expertise in modern web technologies"
        className="text-xl text-gray-400 max-w-3xl mx-auto"
        staggerDelay={0.05}
        animationDuration={0.6}
      />
    </div>

    <!-- Main Content Grid -->
    <div class="grid lg:grid-cols-[1fr_400px] gap-8 mb-16 items-start">
      <!-- Left Column: Description -->
      <div class="space-y-6 scroll-fade-up scroll-fade-up-delay-100">
        <!-- Main Description Card -->
        <div
          class="card-glow glass p-8 rounded-2xl hover-scale-glow transition-transform duration-300 hover-border-glow"
        >
          {#each bioContent as paragraph, index}
            <p class="text-gray-300 leading-relaxed {index < bioContent.length - 1 ? 'mb-4' : ''}">
              {paragraph}
            </p>
          {/each}
        </div>

        <!-- Highlight Cards Grid -->
        <div class="grid sm:grid-cols-3 gap-4">
          {#each highlights as highlight, index}
            <div
              role="button"
              tabindex="0"
              class="card-shine glass-light p-6 rounded-xl hover-scale-glow transition-all duration-300 scroll-fade-up scroll-fade-up-delay-{index *
                50} hover-border-glow"
              on:mouseenter={() => (activeCard = index)}
              on:mouseleave={() => (activeCard = -1)}
              on:keydown={() => {}}
            >
              <div
                class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 hover-border-glow"
              >
                <svelte:component
                  this={highlight.icon}
                  size={24}
                  class="text-purple-400"
                />
              </div>
              <h4 class="text-base font-bold text-white mb-2">
                {highlight.title}
              </h4>
              <p class="text-gray-400 text-sm leading-relaxed">
                {highlight.description}
              </p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Right Column: Profile & Status -->
      <div class="space-y-6 scroll-fade-up scroll-fade-up-delay-150">
        <!-- Professional Profile Image -->
        <div class="relative group">
          <div class="w-full aspect-square relative">
            <!-- Background Glow -->
            <div
              class="absolute inset-0 rounded-2xl bg-purple-500/10 blur-2xl"
            ></div>

            <!-- Main Profile Container -->
            <div
              class="relative rounded-2xl glass-strong border border-white/10 group-hover:border-purple-500/50 transition-all duration-500 hover-border-glow"
            >
              <div
                class="aspect-auto flex items-center justify-center bg-purple-600/10"
              >
                {#if personalInfo?.profileImage?.url}
                  <img
                    src={personalInfo.profileImage.url}
                    alt={personalInfo.profileImage.alt || personalInfo.name || "Profile Image"}
                    class="w-full h-full object-cover rounded-2xl"
                  />
                {:else}
                  <User
                    size={140}
                    class="text-purple-400/60 group-hover:text-purple-400 transition-colors duration-500"
                  />
                {/if}
            </div>

              <!-- Status Badge Overlay -->
              <div
                class="absolute top-4 right-4 glass px-3 py-1.5 rounded-full border border-green-500/30 hover-border-glow"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                  ></div>
                  <span class="text-xs font-bold text-white">{professionalStatus.status}</span>
                </div>
              </div>

              <!-- Remote Badge -->
              <div
                class="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-full border border-blue-500/30"
              >
                <span class="text-xs font-bold text-white">Remote Ready</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Professional Status Info -->
        <div
          class="card-glow glass-strong p-5 rounded-2xl border border-purple-500/20"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0"
            >
              <CheckCircle size={20} class="text-white" />
            </div>
            <div>
              <h3 class="text-base font-black text-white mb-2">
                {professionalStatus.message || "Open to Opportunities"}
              </h3>
              <div class="flex flex-wrap gap-2">
                {#each Array.isArray(professionalStatus.types) ? professionalStatus.types : [] as type}
                  <span
                    class="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30"
                  >
                    {type}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid - Full Width Below -->
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 scroll-fade-up scroll-fade-up-delay-250"
    >
      {#each stats as stat, index}
        <div
          class="card-3d card-glow glass p-6 rounded-2xl text-center hover-scale-glow transition-all duration-300 scroll-fade-up scroll-fade-up-delay-{index *
            50} hover-border-glow"
        >
          <div
            class="mb-4 inline-flex p-3 rounded-xl bg-purple-500/20 hover-border-glow"
          >
            <svelte:component
              this={stat.icon}
              size={28}
              class="text-purple-400"
            />
          </div>
          <div class="text-3xl font-black text-purple-400 mb-2">
            {stat.value}
          </div>
          <div class="text-sm text-gray-400 font-medium">{stat.label}</div>
        </div>
      {/each}
    </div>

    <!-- Bottom CTA -->
    <div class="text-center scroll-fade-up scroll-fade-up-delay-300">
      <div
        class="card-shine glass-strong p-8 rounded-2xl inline-block max-w-2xl border border-purple-500/20 hover-border-glow"
      >
        <h3 class="text-2xl font-black text-white mb-3">
          Ready to Collaborate?
        </h3>
        <p class="text-gray-400 mb-6">
          {personalInfo.ctaMessage || "Let's discuss how I can contribute to your next project"}
        </p>
        <a
          href="#contact"
          class="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient hover:scale-105 transition-all duration-300 btn-glow"
        >
          <Mail size={20} />
          Schedule Consultation
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .prose {
    color: inherit;
  }

  .prose p {
    margin-bottom: 0;
  }
</style>
