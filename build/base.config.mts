import type { UserConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

const projectRoot = path.resolve(import.meta.dirname, '../');

const baseConfig: UserConfig = {
  base: '/',
  envDir: path.resolve(projectRoot, 'envs'),
  envPrefix: ['VITE_', 'REACT_APP_'],
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
      '@': projectRoot,
    },
  },
  plugins: [reactPlugin(), tailwindcss()],
};

export default baseConfig;
