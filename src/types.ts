export type BoycottEntry = {
  name: string
  id: number
  description?: string
  reason: string
  proof: string
  logo: string
}

export type BoycottName = {
  name: string
  id: number
}

export type BoycottBarcode = {
  product: string
  company: string
  boycott: boolean
  reason?: string
  logo?: string
  proof?: string
  id?: number
}

export type BarcodeData = {
  product: string
  company: string
  barcode: string
}

export type BarcodeCheck = {
  barcode: string
  cached: boolean
}
