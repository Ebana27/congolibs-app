import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        // onboarding: './onboarding.html'
        // signup: './signup.html',
        // gallery: './gallery.html'
      }
    }
  }
})