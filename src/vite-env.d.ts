/// <reference types="vite/client" />

interface ImportMetaEnv {
  // used in the Vite configuration file
  readonly VITE_DEV_SERVER_PORT?: string;
  readonly VITE_DEV_PROXY_TARGET?: string;

  // it is used in the source code of the src directory
  readonly REACT_APP_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
