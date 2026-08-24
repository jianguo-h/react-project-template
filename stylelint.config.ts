import { type Config } from 'stylelint';

/**
 * @see https://stylelint.io/user-guide/configure
 */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  ignoreFiles: ['node_modules/**', 'dist/**', 'public/**', 'coverage/**'],
} satisfies Config;
