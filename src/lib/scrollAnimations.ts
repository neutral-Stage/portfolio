/**
 * Scroll Animation Utilities
 * Provides smooth fade slide-up animations for elements when they scroll into view
 */

export class ScrollAnimations {
  private observer: IntersectionObserver;
  private elements: Set<Element> = new Set();

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to prevent re-triggering
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }

  /**
   * Initialize scroll animations for all elements with scroll-fade-up class
   */
  init() {
    const elements = document.querySelectorAll('.scroll-fade-up');
    elements.forEach((element) => {
      this.observe(element);
    });
  }

  /**
   * Start observing a specific element
   */
  observe(element: Element) {
    if (!this.elements.has(element)) {
      this.elements.add(element);
      this.observer.observe(element);
    }
  }

  /**
   * Stop observing a specific element
   */
  unobserve(element: Element) {
    if (this.elements.has(element)) {
      this.elements.delete(element);
      this.observer.unobserve(element);
    }
  }

  /**
   * Destroy the observer and clean up
   */
  destroy() {
    this.observer.disconnect();
    this.elements.clear();
  }

  /**
   * Reinitialize animations (useful for dynamic content)
   */
  reinit() {
    this.destroy();
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    this.init();
  }
}

// Global instance
export const scrollAnimations = new ScrollAnimations();

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      scrollAnimations.init();
    });
  } else {
    scrollAnimations.init();
  }
}
