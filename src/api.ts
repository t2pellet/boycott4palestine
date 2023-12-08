import axios from 'axios'
import type { BoycottEntry, BoycottName } from '@/types'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
})

async function searchNames(name: string): Promise<BoycottName[]> {
  const result = await client.get('names', {
    params: { name }
  })
  return result.data
}

async function fetchBoycottEntry(id: number): Promise<BoycottEntry> {
  const result = await client.get(`boycott/${id}`)
  return result.data
}

async function fetchAll(): Promise<BoycottEntry[]> {
  const result = await client.get('boycott')
  return result.data
}

export { searchNames, fetchBoycottEntry, fetchAll }
