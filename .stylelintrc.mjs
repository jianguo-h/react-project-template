/* eslint-disable @typescript-eslint/naming-convention */
// @ts-check

/**
 * @see https://stylelint.io/user-guide/configure
 * @type {import('stylelint').Config}
 */
export default {
  extends: ['stylelint-config-standard-less', 'stylelint-prettier/recommended'],
  ignoreFiles: ['node_modules', 'dist', 'public', '.husky'],
  rules: {
    'no-descending-specificity': null,
  },
  overrides: [
    {
      files: ['**/*.less'],
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
};
