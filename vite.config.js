import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          tmdb: ['axios']
        }
      }
    }
  },
  define: {
    'process.env.VITE_API_KEY': '"b275ce8e1a6b3d5d879bb0907e4f56ad"',
    'process.env.VITE_BASE_URL': '"https://api.themoviedb.org/3"',
    'process.env.VITE_IMAGE_BASE_URL': '"https://image.tmdb.org/t/p/original"',
    'process.env.VITE_IMAGE_W500_URL': '"https://image.tmdb.org/t/p/w500"'
  }
})
