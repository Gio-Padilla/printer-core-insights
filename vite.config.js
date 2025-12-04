import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    root: 'src', // treat src/ as the root
    base: mode === 'production' ? '/printer-core-insights/' : '/',
    build: {
      outDir: '../docs', // output goes to docs/ for GitHub Pages
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
        },
      },
    },
  };
});
