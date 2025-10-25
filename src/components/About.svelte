<script lang="ts">
  import { onMount } from "svelte";
  import {
    User,
    Award,
    CheckCircle,
    Users,
    Zap,
    Target,
    Rocket,
    Star,
    Mail,
    Code,
    Briefcase,
  } from "lucide-svelte";
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

  // Process stats from data
  $: stats = (data.stats || []).map((stat, index) => ({
    icon: getIcon(stat.icon) || Rocket,
    label: stat.label,
    value: stat.value,
    color: getGradient(index),
  }));

  // Process highlights from data
  $: highlights = (data.highlights || []).map((highlight, index) => ({
    icon: CheckCircle, // Default icon for highlights
    title: highlight.title,
    description: highlight.description,
  }));

  // Professional status from data
  $: professionalStatus = data.professionalStatus || {
    status: "available",
    message: "Open to opportunities",
    types: ["Freelance", "Contract", "Full-Time"]
  };
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
      <div class="space-y-6 scroll-fade-up scroll-fade-up-delay-200">
        <!-- Main Description Card -->
        <div
          class="card-glow glass p-8 rounded-2xl hover-scale-glow transition-transform duration-300 hover-border-glow"
        >
          <p class="text-gray-300 leading-relaxed mb-4">
            A seasoned full-stack developer with 3+ years of professional
            experience in designing, developing, and deploying scalable web
            applications. Specialized in delivering high-quality solutions that
            drive business growth and enhance user engagement.
          </p>

          <p class="text-gray-300 leading-relaxed mb-4">
            My expertise spans modern JavaScript frameworks, cloud
            infrastructure, and full-stack development. I've successfully led
            projects from conception to deployment, collaborating with
            cross-functional teams to deliver solutions that exceed client
            expectations.
          </p>

          <p class="text-gray-300 leading-relaxed">
            Committed to staying current with industry trends and best
            practices, I bring a strategic approach to problem-solving and a
            track record of delivering projects on time and within budget.
          </p>
        </div>

        <!-- Highlight Cards Grid -->
        <div class="grid sm:grid-cols-3 gap-4">
          {#each highlights as highlight, index}
            <div
              role="button"
              tabindex="0"
              class="card-shine glass-light p-6 rounded-xl hover-scale-glow transition-all duration-300 scroll-fade-up scroll-fade-up-delay-{index *
                100} hover-border-glow"
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
      <div class="space-y-6 scroll-fade-up scroll-fade-up-delay-300">
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
                class="aspect-square flex items-center justify-center bg-purple-600/10"
              >
                <User
                  size={140}
                  class="text-purple-400/60 group-hover:text-purple-400 transition-colors duration-500"
                />
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
                {#each (professionalStatus.types || []) as type}
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
      class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 scroll-fade-up scroll-fade-up-delay-500"
    >
      {#each stats as stat, index}
        <div
          class="card-3d card-glow glass p-6 rounded-2xl text-center hover-scale-glow transition-all duration-300 scroll-fade-up scroll-fade-up-delay-{index *
            100} hover-border-glow"
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
    <div class="text-center scroll-fade-up scroll-fade-up-delay-600">
      <div
        class="card-shine glass-strong p-8 rounded-2xl inline-block max-w-2xl border border-purple-500/20 hover-border-glow"
      >
        <h3 class="text-2xl font-black text-white mb-3">
          Ready to Collaborate?
        </h3>
        <p class="text-gray-400 mb-6">
          Let's discuss how I can contribute to your next project
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
