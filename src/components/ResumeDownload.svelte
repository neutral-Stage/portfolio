<script lang="ts">
  import { onMount } from "svelte";
  import {
    Download,
    FileText,
    Award,
    Briefcase,
    GraduationCap,
    Globe,
  } from "lucide-svelte";

  export let data: any = {};

  let resumeRef: HTMLElement;
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

    if (resumeRef) {
      observer.observe(resumeRef);
    }

    return () => observer.disconnect();
  });

  // Helper function to get icon from string name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return Briefcase;
      case "Award":
        return Award;
      case "GraduationCap":
        return GraduationCap;
      case "Globe":
        return Globe;
      default:
        return Award;
    }
  };

  // Process resume highlights from data
  $: resumeHighlights = (data.resumeHighlights || []).map((highlight) => ({
    icon: getIcon(highlight.icon) || Award,
    title: highlight.title,
    description: highlight.description,
  }));

  // Process resume formats from data
  $: resumeFormats = data.resumeFormats || [
    { name: "PDF Format", icon: "FileText", color: "text-red-400" },
    { name: "Word Document", icon: "FileText", color: "text-blue-400" },
    { name: "Plain Text", icon: "FileText", color: "text-green-400" }
  ];

  const downloadResume = () => {
    // In a real implementation, this would download the actual resume PDF
    const link = document.createElement("a");
    link.href = data?.resume?.url || "/resume.pdf";
    link.download = `${data?.name || "Your-Name"}-Resume.pdf`;
    link.click();
  };
</script>

<section id="resume" bind:this={resumeRef} class="py-20 px-4 sm:px-6 lg:px-8">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
        <span
          class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Download Resume
        </span>
      </h2>
      <div
        class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
      ></div>
      <p class="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
        Get a comprehensive overview of my experience, skills, and achievements
        in a professional format
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Resume Preview -->
      <div class="relative">
        <div
          class="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
        >
          <div class="flex items-center mb-6">
            <FileText size={32} class="text-purple-400 mr-3" />
            <h3 class="text-2xl font-semibold text-white">
              Professional Resume
            </h3>
          </div>

          <!-- Resume Preview Content -->
          <div class="space-y-6">
            <div class="border-l-4 border-purple-500 pl-4">
              <h4 class="text-lg font-semibold text-white mb-2">Experience</h4>
              <p class="text-gray-300 text-sm">
                Senior Full-Stack Developer at TechCorp Solutions
              </p>
              <p class="text-gray-400 text-xs">2022 - Present</p>
            </div>

            <div class="border-l-4 border-pink-500 pl-4">
              <h4 class="text-lg font-semibold text-white mb-2">Education</h4>
              <p class="text-gray-300 text-sm">
                Bachelor of Science in Computer Science
              </p>
              <p class="text-gray-400 text-xs">
                University of Technology, 2015-2019
              </p>
            </div>

            <div class="border-l-4 border-blue-500 pl-4">
              <h4 class="text-lg font-semibold text-white mb-2">Skills</h4>
              <p class="text-gray-300 text-sm">
                JavaScript, TypeScript, React, Node.js, Python, AWS
              </p>
            </div>

            <div class="border-l-4 border-green-500 pl-4">
              <h4 class="text-lg font-semibold text-white mb-2">
                Certifications
              </h4>
              <p class="text-gray-300 text-sm">
                AWS Certified Solutions Architect
              </p>
              <p class="text-gray-400 text-xs">
                Google Cloud Professional Developer
              </p>
            </div>
          </div>
        </div>

        <!-- Download Button -->
        <div class="mt-8 text-center">
          <button
            on:click={downloadResume}
            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Download size={24} class="mr-3" />
            Download PDF Resume
          </button>
        </div>
      </div>

      <!-- Resume Highlights -->
      <div class="space-y-8">
        <div>
          <h3 class="text-2xl font-semibold text-white mb-6">
            Resume Highlights
          </h3>
          <div class="grid gap-6">
            {#each resumeHighlights as highlight}
              <div class="flex items-start space-x-4">
                <div class="p-3 bg-purple-500/20 rounded-lg">
                  <svelte:component
                    this={highlight.icon}
                    size={24}
                    class="text-purple-400"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-white mb-2">
                    {highlight.title}
                  </h4>
                  <p class="text-gray-300 text-sm">{highlight.description}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Additional Formats -->
        <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h4 class="text-lg font-semibold text-white mb-4">
            Available Formats
          </h4>
          <div class="space-y-3">
            {#each resumeFormats as format}
              <div
                class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
              >
                <div class="flex items-center">
                  <FileText size={20} class={format.color || "text-red-400"} style="margin-right: 0.75rem" />
                  <span class="text-gray-300">{format.name}</span>
                </div>
                <button
                  class="text-purple-400 hover:text-purple-300 text-sm font-medium"
                  on:click={downloadResume}
                >
                  Download
                </button>
              </div>
            {/each}
          </div>
        </div>

        <!-- Contact Info -->
        <div
          class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20"
        >
          <h4 class="text-lg font-semibold text-white mb-4">Quick Contact</h4>
          <div class="space-y-2 text-sm">
            <div class="text-gray-300">📧 {data?.contact?.email || "your.email@example.com"}</div>
            {#if data?.contact?.phone}
              <div class="text-gray-300">📱 {data.contact.phone}</div>
            {/if}
            <div class="text-gray-300">🌍 {data?.contact?.location || "San Francisco, CA"}</div>
            <div class="text-gray-300">💼 {data?.availability?.message || "Available for remote work"}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
