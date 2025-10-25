<script lang="ts">
  import { onMount } from 'svelte';

  interface WordsPullUpProps {
    text: string;
    className?: string;
    wordClassName?: string;
    staggerDelay?: number;
    animationDuration?: number;
    ease?: [number, number, number, number];
    initialY?: number;
  }

  let {
    text,
    className = "",
    wordClassName = "",
    staggerDelay = 0.1,
    animationDuration = 0.6,
    ease = [0.25, 0.1, 0.25, 1],
    initialY = 30,
  }: WordsPullUpProps = $props();

  let container: HTMLElement;
  let isVisible = $state(false);
  let words: Array<{ text: string; isSpace: boolean; delay: number }> = $state([]);

  // Split text into words and spaces, preserving spaces
  function splitText(text: string) {
    if (!text) return [];

    const parts = text.split(/(\s+)/);
    const result: Array<{ text: string; isSpace: boolean; delay: number }> = [];

    parts.forEach((part, index) => {
      if (part.trim() === '' && part.length > 0) {
        // This is a space
        result.push({
          text: '\u00A0', // Non-breaking space
          isSpace: true,
          delay: 0
        });
      } else if (part.trim() !== '') {
        // This is a word
        result.push({
          text: part,
          isSpace: false,
          delay: result.filter(w => !w.isSpace).length * staggerDelay
        });
      }
    });

    return result;
  }

  // Intersection Observer for scroll triggering
  onMount(() => {
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  });

  // Update words when text changes
  $effect(() => {
    words = splitText(text);
  });
</script>

<div
  bind:this={container}
  class={`words-pull-up ${className}`}
  style={`--initial-y: ${initialY}px; --animation-duration: ${animationDuration}s; --ease: cubic-bezier(${ease.join(', ')})`}
>
  {#each words as word, index (word.text + index)}
    {#if word.isSpace}
      <span class="space">{word.text}</span>
    {:else}
      <span
        class={`word ${wordClassName}`}
        style={`--delay: ${word.delay}s`}
        class:visible={isVisible}
      >
        {word.text}
      </span>
    {/if}
  {/each}
</div>

<style>
  .words-pull-up {
    display: block;
    position: relative;
  }

  .words-pull-up .word {
    display: inline-block;
    opacity: 0;
    transform: translateY(var(--initial-y, 30px)) scale(0.8) rotateX(15deg);
    filter: blur(8px) brightness(0.7);
    text-shadow: 0 0 0px transparent;
    transition: all var(--animation-duration, 0.6s) var(--ease, cubic-bezier(0.25, 0.1, 0.25, 1));
    transition-delay: var(--delay, 0s);
    will-change: opacity, transform, filter, text-shadow;
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .words-pull-up .word:last-child {
    margin-right: 0;
  }

  .words-pull-up .word.visible {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
    filter: blur(0) brightness(1);
    text-shadow: 0 0 0px transparent;
  }

  .words-pull-up .space {
    display: inline;
    opacity: 1;
    white-space: pre-wrap;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .words-pull-up .word {
      --initial-y: 25px;
      margin-right: 0.3rem;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .words-pull-up .word {
      opacity: 1;
      transform: translateY(0) scale(1) rotateX(0deg);
      filter: blur(0) brightness(1);
      text-shadow: none;
      transition: none;
      transition-delay: 0s !important;
    }
  }
</style>