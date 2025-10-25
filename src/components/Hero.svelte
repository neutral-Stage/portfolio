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
  import WordsPullUp from "./WordsPullUp.svelte";

  export let data: any = {};

  let heroRef: HTMLElement;
  let isVisible = false;
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Throttle function for mouse tracking
  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  onMount(() => {
    isVisible = true; // Hero is always visible on load

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth cursor follow (only on desktop and if motion is not reduced)
    if (window.innerWidth >= 1024 && !prefersReducedMotion) {
      const handleMouseMove = throttle((e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }, 16); // ~60fps throttling

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

  // Feature tags from data or fallback
  $: featureTags = data?.featureTags || [
    { icon: "Code2", text: "Clean Code", color: "text-purple-400" },
    { icon: "Sparkles", text: "Modern UI/UX", color: "text-pink-400" },
    { icon: "Rocket", text: "Fast Performance", color: "text-blue-400" }
  ];

</script>

<section
  id="home"
  bind:this={heroRef}
  class="relative min-h-screen flex items-center justify-center overflow-hidden"
>
  <!-- Dynamic Background -->
  <div class="absolute inset-0 bg-slate-950"></div>

  <!-- Animated Glow Orbs -->
  <div class="absolute inset-0 overflow-hidden">
    <div
      class="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-2xl animate-float"
      style="background: radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%); top: -10%; left: -10%;"
    ></div>
    <div
      class="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-2xl animate-float"
      style="background: radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%); bottom: -10%; right: -10%; animation-delay: 2s;"
    ></div>
    <div
      class="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-2xl animate-float"
      style="background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: 4s;"
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

      <!-- Main Heading -->
      <h1
        class="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight scroll-fade-up"
      >
        <span
          class="block mb-3 text-white text-4xl sm:text-5xl lg:text-6xl font-medium"
          >Hi, I'm</span
        >
        <div class="text-purple-400">
          <WordsPullUp
            text={heroContent.headline}
            className="text-purple-400"
            animationDuration={1.0}
            staggerDelay={0.1}
          />
        </div>
      </h1>

      <!-- Animated Subtitle -->
      <div class="mb-8 scroll-fade-up scroll-fade-up-delay-200">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200">
          {data?.title || "Full-Stack Web Developer"}
        </h2>
      </div>

      <!-- Description with Glass Effect -->
      <div class="flex justify-center scroll-fade-up scroll-fade-up-delay-300">
        <WordsPullUp
          text={data?.bio?.[0]?.children?.[0]?.text ||
            "Passionate developer creating amazing digital experiences."}
          className="text-lg sm:text-xl text-gray-400 mb-14 max-w-2xl leading-relaxed"
          staggerDelay={0.05}
          animationDuration={0.8}
        />
      </div>

      <!-- Feature Tags -->
      <div
        class="flex flex-wrap justify-center gap-4 mb-12 scroll-fade-up scroll-fade-up-delay-400"
      >
        {#each featureTags as tag}
          <div
            class="glass-light px-5 py-2.5 rounded-full inline-flex items-center gap-2 hover-scale-glow transition-all duration-300 hover-border-glow"
          >
            {#if tag.icon === "Code2"}
              <Code2 size={18} class={tag.color || "text-purple-400"} />
            {:else if tag.icon === "Sparkles"}
              <Sparkles size={18} class={tag.color || "text-pink-400"} />
            {:else if tag.icon === "Rocket"}
              <Rocket size={18} class={tag.color || "text-blue-400"} />
            {:else}
              <Sparkles size={18} class={tag.color || "text-purple-400"} />
            {/if}
            <span class="text-sm font-medium text-gray-300">{tag.text}</span>
          </div>
        {/each}
      </div>

      <!-- CTA Buttons with Premium Effects -->
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 scroll-fade-up scroll-fade-up-delay-500"
      >
        <button
          on:click={scrollToAbout}
          class="group relative px-8 py-3.5 rounded-full font-semibold text-white overflow-hidden hover-scale-glow transition-all duration-300 btn-border-glow"
        >
          <div class="absolute inset-0 glass-strong"></div>
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
          class="group relative px-8 py-3.5 rounded-full font-semibold text-white overflow-hidden hover-scale-glow transition-all duration-300 btn-border-glow"
        >
          <div class="absolute inset-0 glass-strong"></div>
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
      <div
        class="flex justify-center gap-4 scroll-fade-up scroll-fade-up-delay-600"
      >
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative w-12 h-12 rounded-full glass-light flex items-center justify-center hover-scale-glow transition-all duration-300 overflow-hidden hover-border-glow"
          aria-label="GitHub"
        >
          <Github
            size={20}
            class="relative z-10 text-gray-400 group-hover:text-white transition-colors"
          />
        </a>

        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative w-12 h-12 rounded-full glass-light flex items-center justify-center hover-scale-glow transition-all duration-300 overflow-hidden hover-border-glow"
          aria-label="LinkedIn"
        >
          <Linkedin
            size={20}
            class="relative z-10 text-gray-400 group-hover:text-white transition-colors"
          />
        </a>

        <a
          href={socialLinks.email}
          class="group relative w-12 h-12 rounded-full glass-light flex items-center justify-center hover-scale-glow transition-all duration-300 overflow-hidden hover-border-glow"
          aria-label="Email"
        >
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
    class="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 scroll-fade-up scroll-fade-up-delay-700"
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
