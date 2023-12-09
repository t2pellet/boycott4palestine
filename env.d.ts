/// <reference types="vite/client" />
declare global {
  namespace NodeJS {
    interface ImportMeta {
      env: any
    }
  }
}

declare module 'barcoder' {
  function validate(barcode: string): boolean
}
