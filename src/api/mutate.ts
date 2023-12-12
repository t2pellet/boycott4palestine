import { useMutation, type UseMutationReturnType, useQueryClient } from '@tanstack/vue-query'
import { validate } from 'barcoder'
import axios from 'axios'
import type { BarcodeData } from '@/types'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
})

function useAddBarcode(): UseMutationReturnType<number, any, BarcodeData, any> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (barcode: BarcodeData) => {
      if (validate(barcode.barcode)) {
        const result = await client.post('/barcode/', barcode)
        return result.status
      }
      return 400
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkBarcode'] })
      queryClient.invalidateQueries({ queryKey: ['barcode'] })
    }
  })
}

function useFixBarcode(): UseMutationReturnType<number, any, BarcodeData, any> {
  return useMutation({
    mutationFn: async (barcode: BarcodeData) => {
      if (validate(barcode.barcode)) {
        const result = await client.patch(`/barcode/${barcode.barcode}?company=${barcode.company}`)
        return result.status
      }
      return 400
    }
  })
}

export { useAddBarcode, useFixBarcode }
