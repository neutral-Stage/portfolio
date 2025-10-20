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
      label: "Projects Delivered",
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
      icon: Code,
      label: "Technologies",
      value: "20+",
      color: "from-orange-500 to-yellow-500",
    },
    {
      icon: Users,
      label: "Satisfied Clients",
      value: "25+",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const highlights = [
    {
      icon: CheckCircle,
      title: "Results-Driven",
      description:
        "Delivering measurable business outcomes and ROI through technology solutions",
    },
    {
      icon: Briefcase,
      title: "Client-Focused",
      description:
        "Building long-term partnerships through exceptional service and communication",
    },
    {
      icon: Star,
      title: "Best Practices",
      description:
        "Adherence to industry standards, clean code, and scalable architecture",
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
        <span class="gradient-text"> Professional Background </span>
      </h2>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Delivering enterprise-grade solutions with expertise in modern web
        technologies
      </p>
    </div>

    <!-- Main Content Grid -->
    <div class="grid lg:grid-cols-[1fr_400px] gap-8 mb-16 items-start">
      <!-- Left Column: Description -->
      <div class="space-y-6 animate-fade-slide-right">
        <!-- Main Description Card -->
        <div
          class="card-glow glass p-8 rounded-2xl hover:scale-[1.01] transition-transform duration-300"
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
              class="card-shine glass-light p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 animate-slide-up delay-{index *
                100}"
              on:mouseenter={() => (activeCard = index)}
              on:mouseleave={() => (activeCard = -1)}
              on:keydown={() => {}}
            >
              <div
                class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4"
              >
                <svelte:component
                  this={highlight.icon}
                  size={24}
                  class="text-white"
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
      <div class="space-y-6 animate-scale-in delay-300">
        <!-- Professional Profile Image -->
        <div class="relative group">
          <div class="w-full aspect-square relative">
            <!-- Gradient Background -->
            <div
              class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-2xl"
            ></div>

            <!-- Main Profile Container -->
            <div
              class="relative rounded-2xl glass-strong border border-white/10 overflow-hidden group-hover:border-purple-500/50 transition-all duration-500"
            >
              <div
                class="aspect-square flex items-center justify-center bg-gradient-to-br from-purple-600/10 to-pink-600/10"
              >
                <User
                  size={140}
                  class="text-purple-400/60 group-hover:text-purple-400 transition-colors duration-500"
                />
              </div>

              <!-- Status Badge Overlay -->
              <div
                class="absolute top-4 right-4 glass px-3 py-1.5 rounded-full border border-green-500/30"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                  ></div>
                  <span class="text-xs font-bold text-white">Available</span>
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
                Open to Opportunities
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  class="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30"
                >
                  Freelance
                </span>
                <span
                  class="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                >
                  Contract
                </span>
                <span
                  class="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30"
                >
                  Full-Time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid - Full Width Below -->
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up delay-500"
    >
      {#each stats as stat, index}
        <div
          class="card-3d card-glow glass p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 animate-bounce-in delay-{index *
            100}"
        >
          <div
            class="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br {stat.color}"
          >
            <svelte:component this={stat.icon} size={28} class="text-white" />
          </div>
          <div class="text-3xl font-black text-white mb-2 gradient-text">
            {stat.value}
          </div>
          <div class="text-sm text-gray-400 font-medium">{stat.label}</div>
        </div>
      {/each}
    </div>

    <!-- Bottom CTA -->
    <div class="text-center animate-slide-up delay-600">
      <div
        class="card-shine glass-strong p-8 rounded-2xl inline-block max-w-2xl border border-purple-500/20"
      >
        <h3 class="text-2xl font-black text-white mb-3">
          Ready to Collaborate?
        </h3>
        <p class="text-gray-400 mb-6">
          Let's discuss how I can contribute to your next project
        </p>
        <a
          href="#contact"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient hover:scale-105 transition-all duration-300 btn-glow"
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
