import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setupTests.js'],
    include: [
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
      'src/tests/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    exclude: [
      'node_modules',
      'dist',
      'server',
      'e2e',
      'src/tests/integration/**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/tests/',
        'dist/',
        'server/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/index.{js,ts,jsx,tsx}',
        'src/assets/',
        'src/data/',
        'public/'
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70
        }
      }
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 5000,
    silent: false,
    reporters: ['verbose'],
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        maxThreads: 4
      }
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
    'import.meta.env.VITE_NODE_ENV': JSON.stringify('test')
  }
}); 