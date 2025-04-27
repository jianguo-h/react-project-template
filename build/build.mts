import type { UserConfig } from 'vite';
import mergeWith from 'lodash-es/mergeWith';
import baseConfig from './base.config.mts';

const buildConfig: UserConfig = mergeWith<UserConfig, UserConfig, UserConfig>(
  {},
  baseConfig,
  {
    mode: 'production',
    esbuild: {
      legalComments: 'none',
      minifyWhitespace: true,
      minifySyntax: true,
      drop: ['debugger'],
      pure: [
        ...Object.keys(console)
          .map(funcName => `console.${funcName}`)
          .filter(item => item !== 'console.error'),
      ],
    },
    build: {
      // If the target is es5, refer to https://github.com/evanw/esbuild/issues/1010#issuecomment-803865232
      target: 'es6',
      outDir: 'dist',
      assetsDir: 'static',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1024,
      reportCompressedSize: false,
      manifest: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          entryFileNames: 'static/js/app.[hash].entry.js',
          chunkFileNames: 'static/js/[name].[hash].chunk.js',
          assetFileNames: assetInfo => {
            if (assetInfo.names?.at(0)?.endsWith('.css')) {
              return 'static/css/[name].[hash].asset.css';
            }
            return 'static/media/[name].[hash].asset.[ext]';
          },
        },
      },
    },
  },
  (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  },
);

export default buildConfig;
