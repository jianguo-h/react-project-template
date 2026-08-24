/* eslint-disable @typescript-eslint/naming-convention */
import globals from 'globals';
import jsEslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import eslintReact from '@eslint-react/eslint-plugin';

/**
 * @see https://typescript-eslint.io/getting-started/#step-2-configuration
 */
export default defineConfig(
  {
    ignores: ['node_modules/**', 'dist/**', 'public/**', 'coverage/**'],
  },
  {
    languageOptions: {
      parser: tsEslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
  jsEslint.configs.recommended,
  tsEslint.configs.strictTypeChecked,
  tsEslint.configs.stylisticTypeChecked,
  eslintReact.configs['strict-type-checked'],
  eslintPluginPrettierRecommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        // https://typescript-eslint.io/troubleshooting/typed-linting#project-service-issues
        projectService: {
          maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 10,
          allowDefaultProject: [
            'commitlint.config.mts',
            'lint-staged.config.mts',
            'postcss.config.mts',
            'prettier.config.mts',
            'stylelint.config.ts',
            'eslint.config.mts',
            'vitest.config.mts',
          ],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      eqeqeq: 'error',
      curly: ['error', 'all'],
      'react/display-name': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'interface',
          format: ['StrictPascalCase'],
          prefix: ['I'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: ['typeLike'],
          format: ['StrictPascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'enumMember',
          format: ['StrictPascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'default',
          format: ['strictCamelCase', 'snake_case', 'StrictPascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'forbid',
        },
      ],
    },
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx,cjs,cjsx,cts,ctsx,mjs,mjsx,mts,mtsx}'],
    ignores: ['src/types/**', 'src/apis/**'],
    rules: {
      'max-lines': ['error', { max: 350, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': [
        'error',
        { max: 80, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
    },
  },
  {
    files: ['src/**/*.{jsx,tsx,cjsx,ctsx,mjsx,mtsx}'],
    rules: {
      'max-lines-per-function': 'off',
    },
  },
);
