<script lang="ts">
  import WordsPullUp from './WordsPullUp.svelte';

  interface AnimatedTextWrapperProps {
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
  }: AnimatedTextWrapperProps = $props();
</script>

<WordsPullUp
  {text}
  {className}
  {wordClassName}
  {staggerDelay}
  {animationDuration}
  {ease}
  {initialY}
/>