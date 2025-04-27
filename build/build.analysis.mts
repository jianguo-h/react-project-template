import buildConfig from './build.mts';
import type { UserConfig } from 'vite';
import mergeWith from 'lodash-es/mergeWith';
import { visualizer } from 'rollup-plugin-visualizer';

const buildAnalysisConfig: UserConfig = mergeWith<UserConfig, UserConfig, UserConfig>(
  {},
  buildConfig,
  {
    build: {
      sourcemap: false,
    },
    plugins: [
      visualizer({
        open: true,
      }),
    ],
  },
  (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  },
);

export default buildAnalysisConfig;
