import type { UserConfig } from 'vite';
import baseConfig from './base.config.mts';
import mergeWith from 'lodash-es/mergeWith';
import { checker } from 'vite-plugin-checker';

const devConfig: UserConfig = mergeWith<UserConfig, UserConfig, UserConfig>(
  {},
  baseConfig,
  {
    mode: 'development',
    plugins: [
      checker({
        typescript: true,
        overlay: true,
      }),
    ],
    server: {
      hmr: true,
      open: true,
      host: true,
    },
  },
  (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  },
);

export default devConfig;
