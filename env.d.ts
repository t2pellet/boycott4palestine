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

declare module '@teckel/vue-barcode-reader' {
  export class StreamBarcodeReader extends Vue {}
  export class ImageBarcodeReader extends Vue {}
}
