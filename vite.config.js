import { defineConfig } from 'vite';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: false,
  build: {
    rollupOptions: {
      input: 'home.html',
    },
    outDir: 'dist',
  },
  server: {
    open: '/home.html',
  },
  plugins: [
    {
      name: 'copy-root-assets',
        closeBundle() {
        const out = resolve(process.cwd(), 'dist');
        if (existsSync('Logo.ico')) copyFileSync('Logo.ico', resolve(out, 'Logo.ico'));
        if (existsSync('firebase-config.js')) copyFileSync('firebase-config.js', resolve(out, 'firebase-config.js'));
      },
    },
  ],
});
