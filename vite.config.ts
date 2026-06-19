import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base on build so the app works when served from a GitHub Pages
// subpath like /oscar/. Dev server stays at root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [react()],
}))
