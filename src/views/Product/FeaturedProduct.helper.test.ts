import { TasteProfileProps } from 'src/components'

import { getGuideImages } from '.'

describe('Featured product helper', () => {
  it('getGuideImages works correctly for lo values', () => {
    const tasteProfileResults: TasteProfileProps = {
      acidity: 1,
      bitterness: 1,
      sweetness: 1,
      body: 1,
    }
    expect(getGuideImages(tasteProfileResults)).toEqual([
      '01-fruit-leicht.webp',
      '01-chocolate-leicht.webp',
      '01-sweet-leicht.webp',
      '01-coffee-leicht.webp',
    ])
  })
  it('getGuideImages works correctly for mid values', () => {
    const tasteProfileResults: TasteProfileProps = {
      acidity: 5,
      bitterness: 5,
      sweetness: 5,
      body: 5,
    }
    expect(getGuideImages(tasteProfileResults)).toEqual([
      '02-fruit-mittel.webp',
      '02-chocolate-mittel.webp',
      '02-sweet-mittel.webp',
      '02-coffee-mittel.webp',
    ])
  })
  it('getGuideImages works correctly for hi values', () => {
    const tasteProfileResults: TasteProfileProps = {
      acidity: 9,
      bitterness: 9,
      sweetness: 9,
      body: 9,
    }
    expect(getGuideImages(tasteProfileResults)).toEqual([
      '03-fruit-hoch.webp',
      '03-chocolate-hoch.webp',
      '03-sweet-hoch.webp',
      '03-coffee-hoch.webp',
    ])
  })
})
