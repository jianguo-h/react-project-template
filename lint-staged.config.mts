/* eslint-disable @typescript-eslint/naming-convention */
import { type Configuration } from 'lint-staged';

/**
 * @see https://github.com/lint-staged/lint-staged?tab=readme-ov-file#configuration
 */
export default {
  '*.{js?(x),ts?(x),cjs?(x),cts?(x),mjs?(x),mts?(x)}': ['eslint --fix'],
  '*.{ts?(x),cts?(x),mts?(x)}': [() => 'tsc --noEmit --skipLibCheck'],
  '*.{css,scss,sass,less}': ['stylelint --ignore-path .gitignore --fix'],
  '*.{js?(x),ts?(x),cjs?(x),cts?(x),mjs?(x),mts?(x),css,scss,sass,less,json,md,yml,yaml}': [
    'prettier --ignore-path .gitignore --write',
  ],
} satisfies Configuration;
