<script lang="ts">
  import { onMount } from 'svelte';
  import { createAnimatedWords } from '../lib/animatedText.ts';

  interface AnimatedHeadlineProps {
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
  }: AnimatedHeadlineProps = $props();

  let container: HTMLElement;
  let animatedWords: Array<{ text: string; class: string }> = [];

  onMount(() => {
    animatedWords = createAnimatedWords(text);

    // Set CSS variables for customization
    if (container) {
      container.style.setProperty('--initial-y', `${initialY}px`);
      container.style.setProperty('--animation-duration', `${animationDuration}s`);
      container.style.setProperty('--ease', `cubic-bezier(${ease.join(', ')})`);

      // Apply staggered delays
      const wordElements = container.querySelectorAll('.word');
      wordElements.forEach((element, index) => {
        const delay = 0.2 + (index * staggerDelay);
        (element as HTMLElement).style.animationDelay = `${delay}s`;
      });

      // Trigger animation
      setTimeout(() => {
        container.classList.add('animated');
      }, 100);
    }
  });
</script>

<div
  bind:this={container}
  class={`words-pull-up ${className}`}
>
  {#each animatedWords as item (item.text + item.class)}
    <span class={`${item.class} ${item.class === 'word' ? wordClassName : ''}`}>
      {item.text}
    </span>
  {/each}
</div>

<style>
  .words-pull-up.animated .word,
  .words-pull-up.animated .space {
    animation-play-state: running;
  }
</style>