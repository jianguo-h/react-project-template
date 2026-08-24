import path from 'path';
import { loadEnv } from 'vite';

export const enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

/**
 * Merge `.env` + `.env.<nodeEnv>` + `.env.<mode>` (later overrides earlier)
 * @param nodeEnv   Extra layer to load (e.g. NODE_ENV → `.env.production`)
 * @param mode      Forwarded to loadEnv → `.env.<mode>`
 * @param envDir    Directory holding the .env files (`''` → project `envs/`)
 * @param prefixes  Var name prefixes to include (e.g. `['VITE_', 'REACT_APP_']`)
 */
export const loadAllEnvs = (nodeEnv: NodeEnv | undefined, ...rest: Parameters<typeof loadEnv>) => {
  const [mode, envDir, prefixes] = rest;

  // Empty envDir → fall back to the project's envs/ directory
  let curEnvDir = envDir;
  if (typeof envDir === 'string' && !envDir) {
    curEnvDir = path.resolve(import.meta.dirname, '../env');
  }

  const baseEnvs = loadEnv('', curEnvDir, prefixes); // .env
  const baseNodeEnvs = loadEnv(nodeEnv ?? '', curEnvDir, prefixes); // .env.<nodeEnv>
  const modeEnvs = loadEnv(mode, curEnvDir, prefixes); // .env.<mode>

  // Merge: later layers override earlier (.env < .env.<nodeEnv> < .env.<mode>)
  return {
    ...baseEnvs,
    ...baseNodeEnvs,
    ...modeEnvs,
  } as ImportMetaEnv;
};
