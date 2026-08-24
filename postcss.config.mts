import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { type Config } from 'postcss-load-config';

/**
 * @see https://vite.dev/guide/features.html#postcss
 */
export default {
  plugins: [
    autoprefixer(),
    cssnano({
      preset: 'default',
    }),
  ],
} satisfies Config;
