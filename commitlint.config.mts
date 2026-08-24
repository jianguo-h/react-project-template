/* eslint-disable @typescript-eslint/naming-convention */
import { type UserConfig, RuleConfigSeverity } from '@commitlint/types';

/**
 * @see https://commitlint.js.org/reference/configuration.html
 * @template https://github.com/conventional-changelog/commitlint?tab=readme-ov-file#what-is-commitlint
 */

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [RuleConfigSeverity.Error, 'always', 150],
  },
} satisfies UserConfig;
