import { writable } from 'svelte/store';

export const lenisStore = writable<any>(null);

export function initLenis() {
  import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle hash links
    const handleHashLinks = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash) as HTMLElement;
          if (element) {
            lenis.scrollTo(element, {
              offset: -80, // Account for fixed header
              duration: 1.5,
            });
          }
        }, 100);
      }
    };

    // Handle hash links on page load
    handleHashLinks();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashLinks);

    // Store the instance
    lenisStore.set(lenis);
  });
}

export function scrollToElement(element: Element, options?: { offset?: number; duration?: number }) {
  lenisStore.subscribe((lenis) => {
    if (lenis) {
      lenis.scrollTo(element as HTMLElement, {
        offset: options?.offset ?? -80,
        duration: options?.duration ?? 1.5,
      });
    }
  });
}
