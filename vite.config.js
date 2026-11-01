import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative paths work on localhost and on GitHub Pages project sites.
  base: './',
})
