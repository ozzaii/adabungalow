import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['gsap', 'swiper', 'lenis'],
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/base/_variables.scss";`
      }
    }
  },
  optimizeDeps: {
    include: ['gsap', 'swiper', 'lenis', 'split-type']
  }
});