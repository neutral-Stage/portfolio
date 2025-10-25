<script lang="ts">
  import { onMount } from "svelte";
  import {
    Github,
    Star,
    GitFork,
    GitCommit,
    Calendar,
    TrendingUp,
    Code,
    Users,
    Flame,
    Activity,
  } from "lucide-svelte";
  import WordsPullUp from "./WordsPullUp.svelte";

  export let data: any = {};

  let githubRef: HTMLElement;
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

    if (githubRef) {
      observer.observe(githubRef);
    }

    return () => observer.disconnect();
  });

  // Helper function to get gradient based on index
  const getGradient = (index: number) => {
    const gradients = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-yellow-500",
    ];
    return gradients[index % gradients.length];
  };

  // Process recent repos with gradients
  $: processedRepos = (data.recentRepos || []).map((repo, index) => ({
    ...repo,
    gradient: getGradient(index),
  }));

  // Quick stats from data
  $: quickStats = [
    {
      icon: Users,
      label: "Followers",
      value: data.followers || 0,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      label: "Repositories",
      value: data.repositories || 0,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Star,
      label: "Total Stars",
      value: data.stars || 0,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: GitCommit,
      label: "Contributions",
      value: data.contributions || 0,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Flame,
      label: "Day Streak",
      value: data.streak || 0,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  // Get GitHub profile URL
  $: githubProfileUrl = data.profileUrl || "https://github.com/yourusername";
</script>

<section
  id="github-activity"
  bind:this={githubRef}
  class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  <!-- Background -->
  <div
    class="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent"
  ></div>
  <div
    class="absolute top-1/3 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"
    style="animation-delay: 1.5s;"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20 animate-scale-in">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-6"
      >
        <Activity size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >Open Source</span
        >
      </div>
      <WordsPullUp
        text="GitHub Activity"
        className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
        staggerDelay={0.1}
        animationDuration={0.6}
      />
      <WordsPullUp
        text="Contributing to open source and building in public"
        className="text-xl text-gray-400 max-w-3xl mx-auto"
        staggerDelay={0.05}
        animationDuration={0.8}
      />
    </div>

    <!-- Quick Stats Grid -->
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-16"
    >
      {#each quickStats as stat, index}
        <div
          class="card-3d card-glow glass p-6 rounded-2xl text-center group cursor-default animate-bounce-in delay-{index *
            100}"
        >
          <div
            class="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br {stat.gradient}"
          >
            <svelte:component
              this={stat.icon}
              size={24}
              class="text-white group-hover:scale-110 transition-transform"
            />
          </div>
          <div
            class="text-3xl font-black text-white mb-2 group-hover:scale-110 transition-transform gradient-text"
          >
            {stat.value}
          </div>
          <div class="text-sm text-gray-400 font-medium">{stat.label}</div>
        </div>
      {/each}
    </div>

    <!-- Recent Repositories -->
    <div class="mb-16">
      <div class="flex items-center justify-between mb-8">
        <h3 class="text-3xl font-black text-white flex items-center gap-3">
          <TrendingUp size={28} class="text-purple-400" />
          Recent Repositories
        </h3>
        <a
          href={githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="relative inline-flex items-center gap-2 px-6 py-3 glass-light rounded-xl hover:scale-105 transition-all duration-300 group overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
          <Github
            size={20}
            class="relative z-10 text-gray-300 group-hover:text-white transition-colors"
          />
          <span
            class="relative z-10 text-gray-300 group-hover:text-white font-semibold transition-colors"
            >View All</span
          >
        </a>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        {#each processedRepos as repo, index}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            class="card-3d card-glow glass p-6 rounded-2xl group hover:scale-[1.02] transition-all duration-300 animate-slide-up delay-{index *
              100}"
          >
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h4
                  class="text-xl font-black text-white mb-2 group-hover:gradient-text transition-all flex items-center gap-2"
                >
                  <Code size={20} class="text-purple-400" />
                  {repo.name}
                </h4>
                <p class="text-gray-400 text-sm leading-relaxed">
                  {repo.description}
                </p>
              </div>
            </div>

            <!-- Language & Stats -->
            <div class="flex flex-wrap items-center gap-4 text-sm">
              {#if repo.language}
                <div
                  class="inline-flex items-center gap-2 px-3 py-1.5 glass-light rounded-lg"
                >
                  <div
                    class="w-3 h-3 rounded-full bg-gradient-to-r {repo.gradient}"
                  ></div>
                  <span class="text-gray-300 font-medium">{repo.language}</span>
                </div>
              {/if}
              <div class="flex items-center gap-2 text-gray-400">
                <Star size={16} class="text-yellow-400" />
                <span>{repo.stars || 0}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-400">
                <GitFork size={16} class="text-blue-400" />
                <span>{repo.forks || 0}</span>
              </div>
              {#if repo.updated}
                <div class="flex items-center gap-2 text-gray-400 ml-auto">
                  <Calendar size={16} />
                  <span>{repo.updated}</span>
                </div>
              {/if}
            </div>

            <!-- Bottom Gradient Line -->
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r {repo.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl"
            ></div>
          </a>
        {/each}
      </div>
    </div>

    <!-- Languages & CTA -->
    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Top Languages -->
      <div
        class="card-glow glass-strong p-8 rounded-3xl animate-slide-up delay-400"
      >
        <h3 class="text-2xl font-black text-white mb-6 flex items-center gap-3">
          <Code size={24} class="text-purple-400" />
          Top Languages
        </h3>
        <div class="flex flex-wrap gap-3">
          {#each (data.languages || []) as language, index}
            <span
              class="group relative glass-light px-5 py-2.5 rounded-full text-sm font-semibold text-purple-300 hover:text-white hover:scale-110 transition-all duration-300 cursor-default animate-bounce-in delay-{(index +
                4) *
                50} overflow-hidden"
            >
              <span class="relative z-10">{language}</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
            </span>
          {/each}
        </div>
      </div>

      <!-- Contribution Streak -->
      <div
        class="relative card-glow glass-strong p-8 rounded-3xl text-center animate-slide-up delay-500 overflow-hidden"
      >
        <!-- Glowing Background -->
        <div
          class="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"
        ></div>

        <!-- Icon Container -->
        <div class="relative inline-block mb-4">
          <div
            class="absolute inset-0 bg-orange-500/20 rounded-2xl blur-xl"
          ></div>
          <Flame
            size={56}
            class="relative text-orange-500 animate-glow-pulse"
          />
        </div>

        <div class="relative text-5xl font-black gradient-text mb-2">
          {data.streak || 0}
        </div>
        <p class="relative text-gray-200 text-lg font-semibold mb-2">
          Day Contribution Streak
        </p>
        <p class="relative text-gray-400 text-sm">
          Committed to continuous learning and growth
        </p>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="mt-16 text-center animate-slide-up delay-600">
      <div class="glass-light p-8 rounded-3xl inline-block">
        <Github size={48} class="text-purple-400 mx-auto mb-4" />
        <h3 class="text-2xl font-black text-white mb-3">Let's Collaborate!</h3>
        <WordsPullUp
          text="Always interested in exciting open source projects and collaboration opportunities"
          className="text-gray-400 mb-6 max-w-md"
          staggerDelay={0.03}
          animationDuration={0.6}
        />
        <a
          href={githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient hover:scale-105 transition-all duration-300 btn-glow"
        >
          <Github size={24} />
          Follow on GitHub
        </a>
      </div>
    </div>
  </div>
</section>
