import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import image1 from 'src/assets/images/tasteFinder/01-chocolate-leicht.webp'
import image2 from 'src/assets/images/tasteFinder/02-chocolate-mittel.webp'
import image3 from 'src/assets/images/tasteFinder/03-chocolate-hoch.webp'
import { i18n } from 'src/config'

import { IconName } from '../../../components'
import { TasteScreen, TasteScreenImageType } from '.'

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

const BrewingData = [
  {
    name: 'french',
    iconName: IconName.FrenchPress,
    text: 'text 1',
  },
  {
    name: 'aeropress',
    iconName: IconName.Aeropress,
    text: 'text 2',
  },
  {
    name: 'v60',
    iconName: IconName.V60,
    text: 'text 3',
  },
  {
    name: 'filter',
    iconName: IconName.FilterkaffeeMachine,
    text: 'text 4',
  },
  {
    name: 'moka',
    iconName: IconName.Moka,
    text: 'text 5',
  },
  {
    name: 'chemex',
    iconName: IconName.Chemex,
    text: 'text 6',
  },
  {
    name: 'espresso',
    iconName: IconName.Espresso,
    text: 'text 7',
  },
  {
    name: 'vollautomat',
    iconName: IconName.VollautomatMachine,
    text: 'text 8',
  },
]

const ImagesWithoutImagesData = [
  {
    name: '1',
    iconName: IconName.Chemex,
    text: 'option 1',
    selectedText: 'is selected!',
  },
  {
    name: '2',
    iconName: IconName.Chemex,
    text: 'option 2',
    selectedText: 'is selected!',
  },
  {
    name: '3',
    iconName: IconName.Chemex,
    text: 'option 3',
    selectedText: 'is selected!',
  },
]

const IconsWithoutIconsData = [
  {
    name: '1',
    image: image1,
    text: 'option 1',
    selectedText: 'is selected!',
  },
  {
    name: '2',
    image: image1,
    text: 'option 2',
    selectedText: 'is selected!',
  },
  {
    name: '3',
    image: image1,
    text: 'option 3',
    selectedText: 'is selected!',
  },
]

global.alert = jest.fn()

describe('Taste screen dynamic partial view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <TasteScreen
          screenKey="bitterness"
          screenData={BitternessData}
          imageType={TasteScreenImageType.Image}
          currentData={[]}
          updateData={() => null}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for not scrollable and image type icon', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <TasteScreen
          screenKey="grindType"
          screenData={BrewingData}
          imageType={TasteScreenImageType.Icon}
          currentData={[]}
          updateData={() => null}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Handles correctly image type without images', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <TasteScreen
          screenKey="bitterness"
          screenData={ImagesWithoutImagesData}
          imageType={TasteScreenImageType.Image}
          scrollableImages={false}
          currentData={[]}
          updateData={() => null}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Handles correctly icon type without icons', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <TasteScreen
          screenKey="bitterness"
          screenData={IconsWithoutIconsData}
          imageType={TasteScreenImageType.Icon}
          scrollableImages={false}
          currentData={[]}
          updateData={() => null}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Handles null selectedText', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <TasteScreen
          screenKey="bitterness"
          screenData={[
            ...IconsWithoutIconsData,
            {
              name: '4',
              text: 'option 4',
              image: image1,
            },
          ]}
          imageType={TasteScreenImageType.Image}
          scrollableImages={true}
          currentData={[]}
          updateData={() => null}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
