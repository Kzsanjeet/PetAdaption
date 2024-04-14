// vite.config.js
import { defineConfig } from 'vite';
import dns from 'dns';
import react from '@vitejs/plugin-react';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Specify the host
  },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
});
