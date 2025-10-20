<script lang="ts">
  import { onMount } from "svelte";
  import {
    Menu,
    X,
    Home,
    User,
    Code,
    Briefcase,
    BookOpen,
    MapPin,
    Github,
    Mail,
  } from "lucide-svelte";
  import { lenisStore, scrollToElement } from "../lib/lenis";

  let isMenuOpen = false;
  let isScrolled = false;
  let lenis: any = null;
  let activeSection = "home";

  type NavItem = {
    name: string;
    href: string;
    icon: any;
  };

  const navItems: NavItem[] = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "/projects", icon: Briefcase },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Remote Ready", href: "#remote-ready", icon: MapPin },
    { name: "GitHub", href: "#github-activity", icon: Github },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "skills",
        "remote-ready",
        "github-activity",
        "experience",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            activeSection = section;
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Subscribe to Lenis store
    const unsubscribe = lenisStore.subscribe((value) => {
      lenis = value;
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  });

  const scrollToSection = (href: string) => {
    isMenuOpen = false;

    // External links or pages
    if (
      href.startsWith("http") ||
      (href.startsWith("/") && !href.startsWith("/#"))
    ) {
      window.location.href = href;
      return;
    }

    // Hash links
    if (href.startsWith("#")) {
      const targetId = href.slice(1);

      // Check if we're on the homepage
      if (window.location.pathname === "/" || window.location.pathname === "") {
        const element = document.querySelector(href) as HTMLElement;
        if (element && lenis) {
          lenis.scrollTo(element, {
            offset: -80,
            duration: 1.5,
          });
        }
      } else {
        // Navigate to homepage with hash
        window.location.href = `/${href}`;
      }
      return;
    }

    // Navigate to page
    window.location.href = href;
  };

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return activeSection === href.slice(1);
    }
    return false;
  };
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  class:glass-strong={isScrolled}
  class:shadow-2xl={isScrolled}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-20">
      <!-- Logo with Gradient -->
      <div class="flex-shrink-0 z-50">
        <a
          href="/"
          class="group flex items-center gap-3 transition-transform hover:scale-105 duration-300"
        >
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity"
            ></div>
            <div
              class="relative w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
            >
              <span class="text-white font-black text-xl">P</span>
            </div>
          </div>
          <span class="text-2xl font-black gradient-text hidden sm:block">
            Portfolio
          </span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:block">
        <div class="flex items-center space-x-1">
          {#each navItems as item}
            <button
              on:click={() => scrollToSection(item.href)}
              class="group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
              class:text-white={isActive(item.href)}
              class:text-gray-400={!isActive(item.href)}
            >
              <!-- Active Indicator -->
              {#if isActive(item.href)}
                <div class="absolute inset-0 glass-light rounded-lg"></div>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg"
                ></div>
              {/if}

              <span
                class="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white"
              >
                <svelte:component
                  this={item.icon}
                  size={16}
                  class="transition-transform duration-300 group-hover:scale-110"
                />
                {item.name}
              </span>

              <!-- Hover Effect -->
              <div
                class="absolute inset-0 glass-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"
              ></div>
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"
              ></div>
            </button>
          {/each}
        </div>
      </div>

      <!-- Mobile Menu Button with Animation -->
      <div class="lg:hidden z-50">
        <button
          on:click={() => (isMenuOpen = !isMenuOpen)}
          class="relative w-12 h-12 rounded-xl glass-light flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        >
          <div
            class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur transition-opacity"
          ></div>
          <div class="relative z-10">
            {#if isMenuOpen}
              <X size={24} class="text-white" />
            {:else}
              <Menu
                size={24}
                class="text-gray-300 group-hover:text-white transition-colors"
              />
            {/if}
          </div>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Navigation Menu -->
  {#if isMenuOpen}
    <div
      class="lg:hidden absolute top-full left-0 right-0 glass-strong border-t border-white/10 shadow-2xl animate-slide-up"
      style="max-height: calc(100vh - 80px); overflow-y: auto;"
    >
      <div class="px-4 py-6 space-y-2">
        {#each navItems as item, index}
          <button
            on:click={() => scrollToSection(item.href)}
            class="group relative w-full px-6 py-4 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] animate-fade-slide-right"
            class:text-white={isActive(item.href)}
            class:text-gray-400={!isActive(item.href)}
            style="animation-delay: {index * 50}ms;"
          >
            <!-- Active State -->
            {#if isActive(item.href)}
              <div class="absolute inset-0 glass-light rounded-xl"></div>
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl"
              ></div>
            {/if}

            <div
              class="relative z-10 flex items-center gap-4 transition-colors"
              class:text-white={!isActive(item.href)}
            >
              <div
                class="relative w-10 h-10 rounded-lg glass-light flex items-center justify-center group-hover:scale-110 transition-all overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
                <svelte:component
                  this={item.icon}
                  size={20}
                  class={isActive(item.href)
                    ? "text-purple-400 relative z-10"
                    : "text-gray-400 group-hover:text-white transition-colors relative z-10"}
                />
              </div>
              <span class="text-lg font-semibold">{item.name}</span>
            </div>

            <!-- Hover Shine Effect -->
            <div
              class="absolute inset-0 glass-light rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </button>
        {/each}
      </div>

      <!-- Mobile Menu Footer -->
      <div class="px-4 py-6 border-t border-white/10">
        <p class="text-center text-sm text-gray-400">
          Built with <span class="text-pink-400">♥</span> using Astro & Svelte
        </p>
      </div>
    </div>
  {/if}
</nav>

<style>
  /* Ensure smooth transitions */
  nav {
    will-change: transform, background;
  }
</style>
