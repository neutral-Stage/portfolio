<script lang="ts">
  import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    Heart,
    ArrowUp,
  } from "lucide-svelte";
  import { lenisStore } from "../lib/lenis";

  let lenis: any = null;

  // Subscribe to Lenis store
  lenisStore.subscribe((value) => {
    lenis = value;
  });

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Projects", href: "/projects" },
      { name: "Experience", href: "#experience" },
      { name: "Contact", href: "#contact" },
    ],
    social: [
      {
        name: "GitHub",
        href: "https://github.com/yourusername",
        icon: Github,
        gradient: "from-purple-600 to-pink-600",
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/in/yourprofile",
        icon: Linkedin,
        gradient: "from-blue-600 to-cyan-600",
      },
      {
        name: "Twitter",
        href: "https://twitter.com/yourusername",
        icon: Twitter,
        gradient: "from-sky-500 to-blue-600",
      },
      {
        name: "Email",
        href: "mailto:your.email@example.com",
        icon: Mail,
        gradient: "from-pink-600 to-orange-600",
      },
    ],
  };
</script>

<footer
  class="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5"
>
  <!-- Background Effects -->
  <div
    class="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900"
  ></div>
  <div
    class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"
  ></div>
  <div
    class="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-float"
    style="animation-delay: 2s;"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      <!-- Brand Section -->
      <div class="lg:col-span-2">
        <a href="/" class="group inline-flex items-center gap-3 mb-6">
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity"
            ></div>
            <div
              class="relative w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
            >
              <span class="text-white font-black text-2xl">P</span>
            </div>
          </div>
          <span class="text-2xl font-black gradient-text">Portfolio</span>
        </a>
        <p class="text-gray-400 leading-relaxed mb-6 max-w-md">
          Building exceptional digital experiences with modern technologies.
          Passionate about creating innovative solutions that make a difference.
        </p>

        <!-- Social Links -->
        <div class="flex gap-3">
          {#each footerLinks.social as social}
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              class="group relative w-12 h-12 rounded-xl glass-light flex items-center justify-center hover:scale-110 transition-all duration-300 overflow-hidden"
              aria-label={social.name}
            >
              <div
                class="absolute inset-0 rounded-xl bg-gradient-to-r {social.gradient} opacity-0 group-hover:opacity-30 transition-opacity"
              ></div>
              <svelte:component
                this={social.icon}
                size={20}
                class="relative z-10 text-gray-400 group-hover:text-white transition-colors"
              />
            </a>
          {/each}
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-bold text-white mb-6">Quick Links</h3>
        <ul class="space-y-3">
          {#each footerLinks.navigation as link}
            <li>
              <a
                href={link.href}
                class="group inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span
                  class="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"
                ></span>
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Additional Info -->
      <div>
        <h3 class="text-lg font-bold text-white mb-6">Get in Touch</h3>
        <ul class="space-y-4 text-gray-400 text-sm">
          <li>
            <a
              href="mailto:your.email@example.com"
              class="hover:text-white transition-colors duration-300"
            >
              your.email@example.com
            </a>
          </li>
          <li>
            <a
              href="tel:+15551234567"
              class="hover:text-white transition-colors duration-300"
            >
              +1 (555) 123-4567
            </a>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="inline-block w-2 h-2 rounded-full bg-green-400 mt-1.5 animate-pulse"
            ></span>
            <span>Available for freelance opportunities</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="pt-8 border-t border-white/5">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-400 text-sm text-center md:text-left">
          © {currentYear}
          <span class="gradient-text font-semibold">Your Name</span>. All rights
          reserved. Built with <Heart
            size={14}
            class="inline text-pink-500 animate-pulse"
          /> using
          <span class="text-purple-400 font-semibold">Astro</span> &
          <span class="text-orange-400 font-semibold">Svelte</span>
        </p>

        <!-- Scroll to Top -->
        <button
          on:click={scrollToTop}
          class="group relative px-6 py-3 rounded-full glass-light hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <div
            class="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity"
          ></div>
          <span
            class="relative z-10 text-sm font-medium text-gray-300 group-hover:text-white transition-colors"
          >
            Back to Top
          </span>
          <ArrowUp
            size={16}
            class="relative z-10 text-gray-400 group-hover:text-white group-hover:-translate-y-1 transition-all"
          />
        </button>
      </div>
    </div>

    <!-- Additional Bottom Links -->
    <div class="mt-6 text-center">
      <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
        <a
          href="/privacy"
          class="hover:text-purple-400 transition-colors duration-300"
          >Privacy Policy</a
        >
        <span class="text-gray-700">•</span>
        <a
          href="/terms"
          class="hover:text-purple-400 transition-colors duration-300"
          >Terms of Service</a
        >
        <span class="text-gray-700">•</span>
        <a
          href="/sitemap.xml"
          class="hover:text-purple-400 transition-colors duration-300"
          >Sitemap</a
        >
      </div>
    </div>
  </div>
</footer>
