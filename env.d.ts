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

declare module 'vue-daisyui-theme-manager' {
  import type { DaisyThemes } from 'vue-daisyui-theme-manager'
  import App from '@/App.vue'

  type ThemeOptions = {
    light: DaisyThemes
    dark: DaisyThemes
    watchSystemTheme: boolean
  }

  export function createThemeManager(options?: ThemeOptions): (app: App) => void

  export function useThemeManager(): any

  export { DaisyThemes, ThemeOptions }
}
