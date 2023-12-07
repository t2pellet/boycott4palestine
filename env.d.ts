/// <reference types="vite/client" />
declare global {
  namespace NodeJS {
    interface ImportMeta {
      env: any
    }
  }
}
