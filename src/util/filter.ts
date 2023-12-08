import { WRatio } from 'fuzzball'
import type { BoycottName } from '@/types'

type BoycottSearchName = BoycottName & {
  ratio: number
}

const RESULT_COUNT = 5
const RATIO_CUTOFF = 75

function search(query: string, names: BoycottName[]): BoycottName[] {
  const ratioNames: BoycottSearchName[] = names.map(({ name, id }) => ({
    name,
    id,
    ratio: WRatio(query, name.slice(0, query.length))
  }))
  return ratioNames
    .filter((name) => name.ratio >= RATIO_CUTOFF)
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, RESULT_COUNT)
}

export { search }
