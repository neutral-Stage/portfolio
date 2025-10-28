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
  import WordsPullUp from "./WordsPullUp.svelte";

  export let data: any[] = [];

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

  // Helper function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

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

  // Process experience data with comprehensive fallbacks
  $: processedExperiences = (() => {
    if (!Array.isArray(data) || data.length === 0) {
      // Default fallback experiences
      return [
        {
          title: "Senior Full Stack Developer",
          company: "Tech Solutions Inc.",
          location: "San Francisco, CA",
          startDate: "2022-01-01",
          endDate: "",
          current: true,
          type: "Full-time",
          description: "Led development of scalable web applications serving 100K+ users. Architected microservices infrastructure and mentored junior developers.",
          achievements: [
            "Increased application performance by 40% through optimization",
            "Led a team of 5 developers on critical product features",
            "Implemented CI/CD pipeline reducing deployment time by 60%",
            "Mentored 3 junior developers who were promoted within 6 months"
          ],
          technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Docker"],
          gradient: getGradient(0),
          period: `${formatDate("2022-01-01")} - Present`,
        },
        {
          title: "Full Stack Developer",
          company: "Digital Agency Pro",
          location: "Remote",
          startDate: "2020-06-01",
          endDate: "2021-12-31",
          current: false,
          type: "Full-time",
          description: "Developed custom web applications for clients across various industries. Collaborated with designers and project managers to deliver high-quality solutions.",
          achievements: [
            "Delivered 25+ client projects on time and within budget",
            "Built responsive websites with 99.9% uptime",
            "Integrated third-party APIs and payment systems",
            "Received 'Developer of the Year' award in 2021"
          ],
          technologies: ["React", "PHP", "Laravel", "MySQL", "JavaScript", "SASS"],
          gradient: getGradient(1),
          period: `${formatDate("2020-06-01")} - ${formatDate("2021-12-31")}`,
        },
        {
          title: "Frontend Developer",
          company: "StartupXYZ",
          location: "New York, NY",
          startDate: "2019-03-01",
          endDate: "2020-05-31",
          current: false,
          type: "Full-time",
          description: "Focused on creating engaging user interfaces and experiences. Worked closely with UX designers to implement pixel-perfect designs.",
          achievements: [
            "Redesigned company website increasing conversion by 35%",
            "Implemented responsive design for mobile-first approach",
            "Collaborated with backend team on API integrations",
            "Maintained code quality with 90%+ test coverage"
          ],
          technologies: ["React", "JavaScript", "CSS3", "HTML5", "Webpack", "Jest"],
          gradient: getGradient(2),
          period: `${formatDate("2019-03-01")} - ${formatDate("2020-05-31")}`,
        },
        {
          title: "Junior Web Developer",
          company: "Local Web Studio",
          location: "Boston, MA",
          startDate: "2018-09-01",
          endDate: "2019-02-28",
          current: false,
          type: "Full-time",
          description: "Started professional journey developing websites for small businesses. Gained experience in client communication and project management.",
          achievements: [
            "Developed 15+ websites for local businesses",
            "Learned modern web development best practices",
            "Improved SEO rankings for client websites",
            "Completed projects 20% under estimated time"
          ],
          technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP", "MySQL"],
          gradient: getGradient(3),
          period: `${formatDate("2018-09-01")} - ${formatDate("2019-02-28")}`,
        }
      ];
    }

    // Process actual data from Sanity
    return data.map((exp, index) => ({
      ...exp,
      title: exp.title || "Untitled Position",
      company: exp.company || "Unknown Company",
      location: exp.location || "Location not specified",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      current: exp.current || false,
      type: exp.type || "Full-time",
      description: exp.description || "No description available",
      achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
      technologies: Array.isArray(exp.technologies) ? exp.technologies : [],
      gradient: getGradient(index),
      period: exp.current
        ? `${formatDate(exp.startDate)} - Present`
        : `${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`,
    }));
  })();
</script>

<section
  id="experience"
  bind:this={experienceRef}
  class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
  <!-- Background -->
  <div class="absolute inset-0 bg-slate-900/50"></div>
  <div
    class="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"
    style="animation-delay: 2s;"
  ></div>

  <div class="relative z-10 max-w-6xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-20 scroll-fade-up">
      <div
        class="inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-6 hover-border-glow"
      >
        <TrendingUp size={20} class="text-purple-400" />
        <span
          class="text-sm font-semibold text-gray-300 uppercase tracking-wider"
          >Career Journey</span
        >
      </div>
      <WordsPullUp
        text="Professional Experience"
        className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
        staggerDelay={0.1}
        animationDuration={1.0}
      />
      <WordsPullUp
        text="A timeline of growth, achievements, and continuous learning"
        className="text-xl text-gray-400 max-w-3xl mx-auto"
        staggerDelay={0.05}
        animationDuration={0.8}
      />
    </div>

    <!-- Timeline -->
    <div class="relative">
      <!-- Timeline Line -->
      <div
        class="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-purple-500/50 transform md:-translate-x-1/2"
      ></div>

      <!-- Experience Items -->
      <div class="space-y-16">
        {#each processedExperiences as experience, index}
          <div
            class="relative scroll-fade-up scroll-fade-up-delay-{index * 100}"
            class:md:flex-row-reverse={index % 2 === 0}
            class:md:flex={true}
          >
            <!-- Timeline Dot -->
            <div
              class="absolute left-8 md:left-1/2 w-4 h-4 transform -translate-x-1/2"
            >
              <div
                class="w-full h-full rounded-full bg-purple-500 animate-glow-pulse"
              >
                {#if experience.current}
                  <div
                    class="absolute inset-0 rounded-full bg-purple-500 blur-md"
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
                class="card-3d card-glow glass p-8 rounded-3xl group hover-scale-glow transition-all duration-300 hover-border-glow"
              >
                <!-- Current Badge -->
                {#if experience.current}
                  <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 mb-6 hover-border-glow"
                  >
                    <div
                      class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"
                    ></div>
                    <span class="text-sm font-bold text-white"
                      >Current Position</span
                    >
                  </div>
                {/if}

                <!-- Header -->
                <div class="mb-6">
                  <h3
                    class="text-2xl font-black text-white mb-2 group-hover:text-purple-400 transition-all"
                  >
                    {experience.title}
                  </h3>
                  <p class="text-lg font-bold text-purple-400 mb-4">
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
                    {#each Array.isArray(experience.achievements) ? experience.achievements : [] as achievement}
                      <li class="flex items-start gap-3 text-sm text-gray-300">
                        <div
                          class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"
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
                    {#each Array.isArray(experience.technologies) ? experience.technologies : [] as tech}
                      <span
                        class="group relative glass-light px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white hover-scale-glow transition-all duration-300 overflow-hidden hover-border-glow"
                      >
                        <span class="relative z-10">{tech}</span>
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
    <div class="mt-24 text-center scroll-fade-up scroll-fade-up-delay-400">
      <div class="glass-light p-8 rounded-3xl inline-block hover-border-glow">
        <Users size={48} class="text-purple-400 mx-auto mb-4" />
        <h3 class="text-2xl font-black text-white mb-3">Let's Work Together</h3>
        <WordsPullUp
          text="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
          className="text-gray-400 mb-6 max-w-md"
          staggerDelay={0.03}
          animationDuration={0.6}
        />
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
