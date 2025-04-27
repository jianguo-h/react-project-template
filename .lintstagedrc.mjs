/* eslint-disable @typescript-eslint/naming-convention */
// @ts-check

/**
 * @see https://github.com/lint-staged/lint-staged?tab=readme-ov-file#configuration
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js?(x),ts?(x),cjs?(x),cts?(x),mjs?(x),mts?(x)}': [
    'eslint --fix',
    'prettier --ignore-path .gitignore --write',
  ],
  '*.{css,scss,sass,less}': ['stylelint --fix', 'prettier --ignore-path .gitignore --write'],
};
