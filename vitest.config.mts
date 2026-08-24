import { defineConfig, mergeConfig } from 'vitest/config';
import viteBaseConfig from './build/base.config.mjs';
import path from 'path';

const BASE_THRESHOLD = 60;
const MAX_STATEMENTS_THRESHOLD = 85;
const MAX_FUNCTIONS_THRESHOLD = 75;
const MAX_BRANCHS_THRESHOLD = 75;
const MAX_LINES_THRESHOLD = 85;

export default mergeConfig(
  viteBaseConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: [path.resolve(__dirname, 'tests', 'setup.ts')],
      include: ['tests/**/*.{test,spec}.{js,jsx,ts,tsx,cjs,cjsx,cts,ctsx,mjs,mjsx,mts,mtsx}'],
      exclude: ['node_modules', 'dist', 'public', 'coverage'],
      coverage: {
        enabled: true,
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/index.tsx',
          'src/store/**',
          'src/apis/**',
          'src/types/**',
          'src/styles/**',
          '**/*.test.ts',
          '**/*.d.ts',
          '**/*types.ts',
          '**/*index.ts*',
        ],
        watermarks: {
          statements: [BASE_THRESHOLD, MAX_STATEMENTS_THRESHOLD],
          functions: [BASE_THRESHOLD, MAX_FUNCTIONS_THRESHOLD],
          branches: [BASE_THRESHOLD, MAX_BRANCHS_THRESHOLD],
          lines: [BASE_THRESHOLD, MAX_LINES_THRESHOLD],
        },
        thresholds: {
          lines: MAX_LINES_THRESHOLD,
          functions: MAX_FUNCTIONS_THRESHOLD,
          branches: MAX_BRANCHS_THRESHOLD,
          statements: MAX_STATEMENTS_THRESHOLD,
        },
      },
    },
  }),
);
