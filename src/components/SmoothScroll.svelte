<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { initLenis, lenisStore } from '../lib/lenis';

  let lenis: any = null;

  onMount(() => {
    initLenis();
    
    // Subscribe to the store to get the lenis instance
    const unsubscribe = lenisStore.subscribe((instance: any) => {
      lenis = instance;
    });

    return () => {
      unsubscribe();
    };
  });

  onDestroy(() => {
    if (lenis) {
      lenis.destroy();
    }
  });

  // Expose lenis instance for external use
  export { lenis };
</script>

<!-- This component doesn't render anything, it just initializes Lenis -->
