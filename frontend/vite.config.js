import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
// Vite is a fast build tool that provides instant server start and hot module replacement
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to backend during development
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});

