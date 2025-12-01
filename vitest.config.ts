import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: ['node_modules/**', 'dist/**', 'docs/**', 'test/**', 'coverage/**', '**/config/**', '**/utils/**', '**/schemas/**', '**/errors/**', 'scripts/**', '**/server.ts', '**/app.ts', '**/middlewares/**', '**/models/**', '**/auth*', '**/cognito*'],
      reportsDirectory: './coverage',
    },
    testTimeout: 10000,
  },
});
