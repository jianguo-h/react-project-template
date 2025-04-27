// @ts-check
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

/**
 * @see https://vite.dev/guide/features.html#postcss
 * @type {import('postcss-load-config').Config}
 */
export default {
  plugins: [
    autoprefixer(),
    cssnano({
      preset: 'default',
    }),
  ],
};
