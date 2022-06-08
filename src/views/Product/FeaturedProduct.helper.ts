import bitternessLo from 'src/assets/images/tasteFinder/01-chocolate-leicht.webp'
import bodyLo from 'src/assets/images/tasteFinder/01-coffee-leicht.webp'
import acidityLo from 'src/assets/images/tasteFinder/01-fruit-leicht.webp'
import sweetnessLo from 'src/assets/images/tasteFinder/01-sweet-leicht.webp'
import bitternessMed from 'src/assets/images/tasteFinder/02-chocolate-mittel.webp'
import bodyMed from 'src/assets/images/tasteFinder/02-coffee-mittel.webp'
import acidityMed from 'src/assets/images/tasteFinder/02-fruit-mittel.webp'
import sweetnessMed from 'src/assets/images/tasteFinder/02-sweet-mittel.webp'
import bitternessHi from 'src/assets/images/tasteFinder/03-chocolate-hoch.webp'
import bodyHi from 'src/assets/images/tasteFinder/03-coffee-hoch.webp'
import acidityHigh from 'src/assets/images/tasteFinder/03-fruit-hoch.webp'
import sweetnessHi from 'src/assets/images/tasteFinder/03-sweet-hoch.webp'
import { TasteInfoEntry } from 'src/components'

export interface TasteProfile {
  acidity: number
  bitterness: number
  body: number
  sweetness: number
}

export const getGuideImages = (tasteFinderResult: TasteProfile) => {
  const guideImages = []
  if (tasteFinderResult.acidity <= 3) {
    guideImages.push(acidityLo)
  } else {
    if (tasteFinderResult.acidity > 7) {
      guideImages.push(acidityHigh)
    } else {
      guideImages.push(acidityMed)
    }
  }
  if (tasteFinderResult.bitterness <= 3) {
    guideImages.push(bitternessLo)
  } else {
    if (tasteFinderResult.bitterness > 7) {
      guideImages.push(bitternessHi)
    } else {
      guideImages.push(bitternessMed)
    }
  }
  if (tasteFinderResult.sweetness <= 3) {
    guideImages.push(sweetnessLo)
  } else {
    if (tasteFinderResult.sweetness > 7) {
      guideImages.push(sweetnessHi)
    } else {
      guideImages.push(sweetnessMed)
    }
  }
  if (tasteFinderResult.body <= 3) {
    guideImages.push(bodyLo)
  } else {
    if (tasteFinderResult.body > 7) {
      guideImages.push(bodyHi)
    } else {
      guideImages.push(bodyMed)
    }
  }
  return guideImages
}

export const getTasteResults = (tasteFinderResult: TasteProfile): TasteInfoEntry[] => {
  return [
    {
      key: 'acidity',
      value: tasteFinderResult.acidity,
    },
    {
      key: 'bitterness',
      value: tasteFinderResult.bitterness,
    },
    {
      key: 'sweetness',
      value: tasteFinderResult.sweetness,
    },
    {
      key: 'body',
      value: tasteFinderResult.body,
    },
  ]
}
