import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import image1 from 'src/assets/images/tasteFinder/01-chocolate-leicht.webp'
import image2 from 'src/assets/images/tasteFinder/02-chocolate-mittel.webp'
import image3 from 'src/assets/images/tasteFinder/03-chocolate-hoch.webp'
import { i18n } from 'src/config'

import { TasteScreen } from '.'

const BitternessData = [
  {
    name: '1',
    image: image1,
    text: 'option 1',
    selectedText: 'is selected!',
  },
  {
    name: '2',
    image: image2,
    text: 'option 2',
    selectedText: 'is selected!',
  },
  {
    name: '3',
    image: image3,
    text: 'option 3',
    selectedText: 'is selected!',
  },
]

global.alert = jest.fn()

describe('Taste screen dynamic partial view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <TasteScreen screenKey="bitterness" screenData={BitternessData} currentData={[]} updateData={() => null} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
