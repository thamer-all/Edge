import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setupTests.js', './src/tests/setupIntegration.js'],
    include: [
      'src/tests/integration/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    exclude: [
      'node_modules',
      'dist',
      'server',
      'e2e'
    ],
    testTimeout: 30000,
    hookTimeout: 10000,
    teardownTimeout: 10000,
    silent: false,
    reporters: ['verbose'],
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true, // Integration tests run sequentially
        maxThreads: 1
      }
    },
    coverage: {
      enabled: false // Coverage handled by unit tests
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/contexts': path.resolve(__dirname, './src/contexts'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/data': path.resolve(__dirname, './src/data'),
      '@/tests': path.resolve(__dirname, './src/tests')
    }
  },
  define: {
    'import.meta.env.VITE_NODE_ENV': JSON.stringify('test'),
    'import.meta.env.VITE_API_URL': JSON.stringify('http://localhost:5001')
  },
  server: {
    deps: {
      inline: ['@testing-library/user-event']
    }
  }
}); 