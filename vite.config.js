import { defineConfig } from 'vite';

export default defineConfig({
  base: '/printer-core-insights/',
  build: {
    outDir: 'docs', // this tells Vite to build into docs/
  }
});