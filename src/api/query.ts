import axios from 'axios'
import type { BarcodeCheck, BoycottBarcode, BoycottEntry, BoycottName } from '@/types'
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
})
function useEntry(id: number): UseQueryReturnType<BoycottEntry, any> {
  return useQuery({
    queryKey: ['entry', id],
    queryFn: async () => {
      const result = await client.get(`boycott/${id}`)
      return result.data as BoycottEntry
    }
  })
}

function useEntries(): UseQueryReturnType<BoycottEntry[], any> {
  return useQuery({
    queryKey: ['entries'],
    queryFn: async () => {
      const result = await client.get('boycott')
      return result.data as BoycottEntry[]
    }
  })
}

function useNames(): UseQueryReturnType<BoycottName[], any> {
  return useQuery({
    queryKey: ['names'],
    queryFn: async () => {
      const result = await client.get('names')
      return result.data as BoycottName[]
    }
  })
}

function useBarcode(barcode: string): UseQueryReturnType<BoycottBarcode, any> {
  return useQuery({
    queryKey: ['barcode', barcode],
    retry: 1,
    queryFn: async () => {
      const result = await client.get(`/barcode/${barcode}`)
      return result.data as BoycottBarcode
    }
  })
}

function useCheckBarcode(barcode: string): UseQueryReturnType<BarcodeCheck, any> {
  return useQuery({
    queryKey: ['checkBarcode', barcode],
    queryFn: async () => {
      const result = await client.get(`/barcode/exists/${barcode}`)
      return result.data as BarcodeCheck
    },
    staleTime: 0
  })
}

export { useEntry, useEntries, useNames, useBarcode, useCheckBarcode }
