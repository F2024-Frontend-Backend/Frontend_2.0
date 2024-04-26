// vitest.config.ts
/// <reference types="vitest" />
//import { defineConfig } from 'vitest/config';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'], // Your setup file, if you have any
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'], // Pattern to include all test files
    // Add other configurations here as needed
  },
});

