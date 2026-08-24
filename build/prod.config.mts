import baseConfig from './base.config.mts';
import { defineConfig, UserConfig, mergeConfig } from 'vite';
import { loadAllEnvs, NodeEnv } from './helper.mts';

export default defineConfig((config) => {
  const env = loadAllEnvs(
    NodeEnv.PRODUCTION,
    config.mode,
    baseConfig.envDir ?? '',
    baseConfig.envPrefix,
  );
  const prodConfig: UserConfig = {
    build: {
      target: 'es6',
      outDir: 'dist',
      assetsDir: 'assets',
      cssCodeSplit: true,
      sourcemap: env.VITE_ENABLE_SOURCEMAP === 'true',
      chunkSizeWarningLimit: 1024,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          entryFileNames: 'js/app.[hash].entry.js',
          chunkFileNames: 'js/[name].[hash].chunk.js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.names.at(0)?.endsWith('.css')) {
              return 'css/[name].[hash].css';
            }
            return 'assets/[name].[hash].[ext]';
          },
        },
      },
    },
  };

  return mergeConfig(baseConfig, prodConfig);
});
