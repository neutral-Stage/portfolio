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

  const resumeHighlights = [
    {
      icon: Briefcase,
      title: "3+ Years Experience",
      description: "Full-stack development across various industries",
    },
    {
      icon: Award,
      title: "50+ Projects",
      description: "Successfully delivered projects for clients worldwide",
    },
    {
      icon: GraduationCap,
      title: "Computer Science",
      description: "Bachelor's degree with focus on software engineering",
    },
    {
      icon: Globe,
      title: "Remote Expert",
      description: "Proven track record working with global teams",
    },
  ];

  const downloadResume = () => {
    // In a real implementation, this would download the actual resume PDF
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Your-Name-Resume.pdf";
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
            <div
              class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
            >
              <div class="flex items-center">
                <FileText size={20} class="text-red-400 mr-3" />
                <span class="text-gray-300">PDF Format</span>
              </div>
              <button
                class="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Download
              </button>
            </div>
            <div
              class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
            >
              <div class="flex items-center">
                <FileText size={20} class="text-blue-400 mr-3" />
                <span class="text-gray-300">Word Document</span>
              </div>
              <button
                class="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Download
              </button>
            </div>
            <div
              class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
            >
              <div class="flex items-center">
                <FileText size={20} class="text-green-400 mr-3" />
                <span class="text-gray-300">Plain Text</span>
              </div>
              <button
                class="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Download
              </button>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div
          class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20"
        >
          <h4 class="text-lg font-semibold text-white mb-4">Quick Contact</h4>
          <div class="space-y-2 text-sm">
            <div class="text-gray-300">📧 your.email@example.com</div>
            <div class="text-gray-300">📱 +1 (555) 123-4567</div>
            <div class="text-gray-300">🌍 San Francisco, CA</div>
            <div class="text-gray-300">💼 Available for remote work</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
