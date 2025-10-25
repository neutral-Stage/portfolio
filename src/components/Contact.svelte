<script lang="ts">
  import { onMount } from "svelte";
  import {
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Twitter,
    Send,
    CheckCircle,
    MessageSquare,
    Sparkles,
  } from "lucide-svelte";
  import WordsPullUp from "./WordsPullUp.svelte";

  export let data: any = {};

  let contactRef: HTMLElement;
  let isVisible = false;
  let formData = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  let isSubmitting = false;
  let isSubmitted = false;

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

    if (contactRef) {
      observer.observe(contactRef);
    }

    return () => observer.disconnect();
  });

  // Contact form settings from data
  $: contactForm = data.contactForm || {
    title: "Send Me a Message",
    description: "Have a project in mind? Let's build something amazing together",
    submitButtonText: "Send Message",
    successMessage: "Thank you for reaching out. I'll get back to you soon!",
    errorMessage: "Something went wrong. Please try again."
  };

  // Contact benefits from data
  $: contactBenefits = data.contactBenefits || [
    "Fast response time (usually within 24 hours)",
    "Clear communication throughout the project",
    "Flexible and adaptable to your needs",
    "Commitment to quality and deadlines"
  ];

  // Contact information from data
  $: contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: data.contact?.email || "your.email@example.com",
      href: `mailto:${data.contact?.email || "your.email@example.com"}`,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: data.contact?.phone || "+1 (555) 123-4567",
      href: `tel:${data.contact?.phone || "+15551234567"}`,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: data.contact?.location || "San Francisco, CA",
      href: "#",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  // Social links from data
  $: socialLinks = (data.socialLinks || []).map(link => {
    let icon;
    switch (link.platform) {
      case "github":
        icon = Github;
        break;
      case "linkedin":
        icon = Linkedin;
        break;
      case "twitter":
        icon = Twitter;
        break;
      default:
        icon = Github;
    }
    
    return {
      icon,
      label: link.platform.charAt(0).toUpperCase() + link.platform.slice(1),
      href: link.url,
      gradient: "from-gray-500 to-gray-700",
    };
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isSubmitting = true;

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    isSubmitting = false;
    isSubmitted = true;

    // Reset form after 3 seconds
    setTimeout(() => {
      isSubmitted = false;
      formData = { name: "", email: "", subject: "", message: "" };
    }, 3000);
  };
</script>

<section
  id="contact"
  bind:this={contactRef}
  class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  <!-- Background -->
  <div class="absolute inset-0 bg-slate-950/50"></div>
  <div
    class="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20 scroll-fade-up">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-6 hover-border-glow"
      >
        <MessageSquare size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >Get In Touch</span
        >
      </div>
      <WordsPullUp
        text="Let's Start a Conversation"
        className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
        staggerDelay={0.1}
        animationDuration={1.2}
      />
      <WordsPullUp
        text="Have a project in mind? Let's build something amazing together"
        className="text-xl text-gray-400 max-w-3xl mx-auto"
        staggerDelay={0.05}
        animationDuration={0.8}
      />
    </div>

    <div class="grid lg:grid-cols-2 gap-12 items-start">
      <!-- Contact Info Section -->
      <div class="space-y-8 scroll-fade-up scroll-fade-up-delay-200">
        <!-- Contact Cards -->
        <div class="space-y-6">
          {#each contactInfo as info, index}
            <a
              href={info.href}
              class="card-shine card-glow glass p-6 rounded-2xl flex items-center gap-6 group hover-scale-glow transition-all duration-300 scroll-fade-up scroll-fade-up-delay-{index *
                100} relative hover-border-glow"
            >
              <div
                class="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative z-10 hover-border-glow"
              >
                <svelte:component
                  this={info.icon}
                  size={28}
                  class="text-purple-400"
                />
              </div>
              <div class="relative z-10">
                <p
                  class="text-sm text-gray-400 mb-1 group-hover:text-gray-300 transition-colors"
                >
                  {info.label}
                </p>
                <p class="text-lg font-bold text-white transition-all">
                  {info.value}
                </p>
              </div>
            </a>
          {/each}
        </div>

        <!-- Social Links -->
        <div
          class="card-glow glass-strong p-8 rounded-3xl scroll-fade-up scroll-fade-up-delay-400 hover-border-glow"
        >
          <h3
            class="text-2xl font-black text-white mb-6 flex items-center gap-3"
          >
            <Sparkles size={24} class="text-purple-400" />
            Connect With Me
          </h3>
          <div class="flex gap-4">
            {#each socialLinks as social}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                class="group relative w-16 h-16 rounded-2xl glass-light flex items-center justify-center hover-scale-glow transition-all duration-300 hover-border-glow"
                title={social.label}
              >
                <svelte:component
                  this={social.icon}
                  size={28}
                  class="relative z-10 text-gray-400 group-hover:text-white transition-colors"
                />
              </a>
            {/each}
          </div>
        </div>

        <!-- Additional Info Card -->
        <div
          class="card-shine glass-light p-8 rounded-3xl scroll-fade-up scroll-fade-up-delay-500 hover-border-glow"
        >
          <h3 class="text-xl font-black text-white mb-4">Why Work With Me?</h3>
          <ul class="space-y-3 text-gray-300">
            {#each contactBenefits as benefit}
              <li class="flex items-start gap-3">
                <CheckCircle
                  size={20}
                  class="text-purple-400 flex-shrink-0 mt-0.5"
                />
                <span>{typeof benefit === 'string' ? benefit : benefit.text}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="scroll-fade-up scroll-fade-up-delay-200">
        <div
          class="card-glow glass-strong p-8 md:p-10 rounded-3xl hover-border-glow"
        >
          <h3
            class="text-3xl font-black text-white mb-8 flex items-center gap-3"
          >
            <Send size={28} class="text-purple-400" />
            {contactForm.title}
          </h3>

          {#if isSubmitted}
            <div class="text-center py-16 scroll-fade-up">
              <CheckCircle size={64} class="text-green-400 mx-auto mb-6" />
              <h4 class="text-2xl font-bold text-white mb-3">Message Sent!</h4>
              <p class="text-gray-400">
                {contactForm.successMessage}
              </p>
            </div>
          {:else}
            <form on:submit={handleSubmit} class="space-y-6">
              <!-- Name -->
              <div>
                <label
                  for="name"
                  class="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  bind:value={formData.name}
                  required
                  class="w-full px-5 py-4 glass-light rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <!-- Email -->
              <div>
                <label
                  for="email"
                  class="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  bind:value={formData.email}
                  required
                  class="w-full px-5 py-4 glass-light rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <!-- Subject -->
              <div>
                <label
                  for="subject"
                  class="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  bind:value={formData.subject}
                  required
                  class="w-full px-5 py-4 glass-light rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <!-- Message -->
              <div>
                <label
                  for="message"
                  class="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  bind:value={formData.message}
                  required
                  rows="6"
                  class="w-full px-5 py-4 glass-light rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                disabled={isSubmitting}
                class="w-full py-4 rounded-xl font-bold text-white glass-strong hover-scale-glow transition-all duration-300 btn-border-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {#if isSubmitting}
                  <div
                    class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"
                  ></div>
                  Sending...
                {:else}
                  <Send size={20} />
                  {contactForm.submitButtonText}
                {/if}
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="mt-20 text-center scroll-fade-up scroll-fade-up-delay-700">
      <div
        class="glass-light p-8 rounded-3xl inline-block max-w-2xl hover-border-glow"
      >
        <p class="text-gray-300 text-lg mb-4">
          <span class="font-bold text-purple-400">Open to opportunities!</span>
        </p>
        <WordsPullUp
          text="I'm currently available for freelance projects and full-time positions. Let's create something extraordinary together."
          className="text-gray-400"
          staggerDelay={0.03}
          animationDuration={0.6}
        />
      </div>
    </div>
  </div>
</section>

<style>
  /* Custom focus styles for form inputs */
  input:focus,
  textarea:focus {
    background: rgba(15, 23, 42, 0.7);
  }

  /* Loading spinner animation */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style>
