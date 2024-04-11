// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Specify the port number
    host: 'localhost', // Specify the host
  },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
});
