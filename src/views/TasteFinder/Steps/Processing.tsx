import React from 'react'
import { TasteFinderField } from 'src/views/TasteFinder'

interface ProcessingProps {
  data: TasteFinderField[]
}

interface TasteFinderProfile {
  sweetness: number
  body: number
  bitterness: number
  acidity: number
  grindType: string
}

export const Processing: React.FC<ProcessingProps> = ({ data }: ProcessingProps) => {
  const propsToProfile = (d: TasteFinderField[]): Partial<TasteFinderProfile> => {
    const parseParam = (n: string, v: string | undefined) => {
      switch (n) {
        case 'sweetness':
        case 'body':
        case 'bitterness':
        case 'acidity':
          return parseInt(v as string)
        default:
          return v
      }
    }
    const res = d.reduce((o, key) => ({ ...o, [key.name]: parseParam(key.name, key.value) }), {})
    return Object.fromEntries(
      Object.entries(res).filter(([key]) => ['sweetness', 'body', 'bitterness', 'acidity', 'grindType'].includes(key)),
    )
  }

  const payload = propsToProfile(data)
  console.log('data', data)
  console.log('payload', payload)

  return <div>Calculating...</div>
}
