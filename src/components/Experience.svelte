<script lang="ts">
  import { onMount } from "svelte";
  import {
    Briefcase,
    Calendar,
    MapPin,
    Award,
    ExternalLink,
    TrendingUp,
    Users,
    Code,
  } from "lucide-svelte";

  let experienceRef: HTMLElement;
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

    if (experienceRef) {
      observer.observe(experienceRef);
    }

    return () => observer.disconnect();
  });

  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      type: "Full-time",
      description:
        "Leading development of scalable web applications and mentoring junior developers. Implemented microservices architecture resulting in 40% performance improvement.",
      achievements: [
        "Led a team of 5 developers in building a customer management platform",
        "Reduced application load time by 40% through optimization",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Mentored 3 junior developers and conducted code reviews",
      ],
      technologies: [
        "React",
        "Node.js",
        "AWS",
        "Docker",
        "Kubernetes",
        "PostgreSQL",
      ],
      current: true,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Full-Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      period: "2021 - 2022",
      type: "Full-time",
      description:
        "Developed and maintained multiple web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality products.",
      achievements: [
        "Built responsive e-commerce platform serving 10,000+ users",
        "Integrated payment processing with Stripe and PayPal",
        "Implemented real-time chat functionality using WebSockets",
        "Optimized database queries improving response time by 30%",
      ],
      technologies: [
        "Vue.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "Stripe",
        "WebSocket",
      ],
      current: false,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      location: "New York, NY",
      period: "2020 - 2021",
      type: "Full-time",
      description:
        "Created engaging user interfaces and interactive web experiences for various clients. Focused on responsive design and user experience optimization.",
      achievements: [
        "Developed 15+ client websites with modern UI/UX",
        "Implemented accessibility features meeting WCAG 2.1 standards",
        "Created reusable component library used across projects",
        "Improved client website performance scores by 25%",
      ],
      technologies: ["React", "TypeScript", "Sass", "Webpack", "Jest", "Figma"],
      current: false,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Junior Web Developer",
      company: "WebDev Studio",
      location: "Remote",
      period: "2019 - 2020",
      type: "Full-time",
      description:
        "Started my professional journey building responsive websites and learning industry best practices. Worked with senior developers to deliver quality projects.",
      achievements: [
        "Developed 10+ responsive landing pages",
        "Learned and applied modern frontend frameworks",
        "Contributed to team code reviews and discussions",
        "Maintained and updated existing client websites",
      ],
      technologies: [
        "HTML/CSS",
        "JavaScript",
        "jQuery",
        "Bootstrap",
        "Git",
        "PHP",
      ],
      current: false,
      gradient: "from-orange-500 to-yellow-500",
    },
  ];
</script>

<section
  id="experience"
  bind:this={experienceRef}
  class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  <!-- Background -->
  <div
    class="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent"
  ></div>
  <div
    class="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"
    style="animation-delay: 2s;"
  ></div>

  <div class="relative z-10 max-w-6xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20 animate-scale-in">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-6"
      >
        <TrendingUp size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >Career Journey</span
        >
      </div>
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
        <span class="gradient-text"> Professional Experience </span>
      </h2>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        A timeline of growth, achievements, and continuous learning
      </p>
    </div>

    <!-- Timeline -->
    <div class="relative">
      <!-- Timeline Line -->
      <div
        class="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 transform md:-translate-x-1/2"
      ></div>

      <!-- Experience Items -->
      <div class="space-y-16">
        {#each experiences as experience, index}
          <div
            class="relative animate-fade-slide-right delay-{index * 200}"
            class:md:flex-row-reverse={index % 2 === 0}
            class:md:flex={true}
          >
            <!-- Timeline Dot -->
            <div
              class="absolute left-8 md:left-1/2 w-4 h-4 transform -translate-x-1/2 md:translate-x-0 md:-translate-x-1/2"
            >
              <div
                class="w-full h-full rounded-full bg-gradient-to-r {experience.gradient} animate-glow-pulse"
              >
                {#if experience.current}
                  <div
                    class="absolute inset-0 rounded-full bg-gradient-to-r {experience.gradient} blur-md"
                  ></div>
                {/if}
              </div>
            </div>

            <!-- Content Card -->
            <div
              class="ml-20 md:ml-0 md:w-[calc(50%-3rem)]"
              class:md:pr-12={index % 2 !== 0}
              class:md:pl-12={index % 2 === 0}
            >
              <div
                class="card-3d card-glow glass p-8 rounded-3xl group hover:scale-[1.02] transition-all duration-300"
              >
                <!-- Current Badge -->
                {#if experience.current}
                  <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r {experience.gradient} mb-6"
                  >
                    <div
                      class="w-2 h-2 rounded-full bg-white animate-pulse"
                    ></div>
                    <span class="text-sm font-bold text-white"
                      >Current Position</span
                    >
                  </div>
                {/if}

                <!-- Header -->
                <div class="mb-6">
                  <h3
                    class="text-2xl font-black text-white mb-2 group-hover:gradient-text transition-all"
                  >
                    {experience.title}
                  </h3>
                  <p class="text-lg font-bold gradient-text mb-4">
                    {experience.company}
                  </p>

                  <!-- Meta Info -->
                  <div class="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div class="flex items-center gap-2">
                      <Calendar size={16} class="text-purple-400" />
                      {experience.period}
                    </div>
                    <div class="flex items-center gap-2">
                      <MapPin size={16} class="text-purple-400" />
                      {experience.location}
                    </div>
                    <div class="flex items-center gap-2">
                      <Briefcase size={16} class="text-purple-400" />
                      {experience.type}
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <p class="text-gray-300 leading-relaxed mb-6">
                  {experience.description}
                </p>

                <!-- Achievements -->
                <div class="mb-6">
                  <div class="flex items-center gap-2 mb-4">
                    <Award size={18} class="text-purple-400" />
                    <h4
                      class="text-sm font-bold text-white uppercase tracking-wider"
                    >
                      Key Achievements
                    </h4>
                  </div>
                  <ul class="space-y-2">
                    {#each experience.achievements as achievement}
                      <li class="flex items-start gap-3 text-sm text-gray-300">
                        <div
                          class="w-1.5 h-1.5 rounded-full bg-gradient-to-r {experience.gradient} mt-2 flex-shrink-0"
                        ></div>
                        <span>{achievement}</span>
                      </li>
                    {/each}
                  </ul>
                </div>

                <!-- Technologies -->
                <div>
                  <div class="flex items-center gap-2 mb-4">
                    <Code size={18} class="text-purple-400" />
                    <h4
                      class="text-sm font-bold text-white uppercase tracking-wider"
                    >
                      Technologies Used
                    </h4>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    {#each experience.technologies as tech}
                      <span
                        class="glass-light px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-purple-300 hover:scale-105 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="mt-24 text-center animate-slide-up delay-800">
      <div class="glass-light p-8 rounded-3xl inline-block">
        <Users size={48} class="text-purple-400 mx-auto mb-4" />
        <h3 class="text-2xl font-black text-white mb-3">Let's Work Together</h3>
        <p class="text-gray-400 mb-6 max-w-md">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>
        <a
          href="#contact"
          class="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient hover:scale-105 transition-all duration-300 btn-glow"
        >
          Get In Touch
        </a>
      </div>
    </div>
  </div>
</section>
