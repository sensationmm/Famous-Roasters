import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { ProductMockData } from 'src/_mocks'
import { i18n } from 'src/config'

import { ProductTile } from '.'

describe('Product Tile component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ProductTile
          productNode={{
            ...ProductMockData,
            pricePerKg: { value: '10.0' },
            coffee_type: { value: 'Filter' },
            origin: { value: 'CO,BR' },
          }}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders as expected for missing images', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ProductTile
          productNode={{
            ...ProductMockData,
            pricePerKg: { value: '10.0' },
            coffee_type: { value: 'Filter' },
            origin: { value: 'CO' },
            featuredImage: null,
            images: {
              edges: [],
              nodes: [],
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
              },
            },
          }}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders as expected for missing attributes', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ProductTile
          productNode={{
            ...ProductMockData,
            pricePerKg: { value: '10.0' },
            origin: { value: 'CO' },
          }}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders featured correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ProductTile
          productNode={{
            ...ProductMockData,
            pricePerKg: { value: '10.0' },
            coffee_type: { value: 'Filter' },
            origin: { value: 'CO,BR' },
          }}
          featured={true}
        />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
