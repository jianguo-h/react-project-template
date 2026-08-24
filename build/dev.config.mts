import baseConfig from './base.config.mts';
import { defineConfig, UserConfig, mergeConfig, ProxyOptions } from 'vite';
import { checker } from 'vite-plugin-checker';
import { loadAllEnvs, NodeEnv } from './helper.mts';

export default defineConfig((config) => {
  const env = loadAllEnvs(
    NodeEnv.DEVELOPMENT,
    config.mode,
    baseConfig.envDir ?? '',
    baseConfig.envPrefix,
  );

  const proxy: Record<string, string | ProxyOptions> = {};
  if (env.REACT_APP_API_URL && env.VITE_DEV_PROXY_TARGET) {
    proxy[env.REACT_APP_API_URL] = {
      target: env.VITE_DEV_PROXY_TARGET,
      changeOrigin: true,
    };
  }

  const devConfig: UserConfig = {
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
      port: Number(env.VITE_DEV_SERVER_PORT ?? 5000),
      proxy,
    },
  };

  return mergeConfig(baseConfig, devConfig);
});
