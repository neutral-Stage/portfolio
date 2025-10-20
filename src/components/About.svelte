<script lang="ts">
  import { onMount } from "svelte";
  import {
    User,
    Award,
    Coffee,
    Heart,
    Zap,
    Target,
    Rocket,
    Star,
    Mail,
  } from "lucide-svelte";

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

  const stats = [
    {
      icon: Rocket,
      label: "Projects Completed",
      value: "50+",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      label: "Years Experience",
      value: "3+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Coffee,
      label: "Cups of Coffee",
      value: "1000+",
      color: "from-orange-500 to-yellow-500",
    },
    {
      icon: Heart,
      label: "Happy Clients",
      value: "25+",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const highlights = [
    {
      icon: Zap,
      title: "Fast Learner",
      description: "Quick to adapt to new technologies and frameworks",
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Focused on delivering results and exceeding expectations",
    },
    {
      icon: Star,
      title: "Quality First",
      description: "Committed to writing clean, maintainable code",
    },
  ];
</script>

<section
  id="about"
  bind:this={aboutRef}
  class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  <!-- Background Elements -->
  <div class="absolute inset-0 gradient-mesh-1 opacity-20"></div>
  <div
    class="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
    style="animation: float 10s ease-in-out infinite;"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20 animate-scale-in">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-6"
      >
        <User size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >About Me</span
        >
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
        <span class="gradient-text"> Passionate Developer </span>
      </h2>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Turning ideas into elegant digital solutions with creativity and
        precision
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
      <!-- Text Content with Cards -->
      <div class="space-y-8 animate-fade-slide-right">
        <!-- Main Description Card -->
        <div
          class="card-glow glass p-8 rounded-2xl group hover:scale-[1.02] transition-transform duration-300"
        >
          <div class="prose prose-lg prose-invert max-w-none">
            <p class="text-gray-300 leading-relaxed text-lg mb-4">
              I'm a passionate full-stack developer with over 3 years of
              experience creating digital solutions that make a real impact. My
              journey began with a curiosity about how things work, which led me
              to discover the world of programming.
            </p>

            <p class="text-gray-300 leading-relaxed text-lg mb-4">
              I specialize in modern web technologies and love building
              applications that are not only functional but also beautiful and
              user-friendly. When I'm not coding, you can find me exploring new
              technologies, contributing to open-source projects, or sharing
              knowledge with the developer community.
            </p>

            <p class="text-gray-300 leading-relaxed text-lg">
              My goal is to create meaningful digital experiences that solve
              real-world problems and make people's lives easier.
            </p>
          </div>
        </div>

        <!-- Highlight Cards -->
        <div class="grid gap-4">
          {#each highlights as highlight, index}
            <div
              role="button"
              tabindex="0"
              class="card-shine glass-light p-6 rounded-xl group hover:scale-[1.02] transition-all duration-300 animate-slide-up delay-{(index +
                1) *
                100}"
              on:mouseenter={() => (activeCard = index)}
              on:mouseleave={() => (activeCard = -1)}
              on:keydown={() => {}}
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                >
                  <svelte:component
                    this={highlight.icon}
                    size={24}
                    class="text-white"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-bold text-white mb-1">
                    {highlight.title}
                  </h4>
                  <p class="text-gray-400 text-sm">{highlight.description}</p>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Skills Preview Tags -->
        <div class="flex flex-wrap gap-3 pt-4">
          {#each ["JavaScript", "TypeScript", "React", "Svelte", "Node.js", "Python", "AWS", "Docker"] as skill, index}
            <span
              class="group relative glass-light px-5 py-2.5 rounded-full text-sm font-semibold text-purple-300 hover:text-white hover:scale-110 transition-all duration-300 cursor-default animate-bounce-in delay-{index *
                50} overflow-hidden"
            >
              <span class="relative z-10">{skill}</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
            </span>
          {/each}
        </div>
      </div>

      <!-- Stats Grid with Enhanced Cards -->
      <div class="space-y-8 animate-scale-in delay-300">
        <!-- Profile Visual -->
        <div class="relative group">
          <div
            class="w-full max-w-md mx-auto aspect-square relative perspective-container"
          >
            <!-- Animated Background Rings -->
            <div
              class="absolute inset-0 animate-glow-pulse"
              style="animation-duration: 4s;"
            >
              <div
                class="absolute inset-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-40"
              ></div>
            </div>
            <div
              class="absolute inset-0 animate-glow-pulse"
              style="animation-duration: 3s; animation-delay: 1s;"
            >
              <div
                class="absolute inset-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-2xl opacity-30"
              ></div>
            </div>

            <!-- Main Circle -->
            <div
              class="absolute inset-0 rounded-full glass-strong border-2 border-white/10 group-hover:border-purple-500/50 transition-all duration-500 group-hover:scale-105"
            >
              <div
                class="absolute inset-8 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center"
              >
                <User
                  size={120}
                  class="text-purple-400/80 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            <!-- Floating Badges -->
            <div
              class="absolute -top-4 -right-4 glass px-4 py-2 rounded-full animate-float"
            >
              <span class="text-sm font-bold gradient-text">Available</span>
            </div>
            <div
              class="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-full animate-float"
              style="animation-delay: 2s;"
            >
              <span class="text-sm font-bold gradient-text">Remote</span>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 gap-4">
          {#each stats as stat, index}
            <div
              class="card-3d card-glow glass p-6 rounded-2xl group cursor-default animate-bounce-in delay-{(index +
                4) *
                100}"
            >
              <div class="relative z-10">
                <div
                  class="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br {stat.color}"
                >
                  <svelte:component
                    this={stat.icon}
                    size={28}
                    class="text-white group-hover:scale-110 transition-transform"
                  />
                </div>
                <div
                  class="text-3xl font-black text-white mb-2 group-hover:scale-110 transition-transform gradient-text"
                >
                  {stat.value}
                </div>
                <div class="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Call to Action Card -->
        <div
          class="card-shine glass-light p-8 rounded-2xl text-center group hover:scale-[1.02] transition-transform duration-300"
        >
          <p class="text-gray-300 mb-6 text-lg">
            Let's build something amazing together!
          </p>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient hover:scale-105 transition-all duration-300 btn-glow"
          >
            <Mail size={20} />
            Get In Touch
          </a>
        </div>
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
