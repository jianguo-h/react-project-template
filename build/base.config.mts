import type { UserConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import path from 'path';

const baseConfig: UserConfig = {
  base: '/',
  envPrefix: ['NODE_ENV', 'REACT_'],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.cjs',
      '.cjsx',
      '.cts',
      '.ctsx',
      '.mjs',
      '.mjsx',
      '.mts',
      '.mtsx',
    ],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [reactPlugin()],
};

export default baseConfig;
