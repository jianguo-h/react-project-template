import { type Config } from 'prettier';

/**
 * @see https://prettier.io/docs/configuration
 */
export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'always',
  jsxSingleQuote: true,
  bracketSameLine: false,
} satisfies Config;
