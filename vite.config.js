import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    root: 'src', // treat src/ as the root
    build: {
      outDir: '../dist', // output goes to docs/ for GitHub Pages
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          facts: resolve(__dirname, 'src/facts/index.html'),
          contact: resolve(__dirname, 'src/contact/index.html'),
        },
      },
    },
  };
});
