/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_API_URL?: string;
  readonly NODE_ENV?: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
