<script lang="ts">
  import { onMount } from "svelte";
  import {
    Globe,
    Clock,
    Video,
    MessageCircle,
    Calendar,
    Wifi,
    Shield,
    Award,
    Zap,
    Headphones,
  } from "lucide-svelte";

  let remoteRef: HTMLElement;
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

    if (remoteRef) {
      observer.observe(remoteRef);
    }

    return () => observer.disconnect();
  });

  const timezones = [
    { zone: "PST (UTC-8)", time: "9:00 AM - 5:00 PM", flag: "🇺🇸" },
    { zone: "EST (UTC-5)", time: "12:00 PM - 8:00 PM", flag: "🇺🇸" },
    { zone: "GMT (UTC+0)", time: "5:00 PM - 1:00 AM", flag: "🇬🇧" },
    { zone: "CET (UTC+1)", time: "6:00 PM - 2:00 AM", flag: "🇪🇺" },
  ];

  const remoteSkills = [
    {
      icon: Video,
      title: "Video Communication",
      description: "Expert in Zoom, Teams, Google Meet with professional setup",
      level: 95,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageCircle,
      title: "Async Communication",
      description: "Slack, Discord, Notion, Linear for seamless collaboration",
      level: 90,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calendar,
      title: "Time Management",
      description: "Calendar blocking, Pomodoro technique, deadline management",
      level: 92,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Wifi,
      title: "Technical Setup",
      description: "Reliable internet, backup systems, professional workspace",
      level: 98,
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      icon: Shield,
      title: "Security Awareness",
      description: "VPN, 2FA, secure file sharing, data protection protocols",
      level: 88,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Award,
      title: "Self-Motivation",
      description: "Independent work, proactive communication, goal-oriented",
      level: 95,
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  const tools = [
    "Slack",
    "Discord",
    "Microsoft Teams",
    "Zoom",
    "Google Meet",
    "Notion",
    "Linear",
    "Jira",
    "Trello",
    "Asana",
    "GitHub",
    "GitLab",
    "Figma",
    "Miro",
    "1Password",
    "NordVPN",
  ];
</script>

<section
  id="remote-ready"
  bind:this={remoteRef}
  class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  <!-- Background -->
  <div class="absolute inset-0 gradient-mesh-1 opacity-10"></div>
  <div
    class="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"
    style="animation-delay: 3s;"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20 animate-scale-in">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-6"
      >
        <Globe size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >Remote Work</span
        >
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
        <span class="gradient-text"> Remote Work Ready </span>
      </h2>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Proven experience working remotely with global teams across different
        time zones
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8 mb-16">
      <!-- Timezone Availability -->
      <div
        class="card-glow glass-strong p-8 rounded-3xl animate-fade-slide-right"
      >
        <div class="flex items-center gap-4 mb-6">
          <div
            class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
          >
            <Clock size={32} class="text-white" />
          </div>
          <div>
            <h3 class="text-2xl font-black text-white">Timezone Flexibility</h3>
            <p class="text-gray-400 text-sm">Available across multiple zones</p>
          </div>
        </div>
        <p class="text-gray-300 mb-6 leading-relaxed">
          I'm comfortable working across multiple time zones and can adjust my
          schedule to accommodate team meetings and collaboration needs.
        </p>
        <div class="space-y-3">
          {#each timezones as tz, index}
            <div
              class="card-shine glass-light p-4 rounded-xl flex items-center justify-between group hover:scale-[1.02] transition-all animate-slide-up delay-{index *
                100}"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">{tz.flag}</span>
                <span class="text-gray-300 font-semibold">{tz.zone}</span>
              </div>
              <div class="flex items-center gap-2">
                <Clock size={16} class="text-purple-400" />
                <span class="text-purple-400 text-sm font-medium"
                  >{tz.time}</span
                >
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Remote Skills Overview -->
      <div
        class="card-glow glass-strong p-8 rounded-3xl animate-scale-in delay-200"
      >
        <div class="flex items-center gap-4 mb-6">
          <div
            class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
          >
            <Zap size={32} class="text-white" />
          </div>
          <div>
            <h3 class="text-2xl font-black text-white">Remote Expertise</h3>
            <p class="text-gray-400 text-sm">Professional remote work skills</p>
          </div>
        </div>
        <div class="space-y-4">
          {#each remoteSkills.slice(0, 3) as skill, index}
            <div class="animate-slide-up delay-{(index + 2) * 100}">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-lg bg-gradient-to-br {skill.gradient} flex items-center justify-center"
                  >
                    <svelte:component
                      this={skill.icon}
                      size={20}
                      class="text-white"
                    />
                  </div>
                  <span class="text-gray-300 font-semibold">{skill.title}</span>
                </div>
                <span class="text-purple-400 font-bold">{skill.level}%</span>
              </div>
              <div
                class="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-gradient-to-r {skill.gradient} rounded-full transition-all duration-1000 ease-out"
                  style="width: {isVisible
                    ? skill.level
                    : 0}%; transition-delay: {(index + 2) * 100}ms;"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Remote Skills Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {#each remoteSkills as skill, index}
        <div
          class="card-3d card-glow glass p-6 rounded-2xl group hover:scale-[1.02] transition-all duration-300 animate-bounce-in delay-{index *
            100}"
        >
          <div
            class="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br {skill.gradient}"
          >
            <svelte:component
              this={skill.icon}
              size={28}
              class="text-white group-hover:scale-110 transition-transform"
            />
          </div>
          <h4
            class="text-xl font-black text-white mb-2 group-hover:gradient-text transition-all"
          >
            {skill.title}
          </h4>
          <p class="text-gray-400 text-sm mb-4 leading-relaxed">
            {skill.description}
          </p>

          <!-- Circular Progress -->
          <div class="flex items-center justify-between">
            <div class="relative w-16 h-16">
              <svg class="transform -rotate-90 w-16 h-16" viewBox="0 0 64 64">
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
                  stroke="url(#gradient-remote-{index})"
                  stroke-width="6"
                  stroke-linecap="round"
                  stroke-dasharray="175.93"
                  stroke-dashoffset={175.93 -
                    (175.93 * (isVisible ? skill.level : 0)) / 100}
                  class="transition-all duration-1000 ease-out"
                  style="transition-delay: {index * 100}ms;"
                />
                <defs>
                  <linearGradient
                    id="gradient-remote-{index}"
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
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-sm font-black gradient-text"
                  >{skill.level}%</span
                >
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-black gradient-text">
                {skill.level}%
              </div>
              <div class="text-xs text-gray-400">Proficiency</div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Tools & Technologies -->
    <div
      class="card-glow glass-strong p-8 rounded-3xl animate-slide-up delay-400"
    >
      <div class="flex items-center gap-4 mb-8">
        <div
          class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
        >
          <Headphones size={32} class="text-white" />
        </div>
        <div>
          <h3 class="text-3xl font-black text-white">Remote Work Tools</h3>
          <p class="text-gray-400">
            Proficient in modern collaboration platforms
          </p>
        </div>
      </div>
      <div class="flex flex-wrap gap-3">
        {#each tools as tool, index}
          <span
            class="group relative glass-light px-5 py-2.5 rounded-full text-sm font-semibold text-gray-300 hover:text-white hover:scale-110 transition-all duration-300 cursor-default animate-bounce-in delay-{(index +
              6) *
              30} overflow-hidden"
          >
            <span class="relative z-10">{tool}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </span>
        {/each}
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="mt-16 text-center animate-slide-up delay-600">
      <div class="glass-light p-8 rounded-3xl inline-block max-w-2xl">
        <Globe size={48} class="text-purple-400 mx-auto mb-4" />
        <h3 class="text-2xl font-black text-white mb-3">
          Ready to Work Remotely
        </h3>
        <p class="text-gray-400 mb-6">
          With years of remote work experience, I'm equipped to collaborate
          effectively with teams across the globe, delivering exceptional
          results regardless of location.
        </p>
        <a
          href="#contact"
          class="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient hover:scale-105 transition-all duration-300 btn-glow"
        >
          Let's Work Together
        </a>
      </div>
    </div>
  </div>
</section>
