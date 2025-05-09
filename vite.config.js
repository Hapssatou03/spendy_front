import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    // Ajoutez cette partie si vous voulez désactiver l'overlay d'erreur
    hmr: {
      overlay: false
    }
  }
})