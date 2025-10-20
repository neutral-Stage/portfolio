<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    ChevronDown,
    Github,
    Linkedin,
    Mail,
    Download,
    Sparkles,
    Code2,
    Rocket,
  } from "lucide-svelte";

  export let data: any = {};

  let heroRef: HTMLElement;
  let isVisible = false;
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  onMount(() => {
    isVisible = true; // Hero is always visible on load

    // Smooth cursor follow (only on desktop)
    if (window.innerWidth >= 1024) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // Animate cursor position with RAF
      let rafId: number;
      const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.08;
        cursorY += (mouseY - cursorY) * 0.08;
        rafId = requestAnimationFrame(animateCursor);
      };
      rafId = requestAnimationFrame(animateCursor);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }
  });

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fallback data if Sanity data is not available
  const heroContent = data?.heroContent || {
    headline: "Building the Future, One Line of Code at a Time",
    subheadline: "Full-Stack Developer specializing in modern web technologies",
    ctaText: "Get In Touch",
    ctaLink: "#contact",
  };

  const socialLinks = data?.socialLinks || {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    email: "mailto:your.email@example.com",
  };
</script>

<section
  id="home"
  bind:this={heroRef}
  class="relative min-h-screen flex items-center justify-center overflow-hidden"
>
  <!-- Dynamic Gradient Mesh Background -->
  <div
    class="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
  ></div>

  <!-- Animated Gradient Orbs -->
  <div class="absolute inset-0 overflow-hidden">
    <div
      class="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl animate-float"
      style="background: radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%); top: -10%; left: -10%;"
    ></div>
    <div
      class="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl animate-float"
      style="background: radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%); bottom: -10%; right: -10%; animation-delay: 2s;"
    ></div>
    <div
      class="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-3xl animate-float"
      style="background: radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: 4s;"
    ></div>
  </div>

  <!-- Grid Pattern Overlay -->
  <div
    class="absolute inset-0 opacity-10"
    style="background-image: linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px); background-size: 50px 50px;"
  ></div>

  <!-- Spotlight Effect -->
  <div
    class="absolute pointer-events-none transition-opacity duration-300"
    style="
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%);
      left: {cursorX - 300}px;
      top: {cursorY - 300}px;
      opacity: {isVisible ? 1 : 0};
    "
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
    <div class="text-center">
      <!-- Floating Badge -->
      <div class="flex justify-center mb-10 animate-bounce-in">
        <div
          class="glass px-6 py-2.5 rounded-full inline-flex items-center gap-2.5 group hover:scale-105 transition-transform duration-300"
        >
          <div
            class="w-2.5 h-2.5 rounded-full bg-green-400 animate-glow-pulse"
          ></div>
          <span class="text-sm font-semibold text-gray-200"
            >Available for opportunities</span
          >
          <Sparkles size={14} class="text-purple-400" />
        </div>
      </div>

      <!-- Main Heading with Gradient Text -->
      <h1
        class="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight animate-scale-in"
      >
        <span
          class="block mb-3 text-white text-4xl sm:text-5xl lg:text-6xl font-medium"
          >Hi, I'm</span
        >
        <span class="gradient-text">
          {data?.name || "Your Name"}
        </span>
      </h1>

      <!-- Animated Subtitle -->
      <div class="mb-8 animate-slide-up delay-200">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200">
          {data?.title || "Full-Stack Developer"}
        </h2>
      </div>

      <!-- Description with Glass Effect -->
      <div class="flex justify-center animate-slide-up delay-300">
        <p
          class="text-lg sm:text-xl text-gray-400 mb-14 max-w-2xl leading-relaxed"
        >
          {data?.bio?.[0]?.children?.[0]?.text ||
            "Passionate developer creating amazing digital experiences."}
        </p>
      </div>

      <!-- Feature Tags -->
      <div
        class="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up delay-400"
      >
        <div
          class="glass-light px-5 py-2.5 rounded-full inline-flex items-center gap-2 hover:scale-105 transition-transform duration-300"
        >
          <Code2 size={18} class="text-purple-400" />
          <span class="text-sm font-medium text-gray-300">Clean Code</span>
        </div>
        <div
          class="glass-light px-5 py-2.5 rounded-full inline-flex items-center gap-2 hover:scale-105 transition-transform duration-300"
        >
          <Sparkles size={18} class="text-pink-400" />
          <span class="text-sm font-medium text-gray-300">Modern UI/UX</span>
        </div>
        <div
          class="glass-light px-5 py-2.5 rounded-full inline-flex items-center gap-2 hover:scale-105 transition-transform duration-300"
        >
          <Rocket size={18} class="text-blue-400" />
          <span class="text-sm font-medium text-gray-300">Fast Performance</span
          >
        </div>
      </div>

      <!-- CTA Buttons with Premium Effects -->
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up delay-500"
      >
        <button
          on:click={scrollToAbout}
          class="group relative px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden hover:scale-105 transition-all duration-300"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient"
          ></div>
          <span class="relative z-10 flex items-center gap-2">
            View My Work
            <ChevronDown
              size={18}
              class="group-hover:translate-y-1 transition-transform"
            />
          </span>
        </button>

        <a
          href={data?.resume?.url || "/resume.pdf"}
          download
          class="group relative px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden hover:scale-105 transition-all duration-300"
        >
          <div class="absolute inset-0 glass-strong"></div>
          <div
            class="absolute inset-0 border-2 border-white/20 rounded-xl"
          ></div>
          <span class="relative z-10 flex items-center gap-2">
            <Download
              size={18}
              class="group-hover:translate-y-1 transition-transform"
            />
            Download Resume
          </span>
        </a>
      </div>

      <!-- Social Links with Hover Effects -->
      <div class="flex justify-center gap-4 animate-slide-up delay-600">
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative w-12 h-12 rounded-xl glass-light flex items-center justify-center hover:scale-110 transition-all duration-300 overflow-hidden"
          aria-label="GitHub"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <Github
            size={20}
            class="relative z-10 text-gray-400 group-hover:text-white transition-colors"
          />
        </a>

        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative w-12 h-12 rounded-xl glass-light flex items-center justify-center hover:scale-110 transition-all duration-300 overflow-hidden"
          aria-label="LinkedIn"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <Linkedin
            size={20}
            class="relative z-10 text-gray-400 group-hover:text-white transition-colors"
          />
        </a>

        <a
          href={socialLinks.email}
          class="group relative w-12 h-12 rounded-xl glass-light flex items-center justify-center hover:scale-110 transition-all duration-300 overflow-hidden"
          aria-label="Email"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-pink-600/30 to-orange-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <Mail
            size={20}
            class="relative z-10 text-gray-400 group-hover:text-white transition-colors"
          />
        </a>
      </div>
    </div>
  </div>

  <!-- Scroll Indicator with Animation -->
  <div
    class="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-in delay-700"
  >
    <button
      on:click={scrollToAbout}
      class="flex flex-col items-center gap-2 group"
    >
      <span
        class="text-sm text-gray-400 font-medium group-hover:text-white transition-colors"
        >Scroll to explore</span
      >
      <div
        class="w-6 h-10 rounded-full border-2 border-purple-500/50 flex items-start justify-center p-2 group-hover:border-purple-400 transition-colors"
      >
        <div class="w-1 h-2 bg-purple-500 rounded-full animate-bounce"></div>
      </div>
    </button>
  </div>
</section>

<style>
  /* Ensure animations are smooth */
  section {
    will-change: transform;
  }
</style>
