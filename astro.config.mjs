// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://yourportfolio.com", // Replace with your actual domain
  integrations: [
    svelte(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: "esbuild",
      cssMinify: true,
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching and performance
          manualChunks(id) {
            // Vendor chunks
            if (id.includes('node_modules')) {
              // Separate Svelte framework
              if (id.includes('svelte')) {
                return 'vendor-svelte';
              }
              // Separate Lenis smooth scroll library
              if (id.includes('lenis')) {
                return 'vendor-lenis';
              }
              // Separate Lucide icons
              if (id.includes('lucide-svelte')) {
                return 'vendor-icons';
              }
              // Separate Sanity client
              if (id.includes('@sanity')) {
                return 'vendor-sanity';
              }
              // Other vendor dependencies
              return 'vendor';
            }
          },
          // Optimize chunk file names for better caching
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: 'entry/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      // Increase chunk size warning limit (optional)
      chunkSizeWarningLimit: 1000,
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
