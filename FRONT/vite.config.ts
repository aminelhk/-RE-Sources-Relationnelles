import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react-refresh'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [reactRefresh()],
  plugins: [react()],
  build: {
    outDir: 'public/build',
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      // '@mui/styled-engine': '@mui/styled-engine-sc',
      '@mui/styled-engine': path.resolve(__dirname, 'node_modules', '@mui', 'styled-engine'),
    },
  },
})