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
import { TasteInfoEntry, TasteProfileProps } from 'src/components'

export const getGuideImages = (tasteFinderResult: TasteProfileProps): string[] => {
  const guideImages: string[] = []
  const { acidity, bitterness, sweetness, body } = tasteFinderResult

  const pushImage = (p: number, imgLo: string, imgMed: string, imgHigh: string) => {
    if (p <= 3) {
      guideImages.push(imgLo)
    } else {
      if (p > 7) {
        guideImages.push(imgHigh)
      } else {
        guideImages.push(imgMed)
      }
    }
  }

  pushImage(acidity, acidityLo, acidityMed, acidityHigh)
  pushImage(bitterness, bitternessLo, bitternessMed, bitternessHi)
  pushImage(sweetness, sweetnessLo, sweetnessMed, sweetnessHi)
  pushImage(body, bodyLo, bodyMed, bodyHi)

  return guideImages
}

export const getTasteResults = (tasteFinderResult: TasteProfileProps): TasteInfoEntry[] => {
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
